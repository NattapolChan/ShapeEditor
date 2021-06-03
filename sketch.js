let time = 0;
const n = 20;
let N = 500;
let R = 100;
let xpointer = N/4;
let ypointer = N/2;
const dt = 0.1;
const T = 100;
const step = 1;

function stepfc(){
	var array = [];
	for(i=0;i<300;i++){
		array[i] = (i%2)*50;
	}
	return array;
}

function setup(){
	createCanvas(N, N);
}

function draw(){
	// cursor set to xpointer and ypointer
	// if last one draw straight line
	background(30);
	noFill();
	stroke(255, 255, 255);
	strokeWeight(1);
	time+=dt;
	let array_a, array_b = [];
	array_a, array_b = FT();
	for(i=1;i<n;i++){
		xpointer += array_a[i] * cos(i*time);
		ypointer += array_a[i] * sin(i*time);
		xpointer += array_b[i] * sin(i*time);
		ypointer += array_b[i] * cos(i*time);
	}
	circle(xpointer, ypointer, 8);
	console.log(xpointer, ypointer);
}

function FT(){
	var array_a = [];
	var array_b = [];
	for(i = 0;i<n;i++){
		array_a[i] = integratea(step, -T, T, i);
		array_b[i] = integrateb(step, -T, T, i);
		console.log('iterate');
	}
	console.log(array_a.length);
	return array_a, array_b;
}

function integratea(step, start, end, numb){
	let a = 0;
	let func = stepfc();
	for(i= start; i<end; i+= step){
		a += func[i+end] * Math.cos(numb*Math.PI*i/T)*1/T;
	}
	console.log(a);
	return a;
}

function integrateb(step, start, end, numb){
	let a = 0
	let func = stepfc();
	for(i= start; i<end; i+= step){
		a += func[i+end] * Math.sin(numb*Math.PI*i/T)*1/T;
	}
	return a;
}