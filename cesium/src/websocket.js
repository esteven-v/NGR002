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
      const body = JSON.parse(JSON.parse(message.body));
      const newRow = "<tr>\n<td>"+body.type+"</td>\n<td>"+body.polygonCoords+"</td>\n</tr>";
     // var p = document.createElement("p")
      var r = document.createTextNode("event "+body.type+" with "+body.polygonCoords)
      //p.appendChild(r)
      const scenarios = document.getElementById("scenario-status")
      scenarios.appendChild(r);
      
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
