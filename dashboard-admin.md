# Projeto: Dashboard Admin (Vite)

## Visão Geral
Criação de um Dashboard SPA (Single Page Application) usando Vite para o monorepo, focado na administração dos relatórios e do portfólio. A UI seguirá um estilo escuro e anti-clichê (sem azul, sem roxo, sem templates genéricos), com estado gerenciado rigorosamente. Toda a execução será repassada ao `spec-driven-orchestrator`!

## Tipo de Projeto
WEB (Frontend SPA) - Uso exclusivo de `frontend-specialist`.

## Critérios de Sucesso
- Aplicação Vite rodando na pasta `dashboard` no monorepo.
- Tela de Login integrada (sem tela de registro).
- Tematização "Dark" imponente e premium, rejeitando os padrões azuis/roxos comuns da web.
- Testes unitários rodando rápido e liso (Vitest).
- Gerenciamento de estado dividido entre Server (TanStack Query) e Client (Zustand).

## Stack Tecnológico
- **Framework:** React + Vite + TypeScript (Sem overhead de SSR do Next).
- **Styling:** Tailwind CSS v4 (Layouts agressivos, sem "bento grids" clichês).
- **Server State:** TanStack Query para requisições com a API.
- **Client State:** Zustand para a lógica de UI e Auth local.
- **Router:** React Router v6 ou TanStack Router.
- **Testes:** Vitest + React Testing Library.

## Estrutura de Arquivos Planejada (Spec-Driven)
Criaremos um novo workspace `dashboard`:
```text
dashboard/
├── _specs/                 # O cérebro do Orchestrator
│   ├── architecture.md
│   ├── 01-setup/
│   ├── 02-auth/
│   └── 03-reports-ui/
├── src/
│   ├── components/         # Custom UI Elements
│   ├── features/           # Domains (auth, reports)
│   ├── stores/             # Zustand
│   ├── lib/                # React Query client, Axios
│   └── routes/             # React Router config
```

## Breakdown de Tarefas (Spec-Driven Workflow)

### 1. 01-setup (Configuração Base)
- **Agente:** `frontend-specialist` + `spec-driven-orchestrator`
- **INPUT:** `dashboard/_specs/01-setup/scope.md`
- **OUTPUT:** Vite com React, TS, Tailwind, Zustand, React Query, Vitest configurados.
- **VERIFY:** `npm run test` (testando render do App dummy).

### 2. 02-auth (Módulo de Login)
- **Agente:** `frontend-specialist`
- **INPUT:** `dashboard/_specs/02-auth/scope.md`
- **OUTPUT:** Tela de Login em Dark Mode profundo, Axios interceptors injetando JWT, Store Zustand de sessão.
- **VERIFY:** Teste unitário de submissão do login passando no Vitest.

### 3. 03-reports-ui (Listagem e Edição)
- **Agente:** `frontend-specialist`
- **INPUT:** `dashboard/_specs/03-reports-ui/scope.md`
- **OUTPUT:** Listagem não convencional de relatórios e formulários dinâmicos via TanStack Query.
- **VERIFY:** Testes de renderização listando os relatórios mockados.

## Fase X: Verificação Final
- [ ] Segurança/Dependências
- [ ] Testes Vitest passando
- [ ] Auditoria de UX (Anti-clichê validado)
