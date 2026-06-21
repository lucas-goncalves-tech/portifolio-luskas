# Luskas Portfólio & OSINT

Este é um monorepo que abriga tanto o frontend em Next.js quanto o backend em Express + Prisma, estruturado para servir relatórios de pentest anonimizados.

## Estrutura do Monorepo

- `/frontend`: Aplicação Web Next.js.
- `/backend`: API RESTful com Express, validada com Zod, Prisma e Autenticação (Argon2).
- `/backend/reports`: Repositório de write-ups e relatórios em formato Markdown.

## Como iniciar

### Usando Docker
Toda a infraestrutura (PostgreSQL 15, Backend Node 24, e Frontend) está orquestrada via Docker Compose:
```bash
docker-compose up -d --build
```

### Localmente (NPM Workspaces)
1. Configure os arquivos `.env` baseados nos `.env.example`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie os servidores de desenvolvimento:
   ```bash
   npm run dev
   ```
