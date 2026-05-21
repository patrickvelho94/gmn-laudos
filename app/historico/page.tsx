"use client";

import { useEffect, useState } from "react";

export default function HistoricoPage() {

  const [laudos, setLaudos] = useState<any[]>([]);

  useEffect(() => {

    const historico = JSON.parse(
      localStorage.getItem("historicoLaudos") || "[]"
    );

    setLaudos(historico);

  }, []);

  return (
    <main className="min-h-screen bg-[#111111] text-white p-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <p className="uppercase tracking-widest text-[#22c55e] font-bold mb-4">
            CRM DE AUDITORIAS
          </p>

          <h1 className="text-6xl font-black mb-4">
            Histórico de Laudos
          </h1>

          <p className="text-zinc-400 text-xl">
            Auditorias geradas e armazenadas automaticamente pelo sistema.
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {laudos.map((laudo, index) => (

            <div
              key={index}
              className="bg-[#18181b] border border-[#27272a] rounded-3xl p-7"
            >

              {/* SCORE */}
              <div className="flex items-center justify-between mb-6">

                <div>

                  <p className="text-zinc-500 text-sm uppercase tracking-widest mb-2">
                    Score Geral
                  </p>

                  <h2
                    className={`text-5xl font-black ${
                      laudo.score <= 40
                        ? "text-red-500"
                        : laudo.score <= 70
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {laudo.score}
                  </h2>

                </div>

                <div
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    laudo.score <= 40
                      ? "bg-red-500/20 text-red-400"
                      : laudo.score <= 70
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {laudo.score <= 40
                    ? "Crítico"
                    : laudo.score <= 70
                    ? "Intermediário"
                    : "Avançado"}
                </div>

              </div>

              {/* EMPRESA */}
              <div className="mb-8">

                <h3 className="text-2xl font-black mb-3">
                  {laudo.empresa}
                </h3>

                <p className="text-zinc-400 leading-7">
                  {laudo.cidade} • {laudo.categoria}
                </p>

              </div>

              {/* DATA */}
              <div className="mb-8">

                <p className="text-zinc-500 text-sm uppercase tracking-widest mb-2">
                  Data da Auditoria
                </p>

                <p className="text-lg">
                  {laudo.data}
                </p>

              </div>

              {/* BOTÃO */}
              <button
                onClick={() => {

                  const params = new URLSearchParams({
                    empresa: laudo.empresa,
                    cidade: laudo.cidade,
                    categoria: laudo.categoria,
                    score: String(laudo.score),
                    resultado: laudo.resultado,

                    seoScore: String(laudo.seoScore),
                    avaliacaoScore: String(laudo.avaliacaoScore),
                    engajamentoScore: String(laudo.engajamentoScore),
                    perfilScore: String(laudo.perfilScore),
                  });

                  window.open(`/laudo?${params.toString()}`, "_blank");

                }}
                className="w-full bg-[#22c55e] text-black py-4 rounded-2xl font-black hover:scale-[1.02] transition-all"
              >
                Abrir Auditoria
              </button>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}