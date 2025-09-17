import { useState } from "react";
import { useSchedule } from "../store";
import { Button, GhostButton, Modal } from "./ui.tsx";

export function CalendarSync() {
  const [isOpen, setIsOpen] = useState(false);
  const days = useSchedule((s) => s.days);
  const schedule = useSchedule((s) => s.schedule);

  const generateICSFile = () => {
    const now = new Date();
    const nextWeekend = new Date(now);
    
    // Find next Saturday
    const dayOfWeek = now.getDay();
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
    nextWeekend.setDate(now.getDate() + daysUntilSaturday);
    
    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Weekendly//Weekend Planner//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    const dayMapping: Record<string, number> = {
      'Thursday': -2,
      'Friday': -1,
      'Saturday': 0,
      'Sunday': 1,
      'Monday': 2,
      'Tuesday': 3
    };

    days.forEach(day => {
      const activities = schedule[day] || [];
      const dayOffset = dayMapping[day] || 0;
      const eventDate = new Date(nextWeekend);
      eventDate.setDate(nextWeekend.getDate() + dayOffset);
      
      activities.forEach((activity, index) => {
        const startTime = new Date(eventDate);
        startTime.setHours(10 + index * 2, 0, 0, 0); // Start at 10 AM, 2 hours apart
        
        const endTime = new Date(startTime);
        endTime.setHours(startTime.getHours() + 1); // 1 hour duration
        
        const formatDate = (date: Date) => {
          return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };

        icsContent.push(
          'BEGIN:VEVENT',
          `UID:${activity.instanceId}@weekendly.app`,
          `DTSTART:${formatDate(startTime)}`,
          `DTEND:${formatDate(endTime)}`,
          `SUMMARY:${activity.name}`,
          `DESCRIPTION:${activity.category} activity - Mood: ${activity.mood}`,
          `LOCATION:To be determined`,
          'STATUS:CONFIRMED',
          'TRANSP:OPAQUE',
          'END:VEVENT'
        );
      });
    });

    icsContent.push('END:VCALENDAR');
    
    return icsContent.join('\r\n');
  };

  const downloadICS = () => {
    const icsContent = generateICSFile();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'weekendly-schedule.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
  };

  const copyToClipboard = () => {
    const scheduleText = days.map(day => {
      const activities = schedule[day] || [];
      return `${day}:\n${activities.map(a => `• ${a.name} (${a.mood})`).join('\n')}`;
    }).join('\n\n');

    navigator.clipboard.writeText(scheduleText).then(() => {
      alert('Schedule copied to clipboard!');
      setIsOpen(false);
    });
  };

  if (days.length === 0) return null;

  return (
    <>
      <GhostButton 
        onClick={() => setIsOpen(true)}
        className="whitespace-nowrap"
      >
        📅 Export Schedule
      </GhostButton>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="📅 Export Your Weekend Plan"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Export your weekend schedule to your calendar app or share it with others.
          </p>
          
          <div 
            className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm border border-gray-200 dark:border-gray-600"
            style={useSchedule.getState().theme === "dark" ? { color: 'black' } : undefined}
          >
            <div 
              className="font-medium mb-2"
              style={useSchedule.getState().theme === "dark" ? { color: 'black' } : undefined}
            >
              Your Schedule Preview:
            </div>
            {days.map(day => {
              const activities = schedule[day] || [];
              if (activities.length === 0) return null;
              return (
                <div key={day} className="mb-2">
                  <div 
                    className="font-medium"
                    style={useSchedule.getState().theme === "dark" ? { color: 'black' } : undefined}
                  >
                    {day}:
                  </div>
                  {activities.map(activity => (
                    <div 
                      key={activity.instanceId} 
                      className="ml-2 text-xs"
                      style={useSchedule.getState().theme === "dark" ? { color: 'black' } : undefined}
                    >
                      • {activity.name} ({activity.mood})
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={downloadICS}
              className="flex-1"
            >
              📥 Download .ics file
            </Button>
            <GhostButton 
              onClick={copyToClipboard}
              className="flex-1"
            >
              📋 Copy as Text
            </GhostButton>
          </div>
          
          <div className="text-xs text-gray-600 dark:text-gray-400">
            💡 The .ics file can be imported into Google Calendar, Apple Calendar, Outlook, or any calendar app.
          </div>
        </div>
      </Modal>
    </>
  );
}
