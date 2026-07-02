# Plano de Migração: CMS e Admin Dashboard (TDD First)

## 1. Objetivo
Migrar os dados estáticos do portfólio (`projects.ts` e `reports.ts`) para um banco de dados relacional e construir um Painel Administrativo protegido, orientando todo o desenvolvimento pela metodologia **Test-Driven Development (TDD)** e o ciclo RED-GREEN-REFACTOR.

## 2. Decisões Arquiteturais e Stack
- **ORM:** Prisma 6 ORM
- **Banco de Dados:** PostgreSQL (via Neon Tech da vercel @.env.example)
- **Autenticação:** Better Auth (Sessões HttpOnly)
- **Segurança da Borda:** Next.js Middleware integrado com `@upstash/ratelimit` (Redis)
- **Validação e Lógica:** React Server Actions + Zod
- **Storage de Imagens:** Cloudinary (upload via Pre-signed URLs para evitar sobrecarga no Edge)
- **Testes:** Vitest / Jest + Testing Library (Mockando banco de dados e APIs externas como Cloudinary)

## 3. Fases da Implementação (Ciclo TDD)

### Fase 1: Setup da Infraestrutura e Ambiente de Testes
- [ ] Instalar o Prisma ORM e configurar as variáveis de ambiente do Postgres.
- [ ] Configurar o framework de testes (Vitest) e o banco de dados em memória/mock (ex: `prisma-mock`).
- [ ] Configurar um **Pipeline de CI (Continuous Integration)** com GitHub Actions (`.github/workflows/ci.yml`) para rodar os testes automaticamente em cada `push`.
- [ ] Criar mock interceptador para o Cloudinary (evitar uploads reais na nuvem durante testes).
- [ ] Modelar schemas básicos (`User`, `Session`, `Project`, `ProjectImage`, `Report`, `Finding`).
- [ ] Criar script de Seed para transferir o JSON atual para o banco.

### Fase 2: TDD - Segurança e Autenticação
- [ ] **RED:** Escrever testes que esperam bloqueio 401/403 ao acessar `/admin` sem sessão.
- [ ] **RED:** Escrever testes de Rate Limiting (mais de 5 requisições bloqueiam o IP).
- [ ] **GREEN:** Instalar e configurar `better-auth` e o `middleware.ts` com Upstash Redis.
- [ ] **REFACTOR:** Refatorar o middleware para máxima performance na Edge.

### Fase 3: TDD - Server Actions e Validação de Dados (CRUD)
- [ ] **RED:** Escrever testes unitários que enviam payloads inválidos para as Server Actions (esperando erro de Zod).
- [ ] **RED:** Escrever testes de sucesso (inserir, atualizar, deletar Projetos e Relatórios).
- [ ] **GREEN:** Implementar os Schemas do Zod e o código das Server Actions acessando o Prisma.
- [ ] **REFACTOR:** Limpar duplicações nas queries do Prisma e melhorar tratamento de erros.

### Fase 4: Desenvolvimento da Interface Administrativa
- [ ] Layout `/admin` com Sidebar usando Shadcn.
- [ ] Tabelas interativas para listagem de entidades (Projetos/Relatórios).
- [ ] Formulários complexos utilizando React Hook Form + Zod.
- [ ] Integração com Cloudinary para upload de imagens (Dropzone UI + Pre-signed URLs via Backend).

### Fase 5: Integração no Frontend
- [ ] Modificar componentes da Landing Page (`src/components/projects.tsx`, `reports.tsx`) para consumir dados do banco via Next.js RSC.
- [ ] Configurar Revalidação de Cache (ISR/On-Demand) nas Server Actions para garantir que a página continue rápida como um arquivo estático.

## 4. Metodologia de Trabalho (Regras TDD)
- **Nenhum código de backend será escrito sem um teste falhando primeiro (RED).**
- O código de produção deve apenas satisfazer os testes (GREEN).
- Os testes guiarão as regras de negócio e a blindagem contra ataques e payloads maliciosos.

## 5. Agentes Envolvidos
- **orchestrator**: Vai guiar o passo a passo mantendo o ciclo RED-GREEN-REFACTOR.
- **backend-engineer**: Para modelagem Prisma, Zod, e escrita dos testes/ações.
- **frontend-specialist**: Para criação das interfaces do CMS e refatoração da visualização na página inicial.
- **security-auditor**: Para validar se os testes cobrem brechas de segurança, bypass de Auth e falhas no Zod.
