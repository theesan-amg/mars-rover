let prompt = require('prompt');
prompt.start();
let grid = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
];
// orientation du robot pour l'instant rover.direction = "N"
let rover = {
    direction: "N",
    x: 0,
    y: 0,
    travelLog: [],
};
// respresentation du rover
let positionRover = 'robot';
// tableau vide dans lequel on push les directions 
const historique = [];
prompt.get("entrer des instructions", function (err, res) {
    // function qui contiens un string du depacement complet example "NFEFSF" Nord forward Est forward Sud forward
    if(err) {
        console.log(err);
        return;
    }
    function piloteRover() {
        for (let i = 0; i < res["entrer des instructions"].length; i++) {
            switch (res["entrer des instructions"][i]) {
                case 'f':
                    moveForward();                    
                    break;
                case 'l':
                    turnLeft();                    
                    break;
                case 'r':
                    turnRight();                    
                    break;
                case '1':
                    diagonal(parseInt(res["entrer des instructions"][i]));
                    break;
                case '2':
                    diagonal(parseInt(res["entrer des instructions"][i]));                  
                    break;
                case '3':
                    diagonal(parseInt(res["entrer des instructions"][i]));                                     
                    break;
                case '4':
                    diagonal(parseInt(res["entrer des instructions"][i]));
                    break;
            }
        }
    };
    piloteRover(res["entrer des instructions"]);
    grid[rover.y][rover.x] = positionRover; 
    console.log(grid);
    console.log(historique);
});
// function qui permet de se deplacer en diagonal
function diagonal(num) {
    if(rover.x < 9 || rover.y < 9 || rover.x >= 1  || rover.y >= 1 ) {
        switch (parseInt(num)) {
            case 1:
                rover.direction = 'NE';
                rover.y--;
                rover.x++;
                historique.push(rover.direction);          
                break;
            case 2:
                rover.direction = 'NO';
                rover.y--;
                rover.x--;
                historique.push(rover.direction);
                break;
            case 3:
                rover.direction = 'SE';
                rover.y++;
                rover.x++  ;
                historique.push(rover.direction);
                break;
            case 4:
                rover.direction = 'SO';
                rover.y++;
                rover.x--;
                historique.push(rover.direction);
                break;
        }
    }
};
// function qui fera tourner à gauche le robot
function turnLeft() {
    rover.direction === 'N' ? rover.direction = 'O' :
        rover.direction === 'O' ? rover.direction = 'S' :
            rover.direction === 'S' ? rover.direction = 'E' :
                rover.direction = 'N';
    historique.push(rover.direction);
};
// function qui fera tourner à droite le robot
function turnRight() {
    rover.direction === 'N' ? rover.direction = 'E' :
        rover.direction === 'E' ? rover.direction = 'S' :
            rover.direction === 'S' ? rover.direction = 'O' :
            rover.direction === 'O' ? rover.direction = 'N':
            rover.direction = 'N';
    historique.push(rover.direction);
};
// function qui fera avancer le robot
function moveForward() {
    if (rover.direction === 'N' && rover.y > 0 && rover.x > 0)  {
        rover.y--;
        historique.push('F');
    }
    else if (rover.direction === 'E' && rover.x <= 8) {
        rover.x++;
        historique.push('F');
    }
    else if (rover.direction === 'S' && rover.y <= 8) {
        rover.y++;
        historique.push('F');
    }
    else if (rover.direction === 'O' && rover.x >= 1) {
        rover.x--;
        historique.push('F');
    }
    else if (rover.x === 9 || rover.y === 9) {
        console.log("j'ai atteint la limite");
        console.log(`abssice: ${rover.x}\nordonnée: ${rover.y}`);
    }
};
