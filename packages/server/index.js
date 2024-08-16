const express = require("express");
const http = require("http");
const helmet = require("helmet");
const socketIo = require("socket.io");
const authRoutes = require("./routes/AuthRouter");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const Redis = require("ioredis");
const RedisStore = require("connect-redis").default;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    credential: true,
  },
});
const redisClient = new Redis();
app.use(helmet());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(
  session({
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
  })
);

app.get("/", (req, res) => {
  res.send("har har mahadev");
});
app.use("/auth", authRoutes);

io.on("connect", () => {});

app.listen(4000, () => {
  console.log("connected at 4000");
});
