import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      empresa,
      cidade,
      categoria,
      checks,
      score,
    } = body;

    const prompt = `
Você é um especialista premium em Google Meu Negócio, SEO Local e posicionamento estratégico para empresas locais.

Sua tarefa é gerar um laudo executivo profissional, estratégico, consultivo e altamente persuasivo sobre o perfil de uma empresa no Google Meu Negócio.

IMPORTANTE:
- Use linguagem simples, moderna e profissional
- Não use termos técnicos difíceis
- Não fale como robô
- Não escreva textos genéricos
- Explique os problemas de forma clara e estratégica
- Mostre oportunidades reais de crescimento
- Mostre impacto comercial e geração de clientes
- O objetivo do laudo é gerar percepção de valor e ajudar no fechamento comercial

A análise deve parecer feita por uma consultoria premium especializada em posicionamento local e crescimento estratégico para empresas.

A IA deve demonstrar:
- autoridade
- inteligência estratégica
- visão de mercado
- percepção comercial
- impacto em faturamento e geração de clientes

Evite análises superficiais.

Sempre explique:
- por que o problema é importante
- como isso impacta posicionamento
- como isso afeta conversão e geração de clientes
- qual oportunidade estratégica existe

As recomendações devem parecer estratégicas e valiosas, não apenas dicas genéricas.

DADOS DA EMPRESA:

Empresa: ${empresa}
Cidade: ${cidade}
Categoria: ${categoria}

Score atual do perfil: ${score}/100

CHECKLIST DA AUDITORIA:

POSICIONAMENTO
- Aparece no Google: ${checks.apareceGoogle ? "Sim" : "Não"}
- Aparece no Top 10: ${checks.apareceTop10 ? "Sim" : "Não"}
- Aparece nas palavras-chave principais: ${checks.keywordsPrincipais ? "Sim" : "Não"}

PERFIL
- Possui descrição otimizada: ${checks.descricaoOtimizada ? "Sim" : "Não"}
- Possui botão do WhatsApp: ${checks.botaoWhatsapp ? "Sim" : "Não"}
- Categorias estão corretas: ${checks.categoriasCorretas ? "Sim" : "Não"}
- Horário preenchido corretamente: ${checks.horarioPreenchido ? "Sim" : "Não"}

AVALIAÇÕES
- Responde avaliações dos clientes: ${checks.respondeAvaliacoes ? "Sim" : "Não"}
- Possui avaliações recentes: ${checks.avaliacoesRecentes ? "Sim" : "Não"}
- Quantidade de avaliações é boa: ${checks.quantidadeBoa ? "Sim" : "Não"}

ATIVIDADE
- Faz postagens regularmente: ${checks.fazPostagens ? "Sim" : "Não"}
- Possui fotos recentes: ${checks.fotosRecentes ? "Sim" : "Não"}
- Perfil atualizado regularmente: ${checks.perfilAtualizado ? "Sim" : "Não"}

SEO LOCAL
- Usa palavras-chave estratégicas: ${checks.usaKeywords ? "Sim" : "Não"}
- Cidade presente na descrição: ${checks.cidadeDescricao ? "Sim" : "Não"}

ESTRUTURA DO LAUDO:

# RESUMO EXECUTIVO

Faça um resumo estratégico e profissional da situação atual do perfil da empresa.

# PONTOS FORTES

Liste os principais pontos positivos encontrados no perfil.

# PROBLEMAS IDENTIFICADOS

Liste os principais problemas encontrados no perfil e explique o impacto estratégico de cada um deles.

# OPORTUNIDADES ESTRATÉGICAS

Mostre oportunidades estratégicas de crescimento, posicionamento local e geração de clientes.

# IMPACTO NO POSICIONAMENTO

Explique como o estado atual do perfil impacta:
- visibilidade local
- autoridade
- confiança
- conversão
- geração de clientes

# PRIORIDADES IMEDIATAS

Liste as ações mais importantes e urgentes que deveriam ser implementadas primeiro para aumentar visibilidade, autoridade e potencial de geração de clientes no Google.

# CONCLUSÃO ESTRATÉGICA

Finalize com uma conclusão executiva profissional sobre o potencial competitivo da empresa no Google Meu Negócio e oportunidades de crescimento.

IMPORTANTE:
- Use títulos exatamente nesse formato com #
- Use listas com bullets iniciados com -
- Não escreva tudo em bloco único
- Deixe o texto organizado
- O laudo deve parecer premium e profissional
- Não use emojis
- Não explique o que você está fazendo
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em SEO Local e Google Meu Negócio.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const resultado =
      response.choices[0].message.content || "Erro ao gerar análise.";

    return NextResponse.json({
      resultado,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      resultado: "Erro ao gerar análise.",
    });
  }
}