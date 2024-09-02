import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import { Header } from './Index';

const Reports = ({ theme, toggleTheme }) => {
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
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('Solar Power System Report', 20, 20);
    
    // Add date range
    doc.setFontSize(12);
    doc.text(`Date Range: ${startDate.toDateString()} - ${endDate.toDateString()}`, 20, 30);
    
    // Add selected values
    doc.setFontSize(14);
    doc.text('Selected Values:', 20, 40);
    let yPosition = 50;
    Object.entries(selectedValues).forEach(([key, value]) => {
      if (value) {
        doc.text(`- ${key.charAt(0).toUpperCase() + key.slice(1)}`, 30, yPosition);
        yPosition += 10;
      }
    });
    
    // Add sample data (you would replace this with actual data in a real application)
    doc.setFontSize(14);
    doc.text('Sample Data:', 20, yPosition + 10);
    yPosition += 20;
    if (selectedValues.voltage) {
      doc.text('Voltage: 12.5V', 30, yPosition);
      yPosition += 10;
    }
    if (selectedValues.current) {
      doc.text('Current: 5.2A', 30, yPosition);
      yPosition += 10;
    }
    if (selectedValues.power) {
      doc.text('Power: 65W', 30, yPosition);
      yPosition += 10;
    }
    if (selectedValues.boardPower) {
      doc.text('Board Power: 45W', 30, yPosition);
      yPosition += 10;
    }
    if (selectedValues.batteryPercentage) {
      doc.text('Battery Percentage: 85%', 30, yPosition);
    }
    
    // Save the PDF
    doc.save('solar_power_report.pdf');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="p-4 sm:p-8">
        <h1 className="text-3xl font-bold mb-8">Generate Report</h1>
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Select Report Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <label className="block mb-2">Start Date</label>
                <DatePicker date={startDate} setDate={setStartDate} />
              </div>
              <div className="w-full sm:w-1/2">
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
    </div>
  );
};

export default Reports;