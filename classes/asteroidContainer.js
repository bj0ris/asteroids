'use strict';
/*
    Class that generates and keeps track of the active Asteroids.

    The reason I chose create this class instead of just having an array of asteroids in
    main.js, is that in the future I want asteroids to be able to break apart.
    This means the numer of total asteroids will change, and having a separate
    class that can manage this will be easier... I think.
*/

class AsteroidContainer {
    constructor(_numAsteroids){
        this.num = _numAsteroids;
        this.astArray = [];
        this.generateAsteroids(_numAsteroids);
    }

    generateAsteroids(_numAsteroids){
        for(var i=0;i<_numAsteroids;i++){

            //Check that the random coordinates aren't "taken"
            do{
                var randomX = getRandomInt(0,WIDTH);
                var randomY = getRandomInt(0,HEIGHT);
                //checkIfSpotTaken(..,..,40+8)(40 = base radius of asteroid 8= max value of)
                var isAvailable = this.checkIfSpotTaken(randomX,randomY,40+8);
            }while(isAvailable);

            //Set the different randomly generated properties of the asteroid
            var position = new Coords(randomX,randomY);
            var rotation =  getRandomFloat(0,0.5);
            var velocity = new Coords(getRandomFloat(0,2),getRandomFloat(0,2));

            //My method of randomizing the look of the asteroids. See design journal
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
    // Perhaps "outsource" the whole collision detect process to a separate document and use it as a library.
    // This will make it easier to change and optimize the collision detection by itself.
    checkIfCollission(){

        for(var i=0;i<this.astArray.length-1;i++){
            for(var j=i+1;j<this.astArray.length;j++){
                var collisionTest = this.collisionCompare(this.astArray[i],this.astArray[j]);
                if(collisionTest){
                    /*A collision Happened!
                    What to do now? Well I think since it's in space the
                    collision should be mostly elastic, but not completely
                    because of the mutual residual gravitational pull.
                    This means that the total combined speed of the asteroids
                    will decline. Remeber, shooting the asteroids should Also
                    change their velocity and rotation. Build it and test
                    to see what will work best.

                    Bellow is only temporary
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
                var b0 = array2[j];
                var b1 = array2[j+1];
                var vectorBoxIntersectBool = this.vectorBoxIntersect(a0,a1,b0,b1);
                if(vectorBoxIntersectBool){
                    var intersectPointBool = this.intersectPoint(a0,a1,b0,b1);
                    if(intersectPointBool){
                        var returnArray = [array1[i],array1[i+1],array2[j],array2[j+1]];

                        return true;
                    }else{
                    }
                }
            }
        }
        return false;
    }
    //Basically does this: http://silentmatt.com/rectangle-intersection/
    vectorBoxIntersect(a0,a1,b0,b1){
        var smallestAx = (a0.x<=a1.x ? a0.x:a1.x);
        var smallestAy = (a0.y<=a1.y ? a0.y:a1.y);
        var smallestBx = (b0.x<=b1.x ? b0.x:b1.x);
        var smallestBy = (b0.x<=b1.y ? b0.y:b1.y);
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
    //Calculates the supposed intersectPoint(X,Y), and then does the clockwiseTest
    intersectPoint(a0,a1,b0,b1){
        var aDeltaY = a1.y-a0.y;
        var aDeltaX = a1.x-a0.x;
        var bDeltaY = b1.y-b0.y;
        var bDeltaX = b1.x-b0.x;
        var A = (aDeltaY)/(aDeltaX);
        var B = (bDeltaY)/(bDeltaX);
        var c1 = a1.y-A*(a1.x);
        var c2 = b1.y-B*(b1.x);
        var X = (c2-c1)/(A-B);
        var Y = A*X+c1;

        //Checking if a0,a1 intersects b0,b1 and vice versa
        var boolA = this.clockwiseTest(X,Y,a0,b1,a1,b0);
        var boolB = this.clockwiseTest(X,Y,b0,a1,b1,a0);
        if(boolB&&boolA){
            return true;
        }
        return false;
    }


    clockwiseTest(X,Y,a,p,c,p2){
        //Should perhaps change to rads, but I find degrees more intuitive
        var toA = Math.floor(Math.atan2((a.y-Y),(a.x-X))*360/(Math.PI*2));
        var toC = Math.floor(Math.atan2((c.y-Y),(c.x-X))*360/(Math.PI*2));
        if(toA<0){
            toA+=360;
        }
        if(toC<0){
            toC+=360;
        }
        if(Math.abs(toA-toC)===180){
            return true;
        }else{
            return false;
        }
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

/*
Algorithm:
    1)box intersect
        Done
    2)Does line A intersect B
        Since these steps have pretty much the same solution I compacted them into one.
    3)Does line B intersect A
        Summary:
        Same as last time we are given the four coordinates; a0,a1 and b0,b1.
        This time we can think of them for what they are. Namely points that define
        the vector A and the Vector B.

        So what we do is figure out the equations for both A and B in the form of y = aX + c1 and y = bX + c2.
        We can then find the coordinates where these infinite lines intersect.

        We use these equations and known the known coordinates(a0,a1,b0 and b1), to find the supposed collision point(X,Y);

        Now we do two clockwise checks.
        One if a0, and a1 are on either side of the line made by (X,Y) and b0
        One if b0, and b1 are on either side of the line made by (X,Y) and a0
        Think clockwise,unclockwise. You have point a0,a1,b0,b1.


        TODO

        We do however need something else to check for weird cases.
            Weird cases:
            line A => -------  -------- <= line B.
                The two lines crosses each other.

            Convex shapes meet point to point.
                ><
                That is four lines meet at once, what happens?




    Next thing on the agenda:
        Figure out the collision-physics.


*/
