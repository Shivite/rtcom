const redisClient = require("../redis");

const AutorizeUser = (socket, next) => {
  if (!socket.request.session || !socket.request.session.user) {
    console.log("Bad Request!");
    next(new Error("Not authorized!"));
  } else {
    socket.user = { ...socket.request.session.user };
    redisClient.hset(
      `userid:${socket.user.username}`,
      "userid",
      socket.user.userid
    );
    next();
  }
};

module.exports = AutorizeUser;
