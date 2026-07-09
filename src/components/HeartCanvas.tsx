"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  type: "heart" | "particle";
  rotation?: number;
  rotationSpeed?: number;
  scaleSpeed?: number;
}

export interface HeartCanvasRef {
  triggerHeartRain: () => void;
}

export const HeartCanvas = forwardRef<HeartCanvasRef, { density?: number }>(
  ({ density = 15 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>(0);

    const drawHeart = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number,
      color: string,
      rotation: number = 0
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      
      // Draw heart path
      const width = size;
      const height = size;
      
      ctx.moveTo(0, -height / 4);
      // Top-left curve
      ctx.bezierCurveTo(-width / 2, -height / 1.5, -width, -height / 3, -width, 0);
      // Bottom-left curve
      ctx.bezierCurveTo(-width, height / 3, -width / 2, height / 1.5, 0, height);
      // Bottom-right curve
      ctx.bezierCurveTo(width / 2, height / 1.5, width, height / 3, width, 0);
      // Top-right curve
      ctx.bezierCurveTo(width, -height / 3, width / 2, -height / 1.5, 0, -height / 4);
      
      ctx.fillStyle = color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.globalAlpha = opacity;
      ctx.fill();
      ctx.restore();
    };

    const drawGlowParticle = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number,
      color: string
    ) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
      ctx.globalAlpha = opacity;
      ctx.fill();
      ctx.restore();
    };

    const createParticle = (
      canvasWidth: number,
      canvasHeight: number,
      spawnAtBottom = false,
      isRain = false
    ): Particle => {
      const type = Math.random() > 0.4 ? "particle" : "heart";
      const colors = ["#ff2e93", "#ff6b8b", "#ff007f", "#ff85a2", "#ffb7b2"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const size = type === "heart" 
        ? Math.random() * 12 + 6 
        : Math.random() * 3 + 1;

      return {
        x: Math.random() * canvasWidth,
        y: spawnAtBottom 
          ? canvasHeight + 20 
          : isRain 
            ? -20 
            : Math.random() * canvasHeight,
        size,
        speedY: isRain 
          ? Math.random() * 4 + 3 // fast falling
          : type === "heart" 
            ? -(Math.random() * 0.8 + 0.3) // slowly rising
            : -(Math.random() * 0.4 + 0.1), // very slowly rising
        speedX: isRain
          ? Math.random() * 2 - 1 
          : Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.6 + 0.2,
        color,
        type,
        rotation: type === "heart" ? Math.random() * Math.PI * 2 : undefined,
        rotationSpeed: type === "heart" ? (Math.random() * 0.02 - 0.01) : undefined
      };
    };

    const triggerHeartRain = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rainCount = 100; // lots of hearts falling!
      const rainParticles: Particle[] = [];
      const colors = ["#ff007f", "#ff2e93", "#ff6b8b", "#ffccd5", "#ff85a2"];

      for (let i = 0; i < rainCount; i++) {
        rainParticles.push({
          x: Math.random() * canvas.width,
          y: -(Math.random() * canvas.height * 0.5) - 20, // stagger spawn heights above viewport
          size: Math.random() * 16 + 8,
          speedY: Math.random() * 4 + 3,
          speedX: Math.random() * 2 - 1,
          opacity: Math.random() * 0.7 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: "heart",
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: Math.random() * 0.04 - 0.02
        });
      }

      particlesRef.current = [...particlesRef.current, ...rainParticles];
    };

    useImperativeHandle(ref, () => ({
      triggerHeartRain,
    }));

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

      // Initial particles
      const initialParticles: Particle[] = [];
      for (let i = 0; i < density; i++) {
        initialParticles.push(createParticle(canvas.width, canvas.height, false));
      }
      particlesRef.current = initialParticles;

      const updateAndDraw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Manage total particles (clean up if too many, maintain minimum)
        const activeParticles = particlesRef.current.filter((p) => {
          // Keep if within bounds
          if (p.speedY < 0) {
            // Rising particles
            return p.y > -30;
          } else {
            // Falling rain particles
            return p.y < canvas.height + 30;
          }
        });

        // Replenish standard rising particles if needed
        const standardCount = activeParticles.filter(p => p.speedY < 0).length;
        if (standardCount < density) {
          activeParticles.push(createParticle(canvas.width, canvas.height, true));
        }

        particlesRef.current = activeParticles.map((p) => {
          // Update position
          p.x += p.speedX;
          p.y += p.speedY;

          // Update rotation
          if (p.rotation !== undefined && p.rotationSpeed !== undefined) {
            p.rotation += p.rotationSpeed;
          }

          // Draw particle
          if (p.type === "heart") {
            drawHeart(ctx, p.x, p.y, p.size, p.opacity, p.color, p.rotation);
          } else {
            drawGlowParticle(ctx, p.x, p.y, p.size, p.opacity, p.color);
          }

          return p;
        });

        animationFrameRef.current = requestAnimationFrame(updateAndDraw);
      };

      updateAndDraw();

      return () => {
        window.removeEventListener("resize", resizeCanvas);
        cancelAnimationFrame(animationFrameRef.current);
      };
    }, [density]);

    return (
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-10"
        style={{ mixBlendMode: "screen" }}
      />
    );
  }
);

HeartCanvas.displayName = "HeartCanvas";
