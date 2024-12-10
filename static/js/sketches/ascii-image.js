const theSketch = (sketch) => {
  let img;
  p5asciify.instance(sketch);

  sketch.preload = () => {
    img = sketch.loadImage('/static/images/clown.jpeg');
  }

  sketch.setup = () => {
    sketch.createCanvas(800, 800, sketch.WEBGL);

    sketch.setAsciiOptions({
      // These are the default options, you can change them as needed in preload(), setup() or draw()
      common: {
        fontSize: 8,
      },
      ascii: {
        renderMode: "brightness",
      },
      edge: {
        enabled: true, // false by default
        characters: "$@B%8&WM",
        characterColorMode: 0, // 0: sampled (default), 1: fixed
        invertMode: false,
        sobelThreshold: 0.01, // Tune the threshold values to adjust the edge detection
        sampleThreshold: 16,
      },
    });
  }

  sketch.draw = () => {
    sketch.image(img, -400, -400);
  }
}

export default theSketch;