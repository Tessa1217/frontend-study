import { useCallback, useEffect, useRef } from "react";

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

export default function PageVisibilityTimer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentIndex = useRef(0);
  const intervalId = useRef<number | null>(null);
  const pageVisible = useRef<boolean>(true);

  // 활성 상태가 1초라면 그리기 위한 잔여 시간 변수
  const remainingTime = useRef<number>(0);
  const remainingIntervalId = useRef<number | null>(null);
  const lastVisibleTime = useRef<number>(Date.now());

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

  const drawNextLine = useCallback((ctx: CanvasRenderingContext2D) => {
    if (currentIndex.current < points.length - 1) {
      drawLine(
        ctx,
        points[currentIndex.current],
        points[currentIndex.current + 1]
      );
      currentIndex.current++;
      remainingTime.current = 1000;
      lastVisibleTime.current = Date.now();
    } else {
      drawLine(ctx, points[currentIndex.current], points[0]);
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    }
  }, []);

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

    intervalId.current = setInterval(() => drawNextLine(ctx), 1000);

    const handleVisibleChange = () => {
      // 페이지 비활성화 시
      if (document.hidden) {
        if (intervalId.current) {
          clearInterval(intervalId.current);
          intervalId.current = null;
          console.log("비활성화 탭으로 인한 중지");
        }
        if (remainingIntervalId.current) {
          clearInterval(remainingIntervalId.current);
          intervalId.current = null;
          console.log("비활성화 탭으로 잔여 인터벌 인한 중지");
        }

        const elapsed = Date.now() - lastVisibleTime.current;
        remainingTime.current = Math.max(remainingTime.current - elapsed, 0);
        console.log(
          `탭 비활성화로 인한 시간 정지, 잔여 시간은 ${remainingTime.current}ms`
        );
      } else {
        // 다시 활성화 상태가 되었을 때
        lastVisibleTime.current = Date.now();
        if (currentIndex.current < points.length && ctx) {
          remainingIntervalId.current = setTimeout(() => {
            drawNextLine(ctx);
            if (!intervalId.current) {
              intervalId.current = setInterval(() => drawNextLine(ctx), 1000);
            }
            console.log("활성화로 재개");
          }, remainingTime.current);
        }
      }
      console.log(
        `현재 탭의 활성화 여부: ${pageVisible.current ? "활성 상태" : "비활성 상태"}`
      );
    };

    document.addEventListener("visibilitychange", handleVisibleChange);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      if (remainingIntervalId.current) {
        clearInterval(remainingIntervalId.current);
      }
      document.removeEventListener("visibilitychange", handleVisibleChange);
    };
  }, [drawNextLine]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "1000px", height: "1000px" }}
    ></canvas>
  );
}
