import Color from "https://colorjs.io/dist/color.js";


var startingHue = Math.floor(Math.random() * 360) + 1;
// var ctx;

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


const circle = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const x = canvas.width / 2;
const y = canvas.height / 2;
const radius = 50;

ctx.beginPath();
ctx.arc(x, y, radius, 0, 2 * Math.PI); // Create the circle path
ctx.fillStyle = 'green';
ctx.fill();                            // Fill with color
ctx.lineWidth = 2;
ctx.strokeStyle = 'black';
ctx.stroke();  






const startButton = document.createElement('button');
startButton.textContent = "SPIN";
document.body.appendChild(startButton);