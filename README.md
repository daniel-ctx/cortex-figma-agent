# Cortex Figma Agent

Agente Claude Code para criação autônoma de telas no Figma para todas as ofertas Cortex.

A partir de um prompt, PRD ou descrição, o agente lê o design system, consulta telas
existentes da oferta e gera 2–3 variações de tela com qualidade de produção diretamente
no Figma — sem abrir o Figma, sem arrastar componente, sem montar frame.

**Ofertas suportadas:** Geofusion · Growth · Brand · Reach · Outros

---

## Pré-requisitos

| Requisito | Versão mínima | Como obter |
|---|---|---|
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| Claude Code CLI | última | `npm install -g @anthropic/claude-code` |
| Conta Anthropic | — | [console.anthropic.com](https://console.anthropic.com) |
| Acesso ao time Figma Cortex | — | Solicite ao admin do Figma da Cortex |

---

## Setup

### 1. Clonar o repositório

```bash
git clone https://github.com/daniel-ctx/cortex-figma-agent.git
cd cortex-figma-agent
```

### 2. Instalar o Claude Code

```bash
npm install -g @anthropic/claude-code
claude --version   # confirma a instalação
```

Faça login na primeira vez:

```bash
claude
```

O terminal vai abrir o browser para autenticação na conta Anthropic. Após o login, feche
com `Ctrl+C` — você vai iniciar de dentro da pasta do projeto no próximo passo.

### 3. Gerar o token do Figma

1. Acesse **figma.com → clique no avatar (canto superior direito) → Settings → Security**
2. Role até **Personal access tokens** → clique em **Generate new token**
3. Nome sugerido: `cortex-figma-agent`
4. Selecione os escopos obrigatórios:
   - ✅ `file_content:write`
   - ✅ `files:write`
   - ✅ `file_comments:write`
5. Clique em **Generate token** e copie o valor — **ele aparece apenas uma vez**

### 4. Criar os arquivos de trabalho no Figma

O agente precisa de um arquivo de rascunhos por oferta para depositar as telas geradas.
Crie apenas para as ofertas que você vai usar (não precisa criar todos de uma vez).

Para cada oferta:

1. Acesse o link do projeto abaixo
2. Clique em **+ New design file**
3. Renomeie o arquivo conforme a coluna "Nome"

| Oferta | Projeto | Nome do arquivo |
|---|---|---|
| Geofusion | [abrir](https://www.figma.com/files/project/284089424) | `[GEO] Screen Builder — Rascunhos` |
| Growth | [abrir](https://www.figma.com/files/project/43838342) | `[GRO] Screen Builder — Rascunhos` |
| Brand | [abrir](https://www.figma.com/files/project/61425821) | `[BRA] Screen Builder — Rascunhos` |
| Reach | [abrir](https://www.figma.com/files/project/255743376) | `[REA] Screen Builder — Rascunhos` |
| Outros | [abrir](https://www.figma.com/files/project/43713678) | `[OUT] Screen Builder — Rascunhos` |

Após criar cada arquivo, copie o **file ID** da URL:

```
figma.com/design/ ← ESTE TRECHO É O FILE ID → /nome-do-arquivo
```

### 5. Configurar as variáveis de ambiente

```bash
cp .env.example .env
```

Abra `.env` e preencha os campos em branco:

```bash
# Obrigatório — token gerado no passo 3
FIGMA_ACCESS_TOKEN=fig_xxxxxxxxxxxxxxxxxxxx

# File IDs dos arquivos de trabalho — cole o ID de cada arquivo criado no passo 4
FIGMA_GEO_WORKING_FILE_ID=
FIGMA_GRO_WORKING_FILE_ID=
FIGMA_BRA_WORKING_FILE_ID=
FIGMA_REA_WORKING_FILE_ID=
FIGMA_OUT_WORKING_FILE_ID=
```

Os demais valores (`FIGMA_TEAM_ID`, `FIGMA_*_PROJECT_ID`, `FIGMA_DSR_FILE_ID`, etc.)
já estão preenchidos no `.env.example` — não altere.

### 6. Iniciar o agente

```bash
cd cortex-figma-agent
export $(grep -v '^#' .env | grep -v '^$' | xargs) && claude
```

O agente carrega o `CLAUDE.md` automaticamente e está pronto.

> **Dica:** adicione um alias no seu `.zshrc` ou `.bashrc` para não precisar lembrar do comando:
> ```bash
> alias figma-agent='cd ~/path/to/cortex-figma-agent && export $(grep -v "^#" .env | grep -v "^$" | xargs) && claude'
> ```

---

## Validando o setup

Antes de usar em demandas reais, confirme que o agente consegue ler os arquivos de referência:

```
Leia o arquivo DSR GUI Components e liste os 5 componentes mais relevantes
para telas de dashboard.
```

**Resultado esperado:** lista de componentes reais do DSR (ex: Table, Button, Tab Group, Input Text).

**Se retornar erro ou componentes genéricos:** verifique se `FIGMA_ACCESS_TOKEN` está correto
e se foi exportado no shell antes de iniciar o Claude (`export ...`).

Mais testes de validação em [`prompts-de-teste.md`](./prompts-de-teste.md).

---

## Como usar

Descreva a demanda em linguagem natural. Especifique a oferta se não estiver óbvio pelo contexto.

O agente vai:
1. Identificar a oferta e confirmar o entendimento
2. Ler o design system (DSR, ícones, tokens de identidade)
3. Consultar telas existentes da oferta como referência
4. Propor 2–3 variações arquiteturalmente distintas
5. Criar os frames no arquivo `[SIGLA] Screen Builder — Rascunhos` da oferta
6. Documentar o racional em sticky notes ao lado de cada variação

### Exemplos de prompt por oferta

**Geofusion**
```
Crie 2 variações de tela para o fluxo de criação de alerta de mobilidade.
O usuário define: área geográfica, tipo de evento, threshold e canal de notificação.
```

**Growth**
```
Preciso de uma tela de resultados de prospecção. O usuário vê uma lista de leads
ranqueados com filtros por segmento, região e porte de empresa. Score visual por linha.
```

**Brand**
```
Crie uma tela de comparativo de pontos de mídia OOH. O usuário seleciona até 3 pontos
e vê lado a lado: audiência estimada, perfil demográfico e custo por impacto.
```

**Reach**
```
O dashboard principal do Reach precisa de revisão. Acesse o arquivo mais recente
do projeto e proponha 2 variações com melhor hierarquia de KPIs e filtros.
```

**Com PRD**
```
[Cole o PRD ou user stories aqui]
Oferta: Growth. Gere 3 variações para o fluxo principal descrito acima.
```

---

## Estrutura do repositório

```
cortex-figma-agent/
├── CLAUDE.md              # Instruções persistentes do agente (não edite sem intenção)
├── OFFERINGS.md           # Contexto sobre cada oferta Cortex
├── README.md              # Este arquivo
├── prompts-de-teste.md    # Suite de testes para validar o setup
├── .mcp.json              # Configuração do servidor MCP do Figma
├── .env.example           # Template de variáveis de ambiente
├── .env                   # Suas credenciais (nunca commitar)
└── .claude/
    └── settings.local.json  # Permissões do Claude Code para este projeto
```

---

## Regras importantes

- O agente **nunca edita** os arquivos de referência (DSR, Icons, Identidade Cortex)
- O agente **nunca edita** os projetos das ofertas — apenas lê como referência
- Todas as criações vão para o arquivo `[SIGLA] Screen Builder — Rascunhos` da oferta
- Se um componente não existir no DSR, o agente cria localmente e anota `[COMPONENTE PENDENTE DSR]`
- Mantenha o `.env` fora do controle de versão (`.gitignore` já cuida disso)

---

## Problemas comuns

**Agente lista componentes genéricos, não do DSR**
→ O token do Figma não tem o escopo `file_content:write`. Regenere com os escopos corretos.

**"File not found" ao tentar criar no arquivo de trabalho**
→ A variável `FIGMA_*_WORKING_FILE_ID` está em branco ou incorreta. Verifique com:
```bash
echo $FIGMA_GEO_WORKING_FILE_ID
```

**MCP do Figma não carrega**
→ O token não foi exportado no shell antes de iniciar o Claude. Use sempre o comando completo do passo 6.

**"You don't have access to this file"**
→ Sua conta Figma não tem acesso ao time Cortex. Solicite ao admin do Figma da Cortex Intelligence.

**Agente não identifica a oferta corretamente**
→ Especifique a oferta explicitamente no prompt: "Para o Reach, crie uma tela de..."
