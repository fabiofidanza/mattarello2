"use strict";
 
jQuery(document).ready( function($) {
  
  var mattarelloStyleGuide = [];
  
  mattarelloStyleGuide.toggleSourceCode = function() {
    
    var $this = $(this);
    
    var $container = $this.parents('.show-source');
    
    $container.find('.source-code').toggle();
    
  }
  
  mattarelloStyleGuide.applyShowSourceCode = function() {
    
    $('.show-source').each( function() {
      
      var $this = $(this);
      
      var code = $this.html();
      
      var $interface = $('<div class="container with-content source-code-viewer v-padded-half">');

      var $toggle = $('<a class="toggle-code action light tiny">HTML</a></div>');
            
      var $sourceElement = $('<div class="source-code" />');
      
      var $codeElement = $('<code />');
      
      $toggle.on('click',mattarelloStyleGuide.toggleSourceCode);
      
      $codeElement.text(code);
      
      $sourceElement.append($codeElement);
      
      $interface.append($toggle);
      $interface.append($sourceElement);
      
      
            
      $this.append($interface); 
      
      $sourceElement.hide();
      
    })
    
  }
  
  mattarelloStyleGuide.applyShowSourceCode();
  
  
})
