// Function to initialize the map
function initMap() {
    // Initialize the map with Mapbox Dark theme tiles
    const map = L.map('map').setView([57.69357, 11.91878], 11);

    // Mapbox Dark theme tile layer
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidGFwbWFwcGVyIiwiYSI6ImNsM2oxMDhjbzA0Mm0zY3BpcXU2eXY0M24ifQ.FKBua5KuBWQdGScKpfaMXA' // Replace with your Mapbox access token
    }).addTo(map);

    // Function to parse CSV and add markers with popups to the map
    function addMarkersFromCSV(csv) {
        function addMarkersFromCSV(csv) {
    var lines = csv.split("\n");

    lines.forEach(function(line) {
        var values = line.split(",");

        var lat = parseFloat(values[5]);
        var lng = parseFloat(values[6]);
        var name = values[0];
        var stad = values[2];
        var adress = values[3] + values[4];
        var hemsida = values[7];

        if (!isNaN(lat) && !isNaN(lng)) {
            var marker = L.marker([lat, lng]).addTo(map);
            marker.bindPopup(`<b>${name}</b><br>${stad}<br>${adress}<br><a href="${hemsida}">${hemsida}</a>`);
        }
        });
    }

    // Fetch and parse CSV file automatically
    fetch('Tapmap.csv')
        .then(response => {
            // Debugging: Log if fetch was successful
            console.log('CSV file fetched successfully');
            return response.text();
        })
        .then(data => {
            // Debugging: Log the fetched data
            console.log('CSV data:', data);
            addMarkersFromCSV(data);
        })
        .catch(error => console.error('Error fetching the CSV file:', error));
}
// Initialize the map on page load
window.onload = initMap;

