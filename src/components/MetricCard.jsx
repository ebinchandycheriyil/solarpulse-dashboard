import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MetricCard = ({ title, value, unit, icon: Icon, dataKey, stroke, mockData, index, isExpanded, onToggle, layout }) => {
  return (
    <motion.div
      layout
      transition={{ duration: 1, ease: "easeInOut" }}
      className={`bg-card text-card-foreground rounded-lg overflow-hidden`}
      style={{
        gridColumn: isExpanded ? '1 / -1' : 'auto',
        gridRow: isExpanded ? 'span 2' : 'auto',
      }}
    >
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CollapsibleTrigger className="w-full">
          <Card className="bg-transparent border-none relative">
            <div className="h-24 relative">
              <motion.div
                className="absolute inset-0 flex flex-col justify-between p-4"
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
                  <div className="flex items-center">
                    <motion.div
                      className="mr-2"
                      initial={false}
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 1 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                  </div>
                  <motion.div initial={false} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </CardHeader>
                <CardContent className="p-0">
                  <motion.div initial={false} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-2xl font-bold">
                    {value}{unit}
                  </motion.div>
                </CardContent>
              </motion.div>
            </div>
          </Card>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 1 }}
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
            )}
          </AnimatePresence>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
};

export default MetricCard;