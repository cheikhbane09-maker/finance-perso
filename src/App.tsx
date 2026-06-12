import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import Revenus from "./Revenus";
import Depenses from "./Depenses";
import Apropos from "./Apropos";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/revenus" element={<Revenus />} />
          <Route path="/depenses" element={<Depenses />} />
          <Route path="/apropos" element={<Apropos />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;