define(["jquery","mapping"],function($,mapping){
	var controls= controls || {};

	controls.setupToggleCtrl=function(map,heatmap){
		$("#toggle").click(function(){
			heatmap.setMap(heatmap.getMap() ? null : map);
		});
	}
	controls.setupGradientCtrl=function(map,heatmap){
		$("#gradient").click(function(){
			// var gradient = [
	  //         'rgba(255, 255, 255, 0)',
	  //         'rgba(255, 255, 255, 1)',
	  //         'rgba(200, 200, 255, 1)',
	  //         'rgba(100, 100, 255, 1)',
	  //         'rgba(40, 40, 255, 1)',
	  //         'rgba(0, 0, 255, 1)',
	  //         'rgba(0, 0, 210, 1)',
	  //         'rgba(0, 0, 160, 1)',
	  //         // 'rgba(0, 0, 80, 1)'
	  //         // 'rgba(0, 0, 40, 1)'
	  //         // 'rgba(0, 0, 10, 1)'
	  //         // 'rgba(0, 0, 0, 1)'
   //      ]
   			var gradient = [
	          'rgba(255, 255, 255, 0)',
	          'rgba(255, 255, 255, 1)',
	          'rgba(255, 200, 200, 1)',
	          'rgba(255, 100, 100, 1)',
	          'rgba(255, 40, 40, 1)',
	          'rgba(255, 0, 0, 1)',
	          'rgba(210, 0, 0, 1)',
	          'rgba(160, 0, 0, 1)',
	          // 'rgba(0, 0, 80, 1)'
	          // 'rgba(0, 0, 40, 1)'
	          // 'rgba(0, 0, 10, 1)'
	          // 'rgba(0, 0, 0, 1)'
        ]
        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);


		});
	}
	controls.setupRadiusCtrl=function(map,heatmap){
		$("#radius").click(function(){
			heatmap.set('radius', heatmap.get('radius') ? null : 50);
		});
	}
	controls.setupOpacityCtrl=function(map,heatmap){
		$("#opacity").click(function(){
			 heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
		});
	}
	controls.setupClickCtrl=function(map,magicArray){
		map.addListener('click', function(evt) {
			var lat=evt.latLng.lat();
			var lon=evt.latLng.lng();
			gaus1=mapping.genGaussian(lat,lon,.02,0,.2,100);
			for(var i=0; i<gaus1.length;i+=1){
				magicArray.push(gaus1[i]);
			}
		});
	}
	controls.setupControls=function(map,heatmap,magicArray){
		controls.setupGradientCtrl(map,heatmap);
		controls.setupOpacityCtrl(map,heatmap);
		controls.setupRadiusCtrl(map,heatmap);
		controls.setupToggleCtrl(map,heatmap);
		controls.setupClickCtrl(map,magicArray);
	}
	return controls
});