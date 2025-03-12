let tilesAmount = 36;
class tile {
    constructor(index, color) {
        this.index = index;
        this.color = color;
    }
}

const tiles = [];
var colorInLoop = true;
for (let i = 0; i < tilesAmount; i++) {


    const name = new tile(i, colorInLoop);
    tiles.push(name)
    colorInLoop = !colorInLoop;

}
const center = [window.innerWidth / 2, window.innerHeight / 2];
var angle = 0;
const radius = 300;
console.log(center);
for (let i = 0; i < tiles.length; i++) {
    var newTile = document.createElement("div");
    newTile.id = i;
    document.body.appendChild(newTile);
    document.getElementById(i).style.height = "30px";
    document.getElementById(i).style.width = "30px";
    console.log(tiles[i].color)
    if (tiles[i].color) {
        document.getElementById(i).style.background = "red";
    } else {
        document.getElementById(i).style.background = "black";
    }

    document.getElementById(i).style.position = "absolute";

    document.getElementById(i).style.top = center[0] + Math.sin(angle) * radius + "px";
    document.getElementById(i).style.left = center[0] + Math.cos(angle) * radius + "px";
    console.log((Math.PI / 4 - angle));
    document.getElementById(i).style.transform = "rotate(" + (-Math.PI / 2 + angle) + "rad)"
    angle += Math.PI / (tilesAmount / 2);
    const number = document.createElement("h2");
    number.innerHTML = i;
    number.id = "number" + i;
    document.getElementById(i).appendChild(number)
    console.log(document.getElementById("number" + i))
    document.getElementById("number" + i).style.transform = "rotate(180deg)";

}
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
async function roll(tiles, tilesAmount, betNumber, betAmount) {
    correctTile = Math.floor(Math.random() * tilesAmount)
    let startingSpeed = 10;
    for (; startingSpeed <= 10000; startingSpeed += 100) {
        console.log(1)
        for (let i = 0; i < tiles.length; i++) {
            startingSpeed += 10;
            console.log(1)
            select(i);
            await sleep(startingSpeed);
            deSelect(i)
        }
    }

};

function select(id) {
    document.getElementById(id).style.background = "white";
}
function deSelect(id) {
    document.getElementById(id).style.background = "white";
    if (tiles[id].color) {
        document.getElementById(id).style.background = "red";
    } else {
        document.getElementById(id).style.background = "black";
    }
}

roll(tiles, 36, 1, 1)