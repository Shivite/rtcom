const express = require("express");
const router = express.Router();
const validateFrom = require("../controllers/formValidation");
const pool = require("../db");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  console.log("session", req.session);
  validateFrom(req, res);
  const potentialLogin = await pool.query(
    "SELECT username, passhash, id FROM users WHERE username = $1",
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
});

router.post("/register", async (req, res) => {
  validateFrom(req, res);

  const existingUser = await pool.query(
    "SELECT username from users WHERE username=$1",
    [req.body.username]
  );
  if (existingUser.rowCount === 0) {
    // const hashedPass = await bcrypt(req.body.password, 10);
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users (username, passhash) VALUES ($1, $2) RETURNING id, username",
      [req.body.username, hashedPass]
    );
    req.session.user = {
      username: newUserQuery.rows[0].username,
      id: newUserQuery.rows[0].id,
    }; // hold session info. browser cookie is key and value is here.
    res.json({
      loggedIn: true,
      username: newUserQuery.rows[0].username,
    });
  } else {
    res.json({ loggedIn: false, status: "username taken" });
  }
});

module.exports = router;
