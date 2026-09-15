$files = Get-ChildItem -Path core -Recurse -Include *.ftl,*.dtd,*.properties,package.json -Exclude "*-metrics*" | Where-Object { $_.FullName -notmatch "issue-metrics" -and $_.FullName -notmatch "telemetry" -and $_.FullName -notmatch "preferences\\defaults" }

foreach ($f in $files) {
    $text = [IO.File]::ReadAllText($f.FullName)
    $modified = $false
    
    if ($text -match "Zen Browser") {
        $text = $text -replace "Zen Browser", "Ghost Browser"
        $modified = $true
    }
    if ($text -match "Zen browser") {
        $text = $text -replace "Zen browser", "Ghost browser"
        $modified = $true
    }
    
    $regex = [regex]"(?<=[\s""'>])Zen(?=[\s""'<,.?!])"
    if ($regex.IsMatch($text)) {
        $text = $regex.Replace($text, "Ghost")
        $modified = $true
    }
    
    if ($modified) {
        [IO.File]::WriteAllText($f.FullName, $text)
    }
}
