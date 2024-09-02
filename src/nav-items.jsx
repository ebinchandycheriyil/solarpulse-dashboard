import { HomeIcon, FileText, TrendingUp } from "lucide-react";
import Index from "./pages/Index.jsx";
import Reports from "./pages/Reports.jsx";
import Trend from "./pages/Trend.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: Index,
  },
  {
    title: "Reports",
    to: "/reports",
    icon: <FileText className="h-4 w-4" />,
    page: Reports,
  },
  {
    title: "Trend",
    to: "/trend",
    icon: <TrendingUp className="h-4 w-4" />,
    page: Trend,
  },
];