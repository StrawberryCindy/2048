window.onload = function () {
	$("#infoSign").click(function(){
		$("#myModal").modal("show");
		interrupt_info();
	});
	$("#myModal").on('show.bs.modal',function(){
		console.log(2);
		interrupt_info();
	});
	$("#myModal").on('hide.bs.modal',function(){
		t = t + setInterval("timeCount()",1000);
		console.log(4);
	});
	function interrupt_info(){
		clearInterval(t);
		document.getElementById('p1').innerHTML =
			'1. Start the game, and you will get two random square marked number 2.<br>'+
            '2. Slide on the game interface, to make all the square slide into the same direction.<br>'+
            '3. If two square marked the same number collide with each other, they will fuse together and  the number on the square will become twice as much as it used to be.<br>'+
            '4. Every time you slide, there will be a new square marked number 2 randomly on the game interface and your grade will be increased by 2 points.<br>'+
            '5. When the 16 squares is filled up and you can not slide it any more (there is no adjacent identical squares), game is over.<br>'+
            '6. If the game is to its end and your grade is over 2048, you win! If not, you lose.<br>'
                    
	}
	function interrupt_score(){
		clearInterval(t);
	}
}