uniform sampler2D tDiffuse;
uniform sampler2D tShadow;
uniform vec2 iResolution;
varying vec2 vUv;

#define AcceptNormalRange (float(10.0 / iResolution.y))
#define AcceptDepthRange (float(10.0 / iResolution.y))

float checkIsOverlap(vec4 sample1, vec4 sample2)
{
  vec2 diffNormal = abs(sample1.xy - sample2.xy);
  float diffDepth = abs(sample1.z - sample2.z);

  bool isSameNormal = (diffNormal.x + diffNormal.y) < AcceptNormalRange;
  bool isSameDepth = diffDepth < AcceptDepthRange;
  bool isOverlap = isSameNormal && isSameDepth;
  return isOverlap ? 1.0 : 0.0;
}

void main()
{
  float width = 0.05;
  vec4 sample0 = texture2D(tDiffuse, vUv);
  vec4 sample1 = texture2D(tDiffuse, vUv + (vec2(width, width) / iResolution.xy));
  vec4 sample2 = texture2D(tDiffuse, vUv + (vec2(-width, -width) / iResolution.xy));
  vec4 sample3 = texture2D(tDiffuse, vUv + (vec2(-width, width) / iResolution.xy));
  vec4 sample4 = texture2D(tDiffuse, vUv + (vec2(width, -width) / iResolution.xy));
  float edge = checkIsOverlap(sample1, sample2) * checkIsOverlap(sample3, sample4);
  gl_FragColor = vec4(edge, sample0.w, 1.0, 1.0);
}