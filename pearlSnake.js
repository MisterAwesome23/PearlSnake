const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//unit box
const box = 32;

//loading images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//load audiofiles

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const down = new Audio();
const left = new Audio();
const right = new Audio();

dead.src = "audio/dead.mp3"
eat.src = "audio/eat.mp3"
up.src = "audio/up.mp3"
down.src = "audio/down.mp3"
left.src = "audio/left.mp3"
right.src = "audio/right.mp3"


//creating Snake

let snake = [];
snake[0] = {
    
    x : 9 * box,
    y : 10 * box
    
}


//create food

let food = {
    
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box,
}

//score
let score = 0;

let d;

//control snake
document.addEventListener("keydown",direction);


function direction(event){
    
    if(event.keyCode==37 && d != "RIGHT"){
        d = "LEFT";
        left.play();
    }else if(event.keyCode==38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(event.keyCode==39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(event.keyCode==40 && d != "UP"){
        d = "DOWN";
        down.play();
    } 
}


//check collision

function collision (head,array){
    for(let i=0; i<array.length;i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
        
        
    }
    return false;
}



//draw on canvas

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for(let i=0 ; i < snake.length; i++){
        ctx.fillStyle = (i==0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        
        //for snake head we will add stroke
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);

    //old head of snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
     //direction of snake
    if(d=="LEFT") snakeX -= box;
    if(d=="RIGHT") snakeX += box;
    if(d=="UP") snakeY -= box;
    if(d=="DOWN") snakeY += box;    
    
    //if snake eats it grows
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        
        food = {
                x : Math.floor(Math.random()*17+1) * box,
                y : Math.floor(Math.random()*15+3) * box,
                }
        
        //food eaten hence tail not removed
        
    }else{
        snake.pop();
        
    }
    
    //add new head    
    let newHead = {
        
        x : snakeX,
        y : snakeY
    }
    
    //game over
    if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17* box || collision(newHead,snake)){
        dead.play();
        clearInterval(game);
    }
    
    
    snake.unshift(newHead);
        
    ctx.fillStyle = "white";
    ctx.font = "45px Changa One";
    ctx.fillText(score,2*box,1.6*box);
    
}

//draw function called every 100 ms
let game = setInterval(draw,100);
