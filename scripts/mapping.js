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
      mapping.genGaussian=function(min_x,min_y,range,center,sig,num){
		var points=[];
		var seed=42;
        var rnd_gen=new Random();

        for (var i=0; i<num; i+=1){
          rand_lat=rnd_gen.normal(center,sig)*range;
          rand_lon=rnd_gen.normal(center,sig)*range;
          new_x=rand_lat+min_x;
          new_y=rand_lon+min_y;
          points.push(new google.maps.LatLng(new_x, new_y));
        }
        return points;
      }

      mapping.gaussianPoints=function(){
        var range=.04;
        var min_x=43.04;
        var min_y=-87.93;

        gaus1=mapping.genGaussian(min_x,min_y,range,.5,.2,100);
        gaus2=mapping.genGaussian(min_x,min_y,range,.5,.02,100);
        gaus3=mapping.genGaussian(min_x,min_y,range,.4,.2,100);
        gaus4=mapping.genGaussian(min_x,min_y,range,.4,.04,100);
        var points=$.merge($.merge($.merge(gaus1,gaus2),gaus3),gaus4);
        return points;
      }

	mapping.getPoints=function() {
	// return mapping.uniformPoints();
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
	mapping.initPoints=function(){
		// var points=mapping.getPoints();
		var points=[];
		var magicArray = new google.maps.MVCArray(points);
		return magicArray;
	}
	mapping.initHeatMap=function(map,magicArray){
		var heatmap = new google.maps.visualization.HeatmapLayer({
          "data": magicArray,
          "map": map
        });
        return heatmap;
	}
	return mapping;
});