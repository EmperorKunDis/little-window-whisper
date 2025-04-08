
import React from "react";
import { cn } from "@/lib/utils";
import { Message } from "@/utils/chatbots";
import ChatAvatar from "./ChatAvatar";

interface ChatMessageProps {
  message: Message;
  avatarLetter: string;
  avatarColor: string;
  isLastMessage?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  avatarLetter,
  avatarColor,
  isLastMessage = false,
}) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={cn(
        "flex w-full mb-2 gap-2",
        isUser ? "flex-row-reverse" : "flex-row",
        isLastMessage && "animate-fade-in"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          <ChatAvatar letter={avatarLetter} color={avatarColor} size="sm" />
        </div>
      )}
      
      <div
        className={cn(
          "rounded-2xl py-2 px-3 max-w-[80%]",
          isUser
            ? "bg-blue-500 text-white rounded-tr-none"
            : "bg-gray-200 text-gray-800 rounded-tl-none"
        )}
      >
        <p className="text-sm">{message.content}</p>
        <span className="text-xs block mt-1 opacity-70">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
