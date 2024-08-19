import AuthContext from "./components/AuthContext";
import ToggleColorMode from "./components/ToggleColorMode";
import Views from "./components/Views";
import socket from "./socket";

function App() {
  socket.connect();
  return (
    <>
      <ToggleColorMode />
      <AuthContext>
        <Views />
      </AuthContext>
    </>
  );
}

export default App;
