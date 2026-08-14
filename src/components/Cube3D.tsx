"use client";

/**
 * Interactive glossy obsidian 3x3x3 cube — vanilla three.js (no R3F),
 * explicit sizing so it can never fall back to the 300x150 default.
 * Idle float + sway; drag to spin; emerald rim light.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export default function Cube3D() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const w = host.clientWidth || 300;
    const h = host.clientHeight || 300;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100);
    camera.position.set(4.6, 3.4, 5.4);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const key = new THREE.SpotLight(0xffffff, 400, 0, 0.55, 0.9);
    key.position.set(-6, 9, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0x10b981, 80);
    rim.position.set(6, -1, -5);
    scene.add(rim);
    const fill = new THREE.PointLight(0xffffff, 40);
    fill.position.set(0, 4, 6);
    scene.add(fill);

    const group = new THREE.Group();
    const geo = new RoundedBoxGeometry(0.93, 0.93, 0.93, 5, 0.14);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0b,
      roughness: 0.16,
      metalness: 0.4,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          const m = new THREE.Mesh(geo, mat);
          m.position.set(x, y, z);
          group.add(m);
        }
    scene.add(group);

    // drag to spin
    let dragging = false;
    let px = 0,
      py = 0;
    let userX = 0,
      userY = 0;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      px = e.clientX;
      py = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      userY += (e.clientX - px) * 0.008;
      userX += (e.clientY - py) * 0.008;
      px = e.clientX;
      py = e.clientY;
    };
    const onUp = () => (dragging = false);
    renderer.domElement.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      const t = clock.getElapsedTime();
      group.rotation.y = 0.65 + Math.sin(t * 0.22) * 0.45 + userY;
      group.rotation.x = 0.5 + Math.sin(t * 0.17) * 0.07 + userX;
      group.position.y = Math.sin(t * 0.8) * 0.08;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onResize = () => {
      const nw = host.clientWidth || 300;
      const nh = host.clientHeight || 300;
      renderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      host.removeChild(renderer.domElement);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={hostRef} className="h-full w-full" />;
}
