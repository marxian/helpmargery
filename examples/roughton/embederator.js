(function(){
	var target = $('h2:eq(4)');
	var script = document.createElement( 'script' );
	script.type = 'text/javascript';
	script.src = 'http://helpmargery.herokuapp.com/widget/sabot.js?spaceId=564f5793e86a2308793e4ef8';
	target.before(script);
})();