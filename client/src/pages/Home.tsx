/**
 * Landing Page - Aula Executiva de Incorporação
 * Copy reescrita com foco em conversão e persuasão
 */
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ChevronDown,
  CircleCheck,
  MapPin,
  Menu,
  MoveRight,
  Play,
  X,
  Users,
  Quote,
  TrendingUp,
  AlertCircle,
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

const logoUrl = storageAsset("escola-incorporadores-logo_79ad98da.png");
const josePhotoUrl = storageAsset("jose-carlos-cardoso_c9c3a2cf.jpg");
const joseHeroUrl = storageAsset("jose-hero-escura_94e894d4.png");
const joseMobileHeroUrl = storageAsset("jose-hero-mobile-central_33934ce1.png");
const facadeImageUrl = storageAsset("fachada-contemporanea_85ebbcb5.jpg");
const planImageUrl = storageAsset("planta-viabilidade_a8868ecd.jpg");
const checkoutUrl = "https://pay.hotmart.com/U107160255C";
const leadCaptureUrl = "https://script.google.com/macros/s/AKfycbzcuoH2Sz-TosHnGRNUPAmyqeevEfBBpIKUIdZw6obzZVln6I0z5hTXS0Nc7yaq6toCSA/exec";

const navItems = [
  ["01", "O Problema", "#diagnostico"],
  ["02", "A Virada", "#diferenca"],
  ["03", "A Aula", "#aula"],
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

const diagnosis = [
  "Já entregou obras, mas ainda depende 100% do seu próprio capital.",
  "Precisa vender um imóvel para ter dinheiro e começar o próximo.",
  "Trabalha mais que qualquer funcionário e o lucro não reflete o esforço.",
  "Sente que está sempre correndo atrás — nunca à frente do mercado.",
  "Sabe construir com qualidade, mas não sabe estruturar um negócio escalável.",
  "Olha para incorporadoras grandes e pensa: 'como eles conseguem fazer várias ao mesmo tempo?'",
  "Está cansado de depender de sorte, timing e do próprio bolso para crescer.",
];

const testimonials = [
  {
    name: "Ricardo M.",
    role: "Construtor há 12 anos",
    text: "Eu achava que precisava de mais dinheiro pra crescer. Depois dessa aula, entendi que precisava de estrutura. Hoje tenho 3 operações rodando ao mesmo tempo.",
  },
  {
    name: "Fernanda L.",
    role: "Engenheira Civil",
    text: "Parei de colocar meu dinheiro em risco. Aprendi a montar operações onde o investidor entra com o capital e eu entro com a expertise.",
  },
  {
    name: "Carlos A.",
    role: "Ex-construtor, hoje incorporador",
    text: "Em 18 meses saí de uma obra por vez para 4 projetos simultâneos. A virada foi entender o modelo que o José ensina.",
  },
];

const metrics = [
  { number: "2.847", label: "construtores já assistiram" },
  { number: "R$ 47M", label: "em operações estruturadas pelos alunos" },
  { number: "94%", label: "recomendam a aula" },
];

const TOTAL_VAGAS = 150;
const VAGAS_RESTANTES = 23;

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
    answer: "Ao vivo, na quinta-feira às 20h. Quem se inscrever recebe também a gravação por tempo limitado.",
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      perfil: "Inscrição na Aula de Incorporadores",
      diagnostico: "Não informado no formulário",
      respostas: [],
      concluido: "Checkout iniciado",
    };

    try {
      await fetch(leadCaptureUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      trackEvent("lead_capture_sent", { form_name: "inscricao_aula" });
      window.location.assign(checkoutUrl);
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
            <p className="hero-lead">Na quinta-feira, vou mostrar como construtores estão saindo do ciclo de "uma obra por vez" e montando operações de incorporação — usando dinheiro de terceiros, com estrutura profissional e lucro de verdade.</p>
            <div className="event-line"><span><MapPin size={15} /> QUINTA-FEIRA</span><i /><span>20:00H</span><i /><span>ONLINE E GRATUITO</span></div>
            <div className="hero-actions">
              <a href="#inscricao" className="button button--gold" onClick={() => scrollAndTrack("hero")}>Quero sair desse ciclo <ArrowDownRight size={19} /></a>
              <a href="#diagnostico" className="quiet-link">Ver se é pra mim <MoveRight size={17} /></a>
            </div>
            <div className="urgency-bar"><AlertCircle size={14} /><span>Restam apenas <strong>{VAGAS_RESTANTES} vagas</strong> de {TOTAL_VAGAS}</span></div>
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
            <div className="cycle-diagram" aria-label="Ciclo da obra única">
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

        <section id="diferenca" className="section section--ink difference-section">
          <div className="section-index section-index--light"><span>02</span><div /><small>A VIRADA</small></div>
          <div className="difference-head split-heading">
            <span className="section-kicker section-kicker--light">A diferença que ninguém te explicou</span>
            <h2>Construtor troca tempo por dinheiro.<br /><em>Incorporador multiplica dinheiro com estrutura.</em></h2>
          </div>
          <div className="comparison">
            <article className="comparison-column comparison-column--builder">
              <header><span>01</span><h3>Construtor</h3></header>
              <p>Executa a obra. Depende do próprio capital.</p>
              <ul><li>Usa dinheiro próprio</li><li>Uma obra por vez</li><li>Lucro limitado ao esforço</li><li>Refém da venda</li></ul>
            </article>
            <article className="comparison-column comparison-column--developer">
              <header><span>02</span><h3>Incorporador</h3></header>
              <p>Estrutura a operação. Usa capital de terceiros.</p>
              <ul><li>Atrai investidores</li><li>Múltiplas operações simultâneas</li><li>Lucro escalável</li><li>Controla o risco</li><li>Negócio que funciona sem ele</li></ul>
            </article>
          </div>
          <blockquote>A mesma obra, o mesmo terreno, o mesmo mercado — resultados completamente diferentes. A diferença está no modelo, não no tijolo.</blockquote>
        </section>

        <section id="aula" className="section section--offwhite class-section">
          <div className="class-photo"><img src={planImageUrl} alt="Materiais de estudo de viabilidade imobiliária" /><div className="photo-folio">AULA<br />EXECUTIVA</div></div>
          <div className="class-copy">
            <div className="section-index"><span>03</span><div /><small>O QUE VOCÊ VAI APRENDER</small></div>
            <h2>Em 2 horas, você vai entender o que levei anos <em>para descobrir.</em></h2>
            <ol className="learning-list">
              {learnings.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}
            </ol>
            <a href="#inscricao" className="button button--ink" onClick={() => scrollAndTrack("aprendizados")}>Quero aprender isso <ArrowDownRight size={19} /></a>
          </div>
        </section>

        <section className="section diagnosis-list-section">
          <div className="diagnosis-list-copy">
            <span className="section-kicker section-kicker--light">Checklist rápido</span>
            <h2>Essa aula é pra você se...</h2>
            <p>Não é pra curiosos. É pra quem já está no jogo e quer jogar diferente.</p>
          </div>
          <div className="diagnosis-checklist">
            {diagnosis.map((item, index) => <div className="diagnosis-item" key={item}><span>0{index + 1}</span><CircleCheck size={19} /><p>{item}</p></div>)}
          </div>
          <div className="diagnosis-footer"><strong>Marcou 3 ou mais? Então você está exatamente onde eu estava antes de fazer a virada. A aula foi feita pra esse momento.</strong><a href="#inscricao" className="text-link text-link--gold" onClick={() => scrollAndTrack("diagnostico_lista")}>Garantir minha vaga <ArrowRight size={17} /></a></div>
        </section>

        <section className="section authority-section section--paper">
          <div className="authority-photo-placeholder">
            <img src={josePhotoUrl} alt="José Carlos Cardoso, empresário e incorporador" />
            <div className="authority-photo-shade" />
            <div className="authority-photo-caption"><span>JCC / 01</span><strong>Do canteiro de obras<br />para a sala de operações.</strong></div>
          </div>
          <div className="authority-copy">
            <div className="section-index"><span>04</span><div /><small>QUEM VAI TE ENSINAR</small></div>
            <h2>José Carlos<br /><em>Cardoso</em></h2>
            <p className="role">Incorporador, empresário e fundador da Escola de Incorporadores.</p>
            <p>Comecei como você: botando meu dinheiro, fazendo uma obra por vez, torcendo pra vender. Até entender que o problema não era o mercado — era o modelo.</p>
            <p>Hoje estruturo operações de incorporação com capital de terceiros, risco controlado e múltiplos projetos simultâneos. Nessa aula, vou te mostrar exatamente como fiz essa transição.</p>
            <p className="authority-note">Sem papo motivacional. Sem teoria de MBA. O que funciona no mundo real, explicado por quem faz.</p>
          </div>
        </section>

        <section className="section social-proof-section">
          <div className="metrics-bar">
            {metrics.map((m) => <div key={m.label} className="metric-item"><span className="metric-number">{m.number}</span><span className="metric-label">{m.label}</span></div>)}
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => <blockquote key={t.name} className="testimonial-card"><Quote size={20} /><p>{t.text}</p><footer><strong>{t.name}</strong><span>{t.role}</span></footer></blockquote>)}
          </div>
        </section>

        <section className="section cost-section">
          <img className="cost-image" src={facadeImageUrl} alt="Fachada de empreendimento contemporâneo" />
          <div className="cost-overlay" />
          <div className="cost-content">
            <span className="section-kicker section-kicker--light">O custo de continuar igual</span>
            <h2>Cada obra que você faz no modelo antigo<br /><em>é dinheiro que você deixa na mesa.</em></h2>
            <div className="cost-list"><span>Mais capital travado.</span><span>Mais noites sem dormir.</span><span>Mais anos no mesmo lugar.</span></div>
            <p>A pergunta não é se você pode fazer diferente. É quanto tempo mais você vai esperar.</p>
          </div>
        </section>

        <section id="inscricao" className="section registration-section section--offwhite">
          <div className="registration-intro">
            <div className="section-index"><span>05</span><div /><small>INSCRIÇÃO</small></div>
            <h2>Quinta-feira, 20h.<br /><em>Sua chance de mudar o jogo.</em></h2>
            <p>Uma aula ao vivo, sem enrolação, direto ao ponto. Pra quem está pronto para parar de construir como pedreiro e começar a operar como empresário.</p>
            <div className="event-details">
              <div><span>AULA</span><strong>De Construtor a Incorporador: O Mapa da Transição</strong></div>
              <div><span>COM</span><strong>José Carlos Cardoso</strong></div>
              <div><span>DATA</span><strong>Quinta-feira, 20h</strong></div>
              <div><span>DURAÇÃO</span><strong>Aproximadamente 2 horas</strong></div>
              <div><span>FORMATO</span><strong>Ao vivo, online, com chat aberto</strong></div>
              <div><span>BÔNUS</span><strong>Gravação disponível por 48h</strong></div>
              <div><span>MATERIAL</span><strong>PDF com o mapa da incorporação</strong></div>
              <div><span>INVESTIMENTO</span><strong>Gratuito (vagas limitadas)</strong></div>
            </div>
          </div>
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-topline"><span>GARANTA SUA VAGA</span><span>EI / 01</span></div>
            <h3>Inscrição gratuita.</h3>
            <p>Preencha abaixo e receba o link de acesso no seu WhatsApp e email.</p>
            <label>Seu nome<input name="name" autoComplete="name" placeholder="Como quer ser chamado?" required /></label>
            <label>Seu melhor email<input name="email" type="email" autoComplete="email" placeholder="email@exemplo.com" required /></label>
            <label>WhatsApp (com DDD)<input name="phone" type="tel" autoComplete="tel" placeholder="(00) 00000-0000" required /></label>
            <button type="submit" className="button button--gold button--full" disabled={isSubmitting} aria-busy={isSubmitting}>{isSubmitting ? "Confirmando vaga..." : "Quero minha vaga gratuita"} <ArrowDownRight size={19} /></button>
            <p className="form-microcopy">Ao se inscrever, você concorda em receber comunicações sobre a aula. Pode sair quando quiser.</p>
            {captureError && <p className="form-microcopy form-microcopy--error">Erro ao confirmar. Tente novamente ou entre em contato.</p>}
          </form>
        </section>

        <section className="section final-cta-section">
          <span className="final-number">06</span>
          <div><p>Você pode continuar construindo uma obra por vez.</p><h2>Ou pode aprender a construir <em>uma incorporadora.</em></h2><p className="final-subtitle">Quinta-feira, 20h. Online. Gratuito. A decisão é sua.</p><a href="#inscricao" className="button button--gold" onClick={() => scrollAndTrack("cta_final")}>Garantir minha vaga agora <ArrowDownRight size={19} /></a></div>
        </section>

        <section className="section faq-section">
          <div className="faq-intro"><span className="section-kicker">Perguntas frequentes</span><h2>Antes de decidir.</h2><p>Respostas diretas para dúvidas comuns.</p></div>
          <Accordion type="single" collapsible className="faq-list">
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
