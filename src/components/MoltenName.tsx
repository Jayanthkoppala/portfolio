"use client";

/**
 * The hero identity lockup: a monumental, readable JAY signature with the
 * full name set crisply beneath it. WebGL supplies the finish; semantic and
 * visible text remain available when WebGL or forced colors are unavailable.
 */
import { useEffect, useRef } from "react";

const MAX_RIPPLES = 6;

const VS = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;
const FS = `precision highp float;
uniform vec2 R;uniform float T,REV,DARK;uniform vec4 RECT;uniform sampler2D M;
uniform vec4 RIP[${MAX_RIPPLES}];
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.05;a*=.5;}return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/R;
 vec2 fragTL=vec2(gl_FragCoord.x,R.y-gl_FragCoord.y);
 vec2 disp=vec2(0.);
 for(int i=0;i<${MAX_RIPPLES};i++){
   vec2 d=fragTL-RIP[i].xy;
   float dist=length(d);
   float age=T-RIP[i].z;
   if(age>0.&&age<2.5&&RIP[i].w>0.){
     float wave=sin(dist*.045-age*7.)*exp(-dist*.006)*exp(-age*2.2);
     disp+=normalize(d+.001)*wave*22.*RIP[i].w;
   }
 }
 vec2 muv=(fragTL+disp-RECT.xy)/RECT.zw;
 float mask=0.;
 if(muv.x>0.&&muv.x<1.&&muv.y>0.&&muv.y<1.) mask=texture2D(M,muv).a;
 vec2 p=(uv+disp/R)*vec2(R.x/R.y,1.);
 float f1=fbm(p*2.15+vec2(T*.075,-T*.045));
 float f2=fbm(p*4.25-vec2(T*.04,T*.065)+f1*1.55);
 float band=sin((uv.x*1.05+uv.y*.68+f2*2.05)*6.2832+T*.54);
 float spec=pow(max(0.,band),7.);
 float spec2=pow(max(0.,sin(f1*7.-T*.38)),11.);
 vec3 deep=mix(vec3(.018,.12,.08),vec3(.09,.18,.135),DARK);
 vec3 base=mix(vec3(.025,.25,.165),vec3(.075,.26,.18),DARK);
 vec3 jewel=mix(vec3(.02,.48,.31),vec3(.025,.63,.40),DARK);
 vec3 mid=mix(base,jewel,smoothstep(.18,.82,f2));
 vec3 col=mix(deep,mid,.58+.24*band)*mix(1.04,1.2,DARK);
 vec3 softSpec=mix(vec3(.035,.31,.21),vec3(.55,.76,.66),DARK);
 vec3 emeraldSpec=mix(vec3(.02,.48,.30),vec3(.16,.78,.50),DARK);
 col+=softSpec*spec*.52;
 col+=emeraldSpec*spec2*.58;
 float rise=smoothstep(0.,1.,REV);
 float edge=smoothstep(.03,.52,mask);
 vec3 oc=col*(.06+.94*edge);
 float oa=(.07+.93*edge)*rise;
 gl_FragColor=vec4(oc,oa);
}`;

type Ripple = { x: number; y: number; t0: number; strength: number };

export default function MoltenName() {
  const hostRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const mark = markRef.current;
    if (!host || !mark || matchMedia("(forced-colors: active)").matches) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;pointer-events:none";
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      canvas.remove();
      return;
    }

    const shaders: WebGLShader[] = [];
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      shaders.push(shader);
      return shader;
    };

    const vertexShader = compile(gl.VERTEX_SHADER, VS);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, FS);
    const program = gl.createProgram();
    if (!vertexShader || !fragmentShader || !program) {
      shaders.forEach((shader) => gl.deleteShader(shader));
      canvas.remove();
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      shaders.forEach((shader) => gl.deleteShader(shader));
      gl.deleteProgram(program);
      canvas.remove();
      return;
    }

    const buffer = gl.createBuffer();
    if (!buffer) {
      shaders.forEach((shader) => gl.deleteShader(shader));
      gl.deleteProgram(program);
      canvas.remove();
      return;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const uniforms = {
      resolution: gl.getUniformLocation(program, "R"),
      time: gl.getUniformLocation(program, "T"),
      reveal: gl.getUniformLocation(program, "REV"),
      dark: gl.getUniformLocation(program, "DARK"),
      rect: gl.getUniformLocation(program, "RECT"),
      ripples: gl.getUniformLocation(program, "RIP"),
      mask: gl.getUniformLocation(program, "M"),
    };
    const rippleBuffer = new Float32Array(MAX_RIPPLES * 4);
    const ripples: Ripple[] = [];
    const startedAt = performance.now();
    const reducedMotion = matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = matchMedia(
      "(any-hover: hover) and (any-pointer: fine)"
    ).matches;
    let maskTexture: WebGLTexture | null = null;
    let raf = 0;
    let inView = true;
    let pageVisible = !document.hidden;
    let darkMode = document.documentElement.classList.contains("dark");
    let latestTime = startedAt;
    let lastRippleAt = 0;
    let disposed = false;
    let geometry = { x: 0, y: 0, width: 1, height: 1 };

    const syncGeometry = () => {
      const hostRect = host.getBoundingClientRect();
      const headingRect = mark.getBoundingClientRect();
      geometry = {
        x: headingRect.left - hostRect.left,
        y: headingRect.top - hostRect.top,
        width: headingRect.width,
        height: headingRect.height,
      };
    };

    const draw = (now: number) => {
      latestTime = now;
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const bufferWidth = Math.round(width * dpr);
      const bufferHeight = Math.round(height * dpr);
      if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
        canvas.width = bufferWidth;
        canvas.height = bufferHeight;
        syncGeometry();
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (!maskTexture) return;

      const seconds = (now - startedAt) / 1000;
      const reveal = reducedMotion
        ? 1
        : Math.min(1, Math.max(0, (seconds - 0.2) / 1.35));
      rippleBuffer.fill(0);
      for (let index = 0; index < Math.min(ripples.length, MAX_RIPPLES); index++) {
        const ripple = ripples[index];
        rippleBuffer[index * 4] = ripple.x;
        rippleBuffer[index * 4 + 1] = ripple.y;
        rippleBuffer[index * 4 + 2] = ripple.t0;
        rippleBuffer[index * 4 + 3] = ripple.strength;
      }

      gl.useProgram(program);
      gl.enableVertexAttribArray(0);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.time, seconds);
      gl.uniform1f(uniforms.reveal, reveal);
      gl.uniform1f(uniforms.dark, darkMode ? 1 : 0);
      gl.uniform4f(
        uniforms.rect,
        geometry.x * dpr,
        geometry.y * dpr,
        geometry.width * dpr,
        geometry.height * dpr
      );
      gl.uniform4fv(uniforms.ripples, rippleBuffer);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, maskTexture);
      gl.uniform1i(uniforms.mask, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const reconcileMotion = () => {
      if (reducedMotion) {
        stop();
        draw(latestTime);
      } else if (inView && pageVisible && !raf) {
        raf = requestAnimationFrame(loop);
      } else if (!inView || !pageVisible) {
        stop();
      }
    };

    const makeMask = () => {
      if (disposed) return;
      const mask = document.createElement("canvas");
      mask.width = 1800;
      mask.height = 680;
      const context = mask.getContext("2d");
      if (!context) return;
      const family = getComputedStyle(mark).fontFamily || "Anton, sans-serif";
      context.fillStyle = "#fff";
      context.font = `900px ${family}`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.save();
      context.translate(mask.width / 2, mask.height / 2);
      context.scale(1.22, 1);
      context.fillText("JAY", 0, 0);
      context.restore();

      const texture = gl.createTexture();
      if (!texture) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        mask
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      if (maskTexture) gl.deleteTexture(maskTexture);
      maskTexture = texture;
      syncGeometry();
      draw(performance.now());
      mark.style.color = "transparent";
      reconcileMotion();
    };

    const addRipple = (event: PointerEvent, strength: number) => {
      const bounds = canvas.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      ) {
        return;
      }
      const now = performance.now();
      if (strength < 1 && now - lastRippleAt < 100) return;
      lastRippleAt = now;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ripples.push({
        x: (event.clientX - bounds.left) * dpr,
        y: (event.clientY - bounds.top) * dpr,
        t0: (now - startedAt) / 1000,
        strength,
      });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
    };
    const onPointerMove = (event: PointerEvent) => addRipple(event, 0.65);
    const onPointerDown = (event: PointerEvent) => addRipple(event, 1.25);
    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      reconcileMotion();
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      stop();
      mark.style.removeProperty("color");
    };

    const resizeObserver = new ResizeObserver(() => {
      syncGeometry();
      if (reducedMotion) draw(performance.now());
    });
    resizeObserver.observe(host);
    resizeObserver.observe(mark);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        reconcileMotion();
      },
      { rootMargin: "120px" }
    );
    intersectionObserver.observe(host);
    const themeObserver = new MutationObserver(() => {
      darkMode = document.documentElement.classList.contains("dark");
      if (reducedMotion) draw(performance.now());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    document.addEventListener("visibilitychange", onVisibilityChange);
    canvas.addEventListener("webglcontextlost", onContextLost);
    if (finePointer && !reducedMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
    }

    syncGeometry();
    void document.fonts.ready.then(makeMask);
    reconcileMotion();

    return () => {
      disposed = true;
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      if (maskTexture) gl.deleteTexture(maskTexture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      shaders.forEach((shader) => gl.deleteShader(shader));
      canvas.remove();
    };
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0">
      <h1 id="hero-title" className="sr-only">
        Jayanth “Jay” Koppala
      </h1>
      <div className="hero-lockup absolute left-1/2 top-[36%] flex w-[min(84vw,920px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center sm:top-[40%]">
        <div
          ref={markRef}
          aria-hidden
          className="hero-wordmark grid w-full select-none place-items-center text-center text-ink"
          style={{
            fontFamily: "var(--font-anton)",
            aspectRatio: "45 / 17",
            lineHeight: 0.8,
            fontSize: "clamp(7rem, 34vw, 24rem)",
            letterSpacing: "0.01em",
          }}
        >
          JAY
        </div>
        <p
          aria-hidden
          className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-ink sm:text-xs"
        >
          Jayanth Koppala
        </p>
      </div>
    </div>
  );
}
