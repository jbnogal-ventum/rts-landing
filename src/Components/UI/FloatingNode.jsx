// src/Components/UI/FloatingNode.jsx
import { useEffect, useRef, useState, useCallback, use } from "react";
import gsap from "gsap";
import { SendHorizonal, X } from "lucide-react";
import "./FloatingNode.css";
import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "../../lib/utils";
const WEBHOOK_URL =
  "https://ruana-ai-d9eshse0hxcqfrae.eastus2-01.azurewebsites.net/webhook/660ac8f6-f8c3-4af3-b6ff-3f17007faf96";

const GREETING = "What technical challenge are you facing today?";

export default function FloatingNode() {
  const nodeRef = useRef(null);
  const panelRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hasGreeted = useRef(false);
  const isAnimating = useRef(false);

  const {theme} = useTheme();

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

  const expand = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    // Add greeting on first open
    if (!hasGreeted.current) {
      hasGreeted.current = true;
      setMessages([{ role: "assistant", content: GREETING }]);
    }

    setIsExpanded(true);

    requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) {
        isAnimating.current = false;
        return;
      }
      gsap.fromTo(
        panel,
        { scale: 0.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.4)",
          onComplete: () => {
            isAnimating.current = false;
          },
        }
      );
    });
  }, []);

  const collapse = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const panel = panelRef.current;
    if (!panel) {
      setIsExpanded(false);
      isAnimating.current = false;
      return;
    }

    gsap.to(panel, {
      scale: 0.3,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIsExpanded(false);
        isAnimating.current = false;
      },
    });
  }, []);

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

  // Intro animation — same as original
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    gsap.set(node, {
      autoAlpha: 0,
      y: 40,
      filter: "blur(14px)",
      pointerEvents: "none",
    });

    let introPlayed = false;

    const playIntro = () => {
      if (introPlayed) return;
      introPlayed = true;
      window.__nodeReady = true;

      gsap.fromTo(
        node,
        { y: 40, autoAlpha: 0, filter: "blur(14px)" },
        {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 1.15,
          ease: "power3.out",
          onComplete: () => {
            gsap.set(node, { pointerEvents: "auto" });
          },
        }
      );
    };

    if (window.__heroEnter) requestAnimationFrame(playIntro);

    const onEnter = () => playIntro();
    window.addEventListener("hero:enter", onEnter);

    return () => {
      window.removeEventListener("hero:enter", onEnter);
    };
  }, []);
  return (
    <div className="floating-node" ref={nodeRef}>
      {!isExpanded ? (
        <div key="collapsed" className={"fn-collapsed"} onClick={expand}>
          <div className={cn(theme === "dark" ? "fn-outer-circle-dark" : "fn-outer-circle-light", "transition-colors duration-700 ease-in-out fn-outer-circle")} >
            <div className="fn-ring" />
          </div>
        </div>
      ) : (
        <div key="panel" className="fn-chat-panel bg-assistant-background rounded-md shadow-md" ref={panelRef}>
          {/* Header */}
          <div className="fn-chat-header ">
            <div className="fn-chat-header-left">
              <div className="fn-chat-header-ring" />
              <span className="fn-chat-header-title">RTS Assistant</span>
            </div>
            <button className="fn-chat-close" onClick={collapse} type="button">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="fn-chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`fn-chat-bubble ${
                  msg.role === "user"
                    ? "fn-chat-bubble-user"
                    : msg.role === "error"
                    ? "fn-chat-bubble-error"
                    : "fn-chat-bubble-assistant"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="fn-typing">
                <div className="fn-typing-dot" />
                <div className="fn-typing-dot" />
                <div className="fn-typing-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="fn-chat-input-bar">
            <input
              ref={inputRef}
              className="fn-chat-input"
              type="text"
              placeholder="Type a message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="fn-chat-send"
              type="button"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
            >
              <SendHorizonal size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
