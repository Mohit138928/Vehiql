"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  MessageCircle as MessageCircleIcon, 
  Send as SendIcon,
  Minimize2 as Minimize2Icon,
  Maximize2 as Maximize2Icon
} from "lucide-react";
import { processChatMessage } from "@/actions/chat";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm AutoVolt Assistant. I can help you find your perfect car. What type of car are you looking for?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await processChatMessage(
        input, 
        messages.map(m => ({ role: m.role, content: m.content }))
      );

      if (!result.success) {
        throw new Error(result.error);
      }

      setMessages(prev => [...prev, {
        role: "assistant",
        content: result.data.message,
        recommendations: result.data.recommendations
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button 
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg"
        >
          <MessageCircleIcon className="w-6 h-6" />
        </Button>
      ) : (
        <Card className="w-[350px] h-[500px] flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">AutoVolt Assistant</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <Minimize2Icon className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  <p>{msg.content}</p>
                  {msg.recommendations?.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {msg.recommendations.map((car, i) => (
                        <Button
                          key={i}
                          variant="secondary"
                          size="sm"
                          className="w-full"
                          onClick={() => window.location.href = `/cars/${car.id}`}
                        >
                          {car.year} {car.make} {car.model}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <Button onClick={handleSend} disabled={isLoading}>
                <SendIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ChatBot;