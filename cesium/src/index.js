import {
  Ion,
  Viewer,
  Terrain,
  createOsmBuildingsAsync,
  Cartesian3,
  Math,
  Color,
} from "cesium";
import "cesium/Widgets/widgets.css";
import "../src/css/main.css";
import {connectWebSocket} from './websocket.js';

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNDkzYTkwZi03MmJjLTQwMjAtYjBiNi0zOTE2NGFiZjAwNTMiLCJpZCI6MzQ0MDI2LCJpYXQiOjE3NTg2NTM0MDl9.AXndWa8nrm6BAvaZKh18y04HNmLUESVh8HiCiHB_yzI";

connectWebSocket();
// Initialize Cesium Viewer
const viewer = new Viewer("cesiumContainer", {
  terrain: Terrain.fromWorldTerrain(),
});

// Add Cesium OSM Buildings
const buildingTileset = await createOsmBuildingsAsync();
viewer.scene.primitives.add(buildingTileset);

// Fly the camera to San Francisco
viewer.camera.flyTo({
  destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
  orientation: {
    heading: Math.toRadians(0.0),
    pitch: Math.toRadians(-15.0),
  },
});

// --- WebSocket integration ---

// Optional: disconnect WebSocket on window unload
window.addEventListener("beforeunload", () => {
  disconnectWebSocket();
});