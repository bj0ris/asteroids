'use strict';

class Asteroid{
    constructor(_postition,_velocity,_rotation,_nSides,_edgeAngles,_coordArray){
        //this.stage = _stage; //Integer from 3-1 where 4 is the largest and can break 3 times to 1 which disintegrates on explosion
        this.pos = _postition; //x0 and y0 in Coords
		this.vel = _velocity; // Vlocity in Coords
        this.dir = 0;//Direction given in radians
        this.rotPerUp = _rotation; //Rotation per update/screen
        this.nSides = _nSides; //Number of sides or "points" on an asteroid
        this.edgeAngleArray = _edgeAngles; //Array of angles for whatevs...
        this.maxX = WIDTH;
        this.maxY = HEIGHT;
    }
    generateAsteroid(){
        //return an array of x,y coordinates of the polygon that can be easily drawn
        //Also think of how it should handle breakages
        var returnArray = [];
        var size;
        var x0 = this.pos.x;
		var y0 = this.pos.y;
		var angle = this.dir;

        if(this.stage === 3){
            size = 40;
        }

        if(this.stage === 2){
            size = 20;
        }

        if(this.stage === 1){
            size = 10;
        }
    }

    getShot(_directionOfShot){
        //Figure out where it got shot, and make 2-3-4(?) new Asteroids.
    }
    updatePos(){
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
		if(this.pos.x>this.maxX+40){
			this.pos.x = -40;
		}
		if(this.pos.x<-40){
			this.pos.x = this.maxX+40;
		}
		if(this.pos.y>this.maxY+40){
			this.pos.y = -40;
		}
		if(this.pos.y<-40){
			this.pos.y = this.maxY+40;
		}
	}
    rotate(){
        this.dir += this.rotPerUp*0.1;
    }
    getCoordArray(){
        var returnArray = [];
        var maxFromRadius = 8;
        var radius = 40;
        var repeatCoords;
        var distanceBetweenPeaks = (Math.PI*2)/this.nSides;
        for(var i=0;i<this.nSides;i++){
            var x1 = this.pos.x+Math.sin(distanceBetweenPeaks*i+this.dir)*radius;
            var y1 = this.pos.y+Math.cos(distanceBetweenPeaks*i+this.dir)*radius;


            //CHeck difference between one randomAngle for both
            //Vs one for each!
            var randomAngle = this.edgeAngleArray[i];
            var x2 = x1+Math.sin(randomAngle+this.dir)*maxFromRadius;
            var y2 = y1+Math.cos(randomAngle+this.dir)*maxFromRadius;

            returnArray.push(new Coords(x2,y2));
            if(i===0){
                repeatCoords = (new Coords(x2,y2));
            }
        }
        return returnArray;
    }
}
