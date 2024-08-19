import { io } from "socket.io-client";

const socket = new io("http://localhost:4000/", {
  autoConnect: false, //restrict all time connection to server
  withCredentials: true,
});

export default socket;
