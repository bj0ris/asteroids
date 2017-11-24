'use strict';
//Coordinates
class Coords{
    constructor(_x,_y){
        this.x = _x;
        this.y = _y;
        this.prevX;
        this.prevY;
    }
    redefineOrigoTo(_x,_y){
        this.prevX = this.x;
        this.prevY = this.y;
        this.x -= _x;
        this.y -= _y;
    }
}
