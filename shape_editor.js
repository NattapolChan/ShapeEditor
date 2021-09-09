var ShapeSelector
var posXinit, posYinit
var shiftispressed
var a
var shapeobjectarray = [[]]
var tmpshapeobjectarray = []
var del

function preload(){
    DelImage = loadImage("picture/DeleteIcon.jpg")
}

function polygon(x, y, radiusx, radiusy, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radiusx;
      let sy = y + sin(a) * radiusy;
      vertex(sx, sy);
    }
    endShape(CLOSE);
}
  
function changeshownShape(slidervalue){
    if(slidervalue<0.9){
        numberofside = 3 + Math.floor(10*slidervalue)
        fill(200,200,100)
        noStroke()
        rectMode(CENTER)
        rect(width/2 + 230/1016 * width, 0.94 * height, 55, 55)
        fill(200, 60, 10, 200)
        stroke(0, 0, 0)
        polygon(width/2 + 230/1016 * width, 0.95 * height, 20, 20, numberofside)
        if(numberofside == 10){
            fill(255,255,255)
            text(str(numberofside),width/2 + 223/1016 * width, 0.955 * height)
            ShapeSelector = numberofside
        }
        else{
            fill(255,255,255)
            text(str(numberofside),width/2 + 227/1016 * width, 0.955 * height)
            ShapeSelector = numberofside
        }
    }
    else{
        ShapeSelector = 1000
        fill(200,200,100)
        noStroke()
        rect(width/2 + 230/1016 * width, 0.94 * height, 55, 55)
        rectMode(CENTER)
        fill(200, 60, 10, 200)
        stroke(0, 0, 0)
        ellipse(width/2 + 230/1016 * width, 0.95 * height, 40)
        fill(255,255,255)
        text('circle', width/2 + 219/1016 * width, 0.955 * height)
    }
}

function setup(){
    sidebarcanvas = createCanvas(windowWidth, windowHeight)
    background(100)
    gui = createGui()
    a = createSlider("Shape Mode", width/2 - 190/1016 * width, height * 0.92 , 390/1016 * width, 40)
    sidebar()
    changeshownShape(a.val)
    tmpshapeobjectarray = []
}

function refreshbackground(){
    fill(100)
    noStroke()
    rect(0,0, windowWidth*2, windowHeight*16/9)
    fill(200,200,100)
    stroke(0, 0, 0)
}

function sidebar(){
    rectMode(CORNER)
    noStroke()
    fill(200,200,100)
    rect(0,8*height/9,width,8*height/9)
    changeshownShape(a.val)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(100);
    setup()
    sidebar()
    changeshownShape(a.val)
}

function draw(){
    drawGui();
    slidervalue = a.val
    refreshbackground()
    changeshownShape(a.val)
    if(mouseIsPressed){
        if(!del){
            fill(0,0,0)
            noStroke()
            if(mouseX<0||mouseY<0||mouseX>width||mouseY>8*height/9){
                return
            }
            radiusofshapex =  (mouseX-posXinit)/2
            radiusofshapey =  (mouseY-posYinit)/2
            if(shiftispressed){
                tmpshapeobjectarray = [posXinit + radiusofshapex,posYinit + radiusofshapey, min(radiusofshapex, radiusofshapey), min(radiusofshapex, radiusofshapey), ShapeSelector]
            }
            else{
                tmpshapeobjectarray = [posXinit + radiusofshapex,posYinit + radiusofshapey, radiusofshapex, radiusofshapey, ShapeSelector]
            }
        }
        /*if(shiftispressed){
            polygon(posXinit + radiusofshapex,posYinit + radiusofshapey, min(radiusofshapex, radiusofshapey), min(radiusofshapex, radiusofshapey), ShapeSelector)
        }
        else{
            polygon(posXinit + radiusofshapex,posYinit + radiusofshapey, radiusofshapex, radiusofshapey, ShapeSelector)
        }*/
    }
    fill(200,200,100)
    stroke(255, 255, 255)
    for(i=0;i<shapeobjectarray.length;i++){//========================================
        ShapeObjectDisplay(shapeobjectarray[i][0],shapeobjectarray[i][1],shapeobjectarray[i][2],shapeobjectarray[i][3],shapeobjectarray[i][4])
        //console.log(shapeobjectarray[i])
    }//===============================================================================
    fill(0,0,100)
    stroke(255, 255, 255)
    ShapeObjectDisplay(tmpshapeobjectarray[0],tmpshapeobjectarray[1],tmpshapeobjectarray[2],tmpshapeobjectarray[3],tmpshapeobjectarray[4])

    if(a.isChanged){changeshownShape(a.val)}
    if(del){
        for(i=0;i<shapeobjectarray.length;i++){
            if(abs(mouseX - shapeobjectarray[i][0])<abs(shapeobjectarray[i][2]) && abs(mouseY - shapeobjectarray[i][1])<abs(shapeobjectarray[i][3])){
                image(DelImage, mouseX, mouseY, width*0.02, width*0.02)
                console.log(i)
            }
        }  
        text("deleting", width/2 - 240/1016 * width, height * 0.955)
    }else{
        text("drawing", width/2 - 240/1016 * width, height * 0.955)
    }
}

function mousePressed(){
    if(mouseX<0||mouseY<0||mouseX>width||mouseY>8*height/9){
        return
    }
    else{
        posXinit = mouseX
        posYinit = mouseY
    }
    sidebar()
}

function changemode(){
    if(!del){
        del = true
    }
    else{
        del = false
    }
}

function mouseReleased(){
    fill(200,200,100)
    stroke(255, 255, 255)
    if(mouseX<0||mouseY<0||mouseX>width||mouseY>8*height/9){
        return
    }
    if(abs(tmpshapeobjectarray[2])>1 && abs(tmpshapeobjectarray[3])>1){
        shapeobjectarray.push(tmpshapeobjectarray)
    }
    tmpshapeobjectarray = []//============
    /*if(shiftispressed){
        polygon(posXinit + radiusofshapex,posYinit + radiusofshapey, min(radiusofshapex, radiusofshapey), min(radiusofshapex, radiusofshapey), ShapeSelector)
    }
    else{
        polygon(posXinit + radiusofshapex,posYinit + radiusofshapey, radiusofshapex, radiusofshapey, ShapeSelector)
    }*/
}

function keyPressed() {
    if (keyCode === 16) { //SHIFT
        shiftispressed = true
    }
    else if (keyCode === 27){ //ESC
        setup()
    }
    else if (keyCode == 68){
        changemode()
    }
}

function keyReleased() {
    shiftispressed = false
}

function ShapeObjectDisplay(x,y,radx,rady,shape){
    polygon(x,y,radx,rady,shape)
}

function mouseClicked(){
    if(del){
        for(i=0;i<shapeobjectarray.length;i++){
            if(abs(mouseX - shapeobjectarray[i][0])<abs(shapeobjectarray[i][2]) && abs(mouseY - shapeobjectarray[i][1])< abs(shapeobjectarray[i][3])){
                shapeobjectarray.splice(i,i)
                del = !del
            }
        }
    }
}
