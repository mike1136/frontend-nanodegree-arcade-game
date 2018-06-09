// Enemies our player must avoid
class Enemy {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(sprite = 'images/enemy-bug.png', x = 1, y = 2.3, speed = 400) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    /**
     * Update the enemy's position, required method for game by multiplying dt by speed
     * @param {Date} dt a time delta between ticks
     */
    update(dt) {
        this.x += (dt * this.speed);

    }
    /**Draw the enemy on the screen, required method for game
     * 
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y * 25);
    }
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class playerP {
    constructor() {}
    update() {}
    render() {}
    handleInput() {}
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var allEnemies = [enemy1];
console.log(enemy1.sprite);
var player = new playerP();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(e.keyCode);
});