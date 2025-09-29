import { useState, type JSX } from "react";
import "./App.css";
import StyledBoxes from "./components/StyledBoxes";
import ZeroRuntimeBoxes from "./components/ZeroRuntimeBoxes";
function App() {
  const [scenario, setScenario] = useState<JSX.Element | null>(null);

  const run = (Comp: any, name: string) => {
    const N = 3000;
    const K = 5;

    // Mount time
    const t0 = performance.now();
    setScenario(<Comp N={N} variantSeed={0} />);
    const height = document.body.offsetHeight;
    console.log(`${height} set`);
    const t1 = performance.now();

    console.log(`${name} Mount: ${(t1 - t0).toFixed(2)}ms`);

    // Update loop
    let total = 0;
    let seed = 1;
    const loop = () => {
      if (seed > K) {
        console.log(`${name} Update avg: ${(total / K).toFixed(2)}ms`);
        return;
      }
      const u0 = performance.now();
      setScenario(<Comp N={N} variantSeed={seed} />);
      const height = document.body.offsetHeight;
      console.log(`${height} set`);
      const u1 = performance.now();
      total += u1 - u0;
      seed++;
      requestAnimationFrame(loop);
    };
    loop();
  };

  return (
    <div>
      <h1>CSS-in-JS Benchmark</h1>
      <button onClick={() => run(StyledBoxes, "Styled-components")}>
        Run Styled
      </button>
      <button onClick={() => run(ZeroRuntimeBoxes, "Vanilla Extract")}>
        Run Vanilla Extract
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,24px)",
          gap: 4,
        }}
      >
        {scenario}
      </div>
    </div>
  );
}

export default App;
