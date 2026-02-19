// src/Components/UI/FloatingNode.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import { Typography, Button } from "../index";
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizonal, X } from "lucide-react";
import "./FloatingNode.css";
import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../lib/utils";
import { useSelector } from "react-redux";

const WEBHOOK_URL =
  "https://ruana-ai-d9eshse0hxcqfrae.eastus2-01.azurewebsites.net/webhook/660ac8f6-f8c3-4af3-b6ff-3f17007faf96";

const GREETING = "What technical challenge are you facing today?";

export default function FloatingNode() {
  const nodeRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const { isBar } = useSelector((state) => state.node);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const hasGreeted = useRef(false);

  const { theme } = useTheme();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isExpanded) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [isExpanded]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const reply = data.output || data.message || data.response || JSON.stringify(data);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "error", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Intro animation con Framer Motion
  useEffect(() => {
    let introPlayed = false;

    const playIntro = () => {
      if (introPlayed) return;
      introPlayed = true;
      setIsVisible(true);
    };

    requestAnimationFrame(playIntro);

  }, []);

  return (
    <motion.div
      ref={nodeRef}
      className={cn("fixed z-[995]  bg-transparent cursor-pointer", isExpanded ? 'bottom-0 right-0 sm:bottom-5 sm:right-5' : 'bottom-5 right-5')}
      initial={{
        opacity: 0,
        y: 40,
        filter: "blur(14px)",
        pointerEvents: "none"
      }}
      animate={isVisible ? {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        pointerEvents: "auto"
      } : {
        opacity: 0,
        y: 40,
        filter: "blur(14px)",
        pointerEvents: "none"
      }}
      transition={{
        duration: 1.15,
        ease: [0.16, 1, 0.3, 1], // power3.out equivalent
      }}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="collapsed"
            className="w-node-collapsed h-node-collapsed rounded-full flex items-center justify-center cursor-pointer translate-x-0 translate-y-0"
            onClick={() => {
              if (!hasGreeted.current) {
                hasGreeted.current = true;
                setMessages([{ role: "assistant", content: GREETING }]);
              }
              setIsExpanded(true);
            }}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className={cn(
              theme === "dark" ? "bg-assistant-background-dark" : "bg-assistant-background-light",
              "transition-colors duration-700 ease-in-out w-full h-full rounded-full flex items-center justify-center backdrop-blur "
            )}>
              <div className="fn-ring" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="panel"
            className=" bg-background-white text-text-on-white-primary rounded-md shadow-md backdrop-blur-md flex flex-col gap-3 py-4 overflow-hidden transform origin-bottom-right sm:w-chat-panel sm:h-chat-panel w-[100vw] h-[100vh]"
            initial={{
              scale: 0.3,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            exit={{
              scale: 0.3,
              opacity: 0
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              mass: 0.8,
            }}
            style={{
              originX: 1,
              originY: 1
            }}
          >
            {/* Header */}
            <div className="flex flex-row items-center justify-between 3 px-4">
              <div className="flex items-center gap-1">
                <div class={cn("gradient-border rounded-full w-icon-md h-icon-md transition-opacity duration-300", messages.length > 0 || isLoading ? "opacity-0 hidden" : "opacity-100 block")} />
                <Typography className="">RTS Node</Typography>
              </div>
              <Button
                variant="text-node"
                className=""
                onClick={() => setIsExpanded(false)}
              >
                Close
              </Button>
            </div>

            {/* Messages */}
            <div className="fn-chat-messages px-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={` ${msg.role === "user"
                      ? "bg-background-inverse max-w-[85%] p-3 rounded-xl rounded-br-none text-text-on-white-primary text-body-sm flex self-end"
                      : msg.role === "error"
                        ? "fn-chat-bubble-error"
                        : "fn-chat-bubble-assistant"
                    }`}
                >
                  {msg.content}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  className="flex items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                   <div class="gradient-border rounded-full w-icon-md h-icon-md" />
                  <Typography variant='body-sm' className="text-text-on-white-primary ">
                    Thinking ...
                  </Typography>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <motion.div
              className="flex flex-col items-center gap-1 px-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <input
                ref={inputRef}
                className={cn(
              "flex w-full rounded-md border-[2px] border-border-subtle-selected px-3 py-2 text-sm focus:outline-none",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-text-on-white-primary",
              "disabled:cursor-not-allowed disabled:opacity-50",
              false && "border-sentiment-negative focus-visible:ring-sentiment-negative",
              
            )}
                type="text"
                placeholder="Write here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {/* <motion.button
                className="fn-chat-send"
                type="button"
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <SendHorizonal size={18} />
              </motion.button> */}
              <Typography variant='subtitle-md' className="text-text-helper ">
               RTS can make mistakes. Check important info.
              </Typography>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
