const express = require("express");
const http = require("http");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const { Server } = require("socket.io");
const {
  SessionController,
  wrap,
  corsConfig,
} = require("./controllers/SessionController");
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: corsConfig,
});

// Session middleware setup
app.use(SessionController);

// Middleware setup
app.use(helmet());
app.use(express.json());
app.use(cors(corsConfig));

// Import routes
const authRoutes = require("./routes/AuthRouter");

// Register routes
app.use("/auth", authRoutes);

// Socket.io middleware
io.use(wrap(SessionController));
// io.use((socket, next) => {
//   // Assume SessionController wraps and sets the session
//   SessionController(socket.request, {}, next);
// });

io.on("connection", (socket) => {
  console.log("New socket connection");
  // Access session data
  if (socket.request.session && socket.request.session.user) {
    console.log("soketId:", socket.id);
    console.log("User:", socket.request.session.user.username);
  } else {
    console.log("No user session found");
  }
});

app.get("/", (req, res) => {
  res.send("har har mahadev");
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
