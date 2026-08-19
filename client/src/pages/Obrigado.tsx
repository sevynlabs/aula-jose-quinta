/**
 * Direção Caderno de Viabilidade: confirmação objetiva, visual editorial e linguagem de operação.
 */
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "wouter";

export default function Obrigado() {
  return (
    <main className="thank-you-page">
      <div className="folio-line" aria-hidden="true" />
      <section className="thank-you-shell">
        <div className="brand-lockup brand-lockup--dark">
          <img
            src="/manus-storage/marca-escola-incorporadores_b457d9df.png"
            alt="Escola de Incorporadores"
          />
          <span>Escola de<br />Incorporadores</span>
        </div>

        <div className="thank-you-copy">
          <div className="thank-you-dossier"><span>PROTOCOLO / INSCRIÇÃO</span><span>REF. EI—AUL—01</span></div>
          <span className="section-kicker">INSCRIÇÃO • PRÓXIMO PASSO</span>
          <div className="check-mark" aria-hidden="true"><Check size={26} strokeWidth={2.25} /></div>
          <h1>Seu interesse pela aula foi registrado.</h1>
          <p>Você chegou à etapa de confirmação. As orientações de acesso são enviadas pelo canal informado no seu cadastro.</p>
          <div className="next-steps">
            <div><span>01</span><p><strong>Confirmação:</strong> acompanhe o canal informado no seu cadastro.</p></div>
            <div><span>02</span><p><strong>Acesso:</strong> as orientações para entrar na aula online chegam com a confirmação.</p></div>
            <div><span>03</span><p><strong>Preparação:</strong> reserve na agenda a próxima quinta-feira, no horário apresentado na confirmação.</p></div>
          </div>
          <Link href="/" className="text-link"><ArrowLeft size={16} /> Voltar para os detalhes da aula</Link>
        </div>
      </section>
    </main>
  );
}
