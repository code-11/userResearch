define(["jquery"],function($){
	var controls= controls || {};

	controls.setupToggleCtrl=function(map,heatmap){
		$("#toggle").click(function(){
			heatmap.setMap(heatmap.getMap() ? null : map);
		});
	}
	controls.setupGradientCtrl=function(map,heatmap){
		$("#gradient").click(function(){
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
	controls.setupControls=function(map,heatmap){
		controls.setupGradientCtrl(map,heatmap);
		controls.setupOpacityCtrl(map,heatmap);
		controls.setupRadiusCtrl(map,heatmap);
		controls.setupToggleCtrl(map,heatmap);
	}
	return controls
});