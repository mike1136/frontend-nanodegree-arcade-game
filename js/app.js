/**
 * Holds the different states of the game for logical purposes
 */
var GAMESTATE = {
    NOT_STARTED: 0,
    RUNNING: 1,
    PAUSED: 2,
    LOST: 3,
    MENU: 4
};
Object.freeze(GAMESTATE);
var gameState = GAMESTATE.NOT_STARTED;


/**
 *Main prototype to all elements that appars in game. Holds location and position
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
        super(sprite, x, y);
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    /**
     * Logic for Respawn and Collisions updated every frame
     * @param {*} dt 
     */
    update(dt) {
        if (this.x < 580) {
            this.x += (dt * this.speed);

        } else {
            this.x = -500;
        }
        if ((this.x - 50 < player.x && this.x + 50 > player.x) && (this.y + 40 > player.y && this.y - 40 < player.y)) {
            console.log('Collision!');
            player.x = 200;
            player.y = 410;
        }
        if (player.y < -10) {
            console.log("Won!");
            player.x = 200;
            player.y = 410;
        }

    }
}

class Player extends Entities {
    constructor(sprite = 'images/char-boy.png', x, y) {
        super(sprite, x, y);
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.characterSprites = ['char-boy.png','char-cat-girl.png','char-horn-girl.png','char-pink-girl.png','char-princess-girl.png'];
        this.currentSprite = 0;
       
    }
   

    update(dt) {

    }
    handleInput(pressedKey) {
        switch (pressedKey) {
            case 'enter':
            
                if (gameState === GAMESTATE.NOT_STARTED)
                {
                    player.x = 200;
                    player.y =410;
                    gameState=GAMESTATE.RUNNING;
                }
            break;

            case 'escape':
                if (gameState == GAMESTATE.RUNNING) {
                    gameState = GAMESTATE.PAUSED;
                    ctx.filter = 'blur(5px)';
                } else if (gameState == GAMESTATE.PAUSED) {
                    gameState = GAMESTATE.RUNNING;
                    ctx.filter = 'none';
                }
                break;
            case 'up':
                if (gameState == GAMESTATE.RUNNING) {
                    if (this.y > -10) {
                        this.y -= 85;
                    }
                }
                break;
            case 'down':
                if (gameState == GAMESTATE.RUNNING) {
                    if (this.y < 410) {
                        this.y += 85;
                    }
                }
                break;

            case 'left':
                if (gameState == GAMESTATE.RUNNING) {
                    if (this.x > 0) {
                        this.x -= 100;
                    }
                }
                else if (gameState == GAMESTATE.PAUSED)
                {
                     if(player.currentSprite===0)
                     {
                         player.currentSprite = player.characterSprites.length;             
                     }
                }
                break;
            case 'right':
                if (gameState == GAMESTATE.RUNNING) {
                    if (this.x < 400) {
                        this.x += 100;
                    }
                }
                else if (gameState == GAMESTATE.PAUSED)
                {

                }
                break;
        }
        console.log("x: " + this.x + ", y:" + this.y);
    }
    changeSprite()
    {
      this.sprite=this.characterSprites[this.currentSprite];
    }
}

class GUIObject extends Entities {
    constructor(sprite, x, y) {
        super(sprite, x, y);
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
}

var enemy1 = new Enemy(undefined, -500, 58, 344);
var enemy2 = new Enemy(undefined, -500, 220, 253);
var enemy3 = new Enemy(undefined, -500, 136, 156);
var enemy4 = new Enemy(undefined, -500, 136, 317);
var enemy5 = new Enemy(undefined, -500, 220, 569);
var enemy6 = new Enemy(undefined, -500, 58, 261);
var allEnemies = [enemy1, enemy2, enemy3,enemy4,enemy5,enemy6];
var player = new Player(undefined, 200, 200);
var playButton = new GUIObject('images/play2.png', 100, 300);
var choser=new GUIObject('images/Selector.png',200,200);
var guiInterface = [playButton,choser,player];

/** This listens for key presses and sends the keys to the
 *  Player.handleInput() method.
 */
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        13:'enter',
        27: 'escape',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});
