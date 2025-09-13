import type { Activity, Mood } from "../types";

const categories = [
  ["Food", "🍳", "Brunch"],
  ["Outdoor", "🥾", "Hiking"],
  ["Entertainment", "🎬", "Movie Night"],
  ["Leisure", "📖", "Reading"],
];

const moods: Mood[] = ["Relaxed", "Energetic", "Happy", "Focused"];

export const seedActivities: Activity[] = Array.from({ length: 12 }).map(
  (_, i) => {
    const c = categories[i % categories.length];
    const name =
      i < categories.length
        ? c[2]
        : `${c[2]} ${Math.floor(i / categories.length) + 1}`;
    return {
      id: `act-${i + 1}`,
      name,
      category: c[0],
      icon: c[1],
      defaultMood: moods[i % moods.length],
    };
  }
);
