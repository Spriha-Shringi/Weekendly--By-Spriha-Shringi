// import { type PropsWithChildren, type ButtonHTMLAttributes, type HTMLAttributes } from "react";


// export function Card({ children, className = "", ...rest }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
// return (
// <div
// className={`rounded-xl shadow-sm border border-gray-200 bg-white dark:bg-gray-800 ${className}`}
// {...rest}
// >
// {children}
// </div>
// );
// }


// export function Button({ children, className = "", ...rest }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
// return (
// <button
// className={`px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition ${className}`}
// {...rest}
// >
// {children}
// </button>
// );
// }


// export function GhostButton({ children, className = "", ...rest }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
// return (
// <button
// className={`px-3 py-2 rounded-lg border border-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}
// {...rest}
// >
// {children}
// </button>
// );
// }


// export function Badge({ children, className = "" }: { children: any; className?: string }) {
// return (
// <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 ${className}`}>
// {children}
// </span>
// );
// }
import { type ButtonHTMLAttributes, type HTMLAttributes, type PropsWithChildren, forwardRef } from 'react';
export const Card = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLDivElement>>>(
  ({children, className="", ...rest}, ref) => {
    return <div ref={ref} className={`rounded-2xl shadow-sm border border-black/5 bg-[rgb(var(--card))] ${className}`} {...rest}>{children}</div>;
  }
);
export function Button({children, className="", ...rest}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>){
return <button className={`px-3 py-2 rounded-xl bg-[rgb(var(--primary))] text-white hover:opacity-90 active:opacity-80 transition focus-ring ${className}`} {...rest}>{children}</button>;
}
export function GhostButton({children,className="",...rest}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>){
return <button className={`px-3 py-2 rounded-xl border border-black/10 bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition focus-ring ${className}`} {...rest}>{children}</button>;
}
export function Badge({children,className=""}:{children:any,className?:string}){
return <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 ${className}`}>{children}</span>;
}
export function Segmented({options, value, onChange}:{options:string[], value:string, onChange:(v:string)=>void}){
return (
<div className="inline-flex rounded-xl border border-black/10 p-1 bg-black/5 dark:bg-white/5">
{options.map(o=> (
<button key={o} onClick={()=>onChange(o)} className={`px-3 py-1 rounded-lg text-sm ${o===value? 'bg-white text-black dark:bg-black dark:text-white shadow':''}`}>{o}</button>
))}
</div>
);
}