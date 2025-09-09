import { useSchedule } from '../store';
import { GhostButton, Segmented, Button, Badge } from '../components/ui.tsx';
import { suggestLongWeekends } from '../utils/holidays.ts';
export function Toolbar(){
const theme = useSchedule(s=>s.theme);
const setTheme = useSchedule(s=>s.setTheme);
const addDay = useSchedule(s=>s.addDay);
const days = useSchedule(s=>s.days);
const suggestions = suggestLongWeekends();
return (
<div className="flex flex-wrap items-center gap-3 justify-between">
<div className="flex items-center gap-2">
<Segmented options={['light','dark','system']} value={theme} onChange={(v)=>setTheme(v as any)} />
<GhostButton onClick={()=>addDay('Friday')}>+ Fri</GhostButton>
<GhostButton onClick={()=>addDay('Monday')}>+ Mon</GhostButton>
<Badge>{days.length} day(s)</Badge>
</div>
<div className="flex items-center gap-2 overflow-x-auto">
{suggestions.slice(0,3).map(s=> (
<Badge key={s.label} className="whitespace-nowrap">📅 {s.label}</Badge>
))}
<Button onClick={()=>window.open('https://www.google.com/maps/search/cafes+near+me','_blank')}>Find Cafés ☕</Button>
</div>
</div>
);
}