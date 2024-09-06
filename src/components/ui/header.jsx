import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Battery,
  Zap,
  Activity,
  Gauge,
  ChevronDown,
  Bell,
  Menu,
  User,
  FileText,
  TrendingUp,
  Sun,
  Moon,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CustHeader = ({ theme, toggleTheme }) => (
  <header className="bg-background text-foreground p-4 sticky top-0 z-10 shadow-md">
    <div className="flex justify-between items-center mb-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[300px] sm:w-[400px] flex flex-col"
        >
          <nav className="flex flex-col qspace-y-4 flex-grow">
            <Link
              to="/"
              className="text-lg hover:text-muted-foreground flex items-center"
            >
              <Activity className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            <Link
              to="/reports"
              className="text-lg hover:text-muted-foreground flex items-center"
            >
              <FileText className="h-5 w-5 mr-2" />
              Reports
            </Link>
            <Link
              to="/trend"
              className="text-lg hover:text-muted-foreground flex items-center"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Trend
            </Link>
          </nav>
          <div className="flex items-center justify-between mt-auto pt-4 border-t">
            <span className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <span>Dark Mode</span>
              <Moon className="h-4 w-4" />
            </span>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
          </div>
        </SheetContent>
      </Sheet>
      <h1 className="text-2xl font-bold">Goose Dashboard</h1>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-6 w-6" />
        </Button>
      </div>
    </div>
  </header>
);

export default CustHeader;
