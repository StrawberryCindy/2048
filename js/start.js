function start(){
	var startBT = document.getElementById('start');
	startBT.setAttribute("style","display:none");
	
    function timeCount(){
    	var time = document.getElementById('time').value;
    	time = time + 1 ;
    }
	setInterval("timeCount()",1000);
}
