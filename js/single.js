//Declare editedLottie, isLottiePlaying, lottieanimation, cursePower and anim from tgskit.js. Declare developer mode var

var debugVar = false;
var editedLottie;
var lottieanimation = originalLottie;
cursePower = 1.5;
isLottiePlaying = true;
const anim = new TGSKit();

//Declare Legacy and New Color Palette Picker, declare General Border's checkbox

const RGBPalettePicker = document.getElementById("rgbpalette");
const RGBPalettePickerLegacy = document.getElementById("rgbpalettelegacy");
const generalBorderCheck = document.getElementById("generalBorderCheck");

var SelectedPalette = 'Legacy';
if (screen.width>600) {SelectedPalette = 'New';}

//Declare the lottie player

const animPreview = document.getElementById("animPreview");

//Declare all rgb pickers, the textarea and buttons.

const headInput = document.getElementById("headInput");
const skinInput = document.getElementById("skinInput");
const earInInput = document.getElementById("earInInput");
const tailPieceInput = document.getElementById("TailPieceInput");
const borderInput = document.getElementById("borderInput");
const eyesInput = document.getElementById("eyesInput");
//Edit: Now Legacy text boxes are declared too for mobile
const headInputLegacy = document.getElementById("headInputLegacy");
const skinInputLegacy = document.getElementById("skinInputLegacy");
const earInInputLegacy = document.getElementById("earInInputLegacy");
const tailPieceInputLegacy = document.getElementById("TailPieceInputLegacy");
const borderInputLegacy = document.getElementById("borderInputLegacy");
const eyesInputLegacy = document.getElementById("eyesInputLegacy");

const jsonInput = document.getElementById("jsonInput");
const applyButton = document.getElementById("applyButton");
const downloadButton = document.getElementById("downloadButton");
const downJSONButton = document.getElementById("downJSONButton");
const copyButton = document.getElementById("copyButton");

applyButton.addEventListener('click',buttonPressed);
copyButton.addEventListener('click',copyJSON);

//Declare All Palette's Colors and set them as default obtaining them from text boxes' default values

var PaletteHead = hexToRgb(headInput.value);
var PaletteBorder = hexToRgb(borderInput.value);
var PaletteSkin = hexToRgb(skinInput.value);
var PaletteTailPiece = hexToRgb(tailPieceInput.value);
var PaletteEarIn = hexToRgb(earInInput.value);
var PaletteEyesMounth = hexToRgb(eyesInput.value);

//Declare Category Titles for easterEgg

const title1 = document.getElementById("title1");
const title2 = document.getElementById("title2");
const title3 = document.getElementById("title3");

//Apply the palette to the image and json

applyPaletteJSON();
animPreview.load(JSON.parse(editedLottie));

//Function: update the palette to the current values of the text boxes

function updatePalette() {
	if (SelectedPalette == 'New') {
		PaletteHead = hexToRgb(headInput.value);
		PaletteBorder = hexToRgb(borderInput.value);
		PaletteSkin = hexToRgb(skinInput.value);
		PaletteTailPiece = hexToRgb(tailPieceInput.value);
		PaletteEarIn = hexToRgb(earInInput.value);
		PaletteEyesMounth = hexToRgb(eyesInput.value);
	}
	else {
		PaletteHead = checkHexColor(headInputLegacy.value, PaletteHead);
		PaletteBorder = checkHexColor(borderInputLegacy.value, PaletteBorder);
		PaletteSkin = checkHexColor(skinInputLegacy.value, PaletteSkin);
		PaletteTailPiece = checkHexColor(tailPieceInputLegacy.value, PaletteTailPiece);
		PaletteEarIn = checkHexColor(earInInputLegacy.value, PaletteEarIn);
		PaletteEyesMounth = checkHexColor(eyesInputLegacy.value, PaletteEyesMounth);
	}
	debugLog('Palette Updated');
}

//Function: converts RGB values from 0 to 255 into RGB values from 0.000 to 1.000, suitable for Lottie

function RGBtoLottieColor(col) {
	var LottieColor;
	LottieColor = parseInt('' + (col.split(", ")[0] / 255) * 1000) / 1000 + ', ' + parseInt('' + (col.split(", ")[1] / 255) * 1000) / 1000 + ', ' + parseInt('' + (col.split(", ")[2] / 255) * 1000) / 1000;
	debugLog ('RGB ' + col + ' converted to ' + LottieColor)
	return LottieColor;
}

//Function: Apply the changes to the Lottie code

function applyPaletteJSON() {
	editedLottie = lottieanimation;
	editedLottie = editedLottie.replace(/0.4271,0.1061,0.2821/g, RGBtoLottieColor(PaletteBorder));
	editedLottie = editedLottie.replace(/1.0001,0.6711,0.6751/g, RGBtoLottieColor(PaletteHead));
	editedLottie = editedLottie.replace(/1.0001,0.9531,0.9221/g, RGBtoLottieColor(PaletteSkin));
	editedLottie = editedLottie.replace(/0.9491,0.5061,0.5531/g, RGBtoLottieColor(PaletteTailPiece));
	editedLottie = editedLottie.replace(/0.8001,0.3841,0.5141/g, RGBtoLottieColor(PaletteEarIn));
	editedLottie = editedLottie.replace(/0.0001,0.0001,0.0001/g, RGBtoLottieColor(PaletteEyesMounth));
	
	if (generalBorderCheck.checked==true) {editedLottie = editedLottie.replace(/1,1,1,1/g, RGBtoLottieColor(lighterColor(PaletteBorder, '100')) + ", 1"); 
		debugLog("General Border Color Changed, I guess")}
	else {editedLottie = editedLottie.replace(new RegExp (RGBtoLottieColor(lighterColor(PaletteBorder, '150', false)) + ", 1", "g"), "1, 1, 1, 1")};
	debugLog('JSON Changed');
}

//Function: Start everything at the click of the applyButton button

function buttonPressed() {
	debugLog("buttonpressed() initialized");
	updatePalette();
	applyPaletteJSON();
	isLottiePlaying = true;
	animPreview.load(JSON.parse(editedLottie));
}

//Function: Starts downloading the converted TGS file using the TGSKit library

function download() {
	anim.load(editedLottie);
	debugLog('Sticker Download Started');
	M.toast({html: 'Sticker Download Started'});
	debugLog("Sticker Download Started");
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

//Function: Copy Lottie Code to Clipboard when copyButton is clicked
//Note: this works by saving borderInputLegacy's value, changing it to Lottie Code, selecting it, and then copying it and resetting to original value.
//It's a bit dumb but it works well and it doesn't need to edit HTML.

function copyJSON() {
	var borderOriginalValue = borderInputLegacy.value;
	if (SelectedPalette == 'New') {PickerSwitch()};
	borderInputLegacy.value = editedLottie;
	var copyText = document.querySelector("#borderInputLegacy");
	copyText.select();
	copyText.setSelectionRange(0, 99999);
	document.execCommand("copy");
	M.toast({html: 'JSON Code copied to clipboard'});
	debugLog("JSON Code copied to clipboard");
	borderInputLegacy.value = borderOriginalValue;
}

//Function: Converts Hexadecimal Color Numbers to RGB Values

function hexToRgb(hex) {
	var r, g, b;
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    r = parseInt(result[1], 16);
    g = parseInt(result[2], 16);
    b = parseInt(result[3], 16);
	return r + ", " + g + ", " + b;
}

//Function: Check if the input is an Hexadecimal Number (with #) and converts it to RGB. Check Easter Egg too

function checkHexColor(color, palette) {
	if (color.slice(0, 1) == '#') {
	return hexToRgb(color);}
	else if (color == 'penis') {easterEgg(); return palette;}
	else {
	return color;}
}

//Function: Switchs Between Legacy and New Color Picker Mode

function PickerSwitch() {
	if (SelectedPalette == 'New') {
		SelectedPalette = 'Legacy';
		RGBPalettePicker.style = 'display: none';
		RGBPalettePickerLegacy.style = 'display: inline';
		}
	else {
		SelectedPalette = 'New';
		RGBPalettePicker.style = 'display: inline';
		RGBPalettePickerLegacy.style = 'display: none';
	}
	debugLog("Color picker Switched");
}

//Function: Limit a Number between 0 and 255 (https://www.w3resource.com/javascript-exercises/javascript-math-exercise-37.php)

function limitToRGB(val) {
	var min = 0;
	var max = 255;
	if (val >> max) debugLog(val + " is higher than 255, so it's been limited to RGB Color Space");
	return val < min ? min : (val > max ? max : val);
}

//Function: Makes an RGB Color Lighter by a given Value

function lighterColor(OrigColor, Light, check) {
	var r, g, b;
	r = limitToRGB(+OrigColor.split(", ")[0] + +Light);
	g = limitToRGB(+OrigColor.split(", ")[1] + +Light);
	b = limitToRGB(+OrigColor.split(", ")[2] + +Light);
	var Result = r + ", " + g + ", " + b;
	debugLog(OrigColor + " Made Lighter! Now it's " + Result);
	return Result;
}

//Function: Reset Cat's Lottie Code to default state

function resetCat() {
	lottieanimation = originalLottie;
	M.toast({html: "<var style='width:145px;'>Felis silvestris catus</var> is now clear from curses, and he's the second son of God"});
	applyPaletteJSON();
	cursePower = 1.1;
	animPreview.load(JSON.parse(editedLottie));
	navigator.vibrate(0);
	debugLog("Cat resetted")
}

//Function: Edits the editedLottie adding a Curse/Random Corruption. 100% made by @Marekkon5 lmso


function addCurse() {
	if (!lottieanimation) {
		lottieanimation = originalLottie;
	}
	if (typeof lottieanimation != 'object') {
		lottieanimation = JSON.parse(lottieanimation);
   }
   //Janky loops
	for(let i=0; i<lottieanimation.layers.length; i++) {
		for(let k of Object.keys(lottieanimation.layers[i].ks)) {
	if (typeof lottieanimation.layers[i].ks[k].k[0] == 'object') {
     
	for(let j=0; j<lottieanimation.layers[i].ks[k].k.length; j++){
		for (let l=0; l<lottieanimation.layers[i].ks[k].k[j].s.length; l++) {
        
		lottieanimation.layers[i].ks[k].k[j].s[l] = Math.random() * lottieanimation.layers[i].ks[k].k[j].s[l] * cursePower;
      }
     }
     }
     }
   }
   
	//So Francesco can do more replacing
	lottieanimation = JSON.stringify(lottieanimation);
	M.toast({html: "<var style='width:140px;'>Felis silvestris catus</var> has been <var class='center-align' style='width: 56px'>cursed</var> by the Lord"});
	applyPaletteJSON();
	animPreview.load(editedLottie);
	cursePower += 0.1;
	debugLog("A curse has been added");
}

//Function: Pause and Plays the Animation when clicked

function playPauseCat() {
	if (isLottiePlaying == true) {
		animPreview.pause();
		isLottiePlaying = false;
		debugLog("Animation stopped");
	}
	else {
		animPreview.play();
		isLottiePlaying = true;
		debugLog("animation started");
	}
}

//Function: Randomizes Palette's Colors

function randomizePalette() {
	if (SelectedPalette == 'New') {PickerSwitch()};
	
		headInputLegacy.value = randomizeRGB();
		borderInputLegacy.value = randomizeRGB();
		skinInputLegacy.value = randomizeRGB();
		tailPieceInputLegacy.value = randomizeRGB();
		earInInputLegacy.value = randomizeRGB();
		eyesInputLegacy.value = randomizeRGB();
		
		updatePalette();
		applyPaletteJSON();
		animPreview.load(editedLottie);
		debugLog("The palette has been randomized");
}

//Function: Randomizes an RGB Color

function randomizeRGB() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	var sp = ', ';
	debugLog("The color " + r + sp + g + sp + b + " ha been randomized");
	return r + sp + g + sp + b;
}

//Function: Easter Egg ;)

function easterEgg() {
	debugLog("easterEgg started");
	lottieanimation = easterLottie;
	title1.innerText = 'ahahah';
	title2.innerText = 'vibing penis';
	title3.innerText = 'so funi';
	downJSONButton.innerText = '@francasDM';
	downloadButton.innerText = '@Marekkon5';
	navigator.vibrate([600000]);
}

//Function: Enables a debug mode
//Function: Makes a console log only if debug mode is enabled

function debugMode(set) {
	debugVar = set;
	console.log("Debug Mode is now set to " + set);
}

function debugLog(text) {
	if (debugVar == true) console.log(text);
}