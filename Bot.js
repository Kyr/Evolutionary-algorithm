const DO_NOTHING = 0;
const INSPECT    = 1;
const MOVE       = 2;
const ATTACK     = 3;

const ACTIONS = [
  DO_NOTHING,
  INSPECT,
  MOVE,
  // ATTACK,
];

const ACTION_COST = {
  skip:    1,
  inspect: 1,
  move:    2,
  attack:  3,
};


export default function Bot ({behaviour = randomBehaviour(), name, getCanvas}) {
  const canvas  = getCanvas();
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  this.name   = name;
  this.age    = 0;
  this.life   = 50;
  this.energy = 1000;
  this.size   = 10;
  this.speed  = 5;
  this.coord  = {
    x: Math.floor(Math.random() * canvas.width / this.size) * this.size,
    y: Math.floor(Math.random() * canvas.height / this.size) * this.size,
  };

  const behaviourLoop = behaviourGenerator(behaviour);
  const actions       = {
    [DO_NOTHING]: () => {
      this.energy -= ACTION_COST.skip;
    },
    [INSPECT]:    direction => {
      this.energy -= ACTION_COST.inspect;
    },
    [MOVE]:       direction => {
      const [x, y] = direction;
      this.clear();
      this.drawTrace();
      this.energy -= ACTION_COST.move;
      this.coord.x += x * this.speed;
      this.coord.y += y * this.speed;
      this.onMove && this.onMove();
      this.render();
    },
  };


  this.doAction = () => {
    const {value}             = behaviourLoop.next();
    const [action, direction] = value;
    actions[action](direction);
    this.age++;

    /*
          window.postMessage({
            event:  'botAction',
            action: action,
            bot:    {name: this.name, age: this.age, life: this.life, energy: this.energy},
          });
    */
  };

  this.clear = function clearTrace () {
    context.clearRect(this.coord.x, this.coord.y, 100, 30);
  };

  this.drawTrace = function drawTrace () {
    context.fillStyle = "rgba(0, 0, 0, .2)";
    context.fillRect(
      this.coord.x, this.coord.y,
      Math.round(this.size / 2), Math.round(this.size / 2),
    );
  };

  this.render = function renderBot () {
    context.fillStyle = "rgba(0, 0, 0, .9)";
    // context.fillStyle = "#000";
    context.fillRect(
      this.coord.x, this.coord.y,
      this.size, this.size,
    );
    context.fillStyle = "#fff";
    context.font      = '14pt Calibri';
    context.fillText(this.name,
      this.coord.x + 0,
      this.coord.y + 15);
  };
}

function randomBehaviour () {
  const actions         = 16;
  const behaviour       = [];
  const randomDirection = getRandomDirections([-1, 0, 1]);
  const randomAction    = getArrayRandomize(ACTIONS);

  for (let i = 0; i < actions; i++) {
    let action    = randomAction();
    let direction = randomDirection();

    behaviour.push([action, direction]);
  }

  return behaviour;
}

function getArrayRandomize (array) {
  return () => array[Math.floor(Math.random() * array.length)];
}

function getRandomDirections (directions) {
  const random = getArrayRandomize(directions);

  return function () {
    return [random(), random()]
  }
}


function* behaviourGenerator (_actions_) {
  const actions = _actions_;
  let i         = 0;

  while (true) {
    yield actions[i++];
    if (i === actions.length) {
      i = 0;
    }
  }
}
