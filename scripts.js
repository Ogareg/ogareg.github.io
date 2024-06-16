// Function to initialize the map
function initMap() {
    // Initialize the map with Mapbox GL JS
    mapboxgl.accessToken = 'pk.eyJ1IjoidGFwbWFwcGVyIiwiYSI6ImNseGh1cmMwZDE2eW8yaXM2cWtpcHhjODgifQ.ZD1dxfZEbLmAflO6B8ghgg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [11.91878, 57.69357],
        zoom: 7
    });

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
                // Create a div element for the custom marker
                var customMarkerEl = document.createElement('div');
                customMarkerEl.className = 'custom-marker';

                // Create a custom marker
                var customMarker = new mapboxgl.Marker(customMarkerEl)
                    .setLngLat([lng, lat])
                    .addTo(map);

                // Create popup content
                var popupContent = `<b>${name}</b><br>${stad}<br>${adress}<br><a href="${hemsida}">${hemsida}</a>`;

                // Create popup
                var popup = new mapboxgl.Popup({ offset: 25 })
                    .setHTML(popupContent);

                // Bind popup to marker
                customMarker.setPopup(popup);
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
