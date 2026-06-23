param(
    [switch]$Elevated
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$powershellPath = "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe"
$netshPath = "$env:SystemRoot\System32\netsh.exe"
$launcherPath = Join-Path $projectRoot "open-ai-plan-map.vbs"
$resultPath = Join-Path $projectRoot "port-3000-repair-result.txt"

function Show-Message {
    param(
        [string]$Message,
        [int]$Icon = 64
    )

    $shell = New-Object -ComObject WScript.Shell
    $null = $shell.Popup($Message, 0, "AI Plan Map", $Icon)
}

function Test-Administrator {
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($identity)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Test-Port3000 {
    $listener = New-Object System.Net.Sockets.TcpListener(
        [System.Net.IPAddress]::Loopback,
        3000
    )

    try {
        $listener.Start()
        return $true
    }
    catch {
        return $false
    }
    finally {
        $listener.Stop()
    }
}

if (-not (Test-Administrator)) {
    $arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`" -Elevated"
    Start-Process -FilePath $powershellPath -ArgumentList $arguments -Verb RunAs
    exit 0
}

$serviceNames = @("vmcompute", "hns", "winnat")
$servicesToRestart = @()
$log = New-Object System.Collections.Generic.List[string]

try {
    $log.Add("Repair started: $(Get-Date -Format s)")

    foreach ($serviceName in $serviceNames) {
        $service = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
        if ($null -ne $service -and $service.Status -eq "Running") {
            $servicesToRestart += $serviceName
            Stop-Service -Name $serviceName -Force -ErrorAction Stop
            $log.Add("Stopped service: $serviceName")
        }
    }

    & $netshPath interface ipv4 set dynamicport tcp start=49152 num=16384 |
        ForEach-Object { $log.Add($_) }
    & $netshPath interface ipv6 set dynamicport tcp start=49152 num=16384 |
        ForEach-Object { $log.Add($_) }

    & $netshPath interface ipv4 delete excludedportrange protocol=tcp startport=2921 numberofports=100 store=active 2>&1 |
        ForEach-Object { $log.Add($_) }
    & $netshPath interface ipv6 delete excludedportrange protocol=tcp startport=2921 numberofports=100 store=active 2>&1 |
        ForEach-Object { $log.Add($_) }

    foreach ($serviceName in @("hns", "vmcompute", "winnat")) {
        if ($servicesToRestart -contains $serviceName) {
            Start-Service -Name $serviceName -ErrorAction Stop
            $log.Add("Started service: $serviceName")
        }
    }

    Start-Sleep -Seconds 3

    $ipv4Ranges = & $netshPath interface ipv4 show excludedportrange protocol=tcp
    $ipv6Ranges = & $netshPath interface ipv6 show excludedportrange protocol=tcp
    $dynamicRange = & $netshPath interface ipv4 show dynamicport tcp

    $log.Add("")
    $log.Add("IPv4 excluded ranges:")
    $ipv4Ranges | ForEach-Object { $log.Add($_) }
    $log.Add("")
    $log.Add("IPv6 excluded ranges:")
    $ipv6Ranges | ForEach-Object { $log.Add($_) }
    $log.Add("")
    $log.Add("IPv4 dynamic TCP range:")
    $dynamicRange | ForEach-Object { $log.Add($_) }

    if (-not (Test-Port3000)) {
        throw "Port 3000 is still unavailable after the repair."
    }

    $log.Add("")
    $log.Add("SUCCESS: Port 3000 is available.")
    $log | Set-Content -Path $resultPath -Encoding UTF8

    Show-Message "Port 3000 is repaired. AI Plan Map will now open at http://localhost:3000/."

    if (Test-Path $launcherPath) {
        Start-Process -FilePath "$env:SystemRoot\explorer.exe" -ArgumentList "`"$launcherPath`""
    }
}
catch {
    foreach ($serviceName in @("hns", "vmcompute", "winnat")) {
        if ($servicesToRestart -contains $serviceName) {
            Start-Service -Name $serviceName -ErrorAction SilentlyContinue
        }
    }

    $log.Add("")
    $log.Add("FAILED: $($_.Exception.Message)")
    $log | Set-Content -Path $resultPath -Encoding UTF8
    Show-Message "Port 3000 repair failed. See port-3000-repair-result.txt for details." 16
    exit 1
}

