Add-Type -AssemblyName System.Drawing

function Trim-Logo {
    param($InputPath, $OutputPath)
    
    $bmp = [System.Drawing.Bitmap]::new($InputPath)
    $minX = $bmp.Width
    $minY = $bmp.Height
    $maxX = 0
    $maxY = 0
    
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            $p = $bmp.GetPixel($x, $y)
            $isContent = ($p.A -gt 10) -and ($p.R -lt 250 -or $p.G -lt 250 -or $p.B -lt 250)
            if ($isContent) {
                if ($x -lt $minX) { $minX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    
    # Add 2px padding
    $pad = 2
    $minX = [Math]::Max(0, $minX - $pad)
    $minY = [Math]::Max(0, $minY - $pad)
    $maxX = [Math]::Min($bmp.Width - 1, $maxX + $pad)
    $maxY = [Math]::Min($bmp.Height - 1, $maxY + $pad)
    
    $w = $maxX - $minX + 1
    $h = $maxY - $minY + 1
    $rect = [System.Drawing.Rectangle]::new($minX, $minY, $w, $h)
    $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
    $cropped.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Output "$OutputPath - Cropped to ${w}x${h}"
    $bmp.Dispose()
    $cropped.Dispose()
}

$base = "c:\Users\HP\.gemini\antigravity-ide\scratch\sold\assets\images"
Trim-Logo "$base\ellington.png" "$base\ellington-cropped.png"
Trim-Logo "$base\banyan.png" "$base\banyan-cropped.png"
Trim-Logo "$base\regus.png" "$base\regus-cropped.png"
