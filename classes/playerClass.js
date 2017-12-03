'use strict';

class Player{
	constructor(_position,_direction,_maxX,_maxY) {
		this.pos = _position;
		this.dir = _direction; //Direction given in radians
		this.vel = new Coords(0,0); //Velocity in x and y direction
		this.rot = 0; //Rotation +1 = left, -1 = right
		this.acc = 0; //Acceleration 1 = accelerate, 0 = not accelerate
		this.dea = 0; //Deaccelerate 1 = active , 0 = not active
		this.maxX = _maxX;
		this.maxY = _maxY;
	}
	//Returns an array of 3 different coordinates representing the corners of the player
	getCoordArray(){
		var h = 10; //Half the length of the player
		var l = 5; //Half the width of the base of the player
		var returnArray = [];

		var x0 = this.pos.x;
		var y0 = this.pos.y;
		var angle = this.dir;
		var xTip = x0+Math.sin(angle)*h;
		var yTip = y0+Math.cos(angle)*h;

		var baseX = x0-Math.sin(angle)*h;
		var baseY = y0-Math.cos(angle)*h;
		var newAngle = angle+Math.PI/2;

		var xL = baseX+Math.sin(newAngle)*l;
		var yL = baseY+Math.cos(newAngle)*l;

		var xR = baseX-Math.sin(newAngle)*l;
		var yR = baseY-Math.cos(newAngle)*l;

		returnArray.push(new Coords(xTip,yTip));
		returnArray.push(new Coords(xL,yL));
		returnArray.push(new Coords(xR,yR));
		returnArray.push(new Coords(xTip,yTip));

		return returnArray;
	}
	//Updates the position based on velocity
	updatePos(){
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;

		//Following is to have "screen wrap". The player appears on the opposite side, when out of bounds.
		if(this.pos.x>this.maxX){
			this.pos.x = 0;
		}
		if(this.pos.x<0){
			this.pos.x = this.maxX;
		}
		if(this.pos.y>this.maxY){
			this.pos.y = 0;
		}
		if(this.pos.y<0){
			this.pos.y = this.maxY;
		}
	}

	rotate(){
		this.dir+= this.rot*0.1;
	}
	accelerate(){
		//See what adding a boost when the tota velocity is low does
		//I have a feeling it will make the steering feel mouch better.
		var acc = 0.1;
		var deltaVelX;
		var deltaVelY;
		if(this.acc === 1){
			deltaVelX = Math.sin(this.dir)*acc;
			deltaVelY = Math.cos(this.dir)*acc;
			this.vel.x += deltaVelX;
			this.vel.y += deltaVelY;
		}
	}
	deaccelerate(){
		var deAc = 0.95;
		if(this.dea === 1){
			this.vel.x = this.vel.x*deAc;
			this.vel.y = this.vel.y*deAc;
		}
	}
}
