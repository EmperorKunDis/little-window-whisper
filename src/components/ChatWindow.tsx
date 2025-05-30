import React, { useState, useRef, useEffect } from "react";
import { X, Minus, MaximizeIcon, MinimizeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chatbot, Message, getChatbotResponses } from "@/utils/chatbots";
import ChatAvatar from "./ChatAvatar";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
  chatbot: Chatbot;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  chatbot,
  onClose,
  initialPosition = { x: 100, y: 100 },
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState<Message[]>(chatbot.messages);
  const [isMinimized, setIsMinimized] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleDragStart = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getChatbotResponses(chatbot.id, content),
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const zIndex = 1000;

  return (
    <div
      ref={windowRef}
      className={cn(
        "absolute rounded-lg shadow-lg border overflow-hidden transition-all duration-200 ease-in-out animate-bounce-in",
        "border-dark-accent/30 bg-dark-secondary",
        isMinimized ? "w-64 h-12" : "w-80 h-96"
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex,
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      <div
        className={cn(
          "px-3 py-2 flex items-center justify-between bg-dark border-b border-dark-accent/30",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        onMouseDown={handleDragStart}
      >
        <div className="flex items-center gap-2">
          <ChatAvatar 
            letter={chatbot.avatar} 
            color={chatbot.avatarColor} 
            icon={chatbot.iconComponent}
            size="sm"
          />
          <span className="font-medium text-white text-sm">
            {chatbot.name}
          </span>
        </div>
        <div className="flex items-center">
          <button 
            onClick={toggleMinimize}
            className="text-gray-300 hover:text-white p-1"
          >
            {isMinimized ? <MaximizeIcon size={14} /> : <Minus size={14} />}
          </button>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-red-400 p-1 ml-1"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="p-3 overflow-y-auto h-[calc(100%-96px)] bg-dark-secondary">
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                avatarLetter={chatbot.avatar}
                avatarColor={chatbot.avatarColor}
                isLastMessage={index === messages.length - 1}
              />
            ))}
            
            {isTyping && (
              <div className="flex gap-2 pl-10 animate-pulse-slow">
                <div className="w-2 h-2 rounded-full bg-dark-accentLight/50"></div>
                <div className="w-2 h-2 rounded-full bg-dark-accentLight/50"></div>
                <div className="w-2 h-2 rounded-full bg-dark-accentLight/50"></div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <ChatInput 
            onSendMessage={handleSendMessage}
            disabled={isTyping}
          />
        </>
      )}
    </div>
  );
};

export default ChatWindow;
