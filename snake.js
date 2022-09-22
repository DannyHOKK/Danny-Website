var canvas =document.getElementById("canvas")

var canvasContext = canvas.getContext('2d')

var score = document.getElementById("score")

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
    update()
    draw()
}

function update(){
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    snake.move()
    checkhitwall()
    EatApple()
    updatescore()
}

function draw(){
    createRect(0,0,canvas.width, canvas.height, "black")
    createRect(0,0, canvas.width, canvas.height)

    //draw snake 
    for (let i = 0; i < snake.tail.length; i++){
        createRect(snake.tail[i].x, snake.tail[i].y, snake.size -2.5 , snake.size -2.5, "white")
    }
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

