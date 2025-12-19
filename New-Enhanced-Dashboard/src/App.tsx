import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ConsultantDashboard from "./pages/ConsultantDashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Consultant Dashboard Routes */}
        <Route path="/consultant/*" element={<ConsultantDashboard />} />
        
        {/* Executive Dashboard Routes */}
        <Route path="/executive/*" element={<ExecutiveDashboard />} />
        
        {/* Default redirect to consultant dashboard */}
        <Route path="/" element={<Navigate to="/consultant" replace />} />
        
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/consultant" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
