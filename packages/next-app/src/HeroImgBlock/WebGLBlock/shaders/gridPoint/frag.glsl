uniform vec3 color;
uniform sampler2D pointTexture;
uniform float alpha;

void main() {
  vec4 color = vec4( color, alpha ) * texture2D( pointTexture, gl_PointCoord );
  gl_FragColor = color;
}