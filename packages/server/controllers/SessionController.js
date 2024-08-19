const AutorizeUser = (socket, next) => {
  if (!socket.request.session || !socket.request.session.user) {
    console.log("Bad Request!");
    next(new Error("Not authorized!"));
  } else {
    console.log("Session available! User is authorized!");
    next();
  }
};

module.exports = AutorizeUser;
