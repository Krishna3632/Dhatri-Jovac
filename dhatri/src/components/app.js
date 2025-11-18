// import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:8000/ws");

ws.onmessage("open", () => {
  console.log("✅ Connected");
  ws.send("Hello Server!");
});

ws.onmessage("message", (data) => {
  console.log("📩 Received:", data.toString());
});
