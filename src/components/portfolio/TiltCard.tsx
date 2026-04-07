import { useRef, useCallback, type ReactNode, type CSSProperties } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxTilt?: number;   // degrees
  glare?: boolean;
  scale?: number;
}

/**
 * 3D mouse-tracked perspective tilt.
 * Wraps any element — no extra deps.
 */
export default function TiltCard({
  children,
  className = '',
  style,
  maxTilt = 14,
  glare = true,
  scale = 1.04,
}: TiltCardProps) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);   // -1 … +1
    const dy     = (e.clientY - cy) / (rect.height / 2);   // -1 … +1

    const rotX   = -dy * maxTilt;
    const rotY   =  dx * maxTilt;

    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
    card.style.transition = 'transform 0.08s linear';

    if (glare && glareRef.current) {
      // Glare spot tracks cursor
      const glareX = ((e.clientX - rect.left) / rect.width)  * 100;
      const glareY = ((e.clientY - rect.top)  / rect.height) * 100;
      glareRef.current.style.background =
        `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.14) 0%, transparent 65%)`;
    }
  }, [maxTilt, scale, glare]);

  const onLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    if (glare && glareRef.current) {
      glareRef.current.style.background = 'transparent';
    }
  }, [glare]);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform', ...style }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-all duration-150"
          style={{ borderRadius: 'inherit' }}
        />
      )}
    </div>
  );
}
