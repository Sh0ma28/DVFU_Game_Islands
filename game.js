var player;
var startR = 50;
var zoom = 1;
var snake;
var blobs = [];

function setup () 
{
    createCanvas(window.innerWidth - 10, window.innerHeight - 20); // чтобы не создавались ползунки
    player = new Blob(0, 0, startR, false);
    snake = new Snake(player);
    for (var i = 0; i < 100; i++)
        blobs[i] = new Blob(random(-width,width), random(-height,height), 10, false);
}

function draw ()
{
    background(128, 128, 128);
    translate(width / 2, height / 2); // перемещает камеру в центр
    var newzoom = startR / player.r; 
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);

    translate(-player.pos.x , -player.pos.y);
    for (var x= -width; x < width; x += 150) // сетка на фоне
    {
        for (var y= -height; y < height; y += 150)
        {
            line(x, y, width, y);
            line(x, y, x, height);
        }
    }

    snake.show();
    player.show();
    player.update(mouseX - width / 2, mouseY - height / 2, 3);
    snake.head = player;
    snake.update();
    
    for (var i = blobs.length - 1; i >= 0; i--)
    {
        if (player.eating(blobs[i]))
        {
            blobs.splice(i, 1);
            blobs.push(new Blob(random(-width, width), random(-height, height), 10, false)); // спавн новой еды
        }
        if (blobs[i] != undefined) blobs[i].show(); // условие для непредвиденных ошибок
    } 
}
