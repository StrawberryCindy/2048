t = "";

function start(){
	var startBT = document.getElementById('start');
	startBT.setAttribute("style","display:none");
	t = setInterval(timeCount,1000);
	operating();
}
function timeCount(){
  	var time = document.getElementById('time');
  	time.value = parseInt(time.value)+1;
   	console.log(t);
}	

function operating(){
	var txt="";
	var row=document.getElementByClassName("row");
	for (var i = 0 ; i < squares.length; i++) {
		row[i] = row.childNodes;
		for (var j = 0 ;j <= row[i].length - 1; j++) {
			txt = txt + row[i][j].nodeName;
		}
	}
    console.log(txt);
}