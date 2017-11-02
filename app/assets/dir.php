<?php
$path    = 'content';
$files = array_values(array_diff(scandir($path), array('.', '..')));
echo json_encode($files);
?>