'use strict';
//Coordinates
class Coords{
    constructor(_x,_y){
        this.x = _x;
        this.y = _y;
    }
    redefineOrigoTo(_x,_y){
        this.x -= _x;
        this.y -= _y;
    }
}
