import { useState } from "react";

function QueryInterface() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const runQuery = async () => {
    setError(null);
    setResult(null);
    try {
      const response = await fetch("http://flask-app-production-de06.up.railway.app/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      if (data.error) setError(data.error);
      else setResult(data);
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Database Query Interface</h2>
      <textarea
        style={{ width: "100%", height: "100px", marginBottom: "10px" }}
        placeholder="Enter your SQL query (SELECT only)..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></textarea>
      <button onClick={runQuery} style={{ padding: "10px", background: "blue", color: "white" }}>
        Run Query
      </button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {result && (
        <pre style={{ background: "#f4f4f4", padding: "10px", overflowX: "auto" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default QueryInterface;