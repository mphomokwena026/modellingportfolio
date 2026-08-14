import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const canUseCursor = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;

    if (!canUseCursor) return;

    const handleMouseMove = (e) => {
      if (cursorRef.current && glowRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} id="cursor" />
      <div className="cursor-glow" ref={glowRef} id="cursorGlow" />
    </>
  );
}
