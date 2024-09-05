import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export const Header = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center p-4 bg-background text-foreground">
      <nav>
        <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
        <Button variant="ghost" onClick={() => navigate('/reports')}>Reports</Button>
        <Button variant="ghost" onClick={() => navigate('/trend')}>Trend</Button>
      </nav>
      <Button variant="ghost" onClick={toggleTheme}>
        {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </Button>
    </header>
  );
};