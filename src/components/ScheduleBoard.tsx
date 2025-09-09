import { useRef } from 'react';
import { useSchedule } from '../store';
import { DayColumn } from './DayColumn';
import { Button } from '../components/ui.tsx';
import html2canvas from 'html2canvas';


export function ScheduleBoard(){
const days = useSchedule(s=>s.days);
const boardRef = useRef<HTMLDivElement>(null);
async function exportPNG(){
const node = boardRef.current; if(!node) return;
const canvas = await html2canvas(node, { backgroundColor: getComputedStyle(document.body).backgroundColor });
const url = canvas.toDataURL('image/png');
const a=document.createElement('a'); a.href=url; a.download='weekendly-plan.png'; a.click();
}
return (
<div className="space-y-3">
<div className="flex items-center justify-between">
<h2 className="text-xl font-semibold">Your Weekend Plan</h2>
<Button onClick={exportPNG}>Export Poster 📸</Button>
</div>
<div ref={boardRef} aria-label="Weekend schedule" className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
{days.map(d=> <DayColumn key={d} day={d} />)}
</div>
</div>
);
}