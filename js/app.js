(function($) {
  
  mattarelloApp = {
    selectors: {   
      verticalMenu: null,
      titleSelector: 'h2',     
    },
    scrolled: false,
    settings: {
      animationDuration: 100
    },
    features: {},
    headerHeight: 0,
  };
  
  window.mattarelloApp = mattarelloApp;
  
  

  mattarelloApp.processBackgrounds = function($context) {
    
    $('.bg-from-image',$context).once('process-bg-from-image', function() {
      
      var $this = $(this);
      var $img = $this.find('img');
      
      $this.css('background-image','url('+$img.attr('src')+')');
      
      $img.hide();    
      
    })    
    
  }

  mattarelloApp.highlightVerticalMenu = function() {
  
     if(mattarelloApp.selectors.verticalMenu != null) {
        
        mattarelloApp.selectors.titles.each( function() {
          
          var $title = $(this);
          
          if(isElementNext($title.get(0))) {
            
            mattarelloApp.selectors.verticalMenu.find('li').removeClass('active').filter('[data-target=".'+$title.attr('data-title-id')+'"]').addClass('active');
            
            return false;
            
          }
          
        })
        
        
        
     }
    
  }
  
  mattarelloApp.handleScroll = function() {
 
    if (mattarelloApp.scrolled) {
        
        /**

           if(window.scrollY > (mattarelloApp.headerHeight)) {
              
              mattarelloApp.selectors.$body.addClass('fixed-header');
              mattarelloApp.selectors.$body.css('padding-top',mattarelloApp.headerHeight);
              
            } else {
              
              mattarelloApp.selectors.$body.removeClass('fixed-header');
              mattarelloApp.selectors.$body.css('padding-top',0);
              
            }
            */
            
        mattarelloApp.highlightVerticalMenu();
        
        mattarelloApp.scrolled = false;
        
      }
    
  }
  
  
  mattarelloApp.adjustBodyTopPadding = function() {
    
    if(!$('.mobile-menu-trigger').hasClass('is-active')) {
      mattarelloApp.headerHeight = mattarelloApp.selectors.$pageHeader.height();
      mattarelloApp.selectors.$body.css('padding-top',mattarelloApp.headerHeight);
    }
    
  }
  
  mattarelloApp._expanderClick = function() {
    
    var $this = $(this);
    
    $this.toggleClass('open');
    
    if( $this.hasClass('open') ) {
      
      $( $this.attr('data-expand') ).slideDown();
      
    } else {
      
      $( $this.attr('data-expand') ).slideUp();
      
    }
    
    return false;
    
  }

  mattarelloApp.bindExpanders = function($scope) {
    
    if (typeof $scope == 'undefined') {
      $scope = $('body');
    }
    
    $('.expandable', $scope).once('expandable',function() {
      
      $(this).hide();
      
    });
    
    $(' .expander', $scope).once('expander', function() {
      
      $(this).on('click', mattarelloApp._expanderClick );
      
    });
    
  }
  
    /*
   *  build vertical navigation
   */
  mattarelloApp.buildVerticalMenu = function() {
    
    /*
     * check if the page is long enough to require
     * vertical index / navigation
     */
    
    var $titles = $('.main-content-wrapper '+mattarelloApp.selectors.titleSelector);
    
    if($titles.length > 1) {
      
      mattarelloApp.selectors.titles = $titles;
  
      var titleCounter = 0;
      
      var $verticalNavContainer = $('<nav class="vertical-navbar" />');
      var $verticalNavUl = $('<ul>');
      
      $titles.each( function() {
        
        var $this = $(this);
        var $class = 'title-number-'+titleCounter;
        titleCounter++
        
        $this.addClass($class);
        $this.attr('data-title-id',$class);
        
        var $li = $('<li><span>'+$this.text()+'</span></li>');
                        
        $li.attr('data-target','.'+$class);
        $verticalNavUl.append($li);
        
      })
      
      $verticalNavUl.appendTo($verticalNavContainer);
            
      $verticalNavContainer.prependTo(mattarelloApp.selectors.$body);
      
      mattarelloApp.selectors.verticalMenu = $verticalNavContainer;
    
      $verticalNavContainer.on('click','li', function() {
        
        if((mattarelloApp.features.touch && mattarelloApp.selectors.verticalMenu.hasClass('hover')) ||
           (!mattarelloApp.features.touch)) {
            
             
              mattarelloApp.scrollTo($( $(this).attr('data-target') ),
                        function() {
                          if(mattarelloApp.features.touch) {
                            mattarelloApp.selectors.verticalMenu.removeClass('hover');
                          }                       
                        });
             
             
           }
        
       
        
      });
     
      
     
     /* scrolltop link
      *
      */
     
      var $scrollTopLink = $('<i class="scroll-top"></i>');
          
      $verticalNavContainer.prepend($scrollTopLink);
      
      $scrollTopLink.on('click',function() {
          mattarelloApp.scrollTo(mattarelloApp.selectors.$body); 
      });
     
      $verticalNavContainer.on('mouseenter',
        function() {
          $(this).addClass('hover');
        });
      
      $verticalNavContainer.on('mouseleave',
        function() {
          $(this).removeClass('hover');
        });
        
      
      
    }


  }
  
  /*
   * smooth scroll to element
   */
  
  mattarelloApp.scrollTo = function($element,callback) {
    
    var emptyCallback = function() {};
       
    var callback = (typeof callback !== 'undefined') ?  callback : emptyCallback;
    
    if($element.length > 0) {
         
      mattarelloApp.scrolling = true;
      

       
       $('html, body').stop().animate({
            'scrollTop': $element.offset().top - $element.height() - mattarelloApp.headerHeight - 40
       }, 
        mattarelloApp.scrollDuration, 
        function() {
          callback();
          mattarelloApp.scrolling = false;
        })
        
         
    }
      
  }
  

  

  
   
  /*
   * set touch and no-touch classees to body according to
   * touch events availability
   */
   mattarelloApp.detectTouch = function() {
     
     if(("ontouchstart" in document.documentElement)) {
       mattarelloApp.selectors.$body.addClass('touch');
       mattarelloApp.features.touch = true;
     } else {
       mattarelloApp.selectors.$body.addClass('no-touch');
       mattarelloApp.features.touch = false;
     }
     
   }
   
  
  
  mattarelloApp.setupMobileNavigation = function() {

    mattarelloApp.selectors.$fullMenu.addClass('mobile-hide');
    
    $('.mobile-menu-trigger').on('click', function() {
      
      mattarelloApp.selectors.$fullMenu.toggleClass('mobile-hide');
      $(".hamburger").toggleClass('is-active');
    
      return false;
      
    })
        
  }
  
  
  
  mattarelloApp.equalizeHeights = function() {
    
    $('.process-equalizeHeights').each( function() {
      
      var $this = $(this);
      
      var $toBeEqualized = $(this).find('.process-equalizeHeight');
      
      var maxHeight = 0;
      
      $toBeEqualized.each( function() {
        
        if ($(this).height() > maxHeight) {
          maxHeight = $(this).height();
        }
        
      })
      
      $toBeEqualized.each( function() {
        
        $(this).height(maxHeight);
        
      })
      
      $this.addClass('processed-equalizeHeights');
      
    })
    
  }
      
  $(document).ready( function() {
       
    mattarelloApp.selectors.$body = $('body');
    mattarelloApp.selectors.$primaryMenu = $('.primary-menu'); 
    mattarelloApp.selectors.$fullMenu = $('.full-menu');
    mattarelloApp.detectTouch();
   
    mattarelloApp.selectors.$pageHeader = $('.page-header');
    mattarelloApp.selectors.$mainMenu = $('.menu-container');

    mattarelloApp.setupMobileNavigation();
 
 
    mattarelloApp.buildVerticalMenu();
        
    /*
     * adjust body top padding to header height
     */
    
    mattarelloApp.adjustBodyTopPadding();
    window.setInterval(mattarelloApp.adjustBodyTopPadding,1000);

    /**
     * throttle scroll handling
     */ 
    $(window).on('scroll',function() {
    
      mattarelloApp.scrolled = true;
      
    });
    
    window.setInterval(mattarelloApp.handleScroll,500);
    mattarelloApp.scrolled = true;
    mattarelloApp.handleScroll();
    
    mattarelloApp.equalizeHeights();
    
   });
    
          
 
  
  
 
  
   
}(jQuery));


function isElementNext(el) {
  
    var rect = el.getBoundingClientRect();

    return (rect.top > 0);
  
}

