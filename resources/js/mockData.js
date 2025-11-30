// src/mockData.js
export const MOCK_ANALYSIS_RESULT = {
    jobId: "job-12345",
    status: "completed",
    original_source: `$s = "SGVsbG8gV29ybGQ="; $d = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($s)); Invoke-Expression $d`,
    deobfuscated_source: `Write-Host "Hello World"`,
    steps: [
        {
            id: 1,
            layer: 1,
            type: "VariableAssignment",
            content: "$s = \"SGVsbG8gV29ybGQ=\"",
            result: "SGVsbG8gV29ybGQ="
        },
        {
            id: 2,
            layer: 1,
            type: "Base64Decode",
            content: "[System.Convert]::FromBase64String($s)",
            result: "Hello World"
        },
        {
            id: 3,
            layer: 1,
            type: "Invoke-Expression",
            content: "Invoke-Expression $d",
            result: "Executed: Write-Host 'Hello World'",
            children: [
                {
                    id: 4,
                    layer: 2,
                    type: "Write-Host",
                    content: "Write-Host 'Hello World'",
                    result: "Output to console"
                }
            ]
        }
    ]
};