//
// This is just for testing some ES6 features and playing around
// Feel free to completely remove this code and use your own instead.
//

import $ from 'jquery';


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
    }

}


let canvasList = [];

let addCanvas = (listOrElement) => {
    console.log("addCanvas", listOrElement, typeof listOrElement);
    
    if (listOrElement instanceof Canvas) {
        canvasList.push(listOrElement);
        return listOrElement;
    }

    let internalList = [];

    let addNewCanvas = (e) => {
        let c = (e instanceof Canvas) ? e : new Canvas(e);
        canvasList.push(c);
        internalList.push(c);
        return c;
    };

    if (typeof listOrElement.length != "undefined") {

        if (listOrElement.length > 1) {

            let list = [].prototype.slice.apply(listOrElement, 1); // TODO(dkg): test this code

            list.forEach((e) => {
                if (element.tagName !== "CANVAS") {
                    throw "Element is not a Canvas!";
                }
                addNewCanvas(e);
            });

            return internalList.length === 1 ? internalList[0] : internalList;

        } else {

            return addNewCanvas(listOrElement instanceof $ ? listOrElement.get(0) : listOrElement[0]);

        }

    } else if (typeof listOrElement.tagName != "undefined" && listOrElement.tagName === "CANVAS") {

        return addNewCanvas(listOrElement);

    } else {

        throw "Element is not a Canvas or an array of Canvas elements";

    }
};

let resizeCanvas = () => {
    // console.log("resizeCanvas");
    canvasList.forEach((c) => {
        c.resize();
    });
};

let drawCanvas = () => {
    // console.log("drawCanvas");
    canvasList.forEach((c) => {
        c.draw();
    });
};

let initCanvasSystem = () => {
    let drawLoop = () => {
        drawCanvas();
        requestAnimationFrame(drawLoop);
    };
    requestAnimationFrame(drawLoop);
};


export { initCanvasSystem, drawCanvas, addCanvas, resizeCanvas, Canvas };
