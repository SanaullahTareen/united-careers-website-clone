import{I as e,p as t,t as n,y as r}from"./vendor-three-C1Qcwpnq.js";var i=`// Physical Wave Equation with Advection (Moving Water Frame)
// Simulates a stationary ship in flowing water

#include <common>

uniform vec2 uShipPos;        // Ship center in UV space (0..1)
uniform vec2 uShipSize;       // Ship hull size in UV space
uniform float uShipAngle;     // Heading angle
uniform float uViscosity;     // unused, we hardcode damping for stability
uniform float uWakeIntensity; 
uniform float uTime;
uniform float uDelta;
uniform float uShipSpeed;
uniform float uSmoothing;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 texel = 1.0 / resolution.xy;

    // Ship points DOWN on screen (+Z in world, -Y in UV space). Wake trails UP (-Z in world, +Y in UV space).
    // So water flows towards Positive Y.
    // To find the previous state of water currently at \`uv\`, we look UPSTREAM (Negative Y).
    // Note: uDelta is capped to prevent huge jumps on lag spikes
    float dt = min(uDelta, 0.033);
    // Scale advection speed down by a factor of 0.38 to make the physical wake drift backwards slower and more majestically
    float uvSpeed = (uShipSpeed / BOUNDS) * 0.38;
    vec2 sourceUv = uv - vec2(0.0, uvSpeed * dt);

    // Read previous advected state
    // R = height, G = velocity
    vec4 state = texture2D(heightmap, sourceUv);
    float h = state.r; 
    float v = state.g; 

    // Compute Laplacian
    float hL = texture2D(heightmap, sourceUv + vec2(-texel.x, 0.0)).r;
    float hR = texture2D(heightmap, sourceUv + vec2(texel.x, 0.0)).r;
    float hD = texture2D(heightmap, sourceUv + vec2(0.0, -texel.y)).r;
    float hU = texture2D(heightmap, sourceUv + vec2(0.0, texel.y)).r;
    
    // 2D discrete Laplacian
    float laplacian = (hL + hR + hD + hU) - 4.0 * h;

    // Wave equation integration
    // c^2 is wave speed squared. Must be < 0.5 for stability on a grid.
    float waveSpeedSq = 0.12; 
    v += laplacian * waveSpeedSq;
    
    // More aggressive damping to make the wake fade out smoothly before the boundary
    v *= 0.95;
    h *= 0.97; 

    h += v;

    // --- SHIP HULL INTERACTION (Continuous side wave) ---
    vec2 relPos = (uv - uShipPos) * BOUNDS;
    
    // Ship dimensions
    float hW = uShipSize.x * 0.5 * BOUNDS;
    float hL_hull = uShipSize.y * 0.5 * BOUNDS;

    // Evaluate ambient ocean wave height at this precise world coordinate
    vec2 worldPos = (uv - vec2(0.5)) * BOUNDS;
    float ambientHeight = snoise(vec3(worldPos.x * 0.01 * NOISE_SCALE, worldPos.y * 0.01 * NOISE_SCALE, uTime * 0.5)) * 0.15;

    // Calculate local hull half-width along the ship length to model tapered bow and stern
    if (relPos.y > -hL_hull && relPos.y < hL_hull) {
        float localHW = hW;
        if (relPos.y < -hL_hull * 0.4) {
            // Taper quickly at the bow (front)
            float t = (relPos.y - (-hL_hull)) / (hL_hull * 0.6); // 0 to 1
            localHW = hW * smoothstep(0.0, 1.0, t);
        } else if (relPos.y > hL_hull * 0.7) {
            // Taper at the stern (rear)
            float t = (hL_hull - relPos.y) / (hL_hull * 0.3); // 0 to 1
            localHW = hW * smoothstep(0.0, 1.0, t);
        }
        
        // Distance to the hull side (positive outside, negative inside)
        float distToSide = abs(relPos.x) - localHW;
        
        // Center the wave crest very close to the hull, and make it extremely narrow
        // This merges the left/right slopes of the crest so they appear as a single sharp wave reflection line
        float peakOffset = hW * 0.08;
        float distFromPeak = distToSide - peakOffset;
        // On the tablet's 128px simulation grid, a very narrow crest can sit
        // entirely between two texels (for example at wakeWidth 1.8) and
        // disappear. Keep the source at least a little wider than one texel.
        float influenceWidth = max(hW * 0.18, texel.x * BOUNDS * 0.55);
        
        if (abs(distFromPeak) < influenceWidth) {
            // Water piles up just outside the hull sides, creating a visible continuous crest
            float factor = smoothstep(influenceWidth, 0.0, abs(distFromPeak));
            
            // Normalize force strength by ship speed to prevent wave accumulation at low speeds
            float speedFactor = clamp(uShipSpeed / 35.0, 0.2, 1.5);
            
            // Bow pushes much harder than the sides
            float longitudinalWeight = smoothstep(-hL_hull, -hL_hull * 0.4, relPos.y); 
            float forceStrength = mix(0.12, 0.55, longitudinalWeight) * uWakeIntensity * speedFactor;
            
            // Slow-shifting spatial/temporal noise along the hull coordinates to create smooth organic wave shaping (no pulsing)
            float hullNoise = snoise(vec3(worldPos * 1.6, uTime * 0.4)) * 0.25 + 0.85;
            
            // Steady force (constant 1.0 instead of sine wave) to create a continuous, smooth, non-pulsing Kelvin wake
            float force = factor * forceStrength * (1.0 * hullNoise + max(0.0, ambientHeight) * 2.0);
            
            // Set height directly to create a positive wave crest clinging to the hull
            h = mix(h, force, 0.45);
            v = 0.0;
        }
    }
    
    // Propeller wash at Stern (Stern is at relPos.y > hL_hull * 0.8)
    vec2 propPos = vec2(0.0, hL_hull * 0.9);
    float distToProp = length(relPos - propPos);
    float propRadius = hW * 0.8;
    if (distToProp < propRadius) {
        // High-frequency jitter to simulate fine turbulent churning (lower temporal frequency to make it boil slower)
        float propNoise = snoise(vec3(relPos * 8.0, uTime * 1.2)) * 0.15 - 0.85;
        float washStrength = smoothstep(propRadius, propRadius * 0.2, distToProp);
        v += propNoise * uWakeIntensity * 0.05 * washStrength;
    }

    // Cross-shaped diffusion blur using the neighbour samples already fetched
    // for the wave equation. This softens narrow hull crests and suppresses
    // vertical grid/line artifacts without blurring the rest of the scene.
    float smoothedHeight = (h * 4.0 + hL + hR + hD + hU) / 8.0;
    h = mix(h, smoothedHeight, clamp(uSmoothing, 0.0, 1.0));

    // Boundary Fade
    float edge = 0.05;
    float fade = smoothstep(0.0, edge, uv.x) * smoothstep(0.0, edge, 1.0 - uv.x)
               * smoothstep(0.0, edge, uv.y) * smoothstep(0.0, edge, 1.0 - uv.y);
    
    h *= fade;
    v *= fade;

    // Safety clamp to prevent numerical explosion
    h = clamp(h, -2.0, 2.0);
    v = clamp(v, -2.0, 2.0);

    gl_FragColor = vec4(h, v, 0.0, 1.0);
}
`;function a(a,o={}){let{resolution:s=128,bounds:c=80,viscosity:l=.97,wakeIntensity:u=.5,shipWidth:d=.06,shipLength:f=.15,shipAngle:p=0,shipSpeed:m=3,kelvinAngle:h=.34,snoiseChunk:g=``,noiseScale:_=7.2,smoothing:v=.55}=o,y=new n(s,s,a);a.capabilities.isWebGL2===!1&&console.warn(`[WakeSimulation] WebGL2 not available, GPGPU may not work`);let b=y.createTexture(),x=b.image.data;for(let e=0;e<x.length;e++)x[e]=0;let S=`
#define BOUNDS ${c.toFixed(1)}
#define NOISE_SCALE ${_.toFixed(1)}
${g}
${i}`,C=y.addVariable(`heightmap`,S,b);y.setVariableDependencies(C,[C]);let w=C.material.uniforms;w.uShipPos={value:new e(.5,.5)},w.uShipSize={value:new e(d,f)},w.uShipAngle={value:p},w.uViscosity={value:l},w.uWakeIntensity={value:u},w.uTime={value:0},w.uDelta={value:.016},w.uShipSpeed={value:m},w.uKelvinAngle={value:h},w.uSmoothing={value:v},C.wrapS=t,C.wrapT=t,C.minFilter=r,C.magFilter=r;let T=y.init();T!==null&&console.error(`[WakeSimulation] GPUComputationRenderer init error:`,T),y.currentRenderTarget?.(C),C.renderTargets&&C.renderTargets.forEach(e=>{e.texture.minFilter=r,e.texture.magFilter=r});function E(e,t,n){let r=.5+e.x/c,i=.5+e.z/c;w.uShipPos.value.set(r,i),w.uTime.value=n,w.uDelta.value=t,y.compute()}function D(){return y.getCurrentRenderTarget(C).texture}function O(e){w.uViscosity.value=e}function k(e){w.uWakeIntensity.value=e}function A(e){w.uShipSpeed.value=e}function j(e,t){w.uShipSize.value.set(e,t)}function M(e){w.uShipAngle.value=e}function N(e){w.uSmoothing.value=e}function P(){y.dispose()}return{update:E,getHeightmapTexture:D,setViscosity:O,setWakeIntensity:k,setShipSpeed:A,setShipSize:j,setShipAngle:M,setSmoothing:N,dispose:P,uniforms:w,gpuCompute:y,resolution:s,bounds:c}}export{a as createWakeSimulation};