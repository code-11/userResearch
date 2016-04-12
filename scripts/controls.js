define(["jquery","mapping"],function($,mapping){
	var controls= controls || {};
	DOTS=[]

	//TODO: COULD BE REFACTORED INTO ANOTHER REQUIREJS FRAGMENT 
	function provideMapLabel(){
	function MapLabel(opt_options) {
	  this.set('fontFamily', 'sans-serif');
	  this.set('fontSize', 12);
	  this.set('fontColor', '#000000');
	  this.set('strokeWeight', 4);
	  this.set('strokeColor', '#ffffff');
	  this.set('align', 'center');

	  this.set('zIndex', 1e3);

	  this.setValues(opt_options);
	}
	MapLabel.prototype = new google.maps.OverlayView;

	window['MapLabel'] = MapLabel;


	/** @inheritDoc */
	MapLabel.prototype.changed = function(prop) {
	  switch (prop) {
	    case 'fontFamily':
	    case 'fontSize':
	    case 'fontColor':
	    case 'strokeWeight':
	    case 'strokeColor':
	    case 'align':
	    case 'text':
	      return this.drawCanvas_();
	    case 'maxZoom':
	    case 'minZoom':
	    case 'position':
	      return this.draw();
	  }
	};

	/**
	 * Draws the label to the canvas 2d context.
	 * @private
	 */
	MapLabel.prototype.drawCanvas_ = function() {
	  var canvas = this.canvas_;
	  if (!canvas) return;

	  var style = canvas.style;
	  style.zIndex = /** @type number */(this.get('zIndex'));

	  var ctx = canvas.getContext('2d');
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  ctx.strokeStyle = this.get('strokeColor');
	  ctx.fillStyle = this.get('fontColor');
	  ctx.font = this.get('fontSize') + 'px ' + this.get('fontFamily');

	  var strokeWeight = Number(this.get('strokeWeight'));

	  var text = this.get('text');
	  if (text) {
	    if (strokeWeight) {
	      ctx.lineWidth = strokeWeight;
	      ctx.strokeText(text, strokeWeight, strokeWeight);
	    }

	    ctx.fillText(text, strokeWeight, strokeWeight);

	    var textMeasure = ctx.measureText(text);
	    var textWidth = textMeasure.width + strokeWeight;
	    style.marginLeft = this.getMarginLeft_(textWidth) + 'px';
	    // Bring actual text top in line with desired latitude.
	    // Cheaper than calculating height of text.
	    style.marginTop = '-0.4em';
	  }
	};

	/**
	 * @inheritDoc
	 */
	MapLabel.prototype.onAdd = function() {
	  var canvas = this.canvas_ = document.createElement('canvas');
	  var style = canvas.style;
	  style.position = 'absolute';

	  var ctx = canvas.getContext('2d');
	  ctx.lineJoin = 'round';
	  ctx.textBaseline = 'top';

	  this.drawCanvas_();

	  var panes = this.getPanes();
	  if (panes) {
	    panes.mapPane.appendChild(canvas);
	  }
	};
	MapLabel.prototype['onAdd'] = MapLabel.prototype.onAdd;

	/**
	 * Gets the appropriate margin-left for the canvas.
	 * @private
	 * @param {number} textWidth  the width of the text, in pixels.
	 * @return {number} the margin-left, in pixels.
	 */
	MapLabel.prototype.getMarginLeft_ = function(textWidth) {
	  switch (this.get('align')) {
	    case 'left':
	      return 0;
	    case 'right':
	      return -textWidth;
	  }
	  return textWidth / -2;
	};

	/**
	 * @inheritDoc
	 */
	MapLabel.prototype.draw = function() {
	  var projection = this.getProjection();

	  if (!projection) {
	    // The map projection is not ready yet so do nothing
	    return;
	  }

	  if (!this.canvas_) {
	    // onAdd has not been called yet.
	    return;
	  }

	  var latLng = /** @type {google.maps.LatLng} */ (this.get('position'));
	  if (!latLng) {
	    return;
	  }
	  var pos = projection.fromLatLngToDivPixel(latLng);

	  var style = this.canvas_.style;

	  style['top'] = pos.y + 'px';
	  style['left'] = pos.x + 'px';

	  style['visibility'] = this.getVisible_();
	};
	MapLabel.prototype['draw'] = MapLabel.prototype.draw;

	/**
	 * Get the visibility of the label.
	 * @private
	 * @return {string} blank string if visible, 'hidden' if invisible.
	 */
	MapLabel.prototype.getVisible_ = function() {
	  var minZoom = /** @type number */(this.get('minZoom'));
	  var maxZoom = /** @type number */(this.get('maxZoom'));

	  if (minZoom === undefined && maxZoom === undefined) {
	    return '';
	  }

	  var map = this.getMap();
	  if (!map) {
	    return '';
	  }

	  var mapZoom = map.getZoom();
	  if (mapZoom < minZoom || mapZoom > maxZoom) {
	    return 'hidden';
	  }
	  return '';
	};

	/**
	 * @inheritDoc
	 */
	MapLabel.prototype.onRemove = function() {
	  var canvas = this.canvas_;
	  if (canvas && canvas.parentNode) {
	    canvas.parentNode.removeChild(canvas);
	  }
	};
	MapLabel.prototype['onRemove'] = MapLabel.prototype.onRemove;
	return MapLabel;
	}





	controls.setupToggleCtrl=function(map,heatmap){
		$("#toggle").click(function(){
			heatmap.setMap(heatmap.getMap() ? null : map);
		});
	}
	controls.setupGradientCtrl=function(map,heatmap){
		GRADIENTNUM=0;
		$("#gradient").click(function(){
			if (GRADIENTNUM==0){
				var gradient=null;
				GRADIENTNUM=1;
			}else if (GRADIENTNUM==1){
				var gradient = [
	          'rgba(255, 255, 255, 0)',
	          'rgba(255, 255, 255, 1)',
	          'rgba(170, 255, 255, 1)',
	          'rgba(80, 170, 255, 1)',
	          'rgba(0, 80, 255, 1)',
	          'rgba(0, 0, 255, 1)',
	          'rgba(0, 0, 100, 1)'];
	          	GRADIENTNUM=2;

			}else if (GRADIENTNUM==2){
				/*
			  'rgba(255, 255, 255, 0)',
	          'rgba(255, 255, 255, 1)',
	          'rgba(255, 200, 200, 1)',
	          'rgba(255, 100, 100, 1)',
	          'rgba(255, 40, 40, 1)',
	          'rgba(255, 0, 0, 1)',
	          'rgba(160, 0, 0, 1)'];
				*/
				var gradient = [
	          'rgba(255, 255, 255, 0)',
	          'rgba(255, 255, 255, 1)',
	          'rgba(255, 200, 200, 1)',
	          'rgba(255, 100, 100, 1)',
	          'rgba(255, 40, 40, 1)',
	          'rgba(255, 0, 0, 1)',
	          'rgba(100, 0, 0, 1)'];
	          	GRADIENTNUM=3;
			}else if (GRADIENTNUM==3){
				var gradient = [
	          'rgba(255, 255, 255, 0)',
	          'rgba(255, 255, 255, 1)',
	          'rgba(255, 200, 200, 1)',
	          'rgba(255, 100, 100, 1)',
	          'rgba(255, 40, 40, 1)',
	          'rgba(255, 0, 0, 1)',
	          'rgba(160, 0, 0, 1)'];
			  var gradient = [
			    'rgba(255, 255, 255, 0)',
			    'rgba(200, 255, 255, 1)',
			    'rgba(100, 255, 255, 1)',
			    'rgba(0, 255, 255, 1)',
			    'rgba(0, 170, 220, 1)',			    
			    'rgba(0, 80, 191, 1)',
			    'rgba(0, 0, 170, 1)',
			    'rgba(0, 0, 150, 1)',
			    'rgba(0, 0, 127, 1)',
			    'rgba(0, 0, 120, 1)',
			    'rgba(0, 0, 100, 1)',
			    'rgba(63, 0, 63, 1)',
			    'rgba(127, 0, 0, 1)',
			    'rgba(191, 0, 0, 1)',
			    'rgba(255, 0, 0, 1)'
			  ];
			  GRADIENTNUM=0;
			}
        // heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
        	heatmap.set('gradient',gradient);
        	if (GRADIENTNUM==1 || GRADIENTNUM==2){
        		var color='#FF0000';
        	}else{
        		var color="#0000cc";
        	}
    		for(var i=0;i<DOTS.length;i+=1){
    			DOTS[i].setOptions({fillColor: color});
    		}
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
	controls.doClick=function(evt,magicArray,map) {
			var mapLabelFunc=provideMapLabel();
			var lat=evt.latLng.lat();
			var lon=evt.latLng.lng();
			var type=$("#map-type").val();
			console.log(lat+","+lon+","+map.getZoom());

			var spread=0;
			if (I ==0){
				spread=.02;
				I=1;
			}
			else if (I==1){
				spread=.01;
				I=2;
			}
			else if (I==2){
				spread=.005;
				I=0;
			}

			// var spread=2;
			if (type=="percents"){
				var i = Math.round(Math.random()*100);
				var color="#000000";
				if (i>30){
					color="#cc9900";
				}
				if (i>60){
					color="#FF6600";	
				}
				if (i>75){
					color="#FF0000";
				}
				var percent = new mapLabelFunc({
			  		position:evt.latLng,
			  		text: (i/(10))+"%",
			  		map:map,
			  		fontSize:25,
			  		// fontColor:"rgb("+i*(100)+"0,0)"
					// fontColor: (i>30) ? ((i>60) ? ((i>75) ? : "#FF0000") :"#FF6633") : "#000000"
					fontColor:color
				});	
			}else{	
				gaus1=mapping.genGaussian(lat,lon,spread,0,.2,100);	
				for(var i=0; i<gaus1.length;i+=1){
					if (type=="heatmap"){
						magicArray.push(gaus1[i]);
					}else if (type=="dots"){
						var cityCircle = new google.maps.Circle({
						  // strokeColor: '#FF0000',
						  strokeOpacity: 0,
						  // strokeWeight: 2,
						  fillColor: '#FF0000',
						  // fillColor:"#0000cc",
						  fillOpacity: 1,
						  map: map,
						  center: gaus1[i],
						  radius: 8
						});
						DOTS.push(cityCircle);
					}
				}
			}
		}

	controls.setupClickCtrl=function(map,magicArray){
		I=0;
		map.addListener('click',function(evt){controls.doClick(evt,magicArray,map)});
	}
	controls.setupControls=function(map,heatmap,magicArray,magicArray2){
		controls.setupGradientCtrl(map,heatmap);
		controls.setupOpacityCtrl(map,heatmap);
		controls.setupRadiusCtrl(map,heatmap);
		controls.setupToggleCtrl(map,heatmap);
		controls.setupClickCtrl(map,magicArray);
	}
	return controls
});