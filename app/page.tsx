"use client";

import { useRef, useState } from "react";

let html2pdf: any;

export default function Home() {
  const [empresa, setEmpresa] = useState("");
  const [cidade, setCidade] = useState("");
  const [categoria, setCategoria] = useState("");
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  const pdfRef = useRef<HTMLDivElement>(null);

  const [checks, setChecks] = useState({
    apareceGoogle: false,
    apareceTop10: false,
    keywordsPrincipais: false,

    descricaoOtimizada: false,
    botaoWhatsapp: false,
    categoriasCorretas: false,
    horarioPreenchido: false,

    respondeAvaliacoes: false,
    avaliacoesRecentes: false,
    quantidadeBoa: false,

    fazPostagens: false,
    fotosRecentes: false,
    perfilAtualizado: false,

    usaKeywords: false,
    cidadeDescricao: false,
  });

  const pesos = {
    apareceGoogle: 10,
    apareceTop10: 20,
    keywordsPrincipais: 15,

    descricaoOtimizada: 5,
    botaoWhatsapp: 5,
    categoriasCorretas: 3,
    horarioPreenchido: 2,

    respondeAvaliacoes: 10,
    avaliacoesRecentes: 10,
    quantidadeBoa: 10,

    fazPostagens: 10,
    fotosRecentes: 5,
    perfilAtualizado: 5,

    usaKeywords: 3,
    cidadeDescricao: 2,
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
  const seoScore = Math.round(
  (
    Number(checks.usaKeywords) +
    Number(checks.cidadeDescricao) +
    Number(checks.keywordsPrincipais)
  ) / 3 * 100
);

const avaliacaoScore = Math.round(
  (
    Number(checks.respondeAvaliacoes) +
    Number(checks.avaliacoesRecentes) +
    Number(checks.quantidadeBoa)
  ) / 3 * 100
);

const engajamentoScore = Math.round(
  (
    Number(checks.fazPostagens) +
    Number(checks.fotosRecentes) +
    Number(checks.perfilAtualizado)
  ) / 3 * 100
);

const perfilScore = Math.round(
  (
    Number(checks.descricaoOtimizada) +
    Number(checks.botaoWhatsapp) +
    Number(checks.categoriasCorretas) +
    Number(checks.horarioPreenchido)
  ) / 4 * 100
);

  function getStatus() {
    if (score <= 40) return "Nível Crítico";

    if (score <= 70) return "Nível Intermediário";

    return "Nível Avançado";
  }

  async function baixarPDF() {
    if (!pdfRef.current) return;

    if (!html2pdf) {
      html2pdf = (await import("html2pdf.js")).default;
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
  seoScore,
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
      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <section className="mb-14">

          <div className="inline-block bg-[#18181b] border border-[#27272a] px-4 py-2 rounded-full text-sm text-[#d4d4d8] mb-6">
            Sistema Inteligente de Auditoria GMN
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight max-w-5xl mb-6">
            Gere laudos profissionais para Google Meu Negócio
          </h1>

          <p className="text-[#a1a1aa] text-xl max-w-3xl leading-relaxed">
            Analise perfis, identifique problemas estratégicos e aumente seus fechamentos
          </p>

        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* FORM */}
          <div className="bg-[#18181b] border border-[#27272a] rounded-3xl p-8">

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

              {/* POSICIONAMENTO */}
              <div className="pt-6">

                <h3 className="text-2xl font-bold mb-4">
                  Posicionamento
                </h3>

                <div className="space-y-3">

                  <Checkbox
                    label="Aparece no Google"
                    checked={checks.apareceGoogle}
                    onClick={() => toggleCheck("apareceGoogle")}
                  />

                  <Checkbox
                    label="Aparece no Top 10"
                    checked={checks.apareceTop10}
                    onClick={() => toggleCheck("apareceTop10")}
                  />

                  <Checkbox
                    label="Aparece nas palavras-chave principais"
                    checked={checks.keywordsPrincipais}
                    onClick={() => toggleCheck("keywordsPrincipais")}
                  />

                </div>

              </div>

              {/* PERFIL */}
              <div className="pt-8">

                <h3 className="text-2xl font-bold mb-4">
                  Perfil
                </h3>

                <div className="space-y-3">

                  <Checkbox
                    label="Possui descrição otimizada"
                    checked={checks.descricaoOtimizada}
                    onClick={() => toggleCheck("descricaoOtimizada")}
                  />

                  <Checkbox
                    label="Possui botão do WhatsApp"
                    checked={checks.botaoWhatsapp}
                    onClick={() => toggleCheck("botaoWhatsapp")}
                  />

                  <Checkbox
                    label="Categorias estão corretas"
                    checked={checks.categoriasCorretas}
                    onClick={() => toggleCheck("categoriasCorretas")}
                  />

                  <Checkbox
                    label="Horário preenchido corretamente"
                    checked={checks.horarioPreenchido}
                    onClick={() => toggleCheck("horarioPreenchido")}
                  />

                </div>

              </div>

              {/* AVALIAÇÕES */}
              <div className="pt-8">

                <h3 className="text-2xl font-bold mb-4">
                  Avaliações
                </h3>

                <div className="space-y-3">

                  <Checkbox
                    label="Responde avaliações dos clientes"
                    checked={checks.respondeAvaliacoes}
                    onClick={() => toggleCheck("respondeAvaliacoes")}
                  />

                  <Checkbox
                    label="Possui avaliações recentes"
                    checked={checks.avaliacoesRecentes}
                    onClick={() => toggleCheck("avaliacoesRecentes")}
                  />

                  <Checkbox
                    label="Quantidade de avaliações é boa"
                    checked={checks.quantidadeBoa}
                    onClick={() => toggleCheck("quantidadeBoa")}
                  />

                </div>

              </div>

              {/* ATIVIDADE */}
              <div className="pt-8">

                <h3 className="text-2xl font-bold mb-4">
                  Atividade
                </h3>

                <div className="space-y-3">

                  <Checkbox
                    label="Faz postagens regularmente"
                    checked={checks.fazPostagens}
                    onClick={() => toggleCheck("fazPostagens")}
                  />

                  <Checkbox
                    label="Possui fotos recentes"
                    checked={checks.fotosRecentes}
                    onClick={() => toggleCheck("fotosRecentes")}
                  />

                  <Checkbox
                    label="Perfil atualizado regularmente"
                    checked={checks.perfilAtualizado}
                    onClick={() => toggleCheck("perfilAtualizado")}
                  />

                </div>

              </div>

              {/* SEO */}
              <div className="pt-8">

                <h3 className="text-2xl font-bold mb-4">
                  SEO Local
                </h3>

                <div className="space-y-3">

                  <Checkbox
                    label="Usa palavras-chave estratégicas"
                    checked={checks.usaKeywords}
                    onClick={() => toggleCheck("usaKeywords")}
                  />

                  <Checkbox
                    label="Cidade presente na descrição"
                    checked={checks.cidadeDescricao}
                    onClick={() => toggleCheck("cidadeDescricao")}
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

      seoScore: String(seoScore),
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