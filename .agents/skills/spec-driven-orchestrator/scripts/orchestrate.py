import os
import sys
import re

def get_feature_folders(specs_dir):
    if not os.path.exists(specs_dir):
        return []
    folders = [f for f in os.listdir(specs_dir) if os.path.isdir(os.path.join(specs_dir, f))]
    return sorted(folders)

def get_status_from_scope(scope_path):
    if not os.path.exists(scope_path):
        return None, None
    with open(scope_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        for i, line in enumerate(lines):
            match = re.search(r'Status:\s*\[([ x/])\]', line, re.IGNORECASE)
            if match:
                return match.group(1), i
    return None, None

def mark_status_in_scope(scope_path, line_num, new_status):
    with open(scope_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    line = lines[line_num]
    new_line = re.sub(r'\[([ x/])\]', f'[{new_status}]', line, count=1)
    lines[line_num] = new_line
    
    with open(scope_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python orchestrate.py <project_root> <action> [folder_name]")
        print("Actions: next, complete, fail")
        sys.exit(1)
        
    project_root = os.path.abspath(sys.argv[1])
    action = sys.argv[2]
    specs_dir = os.path.join(project_root, "_specs")
    
    if action == "next":
        folders = get_feature_folders(specs_dir)
        for folder in folders:
            scope_path = os.path.join(specs_dir, folder, "scope.md")
            status, line_num = get_status_from_scope(scope_path)
            if status == ' ':
                mark_status_in_scope(scope_path, line_num, '/')
                print(f"NEXT_TASK|{folder}|{scope_path}")
                sys.exit(0)
        print("DONE|All tasks completed.")
        
    elif action == "complete" and len(sys.argv) > 3:
        folder = sys.argv[3]
        scope_path = os.path.join(specs_dir, folder, "scope.md")
        status, line_num = get_status_from_scope(scope_path)
        if line_num is not None:
            mark_status_in_scope(scope_path, line_num, 'x')
            print(f"COMPLETED|Folder {folder} marked as done.")
        else:
            print(f"FAILED|Could not find Status line in {folder}/scope.md")
            sys.exit(1)
            
    elif action == "fail" and len(sys.argv) > 3:
        folder = sys.argv[3]
        scope_path = os.path.join(specs_dir, folder, "scope.md")
        status, line_num = get_status_from_scope(scope_path)
        if line_num is not None:
            mark_status_in_scope(scope_path, line_num, ' ')
            print(f"FAILED|Folder {folder} marked as pending again due to failure.")
        else:
            sys.exit(1)
