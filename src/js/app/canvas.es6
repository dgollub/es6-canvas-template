//
// This is just for testing some ES6 features and playing around
// Feel free to completely remove this code and use your own instead.
//

import $ from 'jquery';


let initOwlImageElement = () => {
    let url = "/img/owl.png";
    let img = document.createElement("img");

    img.setAttribute('crossOrigin', 'anonymous');

    let drawLater = () => {
        let image = img;
        let [ w, h ] = [ image.naturalWidth || image.width , image.naturalHeight || image.height ];

        // somehow sometimes the image is not fully done loading yet and this.naturalWidth/width return undefined
        if (isNaN(w)) {
            setTimeout(drawLater, 16);
            return;
        }

        let canvas = document.createElement("canvas");
        
        canvas.width = w;
        canvas.height = h;

        let ctx = canvas.getContext("2d");

        ctx.width = w;
        ctx.height = h;
        
        ctx.drawImage(image, 0, 0);

        // var dataURL = canvas.toDataURL("image/png");
        // pictureOwlData = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        pictureOwlData = ctx.getImageData(0, 0, w, h);
    }

    img.onload = drawLater;

    img.src = url;

    return img;
};

let pictureOwlData = null; // not really needed
let pictureOwlImageElement = initOwlImageElement();


class Canvas {

    constructor(element) {
        // console.log("new canvas element", element, typeof element);

        let is$obj = element instanceof $;

        this.e = is$obj ? element.get(0) : element;
        this.$e = is$obj ? element : $(element);

        this.ctx = this.e.getContext("2d");
        this.name = this.$e.attr("name") || this.$e.attr("id");
    }

    toString() {
        return this.name || "neither id nor name set on canvas element";
    }

    resize() {
        console.log(`resizing canvas ${this.name}`);
        let [ sw, sh ] = [ $(window).width(), $(window).height() ];
        let padding = 20;

        this.ctx.width = sw - padding;
        this.ctx.height = sh - padding;
        this.e.width = this.ctx.width;
        this.e.height = this.ctx.height;
    }

    draw() {
        console.log(`drawing canvas ${this.name}`);
        
        this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
        this.ctx.fillColor = "green";
        this.ctx.fillRect(20, 20, 40, 40);

        if (pictureOwlImageElement !== null) {
            this.ctx.drawImage(pictureOwlImageElement, 0, 0, pictureOwlImageElement.naturalWidth, pictureOwlImageElement.naturalHeight, 20, 80, 50, 70);
        }
    }

}





let canvas = null;

let initCanvas = (element) => {
    canvas = new Canvas(element);
    return canvas;    
};

let resizeCanvas = () => {
    if (canvas !== null) {
        canvas.resize();
    }
};

let startCanvasRedrawLoop = () => {
    if (canvas === null) {
        console.warn("No canvas object. Please run 'initCanvas' first.");
        return;
    }
    let drawLoop = () => {
        canvas.draw();
        requestAnimationFrame(drawLoop);
    };
    requestAnimationFrame(drawLoop);
};


export { startCanvasRedrawLoop, initCanvas, resizeCanvas, Canvas };
