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
Você é Patrick, consultor especialista em Google Meu Negócio com mais de 5 anos de experiência ajudando empresas locais a crescerem no Google.

Você acabou de auditar o perfil de uma empresa e vai escrever seu laudo de forma direta, humana e honesta — como um consultor experiente falando com um dono de negócio, não como um robô gerando relatório.

REGRAS DE ESCRITA:
- Escreva como uma pessoa real, não como IA
- Seja direto e objetivo, sem enrolação
- Use frases curtas e simples
- Evite palavras corporativas como: "potencializar", "alavancar", "amplificar", "robusto", "ecossistema"
- Não repita as mesmas frases em seções diferentes
- Varie o vocabulário entre as seções
- Cada problema deve ter uma consequência prática e real para o negócio
- Fale de impacto em clientes e faturamento de forma concreta, não genérica
- Nunca comece a análise com "O perfil da empresa..." ou "O perfil do/da [nome]..."
- Não termine a conclusão com promessas vazias
- Seja específico para o segmento e cidade da empresa
- Escreva como um consultor estrategico falando direto com o dono do negocio, nunca como um auditor listando falhas tecnicas
- Para cada problema, explique: qual o impacto comercial, como isso reduz a geracao de clientes, como concorrentes podem estar se beneficiando dessa falha
- Evite frases genericas como "o perfil pode melhorar". Prefira frases como "isso pode fazer com que potenciais clientes escolham concorrentes mais ativos" ou "essa falha reduz as oportunidades de contato vindas do Google"
- O foco de toda a analise deve ser: geracao de clientes, autoridade local, competitividade e crescimento comercial
- A media de score dos concorrentes locais e 78 pontos. Se o score da empresa estiver abaixo, explique o impacto competitivo dessa diferenca. Se estiver acima, destaque a vantagem competitiva existente
- Na conclusão "POTENCIAL DE CRESCIMENTO", nunca termine com frases como "É hora de agir", "Aproveite as oportunidades", "Transforme seu perfil" — seja específico sobre o que muda na prática
- Na "ANALISE DETALHADA", não comece citando o nome da empresa na primeira frase — comece com uma observação sobre o mercado, o score ou a situação

DADOS DA EMPRESA:
Empresa: ${empresa}
Cidade: ${cidade}
Categoria: ${categoria}
Score: ${score}/100

CHECKLIST:
VISIBILIDADE
- Aparece no Google quando pesquisa o nome: ${checks.apareceGoogle ? "Sim" : "Não"}
- Aparece no Maps quando pesquisa categoria + cidade: ${checks.apareceNoMaps ? "Sim" : "Não"}
- Esta entre os 3 primeiros do Maps: ${checks.entreTresPrimeiros ? "Sim" : "Não"}

PERFIL
- Possui descricao otimizada: ${checks.descricaoOtimizada ? "Sim" : "Não"}
- Categorias estao corretas: ${checks.categoriasCorretas ? "Sim" : "Não"}
- Possui botao do WhatsApp: ${checks.botaoWhatsapp ? "Sim" : "Não"}
- Horario preenchido corretamente: ${checks.horarioPreenchido ? "Sim" : "Não"}
- Possui produtos ou servicos cadastrados: ${checks.temProdutosServicos ? "Sim" : "Não"}

AVALIACOES
- Tem mais de 30 avaliacoes: ${checks.maisde30Avaliacoes ? "Sim" : "Não"}
- Possui avaliacoes recentes (ultimos 30 dias): ${checks.avaliacoesRecentes ? "Sim" : "Não"}
- Responde avaliacoes dos clientes: ${checks.respondeAvaliacoes ? "Sim" : "Não"}

ATIVIDADE
- Fez postagem nos ultimos 30 dias: ${checks.postagensRecentes ? "Sim" : "Não"}
- Possui fotos dos ultimos 3 meses: ${checks.fotosRecentes ? "Sim" : "Não"}
- Possui videos no perfil: ${checks.temVideos ? "Sim" : "Não"}

ESTRUTURA DO LAUDO — siga exatamente essa ordem e formato:

# ANALISE DETALHADA
Escreva 2 parágrafos curtos. Comece direto com uma observação sobre a situação atual da empresa no Google — nunca comece com "O perfil de...". Fale sobre o score de forma concreta: o que ele significa para o negócio na prática. Seja específico para o segmento e a cidade.

# DIAGNOSTICO EXECUTIVO
Liste apenas o que realmente está funcionando. Seja específico e direto. Se há poucos pontos positivos, liste poucos — não invente elogios.
Use bullets com -

# O QUE ESTA LIMITANDO O CRESCIMENTO
Para cada problema, escreva em uma frase o que está errado e em outra frase o impacto real disso no dia a dia do negócio. Pense em clientes perdidos, ligações que não chegam, concorrentes que ficam na frente.
Use bullets com -

# OPORTUNIDADES DE GANHO RAPIDO
Mostre ações concretas que podem mudar o cenário em pouco tempo. Seja específico para o segmento e a cidade. Nada genérico.
Use bullets com -

# OPORTUNIDADES PERDIDAS
Liste o que a empresa esta deixando de ganhar agora, hoje, por causa dos problemas identificados. Pense em buscas que ela nao aparece, clientes que estao indo para concorrentes, contatos que nao chegam. Seja concreto e use exemplos realistas do segmento e da cidade.
Use bullets com -

# IMPACTO NO POSICIONAMENTO
Explique de forma direta e com detalhe real como cada fator está sendo afetado. Não use frases de uma linha só — desenvolva cada ponto com pelo menos 2 frases.
- Visibilidade
- Autoridade
- Confiança
- Conversão
- Geração de clientes
Use bullets com -

# PLANO DE ACAO PRIORITARIO
Liste de 3 a 5 ações concretas em ordem de impacto. Cada ação deve ser específica, não genérica.
Use bullets com -

# POTENCIAL DE CRESCIMENTO
Escreva 1 parágrafo honesto. Diga onde a empresa está agora, o que precisa mudar e o que ela pode conquistar se agir. Seja realista — sem exageros e sem promessas vazias. Termine com algo que motive o dono a agir.

IMPORTANTE:
- Use os títulos exatamente com # como mostrado acima
- Use bullets com -
- Não use emojis
- Não explique o que você está fazendo
- Não use markdown como negrito
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é Patrick, um consultor experiente em Google Meu Negócio e SEO Local. Você escreve laudos de forma direta, humana e sem enrolação.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.85,
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