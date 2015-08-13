(function($){
  /**
   * A set of image manipulation functions
   */
  simplicioTools.image = {
    /**
     * Positions the image(s) at the center of the container's height.
     * @param {Object|string} container - The image(s) container element. It can be a jQuery object, a DOM node, or a jQuery selector.
     * @param {Object|string} [image] - The image(s) element. It can be a jQuery object, a DOM node, or a jQuery selector.
     */
    setVerticalPosition: function(container, image){
      var height = $(container).outerHeight();
      var elem;
      if(image){
        elem = image;
      }else{
        elem = $(container).find('img');
      }
      $(elem).each(function(index, el){
        var topVal = -($(el).outerHeight() - height)/2
        $(el).css('top', topVal);
      });
    }
  };

})(jQuery);