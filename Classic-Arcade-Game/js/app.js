// Possible X,Y Coordinates
var possibleY = [-20, 60, 140, 220, 300, 380],
    possibleX = [0, 101, 202, 303, 404],
    
// Player Y Offset, Pushes Sprite Downward
    playerYOffset = 15;

// Enemies our player must avoid
var Enemy = function() {
    // Start off-screen
    this.x = -100;
    // Y Blocks 1-3, Zero-based
    this.y = possibleY[Math.floor(Math.random()*3)+1];
    // Sets Enemy Speed
    this.rate = 80;
    // Sets Sprite
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Move Enemy
    this.x = this.x + (this.rate * dt);
    // Handle and Reset on Collision
    if(
            this.x >= possibleX[player.xSquare-1] && this.x <= possibleX[player.xSquare] && // Same X Block
            this.y == possibleY[player.ySquare] // Same Y Block
        )
        player.initialize();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function() {
    // Initialize Coordinates
    this.initialize();
    // Set Sprite
    this.sprite = 'images/char-boy.png';
};

Player.prototype.initialize = function() {
    // Handle Coordinates as Blocks, Instead of Pixels
    this.xSquare = 2;
    this.ySquare = 4;
};

Player.prototype.update = function(dt) {
    // If Player is in Water, Reset Game
    if(this.ySquare == 0)
        this.initialize();
};

Player.prototype.handleInput = function(direction) {
    // Handle Input Within the Coordinate Plane
    switch(direction){
        case "left":
            if(this.xSquare != 0)
                this.xSquare--;
            break;
        case "up":
            if(this.ySquare != 0)
                this.ySquare--;
            break;
        case "right":
            if(this.xSquare != possibleX.length-1)
                this.xSquare++;
            break;
        case "down":
            if(this.ySquare != possibleY.length-1)
                this.ySquare++;
            break;
    }
};

Player.prototype.render = function() {
    // Draw Player Sprite
    ctx.drawImage(
        Resources.get(this.sprite),
        possibleX[this.xSquare],
        possibleY[this.ySquare] + playerYOffset
    );
};

var allEnemies = [], // Place all enemy objects in an array called allEnemies
    player= new Player(); // Place the player object in a variable called player

// Create Enemy on a Varying Interval for Most Realistic Response
(function createEnemy(){
    // Push a New Enemy
    allEnemies.push(new Enemy());
    
    // Set Timeout for this Function
    setTimeout(
        createEnemy,
        Math.floor((Math.random()*200) + 1500)
    );
})();

/*
 * This listens for key presses and sends the keys to the
 * Player.handleInput() method.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // Call handleInput method with key
    player.handleInput(allowedKeys[e.keyCode]);
});
