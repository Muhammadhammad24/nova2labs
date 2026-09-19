"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { X, ArrowRight, Bot, Calendar, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { AnimatedOrb } from "./AnimatedOrb";
import { ServiceIcon } from "./ServiceIcons";
import { SERVICES } from "@/lib/services-data";
import { CONTACT_EMAIL } from "@/lib/site";
import { QuickActionButtons } from "./QuickActionButtons";
import { ContactForm } from "./ContactForm";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  component?: React.ReactNode;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Welcome to nova2labs! We help businesses leverage AI, build scalable infrastructure, and develop custom software solutions.",
      isUser: false,
    },
    {
      id: 2,
      text: "How can we assist you today?",
      isUser: false,
      component: (
        <QuickActionButtons
          actions={[
            {
              icon: Bot,
              label: "View Services",
              onClick: () => handleQuickAction("services"),
            },
            {
              icon: Calendar,
              label: "Get Quote",
              onClick: () => handleQuickAction("quote"),
            },
            {
              icon: Mail,
              label: "Contact Us",
              onClick: () => handleQuickAction("contact"),
            },
            {
              icon: Phone,
              label: "Book Call",
              onClick: () => handleQuickAction("call"),
            },
          ]}
        />
      ),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/open-WbfFaH8Y88MyCuFrnh3hBIxabYIsBT.mp3",
      );
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsExpanded(true);
      const contentTimer = setTimeout(() => setShowContent(true), 1000);
      return () => {
        clearTimeout(contentTimer);
      };
    } else {
      setShowContent(false);
      const collapseTimer = setTimeout(() => {
        setIsExpanded(false);
      }, 150);
      return () => {
        clearTimeout(collapseTimer);
      };
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
    };

    const typed = inputValue;
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: `Thanks! Add your name and email below and this goes straight to our inbox \u2014 or write to us at ${CONTACT_EMAIL}.`,
          isUser: false,
        },
        {
          id: Date.now() + 2,
          text: "",
          isUser: false,
          component: (
            <ContactForm
              source="chat \u00b7 message"
              subject="Chat message from nova2labs.com"
              cta="Send to the team"
              initialMessage={typed}
              onSubmit={(data) => {
                setMessages((prev) => [
                  ...prev,
                  {
                    id: Date.now() + 5,
                    text: `\u2713 Sent, ${data.name}! We'll reply to ${data.email} within 24 hours.`,
                    isUser: false,
                  },
                ]);
              }}
            />
          ),
        },
      ]);
    }, 700);
  };

  const handleQuickAction = (action: string) => {
    const userMessage: Message = {
      id: Date.now(),
      text:
        action === "services"
          ? "I'd like to see your services"
          : action === "quote"
            ? "I need a quote for my project"
            : action === "contact"
              ? "I want to get in touch"
              : "I'd like to schedule a call",
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      if (action === "services") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "Here is what we cover \u2014 tap one to see scope, deliverables and starting price:",
            isUser: false,
          },
          { id: Date.now() + 2, text: "", isUser: false, component: <ServiceLinks /> },
        ]);
      } else if (action === "contact") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "Please fill out this form and we'll get back to you within 24 hours:",
            isUser: false,
          },
          {
            id: Date.now() + 2,
            text: "",
            isUser: false,
            component: (
              <ContactForm
                source="chat · contact"
                subject="New enquiry from the nova2labs.com chat"
                cta="Send message"
                onSubmit={(data) => {
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: Date.now() + 5,
                      text: `✓ Sent, ${data.name}! Your message is in our inbox — we'll reply to ${data.email} within 24 hours.`,
                      isUser: false,
                    },
                  ]);
                }}
              />
            ),
          },
        ]);
      } else if (action === "quote") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "We'd love to provide a quote! Please share some details about your project:",
            isUser: false,
          },
          {
            id: Date.now() + 2,
            text: "",
            isUser: false,
            component: (
              <ContactForm
                source="chat · quote request"
                subject="Quote request from the nova2labs.com chat"
                cta="Request quote"
                onSubmit={(data) => {
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: Date.now() + 5,
                      text: `✓ Received! We'll review the details and send a fixed-price quote to ${data.email} within 24 hours.`,
                      isUser: false,
                    },
                  ]);
                }}
              />
            ),
          },
        ]);
      } else if (action === "call") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "Great! Please provide your contact details and preferred time, and we'll schedule a call:",
            isUser: false,
          },
          {
            id: Date.now() + 2,
            text: "",
            isUser: false,
            component: (
              <ContactForm
                source="chat · call booking"
                subject="Call request from the nova2labs.com chat"
                cta="Request a call"
                onSubmit={(data) => {
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: Date.now() + 5,
                      text: `✓ Got it! We'll email ${data.email} a couple of time slots for a 30-minute call.`,
                      isUser: false,
                    },
                  ]);
                }}
              />
            ),
          },
        ]);
      }
    }, 800);
  };

  const widgetWidth =
    typeof window !== "undefined" && window.innerWidth < 768 ? window.innerWidth - 32 : 320;
  const orbTargetX = -(widgetWidth - 16 - 20 - 32);
  const orbTargetY = -(562.5 - 16 - 20 - 32);
  const orbTargetScale = 40 / 64;

  const handleOrbClick = () => {
    if (!isOpen) {
      audioRef.current?.play();
      setIsOpen(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 md:right-6 md:bottom-6 max-md:right-4 max-md:bottom-4 z-50">
      <div
        className="absolute bottom-0 right-0 z-30 cursor-pointer"
        style={{
          transition: isOpen
            ? "transform 1s cubic-bezier(0.22, 1, 0.36, 1)"
            : "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          transform: isExpanded
            ? `translate3d(${orbTargetX}px, ${orbTargetY}px, 0) scale(${orbTargetScale})`
            : "translate3d(0, 0, 0) scale(1)",
          transformOrigin: "center center",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        onClick={handleOrbClick}
      >
        <AnimatedOrb size={64} />
      </div>

      <div
        className={cn(
          "bg-background border border-border overflow-hidden flex flex-col origin-bottom-right",
          isExpanded ? "rounded-3xl max-md:rounded-2xl" : "rounded-[100px]",
        )}
        style={{
          width: isExpanded ? widgetWidth : 64,
          height: isExpanded ? 562.5 : 64,
          boxShadow: "var(--shadow-elegant)",
          transition: isOpen
            ? "width 1s cubic-bezier(0.22, 1, 0.36, 1), height 1s cubic-bezier(0.22, 1, 0.36, 1), border-radius 1s cubic-bezier(0.22, 1, 0.36, 1)"
            : "width 0.8s cubic-bezier(0.22, 1, 0.36, 1), height 0.8s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "width, height",
          backfaceVisibility: "hidden",
        }}
      >
        <div
          className={cn("flex flex-col h-full", showContent ? "opacity-100" : "opacity-0")}
          style={{
            transition: "opacity 150ms ease-out",
            willChange: "opacity",
          }}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none h-24">
            <div
              className={cn(
                "absolute inset-0 overflow-hidden",
                isExpanded ? "rounded-3xl max-md:rounded-2xl" : "rounded-[100px]",
              )}
              style={{
                background:
                  "linear-gradient(to bottom, var(--color-background) 0%, var(--color-background) 55%, transparent 100%)",
                transition: isOpen
                  ? "border-radius 1s cubic-bezier(0.22, 1, 0.36, 1)"
                  : "border-radius 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />

            {/* Content */}
            <div className="relative p-4 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-surface">
                  <img src="/favicon.svg" alt="nova2labs" className="h-6 w-6 object-contain" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-foreground">nova2labs</h3>
                  <p className="text-xs text-muted-foreground">Replies within 24 hours</p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:bg-secondary"
              >
                <X className="h-4 w-4 text-foreground" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="scrollbar-none flex-1 space-y-3 overflow-y-auto bg-background p-4 pt-20">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    "flex",
                    message.component
                      ? "justify-stretch"
                      : message.isUser
                        ? "justify-end"
                        : "justify-start",
                  )}
                >
                  {message.component ? (
                    <div className="w-full">{message.component}</div>
                  ) : (
                    <div
                      className={cn(
                        "inline-block max-w-[80%] p-3 rounded-2xl text-sm break-words",
                        message.isUser
                          ? "rounded-br-sm bg-primary/12 text-foreground"
                          : "rounded-bl-sm border border-border bg-surface text-foreground",
                      )}
                    >
                      {message.text}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-border bg-surface p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Write a message..."
                className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email us instead"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-secondary"
              >
                <Mail className="h-4 w-4 text-foreground" />
              </a>
              <button
                type="button"
                aria-label="Send message"
                disabled={!inputValue.trim()}
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-primary transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleSend}
              >
                <ArrowRight className="h-4 w-4 text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceLinks() {
  return (
    <div className="w-full space-y-1.5">
      {SERVICES.map((s) => (
        <Link
          key={s.slug}
          to="/services/$slug"
          params={{ slug: s.slug }}
          className="group flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5 transition-colors hover:border-primary/50"
        >
          <ServiceIcon slug={s.slug} size={30} />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-semibold text-foreground">{s.title}</span>
            <span className="block truncate text-[11px] text-muted-foreground">{s.tagline}</span>
          </span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </Link>
      ))}
      <Link
        to="/services"
        className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-primary px-3 py-2.5 text-xs font-bold text-primary-foreground"
      >
        Compare all services <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
