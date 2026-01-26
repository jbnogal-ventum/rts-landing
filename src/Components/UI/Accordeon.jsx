import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Typography } from "../index";
import { Plus } from "lucide-react";
export default function Accordion({
  items = [],
  defaultOpen = 0,
  allowCollapse = true,
  className = "",
}) {
  const [openIndex, setOpenIndex] = useState(
    typeof defaultOpen === "number" ? defaultOpen : -1
  );

  const toggle = (i) => {
    setOpenIndex((curr) => {
      if (curr === i) return allowCollapse ? -1 : curr;
      return i;
    });
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {items.map((it, i) => {
        const isOpen = i === openIndex;

        return (
          <article
            key={it.id ?? i + it.title}
            className={`
              backdrop-blur-md
              bg-background-soft
              rounded-xl p-3
              transition-all duration-200
            `}
          >
            <header className="block">
              <button
                className="w-full flex items-center justify-between gap-3.5 p-0 border-0 bg-transparent text-inherit cursor-pointer text-left"
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
              >
                <Typography variant="title-body" className="text-text-primary">
                  {it.title}
                </Typography>

                <span 
                  className={`
                    w-10 h-10 rounded-full flex-shrink-0 
                    flex items-center justify-center transition-all duration-300
               
                    hover:bg-background-inverse
                    hover:text-background-primary
                    ${isOpen 
                      ? "bg-background-inverse text-background-primary" 
                      : "bg-assistant-background text-text-primary"
                    }
                  `}
                  aria-hidden="true"
                >
                  <motion.span
                    className={`
                      text-body-md leading-none -translate-y-[1px] will-change-transform
                    `}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Plus className="w-icon-xs h-icon-xs " />
                  </motion.span>
                </span>
              </button>
            </header>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.div
                    className="pt-3 will-change-transform"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ 
                      duration: 0.26, 
                      ease: "easeOut",
                      delay: 0.14 
                    }}
                  >
                    {it.body && (
                      <Typography variant="body-default" className="text-text-secondary">
                        {it.body}
                      </Typography>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}