<?php
//добавляет значения в файл и отправляет обратно.
$form=$_POST['form'];
  file_put_contents('./closed.txt', $form ,FILE_APPEND | LOCK_EX);
echo $form;

?>