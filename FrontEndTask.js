//Dileny Tech Front End_Task  Version1.0 3/12/2017
var flag = false;
/////////////////////////////////////////////////////////////////////////

//change canvas background color//
function setbackgroundColorFunction(){

    var backgroundCanvas = document.getElementById("canvas"),
        backgroundContext = backgroundCanvas.getContext("2d"),
        fillColor = document.getElementById("backgroundColor"),
        backgroundColorBox = document.getElementById("backgroundColorBox");

function changeFillStyle() {
    backgroundContext.fillStyle = this.value;
}
    backgroundContext.fillStyle = fillColor.value;

fillColor.addEventListener("input", changeFillStyle, false);
backgroundContext.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

}

/////////////////////////////////////////////////////////////////////////

//change background Image//
function setbackgroundImageFunction(){

var ImageLoader = document.getElementById('imageLoader'),
    Imagecanvas = document.getElementById('canvas'),
    ImageContext = Imagecanvas.getContext('2d');
var img = new Image();
var reader = new FileReader();

function handleImage(e){
    
    reader.onload = function(event){
        
    
        img.onload = function(){
//handle image size to fit in canvas//     
        if (img.width<Imagecanvas.width && img.height<Imagecanvas.height ){
             
                ImageContext.drawImage(img,Imagecanvas.width / 2 - img.width / 2,
                Imagecanvas.height / 2 - img.height / 2);
            }
       else if (img.width>Imagecanvas.width && img.height>Imagecanvas.height ){
                img.width = Imagecanvas.width;
                img.height = Imagecanvas.height;
            
            ImageContext.drawImage(img,0,0,img.width,img.height);
            }
        else if (img.width>Imagecanvas.width){
                img.width = Imagecanvas.width;
            
            ImageContext.drawImage(img,0,0,img.width,img.height);
            }
        else if (img.height>Imagecanvas.height){
                img.height = Imagecanvas.height;
            
            ImageContext.drawImage(img,0,0,img.width,img.height);
            }

            else{
                ImageContext.drawImage(img,0,0);
            }
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}
    ImageLoader.addEventListener('change', handleImage, false);

}

/////////////////////////////////////////////////////////////////////////

//save canvas as png image//
function SaveAsImageFunction() {
    var today = new Date(),
    date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(),
    time = today.getHours() + "-" + today.getMinutes()+ "-" + today.getSeconds(),
    ImageName = 'Image('+date+'at'+time +').png';
    var link = document.getElementById('download');
    link.href = document.getElementById('canvas').toDataURL();
    link.download = ImageName;
}

/////////////////////////////////////////////////////////////////////////

function drawBymouseFunction(){

    var BymouseCanvas,
    BymouseContext,
    dragging = false,
    dragStartLocation,
    snapshot;

    BymouseCanvas = document.getElementById('canvas');
    BymouseContext = BymouseCanvas.getContext('2d');

    flag = true;
//return position of mouse to draw shapes in the same mouse position//
function getCanvasCoordinates(event) {
    var x = event.clientX - BymouseCanvas.getBoundingClientRect().left,
        y = event.clientY - BymouseCanvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function Bymouse_takeSnapshot() {
    snapshot = BymouseContext.getImageData(0, 0, BymouseCanvas.width, BymouseCanvas.height);
}

function Bymouse_restoreSnapshot() {
    BymouseContext.putImageData(snapshot, 0, 0);
}

function drawLine(position) {
    BymouseContext.lineWidth = lineWidth.value;
    BymouseContext.strokeStyle = strokeColor.value;
    BymouseContext.beginPath();
    BymouseContext.moveTo(dragStartLocation.x, dragStartLocation.y);
    BymouseContext.lineTo(position.x, position.y);
    BymouseContext.stroke();
    BymouseContext.lineCap = "round";
    var lenght = Math.round(Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2)));
    document.getElementById("demo").innerHTML = "** Lenght = " + " "+lenght+"px . ";
    
      
}

function drawCircle(position) {
    BymouseContext.fillStyle = fillColor.value;
    BymouseContext.lineWidth = lineWidth.value;
    BymouseContext.strokeStyle = strokeColor.value;
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
    BymouseContext.beginPath();
    BymouseContext.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI, false);
    if (BymousefillBox.checked) {
        BymouseContext.fill();
    } else {
        BymouseContext.stroke();
    }
    var diameter = Math.round(radius*2);
    document.getElementById("demo").innerHTML = "** Diameter = " +" "+ diameter +"px . ";
}

function drawFreehand(position) {
    BymouseContext.strokeStyle = strokeColor.value;
    BymouseContext.lineWidth = lineWidth.value;
    BymouseContext.beginPath();
    BymouseContext.moveTo(dragStartLocation.x, dragStartLocation.y);
    BymouseContext.lineTo(position.x, position.y);
    BymouseContext.strokeStyle = strokeColor.value;
    BymouseContext.stroke();
    BymouseContext.lineJoin = BymouseContext.lineCap = 'round';
    BymouseContext.closePath();
    dragStartLocation.x = position.x ;
    dragStartLocation.y = position.y ;
    document.getElementById("demo").innerHTML = "";

}

function drawRectangle(position) {
    BymouseContext.fillStyle = fillColor.value;
    BymouseContext.lineWidth = lineWidth.value;
    BymouseContext.strokeStyle = strokeColor.value;
    var w = dragStartLocation.x- position.x  ,
        l = dragStartLocation.y- position.y  ;
    if (BymousefillBox.checked) {
        BymouseContext.fillRect(position.x, position.y, w, l);
    } else {
        BymouseContext.strokeRect(position.x, position.y, w, l);
    }
    var Width= Math.abs(w),
        Height= Math.abs(l);
    document.getElementById("demo").innerHTML = "** Width = " + " "+Width +"px , "+ "Height = " +" "+Height+"px . ";

}

function eraserFreehand(position) {
    BymouseContext.lineWidth = lineWidth.value;
    BymouseContext.beginPath();
    BymouseContext.moveTo(dragStartLocation.x, dragStartLocation.y);
    BymouseContext.lineTo(position.x, position.y);
    BymouseContext.strokeStyle = "white";
    BymouseContext.stroke();
    BymouseContext.lineJoin = BymouseContext.lineCap = 'round';
    BymouseContext.closePath();
    dragStartLocation.x = position.x ;
    dragStartLocation.y = position.y ;
    document.getElementById("demo").innerHTML = "";
}

function addText(position){
    BymouseContext.fillStyle = fillColor.value;
    BymouseContext.strokeStyle = strokeColor.value;
    BymouseContext.font = document.getElementById("font").value;
    if (BymousefillBox.checked) {
    BymouseContext.fillText(document.getElementById("Text").value,position.x,position.y); 
    }else {
    BymouseContext.lineWidth = 1;
    BymouseContext.strokeText(document.getElementById("Text").value,position.x,position.y); 
    }
    document.getElementById("demo").innerHTML = "";
    }

function drawBymouse(position) {

    Bymouseshape = document.querySelector('input[type="radio"][name="Bymouseshape"]:checked').value;      

    if (Bymouseshape == "circle") {
        drawCircle(position);
    }
    if (Bymouseshape == "line") {
        drawLine(position);
    }
    if (Bymouseshape == "pencil") {
        drawFreehand(position);
    }    
    if (Bymouseshape == "rectangle") {
        drawRectangle(position);
    }
    if (Bymouseshape == "eraser") {
        eraserFreehand(position);
    }
    if (Bymouseshape == "text") {
        addText(position);
    } 
}

function drawBymouse_dragStart(event) {

    Bymouseshape = document.querySelector('input[type="radio"][name="Bymouseshape"]:checked').value;
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    if (Bymouseshape == "line" || Bymouseshape == "circle" || Bymouseshape == "rectangle" || Bymouseshape == "text"){
    Bymouse_takeSnapshot();}
}

function drawBymouse_drag(event) {
    Bymouseshape = document.querySelector('input[type="radio"][name="Bymouseshape"]:checked').value;
    var position;
    if (dragging == true) {
        if (Bymouseshape == "line" || Bymouseshape == "circle" || Bymouseshape == "rectangle" || Bymouseshape == "text"){
        Bymouse_restoreSnapshot();}
       position = getCanvasCoordinates(event);
        drawBymouse(position);
    }

}

function drawBymouse_dragStop(event) {
    Bymouseshape = document.querySelector('input[type="radio"][name="Bymouseshape"]:checked').value;
    dragging = false; 
    if (Bymouseshape == "line" || Bymouseshape == "circle" || Bymouseshape == "rectangle" || Bymouseshape == "text"){
    Bymouse_restoreSnapshot();}
   
    var position = getCanvasCoordinates(event);
    drawBymouse(position);

    flag = false;
}

function changeLineWidth() {
    BymouseContext.lineWidth = this.value;
}

function changeFillStyle() {
    BymouseContext.fillStyle = this.value;
}

function changeStrokeStyle() {
    BymouseContext.strokeStyle = this.value;
}

function drawBymouse_init() {

    var lineWidth = document.getElementById("lineWidth"),
        fillColor = document.getElementById("fillColor"),
        strokeColor = document.getElementById("strokeColor"),
        Bymouseshape = document.querySelector('input[type="radio"][name="Bymouseshape"]:checked').value,
        BymousefillBox = document.getElementById("BymousefillBox"),
        BymousestopBox = document.getElementById("BymousestopBox");

    BymouseCanvas.addEventListener('mousedown', drawBymouse_dragStart, false);
    BymouseCanvas.addEventListener('mousemove', drawBymouse_drag, false);
    BymouseCanvas.addEventListener('mouseup', drawBymouse_dragStop, false);
    lineWidth.addEventListener("input", changeLineWidth, false);
    fillColor.addEventListener("input", changeFillStyle, false);
    strokeColor.addEventListener("input", changeStrokeStyle, false);

    document.getElementById("demo").innerHTML = "";

}

  drawBymouse_init();

}


/////////////////////////////////////////////////////////////////////////

function RectFunction(){

    var RectCanvas,
    RectContext,
    dragging = false,
    dragStartLocation,
    snapshot;
    var RectfillBox = document.getElementById("RectfillBox");

    RectCanvas = document.getElementById('canvas');
    RectContext = RectCanvas.getContext('2d');

    flag =true;

function getCanvasCoordinates(event) {
    var x = event.clientX - RectCanvas.getBoundingClientRect().left,
        y = event.clientY - RectCanvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function Rect_takeSnapshot() {
    snapshot = RectContext.getImageData(0, 0, RectCanvas.width, RectCanvas.height);
}

function Rect_restoreSnapshot() {
    RectContext.putImageData(snapshot, 0, 0);
}

function changeLineWidth() {
    RectContext.lineWidth = this.value;
}

function changeFillStyle() {
    RectContext.fillStyle = this.value;
}

function changeStrokeStyle() {
    RectContext.strokeStyle = this.value;
}


function drawRect(position) {
  
var w = document.getElementById("Width").value,
    h = document.getElementById("Lenght").value;
            
        document.getElementById("demo").innerHTML = "** Width = " + " "+w +"px , "+ "Height = " +" "+h +"px . ";
    RectContext.strokeStyle = strokeColor.value;
    RectContext.fillStyle = fillColor.value;
    RectContext.lineWidth = lineWidth.value;

    if (RectfillBox.checked) {
        RectContext.fillRect(position.x, position.y, w, h);

    } else {
        RectContext.strokeRect(position.x, position.y, w, h);

    }

}

function Rect_dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    Rect_takeSnapshot();
}

function Rect_drag(event) {
    var position;
    if (dragging == true) {
        Rect_restoreSnapshot();
        position = getCanvasCoordinates(event);
        drawRect(position);
    }
}

function Rect_dragStop(event) {
    dragging = false;  
    Rect_restoreSnapshot();
    var position = getCanvasCoordinates(event);
    drawRect(position);
     RectCanvas.removeEventListener('mousedown', Rect_dragStart);
     RectCanvas.removeEventListener('mousemove', Rect_drag);
     RectCanvas.removeEventListener('mouseup', Rect_dragStop);
     
     flag = false;
}

function Rect_init() {

     var lineWidth = document.getElementById("lineWidth"),
         fillColor = document.getElementById("fillColor"),
         strokeColor = document.getElementById("strokeColor");

     RectCanvas.addEventListener('mousedown', Rect_dragStart, false);
     RectCanvas.addEventListener('mousemove', Rect_drag, false);
     RectCanvas.addEventListener('mouseup', Rect_dragStop, false);
     lineWidth.addEventListener("input", changeLineWidth, false);
     fillColor.addEventListener("input", changeFillStyle, false);
     strokeColor.addEventListener("input", changeStrokeStyle, false);
  
}

Rect_init();

}
/////////////////////////////////////////////////////////////////////////

function CircleFunction(){

    var CircleCanvas,
    CircleContext,

    dragging = false,
    dragStartLocation,
    snapshot;

    var CirclefillBox = document.getElementById("CirclefillBox");
    
    CircleCanvas = document.getElementById('canvas');
    CircleContext = CircleCanvas.getContext('2d');

    flag = true;

function getCanvasCoordinates(event) {
    var x = event.clientX - CircleCanvas.getBoundingClientRect().left,
        y = event.clientY - CircleCanvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function Circle_takeSnapshot() {
    snapshot = CircleContext.getImageData(0, 0, CircleCanvas.width, CircleCanvas.height);
}

function Circle_restoreSnapshot() {
    CircleContext.putImageData(snapshot, 0, 0);
}

function changeLineWidth() {
    CircleContext.lineWidth = this.value;
}

function changeFillStyle() {
    CircleContext.fillStyle = this.value;
}

function changeStrokeStyle() {
    CircleContext.strokeStyle = this.value;
}

function drawCircle(position) {
  
    var  d = document.getElementById("Diameter").value;

    document.getElementById("demo").innerHTML = "** Diameter = " +" "+ d +"px . ";
    
    CircleContext.strokeStyle = strokeColor.value;
    CircleContext.fillStyle = fillColor.value;
    CircleContext.lineWidth = lineWidth.value;
        
        CircleContext.beginPath();

    if (CirclefillBox.checked) {
        CircleContext.arc(position.x, position.y, d/2, 0, 2 * Math.PI);
        CircleContext.fill();
    } else {
        CircleContext.arc(position.x, position.y, d/2, 0, 2 * Math.PI);
        CircleContext.stroke();
    }

}

function Circle_dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    Circle_takeSnapshot();
}

function Circle_drag(event) {
    var position;
    if (dragging == true) {
        Circle_restoreSnapshot();
        position = getCanvasCoordinates(event);
        drawCircle(position);
    }
}

function Circle_dragStop(event) {
    dragging = false;  
    Circle_restoreSnapshot();
    var position = getCanvasCoordinates(event);
    drawCircle(position);

    CircleCanvas.removeEventListener('mousedown', Circle_dragStart);
    CircleCanvas.removeEventListener('mousemove', Circle_drag);
    CircleCanvas.removeEventListener('mouseup', Circle_dragStop);
    flag = false;

}

function Circle_init() {

    var lineWidth = document.getElementById("lineWidth"),
        fillColor = document.getElementById("fillColor"),
        strokeColor = document.getElementById("strokeColor");

     CircleCanvas.addEventListener('mousedown', Circle_dragStart, false);
     CircleCanvas.addEventListener('mousemove', Circle_drag, false);
     CircleCanvas.addEventListener('mouseup', Circle_dragStop, false);

     lineWidth.addEventListener("input", changeLineWidth, false);
     fillColor.addEventListener("input", changeFillStyle, false);
     strokeColor.addEventListener("input", changeStrokeStyle, false);
    
}
 Circle_init();  
}

/////////////////////////////////////////////////////////////////////////

function drawResizeFunction() {

var  ResizefillBox = document.getElementById("ResizefillBox"),
     ResizeShape = document.querySelector('input[type="radio"][name="ResizeShape"]:checked').value;
            
var  ResizeCanvas,
     ResizeContext,

      rect = {
        x: 150,
        y: 100,
        w: 200,
        h: 200,
         },

    CornerSize = 8,
    currentHandle = false,
    drag = false;

    ResizeCanvas = document.getElementById('canvas');
    ResizeContext = ResizeCanvas.getContext('2d');

    var fillColor = document.getElementById("fillColor"),
        strokeColor = document.getElementById("strokeColor");

    ResizeContext.strokeStyle = strokeColor.value;
    ResizeContext.fillStyle = fillColor.value;
   
function point(x, y) {
    return {
        x: x,
        y: y
    };
}

function dist(p1, p2) {
  
    return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
}

function getHandle(mouse) {
 
    if (dist(mouse, point(rect.x, rect.y)) <=  CornerSize) 
        return 'topleft';
    if (dist(mouse, point(rect.x + rect.w, rect.y)) <=  CornerSize) 
        return 'topright';
    if (dist(mouse, point(rect.x, rect.y + rect.h)) <=  CornerSize) 
        return 'bottomleft';
    if (dist(mouse, point(rect.x + rect.w, rect.y + rect.h)) <=  CornerSize) 
        return 'bottomright';
    if (dist(mouse, point(rect.x + rect.w / 2, rect.y)) <= CornerSize) 
        return 'top';
    if (dist(mouse, point(rect.x, rect.y + rect.h / 2)) <= CornerSize) 
        return 'left';
    if (dist(mouse, point(rect.x + rect.w / 2, rect.y + rect.h)) <= CornerSize)
        return 'bottom';
    if (dist(mouse, point(rect.x + rect.w, rect.y + rect.h / 2)) <= CornerSize) 
        return 'right';
   
    return false;
}

function changeFillStyle() {
    ResizeContext.fillStyle = this.value;
}

function changeStrokeStyle() {
    ResizeContext.strokeStyle = this.value;
}

function drawResizeRect_mouseDown(e) {
  
    if (currentHandle) drag = true;
    drawResizeRect();

}

function drawResizeRect_mouseMove(e) {
  
    var previousHandle = currentHandle;
    if (!drag) currentHandle = getHandle(point(e.pageX - this.offsetLeft, e.pageY - this.offsetTop));
    if (currentHandle && drag) {
        var mousePos = point(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        switch (currentHandle) {
            case 'topleft':
                rect.w += rect.x - mousePos.x;
                rect.h += rect.y - mousePos.y;
                rect.x = mousePos.x;
                rect.y = mousePos.y;
                document.getElementById("demo").innerHTML = "** Width = " + " "+rect.w +"px , "+ "Height = " +" "+rect.h +"px . ";

                break;
            case 'topright':
                rect.w = mousePos.x - rect.x;
                rect.h += rect.y - mousePos.y;
                rect.y = mousePos.y;
                document.getElementById("demo").innerHTML = "** Width = " + " "+rect.w +"px , "+ "Height = " +" "+rect.h +"px . ";

                break;
            case 'bottomleft':
                rect.w += rect.x - mousePos.x;
                rect.x = mousePos.x;
                rect.h = mousePos.y - rect.y;
                document.getElementById("demo").innerHTML = "** Width = " + " "+rect.w +"px , "+ "Height = " +" "+rect.h +"px . ";

                break;
            case 'bottomright':
                rect.w = mousePos.x - rect.x;
                rect.h = mousePos.y - rect.y;
                document.getElementById("demo").innerHTML ="** Width = " + " "+rect.w +"px , "+ "Height = " +" "+rect.h +"px . ";

                break;

                case 'top':
                rect.h += rect.y - mousePos.y;
                rect.y = mousePos.y;
                document.getElementById("demo").innerHTML = "** Width = " + " "+rect.w +"px , "+ "Height = " +" "+rect.h +"px . ";

                break;

            case 'left':
                rect.w += rect.x - mousePos.x;
                rect.x = mousePos.x;
                document.getElementById("demo").innerHTML = "** Width = " + " "+rect.w +"px , "+ "Height = " +" "+rect.h +"px . ";

                break;

            case 'bottom':
                rect.h = mousePos.y - rect.y;
                document.getElementById("demo").innerHTML = "** Width = " + " "+rect.w +"px , "+ "Height = " +" "+rect.h +"px . ";

                break;

            case 'right':
                rect.w = mousePos.x - rect.x;
                document.getElementById("demo").innerHTML = "** Width = " + " "+rect.w +"px , "+ "Height = " +" "+rect.h +"px . ";

                break;   
        }
    }

    if (drag || currentHandle != previousHandle) { 
    drawResizeRect();
    }

 ResizeShape = document.querySelector('input[type="radio"][name="ResizeShape"]:checked').value;
    
    if (flag == true || ResizeShape == "circle"){

    ResizeCanvas.removeEventListener('mousedown', drawResizeRect_mouseDown);
    ResizeCanvas.removeEventListener('mouseup', drawResizeRect_mouseUp);
    ResizeCanvas.removeEventListener('mousemove', drawResizeRect_mouseMove);

    }
}

function drawResizeRect_mouseUp() {

    drag = false;
    currentHandle = false;

    drawResizeRect();

}

function drawResizeCircle_mouseDown(e) {
  
    if (currentHandle) drag = true;
    drawResizeCircle();
  
}

function drawResizeCircle_mouseMove(e) {
  
    var previousHandle = currentHandle;
    if (!drag) currentHandle = getHandle(point(e.pageX - this.offsetLeft, e.pageY - this.offsetTop));
    if (currentHandle && drag) {
        var mousePos = point(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        switch (currentHandle) {
              
            case 'left':
                rect.w += rect.x - mousePos.x;
                rect.x = mousePos.x;
                document.getElementById("demo").innerHTML = "** Diameter = " +" "+ rect.w +"px .";

                break;

            case 'right':
                rect.w = mousePos.x - rect.x;
                document.getElementById("demo").innerHTML = "** Diameter = " +" "+ rect.w +"px .";

                break;     
        }
    }
    if (drag || currentHandle != previousHandle) { 
   
    drawResizeCircle();
  
}

 ResizeShape = document.querySelector('input[type="radio"][name="ResizeShape"]:checked').value;

if (flag == true || ResizeShape == "rectangle"){

   ResizeCanvas.removeEventListener('mousedown', drawResizeCircle_mouseDown);
   ResizeCanvas.removeEventListener('mouseup', drawResizeCircle_mouseUp);
   ResizeCanvas.removeEventListener('mousemove', drawResizeCircle_mouseMove);
}
}

function drawResizeCircle_mouseUp() {
  
    drag = false;
    currentHandle = false;
    drawResizeCircle();
}

function drawResizeRect() {
  
    ResizeContext.clearRect(0, 0, ResizeCanvas.width, ResizeCanvas.height);
    ResizeContext.lineWidth = 2;
    if (ResizefillBox.checked) {
            ResizeContext.fillRect(rect.x, rect.y, rect.w, rect.h);
            
    } else {
            ResizeContext.strokeStyle = strokeColor.value;
            ResizeContext.strokeRect(rect.x, rect.y, rect.w, rect.h);

    }
    document.getElementById("demo").innerHTML = "** Width = " + " "+rect.w +"px , "+ "Height = " +" "+rect.h +"px . ";

    if (currentHandle) {
        var posHandle = point(0, 0);
        switch (currentHandle) {
            case 'topleft':
                posHandle.x = rect.x;
                posHandle.y = rect.y;
                break;
            case 'topright':
                posHandle.x = rect.x + rect.w;
                posHandle.y = rect.y;
                break;
            case 'bottomleft':
                posHandle.x = rect.x;
                posHandle.y = rect.y + rect.h;
                break;
            case 'bottomright':
                posHandle.x = rect.x + rect.w;
                posHandle.y = rect.y + rect.h;
                break;
            case 'top':
                posHandle.x = rect.x + rect.w / 2;
                posHandle.y = rect.y;
                break;
            case 'left':
                posHandle.x = rect.x;
                posHandle.y = rect.y + rect.h / 2;
                break;
            case 'bottom':
                posHandle.x = rect.x + rect.w / 2;
                posHandle.y = rect.y + rect.h;
                break;
            case 'right':
                posHandle.x = rect.x + rect.w;
                posHandle.y = rect.y + rect.h / 2;
                break;
           
        }
        ResizeContext.beginPath();
        ResizeContext.arc(posHandle.x, posHandle.y, CornerSize, 0, 2 * Math.PI);
        ResizeContext.strokeStyle = strokeColor.value;
        ResizeContext.stroke();
        ResizeContext.globalCompositeOperation = 'source-over';

    }
} 


function drawResizeCircle() {

    ResizeContext.clearRect(0, 0, ResizeCanvas.width, ResizeCanvas.height);
    ResizeContext.lineWidth = 2;
    if (ResizefillBox.checked) {
         
            ResizeContext.beginPath();
            ResizeContext.arc(rect.x+rect.w/2,rect.y+rect.h/2 , rect.w/2, 0, 2 * Math.PI);
            ResizeContext.fill();

    } else {
           
            ResizeContext.beginPath();
            ResizeContext.arc(rect.x+rect.w/2,rect.y+rect.h/2 , rect.w/2, 0, 2 * Math.PI);
            ResizeContext.strokeStyle = strokeColor.value;
            ResizeContext.stroke();
    }
    document.getElementById("demo").innerHTML = "** Diameter = " +" "+ rect.w +"px .";

    if (currentHandle) {
        var posHandle = point(0, 0);
        switch (currentHandle) {
         
            case 'right':
                posHandle.x = rect.x + rect.w;
                posHandle.y = rect.y + rect.h / 2;
                break;

            case 'left':
                posHandle.x = rect.x;
                posHandle.y = rect.y + rect.h / 2;
                break;
           
        }
        ResizeContext.beginPath();
        ResizeContext.arc(posHandle.x, posHandle.y, CornerSize, 0, 2 * Math.PI);
        ResizeContext.strokeStyle = strokeColor.value;
        ResizeContext.stroke();
        ResizeContext.globalCompositeOperation = 'source-over';

    }
}

function drawResizeRect_init() {

    drawResizeRect();

    ResizeCanvas.addEventListener('mousedown', drawResizeRect_mouseDown, false);
    ResizeCanvas.addEventListener('mouseup', drawResizeRect_mouseUp, false);
    ResizeCanvas.addEventListener('mousemove', drawResizeRect_mouseMove, false);

    fillColor.addEventListener("input", changeFillStyle, false);
    strokeColor.addEventListener("input", changeStrokeStyle, false);   

}

function drawResizeCircle_init() {
 
    drawResizeCircle();

    ResizeCanvas.addEventListener('mousedown', drawResizeCircle_mouseDown, false);
    ResizeCanvas.addEventListener('mouseup', drawResizeCircle_mouseUp, false);
    ResizeCanvas.addEventListener('mousemove', drawResizeCircle_mouseMove, false);

    fillColor.addEventListener("input", changeFillStyle, false);
    strokeColor.addEventListener("input", changeStrokeStyle, false);

} 
   
if (ResizeShape == "rectangle"){
    
    drawResizeRect_init();

}

if (ResizeShape == "circle"){
    
    drawResizeCircle_init();

}
}

/////////////////////////////////////////////////////////////////////////

 function clearcanvasFunction(){
        var clearCanvas = document.getElementById("canvas"),
            clearContext = clearCanvas.getContext("2d"),
            clearCanvas_result = confirm("Are you sure you want to Clear Canvas?");
        if (clearCanvas_result) {
            clearContext.clearRect(0, 0, clearCanvas.width, clearCanvas.height);
            document.getElementById("demo").innerHTML = "";
        }
        
    }

/////////////////////////////////////////////////////////////////////////