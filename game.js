import Color from "https://colorjs.io/dist/color.js";


const pi = Math.PI;

const CANVASWIDTH = 580;
const CANVASHEIGHT = 580;

const CENTERX = CANVASWIDTH / 2;
const CENTERY = CANVASHEIGHT / 2;
const RADIUS = CENTERX - 30;




const options = ["Give everyone in the group money",
                 "Sit in the corner of shame",
                 "Give everyone in the group candy",
                 "Powerwash your chromebook",
                 "Go somewhere blindfolded",
                 "Read book aloud",
                 "Do 10 push-ups",
                 "Wear your sweater backwards",
                 "Sing a song of the group's choice (vote)",
                 "Show the group your browsing history"
];
const NUMSECTIONS = options.length;

let sections = [ //startAngle, endAngle, hue
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

var startingHue = Math.floor(Math.random() * 360) + 1;

const hueChangePerSection = 360 / NUMSECTIONS * 2;
const angleChangePerSection = (2*pi) / NUMSECTIONS;

let globalHueChange = 0;
let time = 0;

let golbalZeroAngle = 0;



var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = CANVASWIDTH;
        this.canvas.height = CANVASHEIGHT;
        const ctx = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);

        this.startAngle = golbalZeroAngle;

        //Color
        this.lightness = 0.8;
        this.chroma = 0.09;
        this.hue = startingHue;
        this.color = new Color("oklch", [this.lightness, this.chroma, this.hue]);

    },
    clear : function() {
        ctx.clearRect(0, 0, this.canvas.width, this. canvas. height);
    },

    drawCircle : function(startAngle, endAngle, hue, number) {
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.hue = hue;
        this.number = number;

        //Color
        this.color = new Color("oklch", [this.lightness, this.chroma, this.hue]);
        

        //Draw
        ctx.beginPath();
        ctx.moveTo(CENTERX, CENTERY); //left line
        ctx.arc(CENTERX, CENTERY, RADIUS, this.startAngle, this.endAngle); //curved part
        ctx.moveTo(CENTERX, CENTERY); //right line
        ctx.stroke(); //draw border
        ctx.fillStyle = this.color;
        ctx.fill(); //draw fill

        //Update variables
        this.hue = ( (this.hue) % 360 ) - 0.25 - globalHueChange;
        sections[number][2] = this.hue;
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

    drawWheel();
    updateGlobalHue();
    updateGlobalAngle();
}

function updateGlobalHue() {
    globalHueChange = 1/(Math.cosh(time - 10)) * 1;
    time = (time + 0.01) % 20;
}

function updateGlobalAngle() {
    golbalZeroAngle += 0.005;
    golbalZeroAngle = (golbalZeroAngle % (2*pi));
}

function drawWheel() {
    for (let i = 0; i < NUMSECTIONS; i++){
        gameArea.drawCircle(sections[i][0], sections[i][1], sections[i][2], i);
    }
}

function startGame() {
    gameArea.start();
    for (let i = 0; i < NUMSECTIONS; i++){ //each row
        sections[i][0] = golbalZeroAngle + (angleChangePerSection * i);
        sections[i][1] = sections[i][0] + angleChangePerSection;
        sections[i][2] = startingHue + (hueChangePerSection * i);
    }

    updateGameArea();
    console.log("STARTING");
}

startGame();




