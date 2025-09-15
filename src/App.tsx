import { ActivityCatalog } from "./components/ActivityCatalog";
import { ScheduleBoard } from "./components/ScheduleBoard";
import { Toolbar } from "./components/Toolbar";
import { LongWeekendDetector } from "./components/LongWeekendDetector";
import { WeekendCat } from "./components/WeekendCat";
import { ThemeProvider } from "./theme";
import { useSchedule } from "./store";

export default function App() {
  const theme = useSchedule((s) => s.theme);
  return (
    <ThemeProvider>
      <main className="mx-auto p-4 sm:p-6 space-y-6">
        <header className="flex items-center justify-between p-8 bg-gradient-to-r from-emerald-400/20 via-purple-400/15 to-pink-400/20 dark:from-amber-600/20 dark:via-orange-500/15 dark:to-yellow-500/20 rounded-3xl border-2 border-emerald-200/40 dark:border-amber-500/30 backdrop-blur-xl shadow-2xl mb-2">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-emerald-600 via-purple-600 to-pink-600 dark:from-amber-400 dark:via-orange-400 dark:to-yellow-400 bg-clip-text text-transparent drop-shadow-sm">
            🌟 Weekendly ✨
          </h1>
          <nav
            className="text-lg font-medium text-emerald-700 dark:text-white opacity-90"
            style={
              theme === "dark"
                ? { color: 'white' }
                : undefined
            }
          >
            Plan your perfect weekend
          </nav>
        </header>
        <Toolbar />
        <LongWeekendDetector />
        <div className="flex gap-8">
          <section aria-labelledby="catalog" className="w-3.1/5 p-6 bg-gradient-to-br from-white/40 to-sky-50/30 dark:from-stone-900/40 dark:to-emerald-900/20 rounded-3xl border-2 border-sky-100/50 dark:border-emerald-700/30 backdrop-blur-lg shadow-xl">
        <h2 id="catalog" className="text-2xl font-bold mb-6 bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-emerald-400 dark:to-amber-400 bg-clip-text text-transparent">
          🎯 Choose Activities
        </h2>
            <ActivityCatalog />
          </section>
          <section aria-labelledby="schedule" className="w-1.9/5">
            <h2 id="schedule" className="sr-only">
              Schedule
            </h2>
            <ScheduleBoard />
          </section>
        </div>
        <footer className="text-center py-8 mt-12 bg-gradient-to-r from-emerald-100/50 to-purple-100/50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl border border-emerald-200/40 dark:border-amber-600/40 backdrop-blur-sm">
          <div className="text-sm text-emerald-700 dark:text-amber-300 font-medium">
            ✨ Offline-ready • 💾 Data persists locally • ❤️ Built with love
          </div>
        </footer>
      </main>
      <WeekendCat />
    </ThemeProvider>
  );
}