
import { Clock, BarChart, Coffee, Cog, Book, Rocket } from "lucide-react";

export interface Chatbot {
  id: string;
  name: string;
  avatar: string;
  avatarColor: string;
  iconComponent: typeof Clock;
  greeting: string;
  windowColor: string;
  messages: Message[];
  position?: { x: number; y: number }; // Adding the position property as optional
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const chatbots: Chatbot[] = [
  {
    id: "assistant",
    name: "Ava",
    avatar: "A",
    avatarColor: "bg-purple-500",
    iconComponent: Clock,
    greeting: "Hello! I'm Ava, your personal assistant. How can I help you today?",
    windowColor: "bg-purple-100 border-purple-300",
    messages: [
      {
        id: "1",
        content: "Hello! I'm Ava, your personal assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "analytics",
    name: "Data",
    avatar: "D",
    avatarColor: "bg-blue-500",
    iconComponent: BarChart,
    greeting: "Greetings! I'm Data, your analytics expert. Let's look at some numbers!",
    windowColor: "bg-blue-100 border-blue-300",
    messages: [
      {
        id: "1",
        content: "Greetings! I'm Data, your analytics expert. Let's look at some numbers!",
        sender: "bot",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "casual",
    name: "Coco",
    avatar: "C",
    avatarColor: "bg-amber-500",
    iconComponent: Coffee,
    greeting: "Hey there! Coco here. What's on your mind?",
    windowColor: "bg-amber-100 border-amber-300",
    messages: [
      {
        id: "1",
        content: "Hey there! Coco here. What's on your mind?",
        sender: "bot",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "tech",
    name: "Tek",
    avatar: "T",
    avatarColor: "bg-green-500",
    iconComponent: Cog,
    greeting: "Systems online. I'm Tek, your tech support. How may I assist?",
    windowColor: "bg-green-100 border-green-300",
    messages: [
      {
        id: "1",
        content: "Systems online. I'm Tek, your tech support. How may I assist?",
        sender: "bot",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "tutor",
    name: "Prof",
    avatar: "P",
    avatarColor: "bg-red-500",
    iconComponent: Book,
    greeting: "Good day! I'm Prof, ready to help you learn. What subject shall we cover?",
    windowColor: "bg-red-100 border-red-300",
    messages: [
      {
        id: "1",
        content: "Good day! I'm Prof, ready to help you learn. What subject shall we cover?",
        sender: "bot",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "innovator",
    name: "Nova",
    avatar: "N",
    avatarColor: "bg-indigo-500",
    iconComponent: Rocket,
    greeting: "Hello, innovator! I'm Nova. Let's brainstorm some creative ideas!",
    windowColor: "bg-indigo-100 border-indigo-300",
    messages: [
      {
        id: "1",
        content: "Hello, innovator! I'm Nova. Let's brainstorm some creative ideas!",
        sender: "bot",
        timestamp: new Date(),
      },
    ],
  },
];

export const getChatbotResponses = (chatbotId: string, userMessage: string): string => {
  // In a real app, you might use more sophisticated logic or an actual AI service
  const lowerMessage = userMessage.toLowerCase();
  
  // Simple response logic based on chatbot personality
  switch (chatbotId) {
    case "assistant":
      if (lowerMessage.includes("hello") || lowerMessage.includes("hi"))
        return "Hello there! How can I assist you today?";
      if (lowerMessage.includes("time"))
        return `The current time is ${new Date().toLocaleTimeString()}.`;
      if (lowerMessage.includes("thank"))
        return "You're welcome! Is there anything else you need help with?";
      return "I'm here to help with your tasks and reminders. What would you like me to do?";
      
    case "analytics":
      if (lowerMessage.includes("data") || lowerMessage.includes("numbers"))
        return "I'm detecting a 27% increase in productivity this week. Great job!";
      if (lowerMessage.includes("report"))
        return "Your monthly report is ready. Would you like me to summarize the key findings?";
      return "Based on my analysis, your performance metrics are trending positively. Would you like more details?";
      
    case "casual":
      if (lowerMessage.includes("hello") || lowerMessage.includes("hi"))
        return "Hey! How's it going?";
      if (lowerMessage.includes("weekend"))
        return "Weekends are the best! Any fun plans?";
      return "Just chillin' here. Let me know if you want to chat about anything!";
      
    case "tech":
      if (lowerMessage.includes("error") || lowerMessage.includes("problem"))
        return "I've detected the issue. Have you tried restarting the system?";
      if (lowerMessage.includes("update"))
        return "Your system is currently up to date with all the latest patches.";
      return "Running system diagnostics... All systems operational. How can I assist with your technical needs?";
      
    case "tutor":
      if (lowerMessage.includes("learn") || lowerMessage.includes("study"))
        return "Excellent! Learning is a lifelong journey. What subject interests you most?";
      if (lowerMessage.includes("question"))
        return "That's a great question! Let's break it down step by step...";
      return "Did you know? The human brain can process information at approximately 120 bits per second.";
      
    case "innovator":
      if (lowerMessage.includes("idea") || lowerMessage.includes("creative"))
        return "That's a brilliant idea! Have you considered approaching it from this angle...?";
      if (lowerMessage.includes("project"))
        return "Your project has incredible potential. Let's brainstorm how to take it to the next level!";
      return "Innovation comes from connecting seemingly unrelated concepts. What if we combined these elements...?";
      
    default:
      return "I'm not sure how to respond to that. Can you try asking something else?";
  }
};
