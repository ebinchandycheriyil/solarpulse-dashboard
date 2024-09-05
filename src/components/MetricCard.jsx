import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MetricCard = ({ title, value, unit, icon: Icon, dataKey, stroke, mockData, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`bg-card text-card-foreground rounded-lg overflow-hidden ${isOpen ? 'col-span-full' : 'col-span-1'}`}
      style={{
        width: isOpen ? '100%' : 'auto',
        transition: 'width 0.3s ease-in-out',
        backgroundColor: 'var(--card-bg-color)',
      }}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <Card className="bg-transparent border-none relative">
            <div className="h-24 relative">
              <motion.div
                layout
                className="absolute inset-0 flex flex-col justify-between p-4"
                style={{
                  transition: 'all 0.3s ease-in-out',
                }}
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
                  <div className="text-2xl font-bold">{value}{unit}</div>
                </CardContent>
              </motion.div>
            </div>
          </Card>
        </CollapsibleTrigger>
        <CollapsibleContent>
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
      </Collapsible>
    </motion.div>
  );
};

export default MetricCard;