var widget = {
	controller: function() {
		console.log('Im a little controller short and stout');
		var booking = {};
		return {
			space: window.space,
			booking: booking,
		};
	},
	view: function() {
		return m('div', [
			m('div', 'im nested')
		]);
	}
};
//init
m.mount(document.getElementById('widget'), widget);
