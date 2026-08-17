import{A as e,C as t,D as n,I as r,L as i,P as a,S as o,b as ee,c as s,g as c,k as l,m as u,n as d,o as f,s as p,w as m,y as h}from"./vendor-three-C1Qcwpnq.js";import{createWakeSimulation as te}from"./WakeSimulation-BLcb4zYs.js";var g=`
// Simplex 3D Noise
// by Ian McEwan, Stefan Gustavson (https://github.com/stegu/webgl-noise)
vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 1.0 / 7.0;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;function _(_){let v=window.matchMedia(`(pointer: coarse)`).matches&&window.innerWidth>767&&window.innerWidth<=1024?128:256,y=1.1,b=.4,x=1.7,S=2.2,C=-.4,w=.55,T=1.8,ne=1.2,E=6.28,D=.7,O=_.clientWidth||window.innerWidth,k=_.clientHeight||window.innerHeight,A=new p({antialias:!0,alpha:!1,powerPreference:`high-performance`});A.setSize(O,k),A.setPixelRatio(1),A.toneMapping=4,A.toneMappingExposure=1,A.outputColorSpace=l,A.setClearColor(136246,1),A.domElement.style.visibility=`hidden`,_.appendChild(A.domElement);let j=new e,M=new t(35,O/k,.1,5e3);M.position.set(0,80,10),M.up.set(0,1,0);let N=new d(M,A.domElement);N.enableRotate=!1,N.enablePan=!0,N.enableZoom=!0,N.minDistance=8,N.maxDistance=120;let P=new s(16777215,.9);j.add(P);let F=Math.sin(E)*26,I=Math.cos(E)*26,L=new c(16777215,3.9);L.position.set(F,53.3,I),j.add(L);let R=(e=>new URL(`/`,e).href)(import.meta.url),z=new a,B=e=>new Promise((t,n)=>{z.load(e,t,void 0,n)}),re=performance.now(),V=null,H=!0,U=!1,W=new IntersectionObserver(e=>{U=e[0].isIntersecting});W.observe(_);let G=null,K=null,q=null,J=null,Y=null,X=null,Z=null,Q=null;_.controls=_.controls||{},_.controls.fov===void 0&&(_.controls.fov=35),_.controls.zoomFactor===void 0&&(_.controls.zoomFactor=8),_.controls.wakeCenterY===void 0&&(_.controls.wakeCenterY=-.4),_.controls.wakeSpeed===void 0&&(_.controls.wakeSpeed=50),_.controls.wakeIntensity===void 0&&(_.controls.wakeIntensity=b),_.controls.wakeWidth===void 0&&(_.controls.wakeWidth=S),_.controls.height===void 0&&(_.controls.height=1.7),_.controls.overlayStrength===void 0&&(_.controls.overlayStrength=1),_.controls.overlayBrightness===void 0&&(_.controls.overlayBrightness=T),_.controls.overlaySaturation===void 0&&(_.controls.overlaySaturation=ne),_.controls.overlayScale===void 0&&(_.controls.overlayScale=1),_.controls.radialGlowStrength===void 0&&(_.controls.radialGlowStrength=1),_.controls.sunHighlightKnee===void 0&&(_.controls.sunHighlightKnee=.25),_.controls.sunHighlightCompression===void 0&&(_.controls.sunHighlightCompression=4),_.controls.wakeSmoothing===void 0&&(_.controls.wakeSmoothing=w),_.controls.debugWakeBounds===void 0&&(_.controls.debugWakeBounds=!1),_.controls.minDistance===void 0&&(_.controls.minDistance=8),_.controls.maxDistance===void 0&&(_.controls.maxDistance=94.3),Promise.all([B(`${R}images/ocean/water-normal.webp`),B(`${R}images/ocean/ocean-envmap.webp`),B(`${R}images/ocean/ocean-overlay.webp`)]).then(async([e,t,a])=>{if(!H){e.dispose(),t.dispose(),a.dispose();return}let s=new f(A);s.compileEquirectangularShader(),Y=t,t.colorSpace=l,t.mapping=303,A.initTexture(t),X=s.fromEquirectangular(t).texture,j.environment=X,j.environmentRotation.y=1.47,s.dispose(),J=e,J.wrapS=J.wrapT=n,J.generateMipmaps=!1,J.minFilter=h,J.magFilter=h,J.anisotropy=16,J.center.set(.5,.5),J.rotation=1.2,J.repeat.set(68,68),A.initTexture(J),Z=a,Z.colorSpace=l,Z.generateMipmaps=!1,Z.minFilter=h,Z.magFilter=h,Z.anisotropy=1,Z.needsUpdate=!0,A.initTexture(Z);let c=_.controls.wakeWidth??S;Q=te(A,{resolution:v,bounds:60,shipWidth:c/60,shipLength:11/60,shipSpeed:65,wakeIntensity:b,snoiseChunk:g,noiseScale:y,smoothing:w});let d={uTime:{value:0},uTopColor:{value:new u(`#193653`)},uBottomColor:{value:new u(`#021436`)},uHeightmap:{value:Q.getHeightmapTexture()},uHeightScale:{value:x},uWakeZoneSize:{value:60},uFoamThreshold:{value:.83},uFoamIntensity:{value:.2},uWashFoam:{value:.75},uWakeIntensity:{value:b},uEdgeFade:{value:.25},uFoamEnabled:{value:!0},uWakeOffsetY:{value:C},uOceanSpeed:{value:.9},uOceanOverlay:{value:Z},uResolution:{value:A.getDrawingBufferSize(new r)},uOverlayResolution:{value:new r(Z.image?.width||1920,Z.image?.height||1280)},uOverlayBrightness:{value:T},uOverlaySaturation:{value:ne},uOverlayScale:{value:_.controls.overlayScale},uOverlayStrength:{value:1},uRadialGlowStrength:{value:_.controls.radialGlowStrength},uSunHighlightKnee:{value:_.controls.sunHighlightKnee},uSunHighlightCompression:{value:_.controls.sunHighlightCompression},uDebugWakeBounds:{value:_.controls.debugWakeBounds}};K=new o({color:new u(`#204462`),roughness:0,metalness:.61,normalMap:J,normalScale:new r(D,D)}),K.onBeforeCompile=e=>{Object.assign(e.uniforms,d),e.vertexShader=`#define NOISE_SCALE ${y.toFixed(1)}\n`+e.vertexShader,e.fragmentShader=`#define NOISE_SCALE ${y.toFixed(1)}\n`+e.fragmentShader,e.vertexShader=`
        #define BOUNDS 60.0
        uniform float uTime;
        uniform sampler2D uHeightmap;
        uniform float uHeightScale;
        uniform float uWakeOffsetY;
        uniform float uOceanSpeed;
        varying float vWakeHeight;
        varying vec2 vWakeUv;

        varying vec2 vOceanUv;
        varying vec3 vOceanWorldPosition;

        ${g}

        ${e.vertexShader}
      `.replace(`#include <begin_vertex>`,`
        #include <begin_vertex>
        vOceanUv = uv;
        vOceanWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

        // Wake GPU sample (offset longitudinally to keep wave simulation aligned with ship translation offset)
        vec2 wakeUv = vec2(0.5 + position.x / BOUNDS, 0.5 + (position.y - uWakeOffsetY) / BOUNDS);
        vec4 heightData = texture2D(uHeightmap, wakeUv);
        float wakeHeight = heightData.r * uHeightScale;

        // Calculate Wave Displacement
        float elevation = snoise(vec3(position.x * 0.01 * NOISE_SCALE, position.y * 0.01 * NOISE_SCALE, uTime * 0.5 * uOceanSpeed)) * 0.15;
        elevation += snoise(vec3(position.x * 0.02 * NOISE_SCALE, position.y * 0.02 * NOISE_SCALE, uTime * 1.0 * uOceanSpeed)) * 0.05;

        // V-shaped wake damping zone to calm ambient waves behind the ship (local Y = world Z)
        vec2 p_damp = vec2(position.x, position.y - uWakeOffsetY);
        float depth_damp = max(0.0, p_damp.y);

        // Suppress the narrow physical-wake spike that can otherwise protrude
        // past the bow when the source is moved forward for side-hull alignment.
        float bowCenterCutout = (1.0 - smoothstep(-5.5, -0.4, p_damp.y))
                             * (1.0 - smoothstep(0.4, 1.05, abs(p_damp.x)));
        wakeHeight *= 1.0 - bowCenterCutout;

        float wakeHalfWidth = 2.2 + depth_damp * 0.28;
        float dampEnvelope = smoothstep(wakeHalfWidth, wakeHalfWidth * 0.35, abs(p_damp.x)) * smoothstep(24.0, 0.0, depth_damp);

        // Bow fade and boundary fade
        dampEnvelope *= smoothstep(-1.5, 0.0, p_damp.y);
        dampEnvelope *= smoothstep(0.0, 0.08, wakeUv.x) * smoothstep(0.0, 0.08, 1.0 - wakeUv.x)
                      * smoothstep(0.0, 0.08, wakeUv.y) * smoothstep(0.0, 0.08, 1.0 - wakeUv.y);

        // Damp ambient waves by 85% inside the wake channel
        elevation *= (1.0 - dampEnvelope * 0.85);

        transformed.z += elevation + wakeHeight;
        vWakeHeight = wakeHeight;
        vWakeUv = wakeUv;
        `),e.fragmentShader=`
        #define WAKE_RESOLUTION ${v.toFixed(1)}
        #define WAKE_NORMAL_STRENGTH 2.5
        uniform sampler2D uHeightmap;
        uniform float uHeightScale;
        uniform float uWakeOffsetY;
        uniform float uOceanSpeed;
        uniform sampler2D uOceanOverlay;
        uniform vec2 uResolution;
        uniform vec2 uOverlayResolution;
        uniform float uOverlayBrightness;
        uniform float uOverlaySaturation;
        uniform float uOverlayScale;
        uniform float uOverlayStrength;
        uniform float uRadialGlowStrength;
        uniform float uSunHighlightKnee;
        uniform float uSunHighlightCompression;
        uniform bool uDebugWakeBounds;
        uniform float uFoamThreshold;
        uniform float uFoamIntensity;
        uniform float uWashFoam;
        uniform float uWakeIntensity;
        uniform float uEdgeFade;
        uniform bool uFoamEnabled;
        varying float vWakeHeight;
        varying vec2 vWakeUv;

        uniform float uTime;
        uniform vec3 uTopColor;
        uniform vec3 uBottomColor;

        varying vec2 vOceanUv;
        varying vec3 vOceanWorldPosition;

        // Global variables to pass foam calculations from color_fragment to PBR chunks
        float foamFactor = 0.0;
        float edgeAlpha = 0.0;

        float blendLum(vec3 color) {
          return dot(color, vec3(0.3, 0.59, 0.11));
        }

        float blendSat(vec3 color) {
          return max(max(color.r, color.g), color.b) - min(min(color.r, color.g), color.b);
        }

        vec3 clipBlendColor(vec3 color) {
          float lum = blendLum(color);
          float minChannel = min(min(color.r, color.g), color.b);
          float maxChannel = max(max(color.r, color.g), color.b);

          if (minChannel < 0.0) {
            color = lum + ((color - lum) * lum) / max(lum - minChannel, 0.00001);
          }
          if (maxChannel > 1.0) {
            color = lum + ((color - lum) * (1.0 - lum)) / max(maxChannel - lum, 0.00001);
          }
          return color;
        }

        vec3 setBlendLum(vec3 color, float lum) {
          return clipBlendColor(color + (lum - blendLum(color)));
        }

        vec3 setBlendSat(vec3 color, float sat) {
          float minChannel = min(min(color.r, color.g), color.b);
          float maxChannel = max(max(color.r, color.g), color.b);
          if (maxChannel <= minChannel) return vec3(0.0);
          return (color - minChannel) * sat / (maxChannel - minChannel);
        }

        vec3 saturationBlend(vec3 backdrop, vec3 source) {
          return setBlendLum(setBlendSat(backdrop, blendSat(source)), blendLum(backdrop));
        }

        vec3 linearToSrgb(vec3 color) {
          vec3 low = color * 12.92;
          vec3 high = 1.055 * pow(max(color, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055;
          return mix(low, high, step(vec3(0.0031308), color));
        }

        vec3 srgbToLinear(vec3 color) {
          vec3 low = color / 12.92;
          vec3 high = pow((max(color, vec3(0.0)) + 0.055) / 1.055, vec3(2.4));
          return mix(low, high, step(vec3(0.04045), color));
        }

        vec2 coverTextureUv(vec2 screenUv, vec2 screenSize, vec2 textureSize) {
          float screenAspect = screenSize.x / max(screenSize.y, 1.0);
          float textureAspect = textureSize.x / max(textureSize.y, 1.0);
          vec2 visibleRange = vec2(1.0);

          if (screenAspect > textureAspect) {
            visibleRange.y = textureAspect / screenAspect;
          } else {
            visibleRange.x = screenAspect / textureAspect;
          }

          return (screenUv - 0.5) * visibleRange + 0.5;
        }

        float radialGradientAlpha(vec2 screenUv, vec2 center, vec2 screenSize) {
          vec2 metric = vec2(screenSize.x / max(screenSize.y, 1.0), 1.0);
          vec2 point = screenUv * metric;
          vec2 origin = center * metric;

          float farthestCorner = max(
            max(distance(origin, vec2(0.0, 0.0)), distance(origin, vec2(metric.x, 0.0))),
            max(distance(origin, vec2(0.0, 1.0)), distance(origin, vec2(metric.x, 1.0)))
          );

          float stopRadius = max(farthestCorner * 0.35, 0.0001);
          return clamp(1.0 - distance(point, origin) / stopRadius, 0.0, 1.0) * 0.15;
        }

        ${g}

        ${e.fragmentShader}
      `.replace(`#include <color_fragment>`,`
        #include <color_fragment>

        float fluidNoise = snoise(vec3(vOceanWorldPosition.xz * 0.01 * NOISE_SCALE, uTime * 0.5));
        vec3 baseColor = mix(uTopColor, uBottomColor, 0.5 + fluidNoise * 0.05);

        foamFactor = 0.0;
        float vFoam = 0.0;
        // Foam only exists around the hull and in the widening trail behind it.
        // Keep this gate substantially smaller than the full 60x60 simulation.
        vec2 foamGateOrigin = vec2(0.5, 0.5 + uWakeOffsetY / 60.0);
        float foamGateDepth = vWakeUv.y - foamGateOrigin.y;
        float foamGateFront = -0.15;
        float foamGateBack = 0.4;
        float foamGateHullHalfWidth = 0.05;
        float foamGateSideExpansion = 0.3;
        float foamGateHalfWidth = foamGateHullHalfWidth
                                + max(foamGateDepth, 0.0) * foamGateSideExpansion;
        bool insideWake = foamGateDepth >= foamGateFront
                       && foamGateDepth <= foamGateBack
                       && abs(vWakeUv.x - foamGateOrigin.x) <= foamGateHalfWidth;
        if (uFoamEnabled && insideWake) {
           vec2 cellSize = 1.0 / vec2(WAKE_RESOLUTION);
           float hVal = texture2D(uHeightmap, vWakeUv).x;
           float hL = texture2D(uHeightmap, vWakeUv + vec2(-cellSize.x, 0.0)).x;
           float hR = texture2D(uHeightmap, vWakeUv + vec2(cellSize.x, 0.0)).x;
           float hU = texture2D(uHeightmap, vWakeUv + vec2(0.0, cellSize.y)).x;
           float hD = texture2D(uHeightmap, vWakeUv + vec2(0.0, -cellSize.y)).x;

           // Discrete Laplacian (curvature). It is strongly negative at wave peaks.
           float laplacian = (hL + hR + hU + hD) - 4.0 * hVal;
           float crest = max(0.0, -laplacian) * 38.0;

           // Stretched coordinate mapping to create elongated foam streaks in the direction of travel (smaller 2.4x scale)
           vec2 foamUv = vec2(vOceanWorldPosition.x * 2.4, vOceanWorldPosition.z * 0.32);

           // Ridge noise octaves (1.0 - abs(snoise)) to simulate thin soap bubble walls
           float n1 = 1.0 - abs(snoise(vec3(foamUv * 1.5, uTime * 0.15)));
           float n2 = 1.0 - abs(snoise(vec3(foamUv * 3.5 + vec2(0.0, uTime * 0.4), uTime * 0.25)));
           float n = (n1 * 0.6 + n2 * 0.4);

           // Fine grains/filaments stretched even more longitudinally (finer 30.0x scale)
           vec2 fineUv = vec2(vOceanWorldPosition.x * 30.0, vOceanWorldPosition.z * 2.0);
           float fineNoise = snoise(vec3(fineUv + vec2(0.0, uTime * 1.0), uTime * 0.5)) * 0.5 + 0.5;
           float fineFoam = smoothstep(0.4, 0.75, fineNoise);

           // Dynamic threshold that lowers downstream to let foam stay on spreading, decaying wave crests
           float distBehindShip = max(0.0, vWakeUv.y - 0.6);
           float dynamicThreshold = uFoamThreshold * clamp(1.0 - distBehindShip * 0.95, 0.4, 1.0);
           float erodedThreshold = dynamicThreshold * (1.7 - n * 1.1);

           // Generate foam at wave crests
           foamFactor = smoothstep(erodedThreshold, erodedThreshold + 0.08, crest);

           // Shred the foam into organic, long filaments using the fine foam streaks and cellular noise
           foamFactor *= fineFoam * n * 2.2;

           // Fade out the wave crest foam much slower downstream to let it spread outwards
           float foamFade = smoothstep(0.55, 0.10, distBehindShip);
           foamFactor *= foamFade;

           foamFactor *= uFoamIntensity;

           // --- ANALYTICAL SIDE FOAM ---
           vec2 p = (vWakeUv - vec2(0.5, 0.5 + uWakeOffsetY / 60.0)) * 16.0;
           float depth = max(0.0, p.y);

           // Width factor expands the side foam in a beautiful V-shape (tighter growth rate 0.06)
           float widthFactor = 0.70 + depth * 0.06;
           float normX = p.x / widthFactor;

           // vMask defines the two side wave crests (sharper exponent 18.0)
           float vMask = exp(-pow(abs(normX) - 0.45, 2.0) * 18.0);
           float fadeOut = smoothstep(12.0, 0.0, depth) * smoothstep(-0.5, 0.2, p.y);

           // Ridge noise for bubbles (using meters coordinate p, scaled up to 5.8 for very small bubbles)
           vec2 fuv = p * 5.8;
           fuv.y -= uTime * 0.3 * uOceanSpeed;
           fuv.y *= mix(1.0, 0.15, smoothstep(3.0, 12.0, depth));

           float foamNoiseVal = 0.0;
           foamNoiseVal += 0.5000 * (1.0 - abs(snoise(vec3(fuv, uTime * 0.036))));
           foamNoiseVal += 0.2500 * (1.0 - abs(snoise(vec3(fuv * 2.1, -uTime * 0.36))));
           foamNoiseVal += 0.1250 * (1.0 - abs(snoise(vec3(fuv * 4.3, uTime * 0.45))));

           float vBubbles = smoothstep(0.55, 0.85, foamNoiseVal) * mix(1.0, fineFoam * 1.5, smoothstep(0.0, 6.0, depth));

           float shape = (fadeOut * 0.7) + (n * 0.5);
           float foamArea = smoothstep(0.55, 0.9, shape);
           float dissipation = mix(1.0, foamArea, smoothstep(1.5, 9.0, depth));

           vFoam = vMask * vBubbles * dissipation * fadeOut;
           vFoam *= smoothstep(-0.5, 0.2, p.y);

           // Modulate the analytical side foam by the GPGPU physical wave height and curvature
           vFoam *= smoothstep(-0.05, 0.25, crest + hVal * 0.5);

           // Combine GPGPU foam with analytical side foam
           foamFactor = max(foamFactor, vFoam * uFoamIntensity * 1.2);

           // Direct turbulent wash foam that expands laterally (V-shape) as it drifts behind the ship
           float distBehind = max(0.0, vWakeUv.y - 0.6);
           if (distBehind > 0.0) {
               float washHalfWidth = 0.03 + distBehind * 0.15;
               float distFromCenter = abs(vWakeUv.x - 0.5);
               float washEnvelope = smoothstep(washHalfWidth, washHalfWidth * 0.25, distFromCenter);
               float washNoise = n * fineFoam;
               float washFade = smoothstep(0.32, 0.02, distBehind);
               float washFoamVal = washEnvelope * washNoise * washFade * uWashFoam * 0.4;
               foamFactor = max(foamFactor, washFoamVal * uFoamIntensity);
           }

           // Match the vertex cutout so foam cannot expose a white arrow tip
           // directly in front of the ship's bow. The narrow side crests remain.
           float bowCenterCutout = (1.0 - smoothstep(-1.5, -0.1, p.y))
                                * (1.0 - smoothstep(0.10, 0.28, abs(p.x)));
           foamFactor *= 1.0 - bowCenterCutout;
        }

        edgeAlpha = smoothstep(0.0, uEdgeFade, vWakeUv.x) * smoothstep(0.0, uEdgeFade, 1.0 - vWakeUv.x)
                        * smoothstep(0.0, uEdgeFade, vWakeUv.y) * smoothstep(0.0, uEdgeFade, 1.0 - vWakeUv.y);

        vec3 foamColor = vec3(0.88, 0.94, 0.97);
        vec2 p_color = (vWakeUv - vec2(0.5, 0.5 + uWakeOffsetY / 60.0)) * 16.0;
        float depth_color = max(0.0, p_color.y);
        vec3 currentFoamColor = mix(vec3(1.0), vec3(0.545, 0.714, 0.871), clamp(depth_color / 9.0, 0.0, 1.0));
        vec3 mixedFoamColor = mix(foamColor, currentFoamColor, clamp(vFoam * 2.0, 0.0, 1.0));

        float finalFoamVal = clamp(foamFactor * edgeAlpha, 0.0, 1.0);
        baseColor = mix(baseColor, mixedFoamColor, finalFoamVal);

        // Runtime diagnostic: tint the calculated foam gate and draw its exact
        // boundary. Disabled by default and removable without recompiling.
        if (uDebugWakeBounds && insideWake) {
          float distanceToSide = foamGateHalfWidth - abs(vWakeUv.x - foamGateOrigin.x);
          float distanceToFront = foamGateDepth - foamGateFront;
          float distanceToBack = foamGateBack - foamGateDepth;
          float distanceToBoundary = min(distanceToSide, min(distanceToFront, distanceToBack));
          float boundaryWidth = clamp(
            max(fwidth(vWakeUv.x), fwidth(vWakeUv.y)) * 1.25,
            0.0005,
            0.003
          );
          float boundaryLine = 1.0 - smoothstep(0.0, boundaryWidth, distanceToBoundary);
          baseColor = mix(baseColor, vec3(0.0, 0.8, 0.25), 0.18);
          baseColor = mix(baseColor, vec3(1.0, 0.08, 0.02), boundaryLine);
        }

        diffuseColor = vec4(baseColor, diffuseColor.a);
        `).replace(`#include <normal_fragment_maps>`,`#ifdef USE_NORMALMAP_TANGENTSPACE
           vec2 wakeDiff = vOceanWorldPosition.xz - vec2(0.0, uWakeOffsetY);
           float depth = max(0.0, -wakeDiff.y);
           float widthFactor = 2.5 + depth * 0.25;
           float normX = wakeDiff.x / widthFactor;
           float pushForce = normX * exp(-normX * normX * 2.0);
           float pushY = exp(-normX * normX * 2.0);
           float wakeLengthVal = 60.0;
           float fadeOut = smoothstep(wakeLengthVal, 0.0, depth) * smoothstep(-6.0, 3.0, wakeDiff.y);
           float partingStrength = 2.2 * uWakeIntensity;

           vec2 uvOffset = vec2(
               -pushForce * partingStrength * fadeOut,
               -pushY * (partingStrength * 0.5) * fadeOut
           ) * 0.002;

           vec3 mapN1 = texture2D(normalMap, vNormalMapUv + vec2(-uTime * 0.02 * uOceanSpeed, -uTime * 0.01 * uOceanSpeed) + uvOffset).xyz * 2.0 - 1.0;
           mapN1.xy *= normalScale;

           vec3 mapN2 = texture2D(normalMap, vNormalMapUv * 2.0 + vec2(uTime * 0.01 * uOceanSpeed, -uTime * 0.015 * uOceanSpeed) + uvOffset * 2.0).xyz * 2.0 - 1.0;
           mapN2.xy = -mapN2.xy;
           mapN2.xy *= normalScale;

           vec3 oceanNormal = vec3(mapN1.xy + mapN2.xy, mapN1.z * mapN2.z);

           vec2 p_damp = vec2(wakeDiff.x, -wakeDiff.y);
           float depth_damp = max(0.0, p_damp.y);
           float wakeHalfWidth = 2.2 + depth_damp * 0.28;
           float dampEnvelope = smoothstep(wakeHalfWidth, wakeHalfWidth * 0.35, abs(p_damp.x)) * smoothstep(24.0, 0.0, depth_damp);

           dampEnvelope *= smoothstep(-1.5, 0.0, p_damp.y);
           dampEnvelope *= smoothstep(0.0, 0.08, vWakeUv.x) * smoothstep(0.0, 0.08, 1.0 - vWakeUv.x)
                         * smoothstep(0.0, 0.08, vWakeUv.y) * smoothstep(0.0, 0.08, 1.0 - vWakeUv.y);

           oceanNormal.xy *= (1.0 - dampEnvelope * 0.85);

           vec2 normCellSize = 3.2 / vec2(WAKE_RESOLUTION);
           float normHL = texture2D(uHeightmap, vWakeUv + vec2(-normCellSize.x, 0.0)).x;
           float normHR = texture2D(uHeightmap, vWakeUv + vec2(normCellSize.x, 0.0)).x;
           float normHU = texture2D(uHeightmap, vWakeUv + vec2(0.0, normCellSize.y)).x;
           float normHD = texture2D(uHeightmap, vWakeUv + vec2(0.0, -normCellSize.y)).x;

           vec3 wakeNormal = vec3(
               (normHL - normHR) * WAKE_NORMAL_STRENGTH * uHeightScale,
               (normHD - normHU) * WAKE_NORMAL_STRENGTH * uHeightScale,
               0.0
           );

           float normEdgeAlpha = smoothstep(0.0, uEdgeFade, vWakeUv.x) * smoothstep(0.0, uEdgeFade, 1.0 - vWakeUv.x)
                           * smoothstep(0.0, uEdgeFade, vWakeUv.y) * smoothstep(0.0, uEdgeFade, 1.0 - vWakeUv.y);

           vec3 combinedNormal = oceanNormal + wakeNormal * normEdgeAlpha * 1.1;

           normal = normalize(tbn * normalize(combinedNormal));
         #endif`).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
         roughnessFactor = mix(roughnessFactor, 0.97, clamp(foamFactor * edgeAlpha, 0.0, 1.0));`).replace(`#include <metalnessmap_fragment>`,`#include <metalnessmap_fragment>
         metalnessFactor = mix(metalnessFactor, 0.0, clamp(foamFactor * edgeAlpha, 0.0, 1.0));`).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>

         // Compress only the sun/direct-light peaks. This preserves the wave
         // normals and environment reflections while preventing white clipping.
         float directSpecularPeak = max(
           max(reflectedLight.directSpecular.r, reflectedLight.directSpecular.g),
           reflectedLight.directSpecular.b
         );
         if (directSpecularPeak > uSunHighlightKnee) {
           float excess = directSpecularPeak - uSunHighlightKnee;
           float compressedPeak = uSunHighlightKnee + excess / (1.0 + uSunHighlightCompression * excess);
           reflectedLight.directSpecular *= compressedPeak / max(directSpecularPeak, 0.00001);
         }`).replace(`#include <opaque_fragment>`,`vec2 overlayScreenUv = gl_FragCoord.xy / uResolution;
         overlayScreenUv.y = 1.0 - overlayScreenUv.y;
         vec2 overlayUv = coverTextureUv(overlayScreenUv, uResolution, uOverlayResolution);
         overlayUv = (overlayUv - 0.5) / max(uOverlayScale, 0.0001) + 0.5;
         vec3 overlayColor = texture2D(uOceanOverlay, overlayUv).rgb;

         // CSS equivalent: brightness(180%) saturate(120%). Clamping here
         // reproduces the colour clipping that gives the source its saturation.
         overlayColor = clamp(overlayColor * uOverlayBrightness, 0.0, 1.0);
         float overlayLum = dot(overlayColor, vec3(0.213, 0.715, 0.072));
         overlayColor = clamp(mix(vec3(overlayLum), overlayColor, uOverlaySaturation), 0.0, 1.0);

         vec3 overlayBackdrop = linearToSrgb(clamp(outgoingLight, 0.0, 1.0));
         vec3 overlayBlended = saturationBlend(overlayBackdrop, overlayColor);
         overlayBlended = mix(overlayBackdrop, overlayBlended, uOverlayStrength);

         vec3 radialGlowColor = vec3(0.0, 160.0 / 255.0, 1.0);
         float radialAlphaA = radialGradientAlpha(overlayScreenUv, vec2(0.25, 0.35), uResolution) * uRadialGlowStrength;
         float radialAlphaB = radialGradientAlpha(overlayScreenUv, vec2(0.75, 0.35), uResolution) * uRadialGlowStrength;
         float radialAlphaC = radialGradientAlpha(overlayScreenUv, vec2(0.50, 0.70), uResolution) * uRadialGlowStrength;
         overlayBlended = mix(overlayBlended, radialGlowColor, clamp(radialAlphaA, 0.0, 1.0));
         overlayBlended = mix(overlayBlended, radialGlowColor, clamp(radialAlphaB, 0.0, 1.0));
         overlayBlended = mix(overlayBlended, radialGlowColor, clamp(radialAlphaC, 0.0, 1.0));

         vec3 overlayBlendedLinear = srgbToLinear(clamp(overlayBlended, 0.0, 1.0));
         vec3 hdrResidual = max(outgoingLight - 1.0, 0.0);
         outgoingLight = overlayBlendedLinear + hdrResidual;

         #include <opaque_fragment>`),K.userData.shader=e},G=new m(2e3,2e3,150,150),q=new ee(G,K),q.rotation.x=-Math.PI/2,j.add(q);let p=performance.now(),E=0,O=!1,k=120,P=1/60,F=performance.now(),I=0,L=0,R=_.controls.wakeSpeed??65,z=_.controls.wakeSmoothing,B=_.controls.wakeIntensity??b,W=c,$=(e,t)=>{e.value!==t&&(e.value=t)};function ie(){if(!H)return;V=requestAnimationFrame(ie);let e=performance.now();if(!U&&!(k>0)){F=e,I=0;return}E++,!O&&_.controls&&(O=!0);let t=_.parentElement,n=t?t.querySelector(`.fps-val`):null,r=t?t.querySelector(`.ms-val`):null,a=e-F;if(r&&(r.textContent=a.toFixed(1)+`ms`),e-p>=1e3){let t=Math.round(E*1e3/(e-p));n&&(n.textContent=t),E=0,p=e}let o=(performance.now()-re)/1e3,ee=Math.min((e-F)/1e3,.05);F=e,I+=ee,d.uTime.value=o;let s=65,c=x,l=C,u=b,f=S;_.controls&&(_.controls.wakeSpeed!==void 0&&(s=_.controls.wakeSpeed),_.controls.height!==void 0&&(c=_.controls.height),_.controls.wakeCenterY!==void 0&&(l=_.controls.wakeCenterY),_.controls.wakeIntensity!==void 0&&(u=_.controls.wakeIntensity),_.controls.wakeWidth!==void 0&&(f=_.controls.wakeWidth)),s!==R&&(Q.setShipSpeed(s),R=s),_.controls.wakeSmoothing!==z&&(Q.setSmoothing(_.controls.wakeSmoothing),z=_.controls.wakeSmoothing),u!==B&&(Q.setWakeIntensity(u),B=u),f!==W&&(Q.setShipSize(f/60,11/60),W=f),$(d.uHeightScale,c),$(d.uWakeIntensity,u),$(d.uWakeOffsetY,l),$(d.uOverlayStrength,_.controls.overlayStrength),$(d.uOverlayBrightness,_.controls.overlayBrightness),$(d.uOverlaySaturation,_.controls.overlaySaturation),$(d.uOverlayScale,_.controls.overlayScale),$(d.uRadialGlowStrength,_.controls.radialGlowStrength),$(d.uSunHighlightKnee,_.controls.sunHighlightKnee),$(d.uSunHighlightCompression,_.controls.sunHighlightCompression),$(d.uDebugWakeBounds,!!_.controls.debugWakeBounds);let m=new i(0,0,l),h=0;for(;I>=P&&h<3;)L+=P,Q.update(m,P,L),I-=P,h++;if(h===3&&(I=Math.min(I,P)),h>0&&(d.uHeightmap.value=Q.getHeightmapTexture(),k=Math.max(0,k-h)),U){if(N.update(),_.controls&&(_.controls.fov!==void 0&&M.fov!==_.controls.fov&&(M.fov=_.controls.fov,M.updateProjectionMatrix()),_.controls.zoomFactor!==void 0)){let e=(_.clientWidth||window.innerWidth)/(_.clientHeight||window.innerHeight),t=1;e>1&&(t=1920/1080/e),M.position.y=_.controls.zoomFactor*t,M.position.z=.01,M.lookAt(0,0,0),M.updateProjectionMatrix()}A.render(j,M)}}let ae=_.controls.wakeCenterY??C;Q.setShipSpeed(R),Q.setSmoothing(z),Q.update(new i(0,0,ae),P,0),d.uWakeOffsetY.value=ae,d.uHeightmap.value=Q.getHeightmapTexture();try{A.compileAsync?await A.compileAsync(j,M):A.compile(j,M)}catch(e){if(!H)return;console.warn(`[OceanScene] Async shader precompile failed; falling back to synchronous compile.`,e),A.compile(j,M)}H&&(A.render(j,M),A.domElement.style.visibility=`visible`,ie())}).catch(e=>{console.error(`[OceanScene] Error preloading assets:`,e)});function $(){let e=_.clientWidth||window.innerWidth,t=_.clientHeight||window.innerHeight;M.aspect=e/t,M.updateProjectionMatrix(),A.setSize(e,t),K?.userData.shader&&A.getDrawingBufferSize(K.userData.shader.uniforms.uResolution.value)}return window.addEventListener(`resize`,$),()=>{H=!1,V&&cancelAnimationFrame(V),W.disconnect(),window.removeEventListener(`resize`,$),N.dispose(),G&&G.dispose(),K&&K.dispose(),J&&J.dispose(),Y&&Y.dispose(),X&&X.dispose(),Z&&Z.dispose(),Q&&Q.dispose(),A.dispose(),A.getContext().getExtension(`WEBGL_lose_context`)?.loseContext(),A.domElement&&A.domElement.parentNode&&A.domElement.parentNode.removeChild(A.domElement),console.log(`[OceanScene] 🧹 Cleaned up Ocean scene successfully`)}}export{_ as renderScene};