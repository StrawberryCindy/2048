clock = "";
var highestGrade = 0;
var c=0;
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
	/*get the squares in a two-dimensional array*/
	var rows = new Array();
	rows[0] = new Array();
	rows[1] = new Array();
	rows[2] = new Array();
	rows[3] = new Array();
	rows[0] = document.getElementsByName("square0");
	rows[1] = document.getElementsByName("square1");
	rows[2] = document.getElementsByName("square2");
	rows[3] = document.getElementsByName("square3");

	do{
		var i1 = Math.floor(Math.random()*4);
		var j1 = Math.floor(Math.random()*4);
		var i2 = Math.floor(Math.random()*4);
		var j2 = Math.floor(Math.random()*4);
	}while(i1==j1&&i2==j2);


	rows[i1][j1].setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 num2");
	rows[i1][j1].innerHTML = "2";
	rows[i2][j2].setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 num2");
	rows[i2][j2].innerHTML = "2";

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

	
}
