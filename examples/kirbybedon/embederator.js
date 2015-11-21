(function(){
	var target = $('p:eq(1)');
	var script = document.createElement( 'script' );
	script.type = 'text/javascript';
	script.src = 'http://helpmargery.herokuapp.com/widget/sabot.js?spaceId=56508e6520fdf70300ff2d8c';
	target.before(script);
})();
