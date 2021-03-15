let gameCanvas = document.getElementById('gameCanvas');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let restartButton = document.getElementById('restart');
let context = gameCanvas.getContext('2d');
let ijList = {};
let ijNewList = {};
let interval = -1;

window.onload = function(){
	init(context);
	window.addEventListener("resize", init, false);
	drawLines(context);
}

function init(context){
	let width = window.innerWidth - Math.floor(window.innerWidth % 15)
	let height = window.innerHeight - Math.floor(window.innerHeight % 15)
	context.canvas.width = width;
	context.canvas.height = height;
	context.fillStyle = '#3fb6b7';
}

function drawLines(context){
	let width = context.canvas.width;
	let height = context.canvas.height;

	// draw the outline of the canvas
	context.fillStyle = 'black';
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(0, height);
	context.lineTo(width, height);
	context.lineTo(width, 0);
	context.lineTo(0, 0);
	context.stroke();

	context.fillStyle = 'white';
	// draw vertical lines
	for (let i = 1; i < Math.floor(width / 15); i++){
		context.beginPath();
		context.moveTo(15 * i, 0);
		context.lineTo(15 * i, height);
		context.stroke();
	}
	// draw horizontal lines
	for (let i = 1; i < Math.floor(height / 15); i++){
		context.beginPath();
		context.moveTo(0, 15 * i);
		context.lineTo(width, 15 * i);
		context.stroke();
	}
}

gameCanvas.addEventListener('click', (event) => {
	let rect = gameCanvas.getBoundingClientRect();
	let x = event.clientX - rect.left;
	let y = event.clientY - rect.top;
	chooseSeeds(x, y);
})

function addToijList(i, j){
	if (i.toString() in ijList){
		if (!ijList[i.toString()].includes(j)){
			ijList[i.toString()].push(j);
		}
	} else {
		ijList[i.toString()] = [j];
	}
}

function addToijNewList(i, j){
	if (i.toString() in ijNewList){
		if (!ijNewList[i.toString()].includes(j)){
			ijNewList[i.toString()].push(j);
		}
	} else {
		ijNewList[i.toString()] = [j];
	}
}

function updateLists(){
	Object.keys(ijList).forEach(key => delete ijList[key]);
	for (key in ijNewList){
		ijList[key] = ijNewList[key];
	}
	Object.keys(ijNewList).forEach(key => delete ijNewList[key]);
}

function emptyAllLists(){
	Object.keys(ijList).forEach(key => delete ijList[key]);
	Object.keys(ijNewList).forEach(key => delete ijNewList[key]);
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function chooseSeeds(x, y){
	let i = Math.floor(x / 15);
	let j = Math.floor(y / 15);
	let pixel = context.getImageData(x, y, 1, 1).data; 
    let hex = "#" + ("000000" + rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6);
    console.log(hex);
    if (hex != '#f04b54'){
    	addToijList(i, j);
		context.fillStyle = '#f04b54';
		context.fillRect(15 * i + 1, 15 * j + 1, 13, 13);
    } else {
    	console.log(ijList[i.toString()]);
    	let k = ijList[i.toString()].indexOf(j);
    	ijList[i.toString()] = ijList[i.toString()].splice(k, 1);
    	if (ijList[i.toString()].length == 0){
    		delete ijList[i.toString()];
    	}
    	context.fillStyle = 'white';
		context.fillRect(15 * i + 1, 15 * j + 1, 13, 13);
    }
}

function checkNeighbourNum(i, j){
	let n = 0;
	if ((i-1).toString() in ijList){
		if (ijList[(i-1).toString()].includes(j)){
			n++;
		}
	}
	if ((i-1).toString() in ijList){
		if (ijList[(i-1).toString()].includes(j+1)){
			n++;
		}
	}
	if (i.toString() in ijList){
		if (ijList[i.toString()].includes(j+1)){
			n++;
		}
	}
	if ((i+1).toString() in ijList){
		if (ijList[(i+1).toString()].includes(j+1)){
			n++;
		}
	}
	if ((i+1).toString() in ijList){
		if (ijList[(i+1).toString()].includes(j)){
			n++;
		}
	}
	if ((i+1).toString() in ijList){
		if (ijList[(i+1).toString()].includes(j-1)){
			n++;
		}
	}
	if (i.toString() in ijList){
		if (ijList[i.toString()].includes(j-1)){
			n++;
		}
	}
	if ((i-1).toString() in ijList){
		if (ijList[(i-1).toString()].includes(j-1)){
			n++;
		}
	}
	return n;
}

function checkNeighbourhoods(i, j){
	if (checkNeighbourNum(i-1, j) == 3){
		addToijNewList(i-1, j);
	}
	if (checkNeighbourNum(i-1, j+1) == 3){
		addToijNewList(i-1, j+1);
	}
	if (checkNeighbourNum(i, j+1) == 3){
		addToijNewList(i, j+1);
	}
	if (checkNeighbourNum(i+1, j+1) == 3){
		addToijNewList(i+1, j+1);
	}
	if (checkNeighbourNum(i+1, j) == 3){
		addToijNewList(i+1, j);
	}
	if (checkNeighbourNum(i+1, j-1) == 3){
		addToijNewList(i+1, j-1);
	}
	if (checkNeighbourNum(i, j-1) == 3){
		addToijNewList(i, j-1);
	}
	if (checkNeighbourNum(i-1, j-1) == 3){
		addToijNewList(i-1, j-1);
	}
}


function erasePrevStep(){
	for (let key in ijList){
		let i = parseInt(key);
		let jl = ijList[key];
		for (let k = 0; k < jl.length; k++){
			let j = jl[k];
			context.fillStyle = 'white';
			context.fillRect(15 * i + 1, 15 * j + 1, 13, 13);
		}
	}
}

function nextGameStep(){
	for (let key in ijList){
		let i = parseInt(key);
		let jl = ijList[key];
		for (let k = 0; k < jl.length; k++){
			// any dead cell with exactly 3 neighbours becomes alive
			j = jl[k];
			checkNeighbourhoods(i, j);
			// any living cell with 2 or 3 neighbours lives
			let n = checkNeighbourNum(i, j);
			if (n == 2 || n == 3){
				addToijNewList(i, j);
			}	
		}
	}
	updateLists();
}

function drawNextStep(){
	for (let key in ijList){
		let i = parseInt(key);
		let jl = ijList[key];
		for (let k = 0; k < jl.length; k++){
			let j = jl[k];
			context.fillStyle = '#f04b54';
			context.fillRect(15 * i + 1, 15 * j + 1, 13, 13);
		}
	}
}

startButton.onclick = function (){
	interval = setInterval(update, 1000);
	if (Object.keys(ijList).length == 0){
		clearInterval(interval);
		interval = -1;
	}
}

pauseButton.onclick = function (){
	clearInterval(interval);
	interval = -1;
}

restartButton.onclick = function (){
	// if interval is not cleared yet
	if (interval != -1){
		clearInterval(interval);
		interval = -1;
	}
	erasePrevStep();
	emptyAllLists();
}

function update(){
	erasePrevStep();
	nextGameStep();
	drawNextStep();
}