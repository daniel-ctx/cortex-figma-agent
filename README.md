# Figma Screen Builder — Cortex Geofusion

Agente Claude Code para criar e editar telas do app Geofusion no Figma,
usando o design system Cortex como base.

---

## Setup em 5 passos

### 1. Instalar o Claude Code
```bash
npm install -g @anthropic/claude-code
```

### 2. Gerar o token do Figma
1. Acesse figma.com → Settings → Security → Personal access tokens
2. Clique em **Generate new token**
3. Nome sugerido: `claude-code-geofusion`
4. Escopos obrigatórios:
   - ✅ `file_content:write`
   - ✅ `files:write`
   - ✅ `file_comments:write`
5. Copie o token gerado (aparece apenas uma vez)

### 3. Criar o arquivo de trabalho no Figma
1. Acesse o projeto Geofusion:
   https://www.figma.com/files/team/949730096562549618/project/284089424
2. Clique em **+ New design file**
3. Renomeie para: `[GEO] Screen Builder — Rascunhos`
4. Copie o file ID da URL:
   `figma.com/design/`**FILE_ID**`/nome-do-arquivo`

### 4. Configurar variáveis de ambiente
```bash
cp .env.example .env
```
Edite `.env` e preencha:
- `FIGMA_ACCESS_TOKEN` — token gerado no passo 2
- `FIGMA_WORKING_FILE_ID` — file ID copiado no passo 3

### 5. Rodar o Claude Code
```bash
cd figma-bot-geofusion
claude
```

O agente lê o `CLAUDE.md` automaticamente e está pronto para receber demandas.

---

## Estrutura do projeto

```
figma-bot-geofusion/
├── CLAUDE.md              # Instruções persistentes do agente (fonte da verdade)
├── .mcp.json              # Configuração do MCP do Figma para Claude Code
├── .env.example           # Template de variáveis de ambiente
├── .env                   # Suas credenciais (não commitar — adicione ao .gitignore)
├── prompts-de-teste.md    # Prompts para validar o setup antes de usar em produção
└── README.md              # Este arquivo
```

---

## Primeiro uso — sequência recomendada

Após o setup, valide com os prompts de nível 1 antes de partir para demandas reais:

```
Leia o arquivo DSR GUI Components e liste os 10 componentes mais relevantes
para telas de análise de dados geoespaciais.
```

Se o agente listar componentes reais do design system, o setup está correto.
Se retornar erro ou componentes genéricos, verifique o token e o file ID.

Veja mais testes em `prompts-de-teste.md`.

---

## Como usar no dia a dia

Descreva a demanda em linguagem natural. O agente vai:
1. Confirmar o entendimento
2. Ler os arquivos de referência
3. Gerar 2–3 variações arquiteturalmente distintas no Figma
4. Documentar o racional em sticky notes

Você escolhe a melhor variação e continua o trabalho no Figma.

### Exemplos de prompt
```
Crie uma tela de configuração de relatório recorrente para o Geofusion.
O usuário define: frequência (diária/semanal/mensal), métricas incluídas,
formato de exportação e destinatários do email.
```

```
Aqui está o PRD da funcionalidade de comparação de períodos [cole o PRD].
Gere 3 variações de tela para o fluxo principal.
```

```
A tela de onboarding do Geofusion precisa ser revisada. Acesse a versão atual
no projeto e proponha 2 variações melhoradas, com foco em reduzir a fricção
no primeiro acesso.
```

---

## Importante

- O agente **nunca edita** os arquivos de referência (DSR, Icons, Identidade)
- Todas as criações vão para o arquivo `[GEO] Screen Builder — Rascunhos`
- Mantenha o `.env` fora do controle de versão (adicione ao `.gitignore`)
