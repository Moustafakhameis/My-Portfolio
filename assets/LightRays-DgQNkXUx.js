import{n as e,s as t,t as n}from"./jsx-runtime-BseJUIpC.js";import{a as r,i,o as a,t as o}from"./Mesh-iy4kz634.js";var s=class extends a{constructor(e,{attributes:t={}}={}){Object.assign(t,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])},uv:{size:2,data:new Float32Array([0,0,2,0,0,2])}}),super(e,t)}},c=t(e(),1),l=n(),u=`#ffffff`,d=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},f=(e,t,n)=>{switch(e){case`top-left`:return{anchor:[0,-.2*n],dir:[0,1]};case`top-right`:return{anchor:[t,-.2*n],dir:[0,1]};case`left`:return{anchor:[-.2*t,.5*n],dir:[1,0]};case`right`:return{anchor:[1.2*t,.5*n],dir:[-1,0]};case`bottom-left`:return{anchor:[0,1.2*n],dir:[0,-1]};case`bottom-center`:return{anchor:[.5*t,1.2*n],dir:[0,-1]};case`bottom-right`:return{anchor:[t,1.2*n],dir:[0,-1]};default:return{anchor:[.5*t,-.2*n],dir:[0,1]}}},p=({raysOrigin:e=`top-center`,raysColor:t=u,raysSpeed:n=1,lightSpread:a=1,rayLength:p=2,pulsating:m=!1,fadeDistance:h=1,saturation:g=1,followMouse:_=!0,mouseInfluence:v=.1,noiseAmount:y=0,distortion:b=0,className:x=``})=>{let S=(0,c.useRef)(null),C=(0,c.useRef)(null),w=(0,c.useRef)(null),T=(0,c.useRef)({x:.5,y:.5}),E=(0,c.useRef)({x:.5,y:.5}),D=(0,c.useRef)(null),O=(0,c.useRef)(null),k=(0,c.useRef)(null),[A,j]=(0,c.useState)(!1),M=(0,c.useRef)(!1),N=(0,c.useRef)(null);return(0,c.useEffect)(()=>{M.current=A},[A]),(0,c.useEffect)(()=>{if(S.current)return N.current=new IntersectionObserver(e=>{let t=e[0];j(t.isIntersecting)},{threshold:.1}),N.current.observe(S.current),()=>{N.current&&=(N.current.disconnect(),null)}},[]),(0,c.useEffect)(()=>S.current?(k.current&&=(k.current(),null),(async()=>{if(!S.current||(await new Promise(e=>setTimeout(e,10)),!S.current))return;let c=new i({dpr:Math.min(window.devicePixelRatio,2),alpha:!0});w.current=c;let l=c.gl;for(l.canvas.style.width=`100%`,l.canvas.style.height=`100%`;S.current.firstChild;)S.current.removeChild(S.current.firstChild);S.current.appendChild(l.canvas);let u={iTime:{value:0},iResolution:{value:[1,1]},rayPos:{value:[0,0]},rayDir:{value:[0,1]},raysColor:{value:d(t)},raysSpeed:{value:n},lightSpread:{value:a},rayLength:{value:p},pulsating:{value:+!!m},fadeDistance:{value:h},saturation:{value:g},mousePos:{value:[.5,.5]},mouseInfluence:{value:v},noiseAmount:{value:y},distortion:{value:b}};C.current=u;let x=new o(l,{geometry:new s(l),program:new r(l,{vertex:`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`,fragment:`precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  
  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor  = color;
}`,uniforms:u})});O.current=x;let A=()=>{if(!S.current||!c)return;c.dpr=Math.min(window.devicePixelRatio,2);let{clientWidth:t,clientHeight:n}=S.current;c.setSize(t,n);let r=c.dpr,i=t*r,a=n*r;u.iResolution.value=[i,a];let{anchor:o,dir:s}=f(e,i,a);u.rayPos.value=o,u.rayDir.value=s},j=e=>{if(D.current=requestAnimationFrame(j),M.current&&!(!w.current||!C.current||!O.current)){if(u.iTime.value=e*.001,_&&v>0){let e=.92;E.current.x=E.current.x*e+T.current.x*(1-e),E.current.y=E.current.y*e+T.current.y*(1-e),u.mousePos.value=[E.current.x,E.current.y]}try{c.render({scene:x})}catch(e){console.warn(`WebGL rendering error:`,e);return}}};window.addEventListener(`resize`,A),A(),D.current=requestAnimationFrame(j),k.current=()=>{if(D.current&&=(cancelAnimationFrame(D.current),null),window.removeEventListener(`resize`,A),c)try{let e=c.gl.canvas,t=c.gl.getExtension(`WEBGL_lose_context`);t&&t.loseContext(),e&&e.parentNode&&e.parentNode.removeChild(e)}catch(e){console.warn(`Error during WebGL cleanup:`,e)}w.current=null,C.current=null,O.current=null}})(),()=>{k.current&&=(k.current(),null)}):void 0,[]),(0,c.useEffect)(()=>{if(!C.current||!S.current||!w.current)return;let r=C.current,i=w.current;r.raysColor.value=d(t),r.raysSpeed.value=n,r.lightSpread.value=a,r.rayLength.value=p,r.pulsating.value=+!!m,r.fadeDistance.value=h,r.saturation.value=g,r.mouseInfluence.value=v,r.noiseAmount.value=y,r.distortion.value=b;let{clientWidth:o,clientHeight:s}=S.current,c=i.dpr,{anchor:l,dir:u}=f(e,o*c,s*c);r.rayPos.value=l,r.rayDir.value=u},[t,n,a,e,p,m,h,g,v,y,b]),(0,c.useEffect)(()=>{let e=e=>{if(!S.current||!w.current)return;let t=S.current.getBoundingClientRect();T.current={x:(e.clientX-t.left)/t.width,y:(e.clientY-t.top)/t.height}};if(_)return window.addEventListener(`mousemove`,e),()=>window.removeEventListener(`mousemove`,e)},[_]),(0,l.jsx)(`div`,{ref:S,className:`light-rays-container ${x}`.trim()})};export{p as default};