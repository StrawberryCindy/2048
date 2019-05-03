/*start the game*/
function start(){
	ifStart = 1;    // Most of the functions must be operated when this is done.
	var startBT = document.getElementById('start');
	startBT.setAttribute("style","display:none");
	clock = setInterval(timeCount,1000);
	operating();
}

/*counting the time*/
function timeCount(){
  	var time = document.getElementById('time');
  	time.value = parseInt(time.value)+1;
  	currentTime = time.value;
}	

/*operating the main game*/
function operating(){
	ini();

	var main = document.getElementById("main");
	main.addEventListener("mousedown", function (event) {
		console.log(event.clientX, event.clientY);
		iniPosition.X = event.clientX;
		iniPosition.Y = event.clientY;
		recordHistory(board);
	});
	main.addEventListener("mouseup",function (event){
		console.log(event.clientX, event.clientY);
		endPosition.X = event.clientX;
		endPosition.Y = event.clientY;
		if (canSlideRight(board) || canSlideLeft(board) || canSlideUp(board) || canSlideDown(board)) {
			console.log(board);
			isSliding();
		}
		ifGameOver();
	});
	main.addEventListener("touchstart", function(event) {
		console.log(event.targetTouches[0].clientX, event.targetTouches[0].clientY);
		iniPosition.X = event.targetTouches[0].clientX;
		iniPosition.Y = event.targetTouches[0].clientY;
		recordHistory(board);
	});
	main.addEventListener("touchend", function(event) {
		console.log(event)
		console.log(event.targetTouches[0].clientX, event.targetTouches[0].clientY);
		endPosition.X = event.targetTouches[0].clientX;
		endPosition.Y = event.targetTouches[0].clientY;
		if (canSlideRight(board) || canSlideLeft(board) || canSlideUp(board) || canSlideDown(board)) {
			console.log(board);
			isSliding();
		}
		ifGameOver();
	});
}

function ini () {
	if (ifStart) {
		for (var i = 0; i < 4; i++) {
    	    board[i] = new Array();
    	    boardCopy[i] = new Array();
    	    for (var j = 0 ; j <4 ; j++) {
    	    	board[i][j] = 0;
    	    	boardCopy[i][j] = 0;
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
				if (canSlideRight(boardCopy)) creatNewNum();
			} else {
				console.log("LEFT");
				slideLeft();
				slideLeft();
				mergeLeft();
				slideLeft();
				if (canSlideLeft(boardCopy)) creatNewNum();
			}	
		} else if (Math.abs(moveX) < Math.abs(moveY)){
			if (moveY > 0) {
				console.log("DOWN");
				slideDown();
				slideDown();
				mergeDown();				
				slideDown();
				if (canSlideDown(boardCopy)) creatNewNum();
			} else {
				console.log("UP");
				slideUp();
				slideUp();
				mergeUp();
				slideUp();
				if (canSlideUp(boardCopy)) creatNewNum();
			}
		}

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
	} else if (noSpace(board) && (!canSlideRight(board)) && (!canSlideLeft(board)) && (!canSlideUp(board)) && (!canSlideDown
		(board))) {
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

function canSlideRight (board) {
	for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
        			return true;
        	}
        }
	}	
	return false;
}

function canSlideLeft (board) {
	for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
        			return true;
        	}
        }
	}
	return false;
}

function canSlideUp (board) {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
        			return true;
        	}
        }
	}
	return false;
}

function canSlideDown (board) {
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
	saveHighestGrade();
	clearInterval(clock);
	swal ({
		title: "GAME OVER!",
		text: "Record: " + currentGrade + "\nTime: " + currentTime
	});
}

function gameWin () {
	saveHighestGrade();	
	clearInterval(clock);
	swal ({
		title: "Congratulations！",
		text: "You win the game.",
		icon: "success",
		button: "Happy~"
	});
}

function saveHighestGrade () {
	if (currentGrade > localStorage.getItem("highestGrade")) {
		localStorage.setItem("highestGrade",currentGrade);
	}
}

function showSquares (square,state) {
	switch (state) {
		case 0:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 square");
			square.innerHTML = '&nbsp';
			break;
		case 1:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 square num2");
			square.innerHTML = '2';
			break;
		case 2:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 square num4");
			square.innerHTML = '4';
			break;
		case 3:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 square num8");
			square.innerHTML = '8';
			break;
		case 4:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 square num16");
			square.innerHTML = '16';
			break;
		case 5:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 square num32");
			square.innerHTML = '32';
			break;
		case 6:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 square num64");
			square.innerHTML = '64';
			break;
		case 7:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 square num128");
			square.innerHTML = '128';
			break;
		case 8:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 square num256");
			square.innerHTML = '256';
			break;
		case 9:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 square num512");
			square.innerHTML = '512';
			break;
		case 10:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 square num1024");
			square.innerHTML = '1024';
			break;
		case 11:
			square.setAttribute("class","col-xs-3 col-sm-3 col-md-3 col-lg-3 square num2048");
			square.innerHTML = '2048';
			break;
	}
}

function recordHistory (board) {
	for (var i = 0; i < 4; i++) {
        boardCopy[i] = new Array();
        for (var j = 0 ; j <4 ; j++) {
        	boardCopy[i][j] = board[i][j];
        }
    }
}

function copy_equal () {
	for (var i = 0; i < 4; i++) {
        for (var j = 0 ; j <4 ; j++) {
        	if (boardCopy[i][j] != board[i][j]) return false;
        }
    }
    return true;
}