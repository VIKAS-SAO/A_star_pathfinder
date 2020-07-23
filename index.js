 const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d'); 
canvas.width = 500;
canvas.height = 500;
let cols=25;
let rows = 25;
let h ,w;
let openArray = [];
let closedArray = [];
let start , finish;
let current;
let path = []
 let grid = new Array(cols)
for(let i=0 ;i< cols ;i++){
    grid[i] = new Array(rows);
}

function removeFromArray(array, current){
    for(let i=array.length -1 ;i>=0;i--){
        if(array[i] == current){
            array.splice(i,1);
            return;
        }
    }
}
function heuristic(a , b){
     //return Math.sqrt((a.x-b.x)*(a.x-b.x) +(a.y-b.y)*(a.y-b.y) )  // for simple  distantial pythagoras  
      let d =  Math.abs( a.x - b.x ) +Math.abs(a.y - b.y)  // for simple  distantial pythagoras 
      return d;
}

function setup(){
     w = canvas.width/cols;
     h = canvas.height/rows;
    for(let i=0;i<cols;i++){
        for(let j=0;j<rows;j++){
            grid[i][j] =  new Cell(i,j); 
        }
    }
    for(let i=0;i<cols;i++){
        for(let j=0;j<rows;j++){
            grid[i][j].addNeighbors(grid)
        }
    }
    start = grid[0][0];
    start.g = 0;
    finish = grid[cols-1][rows-1]
    start.wall = false;
    finish.wall = false;
    openArray.push(start) 
 
 
}
 

  
 
 

 

 
function Cell(x,y ){
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0; 
    this.neighbors = []
    this.previous = undefined;
    this.wall = false;
    let random = Math.random();
    if(random >.7){
        this.wall = true;
    }
 
    this.show = function(color){
           context.beginPath();
           context.fillStyle=color; 
           if(this.wall ){
               context.fillStyle = 'black'
           }
           context.fillRect(this.x*w, this.y*h, w-2, h-2);
           context.fill();  
    }
    this.addNeighbors = function(grid){
        let x = this.x;
        let y = this.y;
        // adding adjacent neighbors
        if(x+1<cols){
           this.neighbors.push(grid[x+1][y]) 
        }
        if(x-1>=0){
           this.neighbors.push(grid[x-1][y])
        }
        if(y+1<rows){
            this.neighbors.push(grid[x][y+1])
        }
        if(y-1>=0){
            this.neighbors.push(grid[x][y-1]) 
        }
         // adding diagonal neighbors
         if(x+1<cols && y-1>=0){
            this.neighbors.push(grid[x+1][y-1]) 
         }
         if(x+1<cols && y+1<rows){
            this.neighbors.push(grid[x+1][y+1])
         }
         if(x-1>=0 && y+1<rows){
            this.neighbors.push(grid[x-1][y+1])
         }
         if(x-1>=0 && y-1>=0){
            this.neighbors.push(grid[x-1][y-1]) 
         }
        
    }

}
 
 


function draw(){
   // console.log('draw function running !! ')
    if(openArray.length>0){
            let lowestindex = 0 ;
            for(let i=0;i<openArray.length;i++){
                if(openArray[i].f<openArray[lowestindex].f){
                    lowestindex = i;
                }
            }
            current = openArray[lowestindex];

            if(current  === finish){
               
                 console.log('DONE !!')
                     clearInterval(drawTimer)

 
            }
            removeFromArray(openArray , current)
            closedArray.push(current);

            let neighbors = current.neighbors;
            for(let i=0;i<neighbors.length;i++){
                let neighbor = neighbors[i];
                if(!closedArray.includes(neighbor) && !neighbor.wall){
                        let tempG = current.g+1;
                        let newPath = false;

                        if(openArray.includes(neighbor)){
                                if(tempG < neighbor.g){
                                    neighbor.g = tempG; 
                                    newPath = true;
                                }
                        }
                        else{
                            neighbors.g = tempG;  
                            newPath = true; 
                            openArray.push(neighbor)
                        } 
                        if(newPath){
                            neighbor.h = heuristic(finish , neighbor);
                            neighbor.f = neighbor.g + neighbor.h;
                            neighbor.previous = current;  
                        }
                       
                        
                        
                } 
            }




    }
    else{
        // no solution
         console.log('No Solution !!') 
        clearInterval(drawTimer);
        return;

    }

// these function are to draw the requirement on the canvas
    for(let i=0;i<cols;i++){
        for(let j=0;j<rows;j++){ 
            grid[i][j].show('white') 
        }
    }
    for(let i=0;i<openArray.length;i++){
        openArray[i].show('green');
    }
    for(let i=0;i<closedArray.length;i++){
        closedArray[i].show('red');
    }
     // drawing the final path
         path = [];
        path.push(current)
        let temp  = current;
        while(temp.previous){
            path.push(temp.previous)
            temp = temp.previous;
        }
       
     
     for(let i=0;i<path.length;i++){
        closedArray[i].show('yellow');
    }
   
     
 

}




 









































// for initializing the program
setup()
let drawTimer =  setInterval(() => {
   draw()
}, 50);
 
 

let name ='vikas';
let A =[1,2,3];

 