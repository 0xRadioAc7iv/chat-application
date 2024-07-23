import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Chat from "./pages/Chat";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { SocketProvider } from "./contexts/SocketContext";

function App() {
  return (
    <Routes>
      <Route
        path="/chat"
        element={
          <PrivateRoute
            element={
              <SocketProvider>
                <Chat />
              </SocketProvider>
            }
          />
        }
      />

      <Route path="/signup" element={<PublicRoute element={<Signup />} />} />
      <Route path="/signin" element={<PublicRoute element={<Signin />} />} />

      <Route path="/" element={<Landing />} />
    </Routes>
  );
}

export default App;
