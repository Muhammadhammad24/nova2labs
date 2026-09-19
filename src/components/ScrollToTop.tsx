"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtFooter, setIsAtFooter] = useState(false);
  const [footerTop, setFooterTop] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;

      // Show button after scrolling down 300px
      if (scrolled > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Get footer position
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const footerTopPosition = footerRect.top + window.scrollY;
        setFooterTop(footerTopPosition);

        // Check if footer is visible in viewport
        if (footerRect.top <= window.innerHeight) {
          setIsAtFooter(true);
        } else {
          setIsAtFooter(false);
        }
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    window.addEventListener("resize", toggleVisibility, { passive: true });

    // Initial check
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          onClick={scrollToTop}
          className="z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow hover:scale-110 active:scale-95"
          aria-label="Scroll to top"
          style={{
            position: isAtFooter ? "absolute" : "fixed",
            // Smooth transition for all position properties
            transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            // Position changes based on whether footer is visible
            ...(isAtFooter
              ? {
                  // At footer top edge - positioned on right side at top of footer
                  top: `${footerTop - 24}px`, // 24px is half the button height to center on boundary
                  right: "80px", // 80px from right edge
                  left: "auto",
                  bottom: "auto",
                }
              : {
                  // Normal position - above chatbot on right side
                  bottom: "140px",
                  right: "24px",
                  left: "auto",
                  top: "auto",
                }),
            backdropFilter: "blur(10px)",
          }}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
