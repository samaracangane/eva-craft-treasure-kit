import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight, Check, Clock, Gift, Heart, Instagram, Lightbulb, Menu, Shapes,
  ShoppingBag, Sparkles, Star, X, Scissors, Pencil, Flower2, MonitorSmartphone, AlertTriangle, MessageCircle,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { hexToVar, safeLink, type SiteContent } from "@/lib/content";
import type { MediaRow, TestimonialRow } from "@/lib/site.functions";
import heroFallback from "@/assets/hero.jpg";

type Props = { c: SiteContent; media: MediaRow[]; testimonials: TestimonialRow[]; isPreview?: boolean };

const NAV = [
  { id: "inicio", label: "Início" },
  { id: "beneficios", label: "Benefícios" },
  { id: "planos", label: "Planos" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "quem-sou-eu", label: "Quem Sou Eu" },
];

const ACCENTS = ["bg-pink", "bg-turquoise", "bg-yellow", "bg-purple", "bg-coral", "bg-mint"] as const;
const BENEFIT_ICONS = [Lightbulb, Sparkles, Shapes, Gift, Clock, Heart];

function CtaLink({ children, size = "lg", className = "" }: { children: ReactNode; size?: "lg" | "md"; className?: string }) {
  return (
    <a
      href="#planos"
      className={`group inline-flex items-center justify-center gap-3 rounded-full bg-cta text-center font-display font-extrabold uppercase text-primary-foreground shadow-cta transition-transform duration-200 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 ${
        size === "lg" ? "min-h-16 px-7 py-4 text-lg sm:px-10 sm:text-2xl animate-pulse-soft" : "min-h-12 px-6 py-3 text-base"
      } ${className}`}
    >
      <ShoppingBag className="size-6 shrink-0" aria-hidden />
      <span>{children}</span>
      <ArrowRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
    </a>
  );
}

function CheckoutButton({ url, label, variant }: { url: string; label: string; variant: "basic" | "premium" }) {
  const href = safeLink(url);
  const base =
    "inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-center font-display text-lg font-extrabold uppercase transition-transform duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40";
  const style = variant === "premium" ? "bg-cta text-primary-foreground shadow-cta" : "bg-purple text-primary-foreground shadow-soft";
  if (!href) {
    return (
      <div className="space-y-2">
        <button type="button" disabled aria-disabled className={`${base} ${style} cursor-not-allowed opacity-60`}>
          {label}
        </button>
        <p role="note" className="flex items-center justify-center gap-1.5 text-xs font-semibold text-destructive">
          <AlertTriangle className="size-3.5" /> Link de checkout ainda não configurado no painel.
        </p>
      </div>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${style} hover:scale-[1.03]`}>
      {label} <ArrowRight className="size-5" aria-hidden />
    </a>
  );
}

function Deco({ className, children, rot = "0deg" }: { className: string; children: ReactNode; rot?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute animate-floaty ${className}`} style={{ "--r": rot } as CSSProperties}>
      {children}
    </span>
  );
}

function SectionTitle({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <h2 className="section-title text-3xl text-purple sm:text-5xl">{children}</h2>
      {sub && <p className="mt-4 text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function SalesPage({ c, media, testimonials, isPreview }: Props) {
  const [lightbox, setLightbox] = useState<{ url: string; caption: string } | null>(null);
  const carousel = media.filter((m) => m.section === "carousel");
  const gallery = media.filter((m) => m.section === "gallery");
  const heroImg = c.hero.imageUrl || heroFallback;

  const colorVars = Object.fromEntries(
    Object.entries(c.colors)
      .map(([k, v]) => [`--${k}`, hexToVar(v)])
      .filter(([, v]) => v),
  ) as CSSProperties;

  return (
    <div style={colorVars} className="min-h-screen overflow-x-clip bg-background pb-20 md:pb-0">
      {isPreview && (
        <div className="sticky top-0 z-[60] bg-yellow px-4 py-2 text-center text-sm font-bold text-ink">
          Modo prévia — você está vendo o rascunho não publicado. <a href="/admin" className="underline">Voltar ao painel</a>
        </div>
      )}
      <Header c={c} />

      {/* HERO */}
      <section id="inicio" className="relative bg-hero">
        <Deco className="left-[4%] top-10 text-yellow" rot="-12deg"><Star className="size-8 fill-current" /></Deco>
        <Deco className="right-[6%] top-24 text-turquoise" rot="14deg"><Flower2 className="size-9" /></Deco>
        <Deco className="bottom-16 left-[8%] hidden text-pink sm:block"><Heart className="size-8 fill-current" /></Deco>
        <Deco className="bottom-10 right-[45%] hidden text-coral lg:block" rot="20deg"><Scissors className="size-8" /></Deco>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-16">
          <div className="text-center lg:text-left">
            <h1 className="font-display font-extrabold uppercase leading-[0.9]">
              <span className="block animate-rise text-2xl text-purple sm:text-4xl">{c.hero.top}</span>
              <span className="text-candy block animate-rise text-[clamp(3.1rem,14vw,7.5rem)] text-pink [animation-delay:100ms]">
                {c.hero.big.split(" ").map((w, i) => (
                  <span key={i} className={`inline-block ${i === 1 ? "text-turquoise" : ""}`}>{w}{" "}</span>
                ))}
              </span>
              <span className="text-candy block animate-rise text-[clamp(2.2rem,9vw,4.5rem)] text-coral [animation-delay:200ms]">{c.hero.suffix}</span>
              <span className="mt-4 block animate-rise text-[clamp(1.35rem,5.5vw,2.6rem)] leading-tight [animation-delay:300ms]">
                <span className="text-purple">{c.hero.sub1}</span>{" "}
                <span className="text-candy text-yellow">{c.hero.sub2}</span>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl animate-rise text-lg text-foreground/80 [animation-delay:400ms] lg:mx-0">{c.hero.text}</p>
            <p className="mx-auto mt-4 inline-block -rotate-1 animate-rise rounded-2xl bg-mint px-4 py-2 font-display text-lg font-bold text-ink [animation-delay:450ms]">
              {c.hero.highlight}
            </p>
            <div className="mt-8 animate-rise [animation-delay:500ms]">
              <CtaLink className="w-full sm:w-auto">{c.hero.cta}</CtaLink>
              <p className="mt-3 text-sm text-muted-foreground">{c.hero.ctaNote}</p>
              {c.hero.showDigital && (
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-purple">
                  <MonitorSmartphone className="size-4" /> Produto digital
                </p>
              )}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl animate-rise [animation-delay:250ms]">
            <div className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-yellow/60" aria-hidden />
            <img
              src={heroImg}
              alt="Coleção colorida de moldes e trabalhos em E.V.A.: flores, animais, letras e lembrancinhas"
              width={1200}
              height={1008}
              fetchPriority="high"
              className="relative aspect-[6/5] w-full rounded-[2rem] border-8 border-card object-cover shadow-soft"
            />
            {c.hero.badges.filter(Boolean).map((b, i) => (
              <span
                key={i}
                className={`absolute rounded-full px-4 py-2 font-display text-sm font-extrabold uppercase shadow-soft sm:text-base ${
                  ["-left-2 top-6 -rotate-6 bg-pink text-primary-foreground", "-right-2 top-1/2 rotate-6 bg-turquoise text-primary-foreground", "-bottom-4 left-1/4 -rotate-3 bg-yellow text-ink"][i % 3]
                }`}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CAROUSEL */}
      {carousel.length > 0 && (
        <InfiniteCarousel title={c.carousel.title} items={carousel} speed={c.carousel.speed} height={c.carousel.height} onOpen={setLightbox} />
      )}

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle sub={c.categories.phrase}>{c.categories.title}</SectionTitle>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {c.categories.items.map((cat, i) => (
            <article key={i} className="overflow-hidden rounded-3xl bg-card shadow-soft transition-transform hover:-translate-y-1">
              {cat.imageUrl ? (
                <img src={cat.imageUrl} alt={cat.title} loading="lazy" className="aspect-square w-full object-cover" />
              ) : (
                <div className={`flex aspect-[4/3] items-center justify-center ${ACCENTS[i % ACCENTS.length]}`}>
                  <span className="font-display text-5xl font-extrabold text-card/90">{cat.title.charAt(0)}</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-extrabold leading-tight text-ink sm:text-xl">{cat.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cat.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section id="beneficios" className="bg-lilac/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle>{c.benefits.title}</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.benefits.items.map((b, i) => {
              const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length]!;
              return (
                <div key={i} className="rounded-3xl bg-card p-6 shadow-soft">
                  <span className={`mb-4 inline-flex size-14 items-center justify-center rounded-2xl ${ACCENTS[i % ACCENTS.length]} text-primary-foreground`}>
                    <Icon className="size-7" aria-hidden />
                  </span>
                  <h3 className="text-2xl font-extrabold text-ink">{b.title}</h3>
                  <p className="mt-2 text-muted-foreground">{b.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <CtaLink size="md">{c.final.midCta}</CtaLink>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionTitle sub={c.gallery.note}>{c.gallery.title}</SectionTitle>
          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
            {gallery.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setLightbox({ url: g.url, caption: g.caption })}
                className="relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-card shadow-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
              >
                <img src={g.url} alt={g.caption || "Prévia de molde da coleção"} loading="lazy" className="w-full" />
                {c.gallery.watermark && (
                  <span aria-hidden className="absolute inset-0 flex items-center justify-center font-display text-3xl font-extrabold uppercase text-card/60 [transform:rotate(-25deg)]">
                    {c.gallery.watermarkText}
                  </span>
                )}
                {g.caption && <span className="block px-3 py-2 text-left text-sm font-semibold">{g.caption}</span>}
              </button>
            ))}
          </div>
        </section>
      )}

      <Plans c={c} />
      <Testimonials c={c} items={testimonials} onOpen={setLightbox} />
      <About c={c} />

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <SectionTitle>{c.faq.title}</SectionTitle>
        <Accordion type="single" collapsible className="space-y-3">
          {c.faq.items.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`} className="rounded-2xl border-0 bg-card px-5 shadow-soft">
              <AccordionTrigger className="text-left font-display text-lg font-bold text-ink">{f.q}</AccordionTrigger>
              <AccordionContent className="whitespace-pre-line text-base text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FINAL */}
      <section className="relative overflow-hidden bg-final px-4 py-20 text-center text-primary-foreground sm:px-6">
        <Deco className="left-[6%] top-8 text-yellow"><Star className="size-10 fill-current" /></Deco>
        <Deco className="bottom-8 right-[8%] text-mint" rot="12deg"><Pencil className="size-10" /></Deco>
        <h2 className="section-title mx-auto max-w-4xl text-4xl sm:text-6xl">{c.final.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg opacity-95">{c.final.subtitle}</p>
        <p className="mx-auto mt-3 max-w-2xl font-display text-xl font-bold text-yellow">{c.final.reinforce}</p>
        <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
          {[
            { p: c.plans.basic, v: "basic" as const, label: `QUERO O BÁSICO POR ${c.plans.basic.price}` },
            { p: c.plans.premium, v: "premium" as const, label: c.plans.premium.cta },
          ].map(({ p, v, label }) => (
            <div key={v} className="rounded-3xl bg-card p-6 text-card-foreground shadow-soft">
              <p className="font-display text-xl font-extrabold text-purple">{p.name}</p>
              <p className="my-2 font-display text-5xl font-extrabold text-pink">{p.price}</p>
              <CheckoutButton url={p.checkoutUrl} label={label} variant={v} />
            </div>
          ))}
        </div>
      </section>

      <Footer c={c} />

      {c.stickyCta && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 p-3 backdrop-blur md:hidden">
          <a href="#planos" className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-cta font-display font-extrabold uppercase text-primary-foreground">
            Ver planos a partir de {c.plans.basic.price} <ArrowRight className="size-5" />
          </a>
        </div>
      )}

      <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-4xl border-0 bg-card p-2">
          <DialogTitle className="sr-only">{lightbox?.caption || "Imagem ampliada"}</DialogTitle>
          {lightbox && (
            <figure>
              <img src={lightbox.url} alt={lightbox.caption || "Imagem ampliada"} className="max-h-[80vh] w-full rounded-xl object-contain" />
              {lightbox.caption && <figcaption className="p-3 text-center font-semibold">{lightbox.caption}</figcaption>}
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Header({ c }: { c: SiteContent }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#inicio" className="flex min-w-0 items-center gap-2">
          {c.brand.logoUrl ? (
            <img src={c.brand.logoUrl} alt={c.brand.name} className="h-10 w-auto" />
          ) : (
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-pink text-primary-foreground"><Scissors className="size-5" /></span>
          )}
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-lg font-extrabold text-purple">{c.brand.name}</span>
            <span className="block truncate text-xs font-semibold text-muted-foreground">{c.brand.product}</span>
          </span>
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="font-semibold text-ink/80 hover:text-pink">{n.label}</a>
          ))}
        </nav>
        <a href="#planos" className="hidden rounded-full bg-cta px-5 py-2.5 font-display font-extrabold uppercase text-primary-foreground shadow-cta transition-transform hover:scale-105 sm:inline-flex">
          Quero meus moldes
        </a>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-xl bg-muted lg:hidden" aria-label="Abrir menu">
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="font-display text-purple">Menu</SheetTitle>
            <nav aria-label="Menu móvel" className="mt-6 flex flex-col gap-2">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-lg font-semibold hover:bg-muted">{n.label}</a>
              ))}
              <a href="#planos" onClick={() => setOpen(false)} className="mt-4 rounded-full bg-cta px-5 py-3 text-center font-display font-extrabold uppercase text-primary-foreground">
                Quero meus moldes
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function InfiniteCarousel({ title, items, speed, height, onOpen }: {
  title: string; items: MediaRow[]; speed: number; height: number; onOpen: (v: { url: string; caption: string }) => void;
}) {
  const [h, setH] = useState(height);
  useEffect(() => {
    const update = () => setH(window.innerWidth < 640 ? Math.round(height * 0.7) : height);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [height]);
  // Repeat enough to always fill the screen, then duplicate for a seamless -50% loop.
  const reps = Math.max(1, Math.ceil(8 / items.length));
  const base = Array.from({ length: reps }, () => items).flat();
  const loop = [...base, ...base];
  return (
    <section className="py-16" aria-label={title}>
      <div className="mx-auto mb-8 flex max-w-7xl flex-col items-center gap-4 px-4 text-center">
        <h2 className="section-title text-3xl text-pink sm:text-5xl">{title}</h2>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <ul
          className="marquee-track flex w-max gap-4"
          style={{ "--marquee-duration": `${Math.max(5, speed) * reps}s` } as CSSProperties}
        >
          {loop.map((m, i) => (
            <li key={`${m.id}-${i}`} aria-hidden={i >= base.length || undefined}>
              <button
                type="button"
                tabIndex={i >= base.length ? -1 : 0}
                onClick={() => onOpen({ url: m.url, caption: m.caption })}
                className="block overflow-hidden rounded-3xl border-4 border-card shadow-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
                style={{ height: h }}
              >
                <img src={m.url} alt={m.caption || "Trabalho em E.V.A."} loading="lazy" decoding="async" className="h-full w-auto object-cover transition-transform duration-300 hover:scale-105" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Plans({ c }: { c: SiteContent }) {
  const { basic, premium } = c.plans;
  return (
    <section id="planos" className="relative bg-hero py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle sub={c.plans.subtitle}>{c.plans.title}</SectionTitle>
        <div className="grid items-stretch gap-8 md:grid-cols-2">
          {[basic, premium].map((p, i) => {
            const isPremium = i === 1;
            return (
              <article
                key={i}
                className={`relative flex flex-col rounded-[2rem] bg-card p-7 shadow-soft sm:p-9 ${isPremium ? "border-4 border-pink md:-translate-y-3" : "border-2 border-border"}`}
              >
                {isPremium && premium.showBadge && premium.badge && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-yellow px-5 py-1.5 font-display text-sm font-extrabold text-ink shadow-soft">
                    ★ {premium.badge}
                  </span>
                )}
                <h3 className={`text-2xl font-extrabold ${isPremium ? "text-pink" : "text-purple"}`}>{p.name}</h3>
                <p className="mt-3 font-display text-6xl font-extrabold text-ink">{p.price}</p>
                {c.plans.showPaymentNote && c.plans.paymentNote && <p className="text-sm font-semibold text-muted-foreground">{c.plans.paymentNote}</p>}
                <p className="mt-4 text-muted-foreground">{p.description}</p>
                <ul className="my-6 flex-1 space-y-3">
                  {p.features.filter(Boolean).map((f, k) => (
                    <li key={k} className="flex gap-3">
                      <span className={`mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full ${isPremium ? "bg-pink" : "bg-turquoise"} text-primary-foreground`}>
                        <Check className="size-4" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <CheckoutButton url={p.checkoutUrl} label={p.cta} variant={isPremium ? "premium" : "basic"} />
              </article>
            );
          })}
        </div>

        {c.plans.comparison.length > 0 && (
          <div className="mt-14 overflow-x-auto rounded-3xl bg-card shadow-soft">
            <table className="w-full min-w-[480px] text-left">
              <caption className="p-5 text-left font-display text-xl font-extrabold text-purple">Comparação entre os planos</caption>
              <thead>
                <tr className="border-b">
                  <th scope="col" className="p-4">O que está incluído</th>
                  <th scope="col" className="p-4 text-center">Básico</th>
                  <th scope="col" className="bg-pink/10 p-4 text-center text-pink">Premium</th>
                </tr>
              </thead>
              <tbody>
                {c.plans.comparison.map((r, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <th scope="row" className="p-4 font-semibold">{r.label}</th>
                    <td className="p-4 text-center">{r.basic}</td>
                    <td className="bg-pink/5 p-4 text-center font-bold text-pink">{r.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function Testimonials({ c, items, onOpen }: { c: SiteContent; items: TestimonialRow[]; onOpen: (v: { url: string; caption: string }) => void }) {
  return (
    <section id="depoimentos" className="bg-mint/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle>{c.testimonials.title}</SectionTitle>
        {items.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-3xl border-2 border-dashed border-purple/40 bg-card p-8 text-center">
            <MessageCircle className="mx-auto size-10 text-purple" />
            <p className="mt-3 font-semibold">{c.testimonials.emptyNotice}</p>
          </div>
        ) : (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {items.map((t) => (
              <figure key={t.id} className="mb-5 break-inside-avoid rounded-3xl bg-card p-6 shadow-soft">
                {t.rating ? (
                  <div className="mb-3 flex gap-0.5 text-yellow" aria-label={`${t.rating} de 5 estrelas`}>
                    {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="size-5 fill-current" />)}
                  </div>
                ) : null}
                {t.body && <blockquote className="whitespace-pre-line text-foreground/90">“{t.body}”</blockquote>}
                {t.photo_url && !t.body && (
                  <button type="button" onClick={() => onOpen({ url: t.photo_url!, caption: t.name })} className="block w-full">
                    <img src={t.photo_url} alt={`Avaliação de ${t.name || "cliente"}`} loading="lazy" className="w-full rounded-2xl" />
                  </button>
                )}
                <figcaption className="mt-4 flex items-center gap-3">
                  {t.photo_url && t.body && <img src={t.photo_url} alt="" loading="lazy" className="size-12 rounded-full object-cover" />}
                  <span>
                    <span className="block font-display font-extrabold text-purple">{t.name}</span>
                    {t.date_label && <span className="text-sm text-muted-foreground">{t.date_label}</span>}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function About({ c }: { c: SiteContent }) {
  const a = c.about;
  const ig = safeLink(c.links.instagram);
  const other = safeLink(c.links.other);
  return (
    <section id="quem-sou-eu" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="relative mx-auto w-full max-w-xs">
          <div className={`absolute -inset-3 -rotate-3 bg-turquoise/50 ${a.photoShape === "circle" ? "rounded-full" : "rounded-[2.5rem]"}`} aria-hidden />
          {a.photoUrl ? (
            <div className={`relative aspect-[3/4] overflow-hidden border-8 border-card shadow-soft ${a.photoShape === "circle" ? "rounded-full" : "rounded-[2rem]"}`}>
              <img
                src={a.photoUrl}
                alt={`Foto de ${a.name}`}
                loading="lazy"
                className="size-full object-cover"
                style={{ objectPosition: `50% ${a.photoPosY}%`, transform: `scale(${a.photoZoom})` }}
              />
            </div>
          ) : (
            <div className={`relative flex aspect-square items-center justify-center border-8 border-card bg-lilac shadow-soft ${a.photoShape === "circle" ? "rounded-full" : "rounded-[2rem]"}`}>
              <span className="px-6 text-center font-semibold text-purple">Sua foto aparecerá aqui (envie pelo painel)</span>
            </div>
          )}
        </div>
        <div>
          <h2 className="section-title text-3xl text-purple sm:text-5xl">{a.title}</h2>
          <p className="mt-6 whitespace-pre-line text-lg text-foreground/85">{a.text}</p>
          {a.experience && <p className="mt-4 whitespace-pre-line"><strong className="text-pink">Experiência: </strong>{a.experience}</p>}
          {a.motivation && <p className="mt-2 whitespace-pre-line"><strong className="text-pink">Por que criei este kit: </strong>{a.motivation}</p>}
          {a.contact && <p className="mt-2"><strong className="text-pink">Contato: </strong>{a.contact}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            {ig && (
              <a href={ig} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-pink px-5 py-2.5 font-bold text-primary-foreground">
                <Instagram className="size-5" /> Instagram
              </a>
            )}
            {other && (
              <a href={other} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-turquoise px-5 py-2.5 font-bold text-primary-foreground">
                {c.links.otherLabel || "Outra rede"}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ c }: { c: SiteContent }) {
  const f = c.footer;
  const support = safeLink(c.links.support);
  const links = [
    { label: "Política de privacidade", url: safeLink(f.privacyUrl) },
    { label: "Termos de uso", url: safeLink(f.termsUrl) },
  ].filter((l) => l.url);
  return (
    <footer className="bg-ink px-4 py-12 text-primary-foreground/85 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-extrabold text-primary-foreground">{c.brand.name}</p>
          <p className="mt-1 text-sm">{c.brand.product}</p>
          {f.contact && <p className="mt-4 text-sm">Contato: {f.contact}</p>}
          {support && <a href={support} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-bold text-yellow underline">Fale com o atendimento</a>}
        </div>
        <div className="space-y-3 text-sm">
          {f.deliveryInfo && <p><strong className="text-primary-foreground">Compra e entrega: </strong>{f.deliveryInfo}</p>}
          {f.refundInfo && <p><strong className="text-primary-foreground">Reembolso: </strong>{f.refundInfo}</p>}
          {f.copyrightInfo && <p><strong className="text-primary-foreground">Uso dos moldes: </strong>{f.copyrightInfo}</p>}
        </div>
        <nav aria-label="Rodapé" className="flex flex-col gap-2 text-sm">
          {links.map((l) => (
            <a key={l.label} href={l.url!} target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow">{l.label}</a>
          ))}
          <p className="text-xs opacity-80">Pagamentos processados pela Wiapy.</p>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-primary-foreground/15 pt-6 text-center text-xs">
        © {new Date().getFullYear()} {c.brand.name}. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export { X };
