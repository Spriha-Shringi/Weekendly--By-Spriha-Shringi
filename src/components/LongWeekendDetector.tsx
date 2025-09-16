import { useEffect, useState } from "react";
import { useSchedule } from "../store";
import { Card, Button } from "./ui.tsx";

interface Holiday {
  date: Date;
  name: string;
  dayOfWeek: string;
}

export function LongWeekendDetector() {
  const days = useSchedule((s) => s.days);
  const addDay = useSchedule((s) => s.addDay);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [suggestedDay, setSuggestedDay] = useState<string | null>(null);

  // Indian holidays detection with IST timezone
  const getUpcomingHolidays = (): Holiday[] => {
    const now = new Date();
    // Convert to IST (UTC+5:30)
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(now.getTime() + istOffset);
    const currentYear = istNow.getFullYear();
    
    // Official Indian public holidays (2025-2026) - only gazetted holidays with office closures
    const holidays = [
        // 2025 holidays
        { month: 0, day: 26, name: "Republic Day", year: 2025 },
        { month: 2, day: 14, name: "Holi", year: 2025 },
        { month: 3, day: 18, name: "Good Friday", year: 2025 },
        { month: 7, day: 15, name: "Independence Day", year: 2025 },
        { month: 7, day: 16, name: "Janmashtami", year: 2025 },
        { month: 7, day: 9, name: "Raksha Bandhan", year: 2025 },
        { month: 9, day: 2, name: "Gandhi Jayanti", year: 2025 },
        { month: 9, day: 2, name: "Dussehra", year: 2025 },
        { month: 9, day: 21, name: "Diwali / Deepavali", year: 2025 },
        { month: 10, day: 5, name: "Guru Nanak Jayanti", year: 2025 },
        { month: 11, day: 25, name: "Christmas Day", year: 2025 },
      
        // 2026 holidays
        { month: 0, day: 26, name: "Republic Day", year: 2026 },
        { month: 2, day: 4, name: "Holi", year: 2026 },
        { month: 3, day: 3, name: "Good Friday", year: 2026 },
        { month: 7, day: 15, name: "Independence Day", year: 2026 },
        { month: 7, day: 28, name: "Raksha Bandhan", year: 2026 },       // Aug 28, 2026
        { month: 8, day: 4, name: "Janmashtami", year: 2026 },            // Sep 4, 2026 (month=8 since Sept is 9th month, 0-indexed)
        { month: 9, day: 2, name: "Gandhi Jayanti", year: 2026 },
        { month: 9, day: 20, name: "Dussehra", year: 2026 },
        { month: 10, day: 8, name: "Diwali / Deepavali", year: 2026 },
        { month: 10, day: 24, name: "Guru Nanak Jayanti", year: 2026 },
        { month: 11, day: 25, name: "Christmas Day", year: 2026 },
      ];
      

    return holidays.map(h => {
      const targetYear = h.year || currentYear;
      const date = new Date(targetYear, h.month, h.day);
      // If holiday has passed this year, check next year (unless specific year is set)
      if (date < now && !h.year) {
        date.setFullYear(currentYear + 1);
      }
      return {
        date,
        name: h.name,
        dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' })
      };
    }).filter(h => {
      // Only show holidays within next 60 days
      const diffTime = h.date.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 && diffDays <= 60;
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  useEffect(() => {
    const holidays = getUpcomingHolidays();
    
    for (const holiday of holidays) {
      const dayName = holiday.dayOfWeek;
      
      // Check for long weekend opportunities
      if (dayName === 'Monday' && days.includes('Sunday') && !days.includes('Monday')) {
        setSuggestion(`🎉 ${holiday.name} is coming up on ${holiday.date.toLocaleDateString()}! Extend your weekend with Monday?`);
        setSuggestedDay('Monday');
        break;
      } else if (dayName === 'Friday' && days.includes('Saturday') && !days.includes('Friday')) {
        setSuggestion(`🎉 ${holiday.name} falls on ${holiday.date.toLocaleDateString()}! Start your weekend early with Friday?`);
        setSuggestedDay('Friday');
        break;
      } else if (dayName === 'Thursday' && days.includes('Friday') && !days.includes('Thursday')) {
        setSuggestion(`🎉 ${holiday.name} is on ${holiday.date.toLocaleDateString()}! How about a 4-day weekend starting Thursday?`);
        setSuggestedDay('Thursday');
        break;
      } else if (dayName === 'Tuesday' && days.includes('Monday') && !days.includes('Tuesday')) {
        setSuggestion(`🎉 ${holiday.name} falls on ${holiday.date.toLocaleDateString()}! Extend your weekend through Tuesday?`);
        setSuggestedDay('Tuesday');
        break;
      }
    }
  }, [days]);

  if (!suggestion || !suggestedDay) {
    return null;
  }

  return (
    <Card className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
            Long Weekend Alert!
          </div>
          <div className="text-xs text-blue-700 dark:text-blue-200 mt-1">
            {suggestion}
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              addDay(suggestedDay);
              setSuggestion(null);
              setSuggestedDay(null);
            }}
            className="text-xs px-3 py-1"
          >
            Add {suggestedDay}
          </Button>
          <button 
            onClick={() => {
              setSuggestion(null);
              setSuggestedDay(null);
            }}
            className="text-xs px-2 py-1 text-gray-500 hover:text-gray-700"
            style={
              { color: 'black' }
            } 
            >
            ✕
          </button>
        </div>
      </div>
    </Card>
  );
}
