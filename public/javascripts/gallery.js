jQuery(function($) {

	// Gallery resizing
	(function() {
		var gallery = $('#gallery');

		function resize_gallery() {
			// Resize #gallery to a multiple of .gallery-item.outerWidth().
			var gallery_item_width = $('.gallery-item').first().outerWidth(); // Will margin collapse screw this up?
			var parent_width = gallery.parent().width();
			var width = parent_width - (parent_width % gallery_item_width);
			console.log('vars: ', parent_width, gallery_item_width);
			gallery.width(width);
			console.log("Resized from " + parent_width + ' to ' + width);
		}

		resize_gallery();
		$(window).resize(resize_gallery);
	})();

	// Image selection
	(function() {
		function select_image() {
			// If an already selected gallery item is clicked, it should be deselected.
			$('#gallery').children().not(this).removeClass('selected');
			$(this).toggleClass('selected');
		}
		
		$('.gallery-item').click(select_image);
	})();
});