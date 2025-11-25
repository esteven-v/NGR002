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
  const type = document.getElementById("scenario-type").value;
  const coordsStr = document.getElementById("scenario-coords").value;
  const colorChoice = document.getElementById("scenario-color").value;

  if (!type || !coordsStr) {
    alert("Please enter scenario name and coordinates.");
    return;
  }

  // Map selected color to Cesium.Color
  let polygonColor;
  switch (colorChoice) {
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

  // Parse coordinates
  const coords = coordsStr.split(";").map(pair => {
    const [lon, lat] = pair.trim().split(",").map(Number);
    return Cartesian3.fromDegrees(lon, lat);
  });

  // Add polygon with chosen color
  viewer.entities.add({
    name: type,
    polygon: {
      hierarchy: new PolygonHierarchy(coords),
      material: polygonColor,
      outline: true,
      outlineColor: Color.BLACK
    }
  });

  // Dashboard update
  const scenarioDiv = document.createElement("div");
  scenarioDiv.textContent = `Created: ${type} (${colorChoice}) with ${coordsStr}`;
  document.getElementById("scenario-status").appendChild(scenarioDiv);

  // Fly camera to polygon center
  try {
    const cartographics = coords.map(c => Cartographic.fromCartesian(c));
    const avgLon = cartographics.reduce((sum, c) => sum + c.longitude, 0) / cartographics.length;
    const avgLat = cartographics.reduce((sum, c) => sum + c.latitude, 0) / cartographics.length;
    const center = Cartesian3.fromRadians(avgLon, avgLat, 200);

    viewer.camera.flyTo({
      destination: center,
      orientation: {
        heading: CesiumMath.toRadians(0.0),
        pitch: CesiumMath.toRadians(-30.0),
      },
    });
  } catch (e) {
    console.error("Error flying to scenario:", e);
  }

  // Clear inputs
  document.getElementById("scenario-type").value = "";
  document.getElementById("scenario-coords").value = "";
});
