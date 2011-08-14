//$(document).ready(function(){
	/*
(function($) {
   previewBoxId = 'tooltip';
   if ($('.thumbnails a, #thumbnails a').length > 0 ) {
      $('.thumbnails a, #thumbnails a').imgPreview({
         containerID:previewBoxId,
         considerBorders:'true',
         srcAttr: 'imgsrc',
         preloadImages: false,
      });
    
   }

  
//});
})(jQuery);*/

$('.thumbnails a, #thumbnails a').imgPreview({
    containerID: 'tooltip',
		srcAttr: 'imgsrc',
		considerBorders:'true',
    // When container is shown:
    onShow: function(link){
        $('<span>' + $(link).children().attr("title") + '</span>').appendTo(this);
				        // Animate link:
        $(link).stop().animate({opacity:0.4});
        // Reset image:
        $('img', this).stop().css({opacity:0});

    },
    onLoad: function(){
        // Animate image
        $(this).animate({opacity:1}, 300);
    },
    // When container hides: 
    onHide: function(link){
        $('span', this).remove();
        // Animate link:
        $(link).stop().animate({opacity:1});

    }
});
