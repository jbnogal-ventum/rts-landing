// src/Components/UI/FloatingNode.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import { Typography, Button } from "../index";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ChevronLeft, SendHorizonal, X } from "lucide-react";
import "./FloatingNode.css";
import { useTheme } from "../../contexts/ThemeContext";
import { cn, parseAssistantMessage } from "../../lib/utils";
import { useSelector } from "react-redux";

const WEBHOOK_URL =
  "https://n8n-n8n.kuwsz0.easypanel.host/webhook/660ac8f6-f8c3-4af3-b6ff-3f17007faf96";

const suggestions = [
  { title: "🔌 Connectivity", description: "Do you face gaps in real-time data \nflow  between your industrial assets \nand enterprise systems?", message: "We face gaps in real-time data \nflow  between our industrial assets \nand enterprise systems. " },
  { title: "🏭 Integration", description: "Are you experiencing difficulties getting \nyour IT systems and OT operations to work seamlessly together?", message: "We are experiencing difficulties getting \nour IT systems and OT operations to work seamlessly together. " },
  { title: "👾 Security", description: "How confident are you that your OT environments are protected against evolving cybersecurity threats?", message: "We are not confident that our OT environments are protected against evolving cybersecurity threats. " },
]

export default function FloatingNode({ lenisRef }) {
  const touchStartY = useRef(0);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    const el = chatMessagesRef.current;
    if (!el) return;

    const deltaY = touchStartY.current - e.touches[0].clientY;
    touchStartY.current = e.touches[0].clientY;

    const atTop = el.scrollTop === 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;

    // Solo prevenir el default si el contenedor puede scrollear en esa dirección
    if (!(atTop && deltaY < 0) && !(atBottom && deltaY > 0)) {
      e.stopPropagation();
      el.scrollTop += deltaY;
    }
  };
  // 1. Agregar ref al contenedor de mensajes
  const chatMessagesRef = useRef(null);

  // 2. Reemplazar los handlers por esta versión mejorada
  const handleMouseEnter = () => {
    lenisRef?.current?.stop();
  };

  const handleMouseLeave = () => {
    lenisRef?.current?.start();
  };

  // 3. Handler de wheel que delega el scroll al contenedor de mensajes
  const handleWheel = (e) => {
    const el = chatMessagesRef.current;
    if (!el) return;

    e.stopPropagation();
    el.scrollTop += e.deltaY;
  };
  const nodeRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const { isBar } = useSelector((state) => state.node);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [suggestionsPannelOpen, setSuggestionsPanelOpen] = useState(false);
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

  const sendMessage = useCallback(async (msg) => {
    const text = (msg || input).trim();
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

      const raw = await res.text();
      //console.log("Raw text:", raw);

      const data = JSON.parse(raw);
     //console.log("Parsed data:", data);

      const reply = data.output || data.message || data.response || JSON.stringify(data);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
    } catch (err) {
      console.error("Error completo:", err);
      setMessages((prev) => [
        ...prev,
        { role: "error", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && input.split("").length > 3 && input.split("").length < 251 && !isLoading) {
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
      className={cn("fixed z-[995]  bg-transparent ", isExpanded ? 'bottom-0 right-0 sm:bottom-5 sm:right-5' : 'bottom-5 right-5')}
      initial={{
        opacity: 0,
        y: 40,

        pointerEvents: "none"
      }}
      animate={isVisible ? {
        opacity: 1,
        y: 0,
        pointerEvents: "auto"
      } : {
        opacity: 0,
        y: 40,
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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className="flex flex-col gap-3 py-3 bg-background-white text-text-on-white-primary rounded-md shadow-md backdrop-blur-md transform origin-bottom-right sm:w-chat-panel sm:h-chat-panel w-[100vw] h-[100vh]"
            initial={{
              scale: 0,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            exit={{
              scale: 0,
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
              <div className="flex items-center space-x-3">
                {suggestionsPannelOpen && <button onClick={() => setSuggestionsPanelOpen(false)} className="w-icon-md h-icon-md border border-border-subtle rounded-[4px] flex items-center hover:bg-assistant-background-light">
                  <ChevronLeft className="" />
                </button>}
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
            {suggestionsPannelOpen ? (<div className="flex flex-col gap-3 px-4 h-full overflow-y-auto ">

              <Typography variant="title-large" className="">
                <span className="bg-gradient-to-br from-[#1c56ff] to-[#a463ff] bg-clip-text text-transparent">Examples RTS <br />can help you with</span>
              </Typography>

              {suggestions.map((s, i) => (
                <motion.div
                  key={i + 'suggestion'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`p-3 rounded-xl flex flex-col gap-2 border border-border-subtle hover:bg-surface-primary hover:border-surface-primary cursor-pointer transition-colors duration-300`}
                  onClick={() => {
                    setMessages([]);
                    sendMessage(s.message);
                    setSuggestionsPanelOpen(false);
                  }}
                >
                  <Typography variant="subtitle-lg" className="text-text-on-white-primary">
                    {s.title}
                  </Typography>
                  <Typography variant="body-sm" className="text-text-on-white-secondary whitespace-pre-wrap">
                    {s.description}
                  </Typography>
                </motion.div>
              ))
              }

            </div>)
              : <div className="flex flex-col gap-3 h-full min-h-0">

                {messages.length === 0 && (
                  <div className="flex flex-col gap-2 px-4">
                    <Typography variant="title-large" > <span className="bg-gradient-to-br from-[#0093CE] via-[#6367FF] to-[#8027FD] bg-clip-text text-transparent">Got a technical challenge? </span></Typography>
                    <Typography variant="body-sm" children="Tell me about it, and I’ll show you how we can help you reach your goals." />
                  </div>)}

                {/* Messages */}
                <div ref={chatMessagesRef} className="fn-chat-messages pl-4 pr-0.5 mr-0.5">

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
                          : "flex flex-row gap-2"
                        }`}
                    >
                      {msg.role === "assistant" && i === messages.length - 1 && (
                        <div class="gradient-border rounded-full w-icon-md h-icon-md shrink-0" />
                      )}
                      {msg.role === "assistant"
                        ? parseAssistantMessage(msg.content)
                        : msg.content
                      }
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      className="flex items-center gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="gradient-border rounded-full w-icon-md h-icon-md" />
                      <Typography variant='body-sm' className="text-text-on-white-primary ">
                        Writing ...
                      </Typography>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                {messages.length === 0 && <Button variant="chip-node" className="mx-4 mt-2 self-end" onClick={() => {
                  setSuggestionsPanelOpen(true)
                }}>Here’s how I can help</Button>}
                {/* Input */}
                <motion.div
                  className="flex flex-col items-center gap-1 px-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="relative w-full">
                    <input
                      ref={inputRef}
                      className={cn(
                        "flex w-full rounded-md border-[2px] border-border-subtle-selected px-3 py-2 text-sm focus:outline-none",
                        "hover:border-border-strong focus:border-border-strong",
                        "placeholder:text-text-on-white-primary",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        input.split("").length > 3 && input.split("").length < 251 && "!border-border-inverse focus:border-border-inverse hover:border-border-inverse"

                      )}
                      type="text"
                      placeholder="Write here"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <button onClick={() => sendMessage(input)} className={cn("absolute right-2 top-1/2 -translate-y-1/2 h-icon-lg w-icon-lg p-0.5 rounded-full bg-background-inverse", input.split("").length > 3 && input.split("").length < 251 && "!bg-border-inverse")}>
                      <ArrowUp className={cn("w-full h-full text-background-inverse-disabled", input.split("").length > 3 && input.split("").length < 251 && "!text-background-white")} />
                    </button>
                  </div>
                  <Typography variant='subtitle-md' className="text-text-helper ">
                    RTS Node can make mistakes. Check important info.
                  </Typography>
                </motion.div>
              </div>
            }
          </motion.div>

        )}
      </AnimatePresence>
    </motion.div>
  );
}
