(function($) {
	$(document).on('ready', function() {

		var $calendar = $('#calendar');

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


		var hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

		var firstDayDisplayed = moment().weekday(1);
		var dayMode = false;
		var dayMap = {
			mon: 1,
			tue: 2,
			wed: 3,
			thu: 4,
			fri: 5,
			sat: 6,
			sun: 7,
		};
		function updateAvail() {
			$('#weeks .hour [data-num-day]').each(function() {
				var $this = $(this);
				var dayTing = parseInt($this.data('numDay'), 10);
				var thisDay = firstDayDisplayed.clone().weekday(dayTing);
				var thisHour = parseInt($this.parent().find('[data-date]').data('date'), 10);
				var thisDateTime = thisDay.clone().set({hour: thisHour, minute: 0, seconds: 0, milliseconds: 0});

				_.forEach(space.bookings, function( booking ) {
					var period = moment.range(moment(booking.start), moment(booking.end));

					if (thisDateTime.within(period)) {
						$this.html('<span role="button" class="booked"></span>');
					} else {
						$this.html('<a data-book-date="' + thisDateTime.toISOString() + '" title="' + thisDateTime.format('DD-MM-YYYY') + '" href="javascript:;" role="button" data-goto="book"></a>');
					}
				});
			});
		}
		function update() {
			if (dayMode) {
				$('.date-controls span').text(firstDayDisplayed.format('Do MMMM YYYY'));
			} else {
				var nextWeek = firstDayDisplayed.clone().add(6, 'days');
				$('.date-controls span').html(firstDayDisplayed.format('DD') + ' &mdash; ' + nextWeek.format('DD') + ' ' + nextWeek.format('MMMM') + ' ' + nextWeek.format('YYYY'));
			}
			updateAvail();
		}
		updateAvail();

		// controller
		$('body').on('click', 'a[data-book-date]', function() {
			var $form = $('.goto.book form');
			var $this = $(this);
			var date = moment($this.data('bookDate'));

			$form.find('input[name="start"]').val($this.data('bookDate'));
			$form.find('input[name="end"]').val(date.clone().add(1, 'hour').toISOString());
		});
		$('.availability-filters [name="day"]').on('change', function(evt) {
			var $this = $(this);
			var val = $this.val();
			if (val) {
				dayMode = true;
				firstDayDisplayed.weekday(dayMap[val]);
				var now = moment();
				while(firstDayDisplayed.clone().set({hour:0, minute:0}) < now) {
					firstDayDisplayed.add(7, 'days');
				}
			} else {
				dayMode = false;
				firstDayDisplayed.weekday(1);
			}
			update();
		});

		$('.availability-filters [name="month"]').on('change', function(evt) {
			var $this = $(this);
			var val = parseInt($this.val(), 10);
			if (!isNaN(val)) {
				firstDayDisplayed.month(val);
				// var now = moment();
				// while(firstDayDisplayed.clone().set({hour:0, minute:0}) < now) {
				// 	firstDayDisplayed.add(1, 'year');
				// }
			} else {
				firstDayDisplayed.month(moment().format('MMM'));
			}
			update();
		});

		$('.availability-filters [name="year"]').on('change', function(evt) {
			var $this = $(this);
			var val = parseInt($this.val(), 10);
			if (val) {
				firstDayDisplayed.year(val);
				// var now = moment();
				// while(firstDayDisplayed.clone().set({hour:0, minute:0}) < now) {
				// 	firstDayDisplayed.add(1, 'year');
				// }
			}
			update();
		});

		$('.week-prev').on('click', function() {
			if (dayMode) {
				firstDayDisplayed.add(-1, 'days');
			} else {
				firstDayDisplayed.add(-7, 'days');
			}
			update();
		});

		$('.week-next').on('click', function() {
			if (dayMode) {
				firstDayDisplayed.add(1, 'days');
			} else {
				firstDayDisplayed.add(7, 'days');
			}
			update();
		});

		$('.availability-filters [name="hour"]').on('change', function() {
			var $this = $(this);
			var val = parseInt($this.val(), 10);
			$('[data-date]').each(function() {$(this).parent().removeClass('hide');});
			$('[data-date]').removeClass('hide');
			$('[data-date]').each(function() {
				if(parseInt($(this).data('date'), 10) < val) {
					$(this).parent().addClass('hide');
				}
			});
		});
	});

	// Give the impression that we're transitioning to another page
	$('body').on('click', '[data-goto]', function() {
		var page = $(this).data('goto');
		var $show = $('.goto.' + page);

		if( $show.length ) {
			$('.goto').addClass('hide');
			$show.removeClass('hide');
		}
	});
})(jQuery);