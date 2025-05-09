'use client';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

export default function LeafParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create initial particles
    const createParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 20 + 15,
          speedX: Math.random() * 0.3 - 0.15,
          speedY: Math.random() * 0.2 + 0.1,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 0.5 - 0.25
        });
      }
      particles.current = newParticles;
    };
    createParticles();

    // Draw leaf shape
    const drawLeaf = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      
      // Draw leaf body
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.8); // Start at top
      
      // Left side of leaf
      ctx.bezierCurveTo(
        -size * 0.5, -size * 0.8, // Control point 1
        -size * 0.8, -size * 0.4, // Control point 2
        -size * 0.4, 0 // End point
      );
      
      // Bottom curve
      ctx.bezierCurveTo(
        -size * 0.2, size * 0.4, // Control point 1
        0, size * 0.6, // Control point 2
        size * 0.4, 0 // End point
      );
      
      // Right side of leaf
      ctx.bezierCurveTo(
        size * 0.8, -size * 0.4, // Control point 1
        size * 0.5, -size * 0.8, // Control point 2
        0, -size * 0.8 // End point
      );
      
      // Add leaf stem
      ctx.moveTo(0, 0);
      ctx.lineTo(0, size * 0.8);
      
      // Set leaf color and style
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Fill leaf with semi-transparent color
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fill();
      
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        // Wrap around screen
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;

        // Draw leaf
        drawLeaf(particle.x, particle.y, particle.size, particle.rotation);
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
} 