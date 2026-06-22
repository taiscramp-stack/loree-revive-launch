import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import bottleAsset from "@/assets/skin-revive-bottle.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Landing,
});

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
  const sizes = {
    sm: { name: "text-3xl md:text-4xl", sub: "text-[9px]", line: "w-20", leaf: "h-3 w-4 -top-1 -right-3" },
    md: { name: "text-6xl md:text-7xl", sub: "text-[11px] md:text-xs", line: "w-32 md:w-40", leaf: "h-5 w-6 md:h-6 md:w-8 -top-2 -right-5 md:-top-3 md:-right-6" },
    lg: { name: "text-7xl md:text-8xl", sub: "text-xs md:text-sm", line: "w-40 md:w-52", leaf: "h-6 w-8 md:h-8 md:w-10 -top-3 -right-6 md:-top-4 md:-right-8" },
  }[size];
  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-block">
        <span
          className={`font-logo italic ${sizes.name} leading-none`}
          style={{ color: "#D4AF6A" }}
        >
          L&rsquo;Or&eacute;e
        </span>
        <LeafIcon className={`absolute ${sizes.leaf} -rotate-12`} />
      </div>
      <div className={`mt-3 h-px ${sizes.line}`} style={{ backgroundColor: "#D4AF6A", opacity: 0.5 }} />
      <span
        className={`mt-3 font-body font-light uppercase ${sizes.sub}`}
        style={{ color: "#D4AF6A", letterSpacing: "0.3em" }}
      >
        Science &amp; Beaut&eacute;
      </span>
    </div>
  );
}

function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 28" fill="none" className={className} aria-hidden="true" style={{ color: "#D4AF6A" }}>
      <path
        d="M4 24 C 10 14, 20 4, 36 2 C 32 12, 22 22, 4 24 Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M8 26 C 14 18, 24 10, 34 6 C 30 16, 22 24, 8 26 Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
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
          <a href="#scarcity" className="btn-gold mt-12">
            Garantir minha unidade
          </a>
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
              className="relative mx-auto max-h-[820px] w-auto rounded-sm shadow-product"
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
    { icon: <MoleculeIcon />, name: "GHK-Cu Peptídeo de Cobre", desc: "Estimula a renovação celular e produção de colágeno." },
    { icon: <DropletIcon />, name: "Ácido Hialurônico", desc: "Hidratação profunda e preenchimento de linhas." },
    { icon: <ShieldIcon />, name: "Niacinamida B3", desc: "Uniformiza o tom e fortalece a barreira da pele." },
    { icon: <LeafBenefitIcon />, name: "Glicoproteínas Vegetais do Milho", desc: "Aumentam firmeza e elasticidade." },
    { icon: <WheatIcon />, name: "Peptídeo do Trigo", desc: "Ação preenchedora e protetora." },
  ];
  return (
    <section className="relative bg-sapphire-deep px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="section-label text-center">Formulation</p>
          <h2 className="mt-4 text-center font-display text-3xl text-pearl md:text-5xl">
            A Ciência por Trás da Fórmula
          </h2>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/60" />
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.name} delay={i * 100}>
              <article className="group h-full rounded-sm border border-gold/20 bg-sapphire/40 p-8 backdrop-blur transition-all duration-500 hover:border-gold/60 hover:bg-sapphire/70">
                <div className="mb-6 transition-transform duration-500 group-hover:scale-110">{it.icon}</div>
                <h3 className="font-display text-base uppercase tracking-[0.15em] text-gold">{it.name}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-pearl/75">{it.desc}</p>
              </article>
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
              R$ 159,90
            </span>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-sapphire-deep/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em]">
              ✦ Frete Grátis
            </span>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <a href="#final" className="btn-sapphire mt-12">
            Quero garantir a minha
          </a>
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
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-gold"
                >
                  <span className="font-display text-sm uppercase tracking-[0.12em] text-pearl group-hover:text-gold md:text-base">
                    {f.q}
                  </span>
                  <span className={`shrink-0 font-logo text-3xl text-gold transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-500 ease-out"
                  style={{ maxHeight: isOpen ? 200 : 0, opacity: isOpen ? 1 : 0 }}
                >
                  <p className="pb-6 pr-12 text-sm font-light leading-relaxed text-pearl/75 md:text-base">
                    {f.a}
                  </p>
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
          <a href="#" className="btn-gold mt-12">
            Garantir agora — R$ 159,90
          </a>
          <p className="mt-8 text-xs font-light uppercase tracking-[0.25em] text-pearl/70">
            Instagram <span className="text-gold">@loreescience</span> · loreescience.com.br
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-sapphire-deep border-t border-gold/20 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-2">
          <span className="font-logo text-2xl italic text-gold">L&rsquo;Orée</span>
          <LeafIcon className="h-4 w-5 text-gold" />
        </div>
        <p className="font-display text-[10px] uppercase tracking-[0.35em] text-gold-soft md:text-xs">
          Science &amp; Beauté · Ciência que renova, beleza que revela.
        </p>
        <p className="mt-4 text-[10px] font-light uppercase tracking-[0.2em] text-pearl/40">
          © {new Date().getFullYear()} L&rsquo;Orée. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
