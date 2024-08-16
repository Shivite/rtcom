const express = require("express");
const http = require("http");
const helmet = require("helmet");
const socketIo = require("socket.io");
const authRoutes = require("./routes/AuthRouter");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    credential: true,
  },
});

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    name: "sid",
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production" ? true : "auto",
      httpOnly: true,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
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
