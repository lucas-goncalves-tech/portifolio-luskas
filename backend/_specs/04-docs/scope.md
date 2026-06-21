# Contrato de Escopo Local

Status: [x]

## 1. O Que Fazer
- Integrar `@scalar/express-api-reference` para expor a documentação interativa.
- Criar/configurar as definições da OpenAPI especificando as rotas de Auth e Reports.

## 2. Limites (Até Onde Fazer)
- Não alterar regras de negócio de Auth ou Reports.

## 3. Critérios de Aceite
- [ ] Rota `/docs` renderiza o Scalar com sucesso e carrega as rotas da aplicação.

## 4. Comandos de Validação
- Requisição manual/teste confirmando que o endpoint `/docs` não retorna 404/500.
