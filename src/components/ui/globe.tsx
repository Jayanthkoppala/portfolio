"use client"

import { useCallback, useEffect, useRef } from "react"
import createGlobe, { type COBEOptions } from "cobe"

import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400
const AUTO_ROTATION_SPEED = 0.06
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"
const COARSE_POINTER_QUERY = "(pointer: coarse)"

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const activePointerIdRef = useRef<number | null>(null)
  const previousPointerXRef = useRef(0)
  const rotationTargetRef = useRef(0)
  const rotationCurrentRef = useRef(0)
  const reducedMotionRef = useRef(false)
  const coarsePointerRef = useRef(false)
  const renderOnDemandRef = useRef<() => void>(() => {})

  const updateCursor = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (coarsePointerRef.current) {
      canvas.style.cursor = "default"
    } else if (activePointerIdRef.current !== null) {
      canvas.style.cursor = "grabbing"
    } else {
      canvas.style.cursor = "grab"
    }
  }, [])

  const endPointerInteraction = useCallback((pointerId?: number) => {
    if (
      pointerId !== undefined &&
      activePointerIdRef.current !== null &&
      pointerId !== activePointerIdRef.current
    ) {
      return
    }

    const canvas = canvasRef.current
    const capturedPointerId = activePointerIdRef.current
    activePointerIdRef.current = null
    updateCursor()

    if (
      canvas &&
      capturedPointerId !== null &&
      canvas.hasPointerCapture(capturedPointerId)
    ) {
      canvas.releasePointerCapture(capturedPointerId)
    }
  }, [updateCursor])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY)
    const coarsePointer = window.matchMedia(COARSE_POINTER_QUERY)
    reducedMotionRef.current = reducedMotion.matches
    coarsePointerRef.current = coarsePointer.matches
    phiRef.current = config.phi
    updateCursor()

    widthRef.current = canvas.offsetWidth
    const rect = canvas.getBoundingClientRect()
    let isInView =
      rect.bottom > 0 &&
      rect.right > 0 &&
      rect.top < window.innerHeight &&
      rect.left < window.innerWidth
    let isDocumentVisible = document.visibilityState === "visible"
    let lastFrameTime = 0
    let globeIsRunning = true
    let destroyed = false

    const shouldAnimate = () =>
      !reducedMotionRef.current && isInView && isDocumentVisible

    const globe = createGlobe(canvas, {
      ...config,
      width: widthRef.current * config.devicePixelRatio,
      height: widthRef.current * config.devicePixelRatio,
      onRender: (state) => {
        const now = performance.now()
        const delta = lastFrameTime
          ? Math.min((now - lastFrameTime) / 1000, 0.05)
          : 0
        lastFrameTime = now

        if (shouldAnimate()) {
          if (activePointerIdRef.current === null) {
            phiRef.current += delta * AUTO_ROTATION_SPEED
          }

          const follow = 1 - Math.exp(-10 * delta)
          rotationCurrentRef.current +=
            (rotationTargetRef.current - rotationCurrentRef.current) * follow
        } else {
          rotationCurrentRef.current = rotationTargetRef.current
        }

        state.phi = phiRef.current + rotationCurrentRef.current
        state.width = widthRef.current * config.devicePixelRatio
        state.height = widthRef.current * config.devicePixelRatio
        config.onRender(state)
      },
    })

    const renderOnDemand = () => {
      if (!destroyed && !globeIsRunning) globe.render()
    }
    renderOnDemandRef.current = renderOnDemand

    const syncRendering = () => {
      const nextRunningState = shouldAnimate()
      if (nextRunningState === globeIsRunning) {
        if (!nextRunningState) renderOnDemand()
        return
      }

      globeIsRunning = nextRunningState
      lastFrameTime = 0
      globe.toggle(nextRunningState)
      if (!nextRunningState) renderOnDemand()
    }

    const onVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === "visible"
      if (!isDocumentVisible) endPointerInteraction()
      syncRendering()
    }

    const onReducedMotionChange = () => {
      reducedMotionRef.current = reducedMotion.matches
      syncRendering()
    }

    const onPointerCapabilityChange = () => {
      coarsePointerRef.current = coarsePointer.matches
      if (coarsePointer.matches) endPointerInteraction()
      updateCursor()
    }

    const resizeObserver = new ResizeObserver(() => {
      widthRef.current = canvas.offsetWidth
      renderOnDemand()
    })

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting
        if (!isInView) endPointerInteraction()
        syncRendering()
      },
      { threshold: 0.01 },
    )

    document.addEventListener("visibilitychange", onVisibilityChange)
    reducedMotion.addEventListener("change", onReducedMotionChange)
    coarsePointer.addEventListener("change", onPointerCapabilityChange)
    resizeObserver.observe(canvas)
    intersectionObserver.observe(canvas)
    syncRendering()

    const revealTimer = window.setTimeout(() => {
      if (!destroyed) canvas.style.opacity = "1"
    }, 0)

    return () => {
      destroyed = true
      window.clearTimeout(revealTimer)
      renderOnDemandRef.current = () => {}
      intersectionObserver.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      reducedMotion.removeEventListener("change", onReducedMotionChange)
      coarsePointer.removeEventListener("change", onPointerCapabilityChange)
      globe.destroy()
    }
  }, [config, endPointerInteraction, updateCursor])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-150",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full cursor-grab touch-auto select-none opacity-0 transition-opacity duration-500 active:cursor-grabbing motion-reduce:transition-none contain-[layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(event) => {
          if (
            event.button !== 0 ||
            !event.isPrimary ||
            event.pointerType === "touch" ||
            coarsePointerRef.current
          ) {
            return
          }

          activePointerIdRef.current = event.pointerId
          previousPointerXRef.current = event.clientX
          event.currentTarget.setPointerCapture(event.pointerId)
          updateCursor()
        }}
        onPointerMove={(event) => {
          if (event.pointerId !== activePointerIdRef.current) return

          const delta = event.clientX - previousPointerXRef.current
          previousPointerXRef.current = event.clientX
          rotationTargetRef.current += delta / MOVEMENT_DAMPING

          if (reducedMotionRef.current) {
            rotationCurrentRef.current = rotationTargetRef.current
          }
          renderOnDemandRef.current()
        }}
        onPointerUp={(event) => endPointerInteraction(event.pointerId)}
        onPointerCancel={(event) => endPointerInteraction(event.pointerId)}
        onLostPointerCapture={(event) =>
          endPointerInteraction(event.pointerId)
        }
      />
    </div>
  )
}
