const express = require("express");
const http = require("http");
const helmet = require("helmet");
const socketIo = require("socket.io");
const authRoutes = require("./routes/AuthRouter");
const cors = require("cors");
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

app.use("/auth", authRoutes);

io.on("connect", () => {});

app.listen(4000, () => {
  console.log("connected at 4000");
});
