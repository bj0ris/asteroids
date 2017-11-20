'use strict';

/*
    Class that generates and keeps track of the active Asteroids.

    The reason I chose create this class instead of just having an array of asteroids in
    main.js, is that in the future I want asteroids to be able to break apart.
    This means the numer of total asteroids will change, and having a separate
    class that can manage this will be easier... I think
*/

class AsteroidContainer {
    constructor(_numAsteroids){
        this.num = _numAsteroids;
        this.astArray = [];
        this.generateAsteroids(_numAsteroids);
    }

    generateAsteroids(_numAsteroids){
        for(var i=0;i<_numAsteroids;i++){
            do{
                var randomX = getRandomInt(0,WIDTH);
                var randomY = getRandomInt(0,HEIGHT);
                var isAvailable = this.checkIfSpotTaken(randomX,randomY,40+8);
            }while(isAvailable);

            //Check that the random coordinates aren't "taken"
            var position = new Coords(randomX,randomY);
            var rotation =  getRandomFloat(0,0.5);
            var velocity = new Coords(getRandomFloat(0,2),getRandomFloat(0,2));
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
        for(var i=0;i<this.astArray.length;i++){
            //Distance from Pythagoras
            var xDiff = Math.abs(Math.abs(x)-Math.abs(this.astArray[i].pos.x));
            var yDiff = Math.abs(Math.abs(y)-Math.abs(this.astArray[i].pos.y));
            var distance = Math.sqrt((Math.pow(xDiff,2)+ Math.pow(yDiff,2)));
            if(distance<maxRadius*2){
                return true;
            }
        }
        return false;
    }
    //------------------------UNFINISHED
    checkIfCollission(){

        for(var i=0;i<this.astArray.length-1;i++){
            for(var j=i+1;j<this.astArray.length;j++){
                var collisionTest = this.collisionCompare(this.astArray[i],this.astArray[j]);
                if(Array.isArray(collisionTest)){
                    /*A collision Happened!
                    What to do now? Well I think since it's in space the
                    collision should be mostly elastic, but not completely
                    because of the mutual residual gravitational pull.
                    This means that the total combined speed of the asteroids
                    will decline. Remeber, shooting the asteroids should Also
                    change their velocity and rotation. Build it and test
                    to see what will work best.
                    */
                    this.astArray[i].vel.x = -this.astArray[i].vel.x;
                    this.astArray[i].vel.y = -this.astArray[i].vel.y;
                    this.astArray[i].rotPerUp = -this.astArray[i].rotPerUp;


                    this.astArray[j].vel.x = -this.astArray[i].vel.x;
                    this.astArray[j].vel.y = -this.astArray[j].vel.y;
                    this.astArray[j].rotPerUp = -this.astArray[j].rotPerUp;

                }
            }
        }
    }
    collisionCompare(asteroid1,asteroid2){
        var array1 = asteroid1.getCoordArray();
        var array2 = asteroid2.getCoordArray();
        for(var i=0;i<array1.length-1;i++){
            for(var j=0;j<array2.length-1;j++){

                var a0 = array1[i];
                var a1 = array1[i+1];
                var smallXA;
                var b0 = array2[i];
                var b1 = array2[i+1];
                var vectorBoxIntersectBool = this.vectorBoxIntersect(array1[i],array1[i+1],array2[j],array2[j+1]);
                if(vectorBoxIntersectBool){
                    var intersectPointBool = this.intersectPoint(array1[i],array1[i+1],array2[j],array2[j+1]);
                    //if(intersectPointBool){
                        var returnArray = [array1[i],array1[i+1],array2[j],array2[j+1]];
                        return returnArray;
                    //}
                }
            }
        }
        return null;
    }
    //This should perhaps be a global function.
    vectorBoxIntersect(a0,a1,b0,b1){
        var smallestAx = (a0.x<=a1.x ? a0.x:a1.x);
        var smallestAy = (a0.y<=a1.y ? a0.y:a1.y);
        var smallestBx = (b0.x<=b1.x ? b0.x:b1.x);
        var smallestBy = (b0.x<=b1.y ? b0.y:b1.y);;
        var largestAx = (a0.x>a1.x ? a0.x:a1.x);
        var largestAy = (a0.y>a1.y ? a0.y:a1.y);
        var largestBx = (b0.x>b1.x ? b0.x:b1.x);
        var largestBy = (b0.y>b1.y ? b0.y:b1.y);
        return(
            smallestAx <= largestBx &&
            largestAx >= smallestBx &&
            smallestAy <= largestBy &&
            largestAy >= smallestBy);

    }
    intersectPoint(a0,a1,b0,b1){
        //Redefining so a0 is origo:
        a0.redefineOrigoTo(a0.x,a0.y);
        a1.redefineOrigoTo(a0.x,a0.y);
        b0.redefineOrigoTo(a0.x,a0.y);
        b1.redefineOrigoTo(a0.x,a0.y);
        return false;
    }
    //--------------------------------END of UNFINISHED (lol)

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
