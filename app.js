window.onload = init;

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

var dice1 = new Image();
dice1.src = "img/Dice1.png";
var dice2 = new Image();
dice2.src = "img/Dice2.png";
var dice3 = new Image();
dice3.src = "img/Dice3.png";
var dice4 = new Image();
dice4.src = "img/Dice4.png";
var dice5 = new Image();
dice5.src = "img/Dice5.png";
var dice6 = new Image();
dice6.src = "img/Dice6.png";
var dicesImgs = [dice1, dice2, dice3, dice4, dice5, dice6]

var hexs = [];
var hexsCount = [0, 0, 0, 0, 0, 0];
var maxHexs = 0;
var hexsNums = [];
var hexsNumsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var ports = [];
var portsCount = [0, 0, 0, 0, 0];

var dices = [-1, -1];

function init () {

	document.addEventListener("click", checkClick);

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

	for (var i = 0; i < 18; i++)
	{
		var rand = 2 + Math.floor(Math.random() * 11);
		while (rand == 7 || (hexsNumsCount[rand] == 2) || (hexsNumsCount[rand] == 1 && (rand == 2 || rand == 12)))
		{
			rand++;
			if (rand == 13) rand = 2;
		}
		hexsNums.push(rand);
		hexsNumsCount[rand]++;
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
	dropDices();
	draw();
}

function dropDices () {
	var rand1 = Math.floor(Math.random() * 6);
	var rand2 = Math.floor(Math.random() * 6);
	var sum = rand1 + rand2 + 2;
	dices[0] = rand1;
	dices[1] = rand2;
}

function checkClick (e) {

	if(e.pageX - canvas.offsetLeft >=  gameWidth / 10 * 8 - 10 &&
	 	e.pageX - canvas.offsetLeft <= gameWidth &&
		e.pageY - canvas.offsetTop >= gameHeight / 10 * 9 - 5 &&
		e.pageY - canvas.offsetTop <= gameHeight)
		dropDices();
		drawDice();
}

function draw() {
	ctx.drawImage(background, 0, 0, gameWidth, gameHeight);
	drawHexes();
	drawPorts();
	drawDice();
}

function drawHexes () {
	ctx.fillStyle = "#00F";
    ctx.strokeStyle = "#F00";
    ctx.font = "24pt Arial";
	var iter = 0;
	var skip;
	for (var i = 0; i < 3; i++)
	{
		ctx.drawImage(resourcesImgs[hexs[iter]], gameWidth * 0.262 + gameWidth * 0.15 * i, gameHeight * 0.175, gameWidth / 7, gameHeight / 7);
		if (hexs[iter] != 5) ctx.fillText(hexsNums[iter], gameWidth * 0.32 + gameWidth * 0.15 * i, gameHeight * 0.22);
		else skip = iter;
		iter++;
	}
	for (var i = 0; i < 4; i++)
	{
		ctx.drawImage(resourcesImgs[hexs[iter]], gameWidth * 0.186 + gameWidth * 0.15 * i, gameHeight * 0.29, gameWidth / 7, gameHeight / 7);
		if (hexs[iter] != 5) ctx.fillText(hexsNums[iter], gameWidth * 0.25 + gameWidth * 0.15 * i, gameHeight * 0.34);
		else skip = iter;
		iter++;
	}
	for (var i = 0; i < 5; i++)
	{
		ctx.drawImage(resourcesImgs[hexs[iter]], gameWidth * 0.11 + gameWidth * 0.15 * i, gameHeight * 0.405, gameWidth / 7, gameHeight / 7);
		if (hexs[iter] != 5) ctx.fillText(hexsNums[iter], gameWidth * 0.17 + gameWidth * 0.15 * i, gameHeight * 0.45);
		else skip = iter;
		iter++;
	}
	for (var i = 0; i < 4; i++)
	{
		ctx.drawImage(resourcesImgs[hexs[iter]], gameWidth * 0.186 + gameWidth * 0.15 * i, gameHeight * 0.52, gameWidth / 7, gameHeight / 7);
		if (hexs[iter] != 5) ctx.fillText(hexsNums[iter], gameWidth * 0.24 + gameWidth * 0.15 * i, gameHeight * 0.58);
		else skip = iter;
		iter++;
	}
	for (var i = 0; i < 3; i++)
	{
		ctx.drawImage(resourcesImgs[hexs[iter]], gameWidth * 0.262 + gameWidth * 0.15 * i, gameHeight * 0.632, gameWidth / 7, gameHeight / 7);
		if (hexs[iter] != 5) {
			if (i != 2) ctx.fillText(hexsNums[iter], gameWidth * 0.31 + gameWidth * 0.15 * i, gameHeight * 0.69);
		}
		else skip = iter;
		iter++;
	}
	ctx.fillText(hexsNums[skip], gameWidth * 0.31 + gameWidth * 0.15 * 2, gameHeight * 0.69);
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

function drawDice () {
	ctx.drawImage(dicesImgs[dices[0]], gameWidth / 10 * 8 - 10, gameHeight / 10 * 9 - 5, gameWidth / 10, gameHeight / 10);
	ctx.drawImage(dicesImgs[dices[1]], gameWidth / 10 * 9 - 5, gameHeight / 10 * 9 - 5, gameWidth / 10, gameHeight / 10);
}