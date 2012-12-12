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
			}
		});
		resize_gallery();
	});
});