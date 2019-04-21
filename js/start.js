var t = "";
var c=0;
function start(){
	var startBT = document.getElementById('start');
	startBT.setAttribute("style","display:none");
	
	function timeCount(){
        document.getElementById('time').value=c;
    	c=c+1;
    	console.log(c);
    	t = setTimeout(timeCount(),1000);
    }
}
 