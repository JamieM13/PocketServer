//initialize and map variables 
let dropdown;
let pocketIcon;
let phoneIcon;
let realIcon;

let passFail;
let addButton;
let garmentImg;
let garmentUrl;
let garmentScore;
let criteriaTitle;
let score;
let pockets;
let holdPhone;
let real;
let brand;
let productName;
let fixGroup;
let FixItTxt;
let productHeader;

let pocketStatus = false;

dropdown = document.getElementById('search_dropdown');
pocketIcon = document.getElementById('pocketIcon');
phoneIcon = document.getElementById('phoneIcon');
realIcon = document.getElementById('realIcon');

garmentImg = document.getElementById('garmentImg');
garmentUrl = document.getElementById('garmentUrl');
addButton = document.getElementById('addButton');
garmentScore = document.getElementById('garmentScore');
garmentUrl = document.getElementById('garmentUrl');
criteriaTitle = document.getElementById('garment_criteria_title');
brand = document.getElementById('Brand');
productName = document.getElementById('ProductName');
fixGroup = document.getElementById('fixGroup');
FixItTxt = document.getElementById('FixItTxt');
productHeader = document.getElementById('ProductHeader');

//listen to event dropdown selection
//show the right picture for an array

dropdown.addEventListener("change", displayGarment);

function displayGarment() {
    // console.log(dropdown.selectedIndex);
    // console.log(garmentArray[dropdown.selectedIndex].src);
    garmentImg.src = garmentArray[dropdown.selectedIndex].src;
    garmentUrl.href = garmentArray[dropdown.selectedIndex].href;
    criteriaTitle.innerHTML = "Here's the Bechdel test for pants:";
    
    //garmentScore.innerHTML = "Does It Pass?";

    pocketStatus = false;
    pocketAdd = [];
    // img = loadImage(garmentImg.src);
    preload();
    // setup();
    // draw();
    displayCriteria();
    brand.innerHTML = garmentArray[dropdown.selectedIndex].brand;
    productName.innerHTML = garmentArray[dropdown.selectedIndex].name;
    garmentUrl.innerHTML = "buy them here";
    productHeader.innerHTML = "Do you feel a sewing project coming on?"
    fixGroup.style="display:''";
}

addButton.addEventListener("click", changeStatus);
console.log("add pockets");

function changeStatus(){
    pocketStatus = true;
}

// update the criteria and change the score to pass/fail
function displayCriteria() {


    if (garmentArray[dropdown.selectedIndex].pockets == 1) {
        pocketIcon.src = "checkmark.png";
    } else {
        pocketIcon.src = "x-mark-512.png";
    }
    if (garmentArray[dropdown.selectedIndex].holdPhone == 1) {
        phoneIcon.src = "checkmark.png";
    } else {
        phoneIcon.src = "x-mark-512.png";
    }
    if (garmentArray[dropdown.selectedIndex].real == 1) {
        realIcon.src = "checkmark.png";
    } else {
        realIcon.src = "x-mark-512.png";
    }

    

    if ((garmentArray[dropdown.selectedIndex].pockets + garmentArray[dropdown.selectedIndex].holdPhone + garmentArray[dropdown.selectedIndex].real) == 3) {
        console.log("pass");
        passFail = "Pass";
        garmentScore.innerHTML = "Pass"
        FixItTxt.innerHTML = "Are more pockets ever a bad thing?"
       
    } else {
        console.log("fail");
        passFail = "Fail"
        garmentScore.innerHTML = "Fail"
        FixItTxt.innerHTML = "Can we fix this nonsense?"
        addButton.innerHTML = "Add some pockets"
    }
}





//--------------------p5-----------------//

let pocketAdd = [];
let pocketX, pocketY;
let pocketW = 20;
let pocketL;
let pocketRotate = 0;
let imgX;
let imgY;
let img;
let currentCol =0;
let reWidth;


function preload() {
  img = loadImage(garmentImg.src);
}


function setup() {
  background(200);
  var myCanvas = createCanvas(600, 600);
  myCanvas.parent('garmentPic');

  for (i=1; i<garmentArray.length; i++){
    var option = document.createElement('option');
    option.innerHTML = garmentArray[i].name;
    dropdown.appendChild(option);
    
  }
console.log("calling setup");
}

function draw() {
  // background(220);
  pixelDensity(2.5);
//   var myCanvas = createCanvas(600, 600);
//   myCanvas.parent('garmentPic');

  // background(200);
reWidth = height/img.height*img.width;
//  console.log(reWidth);
image (img, 0, 0, reWidth, height);
//   img= garmentArray[dropdown.selectedIndex].src;
if (pocketStatus == true) {
    drawPocket();
} 

}

function drawPocket (){
  rectMode(CENTER);
  noStroke();
  
  
  pocketL = pocketW;
  fill(colorArray[currentCol].col);
  rect(mouseX, mouseY, pocketW, pocketL);
  triangle(
    mouseX - pocketW / 2,
    mouseY + pocketL / 2,
    mouseX + pocketW / 2,
    mouseY + pocketL / 2,
    mouseX,
    mouseY + pocketL / 2 + pocketW / 3
  );
  for (i = 0; i < pocketAdd.length; i++) {
    
    fill(pocketAdd[i].pocketCol);
    rect(pocketAdd[i].x, pocketAdd[i].y, pocketAdd[i].w, pocketAdd[i].l);
    triangle(
    pocketAdd[i].tx1,
    pocketAdd[i].ty1,
    pocketAdd[i].tx2,
    pocketAdd[i].ty2,
    pocketAdd[i].tx3,
    pocketAdd[i].ty3
    );
  }
}

function mousePressed() {
  pocketAdd.push({
    pocketCol: colorArray[currentCol].col,
    x: mouseX,
    y: mouseY,
    w: pocketW,
    l: pocketL,
    tx1: mouseX - pocketW / 2,
    ty1: mouseY + pocketL / 2,
    tx2: mouseX + pocketW / 2,
    ty2: mouseY + pocketL / 2,
    tx3: mouseX,
    ty3: mouseY + pocketL / 2 + pocketW / 3,
  });
}

function keyPressed() {
  if (keyCode === 68) {
    pocketW += 5;
  }
  if (keyCode === 65) {
    pocketW -= 5;
    if (pocketW < 1) {
      pocketW = 10;
    }
  }
  if (keyCode === LEFT_ARROW) {
     currentCol--;
     if (currentCol <0){
        currentCol = colorArray.length-1;
        console.log(currentCol);
     }
     }
if (keyCode === RIGHT_ARROW) {
        currentCol++;
        if (currentCol >= colorArray.length){
           currentCol = 0;
        }
        }
}

//-------------------p5------------------------------//


// let hoverScore;
// hoverScore = document.getElementById('hover_score');
// let hoverNum;


// //listen for mouseover event
// garmentScore.addEventListener("mouseover", displayScoreOver);
// //display pass/fail percentage score

// function displayScoreOver() {
//     console.log(passFail);
    // hoverNum= ((garmentArray[dropdown.selectedIndex].pockets + garmentArray[dropdown.selectedIndex].holdPhone + garmentArray[dropdown.selectedIndex].representation) / 3 * 100);
    // console.log((garmentArray[dropdown.selectedIndex].pockets + garmentArray[dropdown.selectedIndex].holdPhone + garmentArray[dropdown.selectedIndex].representation) / 3 * 100);
    // hoverScore.innerHTML = hoverNum;
    
// }




