"use client";

/**
 * Ambient morphing-blob background. Blobs drift, rotate and morph their
 * border-radius; a grain overlay (in globals.css) kills banding.
 * Pure CSS animation — near-zero render cost.
 */
export default function AuroraField({
  className = "",
  dim = false,
}: {
  className?: string;
  dim?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`grain pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: dim ? 0.5 : 1 }}
    >
      <div className="aurora-blob b1" />
      <div className="aurora-blob b2" />
      <div className="aurora-blob b3" />
      <style jsx>{`
        .aurora-blob {
          position: absolute;
          filter: blur(90px);
          will-change: transform, border-radius;
          animation: drift 26s ease-in-out infinite alternate;
        }
        .b1 {
          width: 55vw;
          height: 55vw;
          left: -12vw;
          top: -18vw;
          background: radial-gradient(
            circle at 40% 40%,
            rgba(16, 185, 129, 0.32),
            transparent 65%
          );
          border-radius: 42% 58% 61% 39% / 45% 40% 60% 55%;
        }
        .b2 {
          width: 44vw;
          height: 44vw;
          right: -14vw;
          top: 4vw;
          background: radial-gradient(
            circle at 60% 40%,
            rgba(5, 150, 105, 0.2),
            transparent 65%
          );
          border-radius: 58% 42% 39% 61% / 50% 60% 40% 50%;
          animation-duration: 32s;
          animation-delay: -8s;
        }
        .b3 {
          width: 38vw;
          height: 38vw;
          left: 28vw;
          bottom: -22vw;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(56, 130, 246, 0.13),
            transparent 65%
          );
          border-radius: 39% 61% 58% 42% / 60% 45% 55% 40%;
          animation-duration: 38s;
          animation-delay: -15s;
        }
        @keyframes drift {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            border-radius: 42% 58% 61% 39% / 45% 40% 60% 55%;
          }
          50% {
            border-radius: 61% 39% 42% 58% / 55% 60% 40% 45%;
          }
          100% {
            transform: translate(4vw, 3vw) rotate(28deg) scale(1.12);
            border-radius: 39% 61% 58% 42% / 60% 45% 55% 40%;
          }
        }
      `}</style>
    </div>
  );
}
