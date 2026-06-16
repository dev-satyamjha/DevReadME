import { useEffect, useRef } from "react";

export default function CursorBubbles() {
  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const bubbles = useRef([]);
  const mouse = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dot = dotRef.current;
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
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
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(88, 166, 255, ${this.life})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.life * 0.5})`;
        ctx.stroke();
      }
    }

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onDblClick = (e) => {
      for (let i = 0; i < 30; i++) {
        bubbles.current.push(new Bubble(e.clientX, e.clientY));
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("dblclick", onDblClick);

    let dotX = mouse.current.x;
    let dotY = mouse.current.y;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dotX += (mouse.current.x - dotX) * 0.2;
      dotY += (mouse.current.y - dotY) * 0.2;

      if (dot) {
        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }

      for (let i = 0; i < bubbles.current.length; i++) {
        bubbles.current[i].update();
        bubbles.current[i].draw();
      }

      bubbles.current = bubbles.current.filter((b) => b.life > 0);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("dblclick", onDblClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          background: "var(--accent-color, #ff2200)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999999,
          mixBlendMode: "difference",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 999998,
        }}
      />
    </>
  );
}
