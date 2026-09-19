import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, seo } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo({
      title: "Privacy Policy — nova2labs",
      description:
        "What data nova2labs collects when you contact us, why we collect it, how long we keep it and how to have it deleted.",
      path: "/privacy",
    }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="17 September 2026"
      intro="We keep this short and specific. nova2labs collects the minimum needed to answer your enquiry and deliver work you've asked for — nothing is sold, rented or shared for advertising."
      sections={[
        {
          heading: "Who we are",
          paragraphs: [
            "nova2labs is an independent engineering studio operating remotely and serving clients worldwide. For any privacy question, or to exercise the rights described below, write to " +
              CONTACT_EMAIL +
              ".",
          ],
        },
        {
          heading: "What we collect",
          paragraphs: [
            "We only collect what you choose to send us. We do not use advertising trackers, we do not build behavioural profiles, and we do not buy contact data.",
          ],
          bullets: [
            "Enquiry details you submit through a form or the chat widget: name, email address, company (optional), the service you're interested in, budget range and your project description.",
            "Anything you send us by email or during a call about your project.",
            "Basic technical data your browser sends to our hosting provider on every request (IP address, user agent, requested page), kept in short-lived server logs for security and debugging.",
          ],
        },
        {
          heading: "Why we use it",
          paragraphs: [
            "Your enquiry data is used to reply to you, prepare an estimate or proposal, and deliver the work if you engage us. The lawful basis is your consent when you submit the form, and our legitimate interest in responding to business enquiries and keeping the site secure.",
            "We never use your project details to train machine-learning models, and we do not publish client work or names without written permission.",
          ],
        },
        {
          heading: "Who processes your data",
          paragraphs: [
            "We use a small number of service providers to run the site and receive enquiries. Each only receives what it needs to perform its function:",
          ],
          bullets: [
            "Web3Forms — relays form submissions to our email inbox.",
            "Our email provider — receives and stores the enquiry email we act on.",
            "Our hosting and CDN provider — serves the website and keeps short-lived request logs.",
            "Google Fonts — serves the site's typefaces; your browser requests them directly.",
          ],
        },
        {
          heading: "Cookies and storage",
          paragraphs: [
            "We set no advertising or analytics cookies. The site stores a single value in your browser's local storage to remember whether you chose light or dark mode. It stays on your device, is never sent to us, and clearing your site data removes it.",
          ],
        },
        {
          heading: "How long we keep it",
          paragraphs: [
            "Enquiries that don't lead to a project are deleted within 24 months. Project correspondence and contracts are kept for as long as needed to deliver the work and meet record-keeping obligations, then deleted. Server logs are rotated within weeks.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Wherever you live, you can ask us to show you the data we hold about you, correct it, delete it, or stop using it. Email " +
              CONTACT_EMAIL +
              " and we'll action it within 30 days. If you're in the UK, EU or a similar jurisdiction, you also have the right to complain to your local data protection authority.",
          ],
        },
        {
          heading: "Security and changes",
          paragraphs: [
            "The site is served over HTTPS and enquiry data is transmitted encrypted. Access to the enquiry inbox is limited to the people who need it and protected by two-factor authentication. No system is perfect, so we never ask for passwords, card numbers or other secrets through a form on this site — and you shouldn't send them.",
            "If this policy changes materially we'll update the date at the top of this page.",
          ],
        },
      ]}
    />
  );
}
