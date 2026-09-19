"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { AlertCircle, Send } from "lucide-react";
import { buildMailto, submitLead } from "@/lib/lead";

type Props = {
  /** Called only after the provider has actually accepted the lead. */
  onSubmit: (data: { name: string; email: string; message: string }) => void;
  /** Labels the enquiry in the inbox, e.g. "chat · quote request". */
  source: string;
  subject?: string;
  cta?: string;
  /** Pre-fills the message box, e.g. with what the visitor already typed. */
  initialMessage?: string;
};

export function ContactForm({
  onSubmit,
  source,
  subject,
  cta = "Send enquiry",
  initialMessage = "",
}: Props) {
  const [formData, setFormData] = useState({ name: "", email: "", message: initialMessage });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [fallbackHref, setFallbackHref] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending || done) return;

    setSending(true);
    setError("");

    const result = await submitLead({ ...formData, botcheck: "" }, { source, subject });

    setSending(false);

    if (result.ok) {
      setDone(true);
      onSubmit(formData);
      setFormData({ name: "", email: "", message: "" });
    } else {
      setError(result.error);
      setFallbackHref(buildMailto({ ...formData }, { subject }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-hidden rounded-2xl border border-border bg-background shadow-elegant"
    >
      <form onSubmit={handleSubmit} className="space-y-3 p-4">
        <Field
          label="Your name"
          type="text"
          value={formData.name}
          placeholder="Jane Smith"
          disabled={sending || done}
          onChange={(v) => setFormData({ ...formData, name: v })}
        />
        <Field
          label="Work email"
          type="email"
          value={formData.email}
          placeholder="jane@company.com"
          disabled={sending || done}
          onChange={(v) => setFormData({ ...formData, email: v })}
        />

        <div>
          <label className="mb-1 block text-xs font-medium text-foreground">Project details</label>
          <textarea
            required
            rows={3}
            value={formData.message}
            disabled={sending || done}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="What are you building, and what's your timeline?"
            className="w-full resize-none rounded-lg border border-input bg-surface px-3 py-2 text-xs outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
          />
        </div>

        {/* Honeypot — bots fill hidden fields, humans never see this. */}
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          tabIndex={-1}
          aria-hidden
          autoComplete="off"
        />

        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2">
            <p className="flex items-start gap-2 text-[11px] leading-relaxed text-destructive">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {error}
            </p>
            {fallbackHref && (
              <a
                href={fallbackHref}
                className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary underline-offset-4 hover:underline"
              >
                Send by email instead
              </a>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={sending || done}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Sending…
            </>
          ) : done ? (
            "Sent ✓"
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              {cta}
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

function Field({
  label,
  type,
  value,
  placeholder,
  disabled,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  disabled?: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-foreground">{label}</label>
      <input
        type={type}
        required
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-surface px-3 py-2 text-xs outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
      />
    </div>
  );
}
