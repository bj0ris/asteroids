'use strict';

var html = document.getElementsByTagName('html')[0];
var canvas = document.getElementById("canvas");
const height = 400;
const width = 400;
var ctx = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;



(function(){
    var player = new Player(new Coords(width/2,height/2),0,width,height);
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
    },100);
})();


function getRandomFloat(min,max){
    return Math.random() * (max - min) + min;
}

function getRandomInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function drawLines(arrayOfCoords){
    ctx.beginPath();
    ctx.moveTo(arrayOfCoords[0].x,arrayOfCoords[0].y);
    for(let i = 1;i<arrayOfCoords.length;i++){
        ctx.lineTo(arrayOfCoords[i].x,arrayOfCoords[i].y);
    }
    //Check if array is complete i.e. if the first, and last value are the same
    if(arrayOfCoords[0]!==arrayOfCoords[arrayOfCoords.length-1]){
        ctx.lineTo(arrayOfCoords[0].x,arrayOfCoords[0].y);
    }
    ctx.stroke();
}

function setBackground(){
	ctx.clearRect(0,0,width,height);
	ctx.fillStyle = '#707070';
	ctx.fillRect(0,0,width,height);
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
