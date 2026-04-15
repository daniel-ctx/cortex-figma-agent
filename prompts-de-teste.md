# Prompts de teste — Figma Screen Builder

Use estes prompts na ordem sugerida para validar que o agente está
funcionando corretamente antes de partir para demandas reais.

---

## Nível 1 — Leitura e observação

### Teste 1.1 — Verificar acesso ao design system
```
Leia o arquivo DSR GUI Components e liste os 10 componentes mais relevantes
para telas de análise de dados geoespaciais. Para cada um, informe o nome
exato do componente e uma descrição de quando usá-lo.
```

### Teste 1.2 — Verificar acesso ao projeto Geofusion
```
Acesse o projeto Geofusion e liste os arquivos disponíveis. Para o arquivo
mais recente, descreva a estrutura de páginas e os principais padrões de
layout que você identificou.
```

### Teste 1.3 — Verificar tokens de identidade
```
Leia o arquivo Nova identidade Cortex e extraia:
- Paleta de cores principal com os hex codes
- Família tipográfica e escalas de tamanho
- Tokens de espaçamento definidos
```

---

## Nível 2 — Criação simples

### Teste 2.1 — Tela básica (modal)
```
Crie 2 variações de um modal de confirmação para a ação "Excluir área de
influência" no Geofusion. O modal deve ter título, descrição do impacto da
ação, e botões de cancelar e confirmar.

Use apenas componentes do DSR. Crie no arquivo de trabalho, em uma nova
página chamada "Teste — Modal exclusão — [data de hoje]".
```

### Teste 2.2 — Tela com dados
```
Crie 2 variações de um card de resumo de ponto de interesse (POI) para o
painel lateral do Geofusion. O card deve exibir: nome do POI, categoria,
endereço, e 3 métricas numéricas (fluxo mensal, raio de influência, score).

Use apenas componentes e ícones do design system Cortex.
```

---

## Nível 3 — Criação a partir de PRD

### Teste 3.1 — Tela a partir de requisitos
```
Você receberá o seguinte requisito funcional:

---
FUNCIONALIDADE: Filtro avançado de camadas do mapa
USUÁRIO: Analista de expansão
CONTEXTO: O usuário precisa filtrar múltiplas camadas de dados simultâneas
no mapa (ex: concorrentes, fluxo de pessoas, renda per capita) com controle
granular por categoria e faixa de valor.

REQUISITOS:
- Selecionar/deselecionar camadas individualmente
- Ajustar opacidade de cada camada (0–100%)
- Filtrar por faixa de valor em camadas numéricas
- Salvar configuração de filtros como preset
- Ver preview do impacto no mapa antes de aplicar

RESTRIÇÕES:
- Não pode cobrir mais de 30% da área do mapa
- Deve fechar ao clicar fora ou pressionar ESC
---

Gere 3 variações de tela para essa funcionalidade. Crie no arquivo de
trabalho em uma nova página chamada "Exploração — Filtro de camadas — [data]".
Para cada variação, adicione um sticky note com o racional de design.
```

---

## Nível 4 — Edição e iteração

### Teste 4.1 — Editar variação existente
```
Na página "Exploração — Filtro de camadas" que você criou, pegue a Variação A
e faça os seguintes ajustes:
- Aumente o padding interno dos itens de lista para 16px
- Adicione um estado de hover visível nos itens de camada
- Mova o botão "Salvar como preset" para o rodapé do painel, fixo
Mantenha a Variação A original intacta e crie uma cópia chamada "Variação A2 — ajustes".
```

### Teste 4.2 — Comparar com tela existente
```
Acesse uma tela de painel lateral existente no projeto Geofusion.
Compare com a Variação B do filtro de camadas que você criou e liste
3 inconsistências de padrão visual que precisam ser corrigidas.
Depois corrija-as na Variação B diretamente no Figma.
```

---

## Como usar estes testes

1. Execute os testes do Nível 1 primeiro — se falharem, há problema de
   configuração de token ou acesso aos arquivos
2. Só avance para Nível 2 após Nível 1 passar completamente
3. O Nível 3 é o teste real de qualidade — analise se as variações são
   genuinamente distintas e se os componentes foram usados corretamente
4. O Nível 4 valida o ciclo de iteração, que é onde o agente gera mais valor

## Sinais de que algo está errado

- Agente cria elementos sem usar componentes do DSR → token de leitura sem acesso
- Variações são cosmeticamente iguais → ajustar CLAUDE.md, seção de variações
- Layers sem nome → reforçar regra de nomenclatura no CLAUDE.md
- Agente não encontra o arquivo de trabalho → verificar FIGMA_WORKING_FILE_ID
