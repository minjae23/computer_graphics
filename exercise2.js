
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    var vertices = new Float32Array([
        
        -0.5,0.5 , -0.5,-0.5 , 0.5 , 0.5  , 0.5,-0.5
    ]);
    

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    renderTree(program);
};


function renderTree(program) {
    // 1. 삼각형 1 (윗 나뭇잎)
    var verticesTop = new Float32Array([
        -0.1, 0.3, 
        0.1, 0.3,  
        0.0, 0.5
    ]);
    renderShape(verticesTop, program, 3);

    // 2. 삼각형 2 (왼쪽 나뭇잎)
    var verticesLeft = new Float32Array([
        -0.2, 0.1,  
        0.0, 0.1,   
        -0.1, 0.3
    ]);
    renderShape(verticesLeft, program, 3);

    // 3. 삼각형 3 (오른쪽 나뭇잎)
    var verticesRight = new Float32Array([
        0.0, 0.1,   
        0.2, 0.1,   
        0.1, 0.3
    ]);
    renderShape(verticesRight, program, 3);

    // 4. 사각형 (나무 줄기)
    var verticesTrunk = new Float32Array([
        -0.05, -0.2,  
        0.05, -0.2,  
        -0.05, 0.1,   
        0.05, 0.1   
    ]);
    renderShape(verticesTrunk, program, 4, gl.TRIANGLE_STRIP);
}

function renderShape(vertices, program, vertexCount, mode = gl.TRIANGLES) {
    // 버텍스 데이터를 GPU에 전달
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );

    // 버텍스 속성을 셰이더의 vPosition과 연결
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // 렌더링
    gl.clear(gl.COLOR_BUFFER_BIT);  // 화면을 매번 새로 지우지 않으려면 이 줄을 삭제하세요.
    gl.drawArrays( mode, 0, vertexCount );
}
