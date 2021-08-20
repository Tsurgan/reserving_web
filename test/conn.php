<?php
//передает значения из сервера.
$file = file_get_contents('./closed.txt', true);
echo $file;

?>