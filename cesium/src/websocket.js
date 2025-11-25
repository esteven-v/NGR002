import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

let stompClient = null;

export function connectWebSocket() {
  const socket = new SockJS("http://localhost:8080/ws");
  stompClient = Stomp.over(socket);

  stompClient.onConnect = (frame) => {
    console.log("WebSocket Connected:", frame);

    stompClient.subscribe("/topic/scenarios", (message) => {
      const body = JSON.parse(JSON.parse(message.body)); // double parse if needed

      // Append event to scenario dashboard
      const scenarioDiv = document.createElement("div");
      scenarioDiv.textContent = `Event ${body.type} with ${body.polygonCoords}`;
      document.getElementById("scenario-status").appendChild(scenarioDiv);

      console.log("Received scenario event:", body);

      // --- Update Cesium map dynamically ---
      if (window.viewer) {
        try {
          const coords = body.polygonCoords.split(";").map(pair => {
            const [lon, lat] = pair.trim().split(",").map(Number);
            return Cesium.Cartesian3.fromDegrees(lon, lat);
          });

          window.viewer.entities.add({
            name: body.type,
            polygon: {
              hierarchy: new Cesium.PolygonHierarchy(coords),
              material: Cesium.Color.RED.withAlpha(0.5),
              outline: true,
              outlineColor: Cesium.Color.BLACK
            }
          });
        } catch (e) {
          console.error("Error creating polygon from event:", e);
        }
      }
    });
  };

  stompClient.onStompError = (error) => {
    console.error("STOMP Error:", error);
  };

  // Optional: reconnect on close
  stompClient.onWebSocketClose = () => {
    console.log("WebSocket closed. Attempting to reconnect in 5s...");
    setTimeout(connectWebSocket, 5000);
  };

  stompClient.activate();
}

export function disconnectWebSocket() {
  if (stompClient) {
    stompClient.deactivate();
    console.log("WebSocket disconnected");
  }
}