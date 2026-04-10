import Color from "https://colorjs.io/dist/color.js";


const pi = Math.PI;

const CANVASWIDTH = 580;
const CANVASHEIGHT = 580;

const CENTERX = CANVASWIDTH / 2;
const CENTERY = CANVASHEIGHT / 2;
const RADIUS = CENTERX - 30;


var startingHue = Math.floor(Math.random() * 360) + 1;
var ctx;

let globalHueChange = 0;
let time = 0;

let golbalZeroAngle = 0;

let options = ["Give everyone in the group money",
               "Sit in the corner of shame",
               "Give everyone in the group candy",
               "Powerwash your chromebook",
               "Get somewhere blindfolded",
               "Read book aloud",
               "Do 10 push-ups",
               "Wear your sweater backwards",
               "Pirate a game in 5 minutes"];





var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = CANVASWIDTH;
        this.canvas.height = CANVASHEIGHT;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);

        //Color
        this.lightness = 0.8;
        this.chroma = 0.09;
        this.hue = startingHue;
        this.color = new Color("oklch", [this.lightness, this.chroma, this.hue]);

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this. canvas. height);
    },

    drawCircle : function() {
        //Color
        this.hue = ( (this.hue) % 360 ) - 0.25 - globalHueChange;
        this.color = new Color("oklch", [this.lightness, this.chroma, this.hue]);
        
        //Draw
        this.context.beginPath();
        this.context.moveTo(CENTERX, CENTERY);
        this.context.arc(CENTERX, CENTERY, RADIUS, 0, (2*pi)/options.length);
        this.context.stroke();
        this.context.fillStyle = this.color;
        this.context.fill();
    }
}


class Section {
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

            ctx.beginPath(); // Start a new path
            ctx.arc(100, 100, this.radius, this.startAngle, this.endAngle); // Define the circle
            ctx.strokeStyle = "blue"; // Set line color
            ctx.stroke(); // Draw the outline
        }

    }
}



function updateGameArea() {
    gameArea.clear();
    gameArea.drawCircle();
    updateGlobalHue();
    updateGlobalAngle();
}

function updateGlobalHue() {
    globalHueChange = 1/(Math.cosh(time - 10)) * 1;
    time = (time + 0.01) % 20;
}

function updateGlobalAngle() {
    golbalZeroAngle += 0.01;
    golbalZeroAngle = (golbalZeroAngle % (2*pi));
}

function startGame() {
    gameArea.start();
    let targetX = 10;
    let targetY = 10;

    // const wheel1 = new Section(10, 0, 1*pi, startingHue);

    updateGameArea();
    console.log("STARTING");
}

startGame();


const startButton = document.createElement('button');
startButton.textContent = "SPIN";
document.body.appendChild(startButton);



// const canvas = document.getElementById("myCanvas");
// const ctx2 = gameArea.getContext("2d");

// ctx2.beginPath();
// ctx2.arc(100, 75, 50, 0, 2 * Math.PI);
// ctx2.stroke();