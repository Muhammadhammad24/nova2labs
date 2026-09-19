import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, seo } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    seo({
      title: "Terms of Use — nova2labs",
      description:
        "The terms that apply to using the nova2labs website, how quotes and estimates work, and how IP ownership is handled on engagements.",
      path: "/terms",
    }),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="17 September 2026"
      intro="These terms cover using this website. The work itself is always governed by a separate written agreement signed by both sides before a project starts."
      sections={[
        {
          heading: "Using this site",
          paragraphs: [
            "You're welcome to browse, share and reference this site. You may not copy its design, code or written content for a competing offering, scrape it at a rate that degrades service for others, or attempt to gain unauthorised access to any part of it.",
          ],
        },
        {
          heading: "Information, not a promise",
          paragraphs: [
            "Service descriptions, timelines, technology lists and indicative prices on this site are provided for orientation. They are not an offer or a binding quote. Every engagement is scoped individually, and the figures shown as “from” prices are starting points for a typical scope, not a fixed price for yours.",
          ],
        },
        {
          heading: "Quotes, scope and payment",
          paragraphs: [
            "After a discovery call we provide a written proposal setting out deliverables, assumptions, timeline, payment schedule and the fixed price. A project begins when that proposal is accepted in writing. Changes to scope are agreed in writing and priced before the work is done — we don't invoice surprises.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "On our side: once a project is paid in full, you own the deliverables — source code, infrastructure definitions and documentation produced for you. We keep ownership of our pre-existing tools, libraries and general know-how, and grant you a perpetual licence to use them within the delivered work. Third-party open-source components remain under their own licences.",
            "On this site: the nova2labs name, logo, copy and design remain ours.",
          ],
        },
        {
          heading: "Confidentiality",
          paragraphs: [
            "Anything you share with us while discussing a project is treated as confidential, whether or not an NDA has been signed, and is used only to evaluate and deliver your project. We're happy to sign your NDA before you share details — just ask at " +
              CONTACT_EMAIL +
              ".",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "This website is provided “as is”, without warranties of any kind. We're not liable for losses arising from your use of the site or from decisions made on the basis of its content. Liability for project work is set out in the engagement agreement for that project and is capped there.",
          ],
        },
        {
          heading: "Third-party links",
          paragraphs: [
            "Where we link to external tools, platforms or documentation, those sites have their own terms and privacy practices, and we're not responsible for their content.",
          ],
        },
        {
          heading: "Governing terms and contact",
          paragraphs: [
            "The engagement agreement for a project governs that project, including the governing law and dispute resolution clauses agreed there. For anything about these terms, write to " +
              CONTACT_EMAIL +
              ".",
          ],
        },
      ]}
    />
  );
}
