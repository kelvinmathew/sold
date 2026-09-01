<?php
$file = 'C:/xampp/htdocs/sold/seed_engine.php';
$c = file_get_contents($file);
// Handle single-quoted values
$c = preg_replace("/'assets\/images\/([^']+)'/", "get_template_directory_uri() . '/assets/images/$1'", $c);
// Handle double-quoted values
$c = preg_replace('/"assets\/images\/([^"]+)"/', "get_template_directory_uri() . '/assets/images/$1'", $c);
file_put_contents($file, $c);
echo "Fixed seed_engine.php!\n";
