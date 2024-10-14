var gl;
var points;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Set resolution uniform
    var vResolution = gl.getUniformLocation(program, "vResolution");
    gl.uniform2f(vResolution, gl.canvas.width, gl.canvas.height);

    // Set up color uniform
    var uColor = gl.getUniformLocation(program, "uColor");

    // Buffer for vertex positions
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // Render rectangles
    render(bufferId, uColor);
};

function render(bufferId, uColor) {
    gl.clear(gl.COLOR_BUFFER_BIT);

    for (var i = 0; i < 50; i++) {
        var vertices = setRectangle();

        var color = [Math.random(), Math.random(), Math.random(), 1.0];
        gl.uniform4fv(uColor, color);

        gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
}


function randomInt(range) {
    return Math.floor(Math.random() * range);
}


function setRectangle() {
   
    var x1 = randomInt(gl.canvas.width);  
    var y1 = randomInt(gl.canvas.height);

    
    var width = randomInt(gl.canvas.width / 4);
    var height = randomInt(gl.canvas.height / 4);

 
    var x2 = x1 + width;
    var y2 = y1;
    var x3 = x1;
    var y3 = y1 - height;
    var x4 = x2;
    var y4 = y3;

   
    return [
      
        x1, y1,
        x2, y2,
        x3, y3,
        x3, y3,
        x2, y2,
        x4, y4
    ];
}
