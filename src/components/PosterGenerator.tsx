import { useRef } from "react";
import { useSchedule } from "../store";
import { Button } from "./ui.tsx";
import html2canvas from "html2canvas";

export function PosterGenerator() {
  const days = useSchedule((s) => s.days);
  const schedule = useSchedule((s) => s.schedule);
  const posterRef = useRef<HTMLDivElement>(null);

  const generatePoster = async () => {
    if (allActivities.length === 0) {
      alert('Add some activities to your weekend plan first!');
      return;
    }

    const node = posterRef.current;
    if (!node) {
      console.error('Poster node not found');
      return;
    }

    try {
      // Show the poster temporarily for capture
      node.style.display = 'block';
      node.style.position = 'fixed';
      node.style.top = '0';
      node.style.left = '0';
      node.style.zIndex = '10000';
      node.style.visibility = 'visible';
      
      // Force reflow to ensure styles are applied
      node.offsetHeight;
      
      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const canvas = await html2canvas(node, {
        backgroundColor: '#4f46e5',
        scale: 0.5,
        width: 1080,
        height: 1920,
        useCORS: true,
        allowTaint: true,
        logging: false,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-poster]') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.display = 'block';
            clonedElement.style.visibility = 'visible';
            clonedElement.style.position = 'static';
          }
        }
      });
      
      // Create download link
      const url = canvas.toDataURL("image/png", 1.0);
      const a = document.createElement("a");
      a.href = url;
      a.download = `weekendly-story-${new Date().toISOString().split('T')[0]}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      console.log('Poster generated successfully');
      
    } catch (error: any) {
      console.error('Failed to generate poster:', error);
      alert(`Failed to generate poster: ${error.message || 'Unknown error'}`);
    } finally {
      // Hide the poster again
      node.style.display = 'none';
      node.style.position = '';
      node.style.top = '';
      node.style.left = '';
      node.style.zIndex = '';
      node.style.visibility = '';
    }
  };

  // Get user name (could be from localStorage or input)
  const userName = localStorage.getItem('weekendly-user-name') || 'My';
  
  // Calculate smart date range
  const getSmartDateRange = () => {
    const selectedDates = localStorage.getItem('weekendly-selected-date');
    
    if (!selectedDates || days.length === 0) {
      return 'This Weekend';
    }
    
    try {
      const parsedDates = JSON.parse(selectedDates);
      
      // Check if it's actually this weekend (current week)
      const now = new Date();
      const currentWeekStart = new Date(now);
      currentWeekStart.setDate(now.getDate() - now.getDay()); // Start of current week (Sunday)
      
      const currentWeekEnd = new Date(currentWeekStart);
      currentWeekEnd.setDate(currentWeekStart.getDate() + 6); // End of current week (Saturday)
      
      // Get the actual date range based on selected days
      const dayOrder = ["Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
      const sortedSelectedDays = days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
      
      const firstDay = sortedSelectedDays[0];
      const lastDay = sortedSelectedDays[sortedSelectedDays.length - 1];
      
      // Get dates for first and last days
      const firstDayDate = parsedDates[firstDay.toLowerCase()];
      const lastDayDate = parsedDates[lastDay.toLowerCase()];
      
      if (!firstDayDate || !lastDayDate) {
        return 'This Weekend';
      }
      
      const startDate = new Date(firstDayDate);
      const endDate = new Date(lastDayDate);
      
      // Check if this is actually the current/upcoming weekend
      const isThisWeekend = startDate >= currentWeekStart && endDate <= currentWeekEnd;
      const isUpcomingWeekend = startDate.getTime() - now.getTime() <= 7 * 24 * 60 * 60 * 1000; // Within 7 days
      
      if (isThisWeekend || (isUpcomingWeekend && sortedSelectedDays.includes('Saturday') && sortedSelectedDays.includes('Sunday'))) {
        return 'This Weekend';
      }
      
      // Format the date range
      const formatDate = (date: Date) => {
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const day = date.getDate();
        return `${month} ${day}`;
      };
      
      if (startDate.toDateString() === endDate.toDateString()) {
        return formatDate(startDate);
      } else {
        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
      }
      
    } catch (error) {
      return 'This Weekend';
    }
  };

  const dateRange = getSmartDateRange();

  // Calculate total activities and mood distribution
  const allActivities = days.flatMap(day => schedule[day] || []);
  const moodCounts = {
    Energetic: allActivities.filter(a => a.mood === 'Energetic').length,
    Relaxed: allActivities.filter(a => a.mood === 'Relaxed').length,
    Happy: allActivities.filter(a => a.mood === 'Happy').length,
    Focused: allActivities.filter(a => a.mood === 'Focused').length,
  };

  const dominantMood = Object.entries(moodCounts).reduce((a, b) => 
    moodCounts[a[0] as keyof typeof moodCounts] > moodCounts[b[0] as keyof typeof moodCounts] ? a : b
  )[0];

  const moodEmojis = {
    Energetic: '⚡',
    Relaxed: '🌸',
    Happy: '😊',
    Focused: '🎯'
  };

  // Removed unused moodColors object

  const sortedDays = days.sort((a, b) => {
    const dayOrder = ["Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
    return dayOrder.indexOf(a) - dayOrder.indexOf(b);
  });

  return (
    <>
      <Button onClick={generatePoster}>
        📸 Export Story
      </Button>

      {/* Hidden poster element for generation */}
      <div
        ref={posterRef}
        data-poster
        style={{ 
          display: 'none', 
          width: '1080px', 
          height: '1920px',
          backgroundColor: '#4f46e5',
          fontFamily: 'Arial, sans-serif'
        }}
        className="fixed top-0 left-0 overflow-hidden"
      >
        {/* Simple poster design */}
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)',
          padding: '60px',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '120px', marginBottom: '30px' }}>
              {moodEmojis[dominantMood as keyof typeof moodEmojis]}
            </div>
            <h1 style={{ 
              fontSize: '80px', 
              fontWeight: 'bold', 
              margin: '0 0 20px 0',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              {userName === 'My' ? 'My Weekend' : `${userName}'s Weekend`}
            </h1>
            <div style={{ fontSize: '40px', opacity: 0.9, marginBottom: '20px' }}>
              {dateRange}
            </div>
            <div style={{ fontSize: '32px', opacity: 0.8 }}>
              {dominantMood} Vibes ✨
            </div>
          </div>

          {/* Activities */}
          <div style={{
            backgroundColor: 'transparent',
            padding: '40px',
            color: 'white',
            maxHeight: '1200px',
            overflow: 'hidden',
            flex: 1
          }}>
            {sortedDays.filter(day => (schedule[day] || []).length > 0).slice(0, 4).map((day) => {
              const dayActivities = schedule[day] || [];
              
              return (
                <div key={day} style={{ marginBottom: '30px' }}>
                  <h3 style={{ 
                    fontSize: '48px', 
                    fontWeight: 'bold', 
                    margin: '0 0 25px 0',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}>
                    <span style={{ fontSize: '60px', marginRight: '20px' }}>
                      {day === 'Saturday' ? '🌅' : 
                       day === 'Sunday' ? '🌄' : 
                       day === 'Friday' ? '🎉' : 
                       day === 'Monday' ? '💪' : 
                       day === 'Tuesday' ? '🚀' : '✨'}
                    </span>
                    {day}
                  </h3>
                  <div>
                    {dayActivities.slice(0, 3).map((activity) => (
                      <div key={activity.instanceId} style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '28px',
                        marginBottom: '15px'
                      }}>
                        <span style={{ fontSize: '40px', marginRight: '25px' }}>
                          {activity.icon}
                        </span>
                        <span style={{ fontWeight: '600', flex: 1, color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                          {activity.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: '20px',
            padding: '30px',
            display: 'flex',
            justifyContent: 'space-around',
            textAlign: 'center',
            color: '#1f2937'
          }}>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold' }}>{allActivities.length}</div>
              <div style={{ fontSize: '24px' }}>Activities</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold' }}>{days.length}</div>
              <div style={{ fontSize: '24px' }}>Days</div>
            </div>
            <div>
              <div style={{ fontSize: '48px' }}>{moodEmojis[dominantMood as keyof typeof moodEmojis]}</div>
              <div style={{ fontSize: '24px' }}>{dominantMood}</div>
            </div>
          </div>

          {/* Branding */}
          <div style={{ textAlign: 'center', fontSize: '28px', opacity: 0.8 }}>
            Made with Weekendly ✨
          </div>
        </div>
      </div>
    </>
  );
}
