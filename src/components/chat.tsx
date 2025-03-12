"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Bot, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import Enlighten from "./enlighten";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";

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
        response: response.data.message,
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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const loadingAnimationVariants = {
    animate: {
      opacity: [0.4, 1, 0.4],
      scale: [0.98, 1.02, 0.98],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const dotVariants = {
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // const fetchChatHistory = async () => {
  //   const res = await fetch(`/api/getChatHistory?userId=user123`);
  //   const data = await res.json();
  //   // setChatHistory(data.chats);
  //   console.log("fetch chatHistory",data);
  // };

  // useEffect(() => {
  //   fetchChatHistory();
  // }, []);

  return (
    // <div className="flex flex-col overflow-y-auto w-full max-w-7xl mx-auto">
    //   {/* Chat Messages */}
    //   <div className="flex-1 overflow-y-auto p-4 space-y-3">
    //     {chatHistory.map((msg, index) => (
    //       <div
    //         key={index}
    //         className={cn(
    //           "flex items-start gap-2 chat-container",
    //           msg.role === "user" ? "justify-end" : "justify-start"
    //         )}
    //       >
    //         {msg.role === "bot" && <Bot className="w-5 h-5 text-zinc-400" />}
    //         <div
    //           className={cn(
    //             "p-5 rounded-lg max-w-5xl ",
    //             msg.role === "user"
    //               ? "bg-blue-600 text-white rounded-br-none"
    //               : "bg-zinc-800 text-white rounded-bl-none"
    //           )}
    //         >
    //           <ReactMarkdown remarkPlugins={[remarkGfm]}>
    //             {msg.parts[0]}
    //           </ReactMarkdown>
    //         </div>
    //         {msg.role === "user" && <User className="w-5 h-5 text-zinc-400" />}
    //       </div>
    //     ))}
    //     {isLoading && (
    //       <p className="text-center text-zinc-400 relative overflow-hidden">
    //       <span className="inline-block animate-flowing">Reasoning your question</span>
    //     </p>
    //     )}
    //   </div>

    //   {/* Input Bar */}
    //   <div className="flex items-center p-4 border-t border-zinc-700 bg-zinc-900 max-w-3xl justify-center">
    //     <Enlighten setValue={setValue} chatHistory={chatHistory} />

    //     <input
    //       type="text"
    //       className="flex-1 p-2 bg-zinc-800 text-white rounded-lg outline-none "
    //       placeholder="Hey Parth, what bothers you ?"
    //       value={value}
    //       onChange={(e) => setValue(e.target.value)}
    //       onKeyDown={(e) => e.key === "Enter" && handleSend()}
    //       disabled={isLoading}
    //     />
    //     <button
    //       className="ml-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition disabled:bg-gray-500"
    //       onClick={handleSend}
    //       disabled={isLoading}
    //     >
    //       {isLoading ? "Loading..." : <Send className="w-5 h-5" />}
    //     </button>
    //   </div>

    //   {/* Clear Chat */}
    //   <div className="flex items-center p-4 border-t border-zinc-700 bg-zinc-900 max-w-3xl justify-center">
    //     <Button
    //       onClick={() => {
    //         setChatHistory([]);
    //       }}
    //     >
    //       Clear Chat
    //     </Button>
    //     <p className="text-white/20">
    //       Ahimsha can make mistakes, so double-check it
    //     </p>
    //   </div>

    //   {error && <p className="text-red-500 mt-2">{error}</p>}
    // </div>
    // <div className="flex flex-col h-[calc(100vh-2rem)] overflow-hidden w-full max-w-4xl mx-auto bg-zinc-950 rounded-lg shadow-lg border border-zinc-800 sm:h-[calc(100vh-4rem)]">
    //   {/* Chat Messages */}
    //   <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
    //     <AnimatePresence>
    //       {chatHistory.map((msg, index) => (
    //         <motion.div
    //           key={index}
    //           initial="hidden"
    //           animate="visible"
    //           exit="exit"
    //           variants={messageVariants}
    //           className={cn(
    //             "flex items-start gap-2 chat-container",
    //             msg.role === "user" ? "justify-end" : "justify-start"
    //           )}
    //         >
    //           {msg.role === "bot" && (
    //             <motion.div
    //               whileHover={{ scale: 1.1 }}
    //               className="bg-violet-600 rounded-full p-1 flex-shrink-0 hidden sm:flex"
    //             >
    //               <Bot className="w-4 h-4 text-white" />
    //             </motion.div>
    //           )}
    //           <motion.div
    //             className={cn(
    //               "p-3 sm:p-4 rounded-lg max-w-[85%] sm:max-w-[75%] break-words",
    //               msg.role === "user"
    //                 ? "bg-blue-600 text-white rounded-br-none"
    //                 : "bg-zinc-800 text-white rounded-bl-none"
    //             )}
    //             whileHover={{ scale: 1.01 }}
    //           >
    //             <div className="prose prose-invert max-w-none text-sm sm:text-base">
    //               <ReactMarkdown remarkPlugins={[remarkGfm]}>
    //                 {msg.parts[0]}
    //               </ReactMarkdown>
    //             </div>
    //           </motion.div>
    //           {msg.role === "user" && (
    //             <motion.div
    //               whileHover={{ scale: 1.1 }}
    //               className="bg-blue-600 rounded-full p-1 flex-shrink-0 hidden sm:flex"
    //             >
    //               <User className="w-4 h-4 text-white" />
    //             </motion.div>
    //           )}
    //         </motion.div>
    //       ))}
    //     </AnimatePresence>

    //     {isLoading && (
    //       <motion.div
    //         className="flex justify-center items-center gap-1 p-3"
    //         variants={loadingAnimationVariants}
    //         animate="animate"
    //       >
    //         <span className="text-zinc-400 text-sm sm:text-base font-medium">
    //           Reasoning your question
    //         </span>
    //         <div className="flex gap-1">
    //           {[0, 1, 2].map((i) => (
    //             <motion.span
    //               key={i}
    //               className="w-1.5 h-1.5 bg-violet-500 rounded-full"
    //               variants={dotVariants}
    //               animate="animate"
    //               custom={i}
    //               transition={{
    //                 delay: i * 0.2,
    //                 duration: 0.6,
    //                 repeat: Infinity,
    //                 ease: "easeInOut",
    //               }}
    //             />
    //           ))}
    //         </div>
    //       </motion.div>
    //     )}
    //     <div ref={messagesEndRef} />
    //   </div>

    //   {/* Input Bar */}
    //   <div className="p-2 sm:p-4 border-t border-zinc-800 bg-zinc-900">
    //     <div className="relative flex items-center max-w-3xl mx-auto">
    //       {Enlighten && (
    //         <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
    //           <Enlighten setValue={setValue} chatHistory={chatHistory} />
    //         </div>
    //       )}

    //       <motion.input
    //         type="text"
    //         className="flex-1 p-2 pl-10 sm:pl-12 bg-zinc-800 text-white rounded-lg outline-none border border-zinc-700 focus:border-blue-500 transition-all text-sm sm:text-base"
    //         placeholder="Hey Parth, what bothers you?"
    //         value={value}
    //         onChange={(e) => setValue(e.target.value)}
    //         onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
    //         disabled={isLoading}
    //         whileFocus={{ scale: 1.01 }}
    //         initial={{ scale: 1 }}
    //       />

    //       <motion.button
    //         className="ml-2 p-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
    //         onClick={handleSend}
    //         disabled={isLoading}
    //         whileHover={{ scale: 1.05 }}
    //         whileTap={{ scale: 0.95 }}
    //       >
    //         {isLoading ? (
    //           <motion.div
    //             animate={{ rotate: 360 }}
    //             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    //             className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
    //           />
    //         ) : (
    //           <Send className="w-5 h-5" />
    //         )}
    //       </motion.button>
    //     </div>
    //   </div>

    //   {/* Clear Chat */}
    //   <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-2 sm:p-4 border-t border-zinc-800 bg-zinc-900">
    //     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    //       <Button
    //         onClick={() => {
    //           setChatHistory([]);
    //         }}
    //         variant="destructive"
    //         size="sm"
    //         className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
    //       >
    //         Clear Chat
    //       </Button>
    //     </motion.div>
    //     <p className="text-white/20 text-xs sm:text-sm text-center sm:text-right">
    //       Ahimsha can make mistakes, so double-check it
    //     </p>
    //   </div>

    //   {error && (
    //     <motion.div
    //       initial={{ opacity: 0, y: 10 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       exit={{ opacity: 0, y: -10 }}
    //       className="p-2 bg-red-500/20 border border-red-500 text-red-400 text-sm rounded mx-4 mb-4"
    //     >
    //       {error}
    //     </motion.div>
    //   )}
    // </div>
    <div className="flex flex-col h-[calc(100vh-2rem)] overflow-hidden w-full max-w-4xl mx-auto bg-zinc-950 rounded-lg shadow-lg border border-zinc-800 sm:h-[calc(100vh-4rem)]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
        <AnimatePresence>
          {chatHistory.map((msg, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={messageVariants}
              className={cn(
                "flex items-start gap-2 chat-container",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "bot" && (
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="bg-violet-600 rounded-full p-1 flex-shrink-0 hidden sm:flex"
                >
                  <Bot className="w-4 h-4 text-white" />
                </motion.div>
              )}
              <motion.div
                className={cn(
                  "p-3 sm:p-4 rounded-lg max-w-[85%] sm:max-w-[75%] break-words",
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-zinc-800 text-white rounded-bl-none"
                )}
                whileHover={{ scale: 1.01 }}
              >
                <div className="prose prose-invert max-w-none text-sm sm:text-base">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.parts[0]}
                  </ReactMarkdown>
                </div>
              </motion.div>
              {msg.role === "user" && (
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="bg-blue-600 rounded-full p-1 flex-shrink-0 hidden sm:flex"
                >
                  <User className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div 
            className="flex justify-center items-center gap-1 p-3"
            variants={loadingAnimationVariants}
            animate="animate"
          >
            <span className="text-zinc-400 text-sm sm:text-base font-medium">Reasoning your question</span>
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 bg-violet-500 rounded-full"
                  variants={dotVariants}
                  animate="animate"
                  custom={i}
                  transition={{
                    delay: i * 0.2,
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar with Enlighten Button Above */}
      <div className="p-2 sm:p-4 border-t border-zinc-800 bg-zinc-900">
        {/* Enlighten Button Moved Above Input */}
        {Enlighten && (
          <div className="flex justify-center mb-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Enlighten setValue={setValue} chatHistory={chatHistory} />
            </motion.div>
          </div>
        )}
        
        <div className="relative flex items-center max-w-3xl mx-auto">
          <motion.input
            type="text"
            className="flex-1 p-2 px-4 bg-zinc-800 text-white rounded-lg outline-none border border-zinc-700 focus:border-blue-500 transition-all text-sm sm:text-base"
            placeholder="Hey Parth, what bothers you?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
            disabled={isLoading}
            whileFocus={{ scale: 1.01 }}
            initial={{ scale: 1 }}
          />
          
          <motion.button
            className="ml-2 p-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
            onClick={handleSend}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Clear Chat */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-2 sm:p-4 border-t border-zinc-800 bg-zinc-900">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => {
              setChatHistory([]);
            }}
            variant="destructive"
            size="sm"
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
          >
            Clear Chat
          </Button>
        </motion.div>
        <p className="text-white/20 text-xs sm:text-sm text-center sm:text-right">
          Ahimsha can make mistakes, so double-check it
        </p>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-2 bg-red-500/20 border border-red-500 text-red-400 text-sm rounded mx-4 mb-4"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default Chat;
