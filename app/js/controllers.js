'use strict';

var app = angular.module("demoapp", ['leaflet-directive']);
app.controller("BasicFirstController",['$scope', '$http', 'leafletData', function($scope, $http, leafletData){
	angular.extend($scope, {
		center: {
			lat: 4.68592950660633,
			lng: -74.10140991210938,
			zoom: 7
		},
		defaults: {
			scrollWheelZoom: false
		}
	});
	
	$http.get("data.geojson").success(function(data, status) {
		addGeoJsonLayerWithClustering(data);
	});			
	// var geoJsonLayer = null;
	function addGeoJsonLayerWithClustering(data) {

		  var markers = L.markerClusterGroup();
		  //if (geojsonLayer) {
		  //  markers.clearLayers();
		  //}
		  
		  var geoJsonLayer = L.geoJson(data, {
			  onEachFeature: function (feature, layer) {
				  layer.bindPopup(feature.properties.name);
			  }
		  });
		  markers.addLayer(geoJsonLayer);
		  leafletData.getMap().then(function(map) {
			map.addLayer(markers);
			//map.fitBounds(markers.getBounds());
		  });
		  
	};			
	
	
	/*
	leafletData.getMap().then(function(map){
		map.
	});
	*/
	
}]);
