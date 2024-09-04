import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Battery, Zap, Activity, Gauge, ChevronDown, Bell, Menu, User, FileText, TrendingUp, Sun, Moon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const mockData = [
  { time: '00:00', voltage: 12, current: 5, power: 60, boardPower: 40, batteryPercentage: 80 },
  { time: '04:00', voltage: 12.5, current: 5.5, power: 68.75, boardPower: 45, batteryPercentage: 85 },
  { time: '08:00', voltage: 13, current: 6, power: 78, boardPower: 50, batteryPercentage: 90 },
  { time: '12:00', voltage: 13.5, current: 6.5, power: 87.75, boardPower: 55, batteryPercentage: 95 },
  { time: '16:00', voltage: 13, current: 6, power: 78, boardPower: 50, batteryPercentage: 90 },
  { time: '20:00', voltage: 12.5, current: 5.5, power: 68.75, boardPower: 45, batteryPercentage: 85 },
];

const MetricCard = ({ title, value, unit, icon: Icon, dataKey, stroke, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Draggable draggableId={title} index={index}>
      {(provided) => (
        <motion.div
          {...provided.draggableProps}
          ref={provided.innerRef}
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`bg-card text-card-foreground rounded-lg overflow-hidden ${isOpen ? 'col-span-full' : ''}`}
        >
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="w-full" {...provided.dragHandleProps}>
              <Card className="bg-transparent border-none relative">
                <motion.div
                  layout
                  className="h-24 relative"
                  style={{ originX: 0, originY: 0 }}
                >
                  <motion.div
                    layout
                    className="absolute inset-0 flex flex-col justify-between p-4"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
                      <div className="flex items-center">
                        <motion.div
                          className="mr-2"
                          initial={false}
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                        <CardTitle className="text-sm font-medium">{title}</CardTitle>
                      </div>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-0">
                      <motion.div
                        layout
                        className="text-2xl font-bold"
                      >
                        {value}{unit}
                      </motion.div>
                    </CardContent>
                  </motion.div>
                </motion.div>
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
      )}
    </Draggable>
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
  const [metrics, setMetrics] = useState([
    { title: "Voltage", value: mockData[mockData.length - 1].voltage, unit: "V", icon: Zap, dataKey: "voltage", stroke: "#ffd700" },
    { title: "Current", value: mockData[mockData.length - 1].current, unit: "A", icon: Activity, dataKey: "current", stroke: "#00ff00" },
    { title: "Power", value: mockData[mockData.length - 1].power, unit: "W", icon: Gauge, dataKey: "power", stroke: "#ff4500" },
    { title: "Board Power", value: mockData[mockData.length - 1].boardPower, unit: "W", icon: Zap, dataKey: "boardPower", stroke: "#1e90ff" },
    { title: "Battery", value: mockData[mockData.length - 1].batteryPercentage, unit: "%", icon: Battery, dataKey: "batteryPercentage", stroke: "#8a2be2" },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(metrics);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMetrics(items);
  };

  return (
    <div className={`min-h-screen bg-background text-foreground`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="p-8">
        <h2 className="text-3xl font-bold mb-8">Solar Power Dashboard</h2>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="metrics">
            {(provided) => (
              <LayoutGroup>
                <motion.div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={metric.title}
                      layout
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 100
                      }}
                    >
                      <MetricCard {...metric} index={index} />
                    </motion.div>
                  ))}
                  {provided.placeholder}
                </motion.div>
              </LayoutGroup>
            )}
          </Droppable>
        </DragDropContext>
      </main>
    </div>
  );
};

export default Index;