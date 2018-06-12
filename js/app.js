/**
 * Holds the different states of the game for logical purposes
 */
var GAMESTATE = {
    NOT_STARTED: 0,
    RUNNING: 1,
    PAUSED: 2,
    LOST: 3,
    MENU: 4,
    WON: 5
};
Object.freeze(GAMESTATE);
var gameState = GAMESTATE.NOT_STARTED;
var deaths = 0;



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
/**
 * Use for creating enemies. Adds  collision detection 
 *
 * @class Enemy
 * @extends {Entities}
 */
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
        if ((this.x - 60 < player.x && this.x + 50 > player.x) && (this.y + 40 > player.y && this.y - 40 < player.y)) {
            player.x = 200;
            player.y = 410;
            deaths++;
            deathText.text = `Deaths: ${deaths}`;


        }


    }
}
/**
 *Used to 
 *
 * @class textBox
 */
class textBox extends Entities {
    constructor(text, x, y, pixels) {
        super(x, y);
        this.text = text;
        this.x = x;
        this.y = y;
        this.pixels = pixels;
    }
    render() {
        ctx.font = `${this.pixels}px Arial`;
        ctx.fillText(this.text, this.x, this.y);
    }

}
/**
 * Player logic  changes sprites and handles controls 
 *
 * @class Player
 * @extends {Entities}
 */
class Player extends Entities {
    constructor(sprite = 'images/char-boy.png', x, y) {
        super(sprite, x, y);
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.characterSprites = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
        this.currentSprite = 0;

    }


    update(dt) {
        if (player.y < -10) {
            gameState = GAMESTATE.WON;

        }

    }
    /**
     *This handle every option avaiable on all games depending on gamestate and input key
     *
     * @param {*} pressedKey
     * @memberof Player
     */
    handleInput(pressedKey) {
        switch (pressedKey) {
            case 'enter':

                if (gameState === GAMESTATE.NOT_STARTED) {
                    player.x = 200;
                    player.y = 410;
                    gameState = GAMESTATE.RUNNING;
                }
                if (gameState === GAMESTATE.WON) {
                    deaths = 0;
                    player.x = 200;
                    player.y = 410;
                    gameState = GAMESTATE.RUNNING;
                    deathText.text = `Deaths: ${deaths}`;

                    allEnemies.forEach(function (enemy) {
                        enemy.x = -200;
                    });

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
                } else if (gameState == GAMESTATE.NOT_STARTED) {
                    console.log(player.currentSprite);
                    if (player.currentSprite == 0) {
                        player.currentSprite = (player.characterSprites.length - 1);
                    } else {
                        player.currentSprite--;
                    }
                    player.changeSprite();

                }
                break;
            case 'right':
                if (gameState == GAMESTATE.RUNNING) {
                    if (this.x < 400) {
                        this.x += 100;
                    }
                } else if (gameState == GAMESTATE.NOT_STARTED) {

                    if (player.currentSprite === player.characterSprites.length - 1) {
                        player.currentSprite = 0;
                    } else {
                        player.currentSprite++;
                    }
                    player.changeSprite();

                }
                break;
        }
        console.log("x: " + this.x + ", y:" + this.y);
    }
    /**
     *Changes sprite , used on handleInput
     *
     * @memberof Player
     */
    changeSprite() {
        this.sprite = this.characterSprites[this.currentSprite];
    }
}

/**
 * Display GUI elements on screen
 *
 * @class GUIObject
 * @extends {Entities}
 */
class GUIObject extends Entities {
    constructor(sprite, x, y) {
        super(sprite, x, y);
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
}
//Entities instanciation
var enemy1 = new Enemy(undefined, -200, 58, 344);
var enemy2 = new Enemy(undefined, -200, 220, 153);
var enemy3 = new Enemy(undefined, -200, 136, 356);
var enemy4 = new Enemy(undefined, -200, 136, 617);
var enemy5 = new Enemy(undefined, -200, 220, 569);
var enemy6 = new Enemy(undefined, -200, 58, 261);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
var player = new Player(undefined, 200, 200);
var playButton = new GUIObject('images/play2.png', 100, 300);
var choser = new GUIObject('images/Selector.png', 200, 200);
var guiInterface = [playButton, choser, player];
var wonText = new textBox(`You Won !`, 110, 150, 64);
var deathText = new textBox(`Deaths: ${deaths}`, 150, 210, 44);
var restartText = new textBox(`Press Enter to restart`, 150, 440, 20);
var instructionText = new textBox(`Press escape for pause/unpause, arrow keys to move, enter to select`, 20, 520, 15);



/** This listens for key presses and sends the keys to the
 *  Player.handleInput() method.
 */
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        13: 'enter',
        27: 'escape',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});