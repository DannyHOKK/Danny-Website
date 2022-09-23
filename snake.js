var canvas =document.getElementById("canvas")

var canvasContext = canvas.getContext('2d')

var score = document.getElementById("score")

var gamestart = false

var gameover = false


// var link = document.createElement('link');

// link.setAttribute('rel', 'stylesheet');

// link.setAttribute('type', 'text/css');

// link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Open+Sans:400italic,400,300,700');

// document.head.appendChild(link);

function checkhitwall(){
    if(snake.tail[snake.tail.length -1].x == canvas.width){
        snake.tail[snake.tail.length -1].x = 0
    }else if(snake.tail[snake.tail.length -1].x == 0 - snake.size){
        snake.tail[snake.tail.length-1].x = canvas.width - snake.size
    }else if(snake.tail[snake.tail.length -1].y == canvas.height){
        snake.tail[snake.tail.length -1 ].y = 0 - snake.size
    }else if(snake.tail[snake.tail.length -1].y == 0 - snake.size){
        snake.tail[snake.tail.length -1].y = canvas.height - snake.size
    }

}

function EatApple(){
    if(snake.tail[snake.tail.length -1].x == apple.x && snake.tail[snake.tail.length -1 ].y == apple.y){
        snake.tail[snake.tail.length] = apple
        apple = new Apple()
        console.log(snake.tail)
    }

}

window.onload = function(){
    
    gameloop()

}

function gameloop(){
    setInterval(show, 1000/20) // 20fps 
}

function show(){

    if(gamestart == true){
        update()
        draw()
        drawapple()
        drawsnake()
    }else if (gamestart == false && gameover == false){

        snake = new Snake(20,20,20)
        apple = new Apple()
        draw()
        drawpresskey()
        
    }else if (gameover == true && gamestart == false){
        draw()
        snake = new Snake(20,20,20)
        apple = new Apple()
        canvasContext.font = "50px Arial"
        canvasContext.fillStyle = "white"
        canvasContext.fillText("You Lost!", canvas.width /2 - 100, canvas.height / 2 - 60)
        canvasContext.font = "30px Arial"
        canvasContext.fillText("Press Any Key to Start", canvas.width /2 - 140, canvas.height / 2 + 35)
    
    }

}


function update(){
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    snake.move()
    checkhitwall()
    EatApple()
    updatescore()
    checksnaketail()
}

function checksnaketail(){
    for(let i = 2; i < snake.tail.length; i++){
        if(snake.tail[0].x == snake.tail[i].x && snake.tail[0].y == snake.tail[i].y){
            gameover = true
            gamestart = false
        }
    }
}

window.addEventListener("keypress", (e)=>{
    gamestart = true
    gameover = false
})


function draw(){
    createRect(0,0,canvas.width, canvas.height, "black")
    createRect(0,0, canvas.width, canvas.height)
}

function drawpresskey(){
    
    canvasContext.font = "50px Arial"
    canvasContext.fillStyle = "white"
    canvasContext.fillText("Game Start!!",canvas.width /2 - 130, canvas.height / 2 - 60)
    canvasContext.font = "30px Arial"
    canvasContext.fillText("Press Any Key to Start", canvas.width /2 - 140, canvas.height / 2 + 35)

}

window.addEventListener("keypress", (e)=>{
    gamestart = true
})

function drawsnake(){

    //draw snake 
    for (let i = 0; i < snake.tail.length; i++){
        createRect(snake.tail[i].x, snake.tail[i].y, snake.size -2.5 , snake.size -2.5, "white")
    }
}

function drawapple(){
    
    //draw apple
    createRect(apple.x, apple.y, snake.size, snake.size, "red")
}

function updatescore(){
    score.innerHTML = snake.tail.length -1;

}

function createRect(x, y, width, height, color){
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}

window.addEventListener("keydown", function(event){
    this.setTimeout(function(){
        if(event.keyCode == 39 && snake.rotateX != -1){
            snake.rotateX = 1
            snake.rotateY = 0
        }else if(event.keyCode == 37 && snake.rotateX != 1){
            snake.rotateX = -1
            snake.rotateY = 0
        }else if(event.keyCode == 40 && snake.rotateY != -1){
            snake.rotateX = 0
            snake.rotateY = 1
        }else if(event.keyCode == 38 && snake.rotateY != 1){
            snake.rotateX = 0
            snake.rotateY = -1
        }
    },1)
})

class Snake{
    
    constructor(x, y, size){
        this.x = x 
        this.y = y
        this.size = size 
        this.tail =[{
            x:this.x,
            y:this.y
        }]
        this.rotateX = 0
        this.rotateY = 1

    }

    move(){
        let newRect; 
        if(this.rotateX == 1){
            newRect={
            x:this.tail[this.tail.length-1].x + this.size,
            y:this.tail[this.tail.length-1].y
            }
        }else if(this.rotateX == -1){
            newRect={
            x:this.tail[this.tail.length-1].x - this.size,
            y:this.tail[this.tail.length-1].y
            }
        }else if(this.rotateY == 1){
            newRect={
            x:this.tail[this.tail.length-1].x,
            y:this.tail[this.tail.length-1].y + this.size
            }
        }else if(this.rotateY == -1){
            newRect={
            x:this.tail[this.tail.length-1].x,
            y:this.tail[this.tail.length-1].y - this.size
            }
        }

        this.tail.shift()
        this.tail.push(newRect)
    }   
    
}

class Apple{
    constructor(){
        let isTouching 

        while(true){
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
           
            for (let i = 0; i < snake.tail.length; i++) {
                if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                    isTouching = true
                }
            } 

            if (!isTouching) {
                break;
            }

        }

    }
}

var snake = new Snake(20,20,20);

var apple = new Apple();

