import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type FormEvent } from "react";
import bottleAsset from "@/assets/skin-revive-bottle.jpg.asset.json";
import loreeLogo from "@/assets/loree-logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: Landing,
});

const PAYMENT_LINK = "https://mpago.li/29B6i3m";
// TODO: replace with real webhook URL for capturing leads
const WEBHOOK_URL = "#webhook-url";

function openOrderModal() {
  window.dispatchEvent(new CustomEvent("open-order-modal"));
}

function CtaButton({
  children,
  className = "btn-gold mt-12",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button type="button" onClick={openOrderModal} className={className} style={style}>
      {children}
    </button>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add("is-visible"), delay);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`fade-in ${className}`}>
      {children}
    </div>
  );
}

function Particles({ count = 24 }: { count?: number }) {
  const particles = Array.from({ length: count });
  return (
    <div className="bokeh">
      {particles.map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i % 6) * 0.8}s`,
            animationDuration: `${5 + (i % 4)}s`,
          }}
        />
      ))}
    </div>
  );
}

function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const heights = { sm: 48, md: 96, lg: 128 }[size];
  const subSize = { sm: "text-[9px]", md: "text-[11px]", lg: "text-xs" }[size];
  return (
    <div className="flex flex-col items-center">
      <img
        src={loreeLogo.url}
        alt="L'Orée"
        width={530}
        height={181}
        style={{ height: heights, width: "auto" }}
        draggable={false}
      />
      <div className="mt-3 h-px" style={{ width: "60px", backgroundColor: "#D4AF6A", opacity: 0.6 }} />
      <span
        className={`mt-3 ${subSize} font-body font-light uppercase`}
        style={{ color: "#D4AF6A", letterSpacing: "0.35em" }}
      >
        Science &amp; Beaut&eacute;
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-auto my-0 max-w-5xl px-6">
      <div className="gold-divider" />
    </div>
  );
}

/* ---------------- Icons ---------------- */
const iconProps = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const MoleculeIcon = () => (
  <svg viewBox="0 0 48 48" className="h-10 w-10 text-gold" {...iconProps}>
    <circle cx="24" cy="24" r="4" /><circle cx="10" cy="12" r="3" /><circle cx="38" cy="12" r="3" /><circle cx="10" cy="36" r="3" /><circle cx="38" cy="36" r="3" />
    <path d="M13 14 L21 22 M35 14 L27 22 M13 34 L21 26 M35 34 L27 26" />
  </svg>
);
const DropletIcon = () => (
  <svg viewBox="0 0 48 48" className="h-10 w-10 text-gold" {...iconProps}>
    <path d="M24 6 C 14 20, 12 28, 12 32 a 12 12 0 0 0 24 0 c 0-4 -2-12 -12-26 Z" />
    <path d="M18 32 a 6 6 0 0 0 6 6" />
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 48 48" className="h-10 w-10 text-gold" {...iconProps}>
    <path d="M24 4 L40 10 V24 C 40 34, 32 41, 24 44 C 16 41, 8 34, 8 24 V10 Z" />
    <path d="M18 24 L22 28 L30 18" />
  </svg>
);
const LeafBenefitIcon = () => (
  <svg viewBox="0 0 48 48" className="h-10 w-10 text-gold" {...iconProps}>
    <path d="M8 40 C 14 22, 26 10, 40 8 C 38 22, 28 36, 8 40 Z" />
    <path d="M14 36 L34 14" />
  </svg>
);
const WheatIcon = () => (
  <svg viewBox="0 0 48 48" className="h-10 w-10 text-gold" {...iconProps}>
    <path d="M24 4 V44" />
    <path d="M24 12 C 18 14, 16 18, 18 22 C 22 22, 24 18, 24 14 M24 12 C 30 14, 32 18, 30 22 C 26 22, 24 18, 24 14" />
    <path d="M24 22 C 18 24, 16 28, 18 32 C 22 32, 24 28, 24 24 M24 22 C 30 24, 32 28, 30 32 C 26 32, 24 28, 24 24" />
    <path d="M24 32 C 18 34, 16 38, 18 42 C 22 42, 24 38, 24 34 M24 32 C 30 34, 32 38, 30 42 C 26 42, 24 38, 24 34" />
  </svg>
);

const SparkIcon = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold" {...iconProps}>
    <path d="M12 2 L13.5 9 L21 12 L13.5 15 L12 22 L10.5 15 L3 12 L10.5 9 Z" />
  </svg>
);
const WaveIcon = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold" {...iconProps}>
    <path d="M2 12 C 5 8, 7 16, 12 12 S 19 8, 22 12" /><path d="M2 17 C 5 13, 7 21, 12 17 S 19 13, 22 17" />
  </svg>
);
const FlexIcon = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold" {...iconProps}>
    <path d="M4 18 C 4 10, 12 4, 20 8" /><circle cx="20" cy="8" r="1.5" /><circle cx="4" cy="18" r="1.5" />
  </svg>
);
const AtomIcon = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold" {...iconProps}>
    <ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /><circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);
const SunIcon = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold" {...iconProps}>
    <circle cx="12" cy="12" r="4" /><path d="M12 2 V5 M12 19 V22 M2 12 H5 M19 12 H22 M5 5 L7 7 M17 17 L19 19 M5 19 L7 17 M17 7 L19 5" />
  </svg>
);

/* ---------------- Page ---------------- */
function Landing() {
  return (
    <main className="min-h-screen bg-sapphire-deep text-pearl">
      <Hero />
      <Divider />
      <Product />
      <Divider />
      <Ingredients />
      <Divider />
      <Benefits />
      <Scarcity />
      <Mission />
      <Divider />
      <FAQ />
      <FinalCTA />
      <Footer />
      <OrderModal />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-breathe px-6 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.32_0.13_268/0.5)_0%,transparent_70%)]" />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <Reveal>
          <Logo size="md" />
        </Reveal>

        <Reveal delay={200}>
          <h1 className="mt-16 font-logo text-4xl font-light italic leading-[1.15] text-pearl md:text-6xl lg:text-7xl">
            Uma nova era para a sua pele<br />
            <span className="text-gold">começa aqui.</span>
          </h1>
        </Reveal>

        <Reveal delay={400}>
          <p className="mt-8 max-w-2xl font-display text-xs uppercase tracking-[0.35em] text-gold-soft md:text-sm">
            Skin Revive Sérum Facial
          </p>
          <p className="mt-3 max-w-2xl text-sm font-light text-pearl/80 md:text-base">
            Primeiro lote · 20 unidades · Lançamento 07.07
          </p>
        </Reveal>

        <Reveal delay={600}>
          <CtaButton>Garantir minha unidade</CtaButton>
          <p className="mt-6 text-[11px] font-light uppercase tracking-[0.25em] text-pearl/60">
            Pré-venda exclusiva · Frete grátis · Apenas 20 unidades disponíveis
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Product() {
  const pills = ["Renova", "Hidrata", "Ilumina", "Protege"];
  return (
    <section className="relative overflow-hidden bg-sapphire-deep px-6 py-28">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
        <Reveal>
          <div className="relative">
            <img
              src={bottleAsset.url}
              alt="Frasco Skin Revive Sérum Facial L'Orée 30ml"
              width={1024}
              height={1536}
              loading="lazy"
              className="relative mx-auto max-h-[984px] w-auto rounded-sm shadow-product"
            />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <p className="section-label">Nouveauté</p>
          <h2 className="mt-4 font-display text-5xl text-gold md:text-6xl">Skin Revive</h2>
          <p className="mt-3 font-logo text-2xl italic text-pearl/90">Sérum Facial · 30ml</p>

          <div className="mt-8 h-px w-24 bg-gold/60" />

          <p className="mt-8 text-base font-light leading-relaxed text-pearl/85 md:text-lg">
            Desenvolvido com tecnologia <span className="text-gold">GHK-Cu</span> e um complexo de
            peptídeos de alta performance para renovar, hidratar e iluminar a pele de forma
            cientificamente comprovada.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {pills.map((p) => (
              <span key={p} className="pill-gold">{p}</span>
            ))}
          </div>

          <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-gold/50 px-5 py-2.5">
            <MoleculeIcon />
            <span className="font-display text-[11px] uppercase tracking-[0.3em] text-gold">
              Powered by GHK-Cu Technology
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Ingredients() {
  const items = [
    { icon: <MoleculeIcon />, name: "GHK-Cu Peptídeo de Cobre", desc: "Estimula a renovação celular e a produção natural de colágeno." },
    { icon: <DropletIcon />, name: "Ácido Hialurônico", desc: "Hidratação profunda que preenche linhas e repõe a umidade da pele." },
    { icon: <ShieldIcon />, name: "Niacinamida B3", desc: "Uniformiza o tom, reduz a oleosidade e fortalece a barreira cutânea." },
    { icon: <LeafBenefitIcon />, name: "Glicoproteínas Vegetais do Milho", desc: "Aumentam a firmeza e a elasticidade da pele de forma natural." },
    { icon: <WheatIcon />, name: "Peptídeo do Trigo", desc: "Ação preenchedora e protetora para uma textura mais lisa." },
  ];
  return (
    <section className="relative bg-sapphire-deep px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="section-label text-center">Formulation</p>
          <h2 className="mt-4 text-center font-display text-3xl text-pearl md:text-5xl">
            A Ciência por Trás da Fórmula
          </h2>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/60" />
        </Reveal>

        <div className="mt-20">
          {items.map((it, i) => (
            <Reveal key={it.name} delay={i * 100}>
              <div>
                <div className="flex flex-col items-start gap-6 py-8 md:flex-row md:items-center md:gap-10">
                  <div className="flex shrink-0 items-center gap-5 md:gap-8">
                    <div className="text-gold">{it.icon}</div>
                    <span className="w-[300px] shrink-0 font-display text-sm uppercase tracking-[0.15em] text-gold md:text-base">
                      {it.name}
                    </span>
                  </div>
                  <div className="hidden h-10 w-px bg-gold/40 md:block" />
                  <p className="text-sm font-light leading-relaxed text-pearl/80 md:text-base">
                    {it.desc}
                  </p>
                </div>
                {i < items.length - 1 && <div className="gold-divider" />}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { icon: <SparkIcon />, text: "Previne rugas e linhas finas" },
    { icon: <WaveIcon />, text: "Hidratação intensa e duradoura" },
    { icon: <FlexIcon />, text: "Melhora a elasticidade" },
    { icon: <AtomIcon />, text: "Ação antioxidante" },
    { icon: <SunIcon />, text: "Pele mais radiante e uniforme" },
  ];
  return (
    <section className="relative bg-sapphire-deep px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="section-label text-center">Resultados</p>
          <h2 className="mt-4 text-center font-display text-3xl text-pearl md:text-5xl">
            O Que Você Vai Sentir
          </h2>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/60" />
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-10 md:grid-cols-5">
          {items.map((it, i) => (
            <Reveal key={it.text} delay={i * 80} className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 transition-all duration-500 hover:border-gold hover:shadow-gold">
                {it.icon}
              </div>
              <p className="mt-5 text-xs font-light uppercase tracking-[0.18em] text-pearl/85">
                {it.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Scarcity() {
  return (
    <section id="scarcity" className="relative overflow-hidden bg-gold-gradient px-6 py-28">
      <div className="mx-auto max-w-3xl text-center text-sapphire-deep">
        <Reveal>
          <p className="section-label">Édition Limitée</p>
          <h2 className="mt-6 font-display text-sapphire-deep">
            <span className="block text-3xl uppercase tracking-[0.2em] md:text-4xl">Apenas</span>
            <span className="mt-2 block font-logo text-[11rem] font-medium leading-none italic md:text-[16rem]">20</span>
            <span className="mt-2 block text-3xl uppercase tracking-[0.2em] md:text-4xl">Unidades</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed opacity-90 md:text-lg">
            Este é o primeiro lote da L&rsquo;Orée. Uma vez esgotado, o próximo lote não tem data confirmada.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-14 inline-flex flex-col items-center">
            <span className="font-display text-xs uppercase tracking-[0.35em] opacity-70">Investimento</span>
            <span className="mt-2 font-logo text-7xl font-medium text-sapphire-deep md:text-8xl">
              R$ 189,90
            </span>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-sapphire-deep/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em]">
              ✦ Frete Grátis
            </span>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <CtaButton className="btn-gold mt-12" style={{ background: "#001B5E", color: "#D4AF6A", borderColor: "#001B5E" }}>
            Quero garantir a minha
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}

function Mission() {
  const lines = [
    "Não acreditamos em milagres. Acreditamos em ciência.",
    "Não seguimos tendências. Criamos soluções que transformam.",
    "Não prometemos o impossível. Entregamos resultados reais.",
    "Não testamos em você. Testamos pela ciência, por você e pelo futuro.",
  ];
  return (
    <section className="relative overflow-hidden bg-sapphire-deep px-6 py-32">
      <Particles count={14} />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="section-label">Manifesto</p>
          <h2 className="mt-4 font-display text-4xl text-gold md:text-5xl">Nossa Missão</h2>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/60" />
        </Reveal>

        <div className="mt-14 space-y-7">
          {lines.map((l, i) => (
            <Reveal key={l} delay={i * 120}>
              <div className="flex items-start justify-center gap-4 text-left md:items-center md:text-center">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-gold md:mt-0" />
                <p className="font-logo text-xl italic leading-relaxed text-pearl/90 md:text-2xl">
                  {l}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={600}>
          <div className="mx-auto mt-16 h-px w-32 bg-gold/60" />
          <p className="mt-10 font-display text-sm uppercase tracking-[0.35em] text-gold md:text-base">
            Ciência que renova, beleza que revela.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Para qual tipo de pele é indicado?", a: "Todos os tipos de pele." },
    { q: "Como usar?", a: "Aplique 3 a 5 gotas sobre a pele limpa, de manhã e/ou à noite. Massageie suavemente até absorção completa." },
    { q: "Quando verei resultados?", a: "Os primeiros resultados podem ser percebidos a partir de 2 a 4 semanas de uso contínuo." },
    { q: "Como funciona a pré-venda?", a: "Você realiza o pagamento agora e recebe o produto assim que o primeiro lote for entregue, previsto para 07 de julho." },
    { q: "E se eu quiser devolver?", a: "Garantimos satisfação total. Em caso de qualquer problema, entre em contato pelo Instagram @loreescience." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative bg-sapphire-deep px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="section-label text-center">Suporte</p>
          <h2 className="mt-4 text-center font-display text-3xl text-pearl md:text-5xl">
            Perguntas Frequentes
          </h2>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/60" />
        </Reveal>

        <div className="mt-14 border-y" style={{ borderColor: "rgba(212, 175, 106, 0.3)" }}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className={i > 0 ? "border-t" : ""} style={i > 0 ? { borderColor: "rgba(212, 175, 106, 0.3)" } : undefined}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-gold"
                  >
                    <span className="font-display text-sm uppercase tracking-[0.12em] text-pearl group-hover:text-gold md:text-base">
                      {f.q}
                    </span>
                    <span className={`shrink-0 font-logo text-3xl text-gold transition-transform duration-300 ease-out ${isOpen ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{ maxHeight: isOpen ? 200 : 0, opacity: isOpen ? 1 : 0 }}
                  >
                    <p className="pb-6 pr-12 text-sm font-light leading-relaxed text-pearl/75 md:text-base">
                      {f.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="final" className="relative flex min-h-[90vh] items-center overflow-hidden bg-hero px-6 py-28">
      <Particles count={32} />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <Logo size="sm" />
        </Reveal>
        <Reveal delay={150}>
          <h2 className="mt-14 font-logo text-4xl font-light italic leading-tight text-pearl md:text-6xl">
            Sua pele merece o<br />
            <span className="text-gold">melhor da ciência.</span>
          </h2>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-8 font-display text-xs uppercase tracking-[0.35em] text-gold-soft md:text-sm">
            Faça parte do primeiro lote L&rsquo;Orée
          </p>
        </Reveal>
        <Reveal delay={500}>
          <CtaButton>Garantir agora — R$ 189,90</CtaButton>
          <p className="mt-8 text-xs font-light uppercase tracking-[0.25em] text-pearl/70">
            Instagram <span className="text-gold">@loreescience</span> · loreescience.com.br
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="bg-sapphire-deep px-6 py-14" style={{ borderTop: "1px solid #D4AF6A" }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <Logo size="sm" />
        <p className="mt-2 font-logo italic text-base md:text-lg" style={{ color: "#D4AF6A" }}>
          Ciência que renova, beleza que revela.
        </p>
        <a
          href="https://instagram.com/loreescience"
          className="mt-2 inline-flex items-center gap-2 text-sm font-light tracking-[0.18em] transition-opacity hover:opacity-70"
          style={{ color: "#D4AF6A" }}
        >
          <InstagramIcon className="h-4 w-4" />
          <span>@loreescience</span>
        </a>
        <div className="mt-4 h-px w-24" style={{ backgroundColor: "#D4AF6A", opacity: 0.3 }} />
        <p className="mt-2 text-[10px] font-light uppercase tracking-[0.25em] text-pearl/40">
          © {new Date().getFullYear()} L&rsquo;Orée Science &amp; Beauté · Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}

/* ---------------- Order Modal ---------------- */
function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

type FormState = { nome: string; email: string; whatsapp: string; cep: string; consent: boolean };
type FormErrors = Partial<Record<keyof FormState, string>>;

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
function maskCep(v: string) {
  return v.replace(/\D/g, "").slice(0, 8);
}

function OrderModal() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({ nome: "", email: "", whatsapp: "", cep: "", consent: false });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-order-modal", onOpen);
    return () => window.removeEventListener("open-order-modal", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.nome.trim() || form.nome.trim().length < 2) e.nome = "Informe seu nome completo";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "E-mail inválido";
    if (form.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "WhatsApp com DDD inválido";
    if (form.cep.replace(/\D/g, "").length !== 8) e.cep = "CEP deve ter 8 dígitos";
    if (!form.consent) e.consent = "É necessário concordar para continuar";
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    const payload = {
      nome: form.nome.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp,
      cep: form.cep,
      consent: form.consent,
      produto: "Skin Revive Sérum Facial 30ml",
      valor: 189.9,
      origem: "landing-loree",
      submittedAt: new Date().toISOString(),
    };
    try {
      // Fire-and-forget webhook; redirect to payment regardless
      void fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "no-cors",
        keepalive: true,
      }).catch(() => {});
    } finally {
      window.location.href = PAYMENT_LINK;
    }
  }

  if (!open) return null;

  const inputClass =
    "w-full bg-transparent border border-gold/40 px-4 py-3 text-pearl placeholder:text-pearl/40 outline-none transition-colors focus:border-gold font-body text-sm rounded-[3px]";
  const labelClass = "block text-[11px] font-display uppercase tracking-[0.2em] text-gold mb-2";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch justify-center overflow-y-auto md:items-center md:p-6"
      style={{ background: "rgba(0, 8, 30, 0.85)", backdropFilter: "blur(6px)" }}
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-y-auto md:rounded-[4px]"
        style={{
          backgroundColor: "#001B5E",
          border: "1px solid rgba(212, 175, 106, 0.4)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fechar"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-sapphire-deep"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="px-6 pb-10 pt-12 md:px-10">
          <div className="text-center">
            <p className="section-label">L&rsquo;Orée</p>
            <h3
              className="mt-3 font-display text-2xl text-gold md:text-3xl"
              style={{ letterSpacing: "0.05em" }}
            >
              Garantir Minha Unidade
            </h3>
            <p className="mt-3 text-sm font-light text-pearl/75">
              Preencha seus dados para reservar seu Skin Revive
            </p>
            <div className="mx-auto mt-5 h-px w-16 bg-gold/60" />
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
            <div>
              <label className={labelClass} htmlFor="om-nome">Nome completo</label>
              <input
                id="om-nome"
                type="text"
                autoComplete="name"
                className={inputClass}
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
              {errors.nome && <p className="mt-1 text-xs text-red-300">{errors.nome}</p>}
            </div>

            <div>
              <label className={labelClass} htmlFor="om-email">E-mail</label>
              <input
                id="om-email"
                type="email"
                autoComplete="email"
                className={inputClass}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="om-zap">WhatsApp com DDD</label>
                <input
                  id="om-zap"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="(00) 00000-0000"
                  className={inputClass}
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: maskPhone(e.target.value) })}
                />
                {errors.whatsapp && <p className="mt-1 text-xs text-red-300">{errors.whatsapp}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="om-cep">CEP</label>
                <input
                  id="om-cep"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="00000000"
                  className={inputClass}
                  value={form.cep}
                  onChange={(e) => setForm({ ...form, cep: maskCep(e.target.value) })}
                />
                {errors.cep && <p className="mt-1 text-xs text-red-300">{errors.cep}</p>}
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-left">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#D4AF6A]"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              />
              <span className="text-xs font-light leading-relaxed text-pearl/80">
                Concordo em receber novidades da L&rsquo;Orée por WhatsApp e e-mail
              </span>
            </label>
            {errors.consent && <p className="-mt-3 text-xs text-red-300">{errors.consent}</p>}

            <div
              className="rounded-[3px] border px-4 py-4 text-left"
              style={{ borderColor: "rgba(212,175,106,0.4)", background: "rgba(212,175,106,0.06)" }}
            >
              <p className="text-[10px] font-display uppercase tracking-[0.25em] text-gold">
                Resumo do pedido
              </p>
              <p className="mt-2 text-sm font-light text-pearl/90">
                Skin Revive Sérum Facial 30ml · <span className="text-gold">R$ 189,90</span> · Frete Grátis
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-gold mt-2 w-full disabled:opacity-60"
            >
              {submitting ? "Processando..." : "Continuar para o pagamento"}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] font-light uppercase tracking-[0.2em] text-pearl/60">
              <LockIcon className="h-3.5 w-3.5 text-gold" />
              <span>Pagamento 100% seguro via Mercado Pago</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
