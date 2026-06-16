import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    paddingTop: 36,
    paddingBottom: 48,
    paddingHorizontal: 40,
    fontSize: 10,
    color: "#1a1a1a",
    },
  headerBadge: {
    backgroundColor: "#000000",
    color: "#ffffff",
    fontSize: 8,
    fontWeight: 700,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 14,
    letterSpacing: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 18,
  },
  headerPhoto: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  headerName: {
    fontSize: 16,
    fontWeight: 900,
    color: "#000000",
  },
  headerSubtitle: {
    fontSize: 9,
    color: "#52525b",
    marginTop: 3,
    lineHeight: 1.5,
  },
  empresaNome: {
    fontSize: 28,
    fontWeight: 900,
    color: "#000000",
    marginBottom: 4,
  },
  empresaMeta: {
    fontSize: 11,
    color: "#71717a",
    marginBottom: 4,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
    marginVertical: 18,
  },
  scoreBox: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  scoreLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: "#64748b",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  scoreNumber: {
    fontSize: 52,
    fontWeight: 900,
    color: "#000000",
    lineHeight: 1,
    marginBottom: 8,
  },
  scoreDesc: {
    fontSize: 9,
    color: "#64748b",
    lineHeight: 1.6,
    maxWidth: 320,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    padding: 10,
  },
  metricLabel: {
    fontSize: 7,
    fontWeight: 700,
    color: "#64748b",
    letterSpacing: 1,
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 900,
    color: "#000000",
    marginBottom: 6,
  },
  barBg: {
    height: 5,
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
  },
  barFill: {
    height: 5,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 900,
    color: "#000000",
    marginBottom: 12,
    marginTop: 4,
  },
  competBox: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  competRow: {
    marginBottom: 14,
  },
  competHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  competLabel: {
    fontSize: 10,
    fontWeight: 700,
  },
  competValue: {
    fontSize: 12,
    fontWeight: 900,
  },
  diffBox: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    padding: 14,
    marginTop: 8,
  },
  diffLabel: {
    fontSize: 7,
    fontWeight: 700,
    color: "#71717a",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  diffValue: {
    fontSize: 28,
    fontWeight: 900,
    color: "#000000",
    marginBottom: 6,
  },
  diffDesc: {
    fontSize: 9,
    color: "#52525b",
    lineHeight: 1.6,
  },
  cardVerde: {
    backgroundColor: "#dcfce7",
    borderWidth: 1,
    borderColor: "#bbf7d0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  cardVermelho: {
    backgroundColor: "#fee2e2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  cardAmarelo: {
    backgroundColor: "#fef9c3",
    borderWidth: 1,
    borderColor: "#fef08a",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  cardAzul: {
    backgroundColor: "#dbeafe",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  cardCinza: {
    backgroundColor: "#f4f4f5",
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  cardTag: {
    fontSize: 7,
    fontWeight: 900,
    letterSpacing: 1.2,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 9,
    lineHeight: 1.7,
  },
  paragraph: {
    fontSize: 9,
    color: "#3f3f46",
    lineHeight: 1.7,
    marginBottom: 6,
  },
  iaSection: {
    fontSize: 13,
    fontWeight: 900,
    color: "#000000",
    marginTop: 16,
    marginBottom: 8,
  },
  ctaBox: {
    backgroundColor: "#000000",
    borderRadius: 16,
    padding: 24,
    marginTop: 8,
    marginBottom: 20,
  },
  ctaTag: {
    fontSize: 8,
    fontWeight: 700,
    color: "#22c55e",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 900,
    color: "#ffffff",
    lineHeight: 1.3,
    marginBottom: 10,
  },
  ctaDesc: {
    fontSize: 9,
    color: "#a1a1aa",
    lineHeight: 1.7,
    marginBottom: 14,
  },
  ctaLink: {
    fontSize: 10,
    fontWeight: 700,
    color: "#22c55e",
  },
  footerDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
    marginTop: 20,
    marginBottom: 16,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  footerLabel: {
    fontSize: 7,
    color: "#71717a",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  footerName: {
    fontSize: 13,
    fontWeight: 900,
    color: "#000000",
    marginBottom: 3,
  },
  footerSub: {
    fontSize: 8,
    color: "#52525b",
    lineHeight: 1.5,
    textAlign: "right",
  },
});

function getBarColor(v: number) {
  if (v <= 40) return "#ef4444";
  if (v <= 70) return "#f59e0b";
  return "#22c55e";
}

function getStatusLabel(score: number) {
  if (score <= 40) return "Nível Crítico";
  if (score <= 70) return "Nível Intermediário";
  return "Nível Avançado";
}

function getStatusColors(score: number) {
  if (score <= 40) return { bg: "#fee2e2", color: "#991b1b" };
  if (score <= 70) return { bg: "#fef3c7", color: "#92400e" };
  return { bg: "#dcfce7", color: "#166534" };
}

interface Props {
  empresa: string;
  cidade: string;
  categoria: string;
  score: number;
  seoScore: number;
  avaliacaoScore: number;
  engajamentoScore: number;
  perfilScore: number;
  resultado: string;
  data: string;
}

export function LaudoPDF({
  empresa,
  cidade,
  categoria,
  score,
  seoScore,
  avaliacaoScore,
  engajamentoScore,
  perfilScore,
  resultado,
  data,
}: Props) {
  const statusColors = getStatusColors(score);
  const linhas = resultado
  .split("\n")
  .map((l) => l.replace(/\*\*/g, ""));
  let secaoAtual = "";

  function getCardStyle(secao: string) {
  if (secao.includes("DIAGNOSTICO")) return s.cardVerde;
  if (secao.includes("LIMITANDO")) return s.cardVermelho;
  if (secao.includes("GANHO")) return s.cardAmarelo;
  if (secao.includes("IMPACTO")) return s.cardCinza;
  if (secao.includes("PLANO")) return s.cardAzul;
  if (secao.includes("POTENCIAL")) return s.cardCinza;
  return s.cardCinza;
}

  function getCardTagColor(secao: string) {
  if (secao.includes("DIAGNOSTICO")) return "#166534";
  if (secao.includes("LIMITANDO")) return "#991b1b";
  if (secao.includes("GANHO")) return "#92400e";
  if (secao.includes("IMPACTO")) return "#3f3f46";
  if (secao.includes("PLANO")) return "#1d4ed8";
  return "#3f3f46";
}

  function getCardTagLabel(secao: string) {
  if (secao.includes("DIAGNOSTICO")) return "OTIMIZADO";
  if (secao.includes("LIMITANDO")) return "CRITICO";
  if (secao.includes("GANHO")) return "OPORTUNIDADE";
  if (secao.includes("IMPACTO")) return "INFO";
  if (secao.includes("PLANO")) return "PRIORIDADE";
  return "INFO";
}

  return (
    <Document>
      <Page size="A4" style={s.page}>

        <Text style={s.headerBadge}>AUDITORIA GOOGLE MEU NEGOCIO</Text>

        <View style={s.headerRow}>
          <Image src="patrick.png" style={s.headerPhoto} />
          <View>
            <Text style={s.headerName}>Patrick Gestor</Text>
            <Text style={s.headerSubtitle}>
              Especialista em Google Meu Negocio,{"\n"}
              SEO Local e Posicionamento Estrategico
            </Text>
          </View>
        </View>

        <Text style={s.empresaNome}>{empresa}</Text>
        <Text style={s.empresaMeta}>{cidade} • {categoria}</Text>
        <View style={s.divider} />

        <View style={s.scoreBox}>
          <Text style={s.scoreLabel}>PERFORMANCE GERAL</Text>
          <Text style={s.scoreNumber}>{score}/100</Text>
          <View style={{
            backgroundColor: statusColors.bg,
            paddingVertical: 4,
            paddingHorizontal: 12,
            borderRadius: 20,
            alignSelf: "flex-start",
            marginBottom: 10,
          }}>
            <Text style={{ fontSize: 9, fontWeight: 700, color: statusColors.color }}>
              {getStatusLabel(score)}
            </Text>
          </View>
          <Text style={s.scoreDesc}>
            Esta auditoria identifica os principais pontos estrategicos do perfil
            da empresa no Google Meu Negocio, destacando oportunidades de crescimento,
            autoridade local e melhorias de posicionamento.
          </Text>
          <View style={{
  width: 100,
  height: 100,
  borderRadius: 50,
  borderWidth: 8,
  borderColor: score <= 40 ? "#ef4444" : score <= 70 ? "#f59e0b" : "#22c55e",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "flex-end",
  marginTop: -80,
}}>
  <Text style={{ fontSize: 22, fontWeight: 900, color: "#000000" }}>{score}</Text>
          <Text style={{ fontSize: 7, color: "#64748b", fontWeight: 700 }}>SCORE</Text>
        </View>
          <View style={s.metricsRow}>
            {[
              { label: "SEO LOCAL", value: seoScore },
              { label: "AVALIACOES", value: avaliacaoScore },
              { label: "ENGAJAMENTO", value: engajamentoScore },
              { label: "PERFIL", value: perfilScore },
            ].map(({ label, value }) => (
              <View key={label} style={s.metricCard}>
                <Text style={s.metricLabel}>{label}</Text>
                <Text style={s.metricValue}>{value}%</Text>
                <View style={s.barBg}>
                  <View style={[s.barFill, { width: `${value}%`, backgroundColor: getBarColor(value) }]} />
                </View>
              </View>
            ))}
          </View>

          {/* COMO CALCULAMOS */}
          <View style={{
            marginTop: 16,
            borderTopWidth: 1,
            borderTopColor: "#e2e8f0",
            paddingTop: 14,
          }}>
            <Text style={{
              fontSize: 7,
              fontWeight: 700,
              color: "#64748b",
              letterSpacing: 1.2,
              marginBottom: 10,
            }}>COMO CALCULAMOS A NOTA</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {[
                { label: "PERFIL", items: ["Descricao", "Categorias", "WhatsApp", "Horario"] },
                { label: "AVALIACOES", items: ["Quantidade", "Frequencia", "Respostas"] },
                { label: "ENGAJAMENTO", items: ["Postagens", "Fotos", "Atualizacoes"] },
                { label: "SEO LOCAL", items: ["Palavras-chave", "Relevancia local", "Posicionamento"] },
              ].map(({ label, items }) => (
                <View key={label} style={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  borderWidth: 1,
                  borderColor: "#e2e8f0",
                  borderRadius: 8,
                  padding: 8,
                }}>
                  <Text style={{
                    fontSize: 6,
                    fontWeight: 700,
                    color: "#64748b",
                    letterSpacing: 0.8,
                    marginBottom: 6,
                  }}>{label}</Text>
                  {items.map((item) => (
                    <View key={item} style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                      marginBottom: 3,
                    }}>
                      <View style={{
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: "#22c55e",
                      }} />
                      <Text style={{
                        fontSize: 6,
                        color: "#3f3f46",
                      }}>{item}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>

        </View>

        <View wrap={false}>
  <Text style={s.sectionTitle}>Posicionamento Competitivo</Text>
  <View style={s.competBox}>
    <View style={s.competRow}>
      <View style={s.competHeader}>
        <Text style={s.competLabel}>Sua Empresa</Text>
        <Text style={s.competValue}>{score}</Text>
      </View>
      <View style={s.barBg}>
        <View style={[s.barFill, { width: `${score}%`, backgroundColor: getBarColor(score) }]} />
      </View>
    </View>
    <View style={s.competRow}>
      <View style={s.competHeader}>
        <Text style={s.competLabel}>Media dos Concorrentes Locais</Text>
        <Text style={s.competValue}>78</Text>
      </View>
      <View style={s.barBg}>
        <View style={[s.barFill, { width: "78%", backgroundColor: "#22c55e" }]} />
      </View>
    </View>
    <View style={s.diffBox}>
      <Text style={s.diffLabel}>DIFERENCA COMPETITIVA</Text>
      <Text style={s.diffValue}>{score - 78}</Text>
      <Text style={s.diffDesc}>
        O perfil apresenta uma diferenca competitiva em relacao aos concorrentes
        locais da mesma categoria, impactando potencial de visibilidade,
        autoridade local e geracao de clientes no Google.
      </Text>
    </View>
  </View>
</View>


        {linhas.map((linha, index) => {
          if (linha.startsWith("# ")) {
            secaoAtual = linha.replace("# ", "");
            return <Text key={index} style={s.iaSection}>{secaoAtual}</Text>;
          }
          if (linha.startsWith("- ")) {
            const texto = linha.replace("- ", "");
            const cardStyle = getCardStyle(secaoAtual);
            const tagColor = getCardTagColor(secaoAtual);
            const tagLabel = getCardTagLabel(secaoAtual);
            return (
              <View key={index} style={cardStyle} wrap={false}>
                <Text style={[s.cardTag, { color: tagColor }]}>{tagLabel}</Text>
                <Text style={s.cardText}>{texto}</Text>
              </View>
            );
          }
          if (linha.trim() === "") return null;
          return <Text key={index} style={s.paragraph}>{linha}</Text>;
        })}

        {/* O QUE SERÁ FEITO */}
        <View style={{
          backgroundColor: "#f8fafc",
          borderWidth: 1,
          borderColor: "#e2e8f0",
          borderRadius: 16,
          padding: 20,
          marginTop: 8,
          marginBottom: 16,
        }} wrap={false}>
          <Text style={{
            fontSize: 8,
            fontWeight: 700,
            color: "#64748b",
            letterSpacing: 1.5,
            marginBottom: 12,
          }}>
           O QUE SERA FEITO
          </Text>
          <Text style={{
            fontSize: 13,
            fontWeight: 900,
            color: "#000000",
            marginBottom: 16,
          }}>
            Plano de Otimizacao Completo
          </Text>
          {[
            "Otimizacao da descricao com palavras-chave estrategicas",
            "Correcao e expansao das categorias do perfil",
            "Criacao de produtos e servicos no perfil",
            "Estrategia de captacao e resposta de avaliacoes",
            "Postagens estrategicas mensais",
            "Relatorio de evolucao mensal",
          ].map((item, i) => (
            <View key={i} style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 8,
              gap: 8,
            }}>
              <Text style={{
                fontSize: 10,
                color: "#22c55e",
                fontWeight: 900,
              }}>•</Text>
              <Text style={{
                fontSize: 9,
                color: "#1a1a1a",
                lineHeight: 1.5,
                flex: 1,
              }}>{item}</Text>
            </View>
          ))}
        </View>

       {/* CTA FINAL */}
        <View style={s.ctaBox} wrap={false}>
          <Text style={s.ctaTag}>OPORTUNIDADE ESTRATEGICA</Text>
          <Text style={s.ctaTitle}>
            Seu perfil possui oportunidades claras de crescimento no Google.
          </Text>
          <Text style={s.ctaDesc}>
            Com uma estrategia correta de posicionamento local, otimizacao do Google
            Meu Negocio e fortalecimento de autoridade, sua empresa pode aumentar
            significativamente sua visibilidade, geracao de clientes e
            competitividade local.
          </Text>
          <Link src="https://wa.me/5551994127283" style={{ textDecoration: "none" }}>
            <View style={{
              backgroundColor: "#22c55e",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 12,
              alignSelf: "flex-start",
              marginTop: 4,
            }}>
              <Text style={{ fontSize: 11, fontWeight: 900, color: "#000000" }}>
                Solicitar Plano de Otimizacao
              </Text>
            </View>
          </Link>
        </View>

        <View style={s.footerDivider} />
        <View style={s.footerRow}>
          <View>
            <Text style={s.footerLabel}>RELATORIO GERADO EM</Text>
            <Text style={s.footerName}>{data}</Text>
          </View>
          <View>
            <Text style={[s.footerName, { textAlign: "right" }]}>Patrick Gestor</Text>
            <Text style={s.footerSub}>
              Especialista em Google Meu Negocio{"\n"}
              SEO Local e Posicionamento Estrategico
            </Text>
          </View>
        </View>

      </Page>
    </Document>
  );
}