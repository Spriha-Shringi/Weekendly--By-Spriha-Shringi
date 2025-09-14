import { useRef, useState } from "react";
import { useSchedule } from "../store";
import type { ActivityInstance, Mood, DayId } from "../types";
import { Card, Badge, GhostButton } from "../components/ui.tsx";

export function DayColumn({ day }: { day: DayId }) {
  const list = useSchedule((s) => s.schedule[day] || []);
  const days = useSchedule((s) => s.days);
  const remove = useSchedule((s) => s.remove);
  const removeDay = useSchedule((s) => s.removeDay);
  const moveWithin = useSchedule((s) => s.moveWithinDay);
  const transfer = useSchedule((s) => s.transfer);
  const setMood = useSchedule((s) => s.setMood);
  const [over, setOver] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // Check if this day can be removed (not a middle day)
  const canRemoveDay = () => {
    if (days.length <= 1) return false;
    
    const dayOrder = ["Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
    const currentDays = days.filter(d => dayOrder.includes(d)).sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
    
    if (currentDays.length <= 1) return true;
    
    const currentIndex = currentDays.indexOf(day);
    // Can only remove if it's the first or last day in the sequence
    return currentIndex === 0 || currentIndex === currentDays.length - 1;
  };

  function onDragStart(
    e: React.DragEvent,
    item: ActivityInstance,
    index: number
  ) {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        instanceId: item.instanceId,
        fromDay: day,
        fromIndex: index,
      })
    );
    e.dataTransfer.effectAllowed = "move";
  }
  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setOver(false);
    const data = JSON.parse(e.dataTransfer.getData("text/plain")) as {
      instanceId: string;
      fromDay: DayId;
      fromIndex: number;
    };
    if (data.fromDay === day) {
      // drop to end when same column
      transfer(day, day, data.instanceId);
    } else {
      transfer(data.fromDay, day, data.instanceId);
    }
  }

  return (
    <Card
      className={`p-3 min-h-[200px] ${
        over ? "outline outline-2 outline-[rgb(var(--primary))]" : ""
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
      ref={dropRef}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{day}</h3>
        <div className="flex items-center gap-2">
          <Badge>{list.length} item(s)</Badge>
          {canRemoveDay() && (
            <GhostButton
              aria-label={`Remove ${day}`}
              onClick={() => {
                if (list.length > 0) {
                  if (confirm(`Remove ${day}? This will delete all ${list.length} activities in this day.`)) {
                    removeDay(day);
                  }
                } else {
                  removeDay(day);
                }
              }}
              className="text-xs px-1 py-1 w-6 h-6 rounded-sm flex items-center justify-center text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
              title={`Remove ${day} (only first/last days can be removed)`}
            >
              ✕
            </GhostButton>
          )}
        </div>
      </div>
      <div className="space-y-2">
        {list.map((it, idx) => (
          <div
            key={it.instanceId}
            draggable
            onDragStart={(e) => onDragStart(e, it, idx)}
            className="p-3 rounded-xl bg-black/5 dark:bg-white/10 flex items-center gap-2 min-w-0"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-xl flex-shrink-0" aria-hidden>
                {it.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-medium truncate">{it.name}</div>
                <div className="text-xs text-[rgb(var(--muted))] truncate">
                  {it.category}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <select
                aria-label="Mood"
                value={it.mood}
                onChange={(e) =>
                  setMood(day, it.instanceId, e.target.value as Mood)
                }
                className={`px-1 py-1 rounded text-xs w-20 ${
                  it.mood === "Relaxed"
                    ? "mood-relaxed"
                    : it.mood === "Energetic"
                    ? "mood-energetic"
                    : it.mood === "Happy"
                    ? "mood-happy"
                    : "mood-focused"
                }`}
              >
                {["Relaxed", "Energetic", "Happy", "Focused"].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <GhostButton
                aria-label="Move up"
                onClick={() => idx > 0 && moveWithin(day, idx, idx - 1)}
                disabled={idx === 0}
                className="text-xs w-6 h-6 rounded-sm flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ↑
              </GhostButton>
              <GhostButton
                aria-label="Move down"
                onClick={() =>
                  idx < list.length - 1 && moveWithin(day, idx, idx + 1)
                }
                disabled={idx === list.length - 1}
                className="text-xs w-6 h-6 rounded-sm flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ↓
              </GhostButton>
              <GhostButton
                aria-label="Remove"
                onClick={() => remove(day, it.instanceId)}
                className="text-xs w-6 h-6 rounded-sm flex items-center justify-center"
              >
                ✕
              </GhostButton>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
