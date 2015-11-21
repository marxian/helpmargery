(function(){
	var target = $('img:eq(5)');
	var script = document.createElement( 'script' );
	script.type = 'text/javascript';
	script.src = 'http://helpmargery.herokuapp.com/widget/sabot.js?spaceId=564f9b27ebf9f57c46077eda';
	target.before(script);
})();
