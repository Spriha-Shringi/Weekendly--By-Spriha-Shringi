import { useSchedule } from "../store";
import { GhostButton, Segmented, Button, Badge } from "../components/ui.tsx";
import { AIChatbot } from "./AIChatbot.tsx";
import { CalendarSync } from "./CalendarSync.tsx";
import { VibeGenerator } from "./VibeGenerator.tsx";
import { DatePicker } from "./DatePicker.tsx";

export function Toolbar() {
  const theme = useSchedule((s) => s.theme);
  const setTheme = useSchedule((s) => s.setTheme);
  const addDay = useSchedule((s) => s.addDay);
  const days = useSchedule((s) => s.days);
  const schedule = useSchedule((s) => s.schedule);
  
  // Get selected weekend dates
  const getSelectedDates = () => {
    const storedDate = localStorage.getItem('weekendly-selected-date');
    return storedDate ? JSON.parse(storedDate) : null;
  };
  
  const selectedDates = getSelectedDates();
  
  // Format day with date if available
  const formatDayButton = (dayName: string) => {
    if (!selectedDates) return `+ ${dayName.slice(0, 3)}`;
    
    const dayKey = dayName.toLowerCase();
    if (selectedDates[dayKey]) {
      const date = new Date(selectedDates[dayKey]);
      const dayNum = date.getDate();
      return `+ ${dayName.slice(0, 3)} ${dayNum}`;
    }
    
    return `+ ${dayName.slice(0, 3)}`;
  };
  
  // Get all current activities for AI context
  const currentActivities = days.flatMap(day => 
    (schedule[day] || []).map(activity => activity.name)
  );

  // Check if a day can be added (must be consecutive)
  const canAddDay = (dayToAdd: string) => {
    const dayOrder = ["Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
    const dayIndex = dayOrder.indexOf(dayToAdd);
    
    if (days.length === 0) {
      // Can only start with Sat or Sun if no days exist
      return dayToAdd === "Saturday" || dayToAdd === "Sunday";
    }
    
    const currentDays = days.filter(d => dayOrder.includes(d)).sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
    const firstDayIndex = dayOrder.indexOf(currentDays[0]);
    const lastDayIndex = dayOrder.indexOf(currentDays[currentDays.length - 1]);
    
    // Can only add if it's adjacent to existing days
    return dayIndex === firstDayIndex - 1 || dayIndex === lastDayIndex + 1;
  };
  
  // Enhanced logic: Thursday can only be added if Friday exists
  const canAddThursday = () => {
    return days.includes("Friday") && canAddDay("Thursday");
  };
  
  // Tuesday can only be added if Monday exists  
  const canAddTuesday = () => {
    return days.includes("Monday") && canAddDay("Tuesday");
  };
  return (
    <div className="flex flex-wrap items-center gap-3 justify-between">
      <div className="flex items-center gap-2">
        <Segmented
          options={["light", "dark", "system"]}
          value={theme}
          onChange={(v) => setTheme(v as any)}
        />
        {!days.includes("Thursday") && canAddThursday() && (
          <GhostButton onClick={() => addDay("Thursday")}>{formatDayButton("Thursday")}</GhostButton>
        )}
        {!days.includes("Friday") && canAddDay("Friday") && (
          <GhostButton onClick={() => addDay("Friday")}>{formatDayButton("Friday")}</GhostButton>
        )}
        {!days.includes("Saturday") && canAddDay("Saturday") && (
          <GhostButton onClick={() => addDay("Saturday")}>{formatDayButton("Saturday")}</GhostButton>
        )}
        {!days.includes("Sunday") && canAddDay("Sunday") && (
          <GhostButton onClick={() => addDay("Sunday")}>{formatDayButton("Sunday")}</GhostButton>
        )}
        {!days.includes("Monday") && canAddDay("Monday") && (
          <GhostButton onClick={() => addDay("Monday")}>{formatDayButton("Monday")}</GhostButton>
        )}
        {!days.includes("Tuesday") && canAddTuesday() && (
          <GhostButton onClick={() => addDay("Tuesday")}>{formatDayButton("Tuesday")}</GhostButton>
        )}
        <Badge>{days.length} day(s)</Badge>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto">
        <VibeGenerator />
        <DatePicker />
        <AIChatbot 
          currentActivities={currentActivities}
          days={days}
        />
        <CalendarSync />
        <Button
          onClick={() =>
            window.open(
              "https://www.google.com/maps/search/cafes+near+me",
              "_blank"
            )
          }
        >
          Find Cafés ☕
        </Button>
      </div>
    </div>
  );
}
