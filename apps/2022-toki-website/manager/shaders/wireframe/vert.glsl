#include <fog_pars_vertex> 
uniform float zScale;
uniform float pScale;

void main() {     
  float signX = position.x / abs(position.x);
  // vec4 mvPosition = modelViewMatrix * vec4( signX * (pow( 1.5 - abs(position.x), 1.6) - 0.5) * pScale, position.y/ abs(position.y) *  pow(position.y, 1.0) * pScale, position.z * zScale, 1.0 );
  vec4 mvPosition = modelViewMatrix * vec4( position.xy * pScale, position.z * zScale, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}