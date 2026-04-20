import { useState } from "react";

export default function App() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const send = async () => {
    if (!msg.trim()) return;

    try {
      const response = await fetch("https://cognitia-ai-chat.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: msg }),
      });

      const data = await response.json();

      setChat((prev) => [
        ...prev,
        { question: msg, answer: data.answer }
      ]);

      setMsg("");
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { question: msg, answer: "Error connecting to server" }
      ]);
    }
  };

  const clearChat = () => {
    setChat([]);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f4f4f4"
    }}>
      <div style={{
        width: "400px",
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center" }}>AI Chat App 🤖</h2>

        <div style={{
          height: "300px",
          overflowY: "auto",
          marginBottom: "10px",
          border: "1px solid #ddd",
          padding: "10px"
        }}>
          {chat.map((c, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <div><b>You:</b> {c.question}</div>
              <div><b>AI:</b> {c.answer}</div>
            </div>
          ))}
        </div>

        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type your question..."
          style={{ width: "70%", padding: "8px" }}
        />

        <button onClick={send} style={{ marginLeft: "5px" }}>
          Send
        </button>

        <button onClick={clearChat} style={{ marginLeft: "5px" }}>
          Clear
        </button>
      </div>
    </div>
  );
}