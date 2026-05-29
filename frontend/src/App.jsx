import { useEffect, useState } from "react";
import { checkHealth } from "./api/healthApi";

function App() {
  const [status, setStatus] = useState("checking ...");

  useEffect(() => {
    async function testBackend() {
      try {
        const data = await checkHealth();
        console.log("Backend response: ", data);
        setStatus(data.status);
      } catch (error) {
        console.error("Backend connection failed:", error);
        setStatus("failed");
      }
    }
    testBackend();
  }, []);
  return (
    <div style={{ padding: "24px" }}>
      <h1>Membrane Digital Twin</h1>
      <p>Backend status: {status}</p>
    </div>
  );
}

export default App;
