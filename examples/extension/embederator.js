(function(){
	var target = $('h2:eq(4)');
	var script = document.createElement( 'script' );
	script.type = 'text/javascript';
	script.src = 'http://localhost:3000/javascripts/sabot.js?spaceId=rvh';
	target.before(script);
})();