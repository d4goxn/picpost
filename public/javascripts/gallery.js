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

	// Image selection
	function select_image() {
		// If an already selected gallery item is clicked, it should be deselected.
		gallery.children().not(this).removeClass('selected');
		$(this).toggleClass('selected');
		gallery.isotope('reLayout');
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