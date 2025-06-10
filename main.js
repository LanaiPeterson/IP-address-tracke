import { API_KEY } from "./secrets.js";
// console.log(API_KEY);

const ipAddressInput = document.getElementById("ip-address-input");
const domainInput = document.getElementById("domain-input");
const ipAddressButton = document.getElementById("ip-address-button");
const domainButton = document.getElementById("domain-button");
const ipAddressResult = document.getElementById("ip-address-result");
const domainResult = document.getElementById("domain-result");


const ipAddress = "8.8.8.8"; // google's ip address for testing
const domain = "www.perscholas.org"; // perscholas's domain for testing

const ipAddressEndpoint = `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}&ipAddress=${ipAddress}`
const domainsEndpoint = `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}&domain=${domain}`;
 

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // get the user ip address
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    // get location info
    const locationResponse = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}&ipAddress=${ip}`);
    const locationData = await locationResponse.json();
    console.log(locationData);
  } catch (error) {
    console.error("Error fetching IP address:", error);
  }
});

//const map = L.map('map').setView([51.505, -0.09], 13);
const map = L.map('map').locate({setView: true, maxZoom: 16});

// Initialize the map to street view with a default zoom level
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

 const marker = L.marker([51.5, -0.09]).addTo(map);

 const circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

const polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

// Bind a popup to the marker, circle, and polygon
function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

// Add a marker to the map at a specific location
marker.bindPopup("current location").openPopup();
marker.on('click', onMapClick);
map.on('click', onMapClick);

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const ipAddressSpan = document.getElementById("ip-address");
const locationSpan = document.getElementById("location");
const timezoneSpan = document.getElementById("timezone");
const ispSpan = document.getElementById("isp");

// Runs as soon as the page content is loaded
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // get the user ip address
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    console.log(ipData);
    
    const ip = ipData.ip;

    // get location info
    const locationResponse = await fetch(`${ipAddressEndpoint}${ip}`);
    const locationData = await locationResponse.json();
    console.log(locationData);

    // Display location info on the UI
    updateIpInfo(locationData);

    // Display map
    // var map = L.map('map').setView([51.505, -0.09], 13);
    const map = L.map("map").locate({ setView: true, maxZoom: 16 });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    console.log(map);
    
  } catch (error) {
    console.error("Error fetching IP address:", error);
  }
});

searchButton.addEventListener("click", async () => {
  try {
    const searchTerm = searchInput.value;
    if (!searchTerm) return;

    // Test for a valid IPv4 IP or IPv6
    // const ipReg =
    //   /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    // console.log(ipReg.test(searchTerm));

    // // Test for a valid domain name
    // const domainReg =
    //   /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    // console.log(domainReg.test(searchTerm));

    if (ipReg.test(searchTerm)) {
      const res = await fetch(ipAddressEndpoint + searchTerm);
      const data = await res.json();
      updateIpInfo(data);
      // updateMap()
    } else if (domainReg.test(searchTerm)) {
      const res = await fetch(domainsEndpoint + searchTerm);
      const data = await res.json();
      updateIpInfo(data);
      // updateMap()
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Updates UI with location data
function updateIpInfo(data) {
  ipAddressSpan.textContent = data.ip;
  locationSpan.textContent = `${data.location.region}, ${data.location.country}`;
  timezoneSpan.textContent = `UTC ${data.location.timezone}`;
  ispSpan.textContent = data.isp;
}
// Updates map with location data
function updateMap(data) {
  const lat = data.location.lat;
  const lng = data.location.lng;

  // Set the view of the map to the new location
  map.setView([lat, lng], 13);

  // Add a marker to the map at the new location
  L.marker([lat, lng]).addTo(map)
    .bindPopup(`IP: ${data.ip}<br>Location: ${data.location.region}, ${data.location.country}`)
    .openPopup();
}
// Add a circle to the map at the new location
function addCircle(data) {
  const lat = data.location.lat;
  const lng = data.location.lng;

  L.circle([lat, lng], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
  }).addTo(map);
}

// Add a popup to the map at the new location
function addPopup(data) {
  const lat = data.location.lat;
  const lng = data.location.lng;

  L.popup()
    .setLatLng([lat, lng])
    .setContent(`IP: ${data.ip}<br>Location: ${data.location.region}, ${data.location.country}`)
    .openOn(map);
}

// Add a click event listener to the map
map.on('click', function(e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;

  L.popup()
    .setLatLng([lat, lng])
    .setContent(`You clicked at ${lat.toFixed(2)}, ${lng.toFixed(2)}`)
    .openOn(map);
});

// Add a marker to the map at the user's current location
function addUserLocationMarker(lat, lng) {
  L.marker([lat, lng]).addTo(map)
    .bindPopup("Current Location")
    .openPopup();
}

// Get the user's current location and add a marker to the map
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    addUserLocationMarker(lat, lng);
    map.setView([lat, lng], 13);
  }, function() {
    alert("Geolocation is not supported by this browser.");
  });
}

//zoom in and out of the map
map.on('zoomend', function() {
  const zoomLevel = map.getZoom();
  console.log("Current zoom level:", zoomLevel);
});
