import React, { useState } from 'react';
import { Header } from './Index';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockData = [
  { time: '00:00', voltage: 12, current: 5, power: 60, boardPower: 40, batteryPercentage: 80 },
  { time: '04:00', voltage: 12.5, current: 5.5, power: 68.75, boardPower: 45, batteryPercentage: 85 },
  { time: '08:00', voltage: 13, current: 6, power: 78, boardPower: 50, batteryPercentage: 90 },
  { time: '12:00', voltage: 13.5, current: 6.5, power: 87.75, boardPower: 55, batteryPercentage: 95 },
  { time: '16:00', voltage: 13, current: 6, power: 78, boardPower: 50, batteryPercentage: 90 },
  { time: '20:00', voltage: 12.5, current: 5.5, power: 68.75, boardPower: 45, batteryPercentage: 85 },
];

const metrics = [
  { key: 'voltage', color: '#8884d8', unit: 'V' },
  { key: 'current', color: '#82ca9d', unit: 'A' },
  { key: 'power', color: '#ffc658', unit: 'W' },
  { key: 'boardPower', color: '#ff7300', unit: 'W' },
  { key: 'batteryPercentage', color: '#0088FE', unit: '%' },
];

const Trend = ({ theme, toggleTheme }) => {
  const [selectedMetrics, setSelectedMetrics] = useState(['voltage', 'current']);

  const handleMetricToggle = (metric) => {
    setSelectedMetrics(prev =>
      prev.includes(metric)
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  return (
    <div className={`min-h-screen bg-background text-foreground`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="p-8">
        <h2 className="text-3xl font-bold mb-8">Trend Analysis</h2>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {metrics.map(metric => (
                <div key={metric.key} className="flex items-center">
                  <Checkbox
                    id={metric.key}
                    checked={selectedMetrics.includes(metric.key)}
                    onCheckedChange={() => handleMetricToggle(metric.key)}
                  />
                  <label
                    htmlFor={metric.key}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {metric.key.charAt(0).toUpperCase() + metric.key.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Trend Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  {selectedMetrics.map((metric, index) => (
                    <YAxis
                      key={metric}
                      yAxisId={metric}
                      orientation={index % 2 === 0 ? "left" : "right"}
                      stroke={metrics.find(m => m.key === metric).color}
                    />
                  ))}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                    itemStyle={{
                      color: theme === 'dark' ? '#e5e7eb' : '#374151',
                    }}
                  />
                  <Legend />
                  {selectedMetrics.map(metric => {
                    const metricInfo = metrics.find(m => m.key === metric);
                    return (
                      <Line
                        key={metric}
                        type="monotone"
                        dataKey={metric}
                        stroke={metricInfo.color}
                        yAxisId={metric}
                        name={`${metric.charAt(0).toUpperCase() + metric.slice(1)} (${metricInfo.unit})`}
                      />
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Trend;