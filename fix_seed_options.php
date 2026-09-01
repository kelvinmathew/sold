<?php
$content = file_get_contents('C:/xampp/htdocs/sold/seed_options.php');
$content = str_replace(
    'return get_template_directory_uri() . \'/\' . $path;',
    'return get_image_id(\'/\' . $path);',
    $content
);
file_put_contents('C:/xampp/htdocs/sold/seed_options.php', $content);
echo "Fixed seed_options.php";
