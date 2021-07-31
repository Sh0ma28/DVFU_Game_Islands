var player;
var startR = 50;
var zoom = 1;
var snake;
var blobs = [];
var AI = []
var snakes = [];
var playerName;
var sessionCode = 0;
var time = 0;

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
    player = new Blob(0, 0, startR, false, false, [random(255),random(255),random(255)]);
    snake = new Snake(player);
    for (var i = 0; i < 10; i++)
    {
        AI[i] = new Blob(random(-width, width), random(-height, height), startR, false, true, [random(255),random(255),random(255)]);
        snakes[i] = new Snake(AI[i]);
    }
    for (var i = 0; i < 100; i++)
        blobs[i] = new Blob(random(-width * 2, width * 2), random(-height * 2, height * 2), 10, false, false, [random(255),random(255),random(255)]);
}

function draw ()
{
    background(128, 128, 128);
    translate(width / 2, height / 2); // перемещает камеру в центр
    var newzoom = startR / player.r; 
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);

    translate(-player.pos.x , -player.pos.y);
    for (var y = -height * 2; y < height * 2; y += 150) // фоновые линии
        line(-width * 2, y, width * 2, y);
    for (var x = -width * 2; x < width * 2; x += 150)
        line(x, -height * 2, x, height * 2);
    
    for (var i = 0; i < 10; i++) // отрисовка
    {
        AI[i].show();
        snakes[i].show();
    }
    player.show();
    snake.show();

    for (var i = 0; i < 10; i++) // обновление
    {
        AI[i].update(blobs[i].pos.x - AI[i].pos.x, blobs[i].pos.y -AI[i].pos.y, 3.1);
        snakes[i].head = AI[i];
        snakes[i].update();
    }
    player.update(mouseX - width / 2, mouseY - height / 2, 3);
    snake.head = player;
    snake.update();

    for (var i = AI.length - 1; i >= 0; i--) // проверка на съедание змей
    {
        if (player.eatingSnakes(AI[i]))
        {
            AI.splice(i, 1);
            snakes.splice(i, 1);
            AI.push(new Blob(random(-width, width), random(-height, height), startR, false, true, [random(255),random(255),random(255)]));
            snakes.push(new Snake(AI[9]));
        }
    }

    for (var i = blobs.length - 1; i >= 0; i--) // проверка на съедание шариков
    {
        for(var j = 0; j < AI.length; j++)
        {
            if (player.eatingBlobs(blobs[i]) || AI[j].eatingBlobs(blobs[i]))
            {
                blobs.splice(i, 1);
                blobs.push(new Blob(random(-width * 2, width * 2), random(-height * 2, height * 2), 10, false, false, [random(255),random(255),random(255)]));
            }
        }
        if (blobs[i] != undefined) blobs[i].show();
    } 
}

setInterval(() => database.ref("sessions/" + sessionCode + "/score").set(player.mass), 1000);
setInterval(() => database.ref("sessions/" + sessionCode + "/time").set(time++), 1000);