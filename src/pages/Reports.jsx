import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { FileText } from 'lucide-react';

const Reports = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedValues, setSelectedValues] = useState({
    voltage: false,
    current: false,
    power: false,
    boardPower: false,
    batteryPercentage: false,
  });

  const handleCheckboxChange = (value) => {
    setSelectedValues(prev => ({ ...prev, [value]: !prev[value] }));
  };

  const handleGenerateReport = () => {
    // Here you would implement the logic to generate the PDF report
    console.log('Generating report with:', { startDate, endDate, selectedValues });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Generate Report</h1>
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle>Select Report Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex space-x-4">
            <div>
              <label className="block mb-2">Start Date</label>
              <DatePicker date={startDate} setDate={setStartDate} />
            </div>
            <div>
              <label className="block mb-2">End Date</label>
              <DatePicker date={endDate} setDate={setEndDate} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Select Values to Include</h3>
            <div className="space-y-2">
              {Object.entries(selectedValues).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={() => handleCheckboxChange(key)}
                  />
                  <label htmlFor={key} className="ml-2 capitalize">{key}</label>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={handleGenerateReport} className="w-full">
            <FileText className="mr-2 h-4 w-4" /> Generate Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;