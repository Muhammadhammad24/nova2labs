import { createFileRoute, notFound } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { getService, SERVICES } from "@/lib/services-data";

export const Route = createFileRoute("/services_/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) {
      return { meta: [{ title: "Service — nova2labs" }] };
    }
    const title = `${s.title} — nova2labs`;
    return {
      meta: [
        { title },
        { name: "description", content: s.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: s.tagline },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl font-semibold">Service not found</h1>
      <p className="mt-3 text-muted-foreground">
        Try one of: {SERVICES.map((s) => s.title).join(", ")}.
      </p>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="mt-6 rounded-md border border-border px-4 py-2 text-sm">
        Try again
      </button>
    </div>
  ),
  component: ServiceSlug,
});

function ServiceSlug() {
  const { service } = Route.useLoaderData();
  return <ServiceDetailPage service={service} />;
}
