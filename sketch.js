let colortime = 0;
let graph = [];
let reconstructed = [];
let a = [];
let b = [];
const N = 1000;
const period = 200 * Math.PI;
const T = Math.floor(2*Math.PI*100);
let original_graph = [];
function setup(){
	createCanvas(500, 500);
	background(255);
	for(i=0;i<T;i++){
		if(i<100){
			original_graph[i] = 40;
		}
		else{
			original_graph[i] = 0;
		}
	}
	for(i=0;i<T;i++){
		a[i] = 0;
		b[i] = 0;
	}
}

function draw(){
	if(colortime%510>255){
		backgroundcolor = 510-colortime%510;
	}
	else{
		backgroundcolor = colortime%510;
	}
	backgroundcolor = 0;
	let y = 40 * sin(colortime/100);
	background(backgroundcolor);
	colortime+=1;
	noFill();
	strokeWeight(2);
	stroke(250,0,250);
	ellipse(100, 200, 80);
	xpointer = 100 + 40 * cos(colortime/100);
	ypointer = 200 + 40 * sin(colortime/100);
	for(i=1;i<N;i++){
		ellipse(xpointer,ypointer,80/(2*i+1));
		xpointer = xpointer + 40/(2*i+1) * cos(colortime*(2*i+1)/100);
		ypointer = ypointer + 40/(2*i+1) * sin(colortime*(2*i+1)/100);
	}
	line(xpointer, ypointer, 200, ypointer);
	stroke(150,100,200);
	ellipse(xpointer, ypointer, 5);
	y = ypointer
	graph.unshift(y);
	if(graph.length>300){
		graph.pop();
	}
	beginShape();
	for(i=0;i<graph.length; i++){
		vertex(i+200, graph[i]);
	}
	endShape(OPEN);
	FT();
	console.log(a);
}

function FT(array){
	a[0] = 0;
	for(i=0;i<T;i++){
		a[0] += (2/T) * original_graph[i];
	}
}