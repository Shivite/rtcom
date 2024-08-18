const session = require("express-session");
const RedisStore = require("connect-redis").default;
const Redis = require("ioredis");
require("dotenv").config();
const redisClient = new Redis();

const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

const SessionController = session({
  secret: process.env.COOKIE_SECRET,
  name: "sid",
  store: new RedisStore({ client: redisClient }),
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false, // false for development
    httpOnly: true,
    expires: 1000 * 60 * 60 * 7,
    sameSite: "lax",
  },
});

const wrap = (expressMiddleware) => (socket, next) =>
  expressMiddleware(socket.request, {}, next);

module.exports = { SessionController, wrap, corsConfig };
