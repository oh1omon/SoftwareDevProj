// Implementing Actor objects ro represent the current position and state of a given moving element in the game
class Vec {
    constructor(x, y) {
        this.x = x; this.y = y;
    }
    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }
    time(factor) {
        return new Vec(this.x * factor, this.y * factor);
    }
}

// Player actor

class Player {
    constructor(pos, speed) {
        this.pos = pos; // the "pos" property holds the coordinates of the element's top-left corner
        this.speed = speed; // the "speed" property stores the current speed of the player class
    }
    get type() { return "player"; }

    static create(pos) {
        return new Player(pos.plus(new Vec(0, -0.5)),
        new Vec(0, 0));
    }
}

Player.prototype.size = new Vec(0.8, 1.5);

// Lava actor creation

class Lava {
    constructor(pos, speed, reset) {
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
    }
    get type() { return "lava"; }

    static create(pos, ch) {
        if (ch == "=") {
            return new Lava(pos, new Vec(2, 0));
        } 
        else if (ch == "|") {
            return Lava(pos, new Vec(0, 2));
        }
        else if (ch == "v") {
            return new Lava(pos, new Vec(0, 3), pos);
        }
    }
}

Lava.prototype.size = new Vec(1, 1);

// Coin actor creation

class Coin {
    constructor(pos, basePos, wobble) {
        this.pos = pos;
        this.basePos = basePos;
        this.wobble = wobble;
    }
    get type() { return "coin"; }

    static create(pos) {
        let basePos = pos.plus(new Vec(0.2, 0.1));
        return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
    }
}

Coin.prototype.size = new Vec(0.6, 0.6);


// level characters

const levelChars = {
    '.': 'empty', '#': 'wall', '+': 'lava',
    '@': Player, 'o': Coin,
    '=': Lava, '|': Lava, 'v': Lava
}

// creating a level instance

let simpleLevel = new Level(simpleLevelPlan);
console.log(`${simpleLevel.width} by ${simpleLevel.height}`);
// --> 22 by 9


// Player motion and regulations when the player hits a wall

const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

Player.prototype.update = function(time, state, keys) {
    let xSpeed = 0;
    if (keys.ArrowLeft) xSpeed -= playerXSpeed;
    if (keys.ArrowRight) xSpeed += playerXSpeed;
    
    let pos = this.pos;
    let movedX = pos.plus(new Vec(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, "wall")) {
        pos = movedX;
    }

    let ySpeed = this.speed.y + time * gravity;
    let movedY = pos.plus(new Vec(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, "wall")) {
        pos = movedY;
    }
    else if (keys.Space && ySpeed > 0) {
        ySpeed = -jumpSpeed;
    }
    else {
        ySpeed = 0;
    }
    return new Player(pos, new Vec(xSpeed, ySpeed));
};

// Key handler for keeping the control keys "pressed" for continuous movement
function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
        if (keys.includes(event.key)) {
            down[event.key] = event.type == "keydown";
            event.preventDefault();
        }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    return down;
};

const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "Space"]);
