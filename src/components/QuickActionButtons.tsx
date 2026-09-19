"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface QuickAction {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export function QuickActionButtons({ actions }: { actions: QuickAction[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full grid grid-cols-2 gap-2"
    >
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={action.onClick}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-left transition-all hover:border-blue-300 hover:bg-blue-50"
          style={{
            boxShadow:
              "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px",
          }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 flex-shrink-0">
            <action.icon className="h-4 w-4 text-blue-600" />
          </div>
          <span className="text-xs font-medium text-slate-900">{action.label}</span>
        </button>
      ))}
    </motion.div>
  );
}
