import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Battery, Zap, Activity, Gauge } from 'lucide-react';

const mockData = [
  { time: '00:00', voltage: 12, current: 5, power: 60, boardPower: 40, batteryPercentage: 80 },
  { time: '04:00', voltage: 12.5, current: 5.5, power: 68.75, boardPower: 45, batteryPercentage: 85 },
  { time: '08:00', voltage: 13, current: 6, power: 78, boardPower: 50, batteryPercentage: 90 },
  { time: '12:00', voltage: 13.5, current: 6.5, power: 87.75, boardPower: 55, batteryPercentage: 95 },
  { time: '16:00', voltage: 13, current: 6, power: 78, boardPower: 50, batteryPercentage: 90 },
  { time: '20:00', voltage: 12.5, current: 5.5, power: 68.75, boardPower: 45, batteryPercentage: 85 },
];

const MetricCard = ({ title, value, unit, icon: Icon }) => (
  <Card className="bg-gray-800 text-white">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}{unit}</div>
    </CardContent>
  </Card>
);

const TrendChart = ({ data, dataKey, stroke }) => (
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
      <XAxis dataKey="time" stroke="#888" />
      <YAxis stroke="#888" />
      <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
      <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Solar Power Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <MetricCard title="Voltage" value={mockData[mockData.length - 1].voltage} unit="V" icon={Zap} />
        <MetricCard title="Current" value={mockData[mockData.length - 1].current} unit="A" icon={Activity} />
        <MetricCard title="Power" value={mockData[mockData.length - 1].power} unit="W" icon={Gauge} />
        <MetricCard title="Board Power" value={mockData[mockData.length - 1].boardPower} unit="W" icon={Zap} />
        <MetricCard title="Battery" value={mockData[mockData.length - 1].batteryPercentage} unit="%" icon={Battery} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>Voltage Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendChart data={mockData} dataKey="voltage" stroke="#ffd700" />
          </CardContent>
        </Card>
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>Current Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendChart data={mockData} dataKey="current" stroke="#00ff00" />
          </CardContent>
        </Card>
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>Power Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendChart data={mockData} dataKey="power" stroke="#ff4500" />
          </CardContent>
        </Card>
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>Board Power Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendChart data={mockData} dataKey="boardPower" stroke="#1e90ff" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;