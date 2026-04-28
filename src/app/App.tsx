import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PipingPage from "./pages/PipingPage";

export default function App() {
  return (
    <BrowserRouter basename="/specref-home">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/piping" element={<PipingPage />} />
      </Routes>
    </BrowserRouter>
  );
}