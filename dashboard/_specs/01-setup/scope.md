# Feature: Setup Base e Shadcn
Status: [x]

## O Que Fazer
- Inicializar o projeto caso não tenha componentes. O backend e o monorepo já existem, então você deve apenas rodar scripts na pasta `dashboard` ou escrever código de inicialização do vite caso a pasta esteja vazia.
- Instalar TailwindCSS v4, React Router, TanStack Query, Zustand, Axios, e Vitest.
- Instalar Shadcn CLI e adicionar componentes básicos brutalizados (Button, Input).

## Limites
- Não construir páginas de regra de negócio, apenas a infra.

## Critérios de Aceite
- Tailwind e React operando.
- Telas base sem arredondamentos padrão do tailwind.
- Componente `Button` customizado para o estilo Brutalista (linhas retas, fundo vermelho/preto).

## Comandos de Validação
`npm run test` (Crie um teste básico para o App).
