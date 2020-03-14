// JavaScript source code for NO2 in schools project
// Initiated by Ed Sharp e.sharp@ucl.ac.uk | 26/05/2017
// colors for graduated markers
var colorList = [
	[0, '#1b9e77'],
	[30, '#d95f02'],
	[40, '#7570b3'],
	[50, '#e7298a'],
	[60, '#1a1a1a']
];
// different colorlist for polygons to remove zeros
var colorList_ploy = [
	[1, '#1b9e77'],
	[30, '#d95f02'],
	[40, '#7570b3'],
	[50, '#e7298a'],
	[60, '#1a1a1a']
];
// zoom level at which to show detailed polygons
var zoomThreshold = 8;
var zoomThresholdgrid = 10;
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlYWR5ZWRkeSIsImEiOiJjazdtMWtvcDkwZGx4M2ZvMGNoYmxiNmU1In0.8wMdP0nrecVnV5K6ZURhqg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v9', //stylesheet location
    center: [0, 51.5], // starting position
    zoom: 10 // starting zoom
});

map.on('style.load', function () {
    map.addSource("markers_nursery", {
        "type": "geojson",
        "data": "data/nursery.geojson"
    });
		// display schools
		map.addLayer({
				"id": "All Nurseries",
				"type": "circle",
				"source": "markers_nursery",
				"minzoom": zoomThreshold,
				'layout': {
						'visibility': 'visible'
				},
				'paint': {
            //Add data-driven styles for circle-color
            'circle-color': {
                // this defines clor, but expects to be passed a number
                property: 'NO2_conc',
                type: 'interval',
                stops: colorList
            },
            //Add data-driven styles for circle radius
            // can alter circle size by zoom
            'circle-radius': {
                stops: [[8, 4], [11, 6], [16, 10]]
            },
            'circle-opacity': 0.8
        }
		});
		});


// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
// use b tage for ease, replace with css if problems
var clickayers = ['All Nurseries'];
for (var i = 0; i < clickayers.length; i++) {
    var cid = clickayers[i];
    map.on('click', cid, function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML('<b>Name: </b>' + e.features[0].properties.EstablishmentName + '<br>'
            + '<b>Address: </b>' + e.features[0].properties.Address + '<br>'
						+ '<b>Web: </b>' + e.features[0].properties.Web + '<br>'
						+ '<b>Tel: </b>' + e.features[0].properties.Tel + '<br>'
            + '<b>NO<sub>2</sub> Background: </b>' + Math.round(e.features[0].properties.NO2_conc) + '<h> &#181;g/m<sup>3</sup></h>' + '<br>'
						+ '<b>PM2.5 Background: </b>' + Math.round(e.features[0].properties.PM25_conc) + '<h> &#181;g/m<sup>3</sup></h>' + '<br>'
            + 'Do you think that there is a problem with this point? : <a href="mailto:name@email.com">Contact Us</a>' + '<br/>')
            .addTo(map);
    });
    map.on('mouseenter', cid, function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', cid, function () {
        map.getCanvas().style.cursor = '';
    });
}
