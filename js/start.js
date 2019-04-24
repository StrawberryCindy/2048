/*set the ID of the clock*/
clock = "";
/*set the Cache*/
var highestGrade = 0;
var currentGrade = 0;
	
/*get the squares in a two-dimensional array*/
var squares = new Array();
squares[0] = new Array();
squares[1] = new Array();
squares[2] = new Array();
squares[3] = new Array();
squares[0] = document.getElementsByName("square0");
squares[1] = document.getElementsByName("square1");
squares[2] = document.getElementsByName("square2");
squares[3] = document.getElementsByName("square3");

/*set the states in an array*/
var states = new Array();
function State (css,text) {
	this.css = css;
	this.text = text;
	
}
var state0 = new State()



/*start the game*/
function start(){
	var startBT = document.getElementById('start');
	startBT.setAttribute("style","display:none");
	clock = setInterval(timeCount,1000);
	operating();
}

/*counting the time(need modificate)*/
function timeCount(){
  	var time = document.getElementById('time');
  	time.value = parseInt(time.value)+1;
}	

/*operating the main game*/
function operating(){

	do{
		var i1 = Math.floor(Math.random()*4);
		var j1 = Math.floor(Math.random()*4);
		var i2 = Math.floor(Math.random()*4);
		var j2 = Math.floor(Math.random()*4);
	}while(i1==j1&&i2==j2);


	squares[i1][j1].setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 num2");
	squares[i1][j1].innerHTML = "2";
	squares[i2][j2].setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 num2");
	squares[i2][j2].innerHTML = "2";

	var main = document.getElementById("main");

	function Position (X,Y) {
    	this.X = X; 
        this.Y = Y;
    };
    var iniPosition = new Position();
    var endPosition = new Position();

	main.addEventListener("mousedown", function (event) {
		iniPosition.X = event.offsetX;
		iniPosition.Y = event.offsetY;
		console.log(iniPosition.X );
	});
	main.addEventListener("mouseup",function (event){
		endPosition.X = event.offsetX;
		endPosition.Y = event.offsetY;
		console.log(endPosition.X );
	});

	var moveX = endPosition.X - iniPosition.X;
	var moveY = endPosition.Y - iniPosition.Y;
	if (Math.abs(moveX)>Math.abs(moveY)) {
		if (moveX>0) {
			slideRight();
		} else {
			slideLeft();
		}
	} else {
		if (moveY>0) {
			slideUp();
		} else {
			slideDown();
		}
	}
}

function slideRight () {

}

function slideLeft () {

}

function slideUp () {

}

function slideDown () {

}