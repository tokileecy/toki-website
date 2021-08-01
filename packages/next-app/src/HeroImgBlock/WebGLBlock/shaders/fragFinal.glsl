uniform sampler2D tDiffuse;
uniform sampler2D tNoise;
uniform float iTime;
varying vec2 vUv;
#define EdgeColor vec4(0.5, 0.7, 0.6, 1.0)
#define BackgroundColor vec4(0, 0, 0, 1)
#define Period 60.0
#define ShakeRange 0.003
#define ShakeRange1 0.007
#ifdef GL_OES_standard_derivatives
  #extension GL_OES_standard_derivatives : enable
#endif

// TODO add outer, inner shadow
void main()
{
  float time = iTime * 6.0;
  vec2 uv = vUv;

  vec2 uvs[5];
  uvs[0] = uv + vec2(ShakeRange * sin(Period * uv.y + 5.0 * time) , ShakeRange * sin(Period * uv.x + 5.0 * time));
  uvs[1] = uv + vec2(ShakeRange * sin(Period * uv.y + 1.047 * time) , ShakeRange * sin(Period * uv.x + 3.142 * time));
  uvs[2] = uv + vec2(ShakeRange * sin(Period * uv.y - 3.0 * time) , ShakeRange * sin(Period * uv.x + 3.66 * time));
  uvs[3] = uv + vec2(ShakeRange1 * sin(Period * uv.y + 2.094 * time) , ShakeRange1 * sin(Period * uv.x - 1.571 * time));
  uvs[4] = uv + vec2(ShakeRange1 * sin(Period * uv.y - 0.555 * time) , ShakeRange1 * sin(Period * uv.x - 2.1111 * time));
  
  float edge = texture2D(tDiffuse, uvs[0]).r *
    texture2D(tDiffuse, uvs[1]).r * 
    texture2D(tDiffuse, uvs[2]).r *
    texture2D(tDiffuse, uvs[3]).r *
    texture2D(tDiffuse, uvs[4]).r;

  float diffuse = texture2D(tDiffuse, uv).g;
  float w = fwidth(diffuse) * 0.2;
  vec4 mCol = mix(BackgroundColor * 0.5, BackgroundColor, mix(0.0, 1.0, smoothstep(-w, w, diffuse - 0.3)));
  gl_FragColor = mix(EdgeColor, mCol, edge);
}