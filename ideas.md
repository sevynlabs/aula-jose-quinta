# Direção de Design — Escola de Incorporadores

## Três abordagens consideradas

### 1. Caderno de Viabilidade
**Very Brief Intro:** Uma página que se comporta como um memorando executivo de incorporação: escura, precisa, arquitetônica e orientada a decisão. Traduz a passagem de obra isolada para operação estruturada sem recorrer ao visual de lançamento digital.

**Probability:** 0.03

### 2. Patrimônio em Movimento
**Very Brief Intro:** Uma direção editorial clara, em off-white e grafite, inspirada em relatórios de investimento imobiliário impressos. O foco seria a serenidade de uma marca patrimonial, com fotografias amplas e detalhes materiais.

**Probability:** 0.07

### 3. Operação Noturna
**Very Brief Intro:** Uma leitura mais tecnológica de dados e operação, com fundo profundo, linhas luminosas discretas e diagramas dinâmicos. Teria mais energia, mas é menos coerente com uma aula executiva de incorporação.

**Probability:** 0.01

---

## Abordagem escolhida: Caderno de Viabilidade

### Design Movement
**Editorialismo arquitetônico contemporâneo**, com referências em memoriais de incorporação, cadernos de viabilidade e publicações de arquitetura corporativa. A interface deve transmitir o nível de precisão necessário para estruturar negócios imobiliários, e não a estética de uma página genérica de infoproduto.

### Core Principles
1. **Decisão antes de decoração:** cada elemento visual deve ajudar a explicar a transição de obra para negócio.
2. **Ritmo documental:** a página terá marcadores, numeração e divisões que fazem cada seção parecer uma parte de um dossiê executivo.
3. **Contraste de escala:** títulos de impacto, corpo de leitura contido e diagramas largos para transformar ideias complexas em leitura imediata.
4. **Materialidade sóbria:** vidro fumê, papel off-white, linhas técnicas e dourado fosco criam profundidade sem ostentação.

### Color Philosophy
O **azul-petróleo quase preto** funciona como espaço de concentração e reforça o caráter executivo; o **off-white mineral** abre áreas de leitura e torna a copy respirável. O **dourado antigo** entra somente como marcação de valor, trajeto e ação — nunca como brilho decorativo. O contraste não é luxuoso por excesso: é o vocabulário visual de uma operação séria.

### Layout Paradigm
Em vez de blocos centralizados repetidos, a página seguirá uma **espinha vertical editorial**. Em desktop, uma faixa lateral fina exibe a sequência conceitual da aula; o conteúdo se abre em composições desalinhadas, com títulos em uma margem e argumentos/diagramas invadindo a outra. Em mobile, essa espinha se torna um marcador de progresso discreto e o conteúdo se empilha com leitura rápida.

### Signature Elements
1. **Linhas de viabilidade:** fios dourados finos que conectam etapas, números e CTAs.
2. **Carimbos de dossiê:** pequenos rótulos como “01 — diagnóstico” e “aula executiva”, em caixa alta e grande espaçamento.
3. **Diagramas de ciclo:** fluxos simplificados, com setas sequenciais e módulos retangulares, para tornar visível a diferença entre obra única e incorporação.

### Interaction Philosophy
Cada interação deve reforçar clareza e controle: botões ficam mais densos ao toque, o FAQ abre como páginas de um caderno e os diagramas respondem com deslocamentos mínimos. Não haverá efeitos chamativos, contadores ou movimentos que disputem atenção com a decisão de inscrição.

### Animation
Entradas ocorrem por opacidade e deslocamento vertical curto, em cascata de 50 ms, com a curva `cubic-bezier(0.23, 1, 0.32, 1)`. Linhas de diagrama podem revelar-se uma única vez ao entrar na área visível. Botões têm resposta de escala de 0,97 no clique. Todo movimento não essencial será desativado para preferências de redução de movimento.

### Typography System
**DM Sans** será a família de leitura: funcional, precisa e muito legível em telas pequenas. **Libre Baskerville** será usada em momentos estratégicos, como a segunda parte de headlines e frases de tese, para adicionar gravidade sem comprometer objetividade. Títulos em DM Sans 700/800, labels em DM Sans 600 com tracking amplo, e texto corrido em DM Sans 400/500. Nunca usar Inter.

### Brand Essence
**Uma aula executiva para construtores que querem transformar capacidade de execução em raciocínio de incorporação.**

Personalidade: **estruturada, ambiciosa, sóbria**.

### Brand Voice
A voz é direta e experiente, como um incorporador que respeita a inteligência de outro empresário. Headline e CTA devem convidar à análise, não pressionar ou prometer resultado. Microcopy é objetiva, sem superlativos vazios.

> “A obra é uma etapa. A operação inteira é o negócio.”

> “Entenda o que muda antes de decidir construir de novo.”

### Wordmark & Logo
O wordmark será composto por uma **barra vertical dourada** e uma construção tipográfica em duas linhas: “ESCOLA” em caixa alta compacta e “de Incorporadores” em serifada editorial. O ícone é uma abstração geométrica de dois volumes arquitetônicos que se conectam por uma linha de implantação — sinalizando estrutura, não ornamento.

### Signature Brand Color
**Ouro de Implantação — #C4A26A.** Um dourado fechado, de aspecto mineral, utilizado como assinatura de rota, marca e chamada para ação.

## Style Decisions

As páginas de inscrição e confirmação seguem o mesmo sistema de dossiê: rótulos de protocolo, etapas numeradas, linhas técnicas e contraste entre azul-petróleo, off-white mineral e Ouro de Implantação. O lockup institucional sempre combina a barra vertical dourada, o ícone geométrico e o wordmark em duas linhas. A seção de inscrição funciona como uma ficha executiva, com hierarquia documental e ação dourada contida. Informações factuais indisponíveis não são inventadas: são enquadradas em linguagem operacional neutra até que dados confirmados sejam fornecidos.
