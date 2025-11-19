import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export function connectWebSocket(onMessage) {
  // Create a new STOMP client
  stompClient = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    debug: (str) => console.log(str), // optional: logs STOMP debug messages
  });

  // Called when connection is established
  stompClient.onConnect = (frame) => {
    console.log("WebSocket Connected:", frame);

    stompClient.subscribe("/topic/scenarios", (message) => {
      const body = JSON.parse(message.body);
      onMessage(body); // send message to Cesium
    });
  };

  // Called on error
  stompClient.onStompError = (error) => {
    console.error("STOMP Error:", error);
  };

  // Activate the connection
  stompClient.activate();
}

export function disconnectWebSocket() {
  if (stompClient) {
    stompClient.deactivate();
    console.log("WebSocket disconnected");
  }
}
