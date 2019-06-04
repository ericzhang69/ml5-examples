const s = (sketch) => {
    let bodypix;
    let video;
    let segmentation;
    let img;

    const options = {
        outputStride: 8, // 8, 16, or 32, default is 16
        segmentationThreshold: 0.3 // 0 - 1, defaults to 0.5
    }

    sketch.setup = function () {
        sketch.createCanvas(320, 240);

        // load up your video
        video = sketch.createCapture(sketch.VIDEO);
        video.size(sketch.width, sketch.height);
        // video.hide(); // Hide the video element, and just show the canvas
        bodypix = ml5.bodyPix(video, modelReady)
    }

    function modelReady() {
        console.log('ready!')
        bodypix.segment(gotResults, options)
    }

    function gotResults(err, result) {
        if (err) {
            console.log(err)
            return
        }
        // console.log(result);
        segmentation = result;

        sketch.background(0);
        sketch.image(video, 0, 0, sketch.width, sketch.height)
        sketch.image(segmentation.maskBackground, 0, 0, sketch.width, sketch.height)

        bodypix.segment(gotResults, options)
    }
}

let myp5 = new p5(s, document.getElementById('p5sketch'));