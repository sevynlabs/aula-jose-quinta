/**
 * Direção Caderno de Viabilidade: editorialismo arquitetônico, espinha vertical e ouro de implantação.
 * Cada seção traduz a passagem de executor de obras para estruturador de negócios imobiliários.
 */
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  CircleCheck,
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

const logoUrl = storageAsset("escola-incorporadores-logo_79ad98da.png");
const josePhotoUrl = storageAsset("jose-carlos-cardoso_c9c3a2cf.jpg");
const joseHeroUrl = storageAsset("jose-hero-escura_94e894d4.png");
const joseMobileHeroUrl = storageAsset("jose-hero-mobile-central_33934ce1.png");
const facadeImageUrl = storageAsset("fachada-contemporanea_85ebbcb5.jpg");
const planImageUrl = storageAsset("planta-viabilidade_a8868ecd.jpg");
const checkoutUrl = "https://pay.hotmart.com/U107160255C";
const leadCaptureUrl = "https://script.google.com/macros/s/AKfycbzcuoH2Sz-TosHnGRNUPAmyqeevEfBBpIKUIdZw6obzZVln6I0z5hTXS0Nc7yaq6toCSA/exec";

const navItems = [
  ["01", "Diagnóstico", "#diagnostico"],
  ["02", "A diferença", "#diferenca"],
  ["03", "A aula", "#aula"],
  ["04", "Participar", "#inscricao"],
];

const learnings = [
  "Por que bons construtores continuam presos ao ciclo de uma obra por vez.",
  "A diferença entre construir um imóvel e estruturar uma operação imobiliária.",
  "Como um incorporador analisa uma oportunidade antes de decidir construir.",
  "As variáveis que precisam existir antes da obra: mercado, produto, viabilidade e estrutura.",
  "Como terreno, parceiros, capital, operação e comercialização formam um único ecossistema.",
  "Quais mudanças ajudam a transformar construção em um modelo de negócio.",
];

const diagnosis = [
  "Já construiu pelo menos um imóvel.",
  "Está construindo atualmente.",
  "Utiliza muito recurso próprio nas operações.",
  "Sente que precisa vender uma obra para iniciar outra.",
  "Quer profissionalizar sua atuação no mercado imobiliário.",
  "Quer entender incorporação além da execução da obra.",
  "Possui capacidade de construir, mas percebe que ainda falta estrutura empresarial.",
];

const faqs = [
  {
    question: "Essa aula é para quem nunca construiu?",
    answer: "A aula foi pensada principalmente para construtores, empresários da construção e profissionais próximos ao mercado imobiliário que querem entender a incorporação além da obra.",
  },
  {
    question: "Já sou construtor. A aula é básica?",
    answer: "O ponto de partida não é ensinar o básico da obra. A aula discute a diferença entre executar uma construção e estruturar uma operação de incorporação.",
  },
  {
    question: "A aula ensina construção?",
    answer: "Não. O foco é o raciocínio empresarial por trás da incorporação: oportunidade, produto, viabilidade, estruturação, operação e comercialização.",
  },
  {
    question: "Vou aprender sobre incorporação?",
    answer: "Sim. A aula apresenta os elementos que fazem parte do ecossistema de incorporação e como eles mudam a leitura de uma oportunidade imobiliária.",
  },
  {
    question: "Como recebo meu acesso?",
    answer: "Após a confirmação da inscrição, as orientações de acesso são enviadas pelo canal informado no cadastro.",
  },
  {
    question: "A aula será ao vivo?",
    answer: "O formato detalhado da aula é comunicado junto da confirmação da inscrição.",
  },
  {
    question: "Quanto tempo dura?",
    answer: "A duração prevista é comunicada junto das orientações de acesso.",
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
          <a href="#inscricao" className="header-cta" onClick={() => scrollAndTrack("header")}>Participar da aula <ArrowRight size={16} /></a>
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
            <span className="section-kicker section-kicker--light">AULA EXECUTIVA <i /> ESCOLA DE INCORPORADORES</span>
            <h1>Você sabe construir.<br /><span>Mas seu modelo de negócio ainda te prende a uma obra por vez?</span></h1>
            <p className="hero-lead">Na próxima quinta-feira, José Carlos Cardoso vai mostrar por que alguns construtores continuam dependendo do próprio capital e de uma operação por vez — e o que muda quando começam a pensar como incorporadores.</p>
            <div className="event-line"><span><MapPin size={15} /> QUINTA-FEIRA</span><i /><span>20:00H</span><i /><span>ONLINE</span></div>
            <div className="hero-actions">
              <a href="#inscricao" className="button button--gold" onClick={() => scrollAndTrack("hero")}>Quero participar da aula <ArrowDownRight size={19} /></a>
              <a href="#diagnostico" className="quiet-link">Entender a diferença <MoveRight size={17} /></a>
            </div>
            <p className="microcopy">Inscrição rápida <i /> Acesso online <i /> Condições conforme disponibilidade real</p>
          </div>
          <div className="hero-page-number"><span>01</span><small>/ 08</small></div>
        </section>

        <section id="diagnostico" className="section section--paper diagnosis-section">
          <div className="section-index"><span>01</span><div /><small>DIAGNÓSTICO</small></div>
          <div className="section-intro split-heading">
            <span className="section-kicker">O ciclo que parece crescimento</span>
            <h2>Talvez o problema não esteja na sua obra.<br /><em>Esteja no modelo por trás dela.</em></h2>
          </div>
          <div className="cycle-layout">
            <div className="cycle-copy">
              <p>Você encontra o terreno, coloca seu recurso, constrói, espera vender e só então recupera o capital para começar novamente.</p>
              <p className="cycle-statement">Você pode estar construindo imóveis sem ter construído uma incorporadora.</p>
            </div>
            <div className="cycle-diagram" aria-label="Ciclo da obra única">
              <div className="diagram-label"><span>MODELO RECORRENTE</span><strong>Ciclo da obra única</strong></div>
              <div className="cycle-track">
                <CycleStep number="01">Terreno</CycleStep><ArrowDownRight />
                <CycleStep number="02">Recurso próprio</CycleStep><ArrowDownRight />
                <CycleStep number="03">Obra</CycleStep><ArrowDownRight />
                <CycleStep number="04">Venda</CycleStep><ArrowDownRight />
                <CycleStep number="05">Recuperação</CycleStep>
              </div>
              <div className="cycle-return"><span>RECOMEÇA</span><ArrowRight size={17} /></div>
            </div>
          </div>
        </section>

        <section id="diferenca" className="section section--ink difference-section">
          <div className="section-index section-index--light"><span>02</span><div /><small>A MUDANÇA DE LEITURA</small></div>
          <div className="difference-head split-heading">
            <span className="section-kicker section-kicker--light">Construção não é o ecossistema</span>
            <h2>Construir e incorporar <em>não são a mesma coisa.</em></h2>
          </div>
          <div className="comparison">
            <article className="comparison-column comparison-column--builder">
              <header><span>01</span><h3>Construtor</h3></header>
              <p>Domina a execução.</p>
              <ul><li>Obra</li><li>Orçamento</li><li>Prazo</li><li>Entrega</li></ul>
            </article>
            <article className="comparison-column comparison-column--developer">
              <header><span>02</span><h3>Incorporador</h3></header>
              <p>Estrutura a operação inteira.</p>
              <ul><li>Mercado e produto</li><li>Viabilidade e estruturação</li><li>Parceiros e capital</li><li>Gestão e comercialização</li><li>Risco e saída</li></ul>
            </article>
          </div>
          <blockquote>Construir exige dominar a obra. Incorporar exige dominar o ecossistema.</blockquote>
        </section>

        <section id="aula" className="section section--offwhite class-section">
          <div className="class-photo"><img src={planImageUrl} alt="Materiais de estudo de viabilidade imobiliária" /><div className="photo-folio">AULA<br />EXECUTIVA</div></div>
          <div className="class-copy">
            <div className="section-index"><span>03</span><div /><small>O QUE SERÁ ENSINADO</small></div>
            <h2>Em uma aula, você vai entender o que muda quando começa a pensar <em>como incorporador.</em></h2>
            <ol className="learning-list">
              {learnings.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}
            </ol>
            <a href="#inscricao" className="button button--ink" onClick={() => scrollAndTrack("aprendizados")}>Quero participar da aula <ArrowDownRight size={19} /></a>
          </div>
        </section>

        <section className="section diagnosis-list-section">
          <div className="diagnosis-list-copy">
            <span className="section-kicker section-kicker--light">Leitura de momento</span>
            <h2>Essa aula é para você que...</h2>
            <p>Já domina uma parte importante do processo, mas quer enxergar a operação imobiliária como uma estrutura de negócio — não apenas como a próxima obra.</p>
          </div>
          <div className="diagnosis-checklist">
            {diagnosis.map((item, index) => <div className="diagnosis-item" key={item}><span>0{index + 1}</span><CircleCheck size={19} /><p>{item}</p></div>)}
          </div>
          <div className="diagnosis-footer"><strong>Se você se identificou com três ou mais pontos, essa aula foi pensada para o momento em que você está.</strong><a href="#inscricao" className="text-link text-link--gold" onClick={() => scrollAndTrack("diagnostico_lista")}>Quero participar <ArrowRight size={17} /></a></div>
        </section>

        <section className="section authority-section section--paper">
          <div className="authority-photo-placeholder">
            <img src={josePhotoUrl} alt="José Carlos Cardoso, empresário e incorporador" />
            <div className="authority-photo-shade" />
            <div className="authority-photo-caption"><span>JCC / 01</span><strong>Raciocínio empresarial<br />antes da obra.</strong></div>
          </div>
          <div className="authority-copy">
            <div className="section-index"><span>04</span><div /><small>QUEM CONDUZ A AULA</small></div>
            <h2>José Carlos<br /><em>Cardoso</em></h2>
            <p className="role">Empresário, incorporador e fundador da Escola de Incorporadores.</p>
            <p>José não ensina apenas como executar uma obra. Ele ensina o raciocínio empresarial que organiza as decisões por trás da incorporação.</p>
            <p className="authority-note">A autoridade da aula é construída pela experiência prática e pela visão de mercado, sem números genéricos de faturamento, VGV ou quantidade de obras.</p>
          </div>
        </section>

        <section className="section cost-section">
          <img className="cost-image" src={facadeImageUrl} alt="Fachada de empreendimento contemporâneo" />
          <div className="cost-overlay" />
          <div className="cost-content">
            <span className="section-kicker section-kicker--light">A decisão antes da próxima obra</span>
            <h2>Sua próxima obra pode ser apenas mais uma obra.<br /><em>Ou pode ser o começo de um novo modelo de negócio.</em></h2>
            <div className="cost-list"><span>Mais capital imobilizado.</span><span>Mais dependência da venda.</span><span>Mais um ciclo começando do zero.</span></div>
            <p>A mudança começa quando o empresário passa a enxergar a operação inteira.</p>
          </div>
        </section>

        <section id="inscricao" className="section registration-section section--offwhite">
          <div className="registration-intro">
            <div className="section-index"><span>05</span><div /><small>CONVITE</small></div>
            <h2>Na quinta-feira, eu vou abrir essa estrutura <em>para você.</em></h2>
            <p>Uma aula para empresários que não querem apenas construir mais imóveis. Querem aprender a estruturar negócios imobiliários.</p>
            <div className="event-details">
              <div><span>AULA</span><strong>Como parar de construir uma obra por vez e começar a lucrar de verdade</strong></div>
              <div><span>COM</span><strong>José Carlos Cardoso</strong></div>
              <div><span>DATA</span><strong>Quinta-feira</strong></div>
              <div><span>HORÁRIO</span><strong>20:00h</strong></div>
              <div><span>FORMATO</span><strong>Online</strong></div>
              <div><span>BÔNUS</span><strong>Aula gravada para quem adquirir a participação</strong></div>
              <div><span>DIAGNÓSTICO</span><strong>Leitura do momento atual para orientar o próximo nível</strong></div>
              <div><span>INVESTIMENTO</span><strong>Condições de participação apresentadas no próximo passo</strong></div>
            </div>
          </div>
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-topline"><span>PROTOCOLO DE INSCRIÇÃO</span><span>EI / 01</span></div>
            <h3>Ficha de participação.</h3>
            <p>Informe somente o necessário. Em seguida, você será direcionado ao checkout para concluir a participação.</p>
            <label>Nome completo<input name="name" autoComplete="name" placeholder="Como podemos chamar você?" required /></label>
            <label>E-mail profissional<input name="email" type="email" autoComplete="email" placeholder="voce@empresa.com.br" required /></label>
            <label>WhatsApp<input name="phone" type="tel" autoComplete="tel" placeholder="(00) 00000-0000" required /></label>
            <button type="submit" className="button button--gold button--full" disabled={isSubmitting} aria-busy={isSubmitting}>{isSubmitting ? "Direcionando ao checkout..." : "Garantir minha participação"} <ArrowDownRight size={19} /></button>
            <p className="form-microcopy">Ao avançar, registramos sua inscrição e direcionamos você ao checkout seguro da Hotmart.</p>
            {captureError && <p className="form-microcopy form-microcopy--error">Não foi possível registrar sua inscrição neste momento. Tente novamente.</p>}
          </form>
        </section>

        <section className="section final-cta-section">
          <span className="final-number">06</span>
          <div><p>Capital próprio pode construir uma obra.</p><h2>Modelo de negócio pode construir <em>uma incorporadora.</em></h2><p className="final-subtitle">O próximo nível do construtor não é simplesmente construir mais. É aprender a incorporar.</p><a href="#inscricao" className="button button--gold" onClick={() => scrollAndTrack("cta_final")}>Quero estar na aula <ArrowDownRight size={19} /></a></div>
        </section>

        <section className="section faq-section">
          <div className="faq-intro"><span className="section-kicker">Perguntas objetivas</span><h2>Antes de você decidir.</h2><p>O que já está definido sobre a aula e o que ainda precisa ser confirmado pela organização.</p></div>
          <Accordion type="single" collapsible className="faq-list">
            {faqs.map((faq, index) => <AccordionItem value={`item-${index}`} key={faq.question}><AccordionTrigger><span>0{index + 1}</span>{faq.question}<ChevronDown /></AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>)}
          </Accordion>
        </section>
      </main>

      <footer className="site-footer">
        <BrandLockup />
        <p>© Escola de Incorporadores <span>•</span> [PREENCHER: dados legais]</p>
        <a href="#topo">Voltar ao início <ArrowRight size={15} /></a>
      </footer>

      <a href="#inscricao" className="mobile-sticky-cta" onClick={() => scrollAndTrack("sticky_mobile")}><Play size={14} fill="currentColor" /> Quero participar da aula</a>
    </div>
  );
}
