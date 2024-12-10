let theSketch = (sketch) => {
    let maxWidth = 800;
    let maxHeight = 800;

    let fontSize = 8;

    let font;
    let density = '$@B%8&WM#*;:,"^`. ';

    let backgroundColor = [0, 0, 0];

    let densityChars1 = [];
    let densityChars2 = [];

    let changeIndex = 0;

    sketch.preload = () => {
        font = sketch.loadFont('/static/fonts/Inconsolata.otf');
    }

    sketch.setup = () => {
        sketch.createCanvas(maxWidth, maxHeight);

        sketch.noStroke();
        sketch.textSize(fontSize);
    
        densityChars1 = createDensityBoard();
        densityChars2 = createDensityBoard();
    }

    sketch.draw = () => {
        sketch.background(backgroundColor);
        for (let j = 0; j < changeIndex; j++) {
            let currChar = densityChars2[j];
            currChar.display();
        }
    
        for (let i = changeIndex; i < densityChars1.length; i++) {
            let currChar = densityChars1[i];
            currChar.display();
        }
    
        if (changeIndex >= densityChars2.length) {
            changeIndex = 0;
            densityChars1 = densityChars2;
            densityChars2 = createDensityBoard();
        }
    
        changeIndex += 1;
    }

    function createDensityBoard(color = [sketch.random(0, 255), sketch.random(0, 255), sketch.random(0, 255)]) {
        const board = [];
        // Makes each board different than the last
        let offset = sketch.random(100, 1000);
        for (let y = 8; y < maxHeight + 8; y += fontSize){
            for (let x = 0; x < maxWidth; x += fontSize) {
                let grayColor = sketch.noise((x + offset) * 0.01, (y + offset) * 0.01) * 255;
                let charIndex = sketch.int(sketch.map(grayColor, 0, 255, 0, density.length));
                board.push(new DensityChar(density[charIndex], x, y, color));
            }
        }
        return board;
    }
    
    class DensityChar {
        constructor(char, x, y, color) {
            this.char = char;
            this.x = x;
            this.y = y;
            this.color = color;
        }
    
        display() {
            sketch.fill(this.color);
            sketch.text(this.char, this.x, this.y);
        }
    }
}

export default theSketch;
