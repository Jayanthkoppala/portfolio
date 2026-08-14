"use client";

/**
 * Interactive glossy obsidian 3x3x3 cube — vanilla three.js (no R3F),
 * explicit sizing so it can never fall back to the 300x150 default.
 * Idle float + sway; drag to spin; emerald rim light.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const COARSE_POINTER_QUERY = "(pointer: coarse)";

export default function Cube3D() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const initialWidth = host.clientWidth || 300;
    const initialHeight = host.clientHeight || 300;
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const coarsePointer = window.matchMedia(COARSE_POINTER_QUERY);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(initialWidth, initialHeight);
    renderer.domElement.style.cursor = coarsePointer.matches ? "default" : "grab";
    renderer.domElement.style.touchAction = "auto";
    renderer.domElement.style.userSelect = "none";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      30,
      initialWidth / initialHeight,
      0.1,
      100,
    );
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
    const geometry = new RoundedBoxGeometry(0.93, 0.93, 0.93, 5, 0.14);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0b,
      roughness: 0.16,
      metalness: 0.4,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        for (let z = -1; z <= 1; z += 1) {
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(x, y, z);
          group.add(mesh);
        }
      }
    }
    scene.add(group);

    let activePointerId: number | null = null;
    let previousX = 0;
    let previousY = 0;
    let userX = 0;
    let userY = 0;
    let elapsed = 0;
    let lastFrameTime = 0;
    let animationFrame = 0;
    let isInView = false;
    let isDocumentVisible = document.visibilityState === "visible";

    const renderFrame = () => {
      const idleTime = reducedMotion.matches ? 0 : elapsed;

      // The long, low-amplitude cycles read as ambient light movement rather
      // than a looping animation competing with the card content.
      group.rotation.y = 0.65 + Math.sin(idleTime * 0.16) * 0.28 + userY;
      group.rotation.x = 0.5 + Math.sin(idleTime * 0.12) * 0.055 + userX;
      group.position.y = Math.sin(idleTime * 0.34) * 0.045;
      renderer.render(scene, camera);
    };

    const shouldAnimate = () =>
      !reducedMotion.matches && isInView && isDocumentVisible;

    const stopAnimation = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      lastFrameTime = 0;
    };

    const loop = (now: number) => {
      if (!shouldAnimate()) {
        stopAnimation();
        return;
      }

      if (lastFrameTime) {
        elapsed += Math.min((now - lastFrameTime) / 1000, 0.05);
      }
      lastFrameTime = now;
      renderFrame();
      animationFrame = requestAnimationFrame(loop);
    };

    const syncAnimation = () => {
      if (shouldAnimate()) {
        if (!animationFrame) animationFrame = requestAnimationFrame(loop);
        return;
      }

      stopAnimation();
      renderFrame();
    };

    const endPointerInteraction = (pointerId?: number) => {
      if (
        pointerId !== undefined &&
        activePointerId !== null &&
        pointerId !== activePointerId
      ) {
        return;
      }

      const capturedPointerId = activePointerId;
      activePointerId = null;
      renderer.domElement.style.cursor = coarsePointer.matches
        ? "default"
        : "grab";

      if (
        capturedPointerId !== null &&
        renderer.domElement.hasPointerCapture(capturedPointerId)
      ) {
        renderer.domElement.releasePointerCapture(capturedPointerId);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (
        event.button !== 0 ||
        !event.isPrimary ||
        event.pointerType === "touch" ||
        coarsePointer.matches
      ) {
        return;
      }

      activePointerId = event.pointerId;
      previousX = event.clientX;
      previousY = event.clientY;
      renderer.domElement.setPointerCapture(event.pointerId);
      renderer.domElement.style.cursor = "grabbing";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) return;

      userY += (event.clientX - previousX) * 0.008;
      userX = THREE.MathUtils.clamp(
        userX + (event.clientY - previousY) * 0.008,
        -0.55,
        0.55,
      );
      previousX = event.clientX;
      previousY = event.clientY;

      // Reduced-motion and paused states have no RAF, so direct manipulation
      // explicitly paints one frame without starting a background loop.
      if (!animationFrame) renderFrame();
    };

    const onPointerEnd = (event: PointerEvent) => {
      endPointerInteraction(event.pointerId);
    };

    const onVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === "visible";
      if (!isDocumentVisible) endPointerInteraction();
      syncAnimation();
    };

    const onReducedMotionChange = () => {
      if (reducedMotion.matches) elapsed = 0;
      syncAnimation();
    };
    const onPointerCapabilityChange = () => {
      if (coarsePointer.matches) endPointerInteraction();
      renderer.domElement.style.cursor = coarsePointer.matches
        ? "default"
        : "grab";
    };

    const resizeObserver = new ResizeObserver(() => {
      const width = host.clientWidth || 300;
      const height = host.clientHeight || 300;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (!animationFrame) renderFrame();
    });

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (!isInView) endPointerInteraction();
        syncAnimation();
      },
      { threshold: 0.01 },
    );

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerEnd);
    renderer.domElement.addEventListener("pointercancel", onPointerEnd);
    renderer.domElement.addEventListener(
      "lostpointercapture",
      onPointerEnd,
    );
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", onReducedMotionChange);
    coarsePointer.addEventListener("change", onPointerCapabilityChange);
    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    renderFrame();

    return () => {
      stopAnimation();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onReducedMotionChange);
      coarsePointer.removeEventListener("change", onPointerCapabilityChange);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerEnd);
      renderer.domElement.removeEventListener("pointercancel", onPointerEnd);
      renderer.domElement.removeEventListener(
        "lostpointercapture",
        onPointerEnd,
      );
      if (host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={hostRef} className="h-full w-full" />;
}
