import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PipingPage from "./pages/PipingPage";
import FittingsPage from "./pages/FittingsPage";
import FlangesPage from "./pages/FlangesPage";

export default function App() {
  return (
    <BrowserRouter basename="/specref-home">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/piping" element={<PipingPage />} />
        <Route path="/pipe-fittings" element={<FittingsPage />} />
        <Route path="/flanges" element={<FlangesPage />} />
        {/* /valves — add ValvesPage here when the data file is ready */}
      </Routes>
    </BrowserRouter>
  );
}
