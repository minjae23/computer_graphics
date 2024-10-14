var gl;
var theta = 0.0;
var thetaLoc;
var delay = 100;
var direction = true;
var intervalId;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertices = [vec2(0, 1), vec2(-1, 0), vec2(1, 0), vec2(0, -1)];

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation(program, "theta");

    document.getElementById("Direction").onclick = function() {
        direction = !direction;
    };

    document.getElementById("Controls").onclick = function(event) {
        switch (event.target.index) {
            case 0:
                direction = !direction;
                break;
            case 1:
                delay /= 2.0;
                clearInterval(intervalId);
                intervalId = setInterval(render, delay);
                break;
            case 2:
                delay *= 2.0;
                clearInterval(intervalId);
                intervalId = setInterval(render, delay);
                break;
        }
    };

    document.getElementById("slider").onchange = function(event) { console.log(event.srcElement.value);
        delay = event.srcElement.value; clearInterval(intervalId); intervalId = setInterval(render,delay);
        };


        
    window.addEventListener("keydown", function(event) {
        c2(event);
    });

    intervalId = setInterval(render, delay);
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    theta += (direction ? 0.1 : -0.1);
    gl.uniform1f(thetaLoc, theta);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function c2(event) {
    switch (event.keyCode) {
        case 49: // Key 1
            direction = !direction;
            break;
        case 50: // Key 2
            delay /= 2.0;
            clearInterval(intervalId);
            intervalId = setInterval(render, delay);
            break;
        case 51: // Key 3
            delay *= 2.0;
            clearInterval(intervalId);
            intervalId = setInterval(render, delay);
            break;
    }
}
