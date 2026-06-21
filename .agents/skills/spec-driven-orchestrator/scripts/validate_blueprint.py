import os
import sys

def check_blueprint(project_root):
    specs_dir = os.path.join(project_root, "_specs")
    if not os.path.exists(specs_dir):
        print(f"[ERRO] A pasta raiz '_specs' não foi encontrada. A Fase 1 (Arquitetura) falhou ou não foi feita.")
        sys.exit(1)
        
    architecture_file = os.path.join(specs_dir, "architecture.md")
    if not os.path.exists(architecture_file):
        print(f"[ERRO] O arquivo central 'architecture.md' não foi encontrado dentro de _specs/.")
        sys.exit(1)

    required_sections = [
        "Contexto do Ambiente",
        "Especificações Técnicas",
        "Persona Injetada",
        "Fronteiras de Atuação",
        "Critérios de Aceite",
        "Validação"
    ]

    folders = [f for f in os.listdir(specs_dir) if os.path.isdir(os.path.join(specs_dir, f))]
    if not folders:
        print("[ERRO] Nenhuma sub-pasta de feature encontrada em _specs/.")
        sys.exit(1)

    errors = 0
    for folder in folders:
        scope_path = os.path.join(specs_dir, folder, "scope.md")
        if not os.path.exists(scope_path):
            print(f"[ERRO] A pasta {folder} não possui o arquivo 'scope.md' obrigatório.")
            errors += 1
            continue
            
        with open(scope_path, "r", encoding="utf-8") as f:
            content = f.read().lower()
            
            for req in required_sections:
                if req.lower() not in content:
                    print(f"[ERRO] {folder}/scope.md está faltando a seção obrigatória (ou título exato): '{req}'")
                    errors += 1

            if "status:" not in content:
                print(f"[ERRO] {folder}/scope.md deve conter uma linha 'Status: [ ]' para o orquestrador rastrear.")
                errors += 1

    if errors > 0:
        print(f"\n[FALHA] Validação de Blueprint (Fase 2) encontrou {errors} erro(s). A IA Arquiteta deve corrigir as anomalias de design antes de prosseguir.")
        sys.exit(1)

    print("\n[SUCESSO] Blueprint Validado! Todas as features contêm contratos altamente restritivos e bem definidos.")
    print("O Orquestrador está liberado para iniciar a Fase 3 (Execução isolada de Sub-agentes).")
    sys.exit(0)

if __name__ == "__main__":
    root = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
    check_blueprint(root)
