import { useState } from "react";
import { Button, GhostButton, Modal, Card } from "./ui.tsx";
import { useSchedule } from "../store";

type Vibe = "lazy" | "adventurous" | "family" | "productive" | "cultural" | "selfcare" | "social" | "chill";

interface VibeConfig {
  name: string;
  emoji: string;
  color: string;
  gradient: string;
  activities: string[];
  description: string;
}

const vibeConfigs: Record<Vibe, VibeConfig> = {
  lazy: {
    name: "Lazy Weekend",
    emoji: "😴",
    color: "from-teal-400 to-cyan-500",
    gradient: "bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20",
    description: "Maximum relaxation with minimal effort",
    activities: ["Bath Time", "Movie Night", "Coffee Shop Visit", "Reading", "Meditation", "Spa Day"]
  },
  adventurous: {
    name: "Adventurous Weekend",
    emoji: "🏔️",
    color: "from-orange-500 to-red-600",
    gradient: "bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20",
    description: "Bold experiences and outdoor thrills",
    activities: ["Hiking", "Cycling", "Beach Visit", "Nature Walk", "Kayaking", "Fishing"]
  },
  family: {
    name: "Family Weekend",
    emoji: "👨‍👩‍👧‍👦",
    color: "from-green-500 to-emerald-600",
    gradient: "bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20",
    description: "Quality time with loved ones",
    activities: ["Picnic", "Board Games", "Cooking Class", "Museum Visit", "Festival", "Make Pizza"]
  },
  productive: {
    name: "Productive Weekend",
    emoji: "💪",
    color: "from-blue-500 to-indigo-600",
    gradient: "bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
    description: "Getting things done and personal growth",
    activities: ["Yoga", "Goal Planning", "Learn Language", "Gym Workout", "Organizing", "Book Club"]
  },
  cultural: {
    name: "Cultural Weekend",
    emoji: "🎭",
    color: "from-purple-500 to-violet-600",
    gradient: "bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20",
    description: "Art, history, and enriching experiences",
    activities: ["Museum Visit", "Concert", "Festival", "Library Visit", "Photography", "Live Music"]
  },
  selfcare: {
    name: "Self-Care Weekend",
    emoji: "🧘‍♀️",
    color: "from-pink-500 to-rose-600",
    gradient: "bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20",
    description: "Wellness, relaxation, and personal rejuvenation",
    activities: ["Spa Day", "Meditation", "Yoga", "Bath Time", "Aromatherapy", "Skincare"]
  },
  social: {
    name: "Social Weekend",
    emoji: "👥",
    color: "from-amber-500 to-orange-600",
    gradient: "bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20",
    description: "Connect with friends and make memories",
    activities: ["Party", "Board Games", "Movie Night", "Dancing", "Bowling", "Shopping"]
  },
  chill: {
    name: "Chill Weekend",
    emoji: "😌",
    color: "from-cyan-500 to-blue-600",
    gradient: "bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20",
    description: "Relaxed vibes with minimal stress",
    activities: ["Coffee Shop Visit", "Reading", "Movie Night", "Bath Time", "Nature Walk", "Library Visit"]
  }
};

export function VibeGenerator() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVibe, setSelectedVibe] = useState<Vibe>("lazy");
  const [intensity, setIntensity] = useState(50);
  
  const add = useSchedule((s) => s.add);
  const activities = useSchedule((s) => s.activities);
  const days = useSchedule((s) => s.days);
  const addDay = useSchedule((s) => s.addDay);

  const generateWeekend = () => {
    const config = vibeConfigs[selectedVibe];
    const availableActivities = activities.filter(a => 
      config.activities.includes(a.name)
    );

    // If no days selected, start with weekend
    if (days.length === 0) {
      addDay("Saturday");
      addDay("Sunday");
    }

    // Add activities based on intensity
    const numActivities = Math.ceil((intensity / 100) * 4); // 1-4 activities
    const selectedActivities = availableActivities
      .sort(() => Math.random() - 0.5)
      .slice(0, numActivities);

    // Distribute across available days
    selectedActivities.forEach((activity, index) => {
      const dayIndex = index % days.length;
      add(days[dayIndex], activity);
    });

    setIsOpen(false);
  };

  const currentConfig = vibeConfigs[selectedVibe];

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-emerald-500 to-purple-500 hover:from-emerald-600 hover:to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold"
      >
        ✨ Generate Vibe
      </Button>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="🎨 Choose Your Weekend Vibe"
      >
        <div className="space-y-6">
          {/* Vibe Selector */}
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(vibeConfigs) as Vibe[]).map((vibe) => {
              const config = vibeConfigs[vibe];
              return (
                <button
                  key={vibe}
                  onClick={() => setSelectedVibe(vibe)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedVibe === vibe 
                      ? 'border-sky-500 dark:border-emerald-500 shadow-lg transform scale-105' 
                      : 'border-sky-200 dark:border-emerald-700 hover:border-sky-400 dark:hover:border-emerald-500'
                  } ${config.gradient}`}
                >
                  <div className="text-2xl mb-2">{config.emoji}</div>
                  <div className="font-medium text-sm">{config.name.replace(' Weekend', '')}</div>
                </button>
              );
            })}
          </div>

          {/* Selected Vibe Details */}
          <Card className={`p-4 ${currentConfig.gradient} border-0`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{currentConfig.emoji}</span>
              <div>
                <h3 className="font-semibold text-lg">{currentConfig.name}</h3>
                <p className="text-sm opacity-75">{currentConfig.description}</p>
              </div>
            </div>
            
            <div className="text-xs opacity-75">
              Sample activities: {currentConfig.activities.slice(0, 3).join(", ")}...
            </div>
          </Card>

          {/* Intensity Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="font-medium">Intensity Level</label>
              <span className="text-sm opacity-75">{intensity}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs opacity-60">
              <span>🌸 Light</span>
              <span>⚡ Intense</span>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex gap-3">
            <Button 
              onClick={generateWeekend}
              className={`flex-1 bg-gradient-to-r ${currentConfig.color} hover:opacity-90 text-white border-0`}
            >
              ✨ Generate My {currentConfig.name} Weekend
            </Button>
            <GhostButton onClick={() => setIsOpen(false)}>
              Cancel
            </GhostButton>
          </div>

          <div className="text-xs text-center opacity-60">
            💡 This will add activities to your current weekend plan
          </div>
        </div>
      </Modal>
    </>
  );
}
