var player;
var startR = 50;
var zoom = 1;
var snake;
var blobs = [];
var playerName;
var sessionCode = 0;

function setup () 
{
    playerName = prompt("Enter your name:");
    database.ref("count").get().then((snapshot) => {
        if (snapshot.exists()) sessionCode = snapshot.val();
        else sessionCode = 0;
        database.ref("sessions/" + sessionCode + "/playerName").set(playerName); 
        database.ref("count").set(sessionCode + 1);   
    });
    createCanvas(window.innerWidth - 10, window.innerHeight - 20); // чтобы не создавались ползунки
    player = new Blob(0, 0, startR, false);
    snake = new Snake(player);
    for (var i = 0; i < 100; i++)
        blobs[i] = new Blob(random(-width * 2, width * 2), random(-height * 2, height * 2), 10, false);
}

function draw ()
{
    background(128, 128, 128);
    translate(width / 2, height / 2); // перемещает камеру в центр
    var newzoom = startR / player.r; 
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);

    translate(-player.pos.x , -player.pos.y);
    for (var y = -height * 2; y < height * 2; y += 150)
        line(-width * 2, y, width * 2, y);
    for (var x = -width * 2; x < width * 2; x += 150)
            line(x, -height * 2, x, height * 2);
    player.show();
    snake.show();
    player.update(mouseX - width / 2, mouseY - height / 2, 3);
    snake.head = player;
    snake.update();

    for (var i = blobs.length - 1; i >= 0; i--)
    {
        if (player.eating(blobs[i]))
        {
            blobs.splice(i, 1);
            blobs.push(new Blob(random(-width * 2, width * 2), random(-height * 2, height * 2), 10, false)); // спавн новой еды
        }
        if (blobs[i] != undefined) blobs[i].show(); // условие для непредвиденных ошибок
    } 
}
