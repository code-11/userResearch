requirejs(['async!https://maps.googleapis.com/maps/api/js?key=AIzaSyDeXrdjhudNt9G87UQTvNzMMGBp275yrzU&libraries=visualization',"mapping","controls"], function(async,mapping,controls) {

      // This example requires the Visualization library. Include the libraries=visualization
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

      var map=mapping.initMap();
      var heatmap=mapping.initHeatMap(map);
      controls.setupControls(map,heatmap);

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
});