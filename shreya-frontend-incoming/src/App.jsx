import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AshaPage from "./pages/AshaPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/asha" element={<AshaPage />} />
        <Route path="/anm" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;