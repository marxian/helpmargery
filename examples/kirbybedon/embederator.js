(function(){
	var target = $('p:eq(1)');
	var script = document.createElement( 'script' );
	script.type = 'text/javascript';
	script.src = 'http://helpmargery.herokuapp.com/widget/sabot.js?spaceId=56508235c1aff503008a8242';
	target.before(script);
})();
