# Contrato de Escopo Local

Status: [x]

## 1. O Que Fazer
- Configurar TypeScript (`tsconfig.json` para o backend).
- Configurar a inicialização do Prisma (`npx prisma init`) apontando para o Postgres.
- Criar a base do servidor Express (`src/app.ts` e `src/server.ts`).
- Configurar os middlewares globais: CORS, Helmet, express-rate-limit, express.json() e Morgan para logs.
- Configurar tratamento global de erros.

## 2. Limites (Até Onde Fazer)
- Não implemente rotas de Auth ou Relatórios ainda.
- Foco absoluto na estabilidade do core do Express.
- O rate-limit deve ser uma configuração geral (ex: 100 requests por 15 minutos).

## 3. Critérios de Aceite
- [ ] TypeScript compila o código sem erros (`npm run build`).
- [ ] O servidor sobe na porta 3001 e responde um "Health Check" OK.
- [ ] O Prisma client está gerado e disponível para uso.
- [ ] Middlewares de segurança e logs estão rodando na instância do Express.

## 4. Comandos de Validação
- `npx tsc --noEmit`
- `npm run test` (quando implementado no subagente)
