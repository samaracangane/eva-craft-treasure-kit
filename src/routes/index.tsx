import { createFileRoute } from "@tanstack/react-router";
import { SalesPage } from "@/components/landing/SalesPage";
import { DEFAULT_CONTENT, mergeContent } from "@/lib/content";
import { getPublicSite } from "@/lib/site.functions";

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>) => ({ preview: s["preview"] === "1" || s["preview"] === 1 ? 1 : undefined }),
  loaderDeps: ({ search }) => ({ preview: !!search.preview }),
  loader: ({ deps }) => getPublicSite({ data: { preview: deps.preview } }),
  head: () => ({
    meta: [
      { title: "Kit +15.000 Moldes de E.V.A. — Samara Criar Art's | Planos a partir de R$ 9,90" },
      { name: "description", content: "Mais de 15.000 moldes de E.V.A. para artesãs, professoras e decoradoras. Escolha o Plano Básico ou Premium." },
      { property: "og:title", content: "Kit com Mais de 15.000 Moldes de E.V.A. — Samara Criar Art's" },
      { property: "og:description", content: "Transforme suas ideias em criações incríveis. Planos Básico e Premium." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const d = Route.useLoaderData();
  const { preview } = Route.useSearch();
  const contentJson = d?.contentJson || "{}";
  const mergedContent = mergeContent(DEFAULT_CONTENT, JSON.parse(contentJson));
  // Atualiza a contagem também nos textos salvos no banco de dados do site.
  const c = JSON.parse(JSON.stringify(mergedContent).replaceAll("5.000", "15.000").replaceAll("5 mil", "15 mil"));
  return (
    <SalesPage
      c={c}
      media={d?.media ?? []}
      testimonials={d?.testimonials ?? []}
      isPreview={!!preview}
    />
  );
}
