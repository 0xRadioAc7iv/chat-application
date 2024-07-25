import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";
import PrivateRoute from "./components/PrivateRoute";
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

      <Route path="/" element={<Landing />} />
    </Routes>
  );
}

export default App;
