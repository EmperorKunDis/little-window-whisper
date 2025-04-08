
import React, { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center border-t border-gray-200 p-2 bg-white rounded-b-lg"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border-0 focus:ring-0 focus:outline-none text-sm px-3 py-1.5"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={16} />
      </button>
    </form>
  );
};

export default ChatInput;
