const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

// Ajustar el tamaño del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Cargar la imagen
const textureImage = new Image();
textureImage.src = '/TBOI/images/intro/logo.png'; // Cambia esta línea con la ruta de tu imagen
textureImage.onload = () => {
    render();
};

// Vertex Shader
const vertexShaderSource = `
    attribute vec2 a_position;
    varying vec2 v_position;
    void main() {
        v_position = a_position;
        gl_Position = vec4(a_position, 0, 1);
    }
`;

// Fragment Shader
const fragmentShaderSource = `
    precision mediump float;
    varying vec2 v_position;
    uniform float u_time;
    uniform sampler2D u_texture;

    void main() {
        // Distorsión de calor
        float frequency = 10.0;
        float amplitude = 0.03;

        // Calcular la distorsión en base a una función seno
        float distortion = sin(v_position.y * frequency + u_time) * amplitude;
        vec2 distortedPosition = vec2(v_position.x + distortion, v_position.y);

        // Obtener el color de la textura
        vec4 color = texture2D(u_texture, distortedPosition);
        gl_FragColor = color;
    }
`;

// Crear un shader
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
    }
    console.error('Error al compilar el shader:', gl.getShaderInfoLog(shader));
}

// Crear el programa de shader
function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    return program;
}

// Crear y compilar los shaders
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

// Ubicación de los atributos y uniformes
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
const textureUniformLocation = gl.getUniformLocation(program, 'u_texture');

// Crear un buffer para la posición
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setRectangle(0, 0, canvas.width, canvas.height);

// Dibuja el rectángulo
function setRectangle(x, y, width, height) {
    const vertices = new Float32Array([
        x, y,
        x + width, y,
        x, y + height,
        x + width, y + height,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
}

// Crear la textura
function createTexture() {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
    // Establecer los parámetros de la textura
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    
    // Cargar la textura
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage);
    return texture;
}

// Función de animación
function render(time) {
    time *= 0.001; // Convertir a segundos

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    
    // Activa el atributo de posición
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Crear la textura y pasarla al shader
    const texture = createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(textureUniformLocation, 0);

    // Pasar el tiempo al shader
    gl.uniform1f(timeUniformLocation, time);

    // Dibujar el rectángulo
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(render);
}
