# Contrato de Escopo Local

Status: [x]

## 1. O Que Fazer
- Criar serviço para ler, escrever, atualizar e deletar relatórios `.md` da pasta `backend/reports/`.
- Utilizar `gray-matter` (ou similar) para separar o Frontmatter (título, vulnerabilidade, etc) do conteúdo.
- Criar rotas públicas (`GET /api/reports`, `GET /api/reports/:id`) para listar/ler relatórios anonimizados.
- Criar rotas protegidas (`POST /api/reports`, `PUT /api/reports/:id`, `DELETE /api/reports/:id`) que exigem o `authMiddleware`.

## 2. Limites (Até Onde Fazer)
- Não alterar a base do Express ou Auth.
- O banco de dados (Prisma) pode guardar os metadados dos relatórios para facilitar a listagem, mas o conteúdo raw fica no disco (.md) ou tudo fica no DB (escolher e justificar). Para manter simples e estático, o parser no disco é ideal.

## 3. Critérios de Aceite
- [ ] Rotas GET são públicas e retornam os relatórios parseados.
- [ ] Rotas POST/PUT/DELETE estão protegidas pelo middleware JWT.
- [ ] Os dados recebidos/enviados são validados via Zod.

## 4. Comandos de Validação
- `npm run test` focado em mockar o file system e testar o Service/Controllers.
