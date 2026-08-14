"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import img1 from '../assets/gallery-1.jpg';
import img2 from '../assets/gallery-2.jpg';
import img3 from '../assets/gallery-3.jpg';
import img4 from '../assets/gallery-4.jpg';
import img5 from '../assets/gallery-5.jpg';

const useIsStaticRenderer = () => false;

const DEFAULT_SLIDES = [
    {
        image: {
            src: img1,
            alt: "Mpho Mokwena - Stretch & Structure 01"
        },
        title: "01 · Movement",
    },
    {
        image: {
            src: img2,
            alt: "Mpho Mokwena - Motion Jump 02"
        },
        title: "02 · Energy",
    },
    {
        image: {
            src: img3,
            alt: "Mpho Mokwena - Soft Portrait 03"
        },
        title: "03 · Editorial",
    },
    {
        image: {
            src: img4,
            alt: "Mpho Mokwena - Low Angle Expression 04"
        },
        title: "04 · Expression",
    },
    {
        image: {
            src: img5,
            alt: "Mpho Mokwena - Outdoor Elegance 05"
        },
        title: "05 · Presence",
    },
];

// Fixed internals
const PERSPECTIVE = 1600;
const SCALE_STEP = 0.16;
const MAX_VISIBLE = 2;
const DEPTH = 240;

function cssTransition(t) {
    const dur = t && typeof t.duration === "number" ? t.duration : 0.6;
    let ease = "cubic-bezier(0.22, 1, 0.36, 1)";
    const e = t?.ease;
    if (Array.isArray(e) && e.length === 4) {
        ease = `cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`;
    } else if (typeof e === "string") {
        const map = {
            linear: "linear",
            easeIn: "ease-in",
            easeOut: "ease-out",
            easeInOut: "ease-in-out",
        };
        ease = map[e] || "ease";
    }
    return { dur, ease };
}

function __OriginkitBase_Smooth3DSlideshow(props) {
    props = { ...COMPONENT_DEFAULTS, ...props };
    const {
        slides = DEFAULT_SLIDES,
        cardWidth: userCardWidth = 400,
        cardHeight: userCardHeight = 400,
        radius = 3,
        tilt = 12,
        sideTilt = 8,
        gap = 8,
        opacity = 60,
        transition,
        autoplay = false,
        autoplayDirection = "rightToLeft",
        showTitle = true,
        titleFont,
        titleColor = "#ffffff",
        titlePosition,
        style,
    } = props;

    // Responsive scaling hook
    const [screenScale, setScreenScale] = useState(1);
    useEffect(() => {
        const updateScale = () => {
            if (window.innerWidth < 480) {
                setScreenScale(0.65);
            } else if (window.innerWidth < 768) {
                setScreenScale(0.82);
            } else {
                setScreenScale(1);
            }
        };
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    const cardWidth = Math.round(userCardWidth * screenScale);
    const cardHeight = Math.round(userCardHeight * screenScale);

    const tp = titlePosition || {};
    const corner = tp.position || "bottomLeft";
    const isTop = corner === "topLeft" || corner === "topRight";
    const isRight = corner === "topRight" || corner === "bottomRight";
    const padLeft = tp.paddingLeft ?? 22;
    const padRight = tp.paddingRight ?? 22;
    const padTop = tp.paddingTop ?? 24;
    const padBottom = tp.paddingBottom ?? 24;

    const isStatic = useIsStaticRenderer();
    
    // Filter slides to substitute invalid blob: URLs or empty image sources with valid defaults
    const processedSlides = (slides && slides.length ? slides : DEFAULT_SLIDES)
        .map((s, idx) => {
            const rawSrc = s.image?.src;
            const isInvalid = !rawSrc || rawSrc.startsWith("blob:");
            if (isInvalid) {
                const fallbackSlide = DEFAULT_SLIDES[idx % DEFAULT_SLIDES.length];
                return {
                    ...s,
                    image: { ...s.image, src: fallbackSlide.image.src },
                    title: s.title && s.title !== "Title" ? s.title : fallbackSlide.title,
                };
            }
            return s;
        });

    const list = processedSlides.length > 0 ? processedSlides : DEFAULT_SLIDES;
    const n = list.length;

    const loop = true;
    const [active, setActive] = useState(0);

    useEffect(() => {
        setActive((a) => Math.max(0, Math.min(n - 1, a)));
    }, [n]);

    const moveDur =
        transition && typeof transition.duration === "number"
            ? transition.duration
            : 0.6;
    const lockRef = useRef(false);
    const lock = useCallback(() => {
        lockRef.current = true;
        window.setTimeout(
            () => {
                lockRef.current = false;
            },
            Math.max(50, moveDur * 1000)
        );
    }, [moveDur]);

    const step = useCallback(
        (dir) => {
            if (lockRef.current) return;
            lock();
            setActive((a) => (((a + dir) % n) + n) % n);
        },
        [n, lock]
    );

    const handleCardClick = useCallback(
        (i) => {
            if (isStatic || autoplay || lockRef.current) return;
            lock();
            setActive((a) => (i === a ? (a + 1) % n : i));
        },
        [isStatic, autoplay, n, lock]
    );

    const delay =
        transition && typeof transition.delay === "number"
            ? transition.delay
            : 2.5;
    useEffect(() => {
        if (isStatic || !autoplay || n < 2) return;
        const ms = Math.max(0.3, delay) * 1000;
        const dir = autoplayDirection === "leftToRight" ? -1 : 1;
        const id = window.setInterval(() => step(dir), ms);
        return () => window.clearInterval(id);
    }, [isStatic, autoplay, autoplayDirection, delay, n, step]);

    const onKeyDown = useCallback(
        (e) => {
            if (e.key === "ArrowRight") {
                e.preventDefault();
                step(1);
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                step(-1);
            }
        },
        [step]
    );

    // Swipe gestures
    const touchStartRef = useRef(0);
    const handleTouchStart = (e) => {
        touchStartRef.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e) => {
        const diff = touchStartRef.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            step(diff > 0 ? 1 : -1);
        }
    };

    const { dur, ease } = cssTransition(transition);
    const transitionCss = `transform ${dur}s ${ease}, opacity ${dur}s ${ease}`;

    const effectiveRadius =
        (Math.max(0, Math.min(20, radius)) / 20) *
        (Math.min(cardWidth, cardHeight) / 2);
    const dim = 1 - Math.max(0, Math.min(100, opacity)) / 100;

    const rootStyle = {
        ...(style || {}),
        position: "relative",
        width: "100%",
        height: "100%",
        minWidth: 320,
        minHeight: Math.max(380, cardHeight + 100),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: `${PERSPECTIVE}px`,
        overflow: "hidden",
        outline: "none",
    };

    return (
        <div
            style={rootStyle}
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            onKeyDown={isStatic ? undefined : onKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div
                style={{
                    position: "relative",
                    width: cardWidth,
                    height: cardHeight,
                    transformStyle: "preserve-3d",
                }}
            >
                {list.map((slide, i) => {
                    let rel = i - active;
                    if (loop) {
                        if (rel > n / 2) rel -= n;
                        if (rel < -n / 2) rel += n;
                    }
                    const ax = Math.abs(rel);
                    const visible = ax <= MAX_VISIBLE;
                    const isActive = rel === 0;
                    const sc = Math.max(0.4, 1 - ax * SCALE_STEP);
                    const tx = rel * (gap * 30 * screenScale);
                    const tz = -ax * DEPTH;
                    const ry = -rel * tilt;
                    const rz = rel * sideTilt;
                    const src = slide.image?.src || "";

                    const cardStyle = {
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: cardWidth,
                        height: cardHeight,
                        borderRadius: effectiveRadius,
                        overflow: "hidden",
                        transformStyle: "preserve-3d",
                        transformOrigin: "center center",
                        transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
                        transition: transitionCss,
                        opacity: visible ? 1 : 0,
                        cursor: autoplay || isActive ? "default" : "pointer",
                        pointerEvents:
                            visible && !isStatic && !autoplay ? "auto" : "none",
                        backgroundColor: "#1a1a1a",
                        boxShadow: isActive
                            ? "0 20px 50px rgba(0,0,0,0.8), 0 0 25px rgba(201,166,107,0.25)"
                            : "0 10px 30px rgba(0,0,0,0.5)",
                    };

                    return (
                        <div
                            key={i}
                            style={cardStyle}
                            onClick={
                                isStatic ? undefined : () => handleCardClick(i)
                            }
                            aria-label={slide.title}
                            aria-hidden={!visible}
                        >
                            {src ? (
                                <img
                                    src={src}
                                    alt={slide.image?.alt || slide.title || ""}
                                    draggable={false}
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                        userSelect: "none",
                                    }}
                                />
                            ) : null}

                            {showTitle && slide.title && (
                                <>
                                    {/* Gradient overlay for legibility */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: isTop
                                                ? "linear-gradient(0deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.75) 100%)"
                                                : "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.75) 100%)",
                                            pointerEvents: "none",
                                        }}
                                    />

                                    {/* Title display */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: padLeft,
                                            right: padRight,
                                            [isTop ? "top" : "bottom"]: isTop
                                                ? padTop
                                                : padBottom,
                                            textAlign: isRight
                                                ? "right"
                                                : "left",
                                            pointerEvents: "none",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: titleColor,
                                                fontSize: Math.round(24 * screenScale),
                                                fontWeight: 700,
                                                lineHeight: "1.1em",
                                                letterSpacing: "-0.02em",
                                                whiteSpace: "pre-line",
                                                textShadow:
                                                    "0 2px 10px rgba(0,0,0,0.6)",
                                                ...(titleFont || {}),
                                            }}
                                        >
                                            {slide.title}
                                        </span>
                                    </div>
                                </>
                            )}

                            {/* Dim overlay for inactive cards */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "#000000",
                                    opacity: isActive ? 0 : dim,
                                    transition: `opacity ${dur}s ${ease}`,
                                    pointerEvents: "none",
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Navigation arrow buttons */}
            <button
                onClick={() => step(-1)}
                aria-label="Previous Slide"
                style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(15, 15, 15, 0.75)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(201, 166, 107, 0.4)",
                    color: "var(--gold, #c9a66b)",
                    fontSize: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(201, 166, 107, 0.25)";
                    e.currentTarget.style.borderColor = "var(--gold, #c9a66b)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(15, 15, 15, 0.75)";
                    e.currentTarget.style.borderColor = "rgba(201, 166, 107, 0.4)";
                }}
            >
                &#8249;
            </button>

            <button
                onClick={() => step(1)}
                aria-label="Next Slide"
                style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(15, 15, 15, 0.75)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(201, 166, 107, 0.4)",
                    color: "var(--gold, #c9a66b)",
                    fontSize: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(201, 166, 107, 0.25)";
                    e.currentTarget.style.borderColor = "var(--gold, #c9a66b)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(15, 15, 15, 0.75)";
                    e.currentTarget.style.borderColor = "rgba(201, 166, 107, 0.4)";
                }}
            >
                &#8250;
            </button>

            {/* Pagination indicators */}
            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "8px",
                    zIndex: 10,
                }}
            >
                {list.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (!lockRef.current) {
                                lock();
                                setActive(i);
                            }
                        }}
                        aria-label={`Go to slide ${i + 1}`}
                        style={{
                            width: active === i ? "24px" : "8px",
                            height: "8px",
                            borderRadius: "4px",
                            backgroundColor: active === i ? "var(--gold, #c9a66b)" : "rgba(255, 255, 255, 0.3)",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

const COMPONENT_DEFAULTS = {
    slides: DEFAULT_SLIDES,
    cardWidth: 400,
    cardHeight: 400,
    radius: 3,
    tilt: 12,
    sideTilt: 8,
    gap: 8,
    opacity: 60,
    autoplay: false,
    autoplayDirection: "rightToLeft",
    transition: {
        type: "tween",
        duration: 0.6,
        delay: 2.5,
        ease: [0.22, 1, 0.36, 1],
    },
    showTitle: true,
    titleFont: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
        fontSize: "24px",
        letterSpacing: "-0.02em",
        lineHeight: "1.1em",
    },
    titleColor: "#ffffff",
    titlePosition: {
        position: "bottomLeft",
        paddingLeft: 22,
        paddingRight: 22,
        paddingTop: 24,
        paddingBottom: 24,
    },
};

const __originkitPresetProps = {
    slides: DEFAULT_SLIDES,
    autoplay: true,
    showTitle: true
};

export default function Smooth3DSlideshow(props) {
    return <__OriginkitBase_Smooth3DSlideshow {...__originkitPresetProps} {...props} />;
}
