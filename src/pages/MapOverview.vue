<template>
  <q-page class="MainBody">
    <div id="myMap">
      <div class="map-load-container">
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <small>(Map is loading)</small>
        </div>
      </div>
    </div>
    <div id="showpos"></div>
    <audio id="audiotag1" src="~assets/Alarm.mp3" preload="auto"></audio>
  </q-page>
</template>

<script>
const serverUrl = "http://localhost:8080";

export default {
  name: "PageMap",
  methods: {
    playSound() {
      document.getElementById("audiotag1").play();
    }
  },
  created: () => {
    getLocation();
  }
};

let latitude = 0;
let longitude = 0;
function getLocation() {
  if (navigator.geolocation) {
    console.log("Trying to get location...");

    navigator.geolocation.getCurrentPosition(
      showPosition,
      function(error) {
        alert(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000
      }
    );
    sendPos();
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log(
    "Latitude: " + position.coords.latitude,
    "Longitude: " + position.coords.longitude
  );
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  showMapWithData();

  setTimeout(getLocation, 60000);
}

var osm = require("osm");
window.onload = function() {
  getLocation();
};

function showMapWithData() {
  // show a map of the current position
  var map = osm()
    .position(latitude, longitude)
    .radius((((2 * 0.03) / 3) * mapRadius) / 1000);
  var e = document.getElementById("myMap");
  e.childNodes.forEach(c => e.removeChild(c));
  // delete old overlay
  const overlay = document.querySelector("#overlay-canvas");
  if (overlay) {
    overlay.remove();
  }
  e.appendChild(map.show());
  e.children[0].setAttribute("class", "openMap");

  overlayMap();
}

function overlayMap() {
  const canvas = document.createElement("canvas");
  canvas.className = "canvases";
  canvas.style.border = "2px solid red";
  canvas.id = "overlay-canvas";
  canvas.width = 1000;
  canvas.height = 1000;

  const parentDiv = document.getElementById("myMap");
  parentDiv.appendChild(canvas);

  // TODO remove maps navigation

  drawOverlay(canvas);
}

var tileSize = 5;
var mapRadius = 1000;

async function drawOverlay(canvas) {
  const map = await fetch(serverUrl + "/dangerzone/dummy").then(res =>
    res.json()
  );
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    let pixelWidth = 1000;
    let pixelHeight = 1000;
    const mapTileWidthPx = pixelWidth / map.length;
    const mapTileHeightPx = pixelHeight / map.length;

    ctx.fillStyle = "#00FF00FF";

    affected = 0;
    map.forEach((row, y) => {
      row.forEach((tile, x) => {
        ctx.fillStyle = getColorForTile(tile);
        ctx.fillRect(
          x * mapTileWidthPx,
          y * mapTileHeightPx,
          mapTileWidthPx,
          mapTileHeightPx
        );
      });
    });
  }
}
var affected = 0;
function getColorForTile(mapTile) {
  if (mapTile.danger > 0) {
    affected++;
    return "rgba(255, 0, 0, " + mapTile.danger * 0.2 + ")";
  }
  return "#00000000";
}

var deviceId = "test";
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  console.log(device.cordova);
  deviceId = device.uuid;
}

function sendPos() {
  const data = {
    deviceId: deviceId,
    latitude: latitude,
    longitude: longitude
  };
  console.log("Sending", data);

  fetch(serverUrl + "/sender/postpos", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
}
</script>
