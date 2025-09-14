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
import {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type PropsWithChildren,
  forwardRef,
} from "react";
export const Card = forwardRef<
  HTMLDivElement,
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
>(({ children, className = "", ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={`rounded-2xl shadow-sm border border-black/5 bg-[rgb(var(--card))] ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
});
export function Button({
  children,
  className = "",
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`px-3 py-2 rounded-xl bg-[rgb(var(--primary))] text-white hover:opacity-90 active:opacity-80 transition focus-ring ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
export function GhostButton({
  children,
  className = "",
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`px-3 py-2 rounded-xl border border-black/10 bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition focus-ring ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
export function Badge({
  children,
  className = "",
}: {
  children: any;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 ${className}`}
    >
      {children}
    </span>
  );
}
export function Segmented({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="inline-flex rounded-xl border border-black/10 p-1 bg-black/5 dark:bg-white/5">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`px-3 py-1 rounded-lg text-sm ${
            o === value
              ? "bg-white text-black dark:bg-black dark:text-white shadow"
              : ""
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function Modal({isOpen, onClose, title, children}: {isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode}) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[rgb(var(--card))] rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-xl hover:opacity-70">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
