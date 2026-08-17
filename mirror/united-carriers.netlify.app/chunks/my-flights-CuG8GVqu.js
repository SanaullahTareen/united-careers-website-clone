import{A as e,C as t,E as n,F as r,L as i,M as a,N as o,O as s,T as c,_ as l,a as u,b as d,d as f,f as p,h as m,i as h,j as g,l as ee,m as _,r as te,s as ne,u as v,v as y,x as b,y as x}from"./vendor-three-C1Qcwpnq.js";function S(e){return e}function C(e){if(e==null)return S;var t,n,r=e.scale[0],i=e.scale[1],a=e.translate[0],o=e.translate[1];return function(e,s){s||(t=n=0);var c=2,l=e.length,u=Array(l);for(u[0]=(t+=e[0])*r+a,u[1]=(n+=e[1])*i+o;c<l;)u[c]=e[c],++c;return u}}function w(e,t){for(var n,r=e.length,i=r-t;i<--r;)n=e[i],e[i++]=e[r],e[r]=n}function T(e,t){return typeof t==`string`&&(t=e.objects[t]),t.type===`GeometryCollection`?{type:`FeatureCollection`,features:t.geometries.map(function(t){return E(e,t)})}:E(e,t)}function E(e,t){var n=t.id,r=t.bbox,i=t.properties==null?{}:t.properties,a=D(e,t);return n==null&&r==null?{type:`Feature`,properties:i,geometry:a}:r==null?{type:`Feature`,id:n,properties:i,geometry:a}:{type:`Feature`,id:n,bbox:r,properties:i,geometry:a}}function D(e,t){var n=C(e.transform),r=e.arcs;function i(e,t){t.length&&t.pop();for(var i=r[e<0?~e:e],a=0,o=i.length;a<o;++a)t.push(n(i[a],a));e<0&&w(t,o)}function a(e){return n(e)}function o(e){for(var t=[],n=0,r=e.length;n<r;++n)i(e[n],t);return t.length<2&&t.push(t[0]),t}function s(e){for(var t=o(e);t.length<4;)t.push(t[0]);return t}function c(e){return e.map(s)}function l(e){var t=e.type,n;switch(t){case`GeometryCollection`:return{type:t,geometries:e.geometries.map(l)};case`Point`:n=a(e.coordinates);break;case`MultiPoint`:n=e.coordinates.map(a);break;case`LineString`:n=o(e.arcs);break;case`MultiLineString`:n=e.arcs.map(o);break;case`Polygon`:n=c(e.arcs);break;case`MultiPolygon`:n=e.arcs.map(c);break;default:return null}return{type:t,coordinates:n}}return l(t)}var re={pointSize:.005,tileDeg:1.2,edgeColor:`#ffffff`,fillColor:`#e2e8f0`,fillOpacity:.1,backOpacity:.15,pinDotColor:`#F45300`,arcColor:`#F45300`,killBack:!0,pinSize:.006,pinAltitude:.008,haloScale:7.5,showArcs:!0,arcThickness:.002,arcAltBase:.02,arcAltMultiplier:.01,cameraZ:2.9,globeOffsetX:0,globeOffsetY:0,globeScale:1,enableControls:!0};function O(e,t,n=1){let r=(90-e)*(Math.PI/180),a=(t+180)*(Math.PI/180);return new i(-n*Math.sin(r)*Math.cos(a),n*Math.cos(r),n*Math.sin(r)*Math.sin(a))}function k(e,t,r,a,o){let s=new n({color:new _(e),size:t,sizeAttenuation:!0,depthWrite:!1,transparent:!0,map:a,alphaTest:0,opacity:1});return s.onBeforeCompile=e=>{e.uniforms.uCamPos={value:new i},e.uniforms.uBackOpacity={value:r},e.defines=e.defines||{},o&&(e.defines.KILL_BACK=1),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vWorldPos;
uniform vec3 uCamPos;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vWorldPos = (modelMatrix * vec4(transformed,1.0)).xyz;`).replace(`#include <project_vertex>`,`#include <project_vertex>
float ndv = dot(normalize(uCamPos - vWorldPos), normalize(vWorldPos));
gl_PointSize *= mix(0.6, 1.0, smoothstep(0.0, 0.25, ndv));`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 vWorldPos;
uniform vec3 uCamPos;
uniform float uBackOpacity;`).replace(`#include <output_fragment>`,`{
				vec3 viewDir = normalize(uCamPos - vWorldPos);
				vec3 normalDir = normalize(vWorldPos);
				float nd = dot(viewDir, normalDir);
				#ifdef KILL_BACK
					if (nd <= 0.0) discard;
				#else
					diffuseColor.a *= mix(uBackOpacity, 1.0, smoothstep(0.0, 0.25, nd));
				#endif
			}
#include <output_fragment>`),s.userData.shader=e},s}function ie(e=64){let t=document.createElement(`canvas`);t.width=t.height=e;let n=t.getContext(`2d`);n.clearRect(0,0,e,e);let r=e/2,i=n.createRadialGradient(r,r,r*.82,r,r,r);i.addColorStop(0,`rgba(255,255,255,1)`),i.addColorStop(1,`rgba(255,255,255,0)`),n.fillStyle=i,n.beginPath(),n.arc(r,r,r-.5,0,Math.PI*2),n.closePath(),n.fill();let a=new f(t);return a.minFilter=x,a.magFilter=x,a}function ae(e=128){let t=document.createElement(`canvas`);t.width=t.height=e;let n=t.getContext(`2d`),r=n.createRadialGradient(e/2,e/2,0,e/2,e/2,e/2);r.addColorStop(0,`rgba(255,255,255,0.4)`),r.addColorStop(.35,`rgba(255,255,255,0.1)`),r.addColorStop(1,`rgba(255,255,255,0)`),n.fillStyle=r,n.fillRect(0,0,e,e);let i=new f(t);return i.minFilter=x,i.magFilter=x,i}var oe=`
function wrapLon(lon){ return ((lon + 540) % 360) - 180; }
function sampleEdgeFlat(ring, maxDegStep){
	var out = [];
	var currentDist = 0;
	if (ring.length >= 2) out.push(wrapLon(ring[0]), ring[1]);
	for (var i=0; i<ring.length-2; i+=2){
		var lon1 = ring[i], lat1 = ring[i+1];
		var lon2 = ring[i+2], lat2 = ring[i+3];
		var dLon = lon2 - lon1, lon2n = lon2;
		if (Math.abs(dLon)>180){ lon2n += dLon>0?-360:360; dLon = lon2n - lon1; }
		var dLat = lat2 - lat1;
		var avgLat = (lat1 + lat2) * 0.5;
		var cosLat = Math.cos(avgLat * Math.PI / 180);
		var segLen = Math.sqrt((dLon * cosLat) * (dLon * cosLat) + dLat * dLat);
		var remain = segLen;
		var t = 0;
		while (currentDist + remain >= maxDegStep) {
			var move = maxDegStep - currentDist;
			t += move / segLen;
			var lon = lon1 + dLon * t;
			var lat = lat1 + dLat * t;
			out.push(wrapLon(lon), lat);
			remain -= move;
			currentDist = 0;
		}
		currentDist += remain;
	}
	return new Float32Array(out);
}
function lonLatToVec3(lon,lat,r){
	if (r === void 0) r = 1;
	var phi = (90 - lat) * Math.PI/180;
	var theta = (lon + 180) * Math.PI/180;
	return [-Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)];
}
onmessage = function(e){
	var densityDeg = e.data.densityDeg, polysIn = e.data.polysIn;
	var edgeOut = [];
	for (var p=0;p<polysIn.length;p++){
		var poly = polysIn[p];
		for (var r=0;r<poly.length;r++){
			var sampled = sampleEdgeFlat(poly[r], densityDeg * 0.7);
			for (var i=0;i<sampled.length;i+=2){
				var v = lonLatToVec3(sampled[i], sampled[i+1], 1);
				edgeOut.push(v[0],v[1],v[2]);
			}
		}
	}
	var arr = new Float32Array(edgeOut);
	postMessage({ ok:true, edge:arr }, [arr.buffer]);
};`,se=`
var PI=Math.PI;
function wrap180(lon){ return ((lon+540)%360)-180; }
function vec3(lon,lat){
  var phi=(90-lat)*PI/180, th=(lon+180)*PI/180;
  return [-Math.sin(phi)*Math.cos(th), Math.cos(phi), Math.sin(phi)*Math.sin(th)];
}
function unwrapRing(ring, refLon){
  var out=new Array(ring.length), prev=null;
  for(var i=0;i<ring.length;i++){
	var L=ring[i][0], A=ring[i][1];
	var d=L-refLon;
	if(d>180) L-=360; else if(d<-180) L+=360;
	if(prev){
	  var step=L-prev[0];
	  if(step>180) L-=360; else if(step<-180) L+=360;
	}
	out[i]=[L,A]; prev=out[i];
  }
  return out;
}
function pointInRing(pt, ring){
  var x=pt[0], y=pt[1], inside=false, n=ring.length;
  for(var i=0,j=n-1;i<n;j=i++){
	var xi=ring[i][0], yi=ring[i][1];
	var xj=ring[j][0], yj=ring[j][1];
	var denom=yj-yi; if(denom===0) continue;
	var inter=((yi>y)!==(yj>y)) && (x < (xj-xi)*(y-yi)/denom + xi);
	if(inter) inside=!inside;
  }
  return inside;
}
function containsUnwrapped(poly, refLon, lon, lat){
  var rings=poly.coordinates; if(!rings||!rings.length) return false;
  var r0=unwrapRing(rings[0], refLon);
  var pt=[lon,lat];
  if(!pointInRing(pt, r0)) return false;
  for(var k=1;k<rings.length;k++){
	var rk=unwrapRing(rings[k], refLon);
	if(pointInRing(pt, rk)) return false;
  }
  return true;
}
function bbox(r){
  var minLon=1e9,maxLon=-1e9,minLat=90,maxLat=-90;
  for(var i=0;i<r.length;i++){
	var L=r[i][0], A=r[i][1];
	if(L<minLon)minLon=L; if(L>maxLon)maxLon=L;
	if(A<minLat)minLat=A; if(A>maxLat)maxLat=A;
  }
  return {minLon,maxLon,minLat,maxLat};
}
onmessage=function(e){
  var geos=e.data.geos, step=Math.max(0.2, Math.min(6.0, e.data.tileDeg||1.0));
  var out=[];
  for(var p=0;p<geos.length;p++){
	var r0 = unwrapRing(geos[p].coordinates[0], 0);
	var bb = bbox(r0);
	var refLon = (bb.minLon+bb.maxLon)/2;
	r0 = unwrapRing(geos[p].coordinates[0], refLon);
	bb = bbox(r0);
	var latStart = Math.floor((bb.minLat-1)/step)*step;
	var latEnd   = Math.ceil((bb.maxLat+1)/step)*step;
	for(var lat=latStart; lat<=latEnd; lat+=step){
	  var odd = Math.round(Math.abs(lat/step))%2;
	  var cosLat = Math.cos(lat * PI / 180);
	  var lonStep = step / Math.max(0.15, cosLat);
	  var lonStart = Math.floor((bb.minLon-1)/lonStep)*lonStep + (odd? lonStep*0.5 : 0);
	  var lonEnd   = Math.ceil((bb.maxLon+1)/lonStep)*lonStep;
	  for(var lon=lonStart; lon<=lonEnd; lon+=lonStep){
		var llLon = lon, llLat = Math.max(-90, Math.min(90, lat));
		if(containsUnwrapped(geos[p], refLon, llLon, llLat)){
		  var v = vec3(wrap180(llLon), llLat);
		  out.push(v[0],v[1],v[2]);
		}
	  }
	}
  }
  var arr=new Float32Array(out);
  postMessage({ok:true, fill:arr}, [arr.buffer]);
};`;function A(e,t){return new Promise((n,r)=>{let i=new Blob([e],{type:`application/javascript`}),a=URL.createObjectURL(i),o=new Worker(a);o.onmessage=e=>{URL.revokeObjectURL(a),o.terminate(),e.data&&e.data.ok?n(e.data):r(Error(`Worker failed`))},o.onerror=e=>{URL.revokeObjectURL(a),o.terminate(),r(e)},o.postMessage(t)})}function j(e){let t=[],n=[],r=T(e,e.objects.land);function i(e,t){let n=new Float32Array((e.length+ +!!t)*2),r=0;for(let t=0;t<e.length;t++)n[r++]=e[t][0],n[r++]=e[t][1];return t&&(n[r++]=e[0][0],n[r++]=e[0][1]),n}return(r.features||[]).forEach(e=>{let r=e.geometry;r&&(r.type===`Polygon`?(t.push(r.coordinates.map(e=>i(e,!0))),n.push({type:`Polygon`,coordinates:r.coordinates})):r.type===`MultiPolygon`&&r.coordinates.forEach(e=>{t.push(e.map(e=>i(e,!0))),n.push({type:`Polygon`,coordinates:e})}))}),{polygons:t,geoPolygons:n}}var M=null;function N(){return M||=fetch(`https://unpkg.com/world-atlas@2/land-110m.json`,{cache:`force-cache`}).then(e=>{if(!e.ok)throw Error(`Failed to load land data`);return e.json()}).then(j).catch(e=>{throw M=null,e}),M}function P(n,f={}){let _={...re,...f},x=!1,S=n.clientWidth<768?1.5:2,C=Math.min(window.devicePixelRatio||1,S),w=new ne({canvas:n,alpha:!0,antialias:!1,powerPreference:`low-power`});w.setPixelRatio(C),w.setClearColor(0,0);let T=new e,E=n.clientWidth||n.offsetWidth||800,D=n.clientHeight||n.offsetHeight||E;w.setSize(E,D,!1);let j=new t(55,E/D,.1,100);j.position.set(0,0,_.cameraZ);let M=new u;M.setSize(E,D),M.domElement.style.position=`absolute`,M.domElement.style.top=`0px`,M.domElement.style.left=`0px`,M.domElement.style.pointerEvents=`none`,n.parentNode.appendChild(M.domElement);let P=new te(j,n);P.enableDamping=!0,P.dampingFactor=.05,P.enableZoom=!1,P.enablePan=!1,P.enabled=_.enableControls;let F=!1,I=!1,L=document.querySelector(`.cursor-drag`),ce=n.style.cursor,R=n.getAttribute(`data-cursor`);P.enabled&&(n.setAttribute(`data-cursor`,`drag`),n.style.cursor=`grab`);let z=e=>{P.enabled&&(n.style.cursor=e?`grabbing`:`grab`,n.classList.toggle(`is-dragging`,e),L?.classList.toggle(`is-dragging`,e),L?.classList.toggle(`active`,I||e))},B=()=>{I=!0,z(F)},V=()=>{I=!1,z(F)},H=()=>{F=!0,z(!0)},U=()=>{F=!1,z(!1)};n.addEventListener(`pointerenter`,B),n.addEventListener(`pointerleave`,V),P.addEventListener(`start`,H),P.addEventListener(`end`,U);let W=new y;W.position.set(_.globeOffsetX,_.globeOffsetY,0),W.scale.setScalar(_.globeScale),T.add(W),W.rotation.x=_.globeRotationX===void 0?.15:_.globeRotationX,W.rotation.z=_.globeRotationZ===void 0?.05:_.globeRotationZ;let G=new d(new g(.99,32,32),new b({colorWrite:!1,depthWrite:!0}));G.renderOrder=-1,W.add(G);let K=[];(async()=>{try{let{polygons:e,geoPolygons:t}=await N(),n=ie(64),r=k(_.edgeColor,_.pointSize,_.backOpacity,n,_.killBack),i=k(_.fillColor,Math.max(_.pointSize*.75,.003),_.backOpacity,n,_.killBack);K.push(r,i);let[a,o]=await Promise.all([A(oe,{densityDeg:_.tileDeg,polysIn:e}),A(se,{tileDeg:_.tileDeg,geos:t})]);if(x)return;let s=new v;s.setAttribute(`position`,new l(a.edge,3));let u=new c(s,r);W.add(u);let d=new v;d.setAttribute(`position`,new l(o.fill,3));let f=new c(d,i);W.add(f)}catch(e){console.error(`Globe Data Error:`,e)}})();let le=ae(64),q=[],J=new m(_.pinSize,_.pinSize,_.pinAltitude,12,1,!1);J.rotateX(Math.PI/2),J.translate(0,0,_.pinAltitude/2);let ue=new b({color:_.pinDotColor}),de=new o({color:_.pinDotColor,map:le,transparent:!0,blending:2,depthWrite:!1});_.airportsData&&_.airportsData.airports&&_.airportsData.airports.forEach(e=>{let t=new y;t.userData.airport=e;let n=O(parseFloat(e.lat),parseFloat(e.lng),1.002);t.position.copy(n),t.quaternion.setFromUnitVectors(new i(0,0,1),n.clone().normalize());let r=new d(J,ue),o=e.size||1;r.scale.set(o,o,1),t.add(r);let c=new a(de),l=_.pinSize*_.haloScale;c.scale.set(l,l,1),t.add(c);let u=document.createElement(`div`);u.className=`globe-label`;let f=document.createElement(`div`);f.className=`globe-label-text`,f.textContent=e.country||`N/A`,u.appendChild(f);let p=new h(u);t.add(p),t.userData.labelObject=p,t.userData.labelVisible=null;let m=new d(new s(.95,1,32),new b({color:_.pinDotColor,transparent:!0,opacity:0,blending:2,side:2,depthWrite:!1}));m.userData={offset:Math.random()},t.add(m),t.userData.ringMesh=m,W.add(t),q.push(t)});let fe=[],Y=3.8,X={uTime:{value:Y}};if(_.showArcs&&_.flightsData&&_.flightsData.flights){let e=new b({color:_.arcColor,transparent:!0,opacity:1,blending:2,depthWrite:!1,side:2});e.onBeforeCompile=e=>{e.uniforms.uTime=X.uTime,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
				 attribute float aOffset;
				 varying float vProgress;
				 varying float vOffset;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
				 vProgress = uv.x;
				 vOffset = aOffset;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
				 varying float vProgress;
				 varying float vOffset;
				 uniform float uTime;`).replace(`#include <color_fragment>`,`#include <color_fragment>
				float pr = mod(uTime * 2.0 + vOffset, 2.5);
				float st = clamp(pr - 1.0, 0.0, 1.0);
				float en = clamp(pr, 0.0, 1.0);
				if (vProgress < st || vProgress > en) discard;
				diffuseColor.a *= smoothstep(st, en + 0.001, vProgress);`)};let t=_.flightsData.flights.map((e,t)=>{if(!e.status)return null;let n=t*.6180339887%1,r=O(e.startLat,e.startLng),i=O(e.endLat,e.endLng),a=r.distanceTo(i);return{from:[e.startLat,e.startLng],to:[e.endLat,e.endLng],offset:n,delay:Math.min(.08,a/1.5*.08)}}).filter(Boolean);q.forEach(e=>{let n=e.userData.airport;n?e.userData.arrivingArcs=t.filter(e=>Math.abs(e.to[0]-parseFloat(n.lat))<.01&&Math.abs(e.to[1]-parseFloat(n.lng))<.01):e.userData.arrivingArcs=[]}),_.flightsData.flights.forEach((t,n)=>{if(!t.status)return;let a=O(t.startLat,t.startLng,1.002),o=O(t.endLat,t.endLng,1.002),s=a.distanceTo(o),c=_.arcAltBase+Math.min(.5,s*_.arcAltMultiplier),l=[];for(let e=0;e<=32;e++){let t=e/32,n=new i().copy(a).lerp(o,t).normalize(),r=1.002+c*4*t*(1-t);n.multiplyScalar(r),l.push(n)}let u=new r(new p(l),32,_.arcThickness,4,!1),f=u.attributes.position.count,m=new Float32Array(f),h=n*.6180339887%1;for(let e=0;e<f;e++)m[e]=h*2.5;u.setAttribute(`aOffset`,new ee(m,1));let g=new d(u,e);W.add(g),fe.push(g)})}let Z=new i,Q=new i,$=new i,pe=new i,me=(e=n.clientWidth,t=n.clientHeight)=>{if(x)return;let r=Math.max(1,Math.round(e||n.offsetWidth||1)),i=Math.max(1,Math.round(t||n.offsetHeight||r));w.setSize(r,i,!1),j.aspect=r/i,j.updateProjectionMatrix(),M.setSize(r,i)};return{attach:e=>{if(x||!e?.parentNode)return n;let t=e.parentNode;return e!==n&&t.replaceChild(n,e),t.appendChild(M.domElement),me(n.clientWidth,n.clientHeight),n},detach:()=>{n.remove(),M.domElement.remove()},resize:me,isInteracting:()=>F,setLabelsVisible:e=>{q.forEach(t=>{let n=t.userData.labelObject;n&&(e?t.userData.labelVisible=null:(t.userData.labelVisible=!1,n.element.style.opacity=`0`,n.element.style.pointerEvents=`none`))}),q._labelsHidden=!e},update:({phi:e,deltaTime:t=0})=>{if(x)return;let n=Number.isFinite(t)?t/16.666:0;Y+=.0015*n,X.uTime.value=Y,e!==void 0&&(W.rotation.y=e),W.getWorldPosition(Q),q.forEach(e=>{let t=e.userData.ringMesh;if(t&&e.userData.arrivingArcs){let n=0,r=0;if(e.userData.arrivingArcs.forEach(e=>{let t=(Y*2+e.offset*2.5)%2.5;t<0&&(t+=2.5);let i=1+e.delay+-.05;if(t>=i&&t<=i+.5){let e=1-(1-(t-i)/.5)**3,a=e*.02;a>n&&(n=a,r=e)}}),n>0){let e=.02+n;t.scale.set(e,e,1),t.material.opacity=1-r}else t.material.opacity=0}if(!q._labelsHidden){e.getWorldPosition(Z),$.subVectors(Z,Q).normalize(),pe.subVectors(j.position,Z).normalize();let t=$.dot(pe)>.05,n=e.userData.labelObject;n&&e.userData.labelVisible!==t&&(e.userData.labelVisible=t,t?(n.element.style.opacity=`1`,n.element.style.filter=`blur(0px)`,n.element.style.pointerEvents=`auto`):(n.element.style.opacity=`0`,n.element.style.filter=`blur(4px)`,n.element.style.pointerEvents=`none`))}}),K.forEach(e=>{e.userData.shader&&e.userData.shader.uniforms.uCamPos.value.copy(j.position)}),P.update(),w.render(T,j),M.render(T,j)},destroy:()=>{x=!0,n.removeEventListener(`pointerenter`,B),n.removeEventListener(`pointerleave`,V),P.removeEventListener(`start`,H),P.removeEventListener(`end`,U),n.style.cursor=ce,n.classList.remove(`is-dragging`),R===null?n.removeAttribute(`data-cursor`):n.setAttribute(`data-cursor`,R),L?.classList.remove(`active`,`is-dragging`),P.dispose(),M.domElement.parentNode&&M.domElement.parentNode.removeChild(M.domElement);let e=new Set,t=new Set,r=new Set;T.traverse(n=>{n.geometry&&!e.has(n.geometry)&&(e.add(n.geometry),n.geometry.dispose()),n.material&&(Array.isArray(n.material)?n.material:[n.material]).forEach(e=>{if(!(!e||t.has(e))){t.add(e);for(let t in e)e[t]?.isTexture&&!r.has(e[t])&&(r.add(e[t]),e[t].dispose());e.dispose()}})});let i=w.getContext();i&&i.getExtension(`WEBGL_lose_context`)?.loseContext(),w.dispose()}}}var F={type:`AirportsCollection`,airports:[{text:`LHR`,size:1,country:`UK`,city:`London`,lat:`53.8085`,lng:`-2.7597`},{text:`FRA`,size:1,country:`Germany`,city:`Frankfurt`,lat:`51.0774`,lng:`10.2704`},{text:`MAD`,size:1,country:`Spain`,city:`Madrid`,lat:`40.3207`,lng:`-3.6242`},{text:`FCO`,size:1,country:`Italy`,city:`Rome`,lat:`42.6708`,lng:`12.2690`},{text:`IST`,size:1,country:`Turkey`,city:`Istanbul`,lat:`39.1451`,lng:`35.1172`},{text:`TLV`,size:1,country:`Israel`,city:`Tel Aviv`,lat:`31.4791`,lng:`35.0010`},{text:`CAI`,size:1,country:`Egypt`,city:`Cairo`,lat:`26.4749`,lng:`29.8610`},{text:`DOH`,size:1,country:`Qatar`,city:`Doha`,lat:`25.3210`,lng:`51.1838`},{text:`RUH`,size:1,country:`Saudi Arabia`,city:`Riyadh`,lat:`19.0893`,lng:`44.6413`},{text:`NBO`,size:1,country:`Kenya`,city:`Nairobi`,lat:`0.5955`,lng:`37.7914`},{text:`CPT`,size:1,country:`South Africa`,city:`Cape Town`,lat:`-28.9233`,lng:`25.1581`},{text:`JFK`,size:1,country:`USA`,city:`New York`,lat:`44.7557`,lng:`-103.5725`},{text:`YYZ`,size:1,country:`Canada`,city:`Toronto`,lat:`60.4769`,lng:`-96.3960`},{text:`MEX`,size:1,country:`Mexico`,city:`Mexico City`,lat:`23.9134`,lng:`-102.2231`},{text:`GRU`,size:1,country:`Brazil`,city:`Sao Paulo`,lat:`-10.6555`,lng:`-53.1725`},{text:`EZE`,size:1,country:`Argentina`,city:`Buenos Aires`,lat:`-34.7366`,lng:`-64.7543`},{text:`BOG`,size:1,country:`Colombia`,city:`Bogota`,lat:`3.9163`,lng:`-73.0735`},{text:`SCL`,size:1,country:`Chile`,city:`Santiago`,lat:`-43.3109`,lng:`-74.1779`},{text:`NRT`,size:1,country:`Japan`,city:`Tokyo`,lat:`37.5367`,lng:`137.7123`},{text:`HKG`,size:1,country:`Hong Kong`,city:`Hong Kong`,lat:`22.3080`,lng:`113.9185`},{text:`BKK`,size:1,country:`Thailand`,city:`Bangkok`,lat:`14.9807`,lng:`101.0025`},{text:`SIN`,size:1,country:`Singapore`,city:`Singapore`,lat:`1.3644`,lng:`103.9915`},{text:`SYD`,size:1,country:`Australia`,city:`Sydney`,lat:`-25.7631`,lng:`134.3141`},{text:`AKL`,size:1,country:`New Zealand`,city:`Auckland`,lat:`-41.5511`,lng:`172.9514`},{text:`PEK`,size:1,country:`China`,city:`Beijing`,lat:`36.6834`,lng:`103.4525`}]},I={type:`FlightsCollection`,flights:[{type:`flight`,order:14,from:`YYZ`,to:`CPT`,flightCode:`YYZ-CPT`,date:`Jan 10, 2022`,status:!1,startLat:60.4769,startLng:-96.396,endLat:-28.9233,endLng:25.1581,arcAlt:.3},{type:`flight`,order:29,from:`YYZ`,to:`NBO`,flightCode:`YYZ-NBO`,date:`Jan 10, 2022`,status:!0,startLat:60.4769,startLng:-96.396,endLat:.5955,endLng:37.7914,arcAlt:.3},{type:`flight`,order:23,from:`MEX`,to:`LHR`,flightCode:`MEX-LHR`,date:`Jan 10, 2022`,status:!0,startLat:23.9134,startLng:-102.2231,endLat:53.8085,endLng:-2.7597,arcAlt:.3},{type:`flight`,order:10,from:`JFK`,to:`MAD`,flightCode:`LAX-MAD`,date:`Jan 10, 2022`,status:!0,startLat:44.7557,startLng:-103.5725,endLat:40.3207,endLng:-3.6242,arcAlt:.3},{type:`flight`,order:23,from:`BOG`,to:`CAI`,flightCode:`BOG-CAI`,date:`Jan 10, 2022`,status:!0,startLat:3.9163,startLng:-73.0735,endLat:26.4749,endLng:29.861,arcAlt:.3},{type:`flight`,order:22,from:`BOG`,to:`AKL`,flightCode:`BOG-AKL`,date:`Jan 10, 2022`,status:!0,startLat:3.9163,startLng:-73.0735,endLat:-41.5511,endLng:172.9514,arcAlt:.3},{type:`flight`,order:4,from:`MEX`,to:`MAD`,flightCode:`MEX-MAD`,date:`Jan 10, 2022`,status:!0,startLat:23.9134,startLng:-102.2231,endLat:40.3207,endLng:-3.6242,arcAlt:.3},{type:`flight`,order:22,from:`EZE`,to:`FCO`,flightCode:`EZE-FCO`,date:`Jan 10, 2022`,status:!0,startLat:-34.7366,startLng:-64.7543,endLat:42.6708,endLng:12.269,arcAlt:.3},{type:`flight`,order:18,from:`FCO`,to:`NRT`,flightCode:`FCO-NRT`,date:`Jan 10, 2022`,status:!0,startLat:42.6708,startLng:12.269,endLat:37.5367,endLng:137.7123,arcAlt:.3},{type:`flight`,order:3,from:`SCL`,to:`IST`,flightCode:`SCL-IST`,date:`Jan 10, 2022`,status:!0,startLat:-43.3109,startLng:-74.1779,endLat:39.1451,endLng:35.1172,arcAlt:.3},{type:`flight`,order:9,from:`EZE`,to:`SIN`,flightCode:`EZE-SIN`,date:`Jan 10, 2022`,status:!0,startLat:-34.7366,startLng:-64.7543,endLat:1.3644,endLng:103.9915,arcAlt:.3},{type:`flight`,order:22,from:`SCL`,to:`EZE`,flightCode:`SCL-EZE`,date:`Jan 10, 2022`,status:!0,startLat:-43.3109,startLng:-74.1779,endLat:-34.7366,endLng:-64.7543,arcAlt:.3},{type:`flight`,order:22,from:`SCL`,to:`JFK`,flightCode:`SCL-LAX`,date:`Jan 10, 2022`,status:!0,startLat:-43.3109,startLng:-74.1779,endLat:44.7557,endLng:-103.5725,arcAlt:.3},{type:`flight`,order:24,from:`JFK`,to:`MEX`,flightCode:`JFK-MEX`,date:`Jan 10, 2022`,status:!1,startLat:44.7557,startLng:-103.5725,endLat:23.9134,endLng:-102.2231,arcAlt:.3},{type:`flight`,order:10,from:`FRA`,to:`GRU`,flightCode:`FRA-GRU`,date:`Jan 10, 2022`,status:!1,startLat:51.0774,startLng:10.2704,endLat:-10.6555,endLng:-53.1725,arcAlt:.3},{type:`flight`,order:1,from:`MAD`,to:`BKK`,flightCode:`MAD-BKK`,date:`Jan 10, 2022`,status:!0,startLat:40.3207,startLng:-3.6242,endLat:14.9807,endLng:101.0025,arcAlt:.3},{type:`flight`,order:16,from:`LHR`,to:`NBO`,flightCode:`LHR-NBO`,date:`Jan 10, 2022`,status:!1,startLat:53.8085,startLng:-2.7597,endLat:.5955,endLng:37.7914,arcAlt:.3},{type:`flight`,order:7,from:`MAD`,to:`HKG`,flightCode:`MAD-HKG`,date:`Jan 10, 2022`,status:!0,startLat:40.3207,startLng:-3.6242,endLat:22.308,endLng:113.9185,arcAlt:.3},{type:`flight`,order:28,from:`FRA`,to:`HKG`,flightCode:`FRA-HKG`,date:`Jan 10, 2022`,status:!1,startLat:51.0774,startLng:10.2704,endLat:22.308,endLng:113.9185,arcAlt:.3},{type:`flight`,order:8,from:`FRA`,to:`MAD`,flightCode:`FRA-MAD`,date:`Jan 10, 2022`,status:!1,startLat:51.0774,startLng:10.2704,endLat:40.3207,endLng:-3.6242,arcAlt:.3}]};export{N as i,F as n,P as r,I as t};