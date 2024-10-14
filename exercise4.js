
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    var hexagon_vertices = new Float32Array([
       -0.3,0.6,-0.4,0.8,-0.6,0.8,-0.7,0.6,-0.6,0.4,-0.4,0.4,-0.3,0.6
    ]);


    var triangle_vertices = new Float32Array([
       0.3,0.4,
       0.7,0.4,
       0.5,0.8
    ]);
    var colors = new Float32Array([
         // 빨간색
        0.0, 1.0, 0.0, 1.0,  // 초록색
        0.0, 0.0, 1.0, 1.0,
        1.0, 0.0, 0.0, 1.0
    ]);

    var stripvectices = new Float32Array([
        -0.5,  0.2,  // v0
        -0.4,  0.0,  // v1
        -0.3,  0.2,  // v2
        -0.2,  0.0,  // v3
        -0.1,  0.2,  // v4
         0.0,  0.0,  // v5
         0.1,  0.2,  // v6
         0.2,  0.0,  // v7
         0.3,  0.2,  // v8
         0.4,  0.0,  // v9
         0.5,  0.2,  // v10
    
        // Second strip
        -0.5, -0.3,  // v11
        -0.4, -0.5,  // v12
        -0.3, -0.3,  // v13
        -0.2, -0.5,  // v14
        -0.1, -0.3,  // v15
         0.0, -0.5,  // v16
         0.1, -0.3,  // v17
         0.2, -0.5,  // v18
         0.3, -0.3,  // v19
         0.4, -0.5,  // v20
         0.5, -0.3   // v21
    ]);
    

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    

    var vPosition = gl.getAttribLocation(program,"vPosition");
    var vColor = gl.getAttribLocation(program,"vColor");
    // Load the data into the GPU
    
    var hexagonbufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, hexagonbufferId );
    gl.bufferData( gl.ARRAY_BUFFER,hexagon_vertices, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    gl.bindBuffer( gl.ARRAY_BUFFER, hexagonbufferId );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.drawArrays( gl.LINE_STRIP, 0, 7);

    var trianglebufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, trianglebufferId );
    gl.bufferData( gl.ARRAY_BUFFER,triangle_vertices, gl.STATIC_DRAW );


    var trianglecolorbufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, trianglecolorbufferId );
    gl.bufferData( gl.ARRAY_BUFFER,colors, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    gl.bindBuffer( gl.ARRAY_BUFFER, trianglebufferId );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, trianglecolorbufferId );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    gl.drawArrays( gl.TRIANGLES, 0, 3);

    var stripbufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, stripbufferId );
    gl.bufferData( gl.ARRAY_BUFFER,stripvectices, gl.STATIC_DRAW );

    gl.bindBuffer( gl.ARRAY_BUFFER, stripbufferId );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // Disable the vertex attribute array for the vertexColorAttribute
    // and use a constant color again.
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 1.0, 1.0, 0.0, 1.0);  // Set constant color to yellow

    // Draw the triangle strip filled with yellow
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 11);

    // Draw the triangle strip with a line in black
    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 1.0);  // Set constant color to black
    gl.drawArrays(gl.LINE_STRIP, 0, 11);

    // Draw another triangle strip
    gl.drawArrays(gl.LINE_STRIP, 11, 11);

};
