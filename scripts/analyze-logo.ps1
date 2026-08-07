Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::new("c:\Users\HP\.gemini\antigravity-ide\scratch\sold\assets\images\ellington.png")

# Check if the image has transparency
$hasAlpha = $false
$minX = $bmp.Width
$minY = $bmp.Height
$maxX = 0
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.A -lt 255) {
            $hasAlpha = $true
        }
        # Check if pixel is NOT white/near-white and NOT transparent
        $isContent = ($p.A -gt 10) -and ($p.R -lt 250 -or $p.G -lt 250 -or $p.B -lt 250)
        if ($isContent) {
            if ($x -lt $minX) { $minX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output "Has alpha: $hasAlpha"
Write-Output "Content bounds: ($minX, $minY) to ($maxX, $maxY)"
Write-Output "Content size: $($maxX - $minX + 1) x $($maxY - $minY + 1)"
Write-Output "Image size: $($bmp.Width) x $($bmp.Height)"

# Sample some pixels
Write-Output "Pixel(0,0): R=$($bmp.GetPixel(0,0).R) G=$($bmp.GetPixel(0,0).G) B=$($bmp.GetPixel(0,0).B) A=$($bmp.GetPixel(0,0).A)"
Write-Output "Pixel(150,150): R=$($bmp.GetPixel(150,150).R) G=$($bmp.GetPixel(150,150).G) B=$($bmp.GetPixel(150,150).B) A=$($bmp.GetPixel(150,150).A)"

$bmp.Dispose()
