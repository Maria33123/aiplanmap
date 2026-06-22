param(
    [switch]$NoOpen,
    [string]$Path = "/finder?lang=zh"
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$port = 3000
$hostName = "localhost"
$normalizedPath = if ($Path.StartsWith("/")) { $Path } else { "/$Path" }
$url = "http://${hostName}:$port$normalizedPath"
$healthUrl = "http://127.0.0.1:$port/"
$logFile = Join-Path $projectRoot ".site-server.log"

function Test-LocalPort {
    param([int]$Port)

    $client = [System.Net.Sockets.TcpClient]::new()
    try {
        $connection = $client.ConnectAsync("127.0.0.1", $Port)
        return $connection.Wait(300) -and $client.Connected
    }
    catch {
        return $false
    }
    finally {
        $client.Dispose()
    }
}

function Test-LocalHttp {
    param([string]$Url)

    try {
        $request = [System.Net.HttpWebRequest]::Create($Url)
        $request.Method = "GET"
        $request.Timeout = 1500
        $request.ReadWriteTimeout = 1500
        $response = $request.GetResponse()
        $response.Close()
        return $true
    }
    catch {
        return $false
    }
}

function Get-PortOwner {
    param([int]$Port)

    $connection = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $connection) {
        return $null
    }

    Get-CimInstance Win32_Process -Filter "ProcessId=$($connection.OwningProcess)" -ErrorAction SilentlyContinue
}

function Start-WebsiteServer {
    $escapedProjectRoot = $projectRoot.Replace("'", "''")
    $escapedLogFile = $logFile.Replace("'", "''")
    $command = "Set-Location -LiteralPath '$escapedProjectRoot'; npm run dev *> '$escapedLogFile'"

    Set-Content -LiteralPath $logFile -Value "Starting AI Price Guide at $(Get-Date -Format o)`r`n" -Encoding UTF8
    Start-Process -FilePath "powershell.exe" -ArgumentList @(
        "-NoProfile",
        "-ExecutionPolicy",
        "Bypass",
        "-Command",
        $command
    ) -WorkingDirectory $projectRoot -WindowStyle Hidden
}

if (-not (Test-Path (Join-Path $projectRoot "node_modules"))) {
    throw "Project dependencies are missing. Run npm install once in the project folder: $projectRoot"
}

$isReady = Test-LocalHttp -Url $healthUrl

if (-not $isReady) {
    $owner = Get-PortOwner -Port $port
    if ($owner -and $owner.CommandLine -like "*$projectRoot*") {
        Stop-Process -Id $owner.ProcessId -Force
        Start-Sleep -Milliseconds 800
    }
    elseif ($owner) {
        throw "Port $port is already used by another process. Close it first, then open AI Price Guide again."
    }

    Start-WebsiteServer

    for ($attempt = 0; $attempt -lt 60; $attempt++) {
        Start-Sleep -Milliseconds 500
        if (Test-LocalHttp -Url $healthUrl) {
            $isReady = $true
            break
        }
    }

    if (-not $isReady) {
        throw "The website could not be started on $url. Check $logFile for details."
    }
}

if (-not $NoOpen) {
    $browserInfo = [System.Diagnostics.ProcessStartInfo]::new()
    $browserInfo.FileName = $url
    $browserInfo.UseShellExecute = $true
    $null = [System.Diagnostics.Process]::Start($browserInfo)
}
