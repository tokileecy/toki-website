attribute float size;
uniform float uSize;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_PointSize = uSize * size * ( 300.0 / -mvPosition.z );
  gl_Position = projectionMatrix * mvPosition;
}