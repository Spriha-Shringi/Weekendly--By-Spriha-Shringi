import { useState } from "react";
import { GhostButton, Modal } from "./ui.tsx";
import { useSchedule } from "../store";

export function DatePicker() {
  const [isOpen, setIsOpen] = useState(false);
  
  const days = useSchedule((s) => s.days);

  // Get current date and next 2 months of weekends
  const getUpcomingWeekends = () => {
    const weekends = [];
    const now = new Date();
    const twoMonthsLater = new Date(now);
    twoMonthsLater.setMonth(now.getMonth() + 2);
    
    let currentDate = new Date(now);
    let weekendCount = 0;
    
    while (currentDate <= twoMonthsLater && weekendCount < 8) {
      if (currentDate.getDay() === 6) { // Saturday
        const saturday = new Date(currentDate);
        const sunday = new Date(currentDate);
        sunday.setDate(saturday.getDate() + 1);
        
        const daysDiff = Math.ceil((saturday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        let label;
        if (daysDiff <= 1) label = "This Weekend";
        else if (daysDiff <= 8) label = "Next Weekend";
        else {
          const monthName = saturday.toLocaleDateString('en-US', { month: 'short' });
          label = `${monthName} ${saturday.getDate()}`;
        }
        
        weekends.push({
          saturday: saturday,
          sunday: sunday,
          label: label,
          dateRange: `${saturday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
        });
        
        weekendCount++;
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return weekends;
  };

  const formatDateRange = (saturday: Date, sunday: Date) => {
    const satStr = saturday.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
    const sunStr = sunday.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
    return `${satStr} - ${sunStr}`;
  };

  const selectWeekend = (saturday: Date, sunday: Date) => {
    // const satStr = `${saturday.getFullYear()}-${(saturday.getMonth() + 1).toString().padStart(2, '0')}-${saturday.getDate().toString().padStart(2, '0')}`;
    // setSelectedDate(satStr);
    setIsOpen(false);
    
    // Calculate all days for this weekend
    const thursday = new Date(saturday);
    thursday.setDate(saturday.getDate() - 2);
    
    const friday = new Date(saturday);
    friday.setDate(saturday.getDate() - 1);
    
    const monday = new Date(sunday);
    monday.setDate(sunday.getDate() + 1);
    
    const tuesday = new Date(sunday);
    tuesday.setDate(sunday.getDate() + 2);
    
    // Store selected weekend dates in localStorage for other components
    localStorage.setItem('weekendly-selected-date', JSON.stringify({
      thursday: thursday.toISOString(),
      friday: friday.toISOString(),
      saturday: saturday.toISOString(),
      sunday: sunday.toISOString(),
      monday: monday.toISOString(),
      tuesday: tuesday.toISOString(),
      range: formatDateRange(saturday, sunday),
      weekStart: thursday.toISOString(),
      weekEnd: tuesday.toISOString()
    }));
    
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('weekend-date-selected'));
  };

  const upcomingWeekends = getUpcomingWeekends();
  const storedDate = localStorage.getItem('weekendly-selected-date');
  const currentSelection = storedDate ? JSON.parse(storedDate) : null;

  if (days.length === 0) return null;

  return (
    <>
      <GhostButton 
        onClick={() => setIsOpen(true)}
        className="whitespace-nowrap text-sm"
      >
        📅 {currentSelection ? currentSelection.range : "Select Dates"}
      </GhostButton>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="📅 Choose Your Weekend Dates"
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <p className="text-sm text-[rgb(var(--muted))]">
            Select specific dates for your weekend plan to get better suggestions and export options.
          </p>
          
          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
            {upcomingWeekends.map((weekend, index) => (
              <button
                key={index}
                onClick={() => selectWeekend(weekend.saturday, weekend.sunday)}
                className="w-full p-4 text-left rounded-lg border-2 border-sky-200 dark:border-emerald-600 hover:border-sky-500 dark:hover:border-emerald-400 hover:bg-sky-50 dark:hover:bg-emerald-900/20 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sky-800 dark:text-emerald-300">{weekend.label}</div>
                    <div className="text-sm opacity-75">
                      {weekend.dateRange}
                    </div>
                  </div>
                  <div className="text-2xl">
                    {index === 0 ? "🎯" : "📅"}
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="text-xs text-center opacity-60 pt-4 border-t border-sky-200 dark:border-emerald-600">
            💡 Selecting dates helps with long weekend detection and calendar export
          </div>
        </div>
      </Modal>
    </>
  );
}
