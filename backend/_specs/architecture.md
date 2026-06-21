# Arquitetura Global do Backend

## 1. Stack e Padrões
- **Framework:** Express.js + TypeScript
- **Banco de Dados:** Prisma ORM com PostgreSQL 15
- **Segurança:** Helmet, CORS, Rate Limit, Argon2 (Hash), JWT (Auth)
- **Validação:** Zod
- **Documentação:** Scalar

## 2. Padrões de Código
- Arquitetura de Camadas (Routes -> Controllers -> Services).
- Injeção de dependências ou uso de repositórios globais.
- Middlewares de validação com Zod para request (body, params, query).
- Tratamento de erro global.

## 3. Estrutura de Domínios
- **Auth:** Login de administrador.
- **Reports:** CRUD e parseamento de arquivos Markdown na pasta `/reports`.
- **Docs:** Geração dinâmica de API Specs.
