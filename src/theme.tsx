import { type PropsWithChildren, useEffect } from "react";
import { useSchedule } from "./store";
export function ThemeProvider({ children }: PropsWithChildren) {
  const theme = useSchedule((s) => s.theme);
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme
    );
  }, [theme]);
  return children as any;
}
