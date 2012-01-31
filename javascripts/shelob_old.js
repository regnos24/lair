var Debug = function(){
		this.suported_browser = navigator.userAgent.toLowerCase().indexOf('firefox') > -1 || navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
		this.log = function(msg){
			if(arguments[0]){
				if(this.suported_browser){
					console.log(msg);
				}else{
					alert(msg);
				}
			}else{
				return false;
			}
		}
}

//Objects
var Canvas = function(){
	this.canvas = document.getElementById(arguments[0]["name"]);
	this.ctx = this.canvas.getContext("2d");
	this.bgColor;
	this.canvas.width = 800;
	this.canvas.height = 600;
	this.center = {x:(this.canvas.width / 2), y:(this.canvas.height / 2)};
	var self = this;
	
	this.setBackgroundColor = function(color){
		this.bgColor = color;
		this.ctx.fillStyle = color;
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
	}
	this.setCanvasWidth = function(w){
		this.canvas.width = w;
		this.center.x = w / 2;
		
	}
	this.setCanvasHeight = function(h){
		this.canvas.height = h;
		this.center.y = h / 2;
	}
	//Set Width/Height
	if(arguments[0]['width'])
		self.setCanvasWidth(arguments[0]['width']);
	if(arguments[0]['height'])
		self.setCanvasHeight(arguments[0]['height']);
	//Set BG
	if(arguments[0]['color'])
		self.setBackgroundColor(arguments[0]['color']);
	else
		self.setBackgroundColor("#FFF");
	return this.ctx
}

//Icon Objects
var Icon = function(context,data){
	(arguments[2]['x']) ? this.x = arguments[2]['x'] : this.x = 0;
	(arguments[2]['y']) ? this.y = arguments[2]['y'] : this.y = 0;
	(arguments[2]['radius']) ? this.radius = arguments[2]['radius'] : this.radius = 60;
	this.image = data['logo'];
	this.stroke ="2px #999";
	this.fill = "#FFF";
	this.gradientFallOff = "#8ED6FF";
	this.ctx = context;
	var self = this;
	
	this.init = function(){
	}
	
	this.draw = function()
	{
		var stroke = this.stroke.split(" ");
		this.ctx.beginPath();
			this.ctx.strokeStyle = stroke[1];
			this.ctx.lineWidth = stroke[0];
			this.ctx.arc(this.x ,this.y ,this.radius, 0 * Math.PI, 2 * Math.PI);
			var grd = this.ctx.createRadialGradient(this.x, this.y, 20, this.x, this.y, this.radius +10);
			grd.addColorStop(0, this.fill); // light blue
			grd.addColorStop(1, this.gradientFallOff); // dark blue
			this.ctx.fillStyle = grd;
			this.ctx.fill();
			this.ctx.stroke();
		this.ctx.closePath();
		
		
		// myImage.onload = function() { 
		// 			console.log(this.ctx);
		// 			this.callImage(this.ctx) ;
		// 		};
		var imageContainer = new Image();
		imageContainer.onload = function(){ imageReady(self.ctx, self);
		       // this.ctx.drawImage(this.imageContainer, 100, 100);
		};
		var imageReady = function(context, self){
			context.drawImage(imageContainer, self.x - self.radius, self.y - self.radius);
		}
		imageContainer.src = this.image;
		
	}
	
	this.hit = function()
	{
		console.log("Hello");
	}
	self.init();
}

$(document).ready(function(){
	//DEBUG :: add false in production
	var debug = new Debug(true);
	//Load Data
	debug.log(data);
	//Canvas Init	
	var canvas = new Canvas({name:"appCanvas", color:"#CCC", width:800, height:600})	
	//Do some tests
	i = new Icon(canvas, data ,{x:100,y:100});
	i.draw();
	i.click(console.log("HI"));
	
});



//Load Base Objects
// var BaseImage = function(){
// 	this.x = 0;
// 	this.y = 0;
// 	this.origin = { x: "center", y: "center" };
// 	this.image = [images_dir,xData.find("root").attr("image")].join("/")
// 	this.draw = function(){
// 		return canvas.display.image({
// 			x: this.x,
// 			y: this.y,
// 			origin: this.origin,
// 			image: [images_dir,this.image].join("/")
// 		})
// 	}
// }
// 
// canvas.display.register("icon", {
// 	shapeType: "radial"
// }, function (canvas) {
// 	var origin = this.getOrigin(),
// 		x = this.abs_x - origin.x,
// 		y = this.abs_y - origin.y;
// 		var self = this;
// 		self.direction;
// 	//create container
// 	canvas.beginPath();
// 		canvas.strokeStyle = this.strokeColor;
// 		canvas.lineWidth = this.strokeWidth;
// 		canvas.arc(x ,y ,this.radius, 0 * Math.PI, 2 * Math.PI);
// 		var grd = canvas.createRadialGradient(x, y, 20, x, y, this.radius +10);
// 		grd.addColorStop(0, this.fill); // light blue
// 		grd.addColorStop(1, this.gradientFallOff); // dark blue
// 		canvas.fillStyle = grd;
// 		canvas.fill();
// 		canvas.stroke();
// 	canvas.closePath();
// 
// 	
// 	var bi = new BaseImage();
// 	bi.x = this.x;
// 	bi.y = this.y;
// 	bi.image = this.image;
// 	self.addChild(bi.draw());
// 		if(this.direction == null){
// 				this.direction = 0;
// 		}
// });
// 
// //Create Icon
// var Icon = function()
// {
// 	this.x = 0;
// 	this.y = 0;
// 	this.direction = 0;
// 	this.radius = 60;
// 	this.start = 0;
// 	this.end = 150;
// 	this.stroke ="2px #999";
// 	this.fill = "#FFF";
// 	this.gradientFallOff = "#8ED6FF";
// 	this.image = xData.find("root").attr("image");
// 	this.timer = null;
// 	this.monkey = null;
// 	var self = this;
// 	this.draw = function()
// 	{
// 		this.instance = canvas.display.icon({
// 			x:this.x,
// 			y:this.y,
// 			_x:this.x,
// 			_y:this.y,
// 			radius: this.radius,
// 			start: this.start,
// 			end: this.end,
// 			stroke: this.stroke,
// 			fill: this.fill,
// 			gradientFallOff: this.gradientFallOff,
// 			image: this.image
// 		});
// 		return this.instance;
// 	}
// 	
// 	this.click = function()
// 	{
// 		//this.instance.bind("click tap", function(){
// 		// 			debug.log("HI");
// 		//});
// 	}
// 	
// 	self.click();
// }
// 
// var ic = new Icon();
// ic.x = center.x;
// ic.y = center.y;
// canvas.addChild(ic.draw());
// // ic.instance.bind("click tap", function(){
// // 			debug.log("HI");
// // });
// debug.log(ic.click);



