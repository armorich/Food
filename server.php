<?php
    $_POST = json_decode(file_get_contents("php://input"), true);
    echo var_dump($_POST);  //Команда возвращает данные полученные с клиента и превращает их в строку 
    
