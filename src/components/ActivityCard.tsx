import type { Activity } from "../types";
import { Button, Badge, Card, GhostButton } from "../components/ui.tsx";

const categoryThemes = {
  Culinary: {
    gradient: "from-orange-400 to-red-500",
    bg: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
    border: "border-orange-200 dark:border-orange-700",
    badge: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
    button: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
  },
  Adventure: {
    gradient: "from-green-400 to-emerald-500",
    bg: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    border: "border-green-200 dark:border-green-700",
    badge: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
    button: "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
  },
  Creative: {
    gradient: "from-purple-400 to-pink-500",
    bg: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
    border: "border-purple-200 dark:border-purple-700",
    badge: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
    button: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
  },
  Growth: {
    gradient: "from-blue-400 to-indigo-500",
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
    border: "border-blue-200 dark:border-blue-700",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    button: "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
  },
  Wellness: {
    gradient: "from-teal-400 to-cyan-500",
    bg: "bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20",
    border: "border-teal-200 dark:border-teal-700",
    badge: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
    button: "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
  },
  Social: {
    gradient: "from-yellow-400 to-amber-500",
    bg: "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20",
    border: "border-yellow-200 dark:border-yellow-700",
    badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
    button: "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
  },
  Culture: {
    gradient: "from-rose-400 to-pink-500",
    bg: "bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20",
    border: "border-rose-200 dark:border-rose-700",
    badge: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
    button: "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
  },
  Custom: {
    gradient: "from-gray-400 to-slate-500",
    bg: "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20",
    border: "border-gray-200 dark:border-gray-700",
    badge: "bg-gray-100 text-gray-800 dark:bg-gray-900/40 dark:text-gray-300",
    button: "bg-gradient-to-r from-gray-500 to-slate-500 hover:from-gray-600 hover:to-slate-600"
  }
};

export function ActivityCard({ a, onAdd }: { a: Activity; onAdd: () => void }) {
  const theme = categoryThemes[a.category as keyof typeof categoryThemes] || categoryThemes.Custom;
  
  return (
    <Card className={`p-4 flex items-center justify-between gap-3 min-w-0 ${theme.bg} ${theme.border} border-2 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] activity-card`}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-2xl flex-shrink-0" aria-hidden>
          {a.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-semibold truncate text-[rgb(var(--fg))]">{a.name}</div>
          <Badge className={theme.badge}>{a.category}</Badge>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button onClick={onAdd} aria-label={`Add ${a.name}`} className={`text-sm px-3 py-2 ${theme.button} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-medium`}>
          ✨ Add
        </Button>
        <GhostButton
          onClick={() => {
            const searchQuery = `${a.name} near me`;
            window.open(`https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`, '_blank');
          }}
          className="text-sm px-2 py-1"
        >
          📍 Find Places
        </GhostButton>
      </div>
    </Card>
  );
}
