let sketchInstance;
let sketchConfigs = [
    {
        title: 'Ascii Rougelite',
        path: './sketches/crawling-rougelike.js',
        displayTime: 10000,
        options: {}
    },
    {
        title: 'Raining Clown',
        path: './sketches/image.js',
        displayTime: 10000,
        options: {}
    },
    // {
    //     title: 'Ascii Clown',
    //     path: './sketches/ascii-image.js',
    //     displayTime: 10000,
    //     options: {
    //         needsAsciify: true,
    //     }
    // },
];

function loadSketch(sketchPath, needsAsciify) {
    // Unload current sketch if it exists
    if (sketchInstance) {
        sketchInstance.remove(); // Remove the current p5 instance
    }

    // Import asciify script from CDN if a sketch requires it
    if (needsAsciify) {
        addAsciifyScript();
    } else {
        removeAsciifyScript();
    }

    // Dynamically import the sketch
    import(sketchPath).then((module) => {
        const Sketch = module.default;
        sketchInstance = new p5(Sketch, 'main-canvas');
    }).catch(err => console.error("Failed to load sketch:", err));
}

function addAsciifyScript() {
    const script = document.createElement('script');
    script.id = "asciify-script";
    script.src = "https://cdn.jsdelivr.net/npm/p5.asciify@0.6.0/dist/p5.asciify.min.js";
    document.body.appendChild(script);
}

function removeAsciifyScript() {
    const asciifyScript = document.getElementById('asciify-script');
    if (asciifyScript) {
        document.body.removeChild(asciifyScript);
    }
}

function delay(sketchDuration, sketchTitle) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Sketch ${sketchTitle} ended`);
        }, sketchDuration);
    })
}

async function loopSketches() {
    while (true) {
        for (let sketch of sketchConfigs) {
            loadSketch(sketch.path, sketch.options.needsAsciify ?? false);
            await delay(sketch.displayTime, sketch.title);
        }
    }
}

// Main infinite loop
loopSketches();