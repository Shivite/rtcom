const express = require("express");
const http = require("http");
const helmet = require("helmet");
const socketIo = require("socket.io");
const authRoutes = require("./routes/AuthRouter");
const cors = require("cors");

const {
  SessionController,
  wrap,
  corsConfig,
} = require("./controllers/SessionController");
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: corsConfig,
});
app.use(helmet());
app.use(express.json());
app.use(cors(corsConfig));

app.use(SessionController);

io.use(wrap(SessionController));

app.get("/", (req, res) => {
  res.send("har har mahadev");
});
app.use("/auth", authRoutes);

io.on("connect", (socket) => {
  console.log("socket", socket.request.session.user.username);
});

app.listen(4000, () => {
  console.log("connected at 4000");
});
