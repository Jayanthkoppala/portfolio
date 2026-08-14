"use client";

/**
 * The hero name: JAYANTH KOPPALA with liquid emerald chrome flowing inside
 * the letterforms (mode D: faint field bleeds outside), plus cursor ripple
 * distortion bending the molten glyphs. Hand-written WebGL, zero deps.
 * A visually-hidden real <h1> keeps SEO/readers intact.
 */
import { useEffect, useRef } from "react";

const MAX_RIPPLES = 6;

const VS = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;
const FS = `precision highp float;
uniform vec2 R;uniform float T,REV;uniform vec4 RECT;uniform sampler2D M;
uniform vec4 RIP[${MAX_RIPPLES}]; /* x,y (buffer px, TL origin), t0, strength */
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.05;a*=.5;}return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/R;
 vec2 fragTL=vec2(gl_FragCoord.x, R.y-gl_FragCoord.y);
 /* cursor ripples displace the sampling position */
 vec2 disp=vec2(0.);
 for(int i=0;i<${MAX_RIPPLES};i++){
   vec2 d=fragTL-RIP[i].xy;
   float dist=length(d);
   float age=T-RIP[i].z;
   if(age>0.&&age<2.5&&RIP[i].w>0.){
     float wave=sin(dist*.045-age*7.)*exp(-dist*.006)*exp(-age*2.2);
     disp+=normalize(d+.001)*wave*26.*RIP[i].w;
   }
 }
 vec2 muv=(fragTL+disp-RECT.xy)/RECT.zw;
 float mask=0.;
 if(muv.x>0.&&muv.x<1.&&muv.y>0.&&muv.y<1.) mask=texture2D(M,muv).a;
 vec2 p=(uv+disp/R)*vec2(R.x/R.y,1.);
 float f1=fbm(p*2.2+vec2(T*.10,-T*.06));
 float f2=fbm(p*4.5-vec2(T*.05,T*.09)+f1*1.6);
 float band=sin((uv.x*1.1+uv.y*.7+f2*2.2)*6.2832+T*.7);
 float spec=pow(max(0.,band),6.);
 float spec2=pow(max(0.,sin((f1*7.0-T*.5))),10.);
 vec3 deep=vec3(.10,.14,.12);
 vec3 mid=mix(vec3(.22,.30,.26),vec3(.10,.85,.60),smoothstep(.2,.8,f2));
 vec3 col=mix(deep,mid,.5+.5*band);col*=1.6;
 col+=vec3(.93,.97,.94)*spec*1.25;
 col+=vec3(.43,.91,.72)*spec2*.8;
 float rise=smoothstep(0.,1.,REV);
 float edge=smoothstep(.02,.5,mask);
 vec3 oc=col*(.10+.90*edge);          /* mode D: strong inside, faint outside */
 float oa=(.28+.72*edge)*rise;
 gl_FragColor=vec4(oc,oa);
}`;

export default function MoltenName() {
  const hostRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const host = hostRef.current!;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);
    const gl = canvas.getContext("webgl", { premultipliedAlpha: false });
    if (!gl) return;

    const compile = (t: number, src: string) => {
      const s = gl.createShader(t)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    let maskTex: WebGLTexture | null = null;
    const makeMask = () => {
      const c = document.createElement("canvas");
      c.width = 2080;
      c.height = 800;
      const x = c.getContext("2d")!;
      // use the exact next/font family resolved on the hidden h1
      const fam = h1Ref.current
        ? getComputedStyle(h1Ref.current).fontFamily
        : "Anton, sans-serif";
      x.fillStyle = "#fff";
      x.font = `340px ${fam}`;
      x.textAlign = "center";
      x.textBaseline = "middle";
      x.fillText("JAYANTH", c.width / 2, 215);
      x.fillText("KOPPALA", c.width / 2, 585);
      const t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      maskTex = t;
    };
    document.fonts.ready.then(() => {
      makeMask();
      setTimeout(makeMask, 600);
    });

    // reveal
    const rev = { v: 0 };
    const t0 = performance.now();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ripples from cursor
    const ripples: { x: number; y: number; t0: number; s: number }[] = [];
    let lastAdd = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
      const now = performance.now();
      if (now - lastAdd < 90) return;
      lastAdd = now;
      const d = Math.min(devicePixelRatio, 2);
      ripples.push({ x: (e.clientX - r.left) * d, y: (e.clientY - r.top) * d, t0: (now - t0) / 1000, s: 0.8 });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    const onClick = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const d = Math.min(devicePixelRatio, 2);
      ripples.push({ x: (e.clientX - r.left) * d, y: (e.clientY - r.top) * d, t0: (performance.now() - t0) / 1000, s: 1.6 });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
    };
    canvas.parentElement?.addEventListener("pointerdown", onClick as EventListener);

    let raf = 0;
    const loop = (now: number) => {
      const t = (now - t0) / 1000;
      rev.v = reduced ? 1 : Math.min(1, Math.max(0, (t - 0.25) / 1.5));
      const w = host.clientWidth, hgt = host.clientHeight;
      const d = Math.min(devicePixelRatio, 2);
      if (canvas.width !== w * d) { canvas.width = w * d; canvas.height = hgt * d; }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (maskTex) {
        gl.useProgram(prog);
        gl.enableVertexAttribArray(0);
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.uniform2f(gl.getUniformLocation(prog, "R"), canvas.width, canvas.height);
        gl.uniform1f(gl.getUniformLocation(prog, "T"), t);
        gl.uniform1f(gl.getUniformLocation(prog, "REV"), rev.v);
        const nb = h1Ref.current!.getBoundingClientRect();
        const cv = canvas.getBoundingClientRect();
        gl.uniform4f(
          gl.getUniformLocation(prog, "RECT"),
          (nb.left - cv.left) * d, (nb.top - cv.top) * d, nb.width * d, nb.height * d
        );
        const rip = new Float32Array(MAX_RIPPLES * 4);
        for (let i = 0; i < MAX_RIPPLES; i++) {
          const rp = ripples[i];
          if (rp) { rip[i*4] = rp.x; rip[i*4+1] = rp.y; rip[i*4+2] = rp.t0; rip[i*4+3] = rp.s; }
        }
        gl.uniform4fv(gl.getUniformLocation(prog, "RIP"), rip);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, maskTex);
        gl.uniform1i(gl.getUniformLocation(prog, "M"), 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      host.removeChild(canvas);
    };
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0">
      {/* real text for SEO/readers; also the geometry anchor for the mask */}
      <h1
        ref={h1Ref}
        className="absolute left-1/2 top-[44%] w-[min(92vw,1300px)] -translate-x-1/2 -translate-y-1/2 text-center text-transparent select-none"
        style={{
          fontFamily: "var(--font-anton)",
          aspectRatio: "2.6/1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 0.84,
          fontSize: "clamp(3rem,12.6vw,12.4rem)",
          letterSpacing: "0.01em",
        }}
      >
        Jayanth Koppala
      </h1>
    </div>
  );
}
