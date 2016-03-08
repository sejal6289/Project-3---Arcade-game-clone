// Globals to set the min and max coordinate values for moving Player and Enemies on the canvas
var PLAYER_MIN_X_POS = 0;
var PLAYER_MIN_Y_POS = -40;
var PLAYER_MAX_X_POS = 404;
var PLAYER_MAX_Y_POS = 415;
var LEN_X = 101;
var LEN_Y = 83;
var PLAYER_START_X_POS = 2 * LEN_X;
var PLAYER_START_Y_POS = 5 * LEN_Y;

var ENEMY_MAX_X_POS = 5 * LEN_X; //505;

var enemyPosY = [60, 143, 226];
var enemySpeed = [100, 130, 160, 200, 250, 300, 400];

var ENEMYCOUNT = 4;



// Enemies our player must avoid

var Enemy = function(xPos, yPos) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //set initial position
    this.x = xPos;
    this.y = yPos;
    

    //set speed
    this.speed = Math.floor((Math.random() * 100) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


    if (this.x > ENEMY_MAX_X_POS) {
        this.x = -(Math.floor((Math.random() * 5) + 1) * LEN_X);
        this.y = Math.floor((Math.random() * 3) + 1) * LEN_Y;
    } else {
        this.x = this.x + (this.speed * dt);
    }
    // Check for collisions with the player
    if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20)) {
        player.reset();
        gLife.decrease();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

    this.sprite = 'images/char-boy.png';

    this.x = PLAYER_START_X_POS;
    this.y = PLAYER_START_Y_POS;

    this.gameScore = 0;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    if (this.y <= 0) {
        this.gameScore += 20;
        console.log("Score = " + this.gameScore);
        this.reset();
    }
};

Player.prototype.reset = function() {
    this.x = PLAYER_START_X_POS;
    this.y = PLAYER_START_Y_POS;
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left': // x cannot be smaller than 0
            var leftPos = this.x - LEN_X;
            if (leftPos >= PLAYER_MIN_X_POS) {
                this.x = leftPos;
            }
            break;
        case 'up': // y cannot be smaller than -40
            var upPos = this.y - LEN_Y;
            if (upPos >= PLAYER_MIN_Y_POS) {
                this.y = upPos;
            }
            break;
        case 'right': // x cannot be bigger than 404
            console.log("inside right switch");
            var rightPos = this.x + LEN_X;
            if (rightPos <= PLAYER_MAX_X_POS) {
                this.x = rightPos;
            }
            break;
        case 'down': // y cannot be bigger than 415
            var downPos = this.y + LEN_Y;
            if (downPos <= PLAYER_MAX_Y_POS) {
                this.y = downPos;
            }
            break;
        default:
            console.log("USE UP DOWN RIGHT OR LEFT ARROW KEYS FOR MOVING PLAYER");
    }
};

/*Game Life */

var GameLife = function() {
    this.lifeImg = 'images/Heart_s.png';
    this.life = 4;
};
/**
 * Renders the life on the screen.
 */
GameLife.prototype.render = function() {
    var x = 0;

    ctx.fillStyle = 'white';
    ctx.fillRect(390, 8, 100, 40);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'Black';
    ctx.fillText("Score : "+ player.gameScore, 300, 40);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 200, 50);

    for (var i = 0; i < this.life; i++) {
        ctx.drawImage(Resources.get(this.lifeImg), x, 0);
        x = x + 50;
    }
    if (this.life === 0) {
        ctx.drawImage(Resources.get('images/gameover.png'), 0, 50);
        /*
        ctx.font = '30px Arial';
        ctx.fillStyle = 'Green';
        ctx.fillText("Your Score : " + player.gameScore, 250, 520); */
    }
};
/**
 * Decrease number of lives.
 */
GameLife.prototype.decrease = function() {
    if (this.life > 0) {
        this.life = this.life - 1;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for (var i=0; i<ENEMYCOUNT;i++)
{
var xPos = -(Math.floor((Math.random() * 5) + 1) * LEN_X);
var yPos = Math.floor((Math.random() * 3) + 1) * LEN_Y;
allEnemies.push(new Enemy(xPos,yPos));
}

var player = new Player();
var gLife = new GameLife();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});