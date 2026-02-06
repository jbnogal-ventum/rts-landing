uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uTime;
uniform int uPointCount;
uniform vec3 uColors[10];    // max 10 points
uniform vec3 uPositions[10]; // x, y, weight
varying vec2 vUv;

// 2D Smooth Noise
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float smoothNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  // Four corners
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  // Smooth interpolation
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Fractal Brownian Motion — layered octaves of smoothNoise
float fbm(vec2 p, int octaves, float lacunarity, float gain) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;

  for (int i = 0; i < 8; i++) {   // unrolled; guard with octaves
    if (i >= octaves) break;
    value += amplitude * smoothNoise(p * frequency);
    frequency *= lacunarity;
    amplitude *= gain;
  }
  return value;
}

float whiteNoise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float getIntensity(vec2 uv) {
  float radious = 0.005;
  float intensity = 0.0;

  for(int i = 0; i < uPointCount; i++) {
    float dist = distance(uv, uPositions[i].xy);
    float extraRadius = 0.0025 * sin(float(i) + uTime / 40.0);
    intensity += ((radious + extraRadius) / (dist * dist));

    float _fbmNoise = (fbm(uv * 40.0 + uTime / 0.5, 5, 2.0, 0.5) - 0.5) * 0.003;
    float _whiteNoise = (whiteNoise(uv * 20.0 + uTime / 20.0) - 0.5) * 0.01;
    intensity += (_fbmNoise + _whiteNoise);

  }

  intensity = min(1.0, intensity);

  // float m = smoothNoise(uv * 1000.0 + (floor(uTime * 5.0)));
  // float noiseAmountM = 0.15;
  // intensity -= m * noiseAmountM;

  // // Add noise variation: scale uv for frequency, multiply for amplitude
  // float n = smoothNoise(uv * 10.0 + uTime);  // animate with time
  // float noiseAmount = 0.12;
  // intensity += (n - 0.5) * noiseAmount;

  return 1.0 - smoothstep(1.0, 0.0, intensity);
}

vec3 getColor(vec2 uv) {
  vec3 sumWeighted = vec3(0.0);
  float sumWeights = 0.0;

  for(int i = 0; i < uPointCount; i++) {
    vec2 delta = uv - uPositions[i].xy;

    float _fbmNoise = (fbm(uv * 40.0 + uTime / 2.5, 5, 2.0, 0.5) - 0.5) * 0.015;
    float _whiteNoise = (whiteNoise(uv * 20.0 + floor(uTime * 20.0) / 40.0) - 0.5) * 0.07; 
    //float _whiteNoise = (smoothNoise(uv * 2000.0 + floor(uTime * 5000.0) / 40.0) - 0.5) * 0.07;
    float _mouseDist = max(distance(uMouse, uv), 0.000015);
    //float _mouseNoise = min((smoothNoise(uv * 40.0 + uTime / 1.0) - 0.5) * (0.0005 / (_mouseDist * _mouseDist)), 0.005);
    
    delta += (_fbmNoise + _whiteNoise);

    float distSq = dot(delta, delta);

    // Use inverse squared distance as weight (avoid division by zero)
    float weight = 1.0 / max(distSq, 0.000007);

    sumWeighted += uColors[i] * weight;
    sumWeights += weight;
  }

  return sumWeighted / sumWeights;
}

void main() {
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 mouse = uMouse * aspect;

  vec3 color = getColor(vUv);
  float intesity = getIntensity(vUv);
  gl_FragColor = vec4(color, intesity);
}
