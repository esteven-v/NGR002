import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import {
  Ion,
  Viewer,
  Terrain,
  createOsmBuildingsAsync,
  Cartesian3,
  Math as CesiumMath,
  Color,
  PolygonHierarchy,
  Cartographic,
  LabelStyle,
  VerticalOrigin,
  Cartesian2
} from "cesium";
import "cesium/Widgets/widgets.css";

/**
 * @type {stompClient}
 * @desc websocket client
 */
let stompClient = null;

/**
 * @desc start websocket and subscribe to scenarios topic, edits map based on received events
 */
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
      if(body.type == "AREA_CREATED") {
        let polygonColor;
        switch (body.polygonColor) {
          case "green":
            polygonColor = Color.GREEN.withAlpha(0.5);
            break;
          case "red":
            polygonColor = Color.RED.withAlpha(0.5);
            break;
          case "yellow":
            polygonColor = Color.YELLOW.withAlpha(0.5);
            break;
          default:
            polygonColor = Color.BLUE.withAlpha(0.5);
        }

        // --- Update Cesium map dynamically ---
        if (window.viewer) {
          try {
            const coords = body.polygonCoords.split(";").map(pair => {
              const [lon, lat] = pair.trim().split(",").map(Number);
              return Cartesian3.fromDegrees(lat, lon);
            });

            const area = window.viewer.entities.add({
              name: body.type+": "+body.name,
              polygon: {
                hierarchy: new PolygonHierarchy(coords),
                material: polygonColor,
                outline: true,
                outlineColor: Color.BLACK
              }
            });

           window.viewer.zoomTo(window.viewer.entities);
          } catch (e) {
            console.error("Error creating polygon from event:", e);
          }
        }
      } else if(body.type == "UNIT_ADDED") {
        let polygonColor;
        switch (body.polygonColor) {
          case "green":
            polygonColor = Color.GREEN.withAlpha(0.5);
            break;
          case "red":
            polygonColor = Color.RED.withAlpha(0.5);
            break;
          case "yellow":
            polygonColor = Color.YELLOW.withAlpha(0.5);
            break;
          default:
            polygonColor = Color.BLUE.withAlpha(0.5);
        }
        const [lon, lat] = body.polygonCoords.trim().split(',').map(Number)
        const coords = Cartesian3.fromDegrees(lat, lon);
        const point = window.viewer.entities.add({
          name: body.name,
          position: coords,
          point: {
            pixelSize: 15,
            color: polygonColor,
            outlineColor: Color.WHITE,
            outlineWidth: 2,
          },
          label: {
            text: body.name,
            font: "14pt monospace",
            style: LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            pixelOffset: new Cartesian2(0, -9),
            verticalOrigin: VerticalOrigin.BOTTOM
          }
        });
        window.viewer.zoomTo(window.viewer.entities);
        //window.viewer.zoomTo(point);
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

/**
 * @desc disconnect from websocket
 */
export function disconnectWebSocket() {
  if (stompClient) {
    stompClient.deactivate();
    console.log("WebSocket disconnected");
  }
}