script.js
window.addEventListener("load", function() {
	var icons = ["icons/icon1.ico","icons/icon2.ico","icons/icon3.ico","icons/icon4.ico"];
	document.getElementById("favicon").href = icons[Math.floor(Math.random() * icons.length)];
});

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const textContainer = document.getElementById("text-container");
const textPointer = document.getElementById("text-pointer");
const deleteButton = document.getElementById("deleteButton");
const forceCircle1 = document.getElementById("forceCircle1");
const forceCircle2 = document.getElementById("forceCircle2");
const rect = canvas.getBoundingClientRect();
let accuracy = 10;
document.addEventListener("wheel", function(event){
	var delta = Math.sign(event.deltaY) * -1;
	//if(accuracy+delta*5 > 0){
		
		if(delta>0){
			offsetX = Math.floor(-(Math.floor(500/accuracy/2)-offsetX)+(canvas.width/(accuracy*1.1)/2));
			offsetY = Math.floor(-(Math.floor(500/accuracy/2)-offsetY)+(canvas.width/(accuracy*1.1)/2));
			accuracy = accuracy*1.1
		}else if(accuracy > 2){
			offsetX = Math.floor(-(Math.floor(500/accuracy/2)-offsetX)+(canvas.width/(accuracy/1.1)/2));
			offsetY = Math.floor(-(Math.floor(500/accuracy/2)-offsetY)+(canvas.width/(accuracy/1.1)/2));
			accuracy = accuracy/1.1
		}
		//accuracy = accuracy+delta*5;
	//}
});

let controlPoints = [
{x: 184, y: 5, isControl: false, dir: 3},{x: 173.44905428162494, y: 5, isControl: true, dir: 0},{x: 162.59513245099916, y: 5.843559541534143, isControl: true, dir: 0},{x: 152, y: 7, isControl: false, dir: 4},{x: -25, y: 185, isControl: false, dir: 1},{x: -27.155694711448916, y: 195.58553922274731, isControl: true, dir: 0},{x: -28, y: 206.44417057822474, isControl: true, dir: 0},{x: -28, y: 217, isControl: false, dir: 4},{x: -23, y: 174, isControl: false, dir: 1},{x: -24.267112274056178, y: 177.61256673910532, isControl: true, dir: 0},{x: -24.931524072727804, y: 181.2904713549696, isControl: true, dir: 0},{x: -26, y: 185, isControl: false, dir: 3},{x: -19, y: 158, isControl: false, dir: 1},{x: -21.05238622169027, y: 163.28104195669295, isControl: true, dir: 0},{x: -22.378517407139086, y: 168.6029413684773, isControl: true, dir: 0},{x: -24, y: 174, isControl: false, dir: 3},{x: -8, y: 128, isControl: false, dir: 2},{x: -12.60080146438419, y: 137.30606401273303, isControl: true, dir: 0},{x: -16.446236605607695, y: 147.48467282621718, isControl: true, dir: 0},{x: -20, y: 158, isControl: false, dir: 3},{x: -3, y: 118, isControl: false, dir: 2},{x: -4.7391841828359915, y: 120.75657593643518, isControl: true, dir: 0},{x: -6.413314293038383, y: 124.1038246347465, isControl: true, dir: 0},{x: -8, y: 127, isControl: false, dir: 4},{x: 14, y: 90, isControl: false, dir: 3},{x: 7.975963460220974, y: 98.71881222596869, isControl: true, dir: 0},{x: 2.129006417198738, y: 107.88888881900093, isControl: true, dir: 0},{x: -3, y: 117, isControl: false, dir: 4},{x: 32, y: 69, isControl: false, dir: 3},{x: 26.036625218418678, y: 75.62289701854809, isControl: true, dir: 0},{x: 20.03297241879062, y: 82.62572921466429, isControl: true, dir: 0},{x: 15, y: 90, isControl: false, dir: 1},{x: 152, y: 8, isControl: false, dir: 2},{x: 148.32100820194714, y: 8.062075986175017, isControl: true, dir: 0},{x: 144.67316564187377, y: 8.718647729212968, isControl: true, dir: 0},{x: 141, y: 9, isControl: false, dir: 4},{x: 141, y: 10, isControl: false, dir: 2},{x: 135.5995603980839, y: 10.615779800846738, isControl: true, dir: 0},{x: 130.27364071121892, y: 11.937902328372148, isControl: true, dir: 0},{x: 125, y: 13, isControl: false, dir: 4},{x: 125, y: 14, isControl: false, dir: 2},{x: 114.45538583402931, y: 16.546766756702805, isControl: true, dir: 0},{x: 104.24539098530434, y: 20.39809233761231, isControl: true, dir: 0},{x: 95, y: 25, isControl: false, dir: 1},{x: 94, y: 25, isControl: false, dir: 3},{x: 91.12638744910646, y: 26.57077911680938, isControl: true, dir: 0},{x: 87.8019016701886, y: 28.228231364191117, isControl: true, dir: 0},{x: 85, y: 30, isControl: false, dir: 1},{x: 84, y: 30, isControl: false, dir: 3},{x: 74.88237360820415, y: 35.10941378372427, isControl: true, dir: 0},{x: 65.70676559415938, y: 40.95145410007856, isControl: true, dir: 0},{x: 57, y: 47, isControl: false, dir: 4},{x: 57, y: 48, isControl: false, dir: 2},{x: 49.62902624717949, y: 53.01218939146093, isControl: true, dir: 0},{x: 42.60189523574177, y: 59.04105483323727, isControl: true, dir: 0},{x: 36, y: 65, isControl: false, dir: 4},{x: 36, y: 66, isControl: false, dir: 2},{x: 34.81527054589021, y: 66.65562551557892, isControl: true, dir: 0},{x: 33.65078251328533, y: 67.8211557650357, isControl: true, dir: 0},{x: 33, y: 69, isControl: false, dir: 1}
];
let previousControlPoints = controlPoints.slice();

for(var i = 0, text = ""; i < controlPoints.length; i++){
	text = text+"{x: "+controlPoints[i].x+", y: "+controlPoints[i].y+", isControl: "+controlPoints[i].isControl+", dir: "+controlPoints[i].dir+"},";
}
document.getElementById("copy").value = text;

let isMouseDown = false;
canvas.addEventListener("mousedown", function(event){
	if(event.button === 0){
		if(!isMouseDown){
			isMouseDown = true;
			if(!isMagnet){
				selectedIndex = -1
			}
		}
	}else{
		offsetX = Math.floor(offsetX+500/accuracy/2-(Math.round(mouseX/accuracy)));
		offsetY = Math.floor(offsetY+500/accuracy/2-(Math.round(mouseY/accuracy)));
	}
});
canvas.addEventListener("mouseup", ()=>{isMouseDown = false;});

document.addEventListener("contextmenu", function(event) {
	event.preventDefault();
  });

let onMouseIndex = -1;
let selectedIndex = -1;
let calculateIndex = -1;

let isMagnet = false;
let isFittingGrid = false;
let direction = 0;
let dirMode = "中心";
let isSpacePressed  = false;
let isAltPressed = false;
let offsetX = 0;
let offsetY = -75;
let amount = 1;
let copy_ = "";
let isXkeyPressed = false;
let lastSelectedIndex = -1;
document.addEventListener("keydown", function(event){
	amount = isFittingGrid ? 5 : 1;
	if(event.key === "ArrowLeft"){
		offsetX = offsetX+amount ;
	}
	if(event.key === "ArrowUp"){
		offsetY = offsetY+amount ;
	}
	if(event.key === "ArrowRight"){
		offsetX = offsetX - amount ;
	}
	if(event.key === "ArrowDown"){
		offsetY = offsetY - amount ;
	}
	if(event.ctrlKey){
		isMagnet = true;
	}
	if(event.key === "Shift"){
		isFittingGrid = true;
	}
	if(event.key === " "){
		isSpacePressed = true;
	}
	if(event.key == "Enter"){
		copy_ = document.getElementById("copy").value;
		pushState();
		event.preventDefault();
		offsetX = offsetX-document.getElementById("offsetX").value;
		offsetY = offsetY-document.getElementById("offsetY").value;
		document.getElementById("offsetX").value = "";
		document.getElementById("offsetY").value = "";
		controlPoints = [];
		eval("controlPoints = ["+copy_+"];");
		for(var i = 0, text = ""; i < controlPoints.length; i++){
			text = text+"{x: "+controlPoints[i].x+", y: "+controlPoints[i].y+", isControl: "+controlPoints[i].isControl+", dir: "+controlPoints[i].dir+"},";
		}
		document.getElementById("copy").value = text;
	}
	if(event.key === "z"){
		undo()
	}
	if(event.key === "y"){
		redo()
	}
	if(event.key === "x"){
		if(!isXkeyPressed){
			isXkeyPressed = true;
			lastSelectedIndex = {x: controlPoints[onMouseIndex].x, y: controlPoints[onMouseIndex].y};
		}
	}
});
document.addEventListener("keyup", function(event){
	if(event.key === "Control"){
		isMagnet = false;
	}
	if(event.key === "Shift"){
		isFittingGrid = false;
	}
	if(event.key === " " && isSpacePressed){
		isSpacePressed = false;
		controlPoints[selectedIndex].dir = (direction+1)%9;
	}
	if(event.key === "x"){
		isXkeyPressed = false;
	}
});

let mouseX = 0;
let mouseY = 0;
canvas.addEventListener("mousemove", function(event){
	mouseX = isFittingGrid ? Math.floor(event.clientX/accuracy)*accuracy : event.clientX;
	mouseY = isFittingGrid ? Math.floor(event.clientY/accuracy)*accuracy : event.clientY;
});

setInterval(main, 10);

function main(){
	render_grid();
	render_mouse();
	render_bezier();
	render_points();
	calculateInformation();
}

function calculateInformation(){
	if(onMouseIndex != -1){
		calculateIndex = onMouseIndex;
	}
	if(calculateIndex != -1 && controlPoints.length%4 == 0){
		let calAngle=function(a, b){
			var pointAX = setDir(Math.floor(calculateIndex/4)*4+a, "x");
			var pointAY = setDir(Math.floor(calculateIndex/4)*4+a, "y");
			var pointBX = setDir(Math.floor(calculateIndex/4)*4+b, "x");
			var pointBY = setDir(Math.floor(calculateIndex/4)*4+b, "y");
			var x1 = (pointAX+offsetX)/accuracy;
			var y1 = (pointAY+offsetY)/accuracy;
			var x2 = (pointBX+offsetX)/accuracy;
			var y2 = (pointBY+offsetY)/accuracy;
			var radians = Math.atan2((y2 - y1), (x2 -x1));
			return (-(Math.round(radians*(180/Math.PI)*10000)/10000)+270)%360-180;
		}
		let calDistance=function(a, b){
			var pointAX = setDir(Math.floor(calculateIndex/4)*4+a, "x");
			var pointAY = setDir(Math.floor(calculateIndex/4)*4+a, "y");
			var pointBX = setDir(Math.floor(calculateIndex/4)*4+b, "x");
			var pointBY = setDir(Math.floor(calculateIndex/4)*4+b, "y");
			var x1 = (pointAX+offsetX)/accuracy;
			var y1 = (pointAY+offsetY)/accuracy;
			var x2 = (pointBX+offsetX)/accuracy;
			var y2 = (pointBY+offsetY)/accuracy;
			return Math.round(Math.sqrt((x2 - x1) ** 2+(y2 - y1) ** 2)*accuracy*10000)/10000;
		}
		point1 = controlPoints[Math.floor(calculateIndex/4)*4];
		point3 = controlPoints[Math.floor(calculateIndex/4)*4+3];
		document.getElementById("text2").textContent = "始点(x,z): "+(point1.x)+", "+(point1.y)+", AnchorYaw: "+calAngle(0, 1)+", AnchorLengthH: "+calDistance(0, 1);
		document.getElementById("text3").textContent = "終点(x,z): "+(point3.x)+", "+(point3.y)+", AnchorYaw: "+calAngle(3, 2)+", AnchorLengthH: "+calDistance(3, 2);
	}else{
		document.getElementById("text2").textContent = "クリックで追加, ※黒点(始/終)はｸﾘｯｸしながらｽﾍﾟｰｽｷｰで矢印ﾏｰｶｰにできます";
		document.getElementById("text3").textContent = "Shift:枠固定, Ctrl:吸い付き/分割, Z:undo, Y:redo, ﾏｳｽﾎｲｰﾙ:拡大, 十字ｷｰ:移動";
	}
	//document.getElementById("text2").textContent = "mouseX: "+mouseX/accuracy+", mouseY: "+mouseY/accuracy+"offsetX: "+offsetX+", offsetY: "+offsetY;

	switch(direction){
		case 0:  dirMode = "点"; break;
		case 1:  dirMode = "右"; break;
		case 2:  dirMode = "下"; break;
		case 3:  dirMode = "左"; break;
		case 4:  dirMode = "上"; break;
		case 5:  dirMode = "右上"; break;
		case 6:  dirMode = "右下"; break;
		case 7:  dirMode = "左下"; break;
		case 8:  dirMode = "左上"; break;
	}
	document.getElementById("text1").textContent = "マーカー: "+dirMode+(Math.round(mouseX/accuracy)-offsetX)+","+(Math.round(mouseY/accuracy)-offsetY);

}

function render_grid(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.strokeStyle = "gray";
	context.lineWidth = 1;
	for(let gridX = 0; gridX <= canvas.width; gridX += accuracy){
		context.beginPath();
		context.moveTo(gridX, 0);
		context.lineTo(gridX, canvas.height);
		context.stroke();
	}
	for(let gridY = 0; gridY <= canvas.height; gridY += accuracy){
		context.beginPath();
		context.moveTo(0, gridY);
		context.lineTo(canvas.width, gridY);
		context.stroke();
	}
}

function render_mouse(){
	context.beginPath();
	context.lineWidth = 2;
	context.rect(mouseX-accuracy, mouseY-accuracy, accuracy, accuracy);
	context.stroke();
}

function render_points(){
	let drawPoint = function(pointx, isSelected){
		if(pointx.dir == 0 || pointx.isControl){
			context.beginPath();
			if(isSelected){
				context.arc((pointx.x+offsetX-0.5)*accuracy, (pointx.y+offsetY-0.5)*accuracy, accuracy*4/5, 0, 2 * Math.PI, false);
				context.fillStyle = "gray";
			}else{
				context.arc((pointx.x+offsetX-0.5)*accuracy, (pointx.y+offsetY-0.5)*accuracy, accuracy/2, 0, 2 * Math.PI, false);
				context.fillStyle = pointx.isControl ? "green" : "black";
			}
			context.fill();
			context.closePath();
		}else{
			drawArrow(pointx, isSelected);
		}
	}
	let drawArrow = function(pointx, isSelected){
		var rateX = function(rateX, rateY){
			for(var i = 0, rateX_ = rateX, rateY_ = rateY; i < pointx.dir%4; ++i){
				var rateX__ = rateX_;
				var rateY__ = rateY_;
				var rateX_ = 10-rateY__;
				var rateY_ = rateX__;
			}
			var x1 = (pointx.x-0.5)*accuracy;
			var x2 = (pointx.x+0.5)*accuracy;
			return x1+(x2-x1)/10*rateX_+offsetX*accuracy-accuracy/2;
		}
		var rateY = function(rateX, rateY){
			for(var i = 0, rateX_ = rateX, rateY_ = rateY; i < pointx.dir%4; ++i){
				var rateX__ = rateX_;
				var rateY__ = rateY_;
				var rateX_ = 10-rateY__;
				var rateY_ = rateX__;
			}
			var y1 = (pointx.y-0.5)*accuracy;
			var y2 = (pointx.y+0.5)*accuracy;
			return y1+(y2-y1)/10*rateY_+offsetY*accuracy-accuracy/2;
		}
		context.beginPath();
		if(pointx.dir < 5){
			context.moveTo(rateX(5,0), rateY(5,0));
			context.lineTo(rateX(10,6), rateY(10,6));
			context.lineTo(rateX(7,6), rateY(7,6));
			context.lineTo(rateX(7,10), rateY(7,10));
			context.lineTo(rateX(3,10), rateY(3,10));
			context.lineTo(rateX(3,6), rateY(3,6));
			context.lineTo(rateX(0,6), rateY(0,6));
			context.lineTo(rateX(5,0), rateY(5,0));
		}else{
			context.moveTo(rateX(0,0), rateY(0,0));
			context.lineTo(rateX(9,0), rateY(9,0));
			context.lineTo(rateX(6,3), rateY(6,3));
			context.lineTo(rateX(10,7), rateY(10,7));
			context.lineTo(rateX(7,10), rateY(7,10));
			context.lineTo(rateX(3,6), rateY(3,6));
			context.lineTo(rateX(0,9), rateY(0,9));
			context.lineTo(rateX(0,0), rateY(0,0));
		}
		context.lineWidth = isSelected ? 4 : 1;
		context.strokeStyle = isSelected ? "rgba(128, 0, 0, 0.5)" : "red";
		context.stroke();
	}
	if(!isMagnet && !isMouseDown || selectedIndex != onMouseIndex){
		onMouseIndex = -1;
		for(var i = controlPoints.length-1; i > -1; i--){
			//var distance = isMagnet ? accuracy*2 : accuracy;
			var distance = accuracy;
			var deltaX = mouseX-(controlPoints[i].x+offsetX)*accuracy;
			var deltaY = mouseY-(controlPoints[i].y+offsetY)*accuracy;
			if (distance >=  Math.sqrt(deltaX**2+deltaY**2)){
				onMouseIndex = i;
				drawPoint(controlPoints[i], true);
				break;
			}
		}
	}
	if(isMouseDown){
		if(!isMagnet){
			if(onMouseIndex == -1){
				if(controlPoints.length == 0 || (selectedIndex != controlPoints.length-1 && selectedIndex == onMouseIndex)){
					var x_ = isFittingGrid ? Math.round(mouseX/accuracy)-offsetX : (mouseX/accuracy)-offsetX;
					var y_ = isFittingGrid ? Math.round(mouseY/accuracy)-offsetY : (mouseY/accuracy)-offsetY;
					pushState();
					controlPoints.push({x: x_, y: y_, isControl: (0< controlPoints.length%4 && controlPoints.length%4 <3), dir: (0< controlPoints.length%4 && controlPoints.length%4 <3) ? 0 : direction});
					selectedIndex = controlPoints.length-1;
				}
			}else{
				selectedIndex = onMouseIndex;
				direction = controlPoints[selectedIndex].dir;
			}
		}
		if(selectedIndex != -1){
			if(isMagnet){
				for(var i = 0; i < controlPoints.length; i++){
					var deltaX = mouseX-(controlPoints[i].x+offsetX)*accuracy;
					var deltaY = mouseY-(controlPoints[i].y+offsetY)*accuracy;
					if (i != selectedIndex && accuracy*2 >=  Math.sqrt(deltaX**2+deltaY**2)){
						detectChanges();
						controlPoints[selectedIndex].x = controlPoints[i].x;
						controlPoints[selectedIndex].y = controlPoints[i].y;
						break;
					}
				}
			}else{
				detectChanges();
				if(isXkeyPressed && controlPoints[selectedIndex].isControl){
					var x1 = lastSelectedIndex.x;
					var y1 = lastSelectedIndex.y;
					if(selectedIndex%4 == 1){
						var x2 = setDir(Math.floor(selectedIndex/4)*4, "x");
						var y2 = setDir(Math.floor(selectedIndex/4)*4, "y");
					}else{
						var x2 = setDir(Math.floor(selectedIndex/4)*4+3, "x");
						var y2 = setDir(Math.floor(selectedIndex/4)*4+3, "y");
					}
					if(Math.abs(x1-x2) > Math.abs(y1-y2)){
						controlPoints[selectedIndex].x = mouseX/accuracy-offsetX;
						controlPoints[selectedIndex].y = ((y1-y2)/(x1-x2))*(controlPoints[selectedIndex].x-x1)+y1;
					}else{
						controlPoints[selectedIndex].y = mouseY/accuracy-offsetY;
						controlPoints[selectedIndex].x = ((x1-x2)/(y1-y2))*(controlPoints[selectedIndex].y-y1)+x1;
					}
				}else{
					controlPoints[selectedIndex].x = isFittingGrid ? Math.round(mouseX/accuracy)-offsetX : mouseX/accuracy-offsetX;
					controlPoints[selectedIndex].y = isFittingGrid ? Math.round(mouseY/accuracy)-offsetY : mouseY/accuracy-offsetY;
				}
			}
		}
	}
	/*if(isMouseDown && selectedIndex != -1 && !controlPoints[selectedIndex].isControl && controlPoints[selectedIndex].dir != direction){
		controlPoints[selectedIndex].dir = direction;
	}*/
	for(var i = 0; i < controlPoints.length; i++) {
		
		if(i == selectedIndex || (!isMouseDown && 3<controlPoints.length && !controlPoints[Math.floor(i/4)+3].isControl && isMagnet && (Math.floor(i/4)+3 == selectedIndex || Math.floor(i/4) == selectedIndex))){
			drawPoint(controlPoints[i], true);
		}
		drawPoint(controlPoints[i], false);
	}
}

function render_bezier(){
	context.lineWidth = 1;
	if(calculateIndex != -1 && isMagnet && onMouseIndex == -1 && controlPoints.length%4 == 0){
		var P0 = {x:setDir(Math.floor(calculateIndex/4)*4, "x"), y:setDir(Math.floor(calculateIndex/4)*4, "y")};
		var P1 = {x:setDir(Math.floor(calculateIndex/4)*4+1, "x"), y:setDir(Math.floor(calculateIndex/4)*4+1, "y")};
		var P2 = {x:setDir(Math.floor(calculateIndex/4)*4+2, "x"), y:setDir(Math.floor(calculateIndex/4)*4+2, "y")};
		var P3 = {x:setDir(Math.floor(calculateIndex/4)*4+3, "x"), y:setDir(Math.floor(calculateIndex/4)*4+3, "y")};
		calculateBezierCurveY(mouseX/accuracy-offsetX, mouseY/accuracy-offsetY, P0, P1, P2, P3);
		context.beginPath();
		context.arc((newX+offsetX-1)*accuracy, (newY+offsetY-1)*accuracy, accuracy*4/5, 0, 2 * Math.PI, false);
		context.fillStyle = "gray";
		context.fill();
		context.closePath();
	}
	for (var i = 0; i < controlPoints.length; i += 4) {
		if (i+3 >= controlPoints.length) {
			break;
		}
		context.beginPath();
		context.moveTo((setDir(i, "x")+offsetX-0.5)*accuracy, (setDir(i, "y")+offsetY-0.5)*accuracy);
		context.bezierCurveTo(
			(setDir(i+1, "x")+offsetX-0.5)*accuracy, (setDir(i+1, "y")+offsetY-0.5)*accuracy,
			(setDir(i+2, "x")+offsetX-0.5)*accuracy, (setDir(i+2, "y")+offsetY-0.5)*accuracy,
			(setDir(i+3, "x")+offsetX-0.5)*accuracy, (setDir(i+3, "y")+offsetY-0.5)*accuracy
			);
		context.strokeStyle = "black";
		context.stroke();
		context.closePath();
	}
}

document.getElementById("deleteButton").addEventListener("click", function(event){
	if (controlPoints[selectedIndex]){
		pushState();
		var pointsSet = controlPoints.indexOf(controlPoints[selectedIndex]);
			controlPoints.splice(pointsSet - pointsSet%4, 4);
			selectedIndex = -1;
	}
});

let circle = 4*(Math.sqrt(2)-1)/3;
document.getElementById("forceCircle1").addEventListener("click", function(event){
	if (controlPoints[selectedIndex]){
		pushState();
		var x1 = setDir(Math.floor(selectedIndex/4)*4, "x");
		var y1 = setDir(Math.floor(selectedIndex/4)*4, "y");
		var x2 = setDir(Math.floor(selectedIndex/4)*4+3, "x");
		var y2 = setDir(Math.floor(selectedIndex/4)*4+3, "y");
		controlPoints[Math.floor(selectedIndex/4)*4+1].x = x1+(x2-x1)*circle;
		controlPoints[Math.floor(selectedIndex/4)*4+1].y = y1;
		controlPoints[Math.floor(selectedIndex/4)*4+2].x = x2;
		controlPoints[Math.floor(selectedIndex/4)*4+2].y = y2+(y1-y2)*circle;
	}
});
document.getElementById("forceCircle2").addEventListener("click", function(event){
	if (controlPoints[selectedIndex]){
		pushState();
		var x1 = setDir(Math.floor(selectedIndex/4)*4, "x");
		var y1 = setDir(Math.floor(selectedIndex/4)*4, "y");
		var x2 = setDir(Math.floor(selectedIndex/4)*4+3, "x");
		var y2 = setDir(Math.floor(selectedIndex/4)*4+3, "y");
		controlPoints[Math.floor(selectedIndex/4)*4+1].x = x1;
		controlPoints[Math.floor(selectedIndex/4)*4+1].y = y2+(y1-y2)*circle;
		controlPoints[Math.floor(selectedIndex/4)*4+2].x = x1+(x2-x1)*circle;
		controlPoints[Math.floor(selectedIndex/4)*4+2].y = y2;
	}
});

function setDir(i, xy){
	if(xy == "x"){
		switch(controlPoints[i].dir){
			case 1: return controlPoints[i].x-1/2;
			case 3: return controlPoints[i].x+1/2;
			case 5: return controlPoints[i].x-1/2;
			case 6: return controlPoints[i].x-1/2;
			case 7: return controlPoints[i].x+1/2;
			case 8: return controlPoints[i].x+1/2;
			default: return controlPoints[i].x;
		}
	}else{
		switch(controlPoints[i].dir){
			case 2: return controlPoints[i].y-1/2;
			case 4: return controlPoints[i].y+1/2;
			case 5: return controlPoints[i].y+1/2;
			case 6: return controlPoints[i].y-1/2;
			case 7: return controlPoints[i].y-1/2;
			case 8: return controlPoints[i].y+1/2;
			default: return controlPoints[i].y;
		}
	}
}

function calculateBezierCurveY(valueX, valueY, P0, P1, P2, P3) {
	if(P0.x-P3.x < P0.y-P3.y){
		var t = ((valueX - P0.x) / (P3.x - P0.x));
	}else{
		var t = ((valueY - P0.y) / (P3.y - P0.y));
	}
	if(t < 0 || 1 < t){
		return;
	}
	var a1 = P0.x+t*(P1.x-P0.x);
	var a2 = P1.x+t*(P2.x-P1.x);
	var a3 = P2.x+t*(P3.x-P2.x);
	var a4 = P0.y+t*(P1.y-P0.y);
	var a5 = P1.y+t*(P2.y-P1.y);
	var a6 = P2.y+t*(P3.y-P2.y);
	var a7 = a1+t*(a2-a1);
	var a8 = a4+t*(a5-a4);
	var a9 = a2+t*(a3-a2);
	var a10 = a5+t*(a6-a5);
	newX = a7+t*(a9-a7)+0.5;
	newY = a8+t*(a10-a8)+0.5;
	if(isMouseDown){
		pushState();
		detectChanges();
		controlPoints.push({x: newX-0.5, y: newY-0.5, isControl: false, dir: 0});
		controlPoints.push({x: a9, y: a10, isControl: true, dir: 0});
		controlPoints.push({x: a3, y: a6, isControl: true, dir: 0});
		controlPoints.push({x: controlPoints[Math.floor(calculateIndex/4)*4+3].x, y: controlPoints[Math.floor(calculateIndex/4)*4+3].y, isControl: false, dir: controlPoints[Math.floor(calculateIndex/4)*4+3].dir});
		controlPoints[Math.floor(calculateIndex/4)*4+1].x = a1;
		controlPoints[Math.floor(calculateIndex/4)*4+1].y = a4;
		controlPoints[Math.floor(calculateIndex/4)*4+2].x = a7;
		controlPoints[Math.floor(calculateIndex/4)*4+2].y = a8;
		controlPoints[Math.floor(calculateIndex/4)*4+3].x = newX-0.5;
		controlPoints[Math.floor(calculateIndex/4)*4+3].y = newY-0.5;
		controlPoints[Math.floor(calculateIndex/4)*4+3].dir = 0;
		selectedIndex = -1;
		onMouseIndex = -1;
		isMagnet = false;
		isMouseDown = false;
	}
}

let undoStack = [];
let redoStack = [];
var currentState = controlPoints.map(function(point) {
	return { x: point.x, y: point.y, isControl: point.isControl, dir: point.dir };
});
undoStack.push(currentState);

function undo() {
	if (undoStack.length === 0) {
	  return;
	}
	var previousState = undoStack.pop();
	redoStack.push(controlPoints.slice()); // 現在の状態をredoStackに保存
	controlPoints = previousState.slice(); // undo操作を実行
}
  
function redo() {
	if (redoStack.length === 0) {
	  return;
	}
	var nextState = redoStack.pop();
	undoStack.push(controlPoints.slice()); // 現在の状態をundoStackに保存
	controlPoints = nextState.slice(); // redo操作を実行
}

function pushState() {
	for(var i = 0, text = ""; i < controlPoints.length; i++){
		text = text+"{x: "+controlPoints[i].x+", y: "+controlPoints[i].y+", isControl: "+controlPoints[i].isControl+", dir: "+controlPoints[i].dir+"},";
	}
	document.getElementById("copy").value = text;
	var currentState = controlPoints.map(function(point) {
	  return { x: point.x, y: point.y, isControl: point.isControl, dir: point.dir };
	});
	undoStack.push(currentState);
	redoStack = [];
}

function detectChanges() {
	for(var i = 0, text = ""; i < controlPoints.length; i++){
		text = text+"{x: "+controlPoints[i].x+", y: "+controlPoints[i].y+", isControl: "+controlPoints[i].isControl+", dir: "+controlPoints[i].dir+"},";
	}
	document.getElementById("copy").value = text;
	if (!arraysEqual(controlPoints, previousControlPoints)) {
	  pushState();
	  previousControlPoints = controlPoints.slice();
	}
}

function arraysEqual(arr1, arr2) {
	if (arr1.length !== arr2.length) {
	  return false;
	}
	for (var i = 0; i < arr1.length; i++) {
	  if (!isObjectEqual(arr1[i], arr2[i])) {
		return false;
	  }
	}
	return true;
}
  
function isObjectEqual(obj1, obj2) {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}
