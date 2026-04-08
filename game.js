import Color from "https://colorjs.io/dist/color.js";


var startingHue = Math.floor(Math.random() * 360) + 1;
var ctx;

let globalHueChange = 0;
let time = 0;



const startButton = document.createElement('button');
startButton.textContent = "SPIN";
document.body.appendChild(startButton);

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

    //Event listeners
    gameArea.canvas.addEventListener("click", function(e) {
        if (gameCanStart){
            const rect = gameArea.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
        }
    });
    gameArea.canvas.addEventListener("mousemove", function(e) {
        const rect = gameArea.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let foundHover = false;

    });

    updateGameArea();
    gameCanStart = true;
    console.log("STARTING");
}

startGame();