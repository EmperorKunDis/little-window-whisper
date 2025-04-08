
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ChatAvatarProps {
  letter: string;
  color: string;
  icon?: LucideIcon;
  size?: "sm" | "md" | "lg";
}

const ChatAvatar: React.FC<ChatAvatarProps> = ({ 
  letter, 
  color, 
  icon: Icon, 
  size = "md" 
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base"
  };

  // Use the provided color but enhance it for a glowing effect in the dark theme
  const enhancedColor = color === "bg-blue-500" 
    ? "bg-dark-accent" 
    : color.includes("purple") 
      ? "bg-dark-accent" 
      : color.includes("green") 
        ? "bg-emerald-500" 
        : color.includes("pink") 
          ? "bg-pink-500" 
          : color;

  return (
    <div 
      className={cn(
        "rounded-full flex items-center justify-center text-white font-semibold shadow-md",
        enhancedColor,
        sizeClasses[size],
        "animate-bounce-in"
      )}
    >
      {Icon ? (
        <Icon className="w-5 h-5" />
      ) : (
        letter
      )}
    </div>
  );
};

export default ChatAvatar;
