var BotGrop = []; // масив для ботов

var Bots = 10;
window.onload = function main() {



      GenereteFirs();
      DrewInCanvas();
 console.log(typeof BotGrop[1].CreateNewBot);
 //setInterval(main,100);

}
////////////////////////////////////////
/////////////параметры поля/////////////
var ConvasParametr = {
      width  : 800,
      height : 400
}
////////////////////////////////////////
////////////для упрошения///////////////

function Random(max, min) {
  return ((Math.floor(Math.random() * Math.floor(max)))+min);
}

function filingArr(mass = []) {
  for(var i = 0 ; i < 16 ; i++){
    mass[i] = Random(16,1);
  }
}
////////////////////////////////////////
function GenereteFirs() {


  function CreateNewBot() {
     this.Arr     =  [];
     this.pointer =  0;
     this.life    =  50;
     this.size    =  20;
     this.cordX   =  Random(((ConvasParametr.width) - this.size),0);
     this.cordY   =  Random(((ConvasParametr.height)- this.size),0);
  }

    for(var i = 0 ; i < Bots ; i++ ){//заполнение масивов и помишение их в BotGrop
    BotGrop[i] = new CreateNewBot();
    filingArr(BotGrop[i].Arr = [] , 1);
  }
  console.log(BotGrop);
}


function DrewInCanvas() {
      var canvas = document.getElementById("main");
          ctx    = canvas.getContext("2d");

          canvas.width  = ConvasParametr.width;
          canvas.height = ConvasParametr.height;

          SpawnBot();

}


function SpawnBot() {
  for (var i = 0; i < Bots; i++) {
    ctx.fillStyle ="#000";
    ctx.fillRect(BotGrop[i].cordX,
                 BotGrop[i].cordY,
                 BotGrop[i].size,
                 BotGrop[i].size);
    ctx.fillStyle = "#fff" ;
    ctx.font = '14pt Calibri';
    ctx.fillText(BotGrop[i].life,
                 BotGrop[i].cordX+0,
                 BotGrop[i].cordY+15);
  }
}

function TickTime() {
  for (var i = 0; i < Bots; i++) {
    BotGrop[i].Arr[BotGrop[i].pointer]
  }

}
