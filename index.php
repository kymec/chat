<? 
if (!empty($_POST['getmessage']))
{
    include ('connect.inc');
    if (mysqli_connect_errno()) { printf("Подключение невозможно: %s\n", mysqli_connect_error()); exit();}
    mysqli_set_charset($mysqli,"utf8");
    if ($res = $mysqli->query("SELECT * FROM chat")) 
    {
        $z=0;
        echo '{';
        while( $row = $res->fetch_array() )
        {
            if ($z != 0){
                echo '},';
            }
            echo '"'.$z.'" : {';
            echo '"id": "'.$row['id'].'",';
            echo '"hu": "'.$row['hu'].'",';
            echo '"fro": "'.$row['fro'].'",';
            echo '"text": "'.$row['text'].'"';
            
            $z++;
        }
        echo '}}';
        $res->close();
    }								
    else echo($mysqli->error);
    $mysqli->close();
    exit();
}

if (!empty($_POST['enter']))
{
	include ('connect.inc');
	mysqli_set_charset($mysqli,"utf8");
			if (mysqli_connect_errno()) { printf("Подключение невозможно: %s\n", mysqli_connect_error()); exit();}
			$mysqli->query("INSERT INTO chat 
	(
	hu, 
	fro, 
	text
	) VALUES 
	(
	'".$_POST['hu']."',
	'".$_POST['fro']."',
	'".$_POST['text']."'
	)");
			$mysqli->close();
	
	header("Location: index.php"); 
	exit();
}
?>
<div id="chat" style="height: 200px; width: 300px; overflow-y: auto"></div>
<input type="text" id="message">
<button id="send">Отправить</button>
<script src="./chat.js"></script>