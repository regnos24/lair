

Kinetic.Icon = function(config){
	var x = config.x ? config.x : 0;
	var y = config.y ? config.y : 0;
	var width = config.width ? config.width : config.image.width;
  var height = config.height ? config.height : config.image.height;
	var stroke = config.stroke ? config.stroke : config.stroke = "2px #999";
	var fill = config.fill ? config.fill : config.fill = "#FFF";
	var gradientFallOff = config.gradientFallOff ? config.gradientFallOff : config.gradientFallOff = "#8ED6FF";
	this.radius = config.radius ? config.radius : 60;
	this.image = config.image ? config.image : config.image = "";
	this._x = x;
	this._y = y;
	

	var draw = function(){
		var context = this.getContext();
		//Create Circle
		var st = stroke.split(" ");
		context.beginPath();
			context.strokeStyle = st[1];
			context.lineWidth = st[0];
			var circle = context.arc(x ,y ,this.radius, 0 * Math.PI, 2 * Math.PI);
			//Create Gradient
			var grd = context.createRadialGradient(x, y, 20, x, y, this.radius +10);
			grd.addColorStop(0, fill); // light blue
			grd.addColorStop(1, gradientFallOff); // dark blue
			context.fillStyle = grd;
			context.fill();
			context.stroke();
		context.closePath();
		//Add Logo
		context.drawImage(this.image,x - this.radius, y - this.radius);
	}
	Kinetic.Shape.apply(this, [draw, config.name]);
}
Kinetic.Icon.prototype = new Kinetic.Shape();

//Extensions End

var loadImages = function(sources, callback){
     images = {};
     var loadedImages = 0;
     var numImages = 0;
     for (var src in sources) {
         numImages++;
     }
     for (var src in sources) {
         images[src] = new Image();
         images[src].onload = function(){
             if (++loadedImages >= numImages) {
                 callback(images);
             }
         };
         images[src].src = sources[src];
     }
}

var drawBackground = function(background, bgImg){
    var canvas = background.getCanvas();
    var context = background.getContext();
    context.drawImage(bgImg, 0, 0);
}

var getChildren = function(appParent,appLayer){
	var iconElements = [];
	//var x = appParent._x + (appParent.radius);
	//var y = appParent._y + (appParent.radius);
	this.angle = 0;
	var toRadians = Math.PI / 180;
	//this.xAngle = this.angle * Math.cos(this.radius);
	//this.yAngle = this.angle * Math.sin(this.radius);
	var count=0;
	for(i in data.data){
		count++;
	}
	this.angleChange = (360 / count);
	for(key in data.data){
		var x = parseInt((Math.cos(this.angle * toRadians) * (appParent.radius * 2.5)) + (appParent._x - appParent.radius));
		var y = parseInt((Math.sin(this.angle * toRadians) * (appParent.radius * 2.5)) + (appParent._y - appParent.radius));
		var element = new Kinetic.Image({
			image: images[key]
		});
		
		element.x = x
		element.y = y
		this.angle -= this.angleChange;
		// this.angle = this.angle + this.angleChange;
		
		console.log("name:" + key, "x: " + element.x, "y: " + element.y, "angle: "+this.angle);
		element.draggable(true);
    element.on("dragstart", function(){
        element.moveToTop();
        appLayer.draw();
    });
		appLayer.add(element);
	}
	return iconElements;
}

var initStage = function(images){
	var stage = new Kinetic.Stage("appCanvas", 800, 600);
	var background = new Kinetic.Layer();
	var appLayer = new Kinetic.Layer();
	
	stage.add(background);
	drawBackground(background, images.bgImg);
	var rootIcon = new Kinetic.Icon({x: background.canvas.width / 2, y: background.canvas.height / 2, radius:60, image:images["root_logo"], name:data.name});
	rootIcon.on("click",function(){ 
		getChildren(this,appLayer);
		appLayer.draw();
	})
	appLayer.add(rootIcon);
	stage.add(appLayer);
}

//Load the Canvas Elements
window.onload = function(){
	var sources = {
			bgImg:"images/bgImg.png",
   		root_logo: data.logo,
			audios: "images/audios.png",
			documents: "images/docs.png",
			images: "images/pictures.png",
			videos: "images/movies.png",
   };
	var images;
	loadImages(sources, initStage);
}