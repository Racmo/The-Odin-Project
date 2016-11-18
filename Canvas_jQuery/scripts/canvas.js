
currentColor = 'black';
randomColor = false;
grid = false;

canvasWidthHight = 540;

function paintGrid(canvasSize){
	//alert("Rysowanie");

	for (var i = 0; i < canvasSize; i++) {
		for (var j = 0; j < canvasSize; j++) {
			$('div#canvas').append('<div class="pixel"></div>');
		}
		$('div#canvas').append('<br>');
	}
}

function removeGrid(){
	$('.pixel').remove();
}

function generateRandColor(){
	//alert('random');
	r =	Math.floor((Math.random()*255)); //random number in 0-255
	g = Math.floor((Math.random()*255));
	b = Math.floor((Math.random()*255));
	currentColor = 'rgb(' + r +',' + g + ',' + b + ')';
	// alert(currentColor);
}

$(document).ready(function(){
	//alert("Ready");
	paintGrid(30);	
	$('input#grid').prop('checked', false);
});

var down = false;
$(document).mousedown(function() {
    down = true;
}).mouseup(function() {
    down = false;  
});

//paint on hover and click
$(document).on('mouseover', '.pixel', function(){
	 if (down){
	 if(randomColor){
	 	generateRandColor();
	 }
 	 $(this).css('background-color', currentColor);
 	}
});
$(document).on('click', '.pixel', function(){
	if(randomColor)
		 generateRandColor();
	$(this).css('background-color', currentColor);
});

//clear canvas
$('button#clear').click(function(){
	//alert('clear');
	$('.pixel').css('background-color', 'white');
});


//Zmiana koloru:
$('div#menu button').click(function(){
	color = $(this).val();
	if (color!='rand'){
		randomColor=false;
		currentColor = $(this).val();
	}
	else{
		randomColor=true;
	}
});

//dodanie/usuniecie siatki
$('input#grid').click(function(){
	//alert('toggle');
	$('.pixel').toggleClass('gridPixel');
	grid = !grid;

});

//zmiana rozmiaru:
$('button#resize').click(function(){

	x = prompt('Type in number of pixels in a row (0 - 50):');

	if(x<=50 && x>0){
		removeGrid();
		paintGrid(x);
		newWidthHight = canvasWidthHight / x;
		newWidthHight = newWidthHight + 'px';

		$('.pixel').css({
			'width': newWidthHight,
			'height': newWidthHight
		});

		if(grid) 
			$('.pixel').toggleClass('gridPixel');
	}
	else
		alert('Value too high! Plese insert value higher than zero and lower than 51');
});