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
import { createPortal } from "react-dom";
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
      className={`px-3 py-2 rounded-xl bg-[rgb(var(--primary))] text-white dark:text-gray-100 hover:opacity-90 active:opacity-80 transition focus-ring font-medium ${className}`}
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
      className={`px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-500 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 transition focus-ring text-gray-700 dark:text-gray-200 ${className}`}
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
      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 ${className}`}
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
    <div className="inline-flex rounded-xl border border-black/10 dark:border-emerald-500/30 p-1 bg-black/5 dark:bg-emerald-500/10">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
            o === value
              ? "bg-white text-gray-900 dark:bg-emerald-600 dark:text-white shadow"
              : "text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-emerald-500/20"
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
  
  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" 
      onClick={onClose}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        role="dialog"
        className="bg-[rgb(var(--card))] rounded-2xl p-6 max-w-sm w-full shadow-2xl transform transition-all duration-200 scale-100" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-xl hover:opacity-70 text-gray-700 dark:text-gray-300 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all"
          >
            ✕
          </button>
        </div>
        <div className="text-gray-800 dark:text-gray-100">
          {children}
        </div>
      </div>
    </div>
  );

  // Render the modal at the document body level using a portal
  return createPortal(modalContent, document.body);
}
