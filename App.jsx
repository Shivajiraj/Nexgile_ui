import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login          from "./pages/Login";
import Dashboard      from "./pages/Dashboard";
import ProgramTracking from "./pages/ProgramTracking";
import Production     from "./pages/Production";
import Quality        from "./pages/Quality";
import SupplyChain    from "./pages/SupplyChain";
import Service        from "./pages/Service";
import Documents      from "./pages/Documents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Login />} />
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/program"    element={<ProgramTracking />} />
        <Route path="/production" element={<Production />} />
        <Route path="/quality"    element={<Quality />} />
        <Route path="/supply"     element={<SupplyChain />} />
        <Route path="/service"    element={<Service />} />
        <Route path="/documents"  element={<Documents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
