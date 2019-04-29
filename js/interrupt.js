window.onload = function () {
	document.body.onselectstart = function(){ return false; } //禁止页面文本选择
	ifStart = 0;

	/*set the ID of the clock*/
	clock = "";

	localStorage.setItem("highestGrade",0);

	currentGrade = 0;
	
	iniPosition = new Position();
	endPosition = new Position();
	
	/*get the squares in a two-dimensional array*/
	squares = new Array();
	squares[0] = new Array();
	squares[1] = new Array();
	squares[2] = new Array();
	squares[3] = new Array();
	squares[0] = document.getElementsByName("square0");
	squares[1] = document.getElementsByName("square1");
	squares[2] = document.getElementsByName("square2");
	squares[3] = document.getElementsByName("square3");

	/*set the states in an array*/
	board = new Array();
	/*use this board to record the history and link to function retract()*/
	boardCopy = new Array();
	
	function Position (X,Y) {
    	this.X = X; 
    	this.Y = Y;
 	};

	$("#infoSign").click(function () {
		$("#myModal").modal("show");
		interrupt_info();
	});
	$("#list").click(function () {
		$("#myModal").modal("show");
		interrupt_list();
	});
	$('#retract').click(function () {
		interrupt_retract();
	})
	$("#myModal").on('hide.bs.modal',function () {
		if (ifStart)
			clock = setInterval("timeCount()",1000);
	});

	function interrupt_info (){
		clearInterval(clock);
		document.getElementById('p1').innerHTML =
			'1. Start the game, and you will get two random square marked number 2.<br>'+
            '2. Slide on the game interface, to make all the square slide into the same direction.<br>'+
            '3. If two square marked the same number collide with each other, they will fuse together and  the number on the square will become twice as much as it used to be.<br>'+
            '4. Every time you slide, there will be a new square marked number 2 randomly on the game interface and your grade will be increased by 2 points.<br>'+
            '5. When the 16 squares is filled up and you can not slide it any more (there is no adjacent identical squares), game is over.<br>'+
            '6. If the game is to its end and your grade is over 2048, you win! If not, you lose.<br>';                    
	}

	function interrupt_list () {
		clearInterval(clock);
		document.getElementById('p1').innerHTML = 'The highest grade: ' + localStorage.getItem("highestGrade")
												 + "\nRecord: " + currentGrade 
												 + "\nTime: " + document.getElementById("time");
	}

	function retract () {
		for (var i = 0; i < 4; i++) {
     	   for (var j = 0 ; j <4 ; j++) {
        		board[i][j] = boardCopy[i][j];
        		showSquares(squares[i][j],board[i][j]);
       		}
   		} 
	}

	function interrupt_retract () {		
		if (!copy_equal()) {
			retract();
		} else {
			clearInterval(clock);
			swal ({
				title: "？？？",
				text: "It can only be withdrawn once.",
				icon: "error"
			}).then((value) => {
				if (ifStart)
					clock = setInterval("timeCount()",1000);
			})
		}
	}
}