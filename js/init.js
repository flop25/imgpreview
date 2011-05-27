//$(document).ready(function(){
(function($) {
   previewBoxId = 'tooltip';
   if ($('.thumbnails a').length > 0 ) {
      $('.thumbnails a').imgPreview({
         containerID:previewBoxId,
         considerBorders:'true',
         srcAttr: 'imgsrc',
         preloadImages: false,
      });
    
   }

  
//});
})(jQuery);
