
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    var vertices = new Float32Array([
        0, 0.5,    // 첫 번째 점
        -0.5, -0.5, // 두 번째 점   
        0.5, -0.5   // 세 번째 점
    ]);

    var colors = new Float32Array([
         // 빨간색
        0.0, 1.0, 0.0, 1.0,  // 초록색
        0.0, 0.0, 1.0, 1.0,
        1.0, 0.0, 0.0, 1.0
    ]);
    

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var vertex_p_bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertex_p_bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var vertex_c_bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertex_c_bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,colors, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 3   );
    
    
};


function render() {
   
}
