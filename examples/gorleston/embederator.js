(function(){
	var target = $('p:eq(4)');
	var script = document.createElement( 'script' );
	script.type = 'text/javascript';
	script.src = 'http://helpmargery.herokuapp.com/widget/sabot.js?spaceId=56506c894395e503008b94d8';
	target.before(script);
})();
