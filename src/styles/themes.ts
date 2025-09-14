export type ThemeVibe = "adventurous" | "chill" | "social" | "selfcare" | "default";

export interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
  };
  gradients: {
    main: string;
    subtle: string;
    card: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

export const themes: Record<ThemeVibe, ThemeConfig> = {
  default: {
    name: "Default",
    colors: {
      primary: "99 102 241", // indigo-500
      secondary: "139 92 246", // violet-500
      accent: "236 72 153", // pink-500
      background: "255 255 255", // white
      surface: "249 250 251", // gray-50
      text: "17 24 39", // gray-900
      muted: "107 114 128", // gray-500
    },
    gradients: {
      main: "linear-gradient(135deg, rgb(99 102 241) 0%, rgb(139 92 246) 100%)",
      subtle: "linear-gradient(135deg, rgb(249 250 251) 0%, rgb(243 244 246) 100%)",
      card: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(249,250,251,0.9) 100%)",
    },
    shadows: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
  },
  
  adventurous: {
    name: "Adventurous",
    colors: {
      primary: "234 88 12", // orange-600
      secondary: "239 68 68", // red-500
      accent: "245 101 101", // red-400
      background: "255 251 235", // amber-50
      surface: "254 243 199", // amber-100
      text: "120 53 15", // amber-900
      muted: "180 83 9", // amber-700
    },
    gradients: {
      main: "linear-gradient(135deg, rgb(234 88 12) 0%, rgb(239 68 68) 100%)",
      subtle: "linear-gradient(135deg, rgb(255 251 235) 0%, rgb(254 243 199) 100%)",
      card: "linear-gradient(135deg, rgba(255,251,235,0.95) 0%, rgba(254,243,199,0.95) 100%)",
    },
    shadows: {
      sm: "0 1px 2px 0 rgba(234, 88, 12, 0.15)",
      md: "0 4px 6px -1px rgba(234, 88, 12, 0.2), 0 2px 4px -1px rgba(239, 68, 68, 0.1)",
      lg: "0 20px 25px -5px rgba(234, 88, 12, 0.15), 0 10px 10px -5px rgba(239, 68, 68, 0.1)",
    },
  },
  
  chill: {
    name: "Chill",
    colors: {
      primary: "59 130 246", // blue-500
      secondary: "147 51 234", // purple-600
      accent: "168 85 247", // purple-500
      background: "240 249 255", // sky-50
      surface: "224 242 254", // sky-100
      text: "12 74 110", // sky-900
      muted: "56 189 248", // sky-400
    },
    gradients: {
      main: "linear-gradient(135deg, rgb(59 130 246) 0%, rgb(147 51 234) 100%)",
      subtle: "linear-gradient(135deg, rgb(240 249 255) 0%, rgb(224 242 254) 100%)",
      card: "linear-gradient(135deg, rgba(240,249,255,0.95) 0%, rgba(224,242,254,0.95) 100%)",
    },
    shadows: {
      sm: "0 1px 2px 0 rgba(59, 130, 246, 0.15)",
      md: "0 4px 6px -1px rgba(59, 130, 246, 0.2), 0 2px 4px -1px rgba(147, 51, 234, 0.1)",
      lg: "0 20px 25px -5px rgba(59, 130, 246, 0.15), 0 10px 10px -5px rgba(147, 51, 234, 0.1)",
    },
  },
  
  social: {
    name: "Social",
    colors: {
      primary: "34 197 94", // green-500
      secondary: "20 184 166", // teal-500
      accent: "45 212 191", // teal-400
      background: "240 253 244", // green-50
      surface: "220 252 231", // green-100
      text: "20 83 45", // green-900
      muted: "34 197 94", // green-500
    },
    gradients: {
      main: "linear-gradient(135deg, rgb(34 197 94) 0%, rgb(20 184 166) 100%)",
      subtle: "linear-gradient(135deg, rgb(240 253 244) 0%, rgb(220 252 231) 100%)",
      card: "linear-gradient(135deg, rgba(240,253,244,0.95) 0%, rgba(220,252,231,0.95) 100%)",
    },
    shadows: {
      sm: "0 1px 2px 0 rgba(34, 197, 94, 0.15)",
      md: "0 4px 6px -1px rgba(34, 197, 94, 0.2), 0 2px 4px -1px rgba(20, 184, 166, 0.1)",
      lg: "0 20px 25px -5px rgba(34, 197, 94, 0.15), 0 10px 10px -5px rgba(20, 184, 166, 0.1)",
    },
  },
  
  selfcare: {
    name: "Self-Care",
    colors: {
      primary: "236 72 153", // pink-500
      secondary: "251 113 133", // rose-400
      accent: "244 114 182", // pink-400
      background: "253 242 248", // pink-50
      surface: "252 231 243", // pink-100
      text: "131 24 67", // pink-900
      muted: "236 72 153", // pink-500
    },
    gradients: {
      main: "linear-gradient(135deg, rgb(236 72 153) 0%, rgb(251 113 133) 100%)",
      subtle: "linear-gradient(135deg, rgb(253 242 248) 0%, rgb(252 231 243) 100%)",
      card: "linear-gradient(135deg, rgba(253,242,248,0.95) 0%, rgba(252,231,243,0.95) 100%)",
    },
    shadows: {
      sm: "0 1px 2px 0 rgba(236, 72, 153, 0.15)",
      md: "0 4px 6px -1px rgba(236, 72, 153, 0.2), 0 2px 4px -1px rgba(251, 113, 133, 0.1)",
      lg: "0 20px 25px -5px rgba(236, 72, 153, 0.15), 0 10px 10px -5px rgba(251, 113, 133, 0.1)",
    },
  },
};

export function applyTheme(vibe: ThemeVibe) {
  const theme = themes[vibe];
  const root = document.documentElement;
  
  // Apply CSS custom properties
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  
  // Apply gradients
  Object.entries(theme.gradients).forEach(([key, value]) => {
    root.style.setProperty(`--gradient-${key}`, value);
  });
  
  // Apply shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value);
  });
  
  // Store current theme
  localStorage.setItem('weekendly-theme-vibe', vibe);
}

export function getCurrentTheme(): ThemeVibe {
  const stored = localStorage.getItem('weekendly-theme-vibe') as ThemeVibe;
  return stored && themes[stored] ? stored : 'default';
}
