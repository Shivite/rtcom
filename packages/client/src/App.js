import AuthContext from "./components/AuthContext";
import ToggleColorMode from "./components/ToggleColorMode";
import Views from "./components/Views";

function App() {
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
