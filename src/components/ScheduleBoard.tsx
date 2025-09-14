import { useRef } from "react";
import { useSchedule } from "../store";
import { DayColumn } from "./DayColumn";
import { PosterGenerator } from "./PosterGenerator.tsx";

export function ScheduleBoard() {
  const days = useSchedule((s) => s.days);
  const boardRef = useRef<HTMLDivElement>(null);
  
  // Sort days in proper order: Thursday to Tuesday
  const dayOrder = ["Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
  const sortedDays = days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8 p-6 bg-gradient-to-r from-emerald-50/80 to-purple-50/80 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-emerald-200/50 dark:border-amber-600/30 backdrop-blur-sm">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-purple-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
          ✨ Your Weekend Plan!!
        </h2>
        <PosterGenerator />
      </div>
      <div
        ref={boardRef}
        aria-label="Weekend schedule"
        className="grid grid-cols-1 gap-6 p-6 bg-gradient-to-br from-white/60 to-emerald-50/40 dark:from-stone-900/60 dark:to-amber-900/20 rounded-2xl border-2 border-emerald-100 dark:border-amber-800/50 backdrop-blur-lg shadow-2xl"
      >
        {sortedDays.map((d) => (
          <DayColumn key={d} day={d} />
        ))}
      </div>
    </div>
  );
}
