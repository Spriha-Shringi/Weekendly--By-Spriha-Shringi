import { useRef, useState } from "react";
import { useSchedule } from "../store";
import type { ActivityInstance, Mood, DayId } from "../types";
import { Card, Badge, GhostButton } from "../components/ui.tsx";

export function DayColumn({ day }: { day: DayId }) {
  const list = useSchedule((s) => s.schedule[day] || []);
  const remove = useSchedule((s) => s.remove);
  const moveWithin = useSchedule((s) => s.moveWithinDay);
  const transfer = useSchedule((s) => s.transfer);
  const setMood = useSchedule((s) => s.setMood);
  const [over, setOver] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

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
        <Badge>{list.length} item(s)</Badge>
      </div>
      <div className="space-y-2">
        {list.map((it, idx) => (
          <div
            key={it.instanceId}
            draggable
            onDragStart={(e) => onDragStart(e, it, idx)}
            className="p-3 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden>
                {it.icon}
              </span>
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-xs text-[rgb(var(--muted))]">
                  {it.category}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                aria-label="Mood"
                value={it.mood}
                onChange={(e) =>
                  setMood(day, it.instanceId, e.target.value as Mood)
                }
                className={`px-2 py-1 rounded-lg text-xs ${
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
              >
                ↑
              </GhostButton>
              <GhostButton
                aria-label="Move down"
                onClick={() =>
                  idx < list.length - 1 && moveWithin(day, idx, idx + 1)
                }
              >
                ↓
              </GhostButton>
              <GhostButton
                aria-label="Remove"
                onClick={() => remove(day, it.instanceId)}
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
