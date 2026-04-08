import Color from "https://colorjs.io/dist/color.js";


const pi = Math.PI;

var startingHue = Math.floor(Math.random() * 360) + 1;
var ctx;

let globalHueChange = 0;
let time = 0;



var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this. canvas. height);
    }
}


class section {
    constructor(radius, startAngle, endAngle, hue) {
        //Variables
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;

        //Color
        this.lightness = 0.8;
        this.chroma = 0.09;
        this.hue = hue;
        this.color = new Color("oklch", [this.lightness, this.chroma, this.hue]);
        

        this.update = function() {
            //Update color
            this.hue = ( (this.hue) % 360 ) - 0.25 - globalHueChange;
            this.color = new Color("oklch", [this.lightness, this.chroma, this.hue]);

            ctx = gameArea.context;
            ctx.fillStyle = this.color;
        }

    }
}



function updateGameArea() {
    gameArea.clear();
    updateGlobalHue();    
}

function updateGlobalHue() {
    globalHueChange = 1/(Math.cosh(time - 10)) * 1;
    time = (time + 0.01) % 20;
}

function startGame() {
    gameArea.start();
    let targetX = 10;
    let targetY = 10;

    updateGameArea();
    gameCanStart = true;
    console.log("STARTING");
}

startGame();


const startButton = document.createElement('button');
startButton.textContent = "SPIN";
document.body.appendChild(startButton);