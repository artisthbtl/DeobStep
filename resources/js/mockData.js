export const MOCK_ANALYSIS_RESULT = {
    jobId: "CASE-3891",
    timestamp: new Date().toLocaleString(),
    status: "Malicious",
    threat_level: "High",
    
    // 1. Script Asli (Obfuscated)
    original_source: `$kxJoS = ([string]::Format('{0}{1}{2}{3}{4}{5}{6}','Wr','ite','-Ho','st h','el','l','o'))
&('Invoke-Expres'+'sion') $kxJoS`,

    // 2. Hasil Akhir (Deobfuscated)
    deobfuscated_output: `$kxJoS = ([string]"Write-Host hello")
Write-Host ([string]"hello")`,

    // 3. Raw Log (STRINGIFIED JSON)
    raw_log: `[
  {
    "astType": "System.Management.Automation.Language.BinaryExpressionAst",
    "output": {
      "valueType": "System.String",
      "value": "Invoke-Expression"
    },
    "startOffset": 93,
    "endOffset": 115,
    "isConstant": true
  },
  {
    "astType": "InvokeMemberExpressionAst",
    "library": "System.String",
    "method": "Format",
    "argues": [
      {
        "valueType": "System.String",
        "value": "{0}{1}{2}{3}{4}{5}{6}",
        "startOffset": 27,
        "endOffset": 50
      },
      {
        "valueType": "System.String",
        "value": "Wr",
        "startOffset": 51,
        "endOffset": 55
      },
      {
        "valueType": "System.String",
        "value": "ite",
        "startOffset": 56,
        "endOffset": 61
      },
      {
        "valueType": "System.String",
        "value": "-Ho",
        "startOffset": 62,
        "endOffset": 67
      },
      {
        "valueType": "System.String",
        "value": "st h",
        "startOffset": 68,
        "endOffset": 74
      },
      {
        "valueType": "System.String",
        "value": "el",
        "startOffset": 75,
        "endOffset": 79
      },
      {
        "valueType": "System.String",
        "value": "l",
        "startOffset": 80,
        "endOffset": 83
      },
      {
        "valueType": "System.String",
        "value": "o",
        "startOffset": 84,
        "endOffset": 87
      }
    ],
    "startOffset": 10,
    "endOffset": 88
  },
  {
    "astType": "InvokeMemberExpressionAst",
    "output": {
      "valueType": "System.String",
      "value": "Write-Host hello"
    },
    "startOffset": 10,
    "endOffset": 88
  },
  {
    "astType": "AssignmentStatementAst",
    "variablePath": "kxJoS",
    "valueType": "System.String",
    "value": "Write-Host hello",
    "startOffset": 9,
    "endOffset": 89
  },
  {
    "astType": "CommandAst",
    "commandType": "Cmdlet",
    "commandName": "Invoke-Expression",
    "startOffset": 91,
    "endOffset": 123,
    "argues": [
      {
        "type": "arguement",
        "valueType": "System.String",
        "value": "Write-Host hello",
        "startOffset": 117,
        "endOffset": 123
      }
    ]
  },
  {
    "astType": "CommandAst",
    "commandType": "Cmdlet",
    "commandName": "Write-Host",
    "startOffset": 0,
    "endOffset": 16,
    "iexOffset": [
      [
        91,
        123
      ]
    ],
    "argues": [
      {
        "type": "arguement",
        "valueType": "System.String",
        "value": "hello",
        "startOffset": 11,
        "endOffset": 16
      }
    ]
  }
]`,

    log_1: `{
  "Root": "0-123-51746155",
  "ResultNodeString": {
    "68-74-13637860": "'st h'",
    "20-26-2803186": "Format",
    "56-61-52798982": "'ite'",
    "0-6-58593350": "$kxJoS",
    "117-123-43277074": "$kxJoS",
    "51-55-40956146": "'Wr'",
    "10-88-25943081": "[string]::Format('{0}{1}{2}{3}{4}{5}{6}','Wr','ite','-Ho','st h','el','l','o')",
    "75-79-39160569": "'el'",
    "10-18-61633263": "[string]",
    "92-116-22260044": "('Invoke-Expres'+'sion')",
    "0-123-21072725": "$kxJoS = ([string]\\"Write-Host hello\\")\\r\\nWrite-Host ([string]\\"hello\\")",
    "0-123-51746155": "$kxJoS = ([string]\\"Write-Host hello\\")\\r\\nWrite-Host ([string]\\"hello\\")",
    "84-87-61392874": "'o'",
    "0-89-37181318": "$kxJoS = ([string]\\"Write-Host hello\\")",
    "109-115-33725004": "'sion'",
    "9-89-66676497": "([string]\\"Write-Host hello\\")",
    "91-123-9732896": "Write-Host ([string]\\"hello\\")",
    "27-50-36038983": "'{0}{1}{2}{3}{4}{5}{6}'",
    "93-108-36415533": "'Invoke-Expres'",
    "10-88-52006091": "[string]::Format('{0}{1}{2}{3}{4}{5}{6}','Wr','ite','-Ho','st h','el','l','o')",
    "62-67-56751988": "'-Ho'",
    "91-123-17904174": "Write-Host ([string]\\"hello\\")",
    "93-115-25476955": "'Invoke-Expres'+'sion'",
    "93-115-42900321": "'Invoke-Expres'+'sion'",
    "10-88-20913496": "[string]::Format('{0}{1}{2}{3}{4}{5}{6}','Wr','ite','-Ho','st h','el','l','o')",
    "80-83-17559946": "'l'",
    "9-89-38632461": "([string]::Format('{0}{1}{2}{3}{4}{5}{6}','Wr','ite','-Ho','st h','el','l','o'))",
    "93-115-66378479": "'Invoke-Expres'+'sion'"
  },
  "OriginNodeString": {},
  "Childs": {}
}`,

    log_2: `{
  "Root": "0-16-32803596",
  "ResultNodeString": {
    "11-16-53639284": "([string]\\"hello\\")",
    "0-10-43325585": "Write-Host",
    "0-16-57865698": "Write-Host ([string]\\"hello\\")",
    "0-16-10010469": "Write-Host ([string]\\"hello\\")",
    "0-16-33725855": "Write-Host ([string]\\"hello\\")",
    "0-16-32803596": "Write-Host ([string]\\"hello\\")"
  },
  "OriginNodeString": {},
  "Childs": {}
}`
};

// --- THIS PART WAS MISSING AND CAUSED THE CRASH ---
export const MOCK_HISTORY = [
    { id: 'CASE-3890', filename: 'invoice_scan.ps1', date: '2024-03-10', status: 'Clean' },
    { id: 'CASE-3889', filename: 'update_fix.bat', date: '2024-03-09', status: 'Malicious' },
];