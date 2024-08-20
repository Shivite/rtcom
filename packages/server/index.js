const express = require("express");
const http = require("http");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const { Server } = require("socket.io");
const {
  SessionMiddleware,
  wrap,
  corsConfig,
} = require("./controllers/SessionMiddleware");
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: corsConfig,
});

// Session middleware setup
app.use(SessionMiddleware); //Authenticate the user

// Middleware setup
app.use(helmet());
app.use(express.json());
app.use(cors(corsConfig));

// Import routes
const authRoutes = require("./routes/AuthRouter");
const {
  AutorizeUser,
  InitializeUser,
  AddFriend,
  DisconnectUser,
} = require("./controllers/SessionController");
const { disconnect } = require("process");

// Register routes
app.use("/auth", authRoutes);

// Socket.io middleware
io.use(wrap(SessionMiddleware)); //authenticate user and share session info with socket.io by using express middleware
io.use(AutorizeUser);
io.on("connection", (socket) => {
  InitializeUser(socket);
  socket.on("add_friend", (friendname, cb) =>
    AddFriend(socket, friendname, cb)
  );
  socket.on("disconnect", () => DisconnectUser(socket));
});

app.get("/", (req, res) => {
  res.send("har har mahadev");
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
