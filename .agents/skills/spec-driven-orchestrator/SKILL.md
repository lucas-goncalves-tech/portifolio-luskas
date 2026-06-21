---
name: spec-driven-orchestrator
description: Auto-Contained Agent Scaffolding. Automates software building via a strict 4-Phase workflow (Design -> Validate -> Execute -> Integrate).
---

# Spec-Driven Orchestrator (Auto-Contained Scaffolding)

Esta skill orquestra a construção de software em um modelo onde todo o projeto é desenhado e estruturado (Arquitetura) **antes** de qualquer linha de código ser escrita. A IA principal cria pequenas pastas de escopos contidos que guiam sub-agentes blindados contra alucinação ou vazamento de contexto.

## As 4 Fases Obrigatórias (Regra de Ouro)

1. **Fase 1 (Design-First):** Criação manual ou pela IA da pasta `_specs/` no root do projeto. Contendo o `architecture.md` e as sub-pastas `/01-feature`, `/02-feature`.
2. **Fase 2 (Blueprint Check):** Uso imperativo do script `validate_blueprint.py` para provar matematicamente que todos os contratos (`scope.md`) estão perfeitos e contêm "O Que Fazer, Limites, Aceite, Validação". NADA AVANÇA se houver erros.
3. **Fase 3 (Execução via TDD):** O Orquestrador envia um sub-agente para cada pasta lendo APENAS o `scope.md` correspondente. O Sub-agente roda o ciclo RED-GREEN-REFACTOR e não adultera testes falhos.
4. **Fase 4 (Integração Global):** Após o loop, a IA Principal assume, roda testes/lint globais, executa o `validate_structure.py` para garantir o DDD e corrige quebras de build.

## Arquitetura da Skill

*   `scripts/validate_blueprint.py`: (Fase 2) Garantidor de que o design está perfeito antes de programar.
*   `scripts/validate_structure.py`: (Fase 4) Avaliador de estrutura DDD pós-implementação.
*   `scripts/orchestrate.py`: Varredor de pastas `_specs/` para controle de status automático.
*   `templates/scope.template.md`: Contrato local obrigatório para cada feature.
*   `templates/orchestrator_prompt.md`: Regras da IA Principal.
*   `templates/subagent_prompt.md`: Regras estritas (Anti-Trapaça) da IA Sub-agente.
