'use strict';

var html = document.getElementsByTagName('html')[0];
var canvas = document.getElementById("canvas");
var intFrameWidth = window.innerWidth;
var intFrameHeight = window.innerHeight;
const HEIGHT = intFrameHeight*0.9;
const WIDTH = intFrameWidth/2;
var ctx = canvas.getContext("2d");
canvas.width = WIDTH;
canvas.height = HEIGHT;



(function(){
    var player = new Player(new Coords(WIDTH/2,HEIGHT/2),0,WIDTH,HEIGHT);
    //var asteroids = [];
    var asteroids = new AsteroidContainer(4);

    html.addEventListener('keydown',function(e){
        keydown(e,player);
    });
    html.addEventListener('keyup',function(e){
        keyup(e,player);
    });
    setInterval(function(){
        setBackground();
        player.rotate();
        player.deaccelerate();
        player.accelerate();
        player.updatePos();
        drawLines(player.getCoordArray());
        asteroids.rotate();
        asteroids.updatePos();
        asteroids.checkIfCollission();
        var asteroidsArray = asteroids.getCoordArrays();
        for(var i=0;i<asteroidsArray.length;i++){
            drawLines(asteroidsArray[i]);
        }
    },20);
})();


function getRandomFloat(min,max){
    return Math.random() * (max - min) + min;
}

function getRandomInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function drawLines(arrayOfxy){
    ctx.beginPath();
    ctx.moveTo(arrayOfxy[0].x,arrayOfxy[0].y);
    for(let i = 1;i<arrayOfxy.length;i++){
        ctx.lineTo(arrayOfxy[i].x,arrayOfxy[i].y);
    }
    //Check if array is complete i.e. if the first, and last value are the same
    if(arrayOfxy[0]!==arrayOfxy[arrayOfxy.length-1]){
        ctx.lineTo(arrayOfxy[0].x,arrayOfxy[0].y);
    }
    ctx.stroke();
}
function setBackground(){
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	ctx.fillStyle = '#707070';
	ctx.fillRect(0,0,WIDTH,HEIGHT);
}

function keydown(event,player){
    var key = event.keyCode;
	//right 39
	if(key===39){
		player.rot = -1;
	}
	//left 37
	if(key===37){
		player.rot = 1;;
	}
	//up 38
	if(key===38){
		player.acc = 1;
	}
	//down 40 ?????????
	if(key===40){
		player.dea = 1;
	}
	//space 32
}

function keyup(event,player){
	var key = event.keyCode;
	//right 39
	//left 37
	if(key===39||key===37){
		player.rot = 0;
	}
	//acc off
	if(key===38){
		player.acc = 0;
	}
	if(key===40){
		player.dea = 0;
	}
}
