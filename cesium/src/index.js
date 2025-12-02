import {
  Ion,
  Viewer,
  Terrain,
  createOsmBuildingsAsync,
  Cartesian3,
  Math as CesiumMath,
  Color,
  PolygonHierarchy,
  Cartographic
} from "cesium";
import "cesium/Widgets/widgets.css";
import "../src/css/main.css";
import { connectWebSocket, disconnectWebSocket } from './websocket.js';

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNDkzYTkwZi03MmJjLTQwMjAtYjBiNi0zOTE2NGFiZjAwNTMiLCJpZCI6MzQ0MDI2LCJpYXQiOjE3NTg2NTM0MDl9.AXndWa8nrm6BAvaZKh18y04HNmLUESVh8HiCiHB_yzI";

let viewer;

// Keep track of scenarios
const scenarios = {};

// Initialize Cesium
async function initCesium() {
  viewer = new Viewer("cesiumContainer", {
    terrain: Terrain.fromWorldTerrain(),
  });

  // Load OSM buildings
  try {
    const buildingTileset = await createOsmBuildingsAsync();
    viewer.scene.primitives.add(buildingTileset);
  } catch (e) {
    console.error("Failed to load OSM buildings:", e);
  }

  // Fly camera to San Francisco
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
      heading: CesiumMath.toRadians(0.0),
      pitch: CesiumMath.toRadians(-15.0),
    },
  });

  // Make viewer globally accessible for WebSocket updates
  window.viewer = viewer;
}

// Main async entry point
async function main() {
  await initCesium();
  connectWebSocket();
}

main();

// Clean disconnect on window unload
window.addEventListener("beforeunload", () => {
  disconnectWebSocket();
});

// --- Control panel logic ---
const addBtn = document.getElementById("add-scenario-btn");
addBtn.addEventListener("click", () => {
  const type = document.getElementById("scenario-type").value.trim();
  const coordsStr = document.getElementById("scenario-coords").value.trim();
  const colorChoice = document.getElementById("scenario-color").value;

  // fetch request here
  fetch("http://localhost:8080/create-area", {
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
