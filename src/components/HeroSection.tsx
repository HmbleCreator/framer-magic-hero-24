import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useWritingEffect } from "@/hooks/use-writing-effect";
import { useSlideReveal } from "@/hooks/use-slide-reveal";

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Writing effect for badge
  const badgeEffect = useWritingEffect("Automated Lead Generation", {
    speed: 80,
    delay: 500,
    trigger: "scroll",
  });

  // Slide reveal for content
  const headlineReveal = useSlideReveal({ delay: 800, duration: 1200, trigger: "scroll" });
  const subtitleReveal = useSlideReveal({ delay: 1200, duration: 1000, trigger: "scroll" });
  const buttonsReveal = useSlideReveal({ delay: 1600, duration: 800, trigger: "scroll" });

  // Star particles
  interface StarParticle {
    x: number;
    y: number;
    z: number;
    size: number;
    speed: number;
    color: string;
  }
  const stars: StarParticle[] = [];
  const createStar = (): StarParticle => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, z: 0, size: 0, speed: 0, color: "" };
    return {
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * 100 + 10,
      size: 2,
      speed: (Math.random() * 6 + 2) * 0.67,
      color: "rgb(255,255,255)",
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    for (let i = 0; i < 1000; i++) stars.push(createStar());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 - 6;
      const offsetX = mouseRef.current.x * 0.05;
      const offsetY = mouseRef.current.y * 0.05;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z += star.speed;

        if (star.z >= 3000) {
          stars[i] = createStar();
          continue;
        }

        const projectedX = centerX + ((star.x + offsetX * (1000 / star.z)) / star.z) * 1000;
        const projectedY = centerY + ((star.y + offsetY * (1000 / star.z)) / star.z) * 1000;
        const opacity = Math.min(1.0, 2500 / star.z);

        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(projectedX, projectedY, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Starfield - now behind the void */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[5] pointer-events-none" />

      {/* Center circles wrapper */}
      <div className="absolute inset-0 flex items-center justify-center z-1 pointer-events-none">
        {/* Big black void circle - behind rotating circles but above stars */}
        <div className="absolute w-80 sm:w-96 h-80 sm:h-96 bg-black rounded-full z-[10]" 
             style={{ backgroundColor: '#000000' }} />

        {/* Big rotating circle - in front of black void */}
        <div
          className="w-[406px] h-[406px] block overflow-hidden gap-[3px] absolute rounded-[363px] animate-spin-reverse blur-sm z-[15]"
          style={{
            background: "linear-gradient(229deg, #df7afe 23%, rgba(201, 110, 240, 0) 35%, rgba(164, 92, 219, 0) 64%, rgb(129, 74, 200) 88%)",
            animationDuration: "8s" }}
        />

        {/* Small rotating circle - in front of black void */}
        <div
          className="w-[300px] h-[300px] block overflow-hidden absolute z-[16] rounded-[363px] animate-spin blur-sm"
          style={{
            background: "linear-gradient(141deg, #df7afe 13%, rgba(201, 110, 240, 0) 35.0235827429153%, rgba(164, 92, 219, 0) 64.17244225559735%, rgb(129, 74, 200) 88%)",
            animationDuration: "6s",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-5xl mx-auto px-4 sm:px-6">
        {/* Badge */}
        <div className="inline-flex items-center bg-orbit-purple/20 backdrop-blur-sm border border-orbit-purple/30 rounded-full px-4 py-2 mb-8 sm:mb-12">
          <span className="bg-orbit-purple text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
            New
          </span>
          <span ref={badgeEffect.ref} className="ml-2 text-orbit-text-primary text-xs sm:text-sm font-medium">
            {badgeEffect.displayedText}
            {badgeEffect.isWriting && <span className="writing-cursor" />}
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineReveal.ref as React.RefObject<HTMLHeadingElement>}
          className={`text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-orbit-text-primary mb-6 sm:mb-8 leading-tight ${
            headlineReveal.isRevealed ? "slide-reveal" : "opacity-0"
          }`}
        >
          Intelligent Automation for <br className="hidden lg:block" /> Modern Businesses.
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleReveal.ref as React.RefObject<HTMLParagraphElement>}
          className={`text-sm sm:text-lg text-orbit-text-muted mb-10 sm:mb-14 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed ${
            subtitleReveal.isRevealed ? "slide-reveal-delayed" : "opacity-0"
          }`}
        >
          ObrIT Labs brings AI automation to your fingertips & streamline tasks.
        </p>

        {/* Buttons */}
        <div
          ref={buttonsReveal.ref as React.RefObject<HTMLDivElement>}
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 ${
            buttonsReveal.isRevealed ? "slide-reveal-buttons" : "opacity-0"
          }`}
        >
          <Link to="/contact">
            <Button
              variant="orbit"
              size="lg"
              className="font-medium text-sm sm:text-base"
              style={{
                boxSizing: 'border-box',
                width: 'min-content',
                height: 'min-content',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '9px 13px 9px 13px',
                  boxShadow: '0px 0.7065919983928324px 0.7065919983928324px -0.625px rgba(0, 0, 0, 0.15), 0px 1.8065619053231785px 1.8065619053231785px -1.25px rgba(0, 0, 0, 0.14), 0px 3.6217592146567767px 3.6217592146567767px -1.875px rgba(0, 0, 0, 0.14), 0px 6.8655999097303715px 6.8655999097303715px -2.5px rgba(0, 0, 0, 0.13), 0px 13.646761411524492px 13.646761411524492px -3.125px rgba(0, 0, 0, 0.1), 0px 30px 30px -3.75px rgba(0, 0, 0, 0.05)',
                  overflow: 'visible',
                  alignContent: 'center',
                  flexWrap: 'nowrap',
                  gap: '10px',
                  /* removed absolute positioning so the button participates in flex layout */
                  borderRadius: '6px',
                  border: '1px solid var(--token-6839e435-35f3-4ab3-b723-e98c27e525bc, rgba(255, 255, 255, 0.1))'
              }}
            >
              Get in touch <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>

          <a href="#services">
            <Button
              variant="outline"
              size="lg"
              className="font-medium text-sm sm:text-base"
              style={{
                boxSizing: 'border-box',
                width: 'min-content',
                height: 'min-content',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              View services
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;