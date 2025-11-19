import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

let stompClient = null;

export function connectWebSocket() {
  const socket = new SockJS("http://localhost:8080/ws");
  stompClient = Stomp.over(socket);

  // Called when connection is established
  stompClient.onConnect = (frame) => {
    console.log("WebSocket Connected:", frame);

    stompClient.subscribe("/topic/scenarios", (message) => {
      const body = JSON.parse(message.body);
      console.log(body);
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
