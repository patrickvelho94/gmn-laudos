"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function LaudoContent() {
  const searchParams = useSearchParams();

  const empresa =
    searchParams.get("empresa") || "Nome da Empresa";

  const cidade =
    searchParams.get("cidade") || "Cidade";

  const categoria =
    searchParams.get("categoria") || "Categoria";

  const resultado =
    searchParams.get("resultado") || "";

  const score =
  Number(searchParams.get("score")) || 0;
  
  const seoScore =
  Number(searchParams.get("seoScore")) || 0;

const avaliacaoScore =
  Number(searchParams.get("avaliacaoScore")) || 0;

const engajamentoScore =
  Number(searchParams.get("engajamentoScore")) || 0;

const perfilScore =
  Number(searchParams.get("perfilScore")) || 0;

  function imprimirPDF() {
    window.print();
  }

  function getStatus() {
    if (score <= 40) return "Nível Crítico";

    if (score <= 70) return "Nível Intermediário";

    return "Nível Avançado";
  }

  function getStatusColor() {
    if (score <= 40) {
      return "bg-[#fee2e2] text-[#991b1b]";
    }

    if (score <= 70) {
      return "bg-[#fef3c7] text-[#92400e]";
    }

    return "bg-[#dcfce7] text-[#166534]";
  }

  const circumference = 565;
  const progress = circumference - (score / 100) * circumference;

  return (
    <main className="print-container bg-[#111111] min-h-screen p-10">

      <div className="w-full max-w-[1280px] mx-auto px-2 md:px-6">

        {/* BOTÃO */}
        <div className="flex justify-end mb-6 print:hidden">

          <button
            onClick={imprimirPDF}
            className="bg-[#22c55e] text-black px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
          >
            Salvar PDF
          </button>

        </div>

        {/* DOCUMENTO */}
        <div className="bg-white text-black rounded-3xl p-14 shadow-2xl">

          {/* HEADER */}
<div className="pdf-section border-b border-zinc-300 pb-10 mb-12">

  <div className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
    AUDITORIA GOOGLE MEU NEGÓCIO
  </div>

  <div className="flex flex-col md:flex-row items-center md:items-start gap-5 mb-8 text-center md:text-left">

    <img
      src="/patrick.png"
      alt="Patrick Gestor"
      className="w-20 h-20 rounded-full object-cover border-4 border-[#22c55e]"
    />

    <div>

      <h2 className="text-2xl font-black">
        Patrick Gestor
      </h2>

      <p className="text-zinc-600 text-base md:text-lg leading-7 break-words">
        Especialista em Google Meu Negócio,
        SEO Local e Posicionamento Estratégico
      </p>

    </div>

  </div>

  <h1 className="text-3xl md:text-5xl font-black mb-4 break-words">
    {empresa}
  </h1>

  <p className="text-zinc-600 text-xl">
    {cidade} • {categoria}
  </p>

</div>

          {/* HERO SCORE */}
          <div className="pdf-section mb-16">

            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-3xl p-10">

              <div className="flex flex-col xl:flex-row items-center xl:items-start justify-between gap-10">

                {/* ESQUERDA */}
                <div>

                  <p className="text-[#64748b] font-semibold uppercase tracking-widest mb-4">
                    Performance Geral
                  </p>

                  <h2 className="text-6xl font-black mb-4">
                    {score}/100
                  </h2>

                  <div
                    className={`inline-flex items-center gap-3 px-5 py-3 rounded-full font-bold text-lg ${getStatusColor()}`}
                  >

                    <div className="w-3 h-3 rounded-full bg-current" />

                    {getStatus()}

                  </div>

                  <p className="text-[#64748b] mt-6 text-base md:text-lg leading-7 md:leading-8 w-full max-w-[500px] break-words">
                    Esta auditoria identifica os principais pontos estratégicos
                    do perfil da empresa no Google Meu Negócio, destacando
                    oportunidades de crescimento, autoridade local e melhorias
                    de posicionamento.
                  </p>

                </div>

                {/* DIREITA */}
                <div className="relative w-[160px] h-[160px] md:w-[220px] md:h-[220px] flex items-center justify-center">

                  <svg
                    className="w-full h-full rotate-[-90deg]"
                    viewBox="0 0 220 220"
                  >

                    {/* FUNDO */}
                    <circle
                      cx="110"
                      cy="110"
                      r="90"
                      stroke="#e2e8f0"
                      strokeWidth="18"
                      fill="transparent"
                    />

                    {/* PROGRESSO */}
<circle
  cx="110"
  cy="110"
  r="90"
  stroke={
    score <= 40
      ? "#ef4444"
      : score <= 70
      ? "#f59e0b"
      : "#22c55e"
  }
  strokeWidth="18"
  fill="transparent"
  strokeLinecap="round"
  strokeDasharray={circumference}
  strokeDashoffset={progress}
/>

                  </svg>

                  {/* TEXTO */}
                  <div className="absolute flex flex-col items-center justify-center">

                    <span className="text-4xl md:text-6xl font-black">
                      {score}
                    </span>

                    <span className="text-[#64748b] font-semibold mt-2">
                      SCORE
                    </span>

                  </div>

                </div>

              </div>

              {/* MÉTRICAS */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-12">

  {/* SEO */}
  <div className="bg-white rounded-2xl p-4 md:p-5 border border-[#e2e8f0]">

    <p className="text-[#64748b] text-sm font-semibold mb-3">
      SEO LOCAL
    </p>

    <h3 className="text-3xl md:text-3xl font-black mb-4">
      {seoScore}%
    </h3>

    <div className="w-full h-3 bg-[#e2e8f0] rounded-full overflow-hidden">

      <div
        className={`h-full rounded-full ${
          seoScore <= 40
            ? "bg-red-500"
            : seoScore <= 70
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
        style={{
          width: `${seoScore}%`,
        }}
      />

    </div>

  </div>

  {/* AVALIAÇÕES */}
  <div className="bg-white rounded-2xl p-4 md:p-5 border border-[#e2e8f0]">

    <p className="text-[#64748b] text-sm font-semibold mb-3">
      AVALIAÇÕES
    </p>

    <h3 className="text-3xl font-black mb-4">
      {avaliacaoScore}%
    </h3>

    <div className="w-full h-3 bg-[#e2e8f0] rounded-full overflow-hidden">

      <div
        className={`h-full rounded-full ${
          avaliacaoScore <= 40
            ? "bg-red-500"
            : avaliacaoScore <= 70
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
        style={{
          width: `${avaliacaoScore}%`,
        }}
      />

    </div>

  </div>

  {/* ENGAJAMENTO */}
  <div className="bg-white rounded-2xl p-4 md:p-5 border border-[#e2e8f0]">

    <p className="text-[#64748b] text-sm font-semibold mb-3">
      ENGAJAMENTO
    </p>

    <h3 className="text-3xl font-black mb-4">
      {engajamentoScore}%
    </h3>

    <div className="w-full h-3 bg-[#e2e8f0] rounded-full overflow-hidden">

      <div
        className={`h-full rounded-full ${
          engajamentoScore <= 40
            ? "bg-red-500"
            : engajamentoScore <= 70
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
        style={{
          width: `${engajamentoScore}%`,
        }}
      />

    </div>

  </div>

  {/* PERFIL */}
  <div className="bg-white rounded-2xl p-4 md:p-5 border border-[#e2e8f0]">

    <p className="text-[#64748b] text-sm font-semibold mb-3">
      PERFIL
    </p>

    <h3 className="text-3xl font-black mb-4">
      {perfilScore}%
    </h3>

    <div className="w-full h-3 bg-[#e2e8f0] rounded-full overflow-hidden">

      <div
        className={`h-full rounded-full ${
          perfilScore <= 40
            ? "bg-red-500"
            : perfilScore <= 70
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
        style={{
          width: `${perfilScore}%`,
        }}
      />

    </div>

  </div>

</div>
</div>

</div>

{/* POSICIONAMENTO COMPETITIVO */}
<div className="pdf-section mb-16">

  <h2 className="text-3xl font-black mb-8">
    Posicionamento Competitivo
  </h2>

  <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-3xl p-5 md:p-8 w-full">

    <div className="space-y-8">

      {/* SUA EMPRESA */}
      <div>

        <div className="flex items-center justify-between mb-3">

          <p className="font-bold text-base md:text-lg">
            Sua Empresa
          </p>

          <span className="text-2xl font-black">
            {score}
          </span>

        </div>

        <div className="w-full h-5 bg-[#e2e8f0] rounded-full overflow-hidden">

          <div
            className={`h-full rounded-full ${
              score <= 40
                ? "bg-red-500"
                : score <= 70
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{
              width: `${score}%`,
            }}
          />

        </div>

      </div>

      {/* CONCORRENTES */}
      <div>

        <div className="flex items-center justify-between mb-3">

          <p className="font-bold text-base md:text-lg">
            Média dos Concorrentes Locais
          </p>

          <span className="text-2xl font-black">
            78
          </span>

        </div>

        <div className="w-full h-5 bg-[#e2e8f0] rounded-full overflow-hidden">

          <div
            className="h-full rounded-full bg-[#22c55e]"
            style={{
              width: `78%`,
            }}
          />

        </div>

      </div>

      {/* DIFERENÇA */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">

        <p className="text-sm uppercase tracking-widest text-zinc-500 mb-3">
          Diferença Competitiva
        </p>

        <h3 className="text-5xl font-black mb-4">
          {score - 78}
        </h3>

        <p className="text-zinc-600 leading-8 text-lg">
          O perfil apresenta uma diferença competitiva em relação aos
          concorrentes locais da mesma categoria, impactando potencial
          de visibilidade, autoridade local e geração de clientes no Google.
        </p>

      </div>

    </div>

  </div>

</div>

          {/* ANÁLISE IA */}
<div className="pdf-section">

  <h2 className="text-3xl font-black mb-8">
    Análise Estratégica
  </h2>

  <div className="space-y-6">

    {resultado.split("\n").map((linha, index) => {

      if (linha.startsWith("# ")) {
        return (
          <h3
            key={index}
            className="text-2xl font-black mt-10"
          >
            {linha.replace("# ", "")}
          </h3>
        );
      }

      if (linha.startsWith("- ")) {

  const texto = linha.replace("- ", "");

let prioridade = "INFO";
let cor = "bg-zinc-100 text-zinc-800";
let emoji = "⚪";

let secaoAtual = "";

for (let i = index; i >= 0; i--) {

  if (resultado.split("\n")[i].startsWith("# ")) {

    secaoAtual = resultado
      .split("\n")[i]
      .replace("# ", "");

    break;
  }

}

if (secaoAtual.includes("PONTOS")) {
  prioridade = "OTIMIZADO";
  cor = "bg-[#dcfce7] text-[#166534]";
  emoji = "🟢";
}

else if (secaoAtual.includes("PROBLEMAS")) {
  prioridade = "CRÍTICO";
  cor = "bg-[#fee2e2] text-[#991b1b]";
  emoji = "🔴";
}

else if (secaoAtual.includes("OPORTUNIDADES")) {
  prioridade = "OPORTUNIDADE";
  cor = "bg-[#fef9c3] text-[#92400e]";
  emoji = "🟡";
}

else if (secaoAtual.includes("PRIORIDADES")) {
  prioridade = "PRIORIDADE";
  cor = "bg-[#dbeafe] text-[#1d4ed8]";
  emoji = "🔵";
}

  return (
    <div
      key={index}
      className={`rounded-2xl p-5 border ${cor} print-break-inside-avoid`}
    >

      <div className="flex items-center gap-3 mb-3">

        <span className="text-xl">
          {emoji}
        </span>

        <span className="font-black uppercase tracking-wider text-sm">
          {prioridade}
        </span>

      </div>

      <p className="leading-8">
        {texto}
      </p>

    </div>
  );
}

      return (
        <p
          key={index}
          className="text-zinc-700 leading-8 text-lg"
        >
          {linha}
        </p>
      );
    })}

  </div>

</div>

{/* CTA FINAL */}
<div className="pdf-section mt-20">

  <div className="bg-black text-white rounded-3xl p-6 md:p-10">

     <div className="w-full max-w-[1000px]">

      <p className="text-[#22c55e] uppercase tracking-widest font-bold mb-4">
        Oportunidade Estratégica
      </p>

      <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6">
        Seu perfil possui oportunidades claras de crescimento no Google.
      </h2>

      <p className="text-zinc-300 text-base md:text-xl leading-7 md:leading-9 mb-10">
        Com uma estratégia correta de posicionamento local,
        otimização do Google Meu Negócio e fortalecimento de autoridade,
        sua empresa pode aumentar significativamente sua visibilidade,
        geração de clientes e competitividade local.
      </p>

      <a
        href="https://wa.me/5551994127283"
        target="_blank"
        className="inline-flex items-center justify-center bg-[#22c55e] text-black px-6 md:px-8 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg hover:scale-[1.03] transition-all"
      >
        Solicitar Plano de Otimização
      </a>

    </div>

  </div>

</div>

{/* FOOTER */}
<div className="pdf-section mt-20 pt-10 border-t border-zinc-300">

  <div className="flex items-center justify-between flex-wrap gap-10">

    {/* ESQUERDA */}
    <div>

      <p className="text-zinc-500 text-sm uppercase tracking-widest mb-3">
        Relatório Gerado em
      </p>

      <h3 className="text-2xl font-black">
        {new Date().toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </h3>

    </div>

    {/* DIREITA */}
    <div className="text-right">

      <h3 className="text-2xl font-black mb-2">
        Patrick Gestor
      </h3>

      <p className="text-zinc-600 leading-7">
        Especialista em Google Meu Negócio<br />
        SEO Local e Posicionamento Estratégico
      </p>

    </div>

  </div>

</div>

        </div>

      </div>

    </main>
  );
}
export default function LaudoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LaudoContent />
    </Suspense>
  );
}