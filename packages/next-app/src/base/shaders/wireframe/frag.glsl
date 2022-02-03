uniform float alpha;
uniform vec3 color;
#include <fog_pars_fragment>
void main() {
  gl_FragColor = vec4(color, alpha);
  #include <fog_fragment>
}