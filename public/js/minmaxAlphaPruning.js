
// g stands for global

let gGrid = [['','',''],
            ['','',''],
            ['','',''],]
let possible = []
let currentPlayer;
const gPlayerX = 'X'
const gComputerO = 'O'

const emptyOX = ''
const gScoreList = {
    'X': -10,
    'tie':0,
    'O':10,

}
let depth = 8
function setup() {
	//canvas

    createCanvas(600,600);
    
    console.log("from minimaxalpha")
    
}

function computeBestMove(grid){
        let maxmimumScore = -Infinity;
        let bestMove;
        
        for(let i =0; i <3; i++){
            for(let j =0; j <3; j++){
                if(grid[i][j] == ''){
                    
                    grid[i][j] = gComputerO
                    let score = minimax(grid,depth,-Infinity,Infinity,  false)
                    grid[i][j] = ''
                    
                    if (score > maxmimumScore){
                        maxmimumScore = score
                        bestMove = {i,j}
                        depth --
                    }
                }
            }
            
        }

    
    grid[bestMove.i][bestMove.j] = gComputerO
 
}


function minimax(grid, depth, alpha, beta, maximizing){
    
    let result = whoIsWinner()
    // base case
    if(result != null || depth ==0 ){
        let score = gScoreList[result]
        // console.log(score)
        return score
    }

    // minimax recursive function
    if(maximizing){
        let bestScore = -Infinity
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(grid[i][j] == ''){
                    grid[i][j] = gComputerO;
                    let score = minimax(gGrid,depth-1, alpha,beta,  false)
                    grid[i][j] = '';
                    bestScore = Math.max(bestScore,score)
                    let alpha1 = Math.max(alpha, score)
                    if( beta <= alpha1){
                        break
                    }
                }
                
            }
            
        }
        return bestScore
    }

    else{
        let bestScore = Infinity
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(grid[i][j] == ''){
                    grid[i][j] = gPlayerX;
                    let score = minimax(grid,depth-1, alpha,beta, true)
                    grid[i][j] = '';
                    bestScore = Math.min(bestScore,score)
                    let beta1 = Math.min(beta, score)
                    if( beta1 <= alpha){
                        break
                    }
                }
            }
        }
        return bestScore
    }

}

// // onClick event
function mouseClicked(){
    
    drawXWhenClicked()

    computeBestMove(gGrid)
}

function drawXWhenClicked(){
    // based on the position of mouse
    for(let i = 0; i <3; i++){
        if(mouseX < (1 * width/3) && mouseY < ( (i+1) *height/3)) {
            gGrid[0][i] = gPlayerX
            return
        }

        else if(mouseX < (2*width/3) && mouseY < ((i+1)  *height/3)){
            gGrid[1][i] = gPlayerX
            return
        }

        else if(mouseX < (3*width/3) && mouseY < ((i+1 ) *height/3)){
            gGrid[2][i] = gPlayerX
            return
        }
    }
}

function draw(){
    // setting for the canvas
    background(0)
    let w = width/3
    let h = height/3
    stroke(255)

    drawBox(w,h)
  
    drawXO(w,h)
}


function checkThree(a, b, c) {
    return a == b && b == c && a != '';
  }
  
  function whoIsWinner() {
    let winner = null;
  
    // horizontal
    // vertical
    // check
    for (let i = 0; i < 3; i++) {
      if (checkThree(gGrid[i][0], gGrid[i][1], gGrid[i][2])) {
        winner = gGrid[i][0];
        break
      }

      if (checkThree(gGrid[0][i], gGrid[1][i], gGrid[2][i])) {
        winner = gGrid[0][i];
        break
        }
    }
  
    // Diagonal
    if (checkThree(gGrid[0][0], gGrid[1][1], gGrid[2][2])) {
      winner = gGrid[0][0];
    }
    if (checkThree(gGrid[2][0], gGrid[1][1], gGrid[0][2])) {
      winner = gGrid[2][0];
    }
  

    let availableSpace = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gGrid[i][j] == '') {
          availableSpace++;
        }
      }
    }
  
    if (winner == null && availableSpace == 0) {
      return 'tie';
    } 
    else {
      return winner;
    }
  }

function drawBox(w,h){
    // vertical line
    line(w,0,w,height)
    line(w*2,0,w*2,height)
    // horizontal line
    line(0,h,width,h)
    line(0,h*2,width,h*2)
}

function drawXO(w,h){
    
    for (let i = 0; i <3; i++){
        for (let j = 0; j <3; j++){
            let current = gGrid[i][j]
            let x = w*i +w/2
            let y = h* j +h/2
            let xRadius = w/4
            textSize(32)
            strokeWeight(4)
            // draw O
            if(current == gComputerO){
                noFill()
                ellipse(x,y,w/2)
            }
            // Draw X
            else if(current == gPlayerX){
                line(x - xRadius,y - xRadius,x+xRadius,y+xRadius)
                line(x+xRadius,y - xRadius,x-xRadius,y+xRadius)
            }
        }
    }

    let result = whoIsWinner()
    if (result != null){
        if(result !='tie'){
            createP("The winner is : " + result)
        }
        else{
            createP("The game is " + result)
        }
        noLoop()
        
        
    }

}