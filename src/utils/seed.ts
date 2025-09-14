import type { Activity, Mood } from "../types";

const activities = [
  // Culinary Adventures
  { category: "Culinary", icon: "🥐", name: "Brunch", mood: "Relaxed" as Mood },
  { category: "Culinary", icon: "🍕", name: "Make Pizza", mood: "Happy" as Mood },
  { category: "Culinary", icon: "☕", name: "Coffee Shop Visit", mood: "Focused" as Mood },
  { category: "Culinary", icon: "👨‍🍳", name: "Cooking Class", mood: "Focused" as Mood },
  { category: "Culinary", icon: "🛒", name: "Farmer's Market", mood: "Happy" as Mood },
  { category: "Culinary", icon: "🍷", name: "Wine & Dine", mood: "Relaxed" as Mood },
  
  // Adventure & Outdoors
  { category: "Adventure", icon: "🥾", name: "Hiking", mood: "Energetic" as Mood },
  { category: "Adventure", icon: "🚴", name: "Cycling", mood: "Energetic" as Mood },
  { category: "Adventure", icon: "🧺", name: "Picnic", mood: "Happy" as Mood },
  { category: "Adventure", icon: "🏖️", name: "Beach Visit", mood: "Relaxed" as Mood },
  { category: "Adventure", icon: "🌸", name: "Nature Walk", mood: "Focused" as Mood },
  { category: "Adventure", icon: "🎣", name: "Fishing", mood: "Relaxed" as Mood },
  
  // Creative Expression
  { category: "Creative", icon: "🎨", name: "Painting", mood: "Happy" as Mood },
  { category: "Creative", icon: "📸", name: "Photography", mood: "Focused" as Mood },
  { category: "Creative", icon: "🎭", name: "Comedy Show", mood: "Happy" as Mood },
  { category: "Creative", icon: "✍️", name: "Writing", mood: "Focused" as Mood },
  { category: "Creative", icon: "🎵", name: "Live Music", mood: "Energetic" as Mood },
  { category: "Creative", icon: "🧶", name: "Crafting", mood: "Relaxed" as Mood },
  
  // Personal Growth
  { category: "Growth", icon: "🧘", name: "Yoga", mood: "Energetic" as Mood },
  { category: "Growth", icon: "📖", name: "Book Club", mood: "Focused" as Mood },
  { category: "Growth", icon: "🎯", name: "Goal Planning", mood: "Focused" as Mood },
  { category: "Growth", icon: "🌱", name: "Meditation", mood: "Relaxed" as Mood },
  { category: "Growth", icon: "💪", name: "Gym Workout", mood: "Energetic" as Mood },
  { category: "Growth", icon: "🧠", name: "Learn Language", mood: "Focused" as Mood },
  
  // Wellness & Self-Care
  { category: "Wellness", icon: "💆", name: "Spa Day", mood: "Relaxed" as Mood },
  { category: "Wellness", icon: "🏊", name: "Swimming", mood: "Energetic" as Mood },
  { category: "Wellness", icon: "🌿", name: "Aromatherapy", mood: "Relaxed" as Mood },
  { category: "Wellness", icon: "🧴", name: "Skincare", mood: "Happy" as Mood },
  { category: "Wellness", icon: "🛁", name: "Bath Time", mood: "Relaxed" as Mood },
  
  // Social & Entertainment
  { category: "Social", icon: "🎬", name: "Movie Night", mood: "Happy" as Mood },
  { category: "Social", icon: "🎉", name: "Party", mood: "Happy" as Mood },
  { category: "Social", icon: "🎳", name: "Bowling", mood: "Happy" as Mood },
  { category: "Social", icon: "🕺", name: "Dancing", mood: "Energetic" as Mood },
  { category: "Social", icon: "🎲", name: "Board Games", mood: "Happy" as Mood },
  { category: "Social", icon: "🛍️", name: "Shopping", mood: "Happy" as Mood },
  
  // Cultural Exploration
  { category: "Culture", icon: "🏛️", name: "Museum Visit", mood: "Focused" as Mood },
  { category: "Culture", icon: "🎪", name: "Festival", mood: "Happy" as Mood },
  { category: "Culture", icon: "📚", name: "Library Visit", mood: "Relaxed" as Mood },
  { category: "Culture", icon: "🎼", name: "Concert", mood: "Focused" as Mood },
];

export const seedActivities: Activity[] = activities.map((activity, i) => ({
  id: `act-${i + 1}`,
  name: activity.name,
  category: activity.category,
  icon: activity.icon,
  defaultMood: activity.mood,
}));
