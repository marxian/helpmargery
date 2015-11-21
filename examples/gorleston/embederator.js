(function(){
	var target = $('img:eq(8)');
	var script = document.createElement( 'script' );
	script.type = 'text/javascript';
	script.src = 'http://helpmargery.herokuapp.com/widget/sabot.js?spaceId=56508efd3655c0030004d601';
	target.before(script);
})();
