/** @namespace */
var simplicioTools = {};

(function($){
  /**
   * Some appearance functions
   * @namespace
   */
  simplicioTools.appearance = {
    init: function(){
      this.setFullFrames();
      this.setCopyNavigationHeight();
      this.setSpecialLetters();
    },
    onResize: function(){
      this.setFullFrames();
      this.setCopyNavigationHeight();
    },
    setFullFrames: function(){
      var screenHeight = $(window).height() - $('.simplicioNavigation .simplicioNavigationHeader').outerHeight();
      $('.simplicioFullFrame').each(function(index, el) {
        if($(this).height() < screenHeight){
          $(this).height(screenHeight);
        }
      });
    },
    setCopyNavigationHeight: function(){
      $('.simplicioNavigationHeight').each(function(index, el) {
        $(this).height(
          $('.simplicioNavigation .simplicioNavigationHeader').outerHeight()
        );
      });
    },
    setSpecialLetters: function(){
      $('.simplicioFirstParagraphFirstLetter').each(function(index, el) {
        $(this).find('p').first().each(function(){
          var paragraph = $(this).html();
          var newContent = '<span class="simplicioLetter">' + 
                            paragraph.charAt(0) + 
                            '</span>' + 
                            paragraph.substring(1, paragraph.length);
          $(this).html(newContent);
        });
      });
    }
  };

  /** @namespace */
  simplicioTools.scroller = {
    setScrollers: function(){
      var self = this;
      $('.simplicioScrollTo').each(function(index, el) {
        var tempElem = $(this).attr('data-scroll-to');
        $(this).on('click', function(event) {
          event.preventDefault();
          self.scrollTo(tempElem);
        });
      });
    },
    scrollTo: function(elemSelector){
      var tempPosition = $(elemSelector).position();
      if(tempPosition !== undefined){
        TweenLite.to(
          window, 
          2, 
          {
            scrollTo:{
              y: (tempPosition.top - $('.simplicioNavigation .simplicioNavigationHeader').outerHeight())
            }, 
            ease:Power4.easeOut
          }
        );
      }
    }
  };

  /** @namespace */
  simplicioTools.preload = {
    containerImages: function(selector) {
      var defer = $.Deferred();

      var self = this;
      var $elem = $(selector);
      var $preloader = $('<i class="fa fa-cog fa-spin"/>');

      $elem.parent().prepend($preloader);
      $elem.css('display', 'none');

      var promise = self.preloadImages($elem);
      $.when(promise).done(
        function(){
          $elem.css('display', 'block');
          $preloader.remove();
          defer.resolve();
        }
      );

      return defer.promise();
    },
    preloadImages: function($elem){
      var defer = $.Deferred();
      
      var self = this;
      var images = [];
      var checkIsComplete = function(){
        for (var imgElem in images) {
          if (!images[imgElem]['hasLoaded']) {
            return false;
          }
        }
        return true;
      };

      $elem.find('img').each(function(index, el) {
        var imgData = {};
        imgData['url'] = $(this).attr('src');
        imgData['data'] = new Image();
        imgData['data'].src = imgData['url'];
        imgData['hasLoaded'] = false;
        $(imgData['data']).on('load', function(event) {
          imgData['hasLoaded'] = true;
          if(checkIsComplete()){
            defer.resolve();
          }
        });
        images.push(imgData);
      });
      
      return defer.promise();
    }
  };

  $(document).ready(function() {
    simplicioTools.scroller.setScrollers();
    simplicioTools.appearance.init();
  });

  $(window).resize(function(event) {
    simplicioTools.appearance.onResize();
  });

})(jQuery);
