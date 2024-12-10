const theSketch = (sketch) => {
    let img;
    let font;

    let sentences = [
        'reese is testing testing testing testing testing testingbut he loves to code code code code reese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code code',
        'does it look super different if i have different sentecnes wooohooo',
        'reese is testing testing testing testing testing testingbut he loves to code code code code reese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code code',
        'testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code code',
        'reese is testing testing testing testing testing testingbut he loves to code code code code reese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code code',
        'what if one is short',
        'reese is testing testing testing testing testing testingbut he loves to code code code code reese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code code',
        'reese is testing testing testing testing testing testingbut he loves to code code code code reese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code code',
        'reese is testing testing testing testing testing testingbut he loves to code code code code reese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code codereese is testing testing testing testing testing testingbut he loves to code code code code',
    ];
    let fallingLetters = [];

    let maxWidth = 800;
    let maxHeight = 800;

    let lastSentenceIndex = -1;
    let sentenceIndex = 0;

    sketch.preload = () => {
        img = sketch.loadImage('/static/images/clown.jpeg');
        font = sketch.loadFont('/static/fonts/Inconsolata.otf');
    }

    sketch.setup = () => {
        sketch.createCanvas(maxWidth, maxHeight);
    
        sketch.background(50);
    
        sketch.textFont(font);
        sketch.textSize(16);
    }

    sketch.draw = () => {
        sketch.fill(0, 0, 255);
        sketch.image(img, 0, 0);
    
        if (lastSentenceIndex < sentenceIndex && sentenceIndex < sentences.length) {
            fallingLetters = createFallingLettersFromSentence(sentences[sentenceIndex]);
            lastSentenceIndex += 1;
        }
    
        for (let i = 0; i < fallingLetters.length; i++){
            let fallingLetter = fallingLetters[i];
            fallingLetter.update();
            fallingLetter.display();
    
            if (fallingLetter.offScreen) {
                fallingLetters.splice(i, 1);
            }
        }
    
        if (fallingLetters.length === 0) {
            sentenceIndex += 1;
        }
    
    }

    function createFallingLettersFromSentence(sentence) {
        let fallingLetterArray = [];
    
        for (let i = 0; i < sentence.length; i++) {
            let letter = sentence[i];
            fallingLetterArray.push(new FallingLetter(letter, i));
        }
    
        return fallingLetterArray;
    }
    
    class FallingLetter {
        constructor(letter, index) {
            this.index = index;
            this.letter = letter;
            this.x = sketch.random(0, maxWidth);
            this.y = sketch.random(-1000, 0);
            this.offScreen = false;
            this.speed = 1;
            this.accel = 0.1;
            this.size = 0;
        }
    
        update() {
            this.y = this.y + this.speed;
            this.speed += this.accel;
    
            if (this.y >= maxWidth){
                this.offScreen = true;
            }
        }
    
        display() {
            sketch.text(this.letter, this.x, this.y);
        }
    }

}

export default theSketch;