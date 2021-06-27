let colortime = 0;
let graph = [];
let reconstructed = [];
let ax = [];
let bx = [];

let ay = [];
let by = [];
let f_x = [];
let f_y = [];
const N = 100;
const period = 200 * Math.PI;
const T = Math.floor(2*Math.PI*100);
let original_graph_x = [];
let original_graph_y = [];
function setup(){
	createCanvas(700, 700);
	background(255);
	for(i=0;i<T;i++){
		if(i<T/2){
			original_graph_x[i] = 40;
			original_graph_y[i] = 40;
		}
		else{
			original_graph_x[i] = 0;
			original_graph_y[i] = 0;
		}
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
	beginShape();
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
	if(f_x.length > 600){
		f_x.pop();
		f_y.pop();
	}
	
	for(i=0;i<f_x.length; i++){
		vertex(i+200, 300 + f_x[i]);
	}

	endShape(OPEN);

	beginShape();
	for(i=0;i<f_y.length; i++){
		vertex(400 + f_y[i], i+30);
	}
	endShape(OPEN);

	// circle along y axis 
	xpointer_x = 100;
	ypointer_x = 380;
	for(i=1;i<N;i++){
		ellipse(xpointer_x, ypointer_x, 2*ax[i])
		ypointer_x += ax[i] * cos(colortime*i/200);
		xpointer_x += ax[i] * sin(colortime*i/200);
		ellipse(xpointer_x, ypointer_x, 2* bx[i])
		ypointer_x += bx[i] * sin(colortime*i/200);
		xpointer_x += bx[i] * cos(colortime*i/200);
	}
	//line(xpointer_x,ypointer_x,200,100+f_x[0]);

	// circle along x axis
	xpointer_y = 400;
	ypointer_y = 100;


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