import React from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export const Header = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-background border-b border-border p-4 flex justify-between items-center">
      <nav>
        <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
        <Button variant="ghost" onClick={() => navigate('/reports')}>Reports</Button>
        <Button variant="ghost" onClick={() => navigate('/trend')}>Trend</Button>
      </nav>
      <Button variant="ghost" size="icon" onClick={toggleTheme}>
        {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      </Button>
    </header>
  );
};