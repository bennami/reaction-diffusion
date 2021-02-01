var grid;
var next;

var dA = 1;
var dB = 0.5;
var feed = 0.055;
var k = 0.062;

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}



function setup() {
  createCanvas(500 , 500);
  pixelDensity(1);
  grid = [];
  next = [];
  for (var x = 0; x < width; x++) {
    grid[x] = [];
    next[x] = [];
    for (var y = 0; y < height; y++) {
      grid[x][y] = {
        a: 1,
        b: 0
      };
      next[x][y] = {
        a: 1,
        b: 0
      };
    }
  }

//   for (var i = 100; i < 140; i++) {
//     for (var j = 100; j < 140; j++) {
//       grid[i][j].b = 1;
//     }
//   }
   
     
//     for (var i = 1; i < width -1; i +=40) {
//         for (var j = 1; j < height - 1; j += 40) {

//       //grid[Math.floor(Math.random() * (400 - 2) + 2)][Math.floor(Math.random() * (200 - 2) + 2)].b = 1;
//       //grid[Math.floor(Math.random() * (400 - 2) + 2)][Math.floor(Math.random() * (200 - 2) + 2)].b = 1;
//       //grid[Math.floor(Math.random() * (400 - 2) + 2)][Math.floor(Math.random() * (200 - 2) + 2)].b = 1;
      
      
//             grid[i][j].b = 1;
//             grid[i + 1][j + 1].b = 1;
//             grid[i + 2][j + 2].b = 1;
//             grid[i + 3][j + 3].b = 1;
//             grid[i + 4][j + 4].b = 1;
//             grid[i + 5][j + 5].b = 1;
//             grid[i +6][j+6].b = 1;
//             grid[i +7][j+7].b = 1;
//             grid[i +8][j+8].b = 1;
//             grid[i +9][j+9].b = 1;
//             grid[i +10][j+10].b = 1;
//             grid[i +11][j+11].b = 1;

//           //console.log(Math.floor(Math.random() * (200 - 110) + 110))  
//     }
//   }
    
 
}

function draw() {
    background(51);
    
    // i = 0 j= 1,2,3,4,5,6,...
    // i = 1 j = 1,2,3,4,5,6,...


    // //filled in square
    // if (mouseIsPressed) {
    //     for (var i = 0; i < 50; i++){
    //         for (var j = 0; j < 50; j++){
    //             grid[mouseX +i][mouseY+j].b = 1;
    //         }
    //     }

    // }


    //lines , empty square
    if (mouseIsPressed) {
        for (var i = 0; i <= 50; i++){
            grid[mouseX +i][mouseY].b = 1;  
            if ( i == 0 || i % 50 == 0){
                for (var j = 0; j <= 50; j++){
                      grid[mouseX +i][mouseY+j].b = 1;   
                }
               
            }
            grid[mouseX +i][mouseY+50].b = 1; 
        }

         for (var i = 0; i <= 50; i++){
            if ( i == 0 || i % 50 == 0){
                for (var j = 0; j <= 50; j++){
                      grid[mouseX +i][mouseY+j].b = 1;   
                }
               
            }
        }

    }

   

  for (var x = 1; x < width - 1; x++) {
    for (var y = 1; y < height - 1; y++) {
      var a = grid[x][y].a;
      var b = grid[x][y].b;
      next[x][y].a = a + dA * laplaceA(x, y) - a * b * b + feed * (1 - a);
      next[x][y].b = b + dB * laplaceB(x, y) + a * b * b - (k + feed) * b;

      next[x][y].a = constrain(next[x][y].a, 0, 1);
      next[x][y].b = constrain(next[x][y].b, 0, 1);
    }
  }

  loadPixels();
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var pix = (x + y * width) * 4;
      var a = next[x][y].a;
      var b = next[x][y].b;
        var c = floor((a - b) * 255);
        console.log(c)
      c = constrain(c, 0, 255);
      pixels[pix + 0] = c;
      pixels[pix + 1] = c;
      pixels[pix + 2] = c;
        pixels[pix + 3] = 255;
        console.log(pix, c, a,b)
    }
  }
  updatePixels();

  swap();
}

function laplaceA(x, y) {
  var sumA = 0;
  sumA += grid[x][y].a * -1;
  sumA += grid[x - 1][y].a * 0.2;
  sumA += grid[x + 1][y].a * 0.2;
  sumA += grid[x][y + 1].a * 0.2;
  sumA += grid[x][y - 1].a * 0.2;
  sumA += grid[x - 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y + 1].a * 0.05;
  sumA += grid[x - 1][y + 1].a * 0.05;
  return sumA;
}

function laplaceB(x, y) {
  var sumB = 0;
  sumB += grid[x][y].b * -1;
  sumB += grid[x - 1][y].b * 0.2;
  sumB += grid[x + 1][y].b * 0.2;
  sumB += grid[x][y + 1].b * 0.2;
  sumB += grid[x][y - 1].b * 0.2;
  sumB += grid[x - 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y + 1].b * 0.05;
  sumB += grid[x - 1][y + 1].b * 0.05;
  return sumB;
}

function swap() {
  var temp = grid;
  grid = next;
  next = temp;
}