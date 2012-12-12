jQuery(function($) {
	var gallery = $('#gallery');

	// Gallery resizing
	function resize_gallery() {
		// Resize #gallery to a multiple of .gallery-item.outerWidth().
		var gallery_item_width = 200;
		var parent_width = gallery.parent().width();
		var width = parent_width - (parent_width % gallery_item_width);
		console.log('vars: ', parent_width, gallery_item_width);
		gallery.width(width);

		gallery.isotope('reLayout');
		// Try twice
		setTimeout(function() {
			gallery.isotope('reLayout');
		}, 1000);
	}
	$(window).resize(resize_gallery);

	// Increase popularity when an image is clicked
	function increment_popularity(gallery_item_element) {
		var id = $(gallery_item_element).find('.id').text();
		// POST because the state of the server will change. There is nothing to send in the body. 
		$.post('/hit/' + encodeURIComponent(id), {}, function(data) {
			// Update popularity on the gallery item.
			$(gallery_item_element).children('.popularity').text(data.popularity);
			gallery.isotope('updateSortData', $(gallery_item_element));
		});
	}

	function sort_by(parameter, ascending) {
		console.log('sort by', parameter, ascending);
		if(ascending == undefined)
			gallery.isotope({
				sortBy: parameter
			});
		else
			gallery.isotope({
				sortBy: parameter,
				sortAscending: ascending
			});
	}

	$('#sort-options').children().click(function(event) {
		// Sort parameter should be formatted like: #<paramter>[.desc|.asc]
		var parameters = $(this).attr('href').split('/sort/')[1].split('/');
		var parameter = parameters[0];

		if(parameters[1] != undefined) {
			sort_by(parameter, parameters[1] === 'ascending');
		} else {
			sort_by(parameter);
		}
		event.preventDefault();
	});

	function expand_image(gallery_item_element) {
		$(gallery_item_element).addClass('selected');
		gallery.isotope('reLayout', function() {
			// Scroll to the selected image, because the image can expand beyond the lower edge of the window.
			$('html, body').animate(
				{
					scrollTop: $('.selected').offset().top
				},
				'slow'
			);
		});
	}

	function relax_image(gallery_item_element) {
		$(gallery_item_element).removeClass('selected');
		gallery.isotope('reLayout', function() {
			$('html, body').animate(
				{
					scrollTop: 0
				},
				'slow'
			);
		});
	}

	// Image selection when gallery-item is clicked. Clicking again deselects.
	function select_image() {
		// If an already selected gallery item is clicked, it should be deselected.
		gallery.children().not(this).removeClass('selected');
		if(!$(this).hasClass('selected')) {
			increment_popularity(this);
			expand_image(this);
		} else {
			relax_image(this);
		}
	}
	$('.gallery-item').click(select_image);

	// Isotope / Masonry layout
	gallery.imagesLoaded(function() {
		gallery.isotope({
			itemSelector: '.gallery-item',
			animationEngine: 'css',
			masonry: {
				columnWidth: 200
			},
			getSortData: {
				popularity: function(gallery_item) {
					console.log(gallery_item.find('.popularity').text());
					return parseInt(gallery_item.find('.popularity').text(), 10);
				},
				date: function(gallery_item) {
					console.log(gallery_item.find('.upload-date').text());
					return gallery_item.find('.upload-date').text();
				}
			},
			sortBy: 'popularity',
			sortAscending: false
		});
		resize_gallery();
	});
});
