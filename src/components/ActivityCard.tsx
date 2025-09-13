import type { Activity } from "../types";
import { Button, Badge, Card, GhostButton } from "../components/ui.tsx";
export function ActivityCard({ a, onAdd }: { a: Activity; onAdd: () => void }) {
  return (
    <Card className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden>
          {a.icon}
        </span>
        <div>
          <div className="font-semibold">{a.name}</div>
          <Badge>{a.category}</Badge>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onAdd} aria-label={`Add ${a.name}`}>
          Add
        </Button>
        <GhostButton
          onClick={() => alert(`${a.name}: Try searching events nearby!`)}
        >
          Ideas
        </GhostButton>
      </div>
    </Card>
  );
}
