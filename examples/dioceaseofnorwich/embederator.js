(function(){
	var target = $('img:eq(5)');
	var script = document.createElement( 'script' );
	script.type = 'text/javascript';
	script.src = 'http://helpmargery.herokuapp.com/widget/sabot.js?spaceId=56505e0a2006620300d85fd4';
	target.before(script);
})();
