# Feature: Auth
Status: [x]

## O Que Fazer
- Criar a página de `/login` com visual "Brutalista": um input quadrado, sem firulas, preto e vermelho sangue.
- Conectar a uma store Zustand que salva o Token (JWT).
- Configurar uma instância base do Axios (`axios.create`) que usa um interceptor para injetar o bearer token.

## Limites
- Apenas rota de Login (não existe registro).

## Critérios de Aceite
- O formulário submete para a API (em mock ou backend real).
- O Token JWT é salvo no Zustand.
- Se deslogado, React Router redireciona o usuário para `/login`.

## Comandos de Validação
Vitest com React Testing Library rodando o teste do Login.
