import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import Dashboard from "./Dashboard";
import Revenus from "./Revenus";
import Depenses from "./Depenses";
import Epargne from "./Epargne";
import Stats from "./Stats";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navbar /><Dashboard /><Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/revenus"
            element={
              <ProtectedRoute>
                <Navbar /><Revenus /><Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/depenses"
            element={
              <ProtectedRoute>
                <Navbar /><Depenses /><Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/epargne"
            element={
              <ProtectedRoute>
                <Navbar /><Epargne /><Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stats"
            element={
              <ProtectedRoute>
                <Navbar /><Stats /><Footer />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
