let colortime = 0;
let graph = [];
let reconstructed = [];
let ax = [];
let bx = [];

let ay = [];
let by = [];
let f_x = [];
let f_y = [];
let temp = [];
const N = 80;
const T = Math.floor(2*Math.PI*element.length/10);
const w = element.length/10
let original_graph_x = [];
let original_graph_y = [];
function setup(){
	createCanvas(900, 900);
	background(255);
	for(i=0;i<T;i++){
		original_graph_x[i] = element[floor(element.length*i/T)].y/2;
		original_graph_y[i] = element[floor(element.length*i/T)].x/2;
	}
	for(i=0;i<T;i++){
		ax[i] = 0;
		bx[i] = 0;
		ay[i] = 0;
		by[i] = 0;
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
	background(backgroundcolor);
	colortime+=1;
	noFill();
	strokeWeight(2);
	stroke(250,0,250);
	
	beginShape();
	for(i=0;i<graph.length; i++){
		vertex(i+200, graph[i]);
	}
	endShape(OPEN);
	FT_x();
	FT_y();
	stroke(200,200,200);
	let cumu_x = 0;
	let cumu_y = 0;

	// along y axis
	for(i=0;i<N;i++){
		if(i>0){
			cumu_x += bx[i] * sin(i*Math.PI*colortime/T);
		}
		cumu_x += ax[i] * cos(i*Math.PI * colortime/T);
	}

	// along x axis
	for(i=0;i<N;i++){
		if(i>0){
			cumu_y += by[i] * sin(i*Math.PI*colortime/T);
		}
		cumu_y += ay[i] * cos(i*Math.PI * colortime/T);
	}

	f_x.unshift(cumu_x);
	f_y.unshift(cumu_y);
	if(f_x.length > 3000){
		f_x.pop();
		f_y.pop();
	}

	// beginShape();
	// for(i=0;i<f_x.length; i++){
	// 	vertex(i+200, 300 + f_x[i]);
	// }
	// endShape(OPEN);

	// beginShape();
	// for(i=0;i<f_y.length; i++){
	// 	vertex(300 + f_y[i], i+200);
	// }
	// endShape(OPEN);

	// circle along y axis 
	xpointer_x = 100;
	ypointer_x = 380;
	for(i=1;i<N;i++){
		ellipse(xpointer_x, ypointer_x, 2*ax[i])
		ypointer_x += ax[i] * cos(colortime*i*Math.PI/T);
		xpointer_x += ax[i] * sin(colortime*i*Math.PI/T);
		ellipse(xpointer_x, ypointer_x, 2* bx[i])
		ypointer_x += bx[i] * sin(colortime*i*Math.PI/T);
		xpointer_x += bx[i] * cos(colortime*i*Math.PI/T);
	}

	// circle along x axis
	xpointer_y = 380;
	ypointer_y = 100;
	for(i=1;i<N;i++){
		ellipse(xpointer_y, ypointer_y, 2* ay[i])
		ypointer_y += ay[i] * sin(colortime*i*Math.PI/T);
		xpointer_y += ay[i] * cos(colortime*i*Math.PI/T);
		ellipse(xpointer_y, ypointer_y, 2* by[i])
		ypointer_y += by[i] * cos(colortime*i*Math.PI/T);
		xpointer_y += by[i] * sin(colortime*i*Math.PI/T);
	}

	line(xpointer_x, ypointer_x, xpointer_y, ypointer_x);
	line(xpointer_y, ypointer_y, xpointer_y, ypointer_x);

	ellipse(xpointer_y, ypointer_x, 10);

	beginShape();
	for(i=0;i<f_x.length;i++){
		vertex(285+f_y[i], 380+f_x[i]);
	}
	endShape(OPEN);

}

function FT_x(){
	for(i=0;i<T;i++){
		ax[i] = 0;
		bx[i] = 0;
	}
	for(i=-T;i<T;i+=1){
		if(i<0){
			for(j=0;j<N;j++){
				ax[j] += (2/T) * original_graph_x[T+i] * cos(Math.PI*j*i/T);
				bx[j] += (2/T) * original_graph_x[T+i] * sin(Math.PI*j*i/T);
			}
		}
		else{
			for(j=0;j<N;j++){
				ax[j] += (2/T) * original_graph_x[i] * cos(Math.PI*j*i/T);
				bx[j] += (2/T) * original_graph_x[i] * sin(Math.PI*j*i/T);
			}
		}
	}
}

function FT_y(){
	for(i=0;i<T;i++){
		ay[i] = 0;
		by[i] = 0;
	}
	for(i=-T;i<T;i+=1){
		if(i<0){
			for(j=0;j<N;j++){
				ay[j] += (2/T) * original_graph_y[T+i] * cos(Math.PI*j*i/T);
				by[j] += (2/T) * original_graph_y[T+i] * sin(Math.PI*j*i/T);
			}
		}
		else{
			for(j=0;j<N;j++){
				ay[j] += (2/T) * original_graph_y[i] * cos(Math.PI*j*i/T);
				by[j] += (2/T) * original_graph_y[i] * sin(Math.PI*j*i/T);
			}
		}
	}
}