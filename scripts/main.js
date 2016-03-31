requirejs(['async!https://maps.googleapis.com/maps/api/js?key=AIzaSyDeXrdjhudNt9G87UQTvNzMMGBp275yrzU&libraries=visualization',"mapping","controls"], function(async,mapping,controls) {

      // This example requires the Visualization library. Include the libraries=visualization
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

      var map=mapping.initMap();
      var magicArray=mapping.initPoints();
      var heatmap=mapping.initHeatMap(map,magicArray);

      controls.setupControls(map,heatmap,magicArray);
});