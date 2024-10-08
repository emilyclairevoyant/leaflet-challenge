// Initialize map
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

// Add a tile layer (the background map image) to our map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19,
}).addTo(myMap);


// Fetch data
fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
    .then(response => response.json())
    .then(data => {
        // Parse and plot data
        for (let feature of data.features) {
            let location = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
            let magnitude = feature.properties.mag;
            let depth = feature.geometry.coordinates[2];

            // Create a circle marker and add it to the map
            function getColor(depth) {
                return depth > 90 ? '#800026' :
                             depth > 70 ? '#BD0026' :
                             depth > 50 ? '#E31A1C' :
                             depth > 30 ? '#FC4E2A' :
                             depth > 10 ? '#FD8D3C' :
                                                         '#FFEDA0';
            }
            L.circle(location, {
                fillOpacity: 0.75,
                color: "white",
                fillColor: getColor(depth),
                // Adjust radius
                radius: magnitude * 20000
            }).bindPopup(`Magnitude: ${magnitude}<br>Depth: ${depth}`).addTo(myMap);
        }
// Create a legend that will provide context for your map data.
let legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend'),
        depths = [-10, 10, 30, 50, 70, 90],
        labels = [];
    for (let i = 0; i < depths.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(depths[i] + 1) + '; width: 10px; height: 10px; float: left; margin-right: 8px;"></i> ' +
            depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }
    return div;
};
legend.addTo(myMap);
    });

