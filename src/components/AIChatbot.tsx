import { useState } from "react";
import { Button, GhostButton, Modal } from "./ui.tsx";
import { useSchedule } from "../store";

interface AIChatbotProps {
  currentActivities: string[];
  days: string[];
}

export function AIChatbot({ currentActivities, days }: AIChatbotProps) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestedActivities, setSuggestedActivities] = useState<string[]>([]);
  const [customSuggestions, setCustomSuggestions] = useState<string[]>([]);
  const [showDayModal, setShowDayModal] = useState(false);
  const [selectedActivityToAdd, setSelectedActivityToAdd] = useState<{name: string, isCustom: boolean} | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const add = useSchedule((s) => s.add);
  const activities = useSchedule((s) => s.activities);

  const generateSuggestion = async (userQuery?: string) => {
    setIsLoading(true);
    setResponse("");
    
    // Create new abort controller for this request
    const controller = new AbortController();
    setAbortController(controller);
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === "your_gemini_api_key_here") {
        setResponse("🤖 Please add your Gemini API key to the .env file to use AI suggestions!");
        setIsLoading(false);
        return;
      }

      // const context = `
      //   Current weekend plan: ${days.join(", ")}
      //   Current activities: ${currentActivities.length > 0 ? currentActivities.join(", ") : "None yet"}
      //   User query: ${userQuery || "Suggest weekend activities"}
      // `;

      const contextInfo = `My weekend plan includes ${days.join(", ")}. ${currentActivities.length > 0 ? `I already have these activities planned: ${currentActivities.join(", ")}.` : "I haven't planned any activities yet."}`;
      
      const prompt = userQuery 
        ? `${contextInfo} User question: "${userQuery}". Give a helpful, friendly response with practical suggestions. Use an emoji and keep it conversational and under 80 words. Don't ask for information I already provided. You can use **bold** for activity names and use line breaks for better formatting. Be encouraging and enthusiastic. ONLY suggest activities for the days I mentioned: ${days.join(", ")}. DO NOT suggest specific days that aren't in my plan.`
        : `${contextInfo} Suggest 2-3 specific weekend activities that would complement what I have planned (or give me ideas if I have nothing yet). Be specific and practical. Use an emoji and keep it friendly and under 80 words. You can use **bold** for activity names and use line breaks for better formatting. Focus on activities that match different moods: Relaxed, Energetic, Happy, or Focused. ONLY suggest activities for the days I mentioned: ${days.join(", ")}. DO NOT mention specific days like "Saturday" or "Sunday" unless they're in my plan. Just suggest the activities.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a suggestion right now.";
      
      setResponse(aiResponse);
      
      // Extract activity suggestions from the response for quick-add buttons
      const availableActivityNames = activities.map(a => a.name.toLowerCase());
      const suggestedFromResponse = availableActivityNames.filter(activityName => 
        aiResponse.toLowerCase().includes(activityName)
      );
      setSuggestedActivities(suggestedFromResponse.slice(0, 3));
      
      // Only suggest activities that are actually available in our catalog
      // const availableActivityWords = availableActivityNames.map(name => name.toLowerCase());
      
      // Additional custom activities that can be quick-added
      const quickAddableCustoms = [
        'spa', 'meditation', 'reading', 'journaling', 'sketching', 'gardening', 'baking', 
        'stargazing', 'volunteering', 'jogging', 'running', 'walking', 
        'writing', 'drawing', 'painting', 'knitting', 'sewing', 'organizing',
        'planning', 'learning', 'studying', 'exploring', 'visiting', 'shopping'
      ];
      
      // Also extract activities mentioned with **bold** formatting
      const boldActivities = aiResponse.match(/\*\*(.*?)\*\*/g);
      const extractedBoldActivities = boldActivities ? 
        boldActivities.map((match: string) => match.replace(/\*\*/g, '').toLowerCase().trim()) : [];
      
      // Extract mood from AI response
      const extractedMood = aiResponse.toLowerCase().includes('energetic') ? 'Energetic' :
                           aiResponse.toLowerCase().includes('relaxed') ? 'Relaxed' :
                           aiResponse.toLowerCase().includes('focused') ? 'Focused' : 'Happy';
      
      const customFromResponse = [
        ...quickAddableCustoms.filter(word => 
          aiResponse.toLowerCase().includes(word) && 
          !availableActivityNames.some(existing => existing.toLowerCase().includes(word))
        ),
        ...extractedBoldActivities.filter((activity: string) => 
          quickAddableCustoms.includes(activity) &&
          !availableActivityNames.some(existing => existing.toLowerCase().includes(activity))
        )
      ];
      
      setCustomSuggestions([...new Set(customFromResponse)].slice(0, 4));
      
      // Store the extracted mood for use when adding activities
      (window as any).lastAIMood = extractedMood;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setResponse("🛑 Request cancelled.");
      } else {
        console.error('Gemini API Error:', error);
        setResponse("🤖 Sorry, I'm having trouble connecting right now. Try again later!");
      }
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  };

  const stopGeneration = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      generateSuggestion(query.trim());
      setQuery("");
    }
  };

  // Simple markdown renderer for AI responses
  const renderResponse = (text: string) => {
    return text
      .split('\n')
      .map((line, i) => (
        <div key={i}>
          {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </div>
      ));
  };

  return (
    <>
      <GhostButton 
        onClick={() => {
          setIsModalOpen(true);
          generateSuggestion();
        }}
        className="whitespace-nowrap"
      >
        🤖 AI Suggestions
      </GhostButton>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="🤖 AI Assistant"
      >
        <div className="space-y-4">
          {isLoading && (
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-[rgb(var(--primary))] border-t-transparent rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Thinking...</span>
              </div>
              <button
                onClick={stopGeneration}
                className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors font-medium"
              >
                🛑 Stop
              </button>
            </div>
          )}
          
          {response && !isLoading && (
            <div className="space-y-3">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm border border-gray-200 dark:border-gray-600">
                {renderResponse(response)}
              </div>
              
              {(suggestedActivities.length > 0 || customSuggestions.length > 0) && (
                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    Quick Add:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestedActivities.map((activityName) => {
                      const activity = activities.find(a => a.name.toLowerCase() === activityName);
                      if (!activity) return null;
                      
                      return (
                        <Button
                          key={activity.id}
                          onClick={() => {
                            if (days.length === 1) {
                              add(days[0], activity);
                            } else {
                              setSelectedActivityToAdd({name: activity.name, isCustom: false});
                              setShowDayModal(true);
                            }
                          }}
                          className="text-xs px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-2 border-emerald-400 shadow-lg hover:shadow-emerald-200 transition-all duration-300 rounded-lg font-medium"
                        >
                          {activity.icon} Add {activity.name}
                        </Button>
                      );
                    })}
                    
                    {customSuggestions.map((customActivity) => (
                      <Button
                        key={customActivity}
                        onClick={() => {
                          if (days.length === 1) {
                            // Create a custom activity
                            const customActivityObj = {
                              id: `custom-${Date.now()}`,
                              name: customActivity.charAt(0).toUpperCase() + customActivity.slice(1),
                              category: 'Custom',
                              icon: '✨',
                              defaultMood: ((window as any).lastAIMood || 'Happy') as 'Happy' | 'Energetic' | 'Relaxed' | 'Focused'
                            };
                            add(days[0], customActivityObj);
                          } else {
                            setSelectedActivityToAdd({name: customActivity, isCustom: true});
                            setShowDayModal(true);
                          }
                        }}
                        className="text-xs px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-2 border-purple-400 shadow-lg hover:shadow-purple-200 transition-all duration-300 rounded-lg font-medium"
                      >
                        ✨ Add {customActivity.charAt(0).toUpperCase() + customActivity.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask for activity suggestions..."
              className="flex-1 px-3 py-2 rounded border border-black/10 bg-white/80 dark:bg-black/20"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !query.trim()}
            >
              Ask
            </Button>
          </form>
          
          <div className="flex gap-2">
            <GhostButton 
              onClick={() => generateSuggestion()}
              disabled={isLoading}
              className="flex-1"
            >
              💡 Random Idea
            </GhostButton>
            <GhostButton 
              onClick={() => {
                setResponse("");
                setQuery("");
              }}
              disabled={isLoading}
            >
              🗑️ Clear
            </GhostButton>
          </div>
        </div>
      </Modal>

      {/* Day Selection Modal for Quick Add */}
      <Modal 
        isOpen={showDayModal} 
        onClose={() => setShowDayModal(false)}
        title="Choose a Day"
      >
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Add "{selectedActivityToAdd?.name}" to which day?
          </p>
          <div className="grid gap-2">
            {days.map((day) => (
              <Button
                key={day}
                onClick={() => {
                  if (selectedActivityToAdd) {
                    if (selectedActivityToAdd.isCustom) {
                      // Create custom activity
                      const customActivityObj = {
                        id: `custom-${Date.now()}`,
                        name: selectedActivityToAdd.name.charAt(0).toUpperCase() + selectedActivityToAdd.name.slice(1),
                        category: 'Custom',
                        icon: '✨',
                        defaultMood: ((window as any).lastAIMood || 'Happy') as 'Happy' | 'Energetic' | 'Relaxed' | 'Focused'
                      };
                      add(day, customActivityObj);
                    } else {
                      // Add existing activity
                      const activity = activities.find(a => a.name === selectedActivityToAdd.name);
                      if (activity) {
                        add(day, activity);
                      }
                    }
                  }
                  setShowDayModal(false);
                  setSelectedActivityToAdd(null);
                }}
                className="w-full justify-start"
              >
                {day}
              </Button>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
