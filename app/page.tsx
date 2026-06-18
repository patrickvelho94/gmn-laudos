"use client";

import { useRef, useState } from "react";

// @ts-ignore
let html2pdf: any;

export default function Home() {
  const [empresa, setEmpresa] = useState("");
  const [cidade, setCidade] = useState("");
  const [categoria, setCategoria] = useState("");
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  const pdfRef = useRef<HTMLDivElement>(null);

  const [checks, setChecks] = useState({
  // VISIBILIDADE
  apareceGoogle: false,
  apareceNoMaps: false,
  entreTresPrimeiros: false,
  // PERFIL
  descricaoOtimizada: false,
  categoriasCorretas: false,
  botaoWhatsapp: false,
  horarioPreenchido: false,
  temProdutosServicos: false,
  // AVALIAÇÕES
  maisde30Avaliacoes: false,
  avaliacoesRecentes: false,
  respondeAvaliacoes: false,
  // ATIVIDADE
  postagensRecentes: false,
  fotosRecentes: false,
  temVideos: false,
});

const pesos = {
  // VISIBILIDADE (40pts)
  apareceGoogle: 5,
  apareceNoMaps: 15,
  entreTresPrimeiros: 20,
  // PERFIL (25pts)
  descricaoOtimizada: 8,
  categoriasCorretas: 5,
  botaoWhatsapp: 5,
  horarioPreenchido: 3,
  temProdutosServicos: 4,
  // AVALIAÇÕES (20pts)
  maisde30Avaliacoes: 8,
  avaliacoesRecentes: 7,
  respondeAvaliacoes: 5,
  // ATIVIDADE (15pts)
  postagensRecentes: 6,
  fotosRecentes: 5,
  temVideos: 4,
};

  const totalPossivel = Object.values(pesos).reduce(
    (acc, peso) => acc + peso,
    0
  );

  const pontos = Object.entries(checks).reduce(
    (acc, [key, value]) => {
      if (value) {
        return acc + pesos[key as keyof typeof pesos];
      }

      return acc;
    },
    0
  );

  const score = Math.round((pontos / totalPossivel) * 100);

const visibilidadeScore = Math.round(
  (
    Number(checks.apareceGoogle) +
    Number(checks.apareceNoMaps) +
    Number(checks.entreTresPrimeiros)
  ) / 3 * 100
);

const avaliacaoScore = Math.round(
  (
    Number(checks.maisde30Avaliacoes) +
    Number(checks.avaliacoesRecentes) +
    Number(checks.respondeAvaliacoes)
  ) / 3 * 100
);

const engajamentoScore = Math.round(
  (
    Number(checks.postagensRecentes) +
    Number(checks.fotosRecentes) +
    Number(checks.temVideos)
  ) / 3 * 100
);

const perfilScore = Math.round(
  (
    Number(checks.descricaoOtimizada) +
    Number(checks.categoriasCorretas) +
    Number(checks.botaoWhatsapp) +
    Number(checks.horarioPreenchido) +
    Number(checks.temProdutosServicos)
  ) / 5 * 100
);

function getStatus() {
  if (score <= 40) return "Nível Crítico";
  if (score <= 70) return "Nível Intermediário";
  return "Nível Avançado";
}

async function baixarPDF() {
  if (!pdfRef.current) return;

  if (!html2pdf) {
    html2pdf = (
      await import("html2pdf.js/dist/html2pdf.min.js")
    ).default;
    }

    const options = {
      margin: 0.5,
      filename: `laudo-${empresa || "empresa"}.pdf`,
      image: { type: "jpeg", quality: 1 },

      html2canvas: {
        scale: 2,
      },

      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },

      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
      },
    };

    html2pdf()
      .set(options)
      .from(pdfRef.current)
      .save();
  }

  function toggleCheck(name: string) {
    setChecks((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }));
  }

  async function gerarLaudo() {
    setLoading(true);

    try {
      const response = await fetch("/api/laudo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empresa,
          cidade,
          categoria,
          checks,
          score,
        }),
      });

      const data = await response.json();

      setResultado(data.resultado);

const auditoria = {
  empresa,
  cidade,
  categoria,
  score,
  visibilidadeScore,
  avaliacaoScore,
  engajamentoScore,
  perfilScore,
  resultado: data.resultado,
  data: new Date().toLocaleDateString("pt-BR"),
};

const historico = JSON.parse(
  localStorage.getItem("historicoLaudos") || "[]"
);

historico.unshift(auditoria);

localStorage.setItem(
  "historicoLaudos",
  JSON.stringify(historico)
);

} catch (error) {
  setResultado("Erro ao gerar análise.");
}

    setLoading(false);
  }

  function Checkbox({
    label,
    checked,
    onClick,
  }: {
    label: string;
    checked: boolean;
    onClick: () => void;
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`w-full flex items-center gap-4 border rounded-2xl px-5 py-4 transition-all text-left ${
          checked
            ? "bg-[#14532d] border-[#22c55e]"
            : "bg-black border-[#27272a]"
        }`}
      >
        <div
          className={`min-w-6 h-6 rounded-md border flex items-center justify-center text-sm ${
            checked
              ? "bg-[#22c55e] border-[#22c55e] text-black font-bold"
              : "border-[#52525b]"
          }`}
        >
          {checked ? "✓" : ""}
        </div>

        <span className="text-[#e4e4e7] leading-relaxed">
          {label}
        </span>
      </button>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-14">
<div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* HERO */}
        <section className="mb-14">

          <div className="inline-block bg-[#18181b] border border-[#27272a] px-4 py-2 rounded-full text-sm text-[#d4d4d8] mb-6">
            Sistema Inteligente de Auditoria GMN
          </div>

<h1 className="text-4xl md:text-7xl font-black leading-tight break-words max-w-5xl mb-6">            Gere laudos profissionais para Google Meu Negócio
          </h1>

          <p className="text-[#a1a1aa] text-base md:text-xl max-w-3xl leading-relaxed">
            Analise perfis, identifique problemas estratégicos e aumente seus fechamentos
          </p>

        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* FORM */}
          <div className="bg-[#18181b] border border-[#27272a] rounded-3xl p-5 md:p-8">

            <h2 className="text-3xl font-bold mb-8">
              Auditoria do Perfil
            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Nome da empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className="w-full bg-black border border-[#3f3f46] rounded-2xl px-6 py-5 outline-none"
              />

              <input
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full bg-black border border-[#3f3f46] rounded-2xl px-6 py-5 outline-none"
              />

              <input
                type="text"
                placeholder="Categoria principal"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full bg-black border border-[#3f3f46] rounded-2xl px-6 py-5 outline-none"
              />

              {/* VISIBILIDADE */}
<div className="pt-6">
  <h3 className="text-2xl font-bold mb-4">Visibilidade</h3>
  <div className="space-y-3">
    <Checkbox
      label="Aparece no Google quando pesquiso o nome da empresa"
      checked={checks.apareceGoogle}
      onClick={() => toggleCheck("apareceGoogle")}
    />
    <Checkbox
      label="Aparece no Maps quando pesquiso a categoria + cidade"
      checked={checks.apareceNoMaps}
      onClick={() => toggleCheck("apareceNoMaps")}
    />
    <Checkbox
      label="Está entre os 3 primeiros do Maps"
      checked={checks.entreTresPrimeiros}
      onClick={() => toggleCheck("entreTresPrimeiros")}
    />
  </div>
</div>

{/* PERFIL */}
<div className="pt-8">
  <h3 className="text-2xl font-bold mb-4">Perfil</h3>
  <div className="space-y-3">
    <Checkbox
      label="Tem descrição escrita e otimizada"
      checked={checks.descricaoOtimizada}
      onClick={() => toggleCheck("descricaoOtimizada")}
    />
    <Checkbox
      label="Categorias estão corretas e específicas"
      checked={checks.categoriasCorretas}
      onClick={() => toggleCheck("categoriasCorretas")}
    />
    <Checkbox
      label="Tem botão do WhatsApp ativo"
      checked={checks.botaoWhatsapp}
      onClick={() => toggleCheck("botaoWhatsapp")}
    />
    <Checkbox
      label="Horário preenchido corretamente"
      checked={checks.horarioPreenchido}
      onClick={() => toggleCheck("horarioPreenchido")}
    />
    <Checkbox
      label="Tem produtos ou serviços cadastrados"
      checked={checks.temProdutosServicos}
      onClick={() => toggleCheck("temProdutosServicos")}
    />
  </div>
</div>

{/* AVALIAÇÕES */}
<div className="pt-8">
  <h3 className="text-2xl font-bold mb-4">Avaliações</h3>
  <div className="space-y-3">
    <Checkbox
      label="Tem mais de 30 avaliações"
      checked={checks.maisde30Avaliacoes}
      onClick={() => toggleCheck("maisde30Avaliacoes")}
    />
    <Checkbox
      label="Tem avaliações nos últimos 30 dias"
      checked={checks.avaliacoesRecentes}
      onClick={() => toggleCheck("avaliacoesRecentes")}
    />
    <Checkbox
      label="Responde as avaliações dos clientes"
      checked={checks.respondeAvaliacoes}
      onClick={() => toggleCheck("respondeAvaliacoes")}
    />
  </div>
</div>

{/* ATIVIDADE */}
<div className="pt-8">
  <h3 className="text-2xl font-bold mb-4">Atividade</h3>
  <div className="space-y-3">
    <Checkbox
      label="Fez postagem nos últimos 30 dias"
      checked={checks.postagensRecentes}
      onClick={() => toggleCheck("postagensRecentes")}
    />
    <Checkbox
      label="Tem fotos dos últimos 3 meses"
      checked={checks.fotosRecentes}
      onClick={() => toggleCheck("fotosRecentes")}
    />
    <Checkbox
      label="Tem vídeos no perfil"
      checked={checks.temVideos}
      onClick={() => toggleCheck("temVideos")}
    />
  </div>
</div>



              <button
                onClick={gerarLaudo}
                className="w-full bg-white text-black py-5 rounded-2xl font-bold mt-10 hover:scale-[1.02] transition-all"
              >
                {loading ? "Gerando análise..." : "Gerar Laudo"}
              </button>

            </div>

          </div>

          {/* RESULTADO */}
          <div className="bg-[#18181b] border border-[#27272a] rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              Resultado da Auditoria
            </h2>

            <div className="mb-8">

              <div className="flex items-center justify-between mb-3">

                <span className="text-[#a1a1aa]">
                  Score Estratégico
                </span>

                <span className="text-5xl font-black">
                  {score}/100
                </span>

              </div>

              <div className="w-full h-5 bg-black rounded-full overflow-hidden border border-[#27272a]">

                <div
                  className={`h-full transition-all duration-500 ${
                    score <= 40
                      ? "bg-[#ef4444]"
                      : score <= 70
                      ? "bg-[#eab308]"
                      : "bg-[#22c55e]"
                  }`}
                  style={{
                    width: `${score}%`,
                  }}
                />

              </div>

            </div>

            <button

  onClick={() => {

    const params = new URLSearchParams({
  empresa,
  cidade,
  categoria,
  score: String(score),
  resultado,
  visibilidadeScore: String(visibilidadeScore),
  avaliacaoScore: String(avaliacaoScore),
  engajamentoScore: String(engajamentoScore),
  perfilScore: String(perfilScore),
});

    window.open(`/laudo?${params.toString()}`, "_blank");

  }}
  className="w-full mb-6 bg-[#22c55e] text-black py-4 rounded-2xl font-bold hover:scale-[1.02] transition-all"
>
  Abrir Laudo Premium
</button>

            {/* PDF */}
            <div
              ref={pdfRef}
              className="bg-black border border-[#27272a] rounded-2xl p-10 min-h-[700px]"
            >

              <div
                className="border-b border-[#27272a] pb-8 mb-8"
                style={{ pageBreakInside: "avoid" }}
              >

                <div className="inline-block bg-white text-black px-4 py-2 rounded-full text-sm font-bold mb-6">
                  AUDITORIA GOOGLE MEU NEGÓCIO
                </div>

                <h1
                  className="text-4xl font-black mb-3"
                  style={{ pageBreakInside: "avoid" }}
                >
                  {empresa || "Nome da Empresa"}
                </h1>

                <p
                  className="text-[#a1a1aa] text-lg"
                  style={{ pageBreakInside: "avoid" }}
                >
                  {cidade || "Cidade"} • {categoria || "Categoria"}
                </p>

              </div>

              <div
                className="space-y-6"
                style={{ pageBreakInside: "avoid" }}
              >

                <p
                  className="text-[#a1a1aa] mb-4"
                  style={{ pageBreakInside: "avoid" }}
                >
                  Score Estratégico
                </p>

                <div
                  className="flex items-center gap-6"
                  style={{ pageBreakInside: "avoid" }}
                >

                  <div
                    className="text-7xl font-black"
                    style={{ pageBreakInside: "avoid" }}
                  >
                    {score}
                  </div>

                  <div style={{ pageBreakInside: "avoid" }}>

                    <div
                      className={`px-4 py-2 rounded-full text-sm font-bold inline-block ${
                        score <= 40
                          ? "bg-[#7f1d1d] text-[#f87171]"
                          : score <= 70
                          ? "bg-[#78350f] text-[#facc15]"
                          : "bg-[#14532d] text-[#4ade80]"
                      }`}
                    >
                      {getStatus()}
                    </div>

                  </div>

                </div>

              </div>

              <div
                className="space-y-6 mt-10"
                style={{ pageBreakInside: "avoid" }}
              >

                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ pageBreakInside: "avoid" }}
                >
                  Análise Estratégica
                </h2>

                {resultado ? (
                  <div className="space-y-5">

                    {resultado.split("\n").map((linha, index) => {

                      if (linha.startsWith("# ")) {
                        return (
                          <h3
                            key={index}
                            className="text-2xl font-bold text-white pt-8"
                            style={{ pageBreakInside: "avoid" }}
                          >
                            {linha.replace("# ", "")}
                          </h3>
                        );
                      }

                      if (linha.startsWith("- ")) {
                        return (
                          <li
                            key={index}
                            className="ml-6 text-[#d4d4d8] leading-8"
                            style={{ pageBreakInside: "avoid" }}
                          >
                            {linha.replace("- ", "")}
                          </li>
                        );
                      }

                      return (
                        <p
                          key={index}
                          className="text-[#d4d4d8] leading-8"
                          style={{ pageBreakInside: "avoid" }}
                        >
                          {linha}
                        </p>
                      );
                    })}

                  </div>
                ) : (
                  <p className="text-[#71717a]">
                    Nenhuma análise gerada ainda.
                  </p>
                )}

              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}