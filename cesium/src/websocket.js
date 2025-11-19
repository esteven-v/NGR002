import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

let stompClient = null;

export function connectWebSocket() {
  const socket = new SockJS("http://localhost:8080/ws");
  stompClient = Stomp.over(socket);

  stompClient.connect({}, (frame) => {
    console.log("WebSocket Connected:", frame);

    stompClient.subscribe("/topic/scenarios", (message) => {
      const body = JSON.parse(message.body);
      console.log(body);
    });
  }, (error) => {
    console.error("STOMP Error:", error);
  });
}

export function disconnectWebSocket() {
  if (stompClient) stompClient.disconnect();
  console.log("WebSocket disconnected");
}
