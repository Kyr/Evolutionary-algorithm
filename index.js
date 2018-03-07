import Evolution from './Evolution.js';

const CanvasParameters = {
  width:  800,
  height: 800,
};

window.onload = function () {
  // import app from "index";

  const pageObjects = {
    canvasWrapper:     document.getElementById("canvas"),
    restartButton:     document.getElementById('restartButton'),
    flowControlButton: document.getElementById('flowControl'),
    tickSetter:        document.getElementById('tick'),
    botsList:          document.getElementById('botsList'),
  };

  app(pageObjects);
};


function app (pageObjects) {

  const evolution = new Evolution({maxBotsAmount: 10, getCanvas});

  pageObjects.restartButton.addEventListener('click', () => evolution.main());
  pageObjects.flowControlButton.addEventListener('click', () => evolution.pauseResume());
  pageObjects.tickSetter.addEventListener('change', (e) => evolution.setTick(e.target.value));

  evolution.main();

  function getCanvas () {
    const canvas  = document.createElement('canvas');
    canvas.width  = CanvasParameters.width;
    canvas.height = CanvasParameters.height;
    pageObjects.canvasWrapper.appendChild(canvas);

    return canvas;

    /*
          const context = canvas.getContext("2d");
          return {

            clear: function(rect) {
              const {
                x = 0,
                y = 0,
                w = CanvasParameters.width,
                h = CanvasParameters.height,
                    } = rect;

              context.clearRect(x, y, w, h);
            },

          };
    */
  }
}
