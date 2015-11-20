(function($) {

	$(document).on('ready', function() {
		// Give the impression that we're transitioning to another page
		$('[data-goto]').on('click', function() {
			var page = $(this).data('goto');
			var $show = $('.goto.' + page);

			if( $show.length ) {
				$('.goto').addClass('hide');
				$show.removeClass('hide');
			}
		});
	});

})(jQuery);