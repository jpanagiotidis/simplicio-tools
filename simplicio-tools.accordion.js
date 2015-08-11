(function($){
  simplicioTools.accordion = {};
  
  simplicioTools.accordion.horizontal = function(selector, _ratio){
    var self = this;

    this.elem = $(selector); //holds the accordion root jquery element
    this.ratio; //stores the height to width ratio (height = ratio*width)
    if(_ratio !== undefined){
      this.ratio = _ratio;
    }else{
      this.ratio = 0.5;
    }
    this.slideWidthPercentage = 0.8;
    this.animSpeed = 0.3;
    this.currentWidth = 0; //stores the accordion current width
    this.currentHeight = 0; //stores the accordion current height
    this.currentIndex = -1;
    this.slides = [];

    var promise = simplicioTools.preload.containerImages(selector);
  
    $.when(promise).done(
      function(){
        self.setSlides();
        self.setSize();
        $(window).on('resize', function(event) {
          self.setSize();
        });
      }
    );
  };

  /**
   * Creates the slides array and adds click event listener on each slide
   */
  simplicioTools.accordion.horizontal.prototype.setSlides = function(){
    var self = this;
    self.slides = [];
    
    self.elem.find('.simplicio-accordion-elem').each(function(index, el) {
      self.slides.push(el);

      $(el).on('click', function(evt) {
        evt.preventDefault();
        var tempIndex = self.getIndex(evt.currentTarget);
        if(tempIndex == self.currentIndex){
          self.currentIndex = -1;
        }else{
          self.currentIndex = tempIndex;
        }
        self.setSlidesPositions(true);
      });
    });
  };

  /**
   * Returns the index of the input slide element
   */
  simplicioTools.accordion.horizontal.prototype.getIndex = function(slide){
    var self = this;

    return self.slides.indexOf(slide);
  };

  /**
   * Initializes/recalculates gallery and slides size and positions.
   * This function is called on window resize
   */
  simplicioTools.accordion.horizontal.prototype.setSize = function(ratio){
    var self = this;
    self.currentWidth = self.elem.width();
    self.currentHeight = self.ratio*self.currentWidth;
    self.elem.height(self.currentHeight);
    self.setInstantSameValues({
      'width': self.slideWidthPercentage*100 + '%'
    });
    self.setSlidesPositions();
    self.setHeaders();
  };

  simplicioTools.accordion.horizontal.prototype.setHeaders = function(ratio){
    var self = this;

    for(var i in self.slides){
      $(self.slides[i]).find('.simplicio-accordion-header').each(function(index, el) {

        $(el).css({
          'width': self.currentHeight + 'px',
          'top' : -$(el).outerHeight() + 'px'
        });
      });
    }
  };

  simplicioTools.accordion.horizontal.prototype.setInstantSameValues = function(values){
    var self = this;

    for (i in self.slides) {
      $(self.slides[i]).css(values);
    }
  };

  simplicioTools.accordion.horizontal.prototype.setInstantValues = function(valuesArray){
    var self = this;

    for (i in self.slides) {
      jQuery(self.slides[i]).css(valuesArray[i]);
    }
  };

  simplicioTools.accordion.horizontal.prototype.setAnimatedValues = function(values){
    var self = this;

    for (i in self.slides) {
      TweenLite.to(
        self.slides[i], 
        self.animSpeed,
        values[i]
        // {
        //   left: counter + "px", 
        //   ease:Linear.easeNone
        // }
      );
    }
  };

  simplicioTools.accordion.horizontal.prototype.setSlidesPositions = function(isAnimated){
    var self = this;

    var pos; //stores the positions array

    if(self.currentIndex >= 0){ // if a slide is selected then use the getSlideOpenPositions
      pos = self.getSlideOpenPositions();
    }else{ // else (none selected, all closed) use the getAllClosedPositions
      pos = self.getAllClosedPositions();
    }

    if(isAnimated){
      self.setAnimatedValues(pos);
    }else{
      self.setInstantValues(pos);
    }

    for (i in self.slides) {
      self.setImagePosition(self.slides[i]);
    }

    self.setSlidesCaptions();
  };

  simplicioTools.accordion.horizontal.prototype.setSlidesCaptions = function(){
    var self = this;

    var value = undefined;

    for(var i in self.slides){
      if(self.currentIndex == i){
        value = 1;
      }else{
        value = 0;
      }

      $(self.slides[i]).find('.simplicio-accordion-caption').each(function(index, el) {
        TweenLite.to(
          el, 
          self.animSpeed,
          {
            'opacity':value, 
            ease:Linear.easeNone
          }
        );
      });

      $(self.slides[i]).find('.simplicio-accordion-header').each(function(index, el) {
        TweenLite.to(
          el, 
          self.animSpeed,
          {
            'opacity':Math.abs(value - 1), 
            ease:Linear.easeNone
          }
        );
      });
    }
  };

  /**
   * Returns an array with the positions for all slides closed
   */
  simplicioTools.accordion.horizontal.prototype.getAllClosedPositions = function(){
    var self = this;

    var out = [];
    
    var widthStep = self.elem.width()/self.slides.length;

    for (i in self.slides) {
      out.push({
        'left': i*widthStep
      });
    }

    return out;
  };

  /**
   * Returns an array with the positions for one slide open
   */
  simplicioTools.accordion.horizontal.prototype.getSlideOpenPositions = function(){
    var self = this;

    var out = [];

    var smallStep = Math.round((1 - self.slideWidthPercentage)*self.currentWidth/(self.slides.length - 1));
    var bigStep = Math.round(self.slideWidthPercentage*self.currentWidth);

    var counter = 0;

    for (var i in self.slides) {
      out.push({
        'left': counter + 'px'
      });

      if(self.currentIndex == i){
        counter += bigStep;
      }else{
        counter += smallStep;
      }
    }

    return out;
  };

  simplicioTools.accordion.horizontal.prototype.setImagePosition = function(elem){
    var self = this;

    $(elem).find('img').each(function(index, el) {
      var topVal = -($(el).height() - self.currentHeight)/2
      $(el).css('top', topVal);
    });
  };

  simplicioTools.accordion.horizontal.prototype.openSlide = function(){
    var self = this;

    self.setSlidesPositions(true);
  };















  simplicioTools.accordion.vertical = function(selector, _ratio){
    var self = this;

    this.animSpeed = 0.3;
    self.closeAll();
    $(selector + ' .simplicio-accordion-elem').each(function(index, el) {
      var elem = this;
      $(elem).find('.simplicio-accordion-header').on('click', function(evt){
        self.closeActive();
        var content = $(elem).find('.simplicio-accordion-content');
        self.openElement(content);
      });
    });
  };

  simplicioTools.accordion.vertical.prototype.closeAll = function() {
    var self = this;
    $('.simplicio-accordion-content').each(function(index, el) {
      self.closeElement(el);
    });
  };

  simplicioTools.accordion.vertical.prototype.closeActive = function() {
    var self = this;
    $('.simplicio-accordion-active').each(function(index, el) {
      self.closeElement(el);
    });
  };

  simplicioTools.accordion.vertical.prototype.closeElement = function(elem) {
    var self = this;
    TweenLite.to(
      elem, 
      self.animSpeed, 
      {
        height:"0px", 
        ease:Linear.easeNone,
        onComplete: function(){
          $(elem).removeClass('simplicio-accordion-active');
          $(elem).css('display', 'none');
        }
      }
    );
  };

  simplicioTools.accordion.vertical.prototype.openElement = function(elem) {
    var self = this;
    $(elem).css('display', 'block');
    $(elem).addClass('simplicio-accordion-active');
    TweenLite.to(
      elem, 
      self.animSpeed, 
      {
        height:"200px", 
        ease:Linear.easeNone
      }
    );
  };

})(jQuery);
