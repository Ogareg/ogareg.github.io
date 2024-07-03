// Function to initialize the map
function initMap() {
    // Initialize the map with Mapbox GL JS
    mapboxgl.accessToken = 'pk.eyJ1IjoidGFwbWFwcGVyIiwiYSI6ImNseGh1cmMwZDE2eW8yaXM2cWtpcHhjODgifQ.ZD1dxfZEbLmAflO6B8ghgg';
  var mq = window.matchMedia("(min-width: 600px)");
    if (mq.matches){
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [11.972913867962761, 57.70925479892651],
            zoom:12
        });
    } else {
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [11.972913867962761, 57.70925479892651],
            zoom:10
        });
    }

    // Function to parse CSV and add markers with popups to the map
    function addMarkersFromCSV(csv) {
        // Split CSV into lines
        var lines = csv.split("\n");

        // Loop through lines
        lines.forEach(function(line, index) {
            // Skip the header line if present
            if (index === 0 && line.includes("Stad")) return;

            // Split line into values
            var values = line.split("\t");

            // Extract latitude, longitude, and name
            var lat = parseFloat(values[5]);
            var lng = parseFloat(values[6]);
            var name = values[0];
            var stad = values[2];
            var adress = values[3] + " " + values[4];
            var hemsida = values[7];
            var markerType = values[8];  // Assuming the 9th column is for marker type/icon

            // Debugging: Log the parsed values
            console.log('Parsed values:', { lat, lng, name, stad, adress, hemsida, markerType });

            // Create marker with popup
            if (!isNaN(lat) && !isNaN(lng)) {
                // Create a div element for the custom marker
                var customMarkerEl = document.createElement('div');
                customMarkerEl.className = 'custom-marker';
                if (markerType) {
                    customMarkerEl.style.backgroundImage = `url(${markerType})`;
                } else {
                    customMarkerEl.style.backgroundImage = 'url(default_marker.png)';  // Fallback to a default marker image
                }

                // Create a custom marker
                var customMarker = new mapboxgl.Marker(customMarkerEl)
                    .setLngLat([lng, lat])
                    .addTo(map);

                // Create popup content
                var popupContent = `<h3>${name}</h3><h4>${stad}<br></h4><h4>${adress}<br></h4><h4><a href="${hemsida}" target="_blank">${hemsida}</a></h4>`;

                // Create popup
                var popup = new mapboxgl.Popup({offset: [0, 0]})
                    .setHTML(popupContent);

                // Bind popup to marker
                customMarker.setPopup(popup);
            }
        });
    }

    // Fetch and parse CSV file automatically
    fetch('Tapmap.tsv')
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

map.on('resize', function() {
    map.resize();
    // Optionally re-center or re-position markers
    markers.forEach(marker => {
        const lngLat = marker.getLngLat();
        marker.setLngLat([lngLat.lng, lngLat.lat]);
    });
});

