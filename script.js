

var x = 0;
var y = 0;
var idImg = 0;
const images = []
var key = '';
const imageNames = ["dot","1","2","3","4","5","6","7","8","9","0","a","b","c","x","y","f","'","+","-","(",")","§",",","_","n","=","m","l","k","e","p","v","u","°"]
const cursorMode = false;
var clickNo = 1;
var xOne = 0;
var xTwo = 0;
var yOne = 0;
var yTwo = 0;
let visable = false;
let xCursor = 200;
let yCursor = 200;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
let sizeVar = 50;
let spaceVar = 40;
let shiftMode = false;

  
    document.addEventListener('click', function(event) {
        if(cursorMode)
    {
        if (clickNo == 1){
            console.log(1)
            xOne = event.clientX; 
            yOne = event.clientY; 
            clickNo = clickNo + 1
            
        }
        else if (clickNo == 2){
            console.log(2)
            xTwo = event.clientX;
            yTwo = event.clientY;
            createRectangle(xOne,yOne,xTwo,yTwo)
            clickNo = 1;

        }
    }
    });
document.addEventListener("mousemove",function(event){
    
    x = event.clientX;
    y = event.clientY;
});

document.addEventListener("keydown", function(event){
    console.log(1)
    key = event.key;
    if(key =='*'|| key=='.'){
        key = 'dot'
    };
    console.log(key)
    console.log(key + ' ' + x + ' '+y);
    if(imageNames.includes(key,0) && cursorMode){
        createImage(x,y,key);
    }
    if (key=="Backspace" && cursorMode){
    erase(x,y)
    }
    else if (key=="Backspace" && !cursorMode){
        erase(xCursor,yCursor)
    }
    if(!cursorMode){
    if(key=="ArrowRight" || key== " "){
        moveCursorHorizontal(spaceVar);
    };
    if(key=="ArrowLeft"){
        moveCursorHorizontal(-spaceVar);
    };
    if(key=="ArrowUp"){
        moveCursorVertical(-spaceVar);
    };
    if(key=="ArrowDown"){
        moveCursorVertical(spaceVar);
    };
    if(imageNames.includes(key,0)){
    createImage(xCursor + 25,yCursor,key,sizeVar)
    moveCursorHorizontal(spaceVar);
    };
    if(xCursor >= windowWidth - 50 || key == "Tab"){
        moveCursorHorizontal(-xCursor + 50);
        moveCursorVertical(40);
    };
    console.log(spaceVar)
    if (key === "Shift" && event.location === 2) {
        if (shiftMode) {
            moveCursorHorizontal(20);
            moveCursorVertical(20);
            sizeVar = 50;
            spaceVar = 40;
            document.getElementById("shiftMode").style.width="0px";
            document.getElementById("shiftMode").style.height="0px"; 

        } else {
            moveCursorHorizontal(-20);
            moveCursorVertical(-20);
            sizeVar = 25;
            spaceVar = 20;
            document.getElementById("shiftMode").style.width="100px";
            document.getElementById("shiftMode").style.height="100px"; 
        }
        shiftMode = !shiftMode;
    }
    if (key =="Enter"){
        equation = calculate(yCursor,images);
        viewResult(equation);
    }
    
    };
    });

  createBlinkingCursor()
  createSigns()
  //const intervalID = setInterval(blinkingCursor, 500);
  function erase(x,y){
    console.log(1)
    var closestImage = 10000000;
    var closestImageId = null;
    var index = 0
    for(let i=0;i<images.length;i++){
        var distance = ((images[i][1] - x)**2 + (images[i][2] - y)**2)**0.5;
        if(distance < closestImage){
            closestImage = distance;
            closestImageId = images[i][0];
            index = i
        }
    }
    
    const a = document.getElementById(closestImageId)
    a.remove();
    images.splice(index,1)
  }
  function createBlinkingCursor(){
    var newImg = document.createElement("img");
    let xCursorCoords = xCursor + "px";
    let yCursorCoords = yCursor + "px";
    newImg.src = "img/writeCursor.png";
    newImg.id = "cursor"; 
    console.log(newImg)
    document.body.appendChild(newImg);
    document.getElementById("cursor").style.position="absolute";
    document.getElementById("cursor").style.top=yCursorCoords;
    document.getElementById("cursor").style.left=xCursorCoords;
    document.getElementById("cursor").style.width="50px";
    document.getElementById("cursor").style.height="50px";
  };
  function createSigns(){
    var newImg = document.createElement("img");
    let xCursorCoords = "75%";
    let yCursorCoords = "5%";
    newImg.src = "img/ShiftLogo.png";
    newImg.id = "shiftMode"; 
    console.log(newImg)
    document.body.appendChild(newImg);
    document.getElementById("shiftMode").style.position="absolute";
    document.getElementById("shiftMode").style.top=yCursorCoords;
    document.getElementById("shiftMode").style.left=xCursorCoords;
    document.getElementById("shiftMode").style.width="0px";
    document.getElementById("shiftMode").style.height="0px"; 
  }
  function moveCursorVertical(direction){
    yCursor += direction;
    let yCursorCoords = yCursor + "px";
    
    document.getElementById("cursor").style.top=yCursorCoords;
  }
  function moveCursorHorizontal(direction){
    xCursor += direction;
    let xCursorCoords = xCursor + "px";
    
    document.getElementById("cursor").style.left=xCursorCoords;
  }
  function blinkingCursor(){
    console.log(xCursor + " " + yCursor);
    let xCursorCoords = xCursor + "px";
    let yCursorCoords = yCursor + "px";
    if(visable){
        document.getElementById("cursor").style.width="0px";
        document.getElementById("cursor").style.height="0px";
        visable = false;

        console.log(1)
    }
    else{
        document.getElementById("cursor").style.position="absolute";
        document.getElementById("cursor").style.top=yCursorCoords;
        document.getElementById("cursor").style.left=CursorCoords;
        document.getElementById("cursor").style.width="75px";
        document.getElementById("cursor").style.height="75px";
        visable = true;
        console.log(2)
    
    }
  };
function createImage(x,y,key,size){
    console.log(idImg+x+y)
    const image = []
    var newImg = document.createElement("img");
    var xCoords = x + "px"
    var yCoords = y + "px"
    var sizePx = size + "px"
    newImg.src = "img/" + key + ".png";
    newImg.id = idImg;
    document.body.appendChild(newImg);
    document.getElementById(idImg).style.position="absolute";
    document.getElementById(idImg).style.left= xCoords;
    document.getElementById(idImg).style.top=yCoords;
    document.getElementById(idImg).style.height=sizePx;
    document.getElementById(idImg).style.width=sizePx;
    image.push(idImg,x,y,key)
    idImg += 1;
    
    images.push(image)

}

function calculate(y,images){
let row = [];
let exponentRow = [];
let equation = '';
  for(let i = 0; i< images.length;i++){
    if(images[i][2] == y){
        row.push(images[i]);
    };
    if(images[i][2] == y - 20){
        exponentRow.push(images[i]);
    };
  }; 
  row.sort(function(a, b) {
    return a[2] - b[2];
  });
  console.log(row.length);
for(let i = 0;i< row.length;i++){
    equation += row[i][3];
    for(let j = 0;j<exponentRow.length;j++){
            let exponent = '';
            let exponentCheckX = 20;
            let exponentCheckY = 20;
            let shouldContinue = true; 

            while(shouldContinue){
            shouldContinue = !shouldContinue; 
            
            console.log(exponentRow[j][1] + '   ' + row[i][1] + ' Y  ' + exponentRow[j][2] + '   ' + row[i][2])
            if(exponentRow[j][1] - exponentCheckX == row[i][1] && exponentRow[j][2] + exponentCheckY == row[i][2]){
                    console.log(1)
                    exponent += exponentRow[j][3];
                    shouldContinue = !shouldContinue;
                    exponentCheckX += 20; 
                }
            }
            
            if(exponent != ''){
                equation += '**' + exponent;
            }
            


    }
    
}
  
  console.log(equation);
  if(equation.includes('x')){
    console.log(equation);
    equation = nerdamer.solve(equation,'x').text()
    console.log(typeof equation);
    console.log(equation);
    equation = equation.replace("]","");
    equation = equation.replace("[","");
    console.log(equation);
    equation = equation.split(",");
    console.log(equation);
    for(let i =0;i<equation.length;i++){
        
        equation[i] = parseFloat(equation[i]).toFixed(2);
    }
    console.log(equation);
  }
  else{
    console.log(eval(equation));
  }
  console.log(equation)
  return equation

};

function viewResult(equation){
    let xValue = 50;
    equation = equation.toString();
    equation = equation.split("");
    console.log(equation)
    for(let i=0;equation.length > i;i++){
        if(equation[i] ==','){
            equation[i] = 'x='
        };
    }
    
    equation = equation.toString();
    equation = "x=" + equation;
    equation = equation.replace(/,/g,"")
    equation = equation.split("");
    console.log(equation)
    for(let i=0;equation.length > i;i++){
        if(equation[i] =='*'|| equation[i]=='.'){
            equation[i] = 'dot'
        };
        
        createImage(xValue,yCursor + 50,equation[i],20)
        xValue += 40
    }
}

















function createRectangle(xOne,yOne,xTwo,yTwo){

     const image = []
     var newImg = document.createElement("img")
     var length = ((xOne - xTwo)**2 + (yOne - yTwo)**2)**0.5 + 'px'
     var angle =  57.2957795 * Math.atan(Math.abs(yOne - yTwo)/Math.abs(xOne - xTwo))
     if ( xTwo >= xOne){
        angle = -1 * angle
      }
      if(yTwo >= yOne){
        angle = -1 * angle
      }
      xOne = xOne + "px"
      yOne = yOne + "px"
      xTwo = xTwo + "px"
      yTwo = yTwo + "px"
      newImg.src = "img/rectangle.png"
      newImg.id = idImg
      document.body.appendChild(newImg)
      document.getElementById(idImg).style.top=yOne;
      document.getElementById(idImg).style.left=xOne;
      document.getElementById(idImg).style.height="10px";
      
      console.log(length)
      document.getElementById(idImg).style.width = length
      
      
      console.log(angle)
      document.getElementById(idImg).style.transform = 'rotate(' + angle + 'deg)';
      image.push(idImg,xOne,yOne)
      idImg += 1;
      images.push(image)
      
}
  