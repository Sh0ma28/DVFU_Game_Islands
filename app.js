var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d');

var gameWidth = 800;
var gameHeight = 800;

var background = new Image();
background.src = "img/bg.png";

var rock = new Image();
rock.src = "img/Rock.png";
var wheat = new Image();
wheat.src = "img/Wheat.png";
var coat = new Image();
coat.src = "img/Coat.png";
var clay = new Image();
clay.src = "img/Clay.png";
var tree = new Image();
tree.src = "img/Tree.png";
var desert = new Image();
desert.src = "img/Desert.png";
var resourcesImgs = [rock, wheat, coat, clay, tree, desert];

var portRock = new Image();
portRock.src = "img/PortRock.png";
var portWheat = new Image();
portWheat.src = "img/PortWheat.png";
var portCoat = new Image();
portCoat.src = "img/PortCoat.png";
var portClay = new Image();
portClay.src = "img/PortClay.png";
var portTree = new Image();
portTree.src = "img/PortTree.png";
var portsImgs = [portRock, portWheat, portCoat, portClay, portTree];

var hexs = [];
var hexsCount = [0, 0, 0, 0, 0, 0];
var maxHexs = 0;

var ports = [];
var portsCount = [0, 0, 0, 0, 0];

for (var i = 0; i < 19; i++)
{
	var rand = Math.floor(Math.random() * 6);
	while ((hexsCount[rand] == 4) || (hexsCount[rand] == 3 && maxHexs == 3) || (rand == 5 && hexsCount[rand] == 1))
	{
		rand++;
		if (rand == 6) rand = 0;
	}
	hexs.push(rand);
	hexsCount[rand]++;
	if (hexsCount[rand] == 4) maxHexs++;
}

for (var i = 0; i < 9; i++)
{
	var rand = Math.floor(Math.random() * 5);
	while (portsCount[rand] == 2)
	{
		rand++;
		if (rand == 5) rand = 0;
	}
	ports.push(rand);
	portsCount[rand]++;
}

function drawHexes () {
	var iter = 0;
	for (var i = 0; i < 3; i++)
	{
		ctx.drawImage(resourcesImgs[hexs[iter++]], gameWidth * 0.262 + gameWidth * 0.15 * i, gameHeight * 0.175, gameWidth / 7, gameHeight / 7);
	}
	for (var i = 0; i < 4; i++)
	{
		ctx.drawImage(resourcesImgs[hexs[iter++]], gameWidth * 0.186 + gameWidth * 0.15 * i, gameHeight * 0.29, gameWidth / 7, gameHeight / 7);
	}
	for (var i = 0; i < 5; i++)
	{
		ctx.drawImage(resourcesImgs[hexs[iter++]], gameWidth * 0.11 + gameWidth * 0.15 * i, gameHeight * 0.405, gameWidth / 7, gameHeight / 7);
	}
	for (var i = 0; i < 4; i++)
	{
		ctx.drawImage(resourcesImgs[hexs[iter++]], gameWidth * 0.186 + gameWidth * 0.15 * i, gameHeight * 0.52, gameWidth / 7, gameHeight / 7);
	}
	for (var i = 0; i < 3; i++)
	{
		ctx.drawImage(resourcesImgs[hexs[iter++]], gameWidth * 0.262 + gameWidth * 0.15 * i, gameHeight * 0.632, gameWidth / 7, gameHeight / 7);
	}
}

function drawPorts () {
	var iter = 0;
	ctx.drawImage(portsImgs[ports[iter++]], gameWidth * 0.2, gameHeight * 0.05, gameWidth / 10, gameHeight / 10);
	ctx.drawImage(portsImgs[ports[iter++]], gameWidth * 0.5, gameHeight * 0.05, gameWidth / 10, gameHeight / 10);
	ctx.drawImage(portsImgs[ports[iter++]], gameWidth * 0.04, gameHeight * 0.3, gameWidth / 10, gameHeight / 10);
	ctx.drawImage(portsImgs[ports[iter++]], gameWidth * 0.75, gameHeight * 0.15, gameWidth / 10, gameHeight / 10);
	ctx.drawImage(portsImgs[ports[iter++]], gameWidth * 0.88, gameHeight * 0.42, gameWidth / 10, gameHeight / 10);
	ctx.drawImage(portsImgs[ports[iter++]], gameWidth * 0.04, gameHeight * 0.55, gameWidth / 10, gameHeight / 10);
	ctx.drawImage(portsImgs[ports[iter++]], gameWidth * 0.75, gameHeight * 0.67, gameWidth / 10, gameHeight / 10);
	ctx.drawImage(portsImgs[ports[iter++]], gameWidth * 0.2, gameHeight * 0.775, gameWidth / 10, gameHeight / 10);
	ctx.drawImage(portsImgs[ports[iter++]], gameWidth * 0.5, gameHeight * 0.775, gameWidth / 10, gameHeight / 10);
}

background.onload = function () {
	ctx.drawImage(background, 0, 0, gameWidth, gameHeight);
	drawHexes();
	drawPorts();
}
