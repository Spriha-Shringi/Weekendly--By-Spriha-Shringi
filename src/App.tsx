import { ActivityCatalog } from './components/ActivityCatalog';
import { ScheduleBoard } from './components/ScheduleBoard';
import { Toolbar } from './components/Toolbar';
import { ThemeProvider } from './theme';


export default function App(){
return (
<ThemeProvider>
<main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
<header className="flex items-center justify-between">
<h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Weekendly ✨</h1>
<nav className="text-sm opacity-70">Plan a delightful weekend</nav>
</header>
<Toolbar />
<section aria-labelledby="catalog">
<h2 id="catalog" className="sr-only">Activities</h2>
<ActivityCatalog />
</section>
<section aria-labelledby="schedule">
<h2 id="schedule" className="sr-only">Schedule</h2>
<ScheduleBoard />
</section>
<footer className="text-xs text-[rgb(var(--muted))] py-6">Offline-ready • Data persists locally • Built with ❤️</footer>
</main>
</ThemeProvider>
);
}