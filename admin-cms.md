# Plano de Migração: CMS e Admin Dashboard

## 1. Objetivo
Migrar os dados estáticos do portfólio (`projects.ts` e `reports.ts`) para um banco de dados relacional e construir um Painel Administrativo protegido para facilitar a gestão do conteúdo.

## 2. Decisões Arquiteturais e Stack
- **ORM:** Prisma 6 ORM
- **Banco de Dados:** PostgreSQL (via Neon Tech da vercel @.env.example)
- **Autenticação:** Better Auth (Sessões HttpOnly)
- **Segurança da Borda:** Next.js Middleware integrado com `@upstash/ratelimit` (Redis)
- **Validação e Lógica:** React Server Actions + Zod
- **Storage de Imagens:** Cloudinary (upload via Pre-signed URLs para evitar sobrecarga no Edge)

## 3. Fases da Implementação

### Fase 1: Setup do Banco de Dados
- [ ] Instalar o Prisma ORM e configurar as variáveis de ambiente do Postgres.
- [ ] Criar modelo `User` (Admin) e `Session` (Auth).
- [ ] Criar modelos relacionais: `Project`, `ProjectImage`, `Report`, e `Finding`.
- [ ] Criar e executar um script de Seed para transferir o JSON atual para o banco.

### Fase 2: Segurança e Autenticação
- [ ] Instalar e configurar o `better-auth`.
- [ ] Desenvolver a página de autenticação secreta `/admin/login`.
- [ ] Configurar o `middleware.ts` para bloquear `/admin/*` para usuários não autenticados.
- [ ] Configurar o Upstash Rate Limiting no middleware (mitigação de Brute Force).

### Fase 3: Server Actions e Validação
- [ ] Criar Actions Zod-validadas para CRUD de Projetos.
- [ ] Criar Actions Zod-validadas para CRUD de Relatórios.
- [ ] Implementar verificação rigorosa de sessão dentro de cada Action (Defensive Security).

### Fase 4: Desenvolvimento da Interface Administrativa
- [ ] Layout `/admin` com Sidebar usando Shadcn.
- [ ] Tabelas interativas para listagem de entidades (Projetos/Relatórios).
- [ ] Formulários complexos utilizando React Hook Form + Zod.
- [ ] Integração com Cloudinary para upload de imagens (Dropzone UI + Pre-signed URLs via Backend).

### Fase 5: Integração no Frontend
- [ ] Modificar componentes da Landing Page (`src/components/projects.tsx`, `reports.tsx`) para consumir dados do banco via Next.js RSC.
- [ ] Configurar Revalidação de Cache (ISR/On-Demand) nas Server Actions para garantir que a página continue rápida como um arquivo estático, sendo reconstruída apenas no momento do salvamento pelo CMS.

## 4. Agentes Envolvidos
- **orchestrator**: Vai guiar o passo a passo.
- **backend-engineer**: Para modelagem Prisma, Zod e Actions seguras.
- **frontend-specialist**: Para criação das interfaces do CMS e refatoração da visualização na página inicial.
- **security-auditor**: Para checar as defesas do auth, middleware e upload de arquivos.
