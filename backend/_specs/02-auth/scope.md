# Contrato de Escopo Local

Status: [x]

## 1. O Que Fazer
- Criar o modelo de Usuário Admin no Prisma (`schema.prisma`).
- Implementar o `AuthService` para realizar o hash da senha de Admin com `argon2` e geração de `JWT`.
- Criar rotas `/api/auth/login`.
- Criar middleware `authMiddleware.ts` para proteger rotas futuras.
- Criar um script de seeder para criar o usuário Admin inicial a partir da senha do `.env`.

## 2. Limites (Até Onde Fazer)
- Não crie rotas de cadastro público. Apenas o Admin pré-configurado existe.
- Não mexa nas rotas de relatórios.

## 3. Critérios de Aceite
- [ ] Prisma Schema contém User.
- [ ] A rota POST `/api/auth/login` valida o body com Zod, e retorna token JWT em caso de sucesso.
- [ ] O middleware de auth rejeita requisições sem token.

## 4. Comandos de Validação
- Executar testes automatizados (ex: unit test do AuthService).
- `npx prisma validate`
