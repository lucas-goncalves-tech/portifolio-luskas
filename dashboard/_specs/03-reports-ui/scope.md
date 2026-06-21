# Feature: Reports UI
Status: [x]

## O Que Fazer
- Uma view listando relatórios em formato de Cards ou Grid minimalista (sem bento-grid, prefira linhas afiadas).
- Consumir o endpoint do backend usando `useQuery`.
- Um formulário super técnico para Editar/Criar um relatório Markdown (usando o `useMutation`).

## Limites
- A API do backend rodará na porta 3001. Comunique-se via Axios instanciado no `02-auth`.

## Critérios de Aceite
- Tabela ou Grid de relatórios aparecendo.
- Mutação de criação/edição conectada à UI.
- Uso impecável do estilo Brutalista sem clichês.

## Comandos de Validação
`npm run test` verificando a renderização dos grids.
