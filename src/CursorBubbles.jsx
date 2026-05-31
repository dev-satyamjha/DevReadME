import React, { useEffect, useRef } from 'react';

export default function CursorBubbles() {
  const canvasRef = useRef(null);
  const bubbles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Bubble {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 2;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.015;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size += 0.15;
      }
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(88, 166, 255, ${this.life})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.life * 0.5})`;
        ctx.stroke();
      }
    }

    const handleDoubleClick = (e) => {
      // Burst 30 bubbles on double click
      for (let i = 0; i < 30; i++) {
        bubbles.current.push(new Bubble(e.clientX, e.clientY));
      }
    };

    window.addEventListener('dblclick', handleDoubleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < bubbles.current.length; i++) {
        bubbles.current[i].update();
        bubbles.current[i].draw(ctx);
      }
      
      bubbles.current = bubbles.current.filter(bubble => bubble.life > 0);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('dblclick', handleDoubleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999
      }}
    />
  );
}
