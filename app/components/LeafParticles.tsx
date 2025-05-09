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
  bladeWidth: number;
  bend: number;
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
      for (let i = 0; i < 25; i++) {
        newParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 25 + 20, // Longer grass blades
          speedX: Math.random() * 0.2 - 0.1, // Gentle horizontal movement
          speedY: Math.random() * 0.1 + 0.05, // Slight upward drift
          rotation: Math.random() * 20 - 10, // Initial bend angle
          rotationSpeed: Math.random() * 0.1 - 0.05, // Gentle swaying
          bladeWidth: Math.random() * 1.5 + 0.5, // Width of grass blade
          bend: Math.random() * 0.3 + 0.1 // How much the blade curves
        });
      }
      particles.current = newParticles;
    };
    createParticles();

    // Draw grass blade
    const drawGrassBlade = (x: number, y: number, size: number, rotation: number, bladeWidth: number, bend: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      
      // Create gradient for grass
      const gradient = ctx.createLinearGradient(0, 0, 0, -size);
      gradient.addColorStop(0, 'rgba(100, 200, 100, 0.2)'); // Base of grass (lighter green)
      gradient.addColorStop(1, 'rgba(50, 180, 50, 0.1)'); // Tip of grass (darker green)
      
      // Draw blade of grass with a curve
      ctx.beginPath();
      
      // Start at bottom of blade
      ctx.moveTo(-bladeWidth / 2, 0);
      
      // Draw left side of blade with a curve
      ctx.quadraticCurveTo(
        -bladeWidth - size * bend, // Control point X
        -size / 2, // Control point Y
        0, // End point X
        -size // End point Y
      );
      
      // Draw right side of blade with a curve
      ctx.quadraticCurveTo(
        bladeWidth + size * bend, // Control point X
        -size / 2, // Control point Y
        bladeWidth / 2, // End point X
        0 // End point Y
      );
      
      // Fill with gradient
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add thin line for blade edge
      ctx.strokeStyle = 'rgba(40, 160, 40, 0.1)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
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

        // Draw grass blade
        drawGrassBlade(
          particle.x,
          particle.y,
          particle.size,
          particle.rotation,
          particle.bladeWidth,
          particle.bend
        );
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