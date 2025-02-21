"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Bot, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import Enlighten from "./enlighten";
import remarkGfm from "remark-gfm";

const Chat = () => {
  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { role: string; parts: string[] }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!value) {
      setError("Kindly ask a question please");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("/api/chat", {
        message: value,
        history: chatHistory,
      });

      await axios.post("/api/saveChat", {
        userId: "DemoUser",
        message: value,
        response:response.data.message,
      });

      const responseData = response.data;

      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        { role: "user", parts: [value] },
        { role: "model", parts: [responseData.message] },
      ]);
      setValue("");
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChatHistory = async () => {
    const res = await fetch(`/api/getChatHistory?userId=user123`);
    const data = await res.json();
    // setChatHistory(data.chats);
    console.log("fetch chatHistory",data);
  };

  // useEffect(() => {
  //   fetchChatHistory();
  // }, []);

  return (
    <div className="flex flex-col overflow-y-auto w-full max-w-7xl mx-auto">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-2 chat-container",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {msg.role === "bot" && <Bot className="w-5 h-5 text-zinc-400" />}
            <div
              className={cn(
                "p-5 rounded-lg max-w-5xl ",
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-zinc-800 text-white rounded-bl-none"
              )}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.parts[0]}
              </ReactMarkdown>
            </div>
            {msg.role === "user" && <User className="w-5 h-5 text-zinc-400" />}
          </div>
        ))}
        {isLoading && (
          <p className="text-center text-zinc-400">Reasoning your question</p>
        )}
      </div>

      {/* Input Bar */}
      <div className="flex items-center p-4 border-t border-zinc-700 bg-zinc-900 max-w-3xl justify-center">
        <Enlighten setValue={setValue} chatHistory={chatHistory} />

        <input
          type="text"
          className="flex-1 p-2 bg-zinc-800 text-white rounded-lg outline-none "
          placeholder="Hey Parth, what bothers you ?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={isLoading}
        />
        <button
          className="ml-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition disabled:bg-gray-500"
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : <Send className="w-5 h-5" />}
        </button>
      </div>

      {/* Clear Chat */}
      <div className="flex items-center p-4 border-t border-zinc-700 bg-zinc-900 max-w-3xl justify-center">
        <Button
          onClick={() => {
            setChatHistory([]);
          }}
        >
          Clear Chat
        </Button>
        <p className="text-white/20">
          Ahimsha can make mistakes, so double-check it
        </p>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Chat;
