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
		if (canSlide(board) || (!noSpace(board))) {
			console.log(board);
			isSliding();
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
    for (var i = 0; i < 4; i++) {
		for (var j = 0; j< 4; j++) {
				showSquares(squares[i][j],board[i][j]);
		}
	}
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
	if (Math.abs(moveX) != Math.abs(moveY)) {
		play_slideAudio();
		if (Math.abs(moveX) > Math.abs(moveY)) {
			if (moveX > 0) {
				console.log("RIGHT");
				slideRight();
				slideRight();
				mergeRight();
				slideRight();
				slideRight();
			} else {
				console.log("LEFT");
				slideLeft();
				slideLeft();
				mergeLeft();
				slideLeft();
				slideLeft();
			}	
		} else if (Math.abs(moveX) < Math.abs(moveY)){
			if (moveY > 0) {
				console.log("DOWN");
				slideDown();
				slideDown();
				mergeDown();				
				slideDown();
				slideDown();
			} else {
				console.log("UP");
				slideUp();
				slideUp();
				mergeUp();
				slideUp();
				slideUp();
			}
		}
		creatNewNum();
	}
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j< 4; j++) {
			showSquares(squares[i][j],board[i][j]);
		}
	}
}

function play_slideAudio () {
	var slideAudio = document.getElementById('slideAudio');
	slideAudio.play();
}
function play_mergeAudio () {
	var mergeAudio = document.getElementById("mergeAudio");
    mergeAudio.play();
}

function mergeRight () {
	for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
            	if(board[i][j + 1] == board[i][j]){
            		board[i][j + 1] = board[i][j] + 1;
            		board[i][j] = 0;
            		play_mergeAudio();
            	}
            }
        }
    }
}

function mergeLeft () {
	for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == board[i][j]) {
                	board[i][j - 1] = board[i][j] + 1;
                	board[i][j] = 0;
                	play_mergeAudio();
               	} 
            }
        }
    }
}

function mergeUp () {
	for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == board[i][j]) {
                	board[i - 1][j] = board[i][j] + 1;
                	board[i][j] = 0;
                	play_mergeAudio();
                }
            }
        }
	}
}

function mergeDown () {
	for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == board[i][j]) {
                	board[i + 1][j] = board[i][j] + 1;
                	board[i][j] = 0;
                	play_mergeAudio();
                }
            }    
        }
	}
}
function slideRight () {
	for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
            	if(board[i][j + 1] == 0){
            		board[i][j + 1] = board[i][j];
            		board[i][j] = 0;
            	}
            }
        }
    }
}

function slideLeft () {
	for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0) {
                	if (board[i][j - 1] == 0) {
                		board[i][j - 1] = board[i][j];
                		board[i][j] = 0;
               		} 
               	}
            }
        }
    }
}

function slideUp () {
	for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0) {
                	board[i - 1][j] = board[i][j];
                	board[i][j] = 0;
                }
            }
        }
	}
}

function slideDown () {
	for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0) {
                	board[i + 1][j] = board[i][j];
                	board[i][j] = 0;
                }
            }    
        }
	}
}

function ifGameOver () {
	if (currentGrade >= 2048) {
		gameWin();
	} else if (noSpace(board) && (!canSlide(board))) {
    	gameOver(); 
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
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
        			return true;
        	}
        }
	}
	for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
        			return true;
        	}
        }
	}
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
        			return true;
        	}
        }
	}
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
        			return true;
        	}
        }
	}
    return false;
}

function gameOver () {
	swal ({
		title: "GAME OVER!",
		text: "Your grade is" + currentGrade
	});
}

function gameWin () {
	swal ({
		title: "Congratulations！",
		text: "You win the game.",
		icon: "success",
		button: "Happy~"
	});
}

function saveHighestGrade () {
	if (currentGrade > highestGrade) highestGrade = currentGrade;

	
}

function showSquares (square,state) {
	switch (state) {
		case 0:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3");
			square.innerHTML = '&nbsp';
			break;
		case 1:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 num2");
			square.innerHTML = '2';
			break;
		case 2:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 num4");
			square.innerHTML = '4';
			break;
		case 3:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 num8");
			square.innerHTML = '8';
			break;
		case 4:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 num16");
			square.innerHTML = '16';
			break;
		case 5:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 num32");
			square.innerHTML = '32';
			break;
		case 6:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 num64");
			square.innerHTML = '64';
			break;
		case 7:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 num128");
			square.innerHTML = '128';
			break;
		case 8:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 num256");
			square.innerHTML = '256';
			break;
		case 9:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 num512");
			square.innerHTML = '512';
			break;
		case 10:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 num1024");
			square.innerHTML = '1024';
			break;
		case 11:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 num2048");
			square.innerHTML = '2048';
			break;
	}
}