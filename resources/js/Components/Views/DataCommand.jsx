export const PS_KNOWLEDGE_BASE = [
    {
        category: "Execution",
        description: "Executes code stored in strings or variables (Layer Peeling).",
        level: "danger",
        pattern: /^(invoke-expression|iex|invoke-command|powershell|cmd|&|\.)$/i 
    },
    {
        category: "Network",
        description: "Downloads content from the internet (Dropper behavior).",
        level: "danger",
        pattern: /(downloadstring|downloadfile|webclient|bitstransfer|curl|wget|iwr|invoke-webrequest)/i
    },
    {
        category: "Reflection",
        description: "Accesses internal system APIs to bypass security or load DLLs.",
        level: "danger",
        pattern: /(system\.reflection|getmethod|getfield|getproperty|nonpublic|bindingflags|unsafe)/i
    },
    {
        category: "Decoding",
        description: "Decodes obfuscated text (Base64, Hex, XOR).",
        level: "warning",
        pattern: /(frombase64string|convert|::|encoding|bxor|reverse)/i
    },
    {
        category: "Character Map",
        description: "Reconstructs strings using character codes (Byte-to-Char conversion).",
        level: "warning",
        pattern: /(char|\[char\]|chr|toInt32|toByte)/i
    },
    {
        category: "String Manipulation",
        description: "Reconstructs split strings during runtime.",
        level: "warning",
        pattern: /(-f|-replace|-join|-split|format|substring|concat)/i
    },
    {
        category: "Persistence",
        description: "Attempts to survive system reboot.",
        level: "warning",
        pattern: /(reg|registry|scheduledtask|schtasks|currentversion\\run|startup)/i
    },
    {
        category: "Environment Setup",
        description: "Modifies shell limits or security settings to allow payload execution.",
        level: "info",
        pattern: /(MaximumVariableCount|ExecutionPolicy|ErrorActionPreference|ServicePointManager)/i
    },
    {
        category: "Discovery",
        description: "Gathers system information.",
        level: "info",
        pattern: /(get-process|get-service|whoami|ipconfig|systeminfo|get-wmi|get-ciminstance)/i
    },
    {
        category: "File System",
        description: "Reads or modifies files.",
        level: "info",
        pattern: /(get-content|set-content|out-file|type|cat|gc|add-content)/i
    },
    {
        category: "Output",
        description: "Displays text or converts data to string format.",
        level: "success",
        pattern: /^(write-host|write-output|echo|print|out-string)$/i
    },
    {
        category: "Variable",
        description: "Memory assignment.",
        level: "success",
        typeMatch: "AssignmentStatementAst" 
    }
];

export const analyzeForensicEvent = (logItem) => {
    const textToScan = [
        logItem.commandName,
        logItem.method,
        logItem.operator,
        logItem.variablePath,
        logItem.output?.value, 
        logItem.value,
        (logItem.astType || "").split('.').pop()
    ].filter(Boolean).join(" ");

    for (const rule of PS_KNOWLEDGE_BASE) {
        if (rule.pattern && rule.pattern.test(textToScan)) {
            return rule;
        }
        if (rule.typeMatch && textToScan.includes(rule.typeMatch)) {
            return rule;
        }
    }

    return {
        category: "Operation",
        description: "General script operation.",
        level: "info"
    };
};