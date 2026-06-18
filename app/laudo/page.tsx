"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { LaudoPDF } from "./LaudoPDF";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

function LaudoContent() {
  const searchParams = useSearchParams();
  const [pdfReady, setPdfReady] = useState(false);

  const empresa = searchParams.get("empresa") || "Nome da Empresa";
  const cidade = searchParams.get("cidade") || "Cidade";
  const categoria = searchParams.get("categoria") || "Categoria";
  const resultado = searchParams.get("resultado") || "";
  const score = Number(searchParams.get("score")) || 0;
  const visibilidadeScore = Number(searchParams.get("visibilidadeScore")) || 0;
  const avaliacaoScore = Number(searchParams.get("avaliacaoScore")) || 0;
  const engajamentoScore = Number(searchParams.get("engajamentoScore")) || 0;
  const perfilScore = Number(searchParams.get("perfilScore")) || 0;

  const data = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const pdfProps = {
    empresa,
    cidade,
    categoria,
    score,
    visibilidadeScore,
    avaliacaoScore,
    engajamentoScore,
    perfilScore,
    resultado,
    data,
  };

  function getStatus() {
    if (score <= 40) return "Nível Crítico";
    if (score <= 70) return "Nível Intermediário";
    return "Nível Avançado";
  }

  function getStatusColor() {
    if (score <= 40) return "bg-[#fee2e2] text-[#991b1b]";
    if (score <= 70) return "bg-[#fef3c7] text-[#92400e]";
    return "bg-[#dcfce7] text-[#166534]";
  }

  const circumference = 565;
  const progress = circumference - (score / 100) * circumference;

  return (
    <main className="bg-[#111111] min-h-[75vh] p-2 md:p-10 pt-0">
      <div className="w-full max-w-none mx-auto px-0 md:px-6">

        {/* BOTÃO */}
        <div className="flex justify-end mb-6">
          {/* @ts-ignore */}
          <PDFDownloadLink
            document={<LaudoPDF {...pdfProps} />}
            fileName={`laudo-${empresa}.pdf`}
          >
            {({ loading }) => (
              <button className="bg-[#22c55e] text-black px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all">
                {loading ? "Preparando PDF..." : "Salvar PDF"}
              </button>
            )}
          </PDFDownloadLink>
        </div>

        {/* DOCUMENTO VISUAL — continua igual, só pra visualizar na tela */}
        <div className="bg-white text-black rounded-[32px] p-10 md:p-16 mt-0 shadow-2xl w-full overflow-hidden">

          {/* HEADER */}
          <div className="border-b border-zinc-300 pb-6 mb-8">
            <div className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
              AUDITORIA GOOGLE MEU NEGÓCIO
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5 mb-8 text-center md:text-left">
              <img src="/patrick.png" alt="Patrick Gestor" className="w-28 h-28 rounded-full" />
              <div>
                <h2 className="text-3xl md:text-4xl font-black leading-tight">Patrick Gestor</h2>
                <p className="text-zinc-700 leading-7 text-base">
                  Especialista em Google Meu Negócio, SEO Local e Posicionamento Estratégico
                </p>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 break-words">{empresa}</h1>
            <p className="text-zinc-600 text-xl">{cidade} • {categoria}</p>
          </div>

          {/* HERO SCORE */}
          <div className="mb-12">
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-3xl p-4 md:p-8 w-full overflow-hidden">
              <div className="flex flex-col xl:flex-row items-center xl:items-start justify-between gap-10">
                <div>
                  <p className="text-[#64748b] font-semibold uppercase tracking-widest mb-4">Performance Geral</p>
                  <h2 className="text-7xl md:text-8xl font-black leading-none mb-4">{score}/100</h2>
                  <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-full font-bold text-lg ${getStatusColor()}`}>
                    <div className="w-3 h-3 rounded-full bg-current" />
                    {getStatus()}
                  </div>
                  <p className="text-[#64748b] mt-6 text-[15px] md:text-lg leading-7 md:leading-8 w-full max-w-full md:max-w-[500px] break-words">
                    Esta auditoria identifica os principais pontos estratégicos do perfil da empresa no Google Meu Negócio,
                    destacando oportunidades de crescimento, autoridade local e melhorias de posicionamento.
                  </p>
                </div>
                <div className="relative w-[130px] h-[130px] md:w-[220px] md:h-[220px] flex items-center justify-center shrink-0">
                  <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 220 220">
                    <circle cx="110" cy="110" r="90" stroke="#e2e8f0" strokeWidth="18" fill="transparent" />
                    <circle cx="110" cy="110" r="90"
                      stroke={score <= 40 ? "#ef4444" : score <= 70 ? "#f59e0b" : "#22c55e"}
                      strokeWidth="18" fill="transparent" strokeLinecap="round"
                      strokeDasharray={circumference} strokeDashoffset={progress}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-4xl md:text-6xl font-black">{score}</span>
                    <span className="text-[#64748b] font-semibold mt-2">SCORE</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-10">
                {[
                  { label: "VISIBILIDADE", value: visibilidadeScore },
                  { label: "AVALIAÇÕES", value: avaliacaoScore },
                  { label: "ENGAJAMENTO", value: engajamentoScore },
                  { label: "PERFIL", value: perfilScore },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white rounded-2xl p-3 md:p-5 border border-[#e2e8f0] min-w-0">
                    <p className="text-[#64748b] text-sm font-semibold mb-3">{label}</p>
                    <h3 className="text-3xl font-black mb-4">{value}%</h3>
                    <div className="w-full h-3 bg-[#e2e8f0] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${value <= 40 ? "bg-red-500" : value <= 70 ? "bg-yellow-500" : "bg-green-500"}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* POSICIONAMENTO COMPETITIVO */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">Posicionamento Competitivo</h2>
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-3xl p-4 md:p-8 w-full overflow-hidden">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold">Sua Empresa</p>
                    <span className="text-2xl font-black">{score}</span>
                  </div>
                  <div className="w-full h-5 bg-[#e2e8f0] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${score <= 40 ? "bg-red-500" : score <= 70 ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: `${score}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold">Média dos Concorrentes Locais</p>
                    <span className="text-2xl font-black">78</span>
                  </div>
                  <div className="w-full h-5 bg-[#e2e8f0] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[#22c55e]" style={{ width: "78%" }} />
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 md:p-6">
                  <p className="text-sm uppercase tracking-widest text-zinc-500 mb-3">Diferença Competitiva</p>
                  <h3 className="text-5xl font-black mb-4">{score - 78}</h3>
                  <p className="text-zinc-600 leading-7 text-[15px] md:text-lg break-words">
                    O perfil apresenta uma diferença competitiva em relação aos concorrentes locais da mesma categoria,
                    impactando potencial de visibilidade, autoridade local e geração de clientes no Google.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ANÁLISE IA */}
          <div>
            <div className="space-y-6">
              {resultado.split("\n").map((linha, index) => {
                if (linha.startsWith("# ")) {
                  return <h3 key={index} className="text-2xl font-black mt-10 mb-6">{linha.replace("# ", "")}</h3>;
                }
                if (linha.startsWith("- ")) {
                  const texto = linha.replace("- ", "");
                  let prioridade = "INFO"; let cor = "bg-zinc-100 text-zinc-800"; let emoji = "⚪";
                  let secaoAtual = "";
                  for (let i = index; i >= 0; i--) {
                    if (resultado.split("\n")[i].startsWith("# ")) { secaoAtual = resultado.split("\n")[i].replace("# ", ""); break; }
                  }
                  if (secaoAtual.includes("PONTOS")) { prioridade = "OTIMIZADO"; cor = "bg-[#dcfce7] text-[#166534]"; emoji = "🟢"; }
                  else if (secaoAtual.includes("PROBLEMAS")) { prioridade = "CRÍTICO"; cor = "bg-[#fee2e2] text-[#991b1b]"; emoji = "🔴"; }
                  else if (secaoAtual.includes("OPORTUNIDADES")) { prioridade = "OPORTUNIDADE"; cor = "bg-[#fef9c3] text-[#92400e]"; emoji = "🟡"; }
                  else if (secaoAtual.includes("PRIORIDADES")) { prioridade = "PRIORIDADE"; cor = "bg-[#dbeafe] text-[#1d4ed8]"; emoji = "🔵"; }
                  return (
                    <div key={index} className={`rounded-2xl p-4 border ${cor}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xl">{emoji}</span>
                        <span className="font-black uppercase tracking-wider text-sm">{prioridade}</span>
                      </div>
                      <p className="leading-7">{texto}</p>
                    </div>
                  );
                }
                return <p key={index} className="text-zinc-700 leading-8 text-lg">{linha}</p>;
              })}
            </div>
          </div>

          {/* CTA FINAL */}
          <div className="mt-8">
            <div className="bg-gradient-to-br from-black to-zinc-900 text-white rounded-[40px] border border-zinc-800 p-8 md:p-12 w-full overflow-hidden">
              <p className="text-[#22c55e] uppercase tracking-widest font-bold mb-4">Oportunidade Estratégica</p>
              <h2 className="text-[34px] md:text-7xl font-black leading-[1.1] mb-6 break-words max-w-[1100px]">
                Seu perfil possui oportunidades claras de crescimento no Google.
              </h2>
              <p className="text-zinc-300 text-[22px] md:text-3xl leading-9 md:leading-[52px] mb-10 break-words max-w-[1100px]">
                Com uma estratégia correta de posicionamento local, otimização do Google Meu Negócio e fortalecimento
                de autoridade, sua empresa pode aumentar significativamente sua visibilidade, geração de clientes e
                competitividade local.
              </p>
              <a href="https://wa.me/5551994127283" target="_blank"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#22c55e] to-[#16a34a] shadow-lg text-black px-8 md:px-10 py-5 md:py-6 rounded-2xl font-black text-lg md:text-xl hover:scale-[1.03] transition-all">
                Solicitar Plano de Otimização
              </a>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-12 pt-8 border-t border-zinc-300">
            <div className="flex items-center justify-between flex-wrap gap-10">
              <div>
                <p className="text-zinc-500 text-sm uppercase tracking-widest mb-3">Relatório Gerado em</p>
                <h3 className="text-2xl font-black">{data}</h3>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-black mb-2">Patrick Gestor</h3>
                <p className="text-zinc-600 leading-7">Especialista em Google Meu Negócio<br />SEO Local e Posicionamento Estratégico</p>
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