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
        // Split CSV into lines
        var lines = csv.split("\n");

        // Loop through lines
        lines.forEach(function(line) {
            // Split line into values
            var values = line.split(",");

            // Extract latitude, longitude, and name
            var lat = parseFloat(values[5]);
            var lng = parseFloat(values[6]);
            var name = values[0];
            var stad = values[2];
            var adress = values[3] + values[4];
            var hemsida = values[7];
            var markerType = values[8];  // Assuming the 9th column is for marker type/icon

            // Create marker with popup
            if (!isNaN(lat) && !isNaN(lng)) {
                if (markerType) {
                    // Use custom icon for marker
                    let customIcon = L.icon({
                        iconUrl: markerType,  // URL to the icon image
                        iconSize: [100, 70],  // size of the icon
                        iconAnchor: [35, 70],  // point of the icon which will correspond to marker's location
                        popupAnchor: [0, -70],  // point from which the popup should open relative to the iconAnchor
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                        shadowSize: [70, 70],  // size of the shadow
                        shadowAnchor: [30, 75]  // point of the shadow which will correspond to marker's location
                    });
                    var marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
                } else {
                    var marker = L.marker([lat, lng]).addTo(map);
                }
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
