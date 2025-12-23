import { useEffect, useRef, useState } from "react";

export default function WebSocketSharedWorker() {
  const [status, setStatus] = useState("Connecting to server...");
  const [received, setReceived] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const workerRef = useRef<SharedWorker | null>(null);

  useEffect(() => {
    const sharedWorker = new SharedWorker(
      new URL("./sharedWorker.ts", import.meta.url)
    );

    workerRef.current = sharedWorker;

    sharedWorker.port.onmessage = (event: MessageEvent) => {
      setReceived((prev) => [...prev, event.data]);
      setStatus("Connected");
    };

    return () => {
      sharedWorker.port.close();
    };
  }, []);

  const sendMessage = () => {
    if (workerRef.current && input) {
      workerRef.current.port.postMessage(input);
      setInput("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>WebSocket SharedWorker Demo</h1>
      <p>Status: {status}</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />
      <button onClick={sendMessage} style={{ marginLeft: 8 }}>
        Send
      </button>
      <div style={{ marginTop: 24 }}>
        <strong>Received messages:</strong>
        <ul>
          {received.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
