/**
 *Main prototype to all elements that appars in game.Holds location and position
 *
 * @class Entities
 */
class Entities {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
    /**
     *
     *
     * @param {*} dt Updates the infor according to the time used for smooth transition
     * @memberof Entities
     */

    /**Draw the entity on the screen, required method for game
     * 
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
class Enemy extends Entities {
    constructor(sprite = 'images/enemy-bug.png', x, y, speed) {
        super(sprite, x, y)
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    update(dt) {
        if (this.x < 580) {
            this.x += (dt * this.speed);
           
        } else {
            this.x = -500;
        }
if((this.x+10>player.x && this.x-10>player.x)&&(this.y+10>player.y && this.y-10>player.y))
{
    console.log('Collision!');
}
      
    }
}

class Player extends Entities {
    constructor(sprite = 'images/char-boy.png', x, y) {
        super(sprite, x, y);
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
    update(dt) {

    }
    handleInput(pressedKey) {
        switch (pressedKey) {
            case 'up':
                if (this.y > -10) {
                    this.y -= 85;
                }
                break;
            case 'down':
                if (this.y < 410) {
                    this.y += 85;
                }
                break;

            case 'left':
            if(this.x>0)
            {
                this.x -= 100;
            }
                break;
            case 'right':
            if(this.x<400)
            {
                this.x += 100;
            }
                break;
        }
        console.log("x: " + this.x + ", y:" + this.y);
    }
}

var enemy1 = new Enemy(undefined, -500, 58, 400);
var enemy2 = new Enemy(undefined, -500, 136, 310);
var enemy3 = new Enemy(undefined, -500, 220, 200);
var allEnemies = [enemy1, enemy2, enemy3];
console.log(enemy1.sprite);
var player = new Player(undefined, 200, 410, 1);
console.log(player.sprite);

/** This listens for key presses and sends the keys to the
 *  Player.handleInput() method.
 */
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});