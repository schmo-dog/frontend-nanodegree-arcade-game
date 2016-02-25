// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    // Create random speed for each instance
    function getRandomEnemySpeed(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
    this.speed = getRandomEnemySpeed(3, 5);
    this.sprite = 'images/enemy-bug.png';
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + (dt * 50 * this.speed);

    // Reset enemy to the begining once he exceeds width of canvas
    if (this.x > 505) {
        this.x = 0;
    }

    // Check to see if enemy has collided with player using Axis-Aligned Bounding Box
    if (this.x < player.x + player.width &&
        this.x + player.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
        // place player back to the starting position
        player.x = 202;
        player.y = 373.5;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create our player
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

    // Do not allow player to move off the baord in the x-axis
    if (this.x < 0 || this.x > 404) {
        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x > 404) {
            this.x = 404;
        }
    }

    if (this.y < 0 || this.y > 373.5) {
        // Player has won the game. Reset position
        if (this.y < 0) {
            this.y = 373.5;
            this.x = 202;
        }
        // Player is not allowed to move off the board in the y-axis
        else if (this.y > 373.5) {
            this.y = 373.5;
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(move) {
    // Move player up or down according to keyboard input
    if (move == 'up') {
        this.y = this.y - 83;
    }
    else if (move == 'down') {
        this.y = this.y + 83;
    }
    else if (move == 'left') {
        this.x = this.x - 101;
    }
    else {
        this.x = this.x + 101;
    }
};

Player.prototype.reset = function() {
    // Move player up or down according to keyboard input
    this.y = 373.5;
    this.x = 202;
};

// Create random number of enemys to put in row. Parimiters are 1 or 2.
var assignRowQuantity = function() {
    var randomEnemys = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    if (randomEnemys === 1) {
        return 1;
    }
    else {
        return 2;
    }
};

// Instantiate new enemy objects
var allEnemies = [];
for (var i = 0; i < assignRowQuantity(); i++) {
    allEnemies.push(new Enemy(0, 41));
}

for (var i = 0; i < assignRowQuantity(); i++) {
    allEnemies.push(new Enemy(0, 124));
}

for (var i = 0; i < assignRowQuantity(); i++) {
    allEnemies.push(new Enemy(0, 207));
}

// Instantiate new player
var player = new Player(202, 373.5);

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
