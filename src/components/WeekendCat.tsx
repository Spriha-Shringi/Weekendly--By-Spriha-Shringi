import { useState, useEffect } from "react";
import { useSchedule } from "../store";

const catTips = [
  "🐱 Meow! Try adding a morning activity to start your day right!",
  "😸 Purrfect! Balance energetic activities with relaxing ones.",
  "🙀 Don't forget to plan some outdoor time - fresh air is pawsome!",
  "😻 Mix solo activities with social ones for the best weekend!",
  "🐾 Remember to leave some spontaneous time for unexpected adventures!",
  "😺 A good weekend has variety - try different activity types!",
  "🎯 Planning ahead helps, but don't over-schedule your weekend!",
  "🌟 Self-care activities are just as important as fun ones!",
  "🎨 Creative activities can be surprisingly relaxing and fulfilling!",
  "🍃 Nature activities help reset your energy for the week ahead!"
];

export function WeekendCat() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState("");
  const [catMood, setCatMood] = useState("😸");
  
  const days = useSchedule((s) => s.days);
  const schedule = useSchedule((s) => s.schedule);

  useEffect(() => {
    // Show cat periodically with tips
    const interval = setInterval(() => {
      const totalActivities = days.reduce((sum, day) => sum + (schedule[day]?.length || 0), 0);
      
      if (totalActivities > 0 && Math.random() > 0.7) {
        const tip = catTips[Math.floor(Math.random() * catTips.length)];
        setCurrentTip(tip);
        
        // Set cat mood based on weekend balance
        const energeticCount = days.reduce((sum, day) => 
          sum + (schedule[day]?.filter(a => a.mood === "Energetic").length || 0), 0
        );
        const relaxedCount = days.reduce((sum, day) => 
          sum + (schedule[day]?.filter(a => a.mood === "Relaxed").length || 0), 0
        );
        
        if (energeticCount > relaxedCount * 2) setCatMood("🙀");
        else if (relaxedCount > energeticCount * 2) setCatMood("😴");
        else setCatMood("😸");
        
        setIsVisible(true);
        
        // Hide after 5 seconds
        setTimeout(() => setIsVisible(false), 5000);
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, [days, schedule]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-bounce">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 max-w-xs">
        <div className="flex items-start gap-3">
          <div className="text-3xl">{catMood}</div>
          <div className="flex-1">
            <div className="text-sm font-medium mb-1">Weekend Cat</div>
            <div className="text-xs opacity-75 leading-relaxed">
              {currentTip}
            </div>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 text-xs"
          >
            ✕
          </button>
        </div>
        
        {/* Cat paw prints */}
        <div className="absolute -bottom-2 -right-2 text-gray-300 dark:text-gray-600 text-xs">
          🐾
        </div>
      </div>
    </div>
  );
}
