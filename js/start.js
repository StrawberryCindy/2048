/*set the ID of the clock*/
clock = "";
/*set the Cache*/
var highestGrade = 0;
var currentGrade = 0;

function Position (X,Y) {
    this.X = X; 
    this.Y = Y;
 };
var iniPosition = new Position();
var endPosition = new Position();
	
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
var board = new Array();

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
	ini();

	var main = document.getElementById("main");

	main.addEventListener("mousedown", function (event) {
		console.log(event.clientX, event.clientY);
		iniPosition.X = event.clientX;
		iniPosition.Y = event.clientY;
	});
	main.addEventListener("mouseup",function (event){
		console.log(event.clientX, event.clientY);
		endPosition.X = event.clientX;
		endPosition.Y = event.clientY;
		if (canSlide(board)) {
			isSliding();
			creatNewNum();
		}
		ifGameOver();
	});
}

function ini () {
	for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0 ; j <4 ; j++) {
        	board[i][j] = 0;
         }
    }
    currentGrade = 0;
    document.getElementById('time').value = 0;
    creatNewNum();
    creatNewNum();
}

function creatNewNum () {
	do{
		var randI = Math.floor(Math.random()*4);
		var randJ = Math.floor(Math.random()*4);
	} while (! board[randI][randJ] == 0)
	board[randI][randJ] = 1;
	currentGrade += 2;
	document.getElementById("grade").value = currentGrade;
}

function isSliding () {
	var moveX = endPosition.X - iniPosition.X;
	var moveY = endPosition.Y - iniPosition.Y;
	//console.log(iniPosition.X,iniPosition.Y);
	//console.log(endPosition.X,endPosition.Y);
	if (Math.abs(moveX) > Math.abs(moveY)) {
		if (moveX > 0) {
			slideRight();
		} else {
			slideLeft();
		}
	} else if (Math.abs(moveX) < Math.abs(moveY)){
		if (moveY > 0) {
			slideDown();
		} else {
			slideUp();
		}
	}
}

function slideRight () {
	console.log("RIGHT");
	for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] != 0)
                if (board[i][j + 1] == 0) {
                	board[i][j + 1] = board[i][j];
                	board[i][j] = 0;
                }else if (board[i][j + 1] == board[i][j]) {
                	board[i][j + 1] = board[i][j] + 1;
                	board[i][j] = 0;
                }
        }
	}
}

function slideLeft () {
	console.log("LEFT");
	for (var i = 0; i < 4; i++) {
        for (var j = 3; j > 0; j--) {
            if (board[i][j] != 0)
                if (board[i][j - 1] == 0) {
                	board[i][j - 1] = board[i][j];
                	board[i][j] = 0;
                }else if (board[i][j - 1] == board[i][j]) {
                	board[i][j - 1] = board[i][j] + 1;
                	board[i][j] = 0;
                }
        }
	}
}

function slideUp () {
	console.log("UP");
	for (var i = 3; i > 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0)
                if (board[i - 1][j] == 0) {
                	board[i - 1][j] = board[i][j];
                	board[i][j] = 0;
                }else if (board[i - 1][j] == board[i][j]) {
                	board[i - 1][j] = board[i][j] + 1;
                	board[i][j] = 0;
                }
        }
	}
}

function slideDown () {
	console.log("DOWN");
	for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0)
                if (board[i + 1][j] == 0) {
                	board[i + 1][j] = board[i][j];
                	board[i][j] = 0;
                }else if (board[i + 1][j] == board[i][j]) {
                	board[i + 1][j] = board[i][j] + 1;
                	board[i][j] = 0;
                }
        }
	}
}

function ifGameOver () {
	for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
        	if(noSpace(board) && (!canSlide(board)))
        		gameOver();
        }
	}
}

function noSpace (board) {
	for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
        	if (board[i][j] == 0) return false;
        }
	}
	return true;
}

function canSlide (board) {
	for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] != 0)
        		if(board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
        			return true;
        }
	}
	for (var i = 0; i < 4; i++) {
        for (var j = 3; j > 0; j--) {
            if (board[i][j] != 0)
            	if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
            		return true;
        }
    }
    for (var i = 3; i > 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0)
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
                	return true;
        }
    }
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0)
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
                	return true;
        }        
    }
    return false;
}

function gameOver () {
	
}