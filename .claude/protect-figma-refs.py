#!/usr/bin/env python3
"""
Hook PreToolUse: bloqueia qualquer escrita nos arquivos de referência protegidos do Figma.
Roda antes de cada chamada MCP de escrita, independente das permissões concedidas pelo usuário.

Arquivos protegidos (somente leitura):
  - DSR GUI Components     FmEflw5VxrJNKaQ0SR62Kz
  - GUI Icons              JkbKb6Qbz2iraZQ5gcGxmi
  - Nova Identidade Cortex ZFiNk45C8FP7OY53jjElEL
"""
import json
import sys

PROTECTED_FILES = {
    "FmEflw5VxrJNKaQ0SR62Kz": "DSR GUI Components",
    "JkbKb6Qbz2iraZQ5gcGxmi": "GUI Icons",
    "ZFiNk45C8FP7OY53jjElEL": "Nova Identidade Cortex",
}

data = json.load(sys.stdin)
tool_input_str = json.dumps(data.get("tool_input", {}))

for file_id, file_name in PROTECTED_FILES.items():
    if file_id in tool_input_str:
        print(json.dumps({
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": "deny",
                "permissionDecisionReason": (
                    f"BLOQUEADO: tentativa de escrita em '{file_name}' ({file_id}). "
                    "Este arquivo é somente leitura e nunca pode ser modificado, "
                    "independente das permissões concedidas. "
                    "Use apenas arquivos de trabalho do projeto da oferta."
                )
            }
        }))
        sys.exit(0)

sys.exit(0)
