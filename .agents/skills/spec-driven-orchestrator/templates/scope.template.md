# Blueprint Local: [NOME_DA_FEATURE_AQUI]

Status: [ ]

## 1. Contexto do Ambiente & Dependências
- **Visão Geral:** [O que esta funcionalidade resolve no sistema global]
- **Dependências de Infraestrutura:** [O que já deve estar pronto para isso funcionar]
- **Arquivos-Chave (Leitura Obrigatória):**
  - [Caminhos exatos de arquivos ou interfaces que o agente deve usar como base]

## 2. Especificações Técnicas & Arquitetura
- **Tecnologias Core:** [Lista estrita de bibliotecas e versões a utilizar]
- **Padrões de Código:** [Ex: Hexagonal, Repository Pattern, MVC, Atomic Design]
- **Estrutura de Dados / Schemas:** 
  - [Defina JSON payloads, interfaces TypeScript ou models de BD esperados]
- **Detalhamento (UI ou Lógica):**
  - [Instruções técnicas profundas sobre cada módulo ou componente]

## 3. Persona Injetada (Obrigatório)
O sub-agente DEVE adotar a persona deste agente e ler o seu respectivo arquivo `.md` (no AG-Kit) antes de codificar:
- `@[NOME_DO_AGENTE]` (ex: `@[backend-specialist]`, `@[frontend-specialist]`, `@[mobile-developer]`)

## 4. Fronteiras de Atuação (Limites)
- **O que fazer (Arquivos Alvo):** [Exatamente onde mexer]
- **O que NÃO fazer (Proibições):** [Sistemas, libs ou pastas que não podem ser alterados]

## 5. Critérios de Aceite (Checklist Estrito)
- [ ] Requisito 1 (ex: A rota X retorna HTTP 201)
- [ ] Requisito 2 (ex: O componente renderiza as props Y)

## 6. Validação (Comandos)
- **TDD / Testes:** [Comando exato para o subagente se validar]
