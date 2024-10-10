// Initialize tectonicPlates as an empty L.geoJSON layer
var tectonicPlates = L.geoJSON(); // Do not add to map yet

// Fetch the GeoJSON data
var url = "https://raw.githubusercontent.com/fraxen/tectonicplates/refs/heads/master/GeoJSON/PB2002_steps.json";
fetch(url)
.then(response => {
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return response.json();
})
.then(json => {
    // Add the data to tectonicPlates
    tectonicPlates.addData(json);
    tectonicPlates.setStyle({
        color: "orange",
        weight: 2
    });

    // Now add the tectonicPlates layer to the map
    tectonicPlates.addTo(myMap);
})
.catch(function() {
    console.log("Error while fetching the GeoJSON data.");
});

// Define the base maps
var baseMaps = {
    "Street Map": streetMap,
    "Satellite Map": satelliteMap
};

// Define the overlay maps
var overlayMaps = {
    "Tectonic Plates": tectonicPlates
};

// Create the layer control
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false // This will keep the control expanded
}).addTo(myMap);