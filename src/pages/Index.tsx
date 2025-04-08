
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { chatbots, Chatbot } from "@/utils/chatbots";
import ChatWindow from "@/components/ChatWindow";
import ChatAvatar from "@/components/ChatAvatar";

const Index = () => {
  const [activeChatbots, setActiveChatbots] = useState<Chatbot[]>([]);

  const addChatbot = (chatbot: Chatbot) => {
    // Check if chatbot is already active
    if (!activeChatbots.find((c) => c.id === chatbot.id)) {
      // Calculate a slightly offset position for each new window
      const basePosition = { x: 100, y: 100 };
      const offset = 20 * activeChatbots.length;
      
      const newChatbot = {
        ...chatbot,
        position: {
          x: basePosition.x + offset,
          y: basePosition.y + offset,
        },
      };
      
      setActiveChatbots([...activeChatbots, newChatbot]);
    }
  };

  const removeChatbot = (id: string) => {
    setActiveChatbots(activeChatbots.filter((chatbot) => chatbot.id !== id));
  };

  return (
    <div className="min-h-screen bg-dark-gradient p-4 relative">
      {/* App title */}
      <div className="text-center mb-8 mt-4">
        <h1 className="text-3xl font-bold text-white">Little Chatbot Windows</h1>
        <p className="text-gray-300 mt-2">
          Click the button below to add chatbot windows to your workspace
        </p>
      </div>

      {/* Add new chatbot button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="h-14 w-14 rounded-full bg-dark-accent hover:bg-dark-accent/90 shadow-lg">
              <Plus size={24} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 border-dark-accent/50 bg-dark-secondary" align="end">
            <div className="space-y-2 p-2">
              <h3 className="font-medium text-sm mb-3 text-white">Add a new chatbot</h3>
              <div className="grid grid-cols-3 gap-2">
                {chatbots.map((chatbot) => (
                  <button
                    key={chatbot.id}
                    className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-dark text-white transition-colors"
                    onClick={() => {
                      addChatbot(chatbot);
                    }}
                  >
                    <ChatAvatar 
                      letter={chatbot.avatar} 
                      color={chatbot.avatarColor}
                      icon={chatbot.iconComponent}
                    />
                    <span className="text-sm mt-2">{chatbot.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active chatbot windows */}
      {activeChatbots.map((chatbot) => (
        <ChatWindow
          key={chatbot.id}
          chatbot={chatbot}
          onClose={() => removeChatbot(chatbot.id)}
          initialPosition={chatbot.position}
        />
      ))}

      {/* Empty state */}
      {activeChatbots.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <div className="text-center max-w-md animate-fade-in">
            <div className="flex justify-center space-x-2 mb-4">
              {chatbots.slice(0, 3).map((chatbot) => (
                <ChatAvatar 
                  key={chatbot.id}
                  letter={chatbot.avatar} 
                  color={chatbot.avatarColor}
                  icon={chatbot.iconComponent}
                />
              ))}
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Your workspace is empty
            </h2>
            <p className="text-gray-300 mb-6">
              Click the + button in the bottom right to add chatbot windows to your workspace
            </p>
            <Button 
              onClick={() => addChatbot(chatbots[0])}
              className="bg-dark-accent hover:bg-dark-accent/90 text-white"
            >
              Add your first chatbot
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
