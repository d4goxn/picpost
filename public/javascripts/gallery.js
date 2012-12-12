jQuery(function($) {
	var gallery = $('#gallery');

	// Gallery resizing
	function resize_gallery() {
		// Resize #gallery to a multiple of .gallery-item.outerWidth().
		var gallery_item_width = $('.gallery-item').first().outerWidth(); // Will margin collapse screw this up?
		var parent_width = gallery.parent().width();
		var width = parent_width - (parent_width % gallery_item_width);
		console.log('vars: ', parent_width, gallery_item_width);
		gallery.width(width);

		// Try twice
		setTimeout(function() {
			gallery.isotope('reLayout');
		}, 1000);
		gallery.isotope('reLayout');
	}
	$(window).resize(resize_gallery);

	// Increase popularity when an image is clicked
	function increment_popularity(gallery_item_element) {
		var id = $(gallery_item_element).children('.id').text();
		// POST because the state of the server will change. There is nothing to send in the body. 
		$.post('/hit/' + encodeURIComponent(id), {}, function(data) {
			// Update popularity on the gallery item.
			$(gallery_item_element).children('.popularity').text(data.popularity);
		});
	}

	// Image selection
	// TODO: Scroll to gallery-item using the id.
	function select_image() {
		// If an already selected gallery item is clicked, it should be deselected.
		gallery.children().not(this).removeClass('selected');
		if(!$(this).hasClass('selected')) {
			// Do not increase popularity when clicking on a gallery-item to deselect it.
			increment_popularity(this);
			$(this).addClass('selected');

			gallery.isotope('reLayout', function() {
				// Scroll to the selected image, because the image can expand beyond the lower edge of the window.
				$('html, body').animate(
					{
						scrollTop: $('.selected').offset().top
					},
					1000
				);
			});
		} else {
			$(this).removeClass('selected');
			gallery.isotope('reLayout');
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

	// Resize the gallery as soon as isotope is ready.
	resize_gallery();
});