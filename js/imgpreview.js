/*
 * imgPreview jQuery plugin
 * Copyright (c) 2009 James Padolsey
 * j@qd9.co.uk | http://james.padolsey.com
 * Dual licensed under MIT and GPL.
 * Updated: 09/02/09
 * @author James Padolsey
 * @version 0.22
 */
/*
(function(c){c.expr[':'].linkingToImage=function(a,g,e){return!!(c(a).attr(e[3])&&c(a).attr(e[3]).match(/\.(gif|jpe?g|png|bmp)$/i))};c.fn.imgPreview=function(j){var b=c.extend({imgCSS:{},distanceFromCursor:{top:10,left:10},preloadImages:true,onShow:function(){},onHide:function(){},onLoad:function(){},containerID:'imgPreviewContainer',containerLoadingClass:'loading',thumbPrefix:'',srcAttr:'href'},j),d=c('<div/>').attr('id',b.containerID).append('<img/>').hide().css('position','absolute').appendTo('body'),f=c('img',d).css(b.imgCSS),h=this.filter(':linkingToImage('+b.srcAttr+')');function i(a){return a.replace(/(\/?)([^\/]+)$/,'$1'+b.thumbPrefix+'$2')}if(b.preloadImages){(function(a){var g=new Image(),e=arguments.callee;g.src=i(c(h[a]).attr(b.srcAttr));g.onload=function(){h[a+1]&&e(a+1)}})(0)}h.mousemove(function(a){d.css({top:a.pageY+b.distanceFromCursor.top+'px',left:a.pageX+b.distanceFromCursor.left+'px'})}).hover(function(){var a=this;d.addClass(b.containerLoadingClass).show();f.load(function(){d.removeClass(b.containerLoadingClass);f.show();b.onLoad.call(f[0],a)}).attr('src',i(c(a).attr(b.srcAttr)));b.onShow.call(d[0],a)},function(){d.hide();f.unbind('load').attr('src','').hide();b.onHide.call(d[0],this)});return this}})(jQuery);
*/
/*
 * imgPreview jQuery plugin
 * Copyright (c) 2009 James Padolsey
 * j@qd9.co.uk | http://james.padolsey.com
 * Dual licensed under MIT and GPL.
 * Updated: 09/02/09
 * @author James Padolsey
 * @version 0.22
 *
 *
 * !!!!!!! -> This plugin contains ADDITIONS. 'considerBorders' param. You will have to add
 * it yourself to newest version, if you use this param
 */
(function($){

    $.expr[':'].linkingToImage = function(elem, index, match){
        // This will return true if the specified attribute contains a valid link to an image:
        return !! ($(elem).attr(match[3]) && $(elem).attr(match[3]).match(/\.(gif|jpe?g|png|bmp)$/i));
    };

    $.fn.imgPreview = function(userDefinedSettings){

        var s = $.extend({

            /* DEFAULTS */
            minWidth: 32,
            imgSrcHide: 'about:blank',
            // CSS to be applied to image:
            imgCSS: {},
            // Distance between cursor and preview:
            distanceFromCursor: {top:20, left:20},
            // Boolean, whether or not to preload images:
            preloadImages: true,
            // Callback: run when link is hovered: container is shown:
            onShow: function(){},
            // Callback: container is hidden:
            onHide: function(){},
            // Callback: Run when image within container has loaded:
            onLoad: function(){},
            // ID to give to container (for CSS styling):
            containerID: 'imgPreviewContainer',
            // Class to be given to container while image is loading:
            containerLoadingClass: 'loading',
            // Prefix (if using thumbnails), e.g. 'thumb_'
            thumbPrefix: '',
            // Where to retrieve the image from:
            srcAttr: 'href',
            //The script moves the box depending on window borders
            // Added by Ujeen
            considerBorders: 'false'

        }, userDefinedSettings),

        $container = $('<div/>').attr('id', s.containerID)
                        .append('<img/>').hide()
                        .css('position','absolute')
                        .appendTo('body'),

        $img = $('img', $container).css(s.imgCSS),

        // Get all valid elements (linking to images / ATTR with image link):
        $collection = this.filter(':linkingToImage(' + s.srcAttr + ')');

        // Re-usable means to add prefix (from setting):
        function addPrefix(src) {
            return src.replace(/(\/?)([^\/]+)$/,'$1' + s.thumbPrefix + '$2');
        }

        if (s.preloadImages) {
            (function(i){
                var tempIMG = new Image(),
                    callee = arguments.callee;
                tempIMG.src = addPrefix($($collection[i]).attr(s.srcAttr));
                tempIMG.onload = function(){
                    $collection[i + 1] && callee(i + 1);
                };
            })(0);
        }

        $collection
            .mousemove(function(e){
                // 'considerBorders' functionality
                if (s.considerBorders == 'true') {
                  if (($img.width() > 0) && ($img.height() > 0) || 1==1) {
                      if (($img.width() > 0) && ($img.height() > 0))
                        $img.css({'display':'block'});
                    var cur_bot_dist = $(window).height() - e.clientY;
                    var cur_lr_dist = $(window).width() - e.clientX;
                    var position_y = e.pageY+s.distanceFromCursor.top+"px";
                    var position_x = e.pageX+s.distanceFromCursor.left+"px";
                    var box_height = $container.height()+50;
                    var box_width = $container.width()+50;
                    
                    if (cur_bot_dist < (box_height)) {
                      position_y = e.pageY-(box_height-cur_bot_dist)+"px";
                    }
                    if (e.clientY < s.distanceFromCursor.top) {
                      position_y = e.pageY+"px";
                    }
                    if (cur_lr_dist < (box_width)) {
                      position_x = e.pageX-(box_width+15)+"px";
                    }
                    $container.css({
                        top: position_y,
                        left: position_x
                    });
                  }
                  // #--considerBorders
                } else {
                  $container.css({
                      top: e.pageY + s.distanceFromCursor.top + 'px',
                      left: e.pageX + s.distanceFromCursor.left + 'px'
                  });
                }

            })
            .hover(function(){

                var link = this;
                $container
                    .addClass(s.containerLoadingClass)
                    .show();
                $img
                    .load(function(){
                        $container.removeClass(s.containerLoadingClass);
                        $img.show();
                        $container.width($img.width());
                        s.onLoad.call($img[0], link);
                    })
                    .attr( 'src' , addPrefix($(link).attr(s.srcAttr)) )
                    .$(function(){
                      // 'considerBorders' functionality
                      if (s.considerBorders == 'true') {
                        $(this).css({'display':'none'});
                      }
                      // #--considerBorders
                    });
                    
                s.onShow.call($container[0], link);

            }, function(){

                $container.hide();
                $img.unbind('load').attr('src', s.imgSrcHide).hide();
                $container.width(s.minWidth);
                s.onHide.call($container[0], this);

            });
         
        // Return full selection, not $collection!
        return this;

    };

})(jQuery);