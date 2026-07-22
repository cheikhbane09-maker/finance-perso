import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";
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
import Apropos from "./Apropos";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<><Navbar /><Dashboard /><Footer /></>} />
          <Route path="/revenus" element={<><Navbar /><Revenus /><Footer /></>} />
          <Route path="/depenses" element={<><Navbar /><Depenses /><Footer /></>} />
          <Route path="/epargne" element={<><Navbar /><Epargne /><Footer /></>} />
          <Route path="/stats" element={<><Navbar /><Stats /><Footer /></>} />
          <Route path="/apropos" element={<><Navbar /><Apropos /><Footer /></>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;