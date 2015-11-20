var widget = {
	controller: function() {
		console.log('Im a little controller short and stout');
	},
	view: function() {
		return m('div', []);
	}
};
//init
m.mount(document.getElementById('widget'), {controller: widget.controller, view: widget.view});
