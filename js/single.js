//Declare editedLottie, showJSONCode and anim from tgskit.js

var editedLottie;
var showJSON = false;
const anim = new TGSKit();

//Declare all parts of the vector image

const catHead = document.getElementById("head");
const catSkin = document.getElementById("skin");
const catEyes = document.getElementById("eyes");
const catMounth = document.getElementById("mounth");
const catBorder = document.getElementById("border");
const catBorder2 = document.getElementById("border2");
const catEarIn = document.getElementById("earin");
const catEarOut = document.getElementById("earout");
const catTail = document.getElementById("tail");
const catTailPiece = document.getElementById("tailpiece");

//Declare all text boxes, the textarea and buttons.

const headInput = document.getElementById("headInput");
const skinInput = document.getElementById("skinInput");
const earInInput = document.getElementById("earInInput");
const tailPieceInput = document.getElementById("TailPieceInput");
const borderInput = document.getElementById("borderInput");
const eyesInput = document.getElementById("eyesInput");

const jsonInput = document.getElementById("jsonInput");
const applyButton = document.getElementById("applyButton");
const downloadButton = document.getElementById("downloadButton");
const downJSONButton = document.getElementById("downJSONButton");
const copyButton = document.getElementById("copyButton");

applyButton.addEventListener('click',buttonPressed);
copyButton.addEventListener('click',copyJSON);

//Declare All Palette's Colors and set them as default obtaining them from text boxes' default values

var PaletteHead = headInput.value;
var PaletteBorder = borderInput.value;
var PaletteSkin = skinInput.value;
var PaletteTailPiece = tailPieceInput.value;
var PaletteEarIn = earInInput.value;
var PaletteEyesMounth = eyesInput.value;

//Apply the palette to the image and json

applyPaletteImage();
applyPaletteJSON();

//Function: update the palette to the current values of the text boxes

function updatePalette() {
	PaletteHead = headInput.value;
	PaletteBorder = borderInput.value;
	PaletteSkin = skinInput.value;
	PaletteTailPiece = tailPieceInput.value;
	PaletteEarIn = earInInput.value;
	PaletteEyesMounth = eyesInput.value;
	console.log('Palette Updated')
}

//Function: apply the palette to the preview image

function applyPaletteImage() {
	catBorder.style = 'stroke: rgb(' + PaletteBorder + '); stroke-width:3.61444; fill: none;';
	catBorder2.style = 'stroke: rgb(' + PaletteBorder + '); stroke-width:3.61444; fill: none;';
	catSkin.style = 'fill: rgb(' + PaletteSkin + ');';
	catTailPiece.style = 'fill: rgb(' + PaletteTailPiece + ');';
	catEarIn.style = 'fill: rgb(' + PaletteEarIn + ');';
	catEyes.style = 'fill: rgb(' + PaletteEyesMounth + ');';
	catMounth.style = 'stroke: rgb(' + PaletteEyesMounth + '); fill:none;stroke-width:4.052;';
	catHead.style= "fill: rgb(" + PaletteHead + ");";
	catTail.style = "fill: rgb(" + PaletteHead + ");";
	catEarOut.style = "fill: rgb(" + PaletteHead + ");";
}

//Function: converts RGB values from 0 to 255 into RGB values from 0.000 to 1.000, suitable for Lottie

function RGBtoLottieColor(col) {
	var LottieColor;
	LottieColor = parseInt('' + (col.split(", ")[0] / 255) * 1000) / 1000 + ', ' + parseInt('' + (col.split(", ")[1] / 255) * 1000) / 1000 + ', ' + parseInt('' + (col.split(", ")[2] / 255) * 1000) / 1000;
	console.log ('RGB ' + col + ' converted to ' + LottieColor)
	return LottieColor;
}

//Function: Apply the changes to the Lottie code

function applyPaletteJSON() {
	editedLottie = lottieanimation
	editedLottie = editedLottie.replace(/0.427, 0.106, 0.282/g, RGBtoLottieColor(PaletteBorder));
	editedLottie = editedLottie.replace(/1, 0.671, 0.675/g, RGBtoLottieColor(PaletteHead));
	editedLottie = editedLottie.replace(/1, 0.953, 0.922/g, RGBtoLottieColor(PaletteSkin));
	editedLottie = editedLottie.replace(/0.949, 0.506, 0.553/g, RGBtoLottieColor(PaletteTailPiece));
	editedLottie = editedLottie.replace(/0.8, 0.384, 0.514/g, RGBtoLottieColor(PaletteEarIn));
	editedLottie = editedLottie.replace(/0, 0, 0/g, RGBtoLottieColor(PaletteEyesMounth));
	if (showJSON == true) jsonInput.value = editedLottie;
	console.log('JSON Changed');
}

//Function: Start everything at the click of the applyButton button

function buttonPressed() {
	updatePalette();
	applyPaletteImage();
	applyPaletteJSON();
}

//Function: Starts downloading the converted TGS file using the TGSKit library

function download() {
	anim.load(editedLottie);
	console.log('Sticker Download Started');
	M.toast({html: 'Sticker Download Started'});
	anim.download('sticker');
}

//Function: Starts Downloading the Lottie Code (https://gist.github.com/danallison/3ec9d5314788b337b682)

function downloadString(text, fileType, fileName) {
	var blob = new Blob([text], { type: fileType });
	var a = document.createElement('a');
	a.download = fileName;
	a.href = URL.createObjectURL(blob);
	a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
	a.style.display = "none";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}

//Function: Re-enables the jsonInput and shows Lottie Code to user
function enableShowJSON() {
	showJSON = true;
	jsonInput.value = editedLottie;
	console.log('JSON Code is now shown.');
	M.toast({html: 'JSON Code is now shown'});
}

//Function: Copy Lottie Code to Clipboard when copyButton is clicked
//Note: this works by saving borderInput's value, changing it to Lottie Code, selecting it, and then copying it and resetting to original value.
//It's a bit dumb but it works well and it doesn't need to edit HTML.

function copyJSON() {
	var borderOriginalValue = borderInput.value;
	borderInput.value = editedLottie;
	var copyText = document.querySelector("#borderInput");
	copyText.select();
	copyText.setSelectionRange(0, 99999);
	document.execCommand("copy");
	M.toast({html: 'JSON Code copied to clipboard'});
	borderInput.value = borderOriginalValue;
}