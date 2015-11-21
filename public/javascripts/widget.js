(function($) {
	$(document).on('ready', function() {

		var $calendar = $('#calendar');

		// Give the impression that we're transitioning to another page
		$('[data-goto]').on('click', function() {
			var page = $(this).data('goto');
			var $show = $('.goto.' + page);

			if( $show.length ) {
				$('.goto').addClass('hide');
				$show.removeClass('hide');
			}
		});

		// Update availability calendar when filters are applied
		// $('.availability-filters :input').on('change', function() {
		$('[name="day"]', '.availability-filters').on('change', function() {
			var selection = $(this).val();

			// Hide rows and columns which are not relevant to our day selection
			var $els = $calendar.find('[data-day]');

			$els.removeClass('hide');

			if( selection ) {
				$els.not('[data-day="' + $(this).val() + '"]').addClass('hide');
			}
		});

		$('.week-prev').on('click', function() {
			// moment
		});

		$('.week-next').on('click', function() {
			// 
		});

	});
})(jQuery);