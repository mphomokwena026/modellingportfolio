import { useEffect, useRef } from 'react';

export default function Hero() {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrollY * 0.22}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="cover">
      <div className="cover-bg" ref={bgRef} id="coverBg" />

      <div className="cover-content">
        <p className="eyebrow cover-issue">Vol. I · 2026 · Johannesburg</p>

        <h1 className="cover-name" aria-label="Mpho Mokwena">
          <span className="cover-name-line">Mpho</span>
          <span className="cover-name-line">Mokwena</span>
        </h1>

        <p className="cover-tagline">Model · Creative · Digital Professional</p>
      </div>

      <div className="cover-scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
