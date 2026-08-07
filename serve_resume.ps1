$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:3001/")
$listener.Start()
Write-Host "Resume production server started at http://localhost:3001/"

$distFolder = "C:\Users\dragonyx\Documents\antigravity\optimistic-goodall\dist"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $localPath = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($localPath)) {
        $localPath = "index.html"
    }
    
    $filePath = Join-Path $distFolder $localPath
    if (-not (Test-Path $filePath -PathType Leaf)) {
        $filePath = Join-Path $distFolder "index.html"
    }

    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
    switch ($ext) {
        ".html" { $response.ContentType = "text/html; charset=utf-8" }
        ".css"  { $response.ContentType = "text/css" }
        ".js"   { $response.ContentType = "application/javascript" }
        ".jpg"  { $response.ContentType = "image/jpeg" }
        ".png"  { $response.ContentType = "image/png" }
        ".svg"  { $response.ContentType = "image/svg+xml" }
        default { $response.ContentType = "application/octet-stream" }
    }

    try {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } catch {
        $response.StatusCode = 500
    } finally {
        $response.OutputStream.Close()
    }
}
