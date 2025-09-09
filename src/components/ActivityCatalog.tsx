import { memo, useMemo, useState } from 'react';
import { useSchedule } from '../store';
import { ActivityCard } from './ActivityCard';
import { Card, Badge } from '../components/ui.tsx';
export const ActivityCatalog = memo(function ActivityCatalog(){
const activities = useSchedule(s=>s.activities);
const add = useSchedule(s=>s.add);
const [q,setQ]=useState('');
const [cat,setCat]=useState('All');
const cats = useMemo(()=>['All',...Array.from(new Set(activities.map(a=>a.category)))], [activities]);
const filtered = useMemo(()=> activities.filter(a=> (cat==='All'||a.category===cat) && a.name.toLowerCase().includes(q.toLowerCase()) ), [activities,q,cat]);
const slice = filtered.slice(0,24);
return (
<div className="space-y-3">
<Card className="p-3 flex flex-wrap gap-2 items-center">
<input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search activities" className="px-3 py-2 rounded-xl border w-full sm:w-64 bg-white/80 dark:bg-black/20" />
<div className="flex gap-2 overflow-x-auto">
{cats.map(c=> <button key={c} onClick={()=>setCat(c)} className={`px-3 py-1 rounded-full text-sm ${c===cat?'bg-black/10 dark:bg-white/20':''}`}>{c}</button>)}
</div>
<Badge>{filtered.length} results</Badge>
</Card>
<div className="grid sm:grid-cols-2 gap-3">
{slice.map(a=> <ActivityCard key={a.id} a={a} onAdd={()=>{
const day = confirm('Add to Saturday? OK for Sat, Cancel for Sun')? 'Saturday':'Sunday';
add(day,a);
}} />)}
</div>
</div>
);
});