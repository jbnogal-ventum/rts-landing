// src/Components/UI/FloatingNode.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizonal, X } from "lucide-react";
import "./FloatingNode.css";
import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../lib/utils";

const WEBHOOK_URL =
  "https://ruana-ai-d9eshse0hxcqfrae.eastus2-01.azurewebsites.net/webhook/660ac8f6-f8c3-4af3-b6ff-3f17007faf96";

const GREETING = "What technical challenge are you facing today?";

export default function FloatingNode() {
  const nodeRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [isExpanded, setIsExpanded] = useState(false);
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
      className="floating-node"
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
            className="fn-collapsed"
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
              theme === "dark" ? "fn-outer-circle-dark" : "fn-outer-circle-light",
              "transition-colors duration-700 ease-in-out fn-outer-circle"
            )}>
              <div className="fn-ring" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="panel"
            className="fn-chat-panel bg-assistant-background rounded-md shadow-md"
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
            <div className="fn-chat-header">
              <div className="fn-chat-header-left">
                <div className="fn-chat-header-ring" />
                <span className="fn-chat-header-title">RTS Assistant</span>
              </div>
              <motion.button 
                className="fn-chat-close"
                onClick={() => setIsExpanded(false)}
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="fn-chat-messages">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`fn-chat-bubble ${
                    msg.role === "user"
                      ? "fn-chat-bubble-user"
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
                  className="fn-typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="fn-typing-dot"
                    animate={{ 
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div 
                    className="fn-typing-dot"
                    animate={{ 
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: 0.1,
                    }}
                  />
                  <motion.div 
                    className="fn-typing-dot"
                    animate={{ 
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                  />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <motion.div 
              className="fn-chat-input-bar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <input
                ref={inputRef}
                className="fn-chat-input"
                type="text"
                placeholder="Type a message…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <motion.button
                className="fn-chat-send"
                type="button"
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <SendHorizonal size={18} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
