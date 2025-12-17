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
]
`,

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
    "0-123-21072725": "$kxJoS = ([string]\"Write-Host hello\")\r\nWrite-Host ([string]\"hello\")",
    "0-123-51746155": "$kxJoS = ([string]\"Write-Host hello\")\r\nWrite-Host ([string]\"hello\")",
    "84-87-61392874": "'o'",
    "0-89-37181318": "$kxJoS = ([string]\"Write-Host hello\")",
    "109-115-33725004": "'sion'",
    "9-89-66676497": "([string]\"Write-Host hello\")",
    "91-123-9732896": "Write-Host ([string]\"hello\")",
    "27-50-36038983": "'{0}{1}{2}{3}{4}{5}{6}'",
    "93-108-36415533": "'Invoke-Expres'",
    "10-88-52006091": "[string]::Format('{0}{1}{2}{3}{4}{5}{6}','Wr','ite','-Ho','st h','el','l','o')",
    "62-67-56751988": "'-Ho'",
    "91-123-17904174": "Write-Host ([string]\"hello\")",
    "93-115-25476955": "'Invoke-Expres'+'sion'",
    "93-115-42900321": "'Invoke-Expres'+'sion'",
    "10-88-20913496": "[string]::Format('{0}{1}{2}{3}{4}{5}{6}','Wr','ite','-Ho','st h','el','l','o')",
    "80-83-17559946": "'l'",
    "9-89-38632461": "([string]::Format('{0}{1}{2}{3}{4}{5}{6}','Wr','ite','-Ho','st h','el','l','o'))",
    "93-115-66378479": "'Invoke-Expres'+'sion'"
  },
  "OriginNodeString": {
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
    "0-123-21072725": "$kxJoS = ([string]::Format('{0}{1}{2}{3}{4}{5}{6}','Wr','ite','-Ho','st h','el','l','o'))\r\n&('Invoke-Expres'+'sion') $kxJoS",
    "0-123-51746155": "$kxJoS = ([string]::Format('{0}{1}{2}{3}{4}{5}{6}','Wr','ite','-Ho','st h','el','l','o'))\r\n&('Invoke-Expres'+'sion') $kxJoS",
    "84-87-61392874": "'o'",
    "0-89-37181318": "$kxJoS = ([string]::Format('{0}{1}{2}{3}{4}{5}{6}','Wr','ite','-Ho','st h','el','l','o'))",
    "109-115-33725004": "'sion'",
    "9-89-66676497": "([string]::Format('{0}{1}{2}{3}{4}{5}{6}','Wr','ite','-Ho','st h','el','l','o'))",
    "91-123-9732896": "&('Invoke-Expres'+'sion') $kxJoS",
    "27-50-36038983": "'{0}{1}{2}{3}{4}{5}{6}'",
    "93-108-36415533": "'Invoke-Expres'",
    "10-88-52006091": "[string]::Format('{0}{1}{2}{3}{4}{5}{6}','Wr','ite','-Ho','st h','el','l','o')",
    "62-67-56751988": "'-Ho'",
    "91-123-17904174": "&('Invoke-Expres'+'sion') $kxJoS",
    "93-115-25476955": "'Invoke-Expres'+'sion'",
    "93-115-42900321": "'Invoke-Expres'+'sion'",
    "10-88-20913496": "[string]::Format('{0}{1}{2}{3}{4}{5}{6}','Wr','ite','-Ho','st h','el','l','o')",
    "80-83-17559946": "'l'",
    "9-89-38632461": "([string]::Format('{0}{1}{2}{3}{4}{5}{6}','Wr','ite','-Ho','st h','el','l','o'))",
    "93-115-66378479": "'Invoke-Expres'+'sion'"
  },
  "Childs": {
    "93-115-42900321": [
      "93-108-36415533",
      "109-115-33725004"
    ],
    "9-89-66676497": [
      "9-89-38632461"
    ],
    "0-123-51746155": [
      "0-123-21072725"
    ],
    "10-88-25943081": [
      "10-18-61633263",
      "20-26-2803186",
      "27-50-36038983",
      "51-55-40956146",
      "56-61-52798982",
      "62-67-56751988",
      "68-74-13637860",
      "75-79-39160569",
      "80-83-17559946",
      "84-87-61392874"
    ],
    "0-123-21072725": [
      "0-89-37181318",
      "91-123-9732896"
    ],
    "93-115-66378479": [
      "93-115-25476955"
    ],
    "10-88-20913496": [
      "10-88-52006091"
    ],
    "10-88-52006091": [
      "10-88-25943081"
    ],
    "9-89-38632461": [
      "10-88-20913496"
    ],
    "92-116-22260044": [
      "93-115-66378479"
    ],
    "0-89-37181318": [
      "0-6-58593350",
      "9-89-66676497"
    ],
    "91-123-9732896": [
      "91-123-17904174"
    ],
    "93-115-25476955": [
      "93-115-42900321"
    ],
    "91-123-17904174": [
      "92-116-22260044",
      "117-123-43277074"
    ]
  }
}
`,

    log_2: `{
  "Root": "0-16-32803596",
  "ResultNodeString": {
    "11-16-53639284": "([string]\"hello\")",
    "0-10-43325585": "Write-Host",
    "0-16-57865698": "Write-Host ([string]\"hello\")",
    "0-16-10010469": "Write-Host ([string]\"hello\")",
    "0-16-33725855": "Write-Host ([string]\"hello\")",
    "0-16-32803596": "Write-Host ([string]\"hello\")"
  },
  "OriginNodeString": {
    "11-16-53639284": "hello",
    "0-10-43325585": "Write-Host",
    "0-16-57865698": "Write-Host hello",
    "0-16-10010469": "Write-Host hello",
    "0-16-33725855": "Write-Host hello",
    "0-16-32803596": "Write-Host hello"
  },
  "Childs": {
    "0-16-10010469": [
      "0-16-33725855"
    ],
    "0-16-33725855": [
      "0-10-43325585",
      "11-16-53639284"
    ],
    "0-16-57865698": [
      "0-16-10010469"
    ],
    "0-16-32803596": [
      "0-16-57865698"
    ]
  }
}
`
}
