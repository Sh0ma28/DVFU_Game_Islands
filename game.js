var player;
var startR = 30;
var zoom = 1;
var snake;
var blobs = [];
var AI = []
var snakes = [];
var playerName;
var sessionCode = 0;
var time = 0;
var bestPlayers = [];
var bestScores = [];
var position = 4;

var massHTML = document.getElementById("mass");
var timeHTML = document.getElementById("time");
/*var bestHTML = [document.getElementById("1st"), document.getElementById("2nd"),
document.getElementById("3rd"), document.getElementById("4th"), document.getElementById("5th")];*/
var codeHTML = document.getElementById("code");

function setup () 
{
    playerName = prompt("Enter your name:");

    database.ref("count").get().then((snapshot) => { // обращение в базу
        if (snapshot.exists()) sessionCode = snapshot.val();
        else sessionCode = 0;
        database.ref("sessions/" + sessionCode + "/playerName").set(playerName); 
        database.ref("count").set(sessionCode + 1);
        codeHTML.innerText = "Code: " + sessionCode; 
    });
    /*for (var i = 1; i <= 5; i++) лидерборд в разработке
    {
        database.ref("bestPlayers/" + i).get().then((snapshot) => {
            if (snapshot.exists()) 
            {
                bestPlayers.push(snapshot.val().playerName);
                bestScores.push(snapshot.val().score);
            }
            else
            {
                bestPlayers.push("none");
                bestScores.push(0);
            }
            bestHTML[i - 1].innerHTML = snapshot.val().playerName.ToString() + ": " + snapshot.val().score;
        });
    }*/

    createCanvas(window.innerWidth - 10, window.innerHeight - 20); // чтобы не создавались ползунки
    player = new Blob(0, 0, startR, false, false, [random(255),random(255),random(255)]);
    snake = new Snake(player);
    for (var i = 0; i < 10; i++)
    {
        AI[i] = new Blob(random(-width, width), random(-height, height), startR, false, true, [random(255),random(255),random(255)]);
        snakes[i] = new Snake(AI[i]);
    }
    for (var i = 0; i < 100; i++)
        blobs[i] = new Blob(random(-width * 2, width * 2), random(-height * 2, height * 2), random(10, 25), false, false, [random(255),random(255),random(255)]);
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
        AI[i].update(blobs[i].pos.x - AI[i].pos.x, blobs[i].pos.y - AI[i].pos.y, 3);
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
                blobs.push(new Blob(random(-width * 2, width * 2), random(-height * 2, height * 2), random(10, 25), false, false, [random(255),random(255),random(255)]));
            }
        }
        if (blobs[i] != undefined) blobs[i].show();
    } 
}

setInterval(() => database.ref("sessions/" + sessionCode + "/score").set(player.mass), 1000);
setInterval(() => database.ref("sessions/" + sessionCode + "/time").set(time++), 1000);

setInterval(() => massHTML.innerText = "Score: " + player.mass, 1000);
setInterval(() => timeHTML.innerText = "Time: " + time, 1000);

/*setInterval(() => {
    if (position != -1 && player.mass > bestScores[position])
    {
        if (position != 4)
        {
            var buf = [bestPlayers[position], bestScores[position]];
            bestPlayers[position] = playerName;
            bestScores[position] = player.mass;
            bestPlayers[position + 1] = buf[0];
            bestScores[position + 1] = buf[1];
            database.ref("bestPlayers/" + (position + 2) + "/playerName").set(bestPlayers[position + 1]);
            database.ref("bestPlayers/" + (position + 2) + "/score").set(bestScores[position + 1]);
        }
        else
        {
            bestPlayers[position] = playerName;
            bestScores[position] = player.mass;
        }
        database.ref("bestPlayers/" + (position + 1) + "/playerName").set(bestPlayers[position]);
        database.ref("bestPlayers/" + (position + 1) + "/score").set(bestScores[position]);
        position--;
    }
}, 1000);*/
