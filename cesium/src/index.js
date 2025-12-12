import {
  Ion,
  Viewer,
  Terrain,
  createOsmBuildingsAsync,
  Cartesian3,
  Math as CesiumMath,
  ImageryLayer,
  OpenStreetMapImageryProvider
} from "cesium";
import "cesium/Widgets/widgets.css";
import "../src/css/main.css";
import { connectWebSocket, disconnectWebSocket } from './websocket.js';

Ion.defaultAccessToken = "put token here";

let viewer;

/**
 * @desc keep track of created scenarios
 */
const scenarios = {};

/**
 * @desc create cesium map with OpenStreetMap layer and position camera
 * @return {none} - sets window.viewer to created cesium viewer instance
 */
async function initCesium() {
  viewer = new Viewer("cesiumContainer", {
    baseLayer: new ImageryLayer(new OpenStreetMapImageryProvider({
      url: "https://tile.openstreetmap.org/"
    })),
  });

  // Load OSM buildings

  
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-96.016, 41.247, 400),
    orientation: {
      heading: CesiumMath.toRadians(0.0),
      pitch: CesiumMath.toRadians(-15.0),
    },
  });
  

  // Make viewer globally accessible for WebSocket updates
  window.viewer = viewer;
}

/**
 * @desc Main async entry point
 */
async function main() {
  await initCesium();
  connectWebSocket();
}

main();

/**
 * @desc disconnects websocket when window is closed
 */
window.addEventListener("beforeunload", () => {
  disconnectWebSocket();
});
/**
 *  @type {button} - HTML button
 *  @desc Submits event information from dashboard 
 */
const addBtn = document.getElementById("add-scenario-btn");

/**
 * @desc pushes a scenario update
 * @listens {click} listen event when user adds a scenario
 * @param {string} scenario_type - scenario color
 * @param {string} scenario_coords - scenario coordinates (1 or 4 points depending on if it's a area or single point)
 * 
 */
addBtn.addEventListener("click", () => {
  const type = document.getElementById("scenario-type").value.trim();
  const coordsStr = document.getElementById("scenario-coords").value.trim();
  const colorChoice = document.getElementById("scenario-color").value;
  const actionType = document.getElementById("action-type").value;

  // fetch request here
  fetch("http://localhost:8080/"+actionType, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "polygonCoords": coordsStr,
      "polygonColor": colorChoice,
      "name": type
    }),
  })
});
