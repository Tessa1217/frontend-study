import { useState } from "react";

const FIB_NUM = 45;

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export default function FibonacciCalculator() {
  const [status, setStatus] = useState("Before Calculation...");
  const [result, setResult] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const startCalculation = () => {
    setIsCalculating(true);
    setStatus("Calculating... (UI will freeze!)");
    setResult(null);

    setTimeout(() => {
      const fib = fibonacci(FIB_NUM);
      setResult(`Result: ${fib}`);
      setStatus(`Calculation complete! Fibonacci: ${fib}`);
      setIsCalculating(false);
    }, 0);
  };

  const startCalculationWithWorker = () => {
    setIsCalculating(true);
    setStatus("Calculating... (UI is still responsive!)");
    setResult(null);
    const worker = new Worker(new URL("./worker.ts", import.meta.url));

    worker.onmessage = function (event) {
      const { result } = event.data;
      setResult(result);
      setStatus(`Calculation completed with web worker`);
      setIsCalculating(false);
      worker.terminate();
    };

    worker.postMessage({ num: FIB_NUM });
  };

  return (
    <div>
      <h1>Fibonacci Number Calculation (Web Worker Example)</h1>
      <button
        onClick={startCalculationWithWorker}
        disabled={isCalculating}
        style={{ padding: "8px 16px", fontSize: 16 }}
      >
        Start Fibonacci Calculation (With Web Worker)
      </button>
      <p id="status">{status}</p>
      <p id="result">{result}</p>
      <input type="text" />
      <h1>Fibonacci Number Calculation (Blocking Example)</h1>
      <button
        onClick={startCalculation}
        disabled={isCalculating}
        style={{ padding: "8px 16px", fontSize: 16 }}
      >
        Start Fibonacci Calculation (Calculation ran on main thread)
      </button>
      <p id="status">{status}</p>
      <p id="result">{result}</p>
      <input type="text" />
    </div>
  );
}
