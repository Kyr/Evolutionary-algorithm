import Bot from './Bot.js';

export default function Evolution ({maxBotsAmount, getCanvas}) {
  const world   = getCanvas();
  const context = world.getContext("2d");

  let stepInterval;
  let bots = [];
  let tick = 500;

  this.main = function main () {
    this.stop();
    bots.forEach(bot => bot.clear());
    context.clearRect(0, 0, world.width, world.height);
    bots = generateFirst(maxBotsAmount, getCanvas);

    bots.forEach(bot => {
      bot.render();
    });

    this.run();
  };

  this.stop = () => {
    window.clearInterval(stepInterval);
    stepInterval = void 0;
  };

  this.pauseResume = () => {
    if (stepInterval) {
      return this.stop();
    }

    this.run()
  };

  this.setTick = value => {
    if (stepInterval) {
      this.stop();
      tick = value;
      this.run();
    }
    tick = value;
  };

  this.run = () => {
    stepInterval = window.setInterval(botsLifeCycle, tick);
  };

  function botsLifeCycle () {
    bots.forEach(bot => {
      bot.doAction();
    });
    /*
          bots.forEach(bot => {
            bot.render();
          });*/
  }
}

function generateFirst (botsAmount, getCanvas) {
  const generation = [];

  //заполнение массивов и помещение их в botGroup
  for (let i = 0; i < botsAmount; i++) {
    generation.push(new Bot({name: `bot#${i}`, getCanvas}));
  }

  return generation;
}
