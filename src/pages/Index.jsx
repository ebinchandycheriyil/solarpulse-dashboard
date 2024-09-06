import React, { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Battery, Zap, Activity, Gauge } from "lucide-react";
import MetricCard from "../components/MetricCard";
import CustHeader from "@/components/ui/header";

const mockData = [
  {
    time: "00:00",
    voltage: 12,
    current: 5,
    power: 60,
    boardPower: 40,
    batteryPercentage: 80,
  },
  {
    time: "04:00",
    voltage: 12.5,
    current: 5.5,
    power: 68.75,
    boardPower: 45,
    batteryPercentage: 85,
  },
  {
    time: "08:00",
    voltage: 13,
    current: 6,
    power: 78,
    boardPower: 50,
    batteryPercentage: 90,
  },
  {
    time: "12:00",
    voltage: 13.5,
    current: 6.5,
    power: 87.75,
    boardPower: 55,
    batteryPercentage: 95,
  },
  {
    time: "16:00",
    voltage: 13,
    current: 6,
    power: 78,
    boardPower: 50,
    batteryPercentage: 90,
  },
  {
    time: "20:00",
    voltage: 12.5,
    current: 5.5,
    power: 68.75,
    boardPower: 45,
    batteryPercentage: 85,
  },
];

const Index = ({ theme, toggleTheme }) => {
  const [metrics, setMetrics] = useState([
    {
      title: "Voltage",
      value: mockData[mockData.length - 1].voltage,
      unit: "V",
      icon: Zap,
      dataKey: "voltage",
      stroke: "#ffd700",
    },
    {
      title: "Current",
      value: mockData[mockData.length - 1].current,
      unit: "A",
      icon: Activity,
      dataKey: "current",
      stroke: "#00ff00",
    },
    {
      title: "Power",
      value: mockData[mockData.length - 1].power,
      unit: "W",
      icon: Gauge,
      dataKey: "power",
      stroke: "#ff4500",
    },
    {
      title: "Board Power",
      value: mockData[mockData.length - 1].boardPower,
      unit: "W",
      icon: Zap,
      dataKey: "boardPower",
      stroke: "#1e90ff",
    },
    {
      title: "Battery",
      value: mockData[mockData.length - 1].batteryPercentage,
      unit: "%",
      icon: Battery,
      dataKey: "batteryPercentage",
      stroke: "#8a2be2",
    },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(metrics);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setMetrics(items);
  };

  return (
    <div className={`min-h-screen bg-background text-foreground`}>
      <CustHeader theme={theme} toggleTheme={toggleTheme} />
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
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min"
                >
                  {metrics.map((metric, index) => (
                    <MetricCard
                      key={metric.title}
                      {...metric}
                      mockData={mockData}
                      index={index}
                    />
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
