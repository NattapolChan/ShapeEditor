let colortime = 0;
let graph = [];
let reconstructed = [];
let a = [];
let b = [];
const N = 100;
const period = 200 * Math.PI;
function setup(){
	createCanvas(500, 500);
	background(255);
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
		xpointer = xpointer + 40/(2*i+1) * cos(colortime*(2*i+1)/100);
		ypointer = ypointer + 40/(2*i+1) * sin(colortime*(2*i+1)/100);
		ellipse(xpointer,ypointer,80/(2*i+1));
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
}

// period = 100 * 2 * pi

function FT(){
	//we need to integrate from 0 to N which is sufficiently large 
	//and combine them using a[0] + integrate {a[t] * cos(it)}
	// from i = 1 to N
	// + integrate {b[t] * sin(it)} from i = 1 to N 
	//which a[i] =  * integrate(i*cos[t])
	//return listof a and list of b
	//input = last(f(colortime))
	let tmp_a = [];
	let tmp_b = [];
	tmp_a[0] = 1/period * integrate(period/2, 0, true);
	for(i=1;i<N;i++){
		x = 2/period * integrate(period/2, i, true);
		console.log(x);
		tmp_a[i] = x;
		y = 2/period * integrate(period/2, i, false);
		tmp_b[i] = y;
	}
	//console.log(tmp_a);
	return tmp_a, tmp_b;
}

function integrate(L, n, check){
	//L = Math.floor(graph.length);
	if(n==0){
		let sum = 0;
		for(i = -L;i<=L;i+=2){
			sum += graph[i+L] * 2;
			console.log(graph[i+L]);

		}
		console.log(sum);
		return sum;
	}
	if(check){
		//integrate a/ cos
		let sum = 0;
		for(i = -L;i<=L;i+=2){
			sum += graph[i+L] * cos(n*(i+L)*Math.PI/L) * 2;
		}
		//console.log(sum);
		return sum;
	}
	else{
		let sum = 0;
		for(i = -L;i<=L;i+=2){
			sum += graph[i+L] * sin(n*(i+L)*Math.PI/L) * 2;
		}
		return sum;
	}
}