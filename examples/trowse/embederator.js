(function(){
	var target = $('p:eq(1)');
	var script = document.createElement( 'script' );
	script.type = 'text/javascript';
	script.src = 'http://helpmargery.herokuapp.com/widget/sabot.js?spaceId=56508359c1aff503008a82c2';
	target.before(script);
})();
