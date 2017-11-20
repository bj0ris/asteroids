'use strict';

class AsteroidContainer {
    constructor(_numAsteroids){
        this.num = _numAsteroids;
        this.astArray = [];
        this.generateAsteroids(_numAsteroids);
    }
    generateAsteroids(_numAsteroids){
        for(var i=0;i<_numAsteroids;i++){
            var randomX = getRandomInt(0,WIDTH);
            var randomY = getRandomInt(0,HEIGHT);
            var position = new Coords(randomX,randomY);
            var velocity = new Coords(getRandomFloat(0,1),getRandomFloat(0,1));
            var rotation =  getRandomFloat(0,0.5);
            var nSides = getRandomInt(6,10);
            var edgeAngleArray = [];
            for(var j=0;j<nSides;j++){
                edgeAngleArray.push(getRandomFloat(0,(Math.PI*2)));
            }
            this.astArray.push(new Asteroid(position,velocity,rotation,nSides,edgeAngleArray));
        }
    }
    checkIfSpotTaken(x,y,maxRadius){
        //For generating asteroids, check that position is not "taken"

    }
    rotate(){
        for(var i=0;i<this.astArray.length;i++){
            this.astArray[i].rotate();
        }
    }
    updatePos(){
        for(var i=0;i<this.astArray.length;i++){
            this.astArray[i].updatePos();
        }
    }
    getCoordArrays(){
        var returnArray = [];
        var allArray = [];
        for(var i=0;i<this.num;i++){
            returnArray.push(this.astArray[i].getCoordArray());
        }
        return returnArray;


    }
}
