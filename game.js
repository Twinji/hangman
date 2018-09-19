var WIDTH = 1800, HEIGHT = 720;
var canvas, c, word, wordProgress, initChances = 10, chances, incorrectChars;
var wordList = [
    "HAPPY",
    "SMILE",
    "INTERESTING",
    "SENTENCE",
    "AUSTRALIA",
    "STAR WARS",
    "SOUTH AMERICA",
    "VISHNU GUNAPATHI",
    "HARRY POTTER",
    "CALCULUS",
    "DISHONOUR",
    "CREATIVITY",
    "DEVELOPER",
    "INFORMATION",
    "TECHNOLOGY",
    "NEW YORK CITY",
    "GEPPS CROSS",
    "ORLANDO",
    "UNIVERSAL STUDIOS",
    "JUPITER",
    "THE MILKY WAY",
    "PROXIMA CENTAURI",
    "JURASSIC PARK",
    "CALL OF DUTY",
    "FERRARI WORLD",
    "SINGAPORE",
    "GREAT BARRIER REEF",
    "TWINJI TECH",
    "GOLDEN GROVE",
    "MAJOR LEAGUE GAMING"
];

function main() {
    canvas = document.getElementById("canvas");
    c = canvas.getContext("2d");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    c.textAlign = "center";
    c.textBaseline = "bottom";
    c.lineCap = "round";
    init();
}

function init() {
    word = randomIndex(wordList);
    chances = initChances;
    incorrectChars = new Array();
    wordProgress = new Array();
    for (var i = 0; i < word.length; i++) {
        wordProgress[i] = " ";
    }
    console.log(word);
    render();
}

function processGuess() {
    var id = document.getElementById("guess");
    var letter = ((id.value).toString()).toUpperCase();
    var correctGuess = false;
    for (var i = 0; i < word.length; i++) {
        if (word.charAt(i) == " ") continue;
        if (letter == word.charAt(i)) {
            wordProgress[i] = letter;
            correctGuess = true;
        }
    }
    if (!correctGuess && letter != " " && letter.length != 0) {
        chances--;
        if (!searchArray(incorrectChars, letter)) {
            incorrectChars.push(letter);
        }
    }
    id.value = "";
    console.log(word);
    console.log(wordProgress.join(""));
    console.log("Chances: " + chances);
    render();
    if (wordProgress.join("") == word) {
        alert("You have found the word:\n" + word + "\nPress OK to start a new game.");
        location.reload();
    }
    if (chances <= 0) {
        alert("You lost! Better luck next time.\nThe word was:\n" + word + "\nPress OK to start a new game.");
        location.reload();
    }
}

function render() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.lineWidth = 5;
    c.strokeStyle = "white";
    c.fillStyle = "white";
    c.font = "40px Arial";
    var gap = 10;
    var spacing = 80;
    var initX = (canvas.width/2) - ((spacing * word.length)/2) + gap/2;
    var o;
    for (var i = 0; i < word.length; i++) {
        o = {
            x: initX + i * spacing,
            y: 100
        };
        if (word.charAt(i) != " ") {
            c.beginPath();
            c.moveTo(o.x, o.y);
            c.lineTo(o.x + spacing-gap, o.y);
            c.stroke();
            c.closePath();
            c.fillText(wordProgress[i], o.x + (spacing-gap)/2, o.y);
        }
    }
    c.font = "25px Arial";
    c.fillText("Guesses left: " + chances, canvas.width/2, canvas.height-70);
    c.font = "15px Arial";
    c.fillText("Incorrect characters:", canvas.width/2, canvas.height-40);
    c.fillText(incorrectChars.join(", "), canvas.width/2, canvas.height-20);
    o = {
        x: canvas.width/2, 
        y: canvas.height/2 - 35
    };
    c.beginPath();
    switch (chances) {
        case 0:
            c.moveTo(o.x + 90, o.y + 90);
            c.lineTo(o.x + 50, o.y + 150);
        case 1:
            c.moveTo(o.x + 90, o.y + 90);
            c.lineTo(o.x + 130, o.y + 150);
        case 2:
            c.moveTo(o.x + 30, o.y + 20);
            c.lineTo(o.x + 150, o.y + 20);
        case 3:
            c.moveTo(o.x + 90, o.y);
            c.lineTo(o.x + 90, o.y + 90);
            c.stroke();
            c.closePath(); 
            c.beginPath();
        case 4:
            c.arc(o.x + 90, o.y - 40, 40, 0, 2 * Math.PI);
        case 5:
            c.moveTo(o.x + 90, o.y - 100);
            c.lineTo(o.x + 90, o.y - 80);  
        case 6:
            c.moveTo(o.x - 90, o.y - 100);
            c.lineTo(o.x - 120, o.y - 70);
        case 7:
            c.moveTo(o.x - 120, o.y - 100);
            c.lineTo(o.x + 90, o.y - 100);    
        case 8:
            c.moveTo(o.x - 120, o.y + 200);
            c.lineTo(o.x - 120, o.y - 100);
        case 9:
            c.moveTo(o.x - 180, o.y + 200);
            c.lineTo(o.x - 60, o.y + 200);
        default: 
            break;

    }
    c.stroke();
    c.closePath();
}

function randomIndex(array) {
    var i = Math.ceil(Math.random() * array.length-1);
    return array[i];
}

function searchArray(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) {
            return true;
        }
    }
    return false;
}
