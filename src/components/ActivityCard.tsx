import type { Activity } from "../types";
import { Button, Badge, Card, GhostButton } from "../components/ui.tsx";
export function ActivityCard({ a, onAdd }: { a: Activity; onAdd: () => void }) {
  return (
    <Card className="p-4 flex items-center justify-between gap-3 min-w-0">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-2xl flex-shrink-0" aria-hidden>
          {a.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-semibold truncate">{a.name}</div>
          <Badge>{a.category}</Badge>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button onClick={onAdd} aria-label={`Add ${a.name}`} className="text-sm px-2 py-1">
          Add
        </Button>
        <GhostButton
          onClick={() => alert(`${a.name}: Try searching events nearby!`)}
          className="text-sm px-2 py-1"
        >
          Ideas
        </GhostButton>
      </div>
    </Card>
  );
}
