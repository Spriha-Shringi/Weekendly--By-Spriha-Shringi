import { describe, test, expect, beforeEach } from 'vitest';
import { useSchedule } from '../store';

// Mock activity for testing
const mockActivity = {
  id: 'test-activity',
  name: 'Test Activity',
  category: 'Custom' as const,
  icon: '🧪',
  defaultMood: 'Happy' as const
};

describe('Schedule Store', () => {
  beforeEach(() => {
    // Clear localStorage and reset store before each test
    localStorage.clear();
    // Get a fresh store instance
    useSchedule.getState().clearAll();
  });

  test('should add activity to day successfully', () => {
    const store = useSchedule.getState();
    
    store.add('Saturday', mockActivity);

    const schedule = useSchedule.getState().schedule;
    expect(schedule.Saturday).toHaveLength(1);
    expect(schedule.Saturday[0].name).toBe('Test Activity');
    expect(schedule.Saturday[0].mood).toBe('Happy');
    expect(schedule.Saturday[0].instanceId).toBeDefined();
  });

  test('should remove activity from day successfully', () => {
    const store = useSchedule.getState();
    
    // First add an activity
    store.add('Saturday', mockActivity);
    
    const activityId = useSchedule.getState().schedule.Saturday[0].instanceId;
    
    // Then remove it
    store.remove('Saturday', activityId);

    expect(useSchedule.getState().schedule.Saturday).toHaveLength(0);
  });

  test('should add and remove days correctly', () => {
    const store = useSchedule.getState();
    
    // Add Friday
    store.addDay('Friday');

    const state1 = useSchedule.getState();
    expect(state1.days).toContain('Friday');
    expect(state1.schedule.Friday).toEqual([]);

    // Remove Friday
    store.removeDay('Friday');

    const state2 = useSchedule.getState();
    expect(state2.days).not.toContain('Friday');
    expect(state2.schedule.Friday).toBeUndefined();
  });

  test('should change theme correctly', () => {
    const store = useSchedule.getState();
    
    expect(store.theme).toBe('light');
    
    store.setTheme('dark');

    expect(useSchedule.getState().theme).toBe('dark');
  });
});