---
name: Luskas Pentest Portfolio
colors:
  background: "hsl(var(--background))"
  foreground: "hsl(var(--foreground))"
  card: "hsl(var(--card))"
  primary: "hsl(var(--primary))"
  secondary: "hsl(var(--secondary))"
  muted: "hsl(var(--muted))"
  accent: "hsl(var(--accent))"
  border: "hsl(var(--border))"
  destructive: "hsl(var(--destructive))"
typography:
  sans:
    fontFamily: "Inter, sans-serif"
  mono:
    fontFamily: "JetBrains Mono, monospace"
rounded:
  lg: "0.5rem"
  md: "6px"
  sm: "4px"
---

# Luskas Pentest Portfolio — Design System

## Overview
Um portfólio de desenvolvedor e pentester moderno, limpo e polido. Utiliza uma interface prioritariamente escura (dark mode) com alto contraste, fontes nítidas e detalhes em estilo terminal (JetBrains Mono). O design foca na legibilidade de relatórios de segurança, vulnerabilidades e projetos de desenvolvimento.

## Cores (Design Tokens)
* **Background (hsl(0 0% 3.9%)):** Fundo escuro profundo para foco visual e conforto.
* **Foreground (hsl(0 0% 98%)):** Branco brilhante/off-white para cabeçalhos e textos principais.
* **Primary (hsl(0 0% 98%)):** Cor branca usada como fundo em botões primários e abas ativas, com texto escuro em contraste.
* **Muted / Secondary (hsl(0 0% 63.9%)):** Tons cinza para textos secundários, descrições e ícones menos destacados.
* **Border (hsl(0 0% 14.9%)):** Bordas sutis para separar cards e seções sem pesar o visual.
* **Destructive (hsl(0 62.8% 30.6%)):** Tom avermelhado para rotular vetores de ataque, falhas críticas de segurança e avisos.

## Tipografia
* **Sans (Inter):** Fonte moderna e limpa para títulos, corpo de texto, navegação e descrições gerais.
* **Mono (JetBrains Mono):** Fonte monoespaçada para simulações de terminal (`~/`), vulnerabilidades, estatísticas e blocos de código.

## Formas & Geometria
* **Cantos Arredondados:** O raio padrão de cantos é `0.5rem` (8px) para cards estruturais, contêineres e caixas de diálogo.
* **Triggers e Elementos Internos:** Um arredondamento menor de `6px` ou `4px` é aplicado a abas, botões e tags para manter a proporção visual quando aninhados.
* **Elementos Fluídos:** As abas e a Navbar utilizam cantos arredondados contínuos e espaçamento interno consistente para manter a fluidez visual.

## Diretrizes de Uso
* **Simetria visual:** As abas devem seguir o padrão estético do restante do site (como na Galeria), usando o contêiner `bg-muted/50` e o seletor ativo em `bg-primary` com texto escuro para visibilidade máxima.
* **Sem cores chamativas aleatórias:** Evitar usar cores azuis, roxas ou verdes neon sem necessidade. O foco de contraste colorido deve ser o vermelho (`destructive`) para itens de segurança.
