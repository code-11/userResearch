requirejs(['async!https://maps.googleapis.com/maps/api/js?key=AIzaSyDeXrdjhudNt9G87UQTvNzMMGBp275yrzU&libraries=visualization'], function(async) {

      // This example requires the Visualization library. Include the libraries=visualization
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

      var map, heatmap;
      function initMap() {
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
          center: {lat: 37.775, lng: -122.434},
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.SATELLITE, customMapTypeId]
          }
        });
        heatmap = new google.maps.visualization.HeatmapLayer({
          data: getPoints(),
          map: map
        });

        map.mapTypes.set(customMapTypeId, customMapType);
        map.setMapTypeId(customMapTypeId);
      }

      function toggleHeatmap() {
        heatmap.setMap(heatmap.getMap() ? null : map);
      }

      function changeGradient() {
        var gradient = [
          // 'rgba(0, 255, 255, 0)',
          // 'rgba(0, 255, 255, 1)',
          // 'rgba(0, 191, 255, 1)',
          // 'rgba(0, 127, 255, 1)',
          // 'rgba(0, 63, 255, 1)',
          // 'rgba(0, 0, 255, 1)',
          // 'rgba(0, 0, 223, 1)',
          // 'rgba(0, 0, 191, 1)',
          // 'rgba(0, 0, 159, 1)',
          // 'rgba(0, 0, 127, 1)',
          // 'rgba(63, 0, 91, 1)',
          // 'rgba(127, 0, 63, 1)',
          'rgba(255, 255, 255, 0)',
          'rgba(255, 255, 255, 1)',
          'rgba(200, 200, 255, 1)',
          'rgba(100, 100, 255, 1)',
          'rgba(40, 40, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 210, 1)',
          'rgba(0, 0, 160, 1)',
          'rgba(0, 0, 80, 1)',
          'rgba(0, 0, 40, 1)',
          'rgba(0, 0, 10, 1)',
          'rgba(0, 0, 0, 1)'
        ]
        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
      }

      function changeRadius() {
        heatmap.set('radius', heatmap.get('radius') ? null : 50);
      }

      function changeOpacity() {
        heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
      }
      function uniformPoints(){
        var points=[];
        var range=.04;
        var min_x=37.751496;
        var min_y=-122.445368;

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
      function gaussianPoints(){
        var points=[];
        var range=.04;
        var min_x=37.751496;
        var min_y=-122.445368;

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

      function pickedPoints(){
                return [
          new google.maps.LatLng(37.782551, -122.445368),
          new google.maps.LatLng(37.782745, -122.444586),
          new google.maps.LatLng(37.782842, -122.443688),
          new google.maps.LatLng(37.782919, -122.442815),
          new google.maps.LatLng(37.782992, -122.442112),
          new google.maps.LatLng(37.783100, -122.441461),
          new google.maps.LatLng(37.783206, -122.440829),
          new google.maps.LatLng(37.783273, -122.440324),
          new google.maps.LatLng(37.783316, -122.440023),
          new google.maps.LatLng(37.783357, -122.439794),
          new google.maps.LatLng(37.781985, -122.439199),
          new google.maps.LatLng(37.782239, -122.439249),
          new google.maps.LatLng(37.782286, -122.439266),
          new google.maps.LatLng(37.797847, -122.429388),
          new google.maps.LatLng(37.797874, -122.429180),
          new google.maps.LatLng(37.797885, -122.429069),
          new google.maps.LatLng(37.797887, -122.429050),
          new google.maps.LatLng(37.797933, -122.428954),
          new google.maps.LatLng(37.798242, -122.428990),
          new google.maps.LatLng(37.798617, -122.429075),
          new google.maps.LatLng(37.798719, -122.429092),
          new google.maps.LatLng(37.798944, -122.429145),
          new google.maps.LatLng(37.799320, -122.429251),
          new google.maps.LatLng(37.799590, -122.429309),
          new google.maps.LatLng(37.766104, -122.409291),
          new google.maps.LatLng(37.766103, -122.409268),
          new google.maps.LatLng(37.766138, -122.409229),
          new google.maps.LatLng(37.766183, -122.409231),
          new google.maps.LatLng(37.766153, -122.409276),
          new google.maps.LatLng(37.766005, -122.409365),
          new google.maps.LatLng(37.765897, -122.409570),
          new google.maps.LatLng(37.765767, -122.409739),
          new google.maps.LatLng(37.765693, -122.410389),
          new google.maps.LatLng(37.765615, -122.411201),
          new google.maps.LatLng(37.765533, -122.412121),
          new google.maps.LatLng(37.753096, -122.442915),
          new google.maps.LatLng(37.751617, -122.443211),
          new google.maps.LatLng(37.751496, -122.443246),
        ];
      }
      // Heatmap data: 500 Points
      function getPoints() {
        //return uniformPoints();
        return gaussianPoints();

      }
      initMap();
});