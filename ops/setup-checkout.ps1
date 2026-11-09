# Experiment 626 - checkout setup for the web server.
# Run in an Administrator PowerShell. It asks for the database address and the shop_app password.
# Nothing secret is stored in this file or in GitHub.
$ErrorActionPreference = 'Stop'

$me = [Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
if (-not $me.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) { throw 'Run this in an Administrator PowerShell.' }

$root = Split-Path $PSScriptRoot -Parent
if (-not (Test-Path "$root\checkout.php")) { throw "checkout.php was not found in $root. Add it to the GitHub repo first." }
$utf8 = New-Object System.Text.UTF8Encoding($false)

Write-Host '1/6 Enabling the PostgreSQL driver in PHP...'
$ini = 'C:\PHP\php.ini'
foreach ($e in 'pdo_pgsql', 'pgsql') {
    if (-not (Select-String -Path $ini -Pattern "^\s*extension\s*=\s*$e\s*$" -Quiet)) {
        Add-Content -Path $ini -Value "extension=$e"
    }
}
$mods = & C:\PHP\php.exe -m
if (-not ($mods -contains 'pdo_pgsql')) { throw 'pdo_pgsql did not load. Check that C:\PHP\ext\php_pdo_pgsql.dll and C:\PHP\libpq.dll exist.' }
Write-Host '    pdo_pgsql is loaded.'

Write-Host '2/6 Creating the config and log folders (outside the web root)...'
New-Item -ItemType Directory -Force -Path C:\inetpub\config, C:\inetpub\shoplogs | Out-Null
icacls C:\inetpub\config /grant 'IIS_IUSRS:(OI)(CI)R' | Out-Null
icacls C:\inetpub\shoplogs /grant 'IIS_IUSRS:(OI)(CI)M' | Out-Null

Write-Host '3/6 Writing the shop config...'
$dbhost = Read-Host 'Database server address'
$sec = Read-Host 'shop_app password (typing is hidden)' -AsSecureString
$pw = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec))
if (-not $dbhost -or -not $pw) { throw 'The address and password cannot be empty.' }
$hostPhp = $dbhost.Replace('\', '\\').Replace("'", "\'")
$pwPhp = $pw.Replace('\', '\\').Replace("'", "\'")
$cfg = @"
<?php
// Experiment 626 shop settings. Lives outside the web root. Never commit this file.
return [
    'db_host'       => '$hostPhp',
    'db_port'       => 5432,
    'db_name'       => 'exp626_shop',
    'db_user'       => 'shop_app',
    'db_pass'       => '$pwPhp',
    'db_sslmode'    => 'prefer',
    'smtp_host'     => '127.0.0.1',
    'smtp_port'     => 25,
    'mail_from'     => 'support@experiment626.com',
    'support_email' => 'support@experiment626.com',
    'log_file'      => 'C:\\inetpub\\shoplogs\\shop-errors.log',
];
"@
[IO.File]::WriteAllText('C:\inetpub\config\shop-config.php', $cfg, $utf8)

Write-Host '4/6 Copying checkout.php into the site...'
Copy-Item "$root\checkout.php" C:\inetpub\wwwroot\checkout.php -Force

Write-Host '5/6 Testing the database connection with these settings...'
$t = @'
<?php
$c = require 'C:\inetpub\config\shop-config.php';
try {
    $p = new PDO('pgsql:host=' . $c['db_host'] . ';port=' . $c['db_port'] . ';dbname=' . $c['db_name'], $c['db_user'], $c['db_pass'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_TIMEOUT => 5]);
    echo 'DB OK: ' . $p->query('SELECT count(*) FROM products')->fetchColumn() . " products found\n";
} catch (Throwable $e) { echo 'DB FAILED: ' . $e->getMessage() . "\n"; }
'@
$tf = Join-Path $env:TEMP 'e626dbtest.php'
[IO.File]::WriteAllText($tf, $t, $utf8)
& C:\PHP\php.exe $tf
Remove-Item $tf -Force

iisreset | Out-Null
try { Invoke-WebRequest http://localhost/checkout.php -UseBasicParsing | Out-Null; $code = 200 }
catch { if ($_.Exception.Response) { $code = [int]$_.Exception.Response.StatusCode } else { $code = 0 } }
Write-Host "    GET /checkout.php returned $code (405 is the correct answer)."

# The teammate's API reads the shop_app password from SHOP_DB_PASSWORD.
if ($null -ne [Environment]::GetEnvironmentVariable('SHOP_DB_PASSWORD', 'Machine')) {
    $a = Read-Host 'The teammate API uses SHOP_DB_PASSWORD. Update it to this password and restart it? (y/n)'
    if ($a -eq 'y') {
        [Environment]::SetEnvironmentVariable('SHOP_DB_PASSWORD', $pw, 'Machine')
        schtasks /end /tn "Exp626 API" | Out-Null
        schtasks /run /tn "Exp626 API" | Out-Null
        Start-Sleep -Seconds 5
        try { $n = @(Invoke-RestMethod http://localhost/api/products).Count; Write-Host "    His API answered with $n products." }
        catch { Write-Host '    His API did not answer yet. Tell your teammate; it may need a restart of the task or the server.' }
    }
}

Write-Host '6/6 Optional test order'
$a = Read-Host 'Place ONE test order now? It adds a real test row to the database (y/n)'
if ($a -eq 'y') {
    $body = '{"name":"Test Person","email":"test@example.com","items":[{"pid":"mug-1","size":"11","qty":1}]}'
    try {
        $r = Invoke-RestMethod -Method Post -Uri http://localhost/checkout.php -ContentType 'application/json' -Body $body
        Write-Host ("    Result: ok={0} orderId={1} emailSent={2}" -f $r.ok, $r.orderId, $r.emailSent)
    } catch {
        Write-Host '    The order failed:' $_.Exception.Message
        if (Test-Path C:\inetpub\shoplogs\shop-errors.log) { Get-Content C:\inetpub\shoplogs\shop-errors.log -Tail 5 }
    }
}
Write-Host 'Done. Send Claude everything above this line.'
