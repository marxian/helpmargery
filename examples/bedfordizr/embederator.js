(function(){
	var target1 = $('#wb_Image7');
	var script1 = document.createElement( 'script' );
	script1.type = 'text/javascript';
	script1.src = 'http://localhost:3000/widget/sabot.js?spaceId=564f5793e86a2308793e4ef8';
	target1.html(script1);

	var target2 = $('#wb_Image6');
	var script2 = document.createElement( 'script' );
	script2.type = 'text/javascript';
	script2.src = 'http://localhost:3000/widget/sabot.js?spaceId=564f5dcd43393f107fce704d';
	target2.html(script2);
})();