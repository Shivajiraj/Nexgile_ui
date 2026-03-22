import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLocation } from "react-router-dom";

const TITLES = {
  "/dashboard":  "Executive Dashboard",
  "/program":    "Program & Project Tracking",
  "/production": "Production Visibility",
  "/quality":    "Quality Management",
  "/supply":     "Supply Chain",
  "/service":    "After-Sales & Service",
  "/documents":  "Documents & Knowledge",
};

function Layout({ children }) {
  const { pathname } = useLocation();
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Header title={TITLES[pathname] || "FactoryIQ"} />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
