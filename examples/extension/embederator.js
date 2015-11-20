(function(){
	var target = $('h2:eq(4)');
	var script = document.createElement( 'script' );
	script.type = 'text/javascript';
	script.src = 'http://helpmargery.herokuapp.com/javascripts/sabot.js?spaceId=564f1b7f5578ba56457b2e82';
	target.before(script);
})();