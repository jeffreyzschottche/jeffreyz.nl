// Finger taps for the typing scene. The other hand animations use generated poses.
const fragmentShader = `
precision highp float;
uniform sampler2D u_image;
uniform vec2 u_size;
uniform float u_time;
varying vec2 v_uv;
float region(vec2 p, vec2 center, vec2 radius) {
  return 1.0 - smoothstep(0.55, 1.0, length((p - center) / radius));
}
void main() {
  vec2 p = v_uv * u_size;
  vec2 q = p;
  float t = u_time;
  for (int i = 0; i < 5; i++) {
    float f = float(i);
    vec2 finger = vec2(158.0 + f * 10.0, 302.0 + f * 0.6);
    float tap = sin(t * (15.0 + f * 1.7) + f * 1.3) - sin(f * 1.3);
    q.y += tap * 1.25 * region(p, finger, vec2(7.5, 11.0));
  }
  q.y += sin(t * 5.0) * 0.55 * region(p, vec2(197.0, 302.0), vec2(34.0, 16.0));
  gl_FragColor = texture2D(u_image, clamp(q / u_size, vec2(0.0), vec2(1.0)));
}`

export function animateArtwork(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, preserveDrawingBuffer: true })
  if (!gl) return null
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight

  const shaders: WebGLShader[] = []
  function compile(type: number, source: string) {
    const shader = gl!.createShader(type)
    if (!shader) throw new Error('Could not initialize artwork shader')
    gl!.shaderSource(shader, source)
    gl!.compileShader(shader)
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
      gl!.deleteShader(shader)
      throw new Error('Could not compile artwork shader')
    }
    shaders.push(shader)
    return shader
  }

  const vertex = compile(gl.VERTEX_SHADER, `
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_uv = vec2((a_position.x + 1.0) * 0.5, (1.0 - a_position.y) * 0.5);
    }
  `)
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentShader)
  const program = gl.createProgram()!
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Could not link artwork shader')
  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'a_position')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
  gl.uniform1i(gl.getUniformLocation(program, 'u_image'), 0)
  gl.uniform2f(gl.getUniformLocation(program, 'u_size'), canvas.width, canvas.height)
  const time = gl.getUniformLocation(program, 'u_time')
  gl.viewport(0, 0, canvas.width, canvas.height)

  let frame = 0
  let previous = 0
  let lastDraw = 0
  let elapsed = 0
  let paused = true
  let disposed = false
  function draw() {
    gl!.uniform1f(time, elapsed)
    gl!.drawArrays(gl!.TRIANGLES, 0, 6)
  }
  function tick(now: number) {
    if (disposed || paused || document.hidden) return
    if (previous) elapsed += Math.min((now - previous) / 1000, 0.05)
    previous = now
    if (now - lastDraw >= 1000 / 30) { draw(); lastDraw = now }
    frame = requestAnimationFrame(tick)
  }
  function resume() {
    cancelAnimationFrame(frame)
    previous = 0
    if (!disposed && !paused && !document.hidden) frame = requestAnimationFrame(tick)
  }
  document.addEventListener('visibilitychange', resume)
  draw()
  return {
    setPaused(value: boolean) { paused = value; resume() },
    destroy() {
      disposed = true
      cancelAnimationFrame(frame)
      document.removeEventListener('visibilitychange', resume)
      gl.deleteTexture(texture)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      shaders.forEach(shader => gl.deleteShader(shader))
    },
  }
}
