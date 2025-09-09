export type Mood = "Relaxed" | "Energetic" | "Happy" | "Focused";


export type DayId = string; // e.g. 'Saturday', 'Sunday'


export interface Activity {
id: string;
name: string;
category: string;
icon: string;
defaultMood: Mood;
}


export interface ActivityInstance extends Activity {
instanceId: string;
mood: Mood;
time?: string;
}