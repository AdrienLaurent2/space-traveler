<?php
//Connexion variable
define('DB_HOST', 'localhost');
define('DB_NAME', 'space_adventures_db');
define('DB_USER','root');
define('DB_PASS', 'root');
try{
    // Try to connect to database
   $pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME,DB_USER,DB_PASS);

   // Set fetch mode to object
   $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_OBJ);
}

catch(Exception $e){
  die('Impossible de se connecter à la BDD');
}
?>
