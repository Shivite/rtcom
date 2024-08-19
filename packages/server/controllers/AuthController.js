const pool = require("../db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports.handleGetLogin = (req, res) => {
  if (req.session && req.session.user) {
    res.json({ loggedIn: true });
  } else res.json({ loggedIn: false });
};

module.exports.handlePostLogin = async (req, res) => {
  const potentialLogin = await pool.query(
    "SELECT username, passhash, userid, id FROM users WHERE username = $1",
    [req.body.username]
  );
  if (potentialLogin.rowCount > 0) {
    const isSamePass = await bcrypt.compare(
      req.body.password,
      potentialLogin.rows[0].passhash
    );
    if (isSamePass) {
      req.session.user = {
        username: potentialLogin.rows[0].username,
        userid: potentialLogin.rows[0].userid,
        id: potentialLogin.rows[0].id,
      };
      res.json({
        loggedIn: true,
        username: req.body.username,
      });
    } else {
      res.json({ loggedIn: false, status: "wrong password" });
    }
  } else {
    res.json({ loggedIn: false, status: "Username or password is wrong" });
  }
};

module.exports.handlePostRegistration = async (req, res) => {
  const existingUser = await pool.query(
    "SELECT username from users WHERE username=$1",
    [req.body.username]
  );
  if (existingUser.rowCount === 0) {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users (username, passhash, userid) VALUES ($1, $2, $3) RETURNING id, username",
      [req.body.username, hashedPass, uuidv4()]
    );
    req.session.user = {
      username: newUserQuery.rows[0].username,
      userid: newUserQuery.rows[0].userid,
      id: newUserQuery.rows[0].id,
    };
    res.json({
      loggedIn: true,
      username: newUserQuery.rows[0].username,
    });
  } else {
    res.json({ loggedIn: false, status: "username taken" });
  }
};
