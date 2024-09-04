import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Battery, Zap, Activity, Gauge, ChevronDown, Bell, Menu, User, FileText, TrendingUp, Sun, Moon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";

const mockData = [
  { time: '00:00', voltage: 12, current: 5, power: 60, boardPower: 40, batteryPercentage: 80 },
  { time: '04:00', voltage: 12.5, current: 5.5, power: 68.75, boardPower: 45, batteryPercentage: 85 },
  { time: '08:00', voltage: 13, current: 6, power: 78, boardPower: 50, batteryPercentage: 90 },
  { time: '12:00', voltage: 13.5, current: 6.5, power: 87.75, boardPower: 55, batteryPercentage: 95 },
  { time: '16:00', voltage: 13, current: 6, power: 78, boardPower: 50, batteryPercentage: 90 },
  { time: '20:00', voltage: 12.5, current: 5.5, power: 68.75, boardPower: 45, batteryPercentage: 85 },
];

const MetricCard = ({ title, value, unit, icon: Icon, dataKey, stroke }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`bg-card text-card-foreground rounded-lg overflow-hidden ${isOpen ? 'col-span-full' : ''}`}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <Card className="bg-transparent border-none relative">
            <div className="h-24 relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{value}{unit}</div>
              </CardContent>
              <motion.div
                className="absolute bottom-2 left-2"
                initial={false}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </div>
          </Card>
        </CollapsibleTrigger>
        <AnimatePresence>
          {isOpen && (
            <CollapsibleContent
              forceMount
            >
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-card">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="time" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                      <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>
    </motion.div>
  );
};

export const Header = ({ theme, toggleTheme }) => (
  <header className="bg-background text-foreground p-4 sticky top-0 z-10 shadow-md">
    <div className="flex justify-between items-center mb-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] flex flex-col">
          <nav className="flex flex-col space-y-4 flex-grow">
            <Link to="/" className="text-lg hover:text-muted-foreground flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            <Link to="/reports" className="text-lg hover:text-muted-foreground flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Reports
            </Link>
            <Link to="/trend" className="text-lg hover:text-muted-foreground flex items-center">
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
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
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

const Index = ({ theme, toggleTheme }) => {
  return (
    <div className={`min-h-screen bg-background text-foreground`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="p-8">
        <h2 className="text-3xl font-bold mb-8">Solar Power Dashboard</h2>
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard title="Voltage" value={mockData[mockData.length - 1].voltage} unit="V" icon={Zap} dataKey="voltage" stroke="#ffd700" />
          <MetricCard title="Current" value={mockData[mockData.length - 1].current} unit="A" icon={Activity} dataKey="current" stroke="#00ff00" />
          <MetricCard title="Power" value={mockData[mockData.length - 1].power} unit="W" icon={Gauge} dataKey="power" stroke="#ff4500" />
          <MetricCard title="Board Power" value={mockData[mockData.length - 1].boardPower} unit="W" icon={Zap} dataKey="boardPower" stroke="#1e90ff" />
          <MetricCard title="Battery" value={mockData[mockData.length - 1].batteryPercentage} unit="%" icon={Battery} dataKey="batteryPercentage" stroke="#8a2be2" />
        </motion.div>
      </main>
    </div>
  );
};

export default Index;