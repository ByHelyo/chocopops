var Player = function(name, color, position, direction) {

    this.name = name;
    this.position = position;
    this.life = 100;
    this.bullets = new Array();
    this.direction = direction;
    this.speed = 0;

    if (name == "enemy") {
        this.material = new THREE.MeshLambertMaterial({
            color: color
        })
    } else {
        this.material = new THREE.MeshLambertMaterial({
            color: color,
        });
    }

    var singleGeometry = new THREE.Geometry();

    vehiculeMesh = new THREE.ConeGeometry(5, 20, 32);
    this.graphic = new THREE.Mesh(vehiculeMesh, this.material);
    this.graphic.position.z = 6;

    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), this.direction+(3*Math.PI/2));
};

Player.prototype.dead = function () {
    player1.life -= 1;
    if (player1.life > 0) {
        return;
    }
    this.graphic.position.z = this.graphic.position.z-0.1;
        //Nettoyage de la div container
        $("#container").html("");
        jQuery('#'+this.name+' >.life').text("Tu es mort !");
        init();
}

Player.prototype.accelerate = function (distance) {
    var max = 2;

    this.speed += distance / 4;
    if (this.speed >= max) {
        this.speed = max;
    }
};

Player.prototype.decelerate = function (distance) {
    var min = -1;

    this.speed -= distance / 16;
    if (this.speed <= min) {
        this.speed = min;
    }
};

Player.prototype.displayInfo = function () {
    jQuery('#'+this.name+' >.life').text(this.life);
}

Player.prototype.turnRight = function (angle) {
    this.direction += angle;
    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), +angle);
};

Player.prototype.turnLeft = function (angle) {
    this.direction += angle;
    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), angle);
};

Player.prototype.move = function () {
    posX =  this.speed * Math.cos(this.direction) + this.position.x;
    posY =   this.speed * Math.sin(this.direction) + this.position.y;
    if (posX < -300.) {
        posX = -300;
    }
    if (posX > 300.) {
        posX = 300;
    }
    if (posY < -200.) {
        posY = -200;
    }
    if (posY > 200.) {
        posY = 200;
    }
    var moveTo = new THREE.Vector3(
        posX,
       posY,
        this.graphic.position.z
    );

    this.position = moveTo;

    if (this.speed > 0) {
        this.speed = this.speed - 0.04;
    }
    else if (this.speed < 0) {
        this.speed = this.speed + 0.04;
    }

    this.graphic.position.x = this.position.x;
    this.graphic.position.y = this.position.y;
    
    light1.position.x = this.position.x;
    light1.position.y = this.position.y;
    //li ght1.position.z = this.graphic.position.z + 500;
};
