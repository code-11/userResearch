define([],function(){
	var mapping = mapping||{};

      mapping.uniformPoints=function(){
        var points=[];
        var range=.04;
        var min_x=43.04;
        var min_y=-87.93;

        var seed=42;
        var rnd_gen=new Random(seed);

        for (var i=0; i<5000; i+=1){
          rand_lat=rnd_gen.random()*range;
          rand_lon=rnd_gen.random()*range;
          new_x=rand_lat+min_x;
          new_y=rand_lon+min_y;
          points.push(new google.maps.LatLng(new_x, new_y));
        }
        return points;
      }
      mapping.gaussianPoints=function(){
        var points=[];
        var range=.04;
        var min_x=43.04;
        var min_y=-87.93;

        var seed=42;
        var rnd_gen=new Random(seed);

        for (var i=0; i<100; i+=1){
          rand_lat=rnd_gen.normal(.5,.2)*range;
          rand_lon=rnd_gen.normal(.5,.2)*range;
          new_x=rand_lat+min_x;
          new_y=rand_lon+min_y;
          points.push(new google.maps.LatLng(new_x, new_y));
        }
        for (var i=0; i<200; i+=1){
          rand_lat=rnd_gen.normal(.5,.05)*range;
          rand_lon=rnd_gen.normal(.5,.05)*range;
          new_x=rand_lat+min_x;
          new_y=rand_lon+min_y;
          points.push(new google.maps.LatLng(new_x, new_y));
        }
        return points;
      }

	mapping.getPoints=function() {
	return mapping.gaussianPoints();
	}

	mapping.initMap= function() {
	    var customMapType = new google.maps.StyledMapType(
	          [
	   {
	  "featureType": "poi",
	  "elementType": "labels",
	  "stylers": [
	        { "visibility": "off" }
		]
		},
		  {
		  "featureType":"road.highway",
		  "elementType":"all",
		  "stylers":[
		     {
		        "visibility":"off"
		     }
		  ]
		},
		  {
		  "featureType":"road.arterial",
		  "elementType":"geometry.stroke",
		  "stylers":[
		     {
		        "visibility":"off"
		     },
		     {
		        "color":"#8d8d8d"
		     }
		  ]
		},
		{
		  "featureType":"all",
		  "elementType":"labels.icon",
		  "stylers":[
		     {
		        "visibility":"off"
		     }
		  ]
		},
		{
		  "featureType":"administrative",
		  "elementType":"all",
		  "stylers":[
		     {
		        "visibility":"off"
		     }
		  ]
		}
	], {
	            name: 'Road'
	        });
	        var customMapTypeId = 'no-detail';

	        var map = new google.maps.Map(document.getElementById('map'), {
	          zoom: 12,
	          center: {lat: 43.06, lng: -87.901},
	          mapTypeControlOptions: {
	            mapTypeIds: [google.maps.MapTypeId.SATELLITE, customMapTypeId]
	          }
	        });
	        map.mapTypes.set(customMapTypeId, customMapType);
	        map.setMapTypeId(customMapTypeId);
	        map.setZoom(15.0);
	        return map
	      }
	mapping.initHeatMap=function(map){
		var heatmap = new google.maps.visualization.HeatmapLayer({
          "data": mapping.getPoints(),
          "map": map
        });
        return heatmap;
	}
	return mapping;
});