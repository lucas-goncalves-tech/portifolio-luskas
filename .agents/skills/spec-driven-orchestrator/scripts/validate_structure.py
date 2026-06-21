import os
import sys

def check_file_exists(filename):
    if not os.path.exists(filename):
        print(f"[ERRO] Arquivo esperado não encontrado: {filename}")
        return False
    return True

def pre_check(project_root):
    print("--- Iniciando Pre-Check Estrutural ---")
    tasks_file = os.path.join(project_root, "tasks.md")
    
    # Valida existencia do tasks.md
    if not check_file_exists(tasks_file):
        print("[ERRO] É obrigatório ter um arquivo tasks.md na raiz para o Orquestrador funcionar.")
        sys.exit(1)
        
    print("[OK] tasks.md encontrado.")
    print("[AVISO PARA O ORQUESTRADOR]: Lembre-se de fazer a descoberta dinâmica dos paths do AG-Kit no sistema (ex: buscar GEMINI.md ou pastas .agent via list_dir) antes de iniciar as Specs. A skill é GLOBAL, caminhos mudam.")
    print("--- Pre-Check Concluído com Sucesso ---")

def post_check(project_root):
    print("--- Iniciando Post-Check Arquitetural (DDD) ---")
    # Busca por pastas comuns do padrão DDD para garantir que elas não foram destruídas
    expected_layers = ["domain", "application", "infrastructure", "presentation", "interfaces", "core"]
    
    src_dirs = [d for d in os.listdir(project_root) if os.path.isdir(os.path.join(project_root, d)) and d in ['src', 'app', 'lib']]
    
    if not src_dirs:
        print("[AVISO] Nenhuma pasta de código comum ('src', 'app', 'lib') encontrada. Pulando validação DDD estrita.")
        print("--- Post-Check Concluído ---")
        return
        
    for src in src_dirs:
        src_path = os.path.join(project_root, src)
        subdirs = [d.lower() for d in os.listdir(src_path) if os.path.isdir(os.path.join(src_path, d))]
        
        found_layers = [layer for layer in expected_layers if layer in subdirs]
        if found_layers:
            print(f"[OK] Camadas lógicas detectadas em '{src}': {', '.join(found_layers)}")
        else:
            print(f"[AVISO] Nenhuma camada DDD estrita identificada em '{src}'.")
            print("        Se este projeto for regido por DDD, os sub-agentes podem ter refatorado incorretamente e unificado lógicas de domínio com infraestrutura.")
            
    print("--- Post-Check Concluído ---")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python validate_structure.py <pre_check|post_check> [caminho_projeto]")
        sys.exit(1)
        
    action = sys.argv[1]
    root = sys.argv[2] if len(sys.argv) > 2 else os.getcwd()
    
    if action == "pre_check":
        pre_check(root)
    elif action == "post_check":
        post_check(root)
    else:
        print("Ação desconhecida. Use pre_check ou post_check.")
