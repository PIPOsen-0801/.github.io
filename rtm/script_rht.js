const opacitySlider = document.getElementById("opacitySlider");
const opacityValue = document.getElementById("opacityValue");

opacitySlider.addEventListener("input", function(){
  const opacity = opacitySlider.value;
  opacityValue.textContent = "Alpha:"+Math.round((1-opacity)*100)+"%";
});

window.addEventListener("load", function(){
	var icons = ["icons/icon1.ico","icons/icon2.ico","icons/icon3.ico","icons/icon4.ico"];
	document.getElementById("favicon").href = icons[Math.floor(Math.random() * icons.length)];
});

const frontImage = document.createElement("img");
frontImage.src = "dot1.png";

function imageLoaded(){
	const uploadInput = document.getElementById("uploadInput");
	const uploadedImage = new Image();
	const reader = new FileReader();
	reader.onload = function(event){
		uploadedImage.onload = function(){
			const canvas = document.getElementById("canvas");
			const context = canvas.getContext("2d");
			canvas.width = uploadedImage.width * 4;
			canvas.height = uploadedImage.height * 4;
			context.mozImageSmoothingEnabled = false;
			context.webkitImageSmoothingEnabled = false;
			context.msImageSmoothingEnabled = false;
			context.imageSmoothingEnabled = false;
			context.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
			context.globalAlpha = opacitySlider.value;
		};
		uploadedImage.src = event.target.result;
	};
	reader.readAsDataURL(uploadInput.files[0]);
}

document.getElementById("loadButton").addEventListener("click", function(event){
	const uploadInput = document.getElementById("uploadInput");
	const uploadedImage = new Image();
	const reader = new FileReader();
	reader.onload = function(event){
		uploadedImage.onload = function(){
			const canvas = document.getElementById("canvas");
			const context = canvas.getContext("2d");
			canvas.width = uploadedImage.width * 4;
			canvas.height = uploadedImage.height * 4;
			context.mozImageSmoothingEnabled = false;
			context.webkitImageSmoothingEnabled = false;
			context.msImageSmoothingEnabled = false;
			context.imageSmoothingEnabled = false;
			context.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
			context.globalAlpha = opacitySlider.value;
			for (let x = 0; x < canvas.width; x += 4){
				for (let y = 0; y < canvas.height; y += 4){
					context.drawImage(frontImage, x, y, 4, 4);
				}
			}
			context.globalAlpha = 1;
		};
		uploadedImage.src = event.target.result;
	};
	reader.readAsDataURL(uploadInput.files[0]);
});

window.onload = function(){
	const uploadInput = document.getElementById("uploadInput");
	uploadInput.addEventListener("change", imageLoaded);
};
