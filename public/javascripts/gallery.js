jQuery(function($) {
	var gallery = $('#gallery');

	// Masonry layout
	gallery.imagesLoaded(function() {
		gallery.masonry({
			itemSelector: '.gallery-item',
			columnWidth: 200
		});
	});

	// Gallery resizing
	function resize_gallery() {
		// Resize #gallery to a multiple of .gallery-item.outerWidth().
		var gallery_item_width = $('.gallery-item').first().outerWidth(); // Will margin collapse screw this up?
		var parent_width = gallery.parent().width();
		var width = parent_width - (parent_width % gallery_item_width);
		console.log('vars: ', parent_width, gallery_item_width);
		gallery.width(width);
		gallery.masonry('reload'); // Update masonry layout
	}

	//resize_gallery();
	//$(window).resize(resize_gallery);

	// Image selection
	function select_image() {
		// If an already selected gallery item is clicked, it should be deselected.
		gallery.children().not(this).removeClass('selected');
		$(this).toggleClass('selected');
		gallery.masonry('reload'); // Update masonry layout
	}
	
	$('.gallery-item').click(select_image);
});