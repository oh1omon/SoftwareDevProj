// level characters

const levelChars = {
    '.': 'empty', '#': 'wall', '+': 'lava',
    '@': Player, 'o': Coin,
    '=': Lava, '|': Lava, 'v': Lava
}

// drawing the level

function elt(name, attrs, ...children) {
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
      dom.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
      dom.appendChild(child);
    }
    return dom;
  }

  class DOMDisplay {
    constructor(parent, level) {
      this.dom = elt("div", {class: "game"}, drawGrid(level));
      this.actorLayer = null;
      parent.appendChild(this.dom);
    }
  
    clear() { this.dom.remove(); }
  }

  function drawActors(actors) {
    return elt("div", {}, ...actors.map(actor => {
      let rect = elt("div", {class: `actor ${actor.type}`});
      rect.style.width = `${actor.size.x * scale}px`;
      rect.style.height = `${actor.size.y * scale}px`;
      rect.style.left = `${actor.pos.x * scale}px`;
      rect.style.top = `${actor.pos.y * scale}px`;
      return rect;
    }));
  }

  DOMDisplay.prototype.syncState = function(state) {
    if (this.actorLayer) this.actorLayer.remove();
    this.actorLayer = drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
  };

  DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = width / 3;
  
    // The viewport
    let left = this.dom.scrollLeft, right = left + width;
    let top = this.dom.scrollTop, bottom = top + height;
  
    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5))
                           .times(scale);
  
    if (center.x < left + margin) {
      this.dom.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
      this.dom.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
      this.dom.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
      this.dom.scrollTop = center.y + margin - height;
    }
  };

//Reading Level 

class Level {
  constructor(plan) {
    let rows = plan.trim().split('\n').map(l => [...l])
    this.height = rows.length
    this.width = rows[0].length
    this.startActors = []

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        let type = levelChars[ch]
        if (typeof type == 'string') return type
        this.startActors.push(
          type.create(new Vec(x, y), ch))
        return 'empty'
      })
    })
  }
}

class State {
  constructor(level, actors, status) {
    this.level = level
    this.actors = actors
    this.status = status
  }

  static start(level) {
    return new State(level, level.startActors, 'playing')
  }

  get player() {
    return this.actors.find(a => a.type == 'player')
  }
}

class Vec {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y)
  }
  times(factor) {
    return new Vec(this.x * factor, this.y * factor)
  }
}