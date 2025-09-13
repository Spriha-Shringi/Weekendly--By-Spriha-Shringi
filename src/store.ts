import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Activity, ActivityInstance, DayId, Mood } from "./types.ts";
import { seedActivities } from "./utils/seed";

interface ScheduleState {
  activities: Activity[];
  days: DayId[];
  schedule: Record<DayId, ActivityInstance[]>;
  theme: "light" | "dark" | "system";

  // actions
  setTheme: (t: ScheduleState["theme"]) => void;
  addDay: (d: DayId) => void;
  removeDay: (d: DayId) => void;
  add: (day: DayId, a: Activity) => void;
  remove: (day: DayId, instanceId: string) => void;
  moveWithinDay: (day: DayId, from: number, to: number) => void;
  transfer: (
    fromDay: DayId,
    toDay: DayId,
    instanceId: string,
    toIndex?: number
  ) => void;
  setMood: (day: DayId, instanceId: string, mood: Mood) => void;
  clearAll: () => void;
}

export const useSchedule = create<ScheduleState>()(
  persist(
    (set, get) => ({
      activities: seedActivities,
      days: ["Saturday", "Sunday"],
      schedule: { Saturday: [], Sunday: [] },
      theme: "light",

      setTheme: (t) => {
        set({ theme: t });
        const htmlTheme =
          t === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light"
            : t;
        document.documentElement.setAttribute("data-theme", htmlTheme);
      },

      addDay: (d) => {
        const state = get();
        if (state.days.includes(d)) return;
        set({
          days: [...state.days, d],
          schedule: { ...state.schedule, [d]: [] },
        });
      },

      removeDay: (d) => {
        const { days, schedule } = get();
        const { [d]: _, ...rest } = schedule;
        set({
          days: days.filter((x) => x !== d),
          schedule: rest,
        });
      },

      add: (day, a) => {
        const inst: ActivityInstance = {
          ...a,
          instanceId: crypto.randomUUID(),
          mood: a.defaultMood,
        };
        set((s) => ({
          schedule: {
            ...s.schedule,
            [day]: [...(s.schedule[day] || []), inst],
          },
        }));
      },

      remove: (day, id) =>
        set((s) => ({
          schedule: {
            ...s.schedule,
            [day]: (s.schedule[day] || []).filter((x) => x.instanceId !== id),
          },
        })),

      moveWithinDay: (day, from, to) =>
        set((s) => {
          const list = [...(s.schedule[day] || [])];
          const [item] = list.splice(from, 1);
          list.splice(to, 0, item);
          return { schedule: { ...s.schedule, [day]: list } };
        }),

      transfer: (fromDay, toDay, instanceId, toIndex) =>
        set((s) => {
          const from = [...(s.schedule[fromDay] || [])];
          const idx = from.findIndex((x) => x.instanceId === instanceId);
          if (idx < 0) return {};
          const [item] = from.splice(idx, 1);
          const to = [...(s.schedule[toDay] || [])];
          if (toIndex == null) to.push(item);
          else to.splice(toIndex, 0, item);
          return { schedule: { ...s.schedule, [fromDay]: from, [toDay]: to } };
        }),

      setMood: (day, id, mood) =>
        set((s) => ({
          schedule: {
            ...s.schedule,
            [day]: (s.schedule[day] || []).map((x) =>
              x.instanceId === id ? { ...x, mood } : x
            ),
          },
        })),

      clearAll: () => set({ schedule: {}, days: [] }),
    }),
    { name: "weekendly-state" }
  )
);
