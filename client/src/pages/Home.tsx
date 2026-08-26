/**
 * Landing Page - Aula Executiva de Incorporação
 * Copy reescrita com foco em conversão e persuasão
 */
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ChevronDown,
  MapPin,
  Menu,
  MoveRight,
  Play,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
  }
}

const storageOrigin = typeof window !== "undefined" && window.location.hostname.endsWith(".manus.space")
  ? ""
  : "https://escolaland-rgqhosht.manus.space";
const storageAsset = (filename: string) => `${storageOrigin}/manus-storage/${filename}`;

const logoUrl = "/logo-light-jose.png";
const josePhotoUrl = "/jose-carlos.jpg";
const joseHeroUrl = "/jose-hero.png";
const joseMobileHeroUrl = "/jose-hero.png";
const planImageUrl = storageAsset("planta-viabilidade_a8868ecd.jpg");
const checkoutUrl = "https://pay.hotmart.com/U107160255C";
const leadCaptureUrl = "https://script.google.com/macros/s/AKfycbyKJ4ftf1VbPkI0Y7KovtqVYypBQgaThQiYydTBRmY7BaVrQsluGLvG6X23U1RO2elj/exec";

const navItems = [
  ["01", "O Problema", "#diagnostico"],
  ["02", "A Aula", "#aula"],
  ["03", "Quem Ensina", "#autoridade"],
  ["04", "Inscrição", "#inscricao"],
];

const learnings = [
  "A armadilha invisível que mantém 90% dos construtores reféns do próprio dinheiro — e como sair dela.",
  "O raciocínio de 3 perguntas que todo incorporador faz ANTES de comprar um terreno (e que evita prejuízos de milhões).",
  "Por que você não precisa de mais capital para crescer — precisa de uma estrutura diferente.",
  "Como montar operações onde o risco é do investidor e o lucro é seu (sem perder o controle).",
  "O mapa completo da incorporação: da análise de mercado até a saída — cada peça no lugar certo.",
  "O que fazer na segunda-feira seguinte para começar a transição de construtor para incorporador.",
];

const faqs = [
  {
    question: "Preciso já ter construído para participar?",
    answer: "Sim. A aula é para quem já sabe construir e quer dar o próximo passo. Se você nunca executou uma obra, ainda não é o momento.",
  },
  {
    question: "Vou aprender a captar investidores?",
    answer: "Você vai entender a lógica por trás da captação. Como estruturar uma operação que atrai capital — não como fazer pitch para investidor.",
  },
  {
    question: "É aula de engenharia ou de negócios?",
    answer: "De negócios. Zero conteúdo técnico de obra. 100% sobre como estruturar, viabilizar e operar incorporações como empresário.",
  },
  {
    question: "Funciona para quem constrói casas ou só para prédios?",
    answer: "Funciona para qualquer escala. Os princípios são os mesmos — o que muda é o tamanho da operação.",
  },
  {
    question: "A aula é ao vivo ou gravada?",
    answer: "Ao vivo, na terça-feira, dia 04 às 20h. Quem se inscrever recebe também a gravação por tempo limitado.",
  },
  {
    question: "Quanto tempo dura?",
    answer: "Entre 1h30 e 2h, dependendo das perguntas. O conteúdo é denso — venha preparado para anotar.",
  },
  {
    question: "Tem certificado?",
    answer: "Não. Isso não é curso de formação. É uma aula prática para quem quer resultado, não diploma.",
  },
];

function trackEvent(event: string, params: Record<string, string> = {}) {
  window.dataLayer?.push({ event, ...params });
  window.fbq?.("trackCustom", event, params);
}

function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#topo" className={`brand-lockup ${compact ? "brand-lockup--compact" : ""}`} aria-label="Escola de Incorporadores, início">
      <img src={logoUrl} alt="Escola de Incorporadores" />
    </a>
  );
}

function CycleStep({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="cycle-step"><span>{number}</span><strong>{children}</strong></div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captureError, setCaptureError] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"gratuito" | "gravacao">("gratuito");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollAndTrack = (location: string) => {
    trackEvent("cta_click", { cta_location: location });
    setMenuOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();

    setIsSubmitting(true);
    setCaptureError(false);
    trackEvent("lead", { form_name: "inscricao_aula" });
    trackEvent("complete_registration", { form_name: "inscricao_aula" });

    const payload = {
      nome: name,
      email,
      whatsapp: phone,
      perfil: "Aula Executiva R$27",
      origem: "Landing Page",
    };

    try {
      // Cria iframe oculto para envio
      const iframe = document.createElement("iframe");
      iframe.name = "hidden_iframe";
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      // Cria form oculto
      const hiddenForm = document.createElement("form");
      hiddenForm.method = "POST";
      hiddenForm.action = leadCaptureUrl;
      hiddenForm.target = "hidden_iframe";

      const perfil = selectedPlan === "gratuito" ? "Aula Ao Vivo (Gratuito)" : "Aula Gravada (R$27)";
      const redirectUrl = selectedPlan === "gratuito"
        ? "https://aula1.escoladeincorporadores.com.br/obrigado"
        : checkoutUrl;

      const fields = {
        nome: name,
        email: email,
        whatsapp: phone,
        perfil: perfil,
        origem: "Landing Page",
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        hiddenForm.appendChild(input);
      });

      document.body.appendChild(hiddenForm);
      hiddenForm.submit();

      trackEvent("lead_capture_sent", { form_name: "inscricao_aula" });

      // Aguarda envio e redireciona
      setTimeout(() => {
        document.body.removeChild(iframe);
        document.body.removeChild(hiddenForm);
        window.location.assign(redirectUrl);
      }, 1000);
    } catch {
      trackEvent("lead_capture_error", { form_name: "inscricao_aula" });
      setCaptureError(true);
      setIsSubmitting(false);
    }
  };

  return (
    <div id="topo" className="site-shell">
      <div className="page-grain" aria-hidden="true" />
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <div className="header-inner">
          <BrandLockup compact />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.slice(0, 3).map(([number, label, href]) => (
              <a key={label} href={href}><span>{number}</span>{label}</a>
            ))}
          </nav>
          <a href="#inscricao" className="header-cta" onClick={() => scrollAndTrack("header")}>Garantir minha vaga <ArrowRight size={16} /></a>
          <button className="mobile-menu-trigger" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && <nav className="mobile-nav" aria-label="Navegação mobile">
          {navItems.map(([number, label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}><span>{number}</span>{label}</a>)}
        </nav>}
      </header>

      <aside className="folio-rail" aria-label="Sequência da página">
        <div className="rail-brand">EI</div>
        <div className="rail-line" />
        {navItems.map(([number, label, href]) => <a href={href} key={label}><span>{number}</span><i>{label}</i></a>)}
        <div className="rail-bottom">2026</div>
      </aside>

      <main>
        <section className="hero-section">
          <div className="hero-image-wrap hero-image-wrap--portrait">
            <picture>
              <source media="(max-width: 860px)" srcSet={joseMobileHeroUrl} />
              <img src={joseHeroUrl} alt="José Carlos Cardoso" className="hero-image hero-image--portrait" />
            </picture>
            <div className="hero-image-overlay" />
            <div className="hero-image-caption"><span>JOSÉ CARLOS CARDOSO</span><span>ESCOLA DE INCORPORADORES</span></div>
          </div>
          <div className="hero-content">
            <span className="section-kicker section-kicker--light">AULA EXECUTIVA <i /> AO VIVO E ONLINE</span>
            <h1>Você constrói bem.<br /><span>Mas continua refém do próprio capital?</span></h1>
            <p className="hero-lead">Na terça-feira, dia 04, vou mostrar como construtores estão saindo do ciclo de "uma obra por vez" e montando operações de incorporação — usando dinheiro de terceiros, com estrutura profissional e lucro de verdade.</p>
            <div className="event-line"><span><MapPin size={15} /> TERÇA-FEIRA, DIA 04</span><i /><span>20:00H</span><i /><span>ONLINE • GRATUITO</span></div>
            <div className="hero-actions">
              <a href="#inscricao" className="button button--gold" onClick={() => scrollAndTrack("hero")}>Quero sair desse ciclo <ArrowDownRight size={19} /></a>
              <a href="#diagnostico" className="quiet-link">Ver se é pra mim <MoveRight size={17} /></a>
            </div>
          </div>
          <div className="hero-page-number"><span>01</span><small>/ 08</small></div>
        </section>

        <section id="diagnostico" className="section section--paper diagnosis-section">
          <div className="section-index"><span>01</span><div /><small>O PROBLEMA</small></div>
          <div className="section-intro split-heading">
            <span className="section-kicker">A armadilha do construtor competente</span>
            <h2>Você não tem um problema de obra.<br /><em>Tem um problema de modelo.</em></h2>
          </div>
          <div className="cycle-layout">
            <div className="cycle-copy">
              <p>Todo mês você vê o mesmo filme: acha um terreno, coloca SEU dinheiro, constrói, torce pra vender rápido — e só aí respira pra começar de novo.</p>
              <p className="cycle-statement">Enquanto isso, incorporadores que construem pior que você estão faturando 10x mais. A diferença não é talento. É estrutura.</p>
            </div>
            <div className="cycle-diagram reveal-on-scroll" aria-label="Ciclo da obra única">
              <div className="diagram-label"><span>O CICLO QUE TE PRENDE</span><strong>A roda que nunca para</strong></div>
              <div className="cycle-track">
                <CycleStep number="01">Acha terreno</CycleStep><ArrowDownRight />
                <CycleStep number="02">Investe tudo</CycleStep><ArrowDownRight />
                <CycleStep number="03">Constrói</CycleStep><ArrowDownRight />
                <CycleStep number="04">Torce pra vender</CycleStep><ArrowDownRight />
                <CycleStep number="05">Recupera capital</CycleStep>
              </div>
              <div className="cycle-return"><span>VOLTA PRO ZERO</span><ArrowRight size={17} /></div>
            </div>
          </div>
        </section>

        <section id="aula" className="section section--offwhite class-section">
          <div className="class-photo"><img src={planImageUrl} alt="Materiais de estudo de viabilidade imobiliária" /><div className="photo-folio">AULA<br />EXECUTIVA</div></div>
          <div className="class-copy">
            <div className="section-index"><span>02</span><div /><small>O QUE VOCÊ VAI APRENDER</small></div>
            <h2>Em 2 horas, você vai entender o que levei anos <em>para descobrir.</em></h2>
            <ol className="learning-list reveal-on-scroll">
              {learnings.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}
            </ol>
            <a href="#inscricao" className="button button--ink" onClick={() => scrollAndTrack("aprendizados")}>Quero aprender isso <ArrowDownRight size={19} /></a>
          </div>
        </section>

        <section id="autoridade" className="section authority-section section--paper">
          <div className="authority-photo-placeholder reveal-on-scroll">
            <img src={josePhotoUrl} alt="José Carlos Cardoso, empresário e incorporador" />
            <div className="authority-photo-shade" />
            <div className="authority-photo-caption"><span>JCC / 01</span><strong>Do canteiro de obras<br />para a sala de operações.</strong></div>
          </div>
          <div className="authority-copy">
            <div className="section-index"><span>03</span><div /><small>QUEM VAI TE ENSINAR</small></div>
            <h2>José Carlos<br /><em>Cardoso</em></h2>
            <p className="role">Incorporador, empresário e fundador da Escola de Incorporadores.</p>
            <p>Comecei como você: botando meu dinheiro, fazendo uma obra por vez, torcendo pra vender. Até entender que o problema não era o mercado — era o modelo.</p>
            <p>Hoje estruturo operações de incorporação com capital de terceiros, risco controlado e múltiplos projetos simultâneos. Nessa aula, vou te mostrar exatamente como fiz essa transição.</p>
            <p className="authority-note">Sem papo motivacional. Sem teoria de MBA. O que funciona no mundo real, explicado por quem faz.</p>
          </div>
        </section>

        <section id="inscricao" className="section registration-section section--offwhite">
          <div className="registration-intro">
            <div className="section-index"><span>04</span><div /><small>INSCRIÇÃO</small></div>
            <h2>Terça-feira, dia 04, 20h.<br /><em>Sua chance de mudar o jogo.</em></h2>
            <p>Uma aula ao vivo, sem enrolação, direto ao ponto. Pra quem está pronto para parar de construir como pedreiro e começar a operar como empresário.</p>
            <div className="event-details">
              <div><span>AULA</span><strong>De Construtor a Incorporador: O Mapa da Transição</strong></div>
              <div><span>COM</span><strong>José Carlos Cardoso</strong></div>
              <div><span>DATA</span><strong>Terça-feira, dia 04, 20h</strong></div>
              <div><span>DURAÇÃO</span><strong>Aproximadamente 2 horas</strong></div>
              <div><span>FORMATO</span><strong>Ao vivo, online, com chat aberto</strong></div>
              <div><span>BÔNUS</span><strong>Gravação disponível por 48h</strong></div>
              <div><span>MATERIAL</span><strong>PDF com o mapa da incorporação</strong></div>
              <div><span>INVESTIMENTO</span><strong>Gratuito ou R$ 27 (com gravação)</strong></div>
            </div>
          </div>
          <form className="registration-form reveal-on-scroll" onSubmit={handleSubmit}>
            <div className="form-topline"><span>GARANTA SUA VAGA</span><span>EI / 01</span></div>
            <h3>Escolha seu plano</h3>

            <div className="plan-options">
              <label className={`plan-option ${selectedPlan === "gratuito" ? "plan-option--selected" : ""}`}>
                <input type="radio" name="plan" value="gratuito" checked={selectedPlan === "gratuito"} onChange={() => setSelectedPlan("gratuito")} />
                <div className="plan-content">
                  <strong>Aula ao Vivo</strong>
                  <span className="plan-price">Gratuito</span>
                  <span className="plan-desc">Acesso à aula ao vivo na terça-feira, dia 04</span>
                </div>
              </label>
              <label className={`plan-option ${selectedPlan === "gravacao" ? "plan-option--selected" : ""}`}>
                <input type="radio" name="plan" value="gravacao" checked={selectedPlan === "gravacao"} onChange={() => setSelectedPlan("gravacao")} />
                <div className="plan-content">
                  <strong>Aula ao Vivo + Gravação</strong>
                  <span className="plan-price">R$ 27</span>
                  <span className="plan-desc">Acesso à aula ao vivo + gravação permanente</span>
                </div>
              </label>
            </div>

            <label>Seu nome<input name="name" autoComplete="name" placeholder="Como quer ser chamado?" required /></label>
            <label>Seu melhor email<input name="email" type="email" autoComplete="email" placeholder="email@exemplo.com" required /></label>
            <label>WhatsApp (com DDD)<input name="phone" type="tel" autoComplete="tel" placeholder="(00) 00000-0000" required /></label>
            <button type="submit" className="button button--gold button--full" disabled={isSubmitting} aria-busy={isSubmitting}>
              {isSubmitting ? "Redirecionando..." : selectedPlan === "gratuito" ? "Garantir minha vaga gratuita" : "Garantir vaga + gravação por R$ 27"} <ArrowDownRight size={19} />
            </button>
            <p className="form-microcopy">Ao se inscrever, você concorda em receber comunicações sobre a aula. Pode sair quando quiser.</p>
            {captureError && <p className="form-microcopy form-microcopy--error">Erro ao confirmar. Tente novamente ou entre em contato.</p>}
          </form>
        </section>

        <section className="section faq-section">
          <div className="faq-intro"><span className="section-kicker">Perguntas frequentes</span><h2>Antes de decidir.</h2><p>Respostas diretas para dúvidas comuns.</p></div>
          <Accordion type="single" collapsible className="faq-list reveal-on-scroll">
            {faqs.map((faq, index) => <AccordionItem value={`item-${index}`} key={faq.question}><AccordionTrigger><span>0{index + 1}</span>{faq.question}<ChevronDown /></AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>)}
          </Accordion>
        </section>
      </main>

      <footer className="site-footer">
        <BrandLockup />
        <p>© Escola de Incorporadores <span>•</span> Todos os direitos reservados</p>
        <a href="#topo">Voltar ao início <ArrowRight size={15} /></a>
      </footer>

      <a href="#inscricao" className="mobile-sticky-cta" onClick={() => scrollAndTrack("sticky_mobile")}><Play size={14} fill="currentColor" /> Garantir minha vaga</a>
    </div>
  );
}
