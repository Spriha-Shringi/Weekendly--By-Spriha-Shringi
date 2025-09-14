import { useState } from "react";
import { Card, Button, GhostButton, Modal } from "./ui.tsx";

interface AIChatbotProps {
  currentActivities: string[];
  days: string[];
}

export function AIChatbot({ currentActivities, days }: AIChatbotProps) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateSuggestion = async (userQuery?: string) => {
    setIsLoading(true);
    setResponse("");
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === "your_gemini_api_key_here") {
        setResponse("🤖 Please add your Gemini API key to the .env file to use AI suggestions!");
        setIsLoading(false);
        return;
      }

      const context = `
        Current weekend plan: ${days.join(", ")}
        Current activities: ${currentActivities.length > 0 ? currentActivities.join(", ") : "None yet"}
        User query: ${userQuery || "Suggest weekend activities"}
      `;

      const contextInfo = `My weekend plan includes ${days.join(", ")}. ${currentActivities.length > 0 ? `I already have these activities planned: ${currentActivities.join(", ")}.` : "I haven't planned any activities yet."}`;
      
      const prompt = userQuery 
        ? `${contextInfo} User question: "${userQuery}". Give a helpful, friendly response with practical suggestions. Use an emoji and keep it conversational and under 80 words. Don't ask for information I already provided.`
        : `${contextInfo} Suggest 1-2 specific weekend activities that would complement what I have planned (or give me ideas if I have nothing yet). Be specific and practical. Use an emoji and keep it friendly and under 60 words.`;

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
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a suggestion right now.";
      
      setResponse(aiResponse);
    } catch (error) {
      console.error('Gemini API Error:', error);
      setResponse("🤖 Sorry, I'm having trouble connecting right now. Try again later!");
    } finally {
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
            <div className="flex items-center gap-2 py-2">
              <div className="animate-spin w-4 h-4 border-2 border-[rgb(var(--primary))] border-t-transparent rounded-full"></div>
              <span className="text-sm text-[rgb(var(--muted))]">Thinking...</span>
            </div>
          )}
          
          {response && !isLoading && (
            <div className="bg-black/5 dark:bg-white/5 rounded-lg p-3 text-sm">
              {response}
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
    </>
  );
}
