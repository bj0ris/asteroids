'use strict';

/*Setting up the canvas and other unimportant things*/
var html = document.getElementsByTagName('html')[0];
var canvas = document.getElementById("canvas");
const HEIGHT = window.innerHeight*0.9;
const WIDTH = window.innerWidth/2;
var ctx = canvas.getContext("2d");
canvas.width = WIDTH;
canvas.height = HEIGHT;


/*main run-time part*/
(function(){
    var player = new Player(new Coords(WIDTH/2,HEIGHT/2),0,WIDTH,HEIGHT);
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
        //markSpot(); Draw spot. For debugging.
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

/*Takes an array of Coordinates defined by the CoordsClass and draws it.*/
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
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	ctx.fillStyle = '#707070';
	ctx.fillRect(0,0,WIDTH,HEIGHT);
}


//-Spot drawer for debugging purposes------------------------------
var previousSpot;
function markSpot(){
    if(previousSpot!==undefined){
        ctx.arc(previousSpot[0], previousSpot[1], 5, 0, 2 * Math.PI, false);
        ctx.fillStyle ='red';
        ctx.lineStyle = 'red';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(previousSpot[2].x,previousSpot[2].y);
        ctx.lineTo(previousSpot[3].x,previousSpot[3].y);
        ctx.stroke();
        ctx.moveTo(previousSpot[4].x,previousSpot[4].y);
        ctx.lineTo(previousSpot[5].x,previousSpot[5].y);
        ctx.stroke();
    }
}
function newSpot(x,y,a0,a1,b0,b1){
    previousSpot = [x,y,a0,a1,b0,b1];
    /*
    console.log("var a0 = {x:"+a0.x+",y:"+a0.y+"};"+
                "var a1 = {x:"+a1.x+",y:"+a1.y+"};"+
                "var b0 = {x:"+b0.x+",y:"+b0.y+"};"+
                "var b1 = {x:"+b1.x+",y:"+b1.y+"};"+
                "var X = "+x+";var Y = "+y+";"+"------------------");
*/
}
//-------------------------------------------------------------------

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
