import { memo, useMemo, useState } from "react";
import { useSchedule } from "../store";
import { ActivityCard } from "./ActivityCard";
import { Card, Badge, Modal, Button } from "../components/ui.tsx";
import type { Activity } from "../types";

export const ActivityCatalog = memo(function ActivityCatalog() {
  const activities = useSchedule((s) => s.activities);
  const days = useSchedule((s) => s.days);
  const add = useSchedule((s) => s.add);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [showDayModal, setShowDayModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const cats = useMemo(
    () => ["All", ...Array.from(new Set(activities.map((a) => a.category)))],
    [activities]
  );
  const filtered = useMemo(
    () =>
      activities.filter(
        (a) =>
          (cat === "All" || a.category === cat) &&
          a.name.toLowerCase().includes(q.toLowerCase())
      ),
    [activities, q, cat]
  );
  const slice = filtered; // Show all activities
  return (
    <div className="space-y-3">
      <Card className="p-6 space-y-4">
        <div className="w-full">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search activities"
            className="w-full px-4 py-3 rounded-xl border-2 border-sky-200 dark:border-emerald-600 bg-white/90 dark:bg-stone-800/90 focus:border-sky-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-sky-200 dark:focus:ring-emerald-200 transition-all duration-300 text-[rgb(var(--fg))] placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2 flex-1">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  c === cat 
                    ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg transform scale-105" 
                    : "bg-white/60 dark:bg-stone-800/60 hover:bg-sky-100 dark:hover:bg-emerald-900/30 border border-sky-200 dark:border-emerald-700 text-[rgb(var(--fg))]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <Badge className="ml-4 flex-shrink-0">{filtered.length} results</Badge>
        </div>
      </Card>
      <div className="grid sm:grid-cols-2 gap-3">
        {slice.map((a) => (
          <ActivityCard
            key={a.id}
            a={a}
            onAdd={() => {
              if (days.length === 1) {
                add(days[0], a);
              } else {
                setSelectedActivity(a);
                setShowDayModal(true);
              }
            }}
          />
        ))}
      </div>
      
      <Modal 
        isOpen={showDayModal} 
        onClose={() => setShowDayModal(false)}
        title="Choose a Day"
      >
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Add "{selectedActivity?.name}" to which day?
          </p>
          <div className="grid gap-2">
            {days.map((day) => (
              <Button
                key={day}
                onClick={() => {
                  if (selectedActivity) {
                    add(day, selectedActivity);
                  }
                  setShowDayModal(false);
                  setSelectedActivity(null);
                }}
                className="w-full justify-start text-white dark:text-gray-100"
              >
                {day}
              </Button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
});
