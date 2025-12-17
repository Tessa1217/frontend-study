import { useEffect, useRef } from "react";

const points = [
  { x: 100, y: 100, label: "A" },
  { x: 300, y: 100, label: "B" },
  { x: 500, y: 100, label: "C" },
  { x: 700, y: 100, label: "D" },
  { x: 900, y: 100, label: "E" },
  { x: 900, y: 300, label: "F" },
  { x: 700, y: 300, label: "G" },
  { x: 500, y: 300, label: "H" },
  { x: 300, y: 300, label: "I" },
  { x: 100, y: 300, label: "J" },
];

export default function Timer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentIndex = useRef(0);

  const lastTime = useRef<number | null>(null);

  // 점 그리기
  const drawPoint = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
  };

  // 점에 대한 라벨 생성 (A, B, C...)
  const drawLabel = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    label: string
  ) => {
    ctx.font = "32px Arial";
    ctx.fillText(label, x - 10, y + 50);
  };

  // 점을 잇는 선 그리기
  const drawLine = (
    ctx: CanvasRenderingContext2D,
    start: { x: number; y: number; label: string },
    end: { x: number; y: number; label: string }
  ) => {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  };

  // main thread 점유를 위한 무거운 연산
  const heavyComputation = () => {
    let sum = 0;
    for (let i = 0; i < 2e9; i++) {
      sum += 1;
    }
    return sum;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // scale 기준
    const scaleFactor = window.devicePixelRatio || 1;
    canvas.width = 1000 * scaleFactor;
    canvas.height = 1000 * scaleFactor;
    ctx.scale(scaleFactor, scaleFactor);

    points.forEach((p) => {
      drawPoint(ctx, p.x, p.y);
      drawLabel(ctx, p.x, p.y, p.label);
    });

    lastTime.current = performance.now();

    const timer = setInterval(() => {
      const now = performance.now();
      if (lastTime.current !== null) {
        const diff = now - lastTime.current;
        console.log(`Actual delay: ${diff.toFixed(2)}ms`);
      }
      lastTime.current = now;

      heavyComputation();

      if (currentIndex.current >= points.length - 1) {
        drawLine(ctx, points[currentIndex.current], points[0]);
        clearInterval(timer);
        return;
      }

      drawLine(
        ctx,
        points[currentIndex.current],
        points[currentIndex.current + 1]
      );
      currentIndex.current = currentIndex.current + 1;
    }, 1000);

    return () => {
      clearInterval(timer);
      currentIndex.current = 0;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "1000px", height: "1000px" }}
    ></canvas>
  );
}
