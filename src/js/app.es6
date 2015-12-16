//
// This is just for testing some ES6 features and playing around
// Feel free to completely remove this code and use your own instead.
//

import 'babel-polyfill';
import $ from 'jquery';
import { startCanvasRedrawLoop, initCanvas, resizeCanvas, Canvas } from './app/canvas.es6';

// Just for testing some ES6 features - remove if you don't need them.
function* anotherGenerator(i) {
    yield i + 1;
    yield i + 2;
    yield i + 3;
}

function* generator(i){
    yield i;
    yield* anotherGenerator(i);
    yield i + 10;
}

let gen = generator(10);

$(() => {
    console.log("Startup running ...");

    console.log(gen.next().value); // 10
    console.log(gen.next().value); // 11
    console.log(gen.next().value); // 12
    console.log(gen.next().value); // 13
    console.log(gen.next().value); // 20

    initCanvas($("#screen"));
    resizeCanvas();

    $(window)
        .on("resize", resizeCanvas)
        .on("orientationchange", resizeCanvas);

    startCanvasRedrawLoop();

    console.log("Startup done.");
});
