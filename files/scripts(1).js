/*
 * Studio 8 Application File
 * Author: Simon Bouchard
 *
*/

(function ( $ ) {
  "use strict";

  /**
  ** Caching
  */
  var $body = $('body'),
      $sliderContent = $("body.page-template-page-slider-php .main"),
      $projectContent = $("body.single-projects .hero-enable"),
      $404Content = $("body.error404 .main"),
      $gallery = $(".gallery-icon"),
      $galleryItem = $(".gallery-icon a");

  var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
  };

  /**
  ** Preload
  */
  function preload(){
    setTimeout(function(){
        $body.addClass('pace-done');
    },500);
    $('.entry-header img').sbwpBackStretch('.entry-header');
    $('.post-image img').sbwpBackStretch('.hentry');
  }

  /**
  ** Mobile Navigation
  */
  function initMobileMenu(){

    $(".mobile-trigger span").click(function () {
      if ($("nav.mobile ul").is(":visible")){
        $("nav.mobile ul").slideUp(200);
      } else {
        $("nav.mobile ul.mobile").slideDown(200);
      }
    });

    $("nav.mobile ul li.menu-item-has-children").click(function () {
        $(this).find("ul.sub-menu").stoggle(300,"easeInOutExpo");
    });

  }

  /**
  ** Projects
  */
  function initProjects() {

    var e = jQuery(".full-width").width(),
        b = jQuery(".quarter-width").width(),
        a = jQuery(".third-width").width(),
        o = jQuery(".half-width").width();
    $(".full-height").height(e * 0.75);
    $(".quarter-height").height(b * 0.75);
    $(".third-height").height(a * 0.75);
    $(".half-height").height(o * 0.70);

    $galleryItem.each(function () {
        jQuery(this).addClass("fresco");
        jQuery(this).attr("data-fresco-group", "gal-1");
    });

    $gallery.each(function() { 
      jQuery(this).find('a.fresco')
        .attr('data-fresco-group', jQuery(this).attr('id'));
    });   

  }

  /**
  ** Backstretch
  */
  $.fn.sbwpBackStretch = function(container) {

    if ($.fn.backstretch) {
      $(this).each(function(){
        var $this       = $(this),
            $url        = $this.attr('src'),
            $container  = $this.closest(container);

        $this.remove();
        $container.backstretch($url, { fade: 500 });

      });
    }

  };

  /**
  ** Toggle
  */
  $.fn.stoggle  = function(speed, easing) {
      return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing);
  };

  /**
  ** Overlay
  */
  (function($) {

    var $content    = $('.overlay-target'),
      $wrap         = $('.overlay-wrap'),
      $projects     = $('.project-panel', $wrap),
      $btnProjects  = $('.trigger-overlay-projects').find('a').filter(":first"),
      $overlayClose = $('.overlay-close');

    $btnProjects.on('click touchstart', function(e) {
      e.preventDefault();
      openOverlay('projects');
    });

    $overlayClose.on('click touchstart', function(e) {
      e.preventDefault();
      closeOverlay();
    });

    function openOverlay(elem) {
      $wrap.addClass('open');
      $content.addClass('overlay-open');
    }

    function closeOverlay() {
      $wrap.addClass('closing');
      $content.removeClass('overlay-open');

      setTimeout(function(){
        $wrap.removeClass('open closing');
      }, 500);
    }

  }(window.jQuery));

  /**
  ** Max Image
  */
  function initMaxImage() {

    $(function(){
      $('#maximage').maximage({
        cycleOptions: {
          fx: 'fade',
          speed: 1000,
          timeout: 10000,
          prev: '#arrow_left',
          next: '#arrow_right',
          pause: 1,
          before: function(last,current){
            if(!$.browser.msie){
              // Start HTML5 video when you arrive
              if($(current).find('video').length > 0) $(current).find('video')[0].play();
            }
          },
          after: function(last,current){
            if(!$.browser.msie){
              // Pauses HTML5 video when you leave it
              //if($(last).find('video').length > 0) $(last).find('video')[0].pause();
            }
          }
        },
        onFirstImageLoaded: function(){
          setTimeout(function(){
            $('.loader').fadeOut('fast');
            $('#maximage').fadeIn('fast');
          },1000);
          stickyHeaderSliderInit();
        }
      });

      // To show it is dynamic html text
      $('.in-slide-content').fadeIn('fast');

    });

    $(function(){
      $('#skip a').click(function() {
        $.scrollTo( this.hash, 1000, { easing:'easeOutQuint' });
        return false;
      });
    });

  }

  /**
  ** fullHeight Function
  */
  function fullHeight() {
    var height = $(window).height();
    var fullheight = (100 * height) / 100;
    fullheight = parseInt(fullheight) + 'px';
    $sliderContent.css('margin-top', fullheight);
    $projectContent.css('margin-top', fullheight);
    $404Content.css('margin-top', fullheight);
  }

  /**
  ** fiftyHeight Function
  */
  function fiftyHeight() {
    var height = $(window).height();
    var fiftyheight = (42 * height) / 100;
    fiftyheight = parseInt(fiftyheight) + 'px';
    $(".in-slide-content").css('margin-top',fiftyheight);
  }

  /**
  ** sixtyHeight Function
  */
  function sixtyHeight() {
    var height = $(window).height();
    var sixtyheight = (60 * height) / 100;
    sixtyheight  = parseInt(sixtyheight) + 'px';
    $(".entry-header").css('height',sixtyheight);
  }

  /**
  ** Sticky Header Function
  */
  function stickyHeaderSliderInit() {
    var headerSelector  = 'header.scroll',
        $header         = $(headerSelector),
        headerHeight    = $header.outerHeight(),
        $slider         = $('.mc-cycle'),
        offset          = $slider.length ? $slider.first().outerHeight() : 0;

    $header.headroom({
      tolerance: 15,
      offset: offset + headerHeight,
      classes : {
        initial : 'animated',
        pinned : 'slideDown',
        unpinned : 'slideUp',
        top : 'headroom--top',
        notTop : 'headroom--not-top',
      }
    });

    var fadeStart       = 100, 
        fadeEnd         = 400, 
        fade            = $('.in-slide-content.fade-enable');
      
    $(window).bind('scroll', function(){
        var offset = $(document).scrollTop(), opacity = 0;
        if( offset <= fadeStart ){
            opacity = 1;
        } else if( offset <= fadeEnd ){
            opacity = 1 - offset / fadeEnd;
        }
        fade.css('opacity',opacity);
    });

  }

  function initStickyHeader() {
    var e = $('body');
    if(e.is('.page-template-page-slider-php, .single-projects, .error404')) {

      initMaxImage();
    
    } else {

      $(".header.scroll").headroom({
        "tolerance": 15,
        "offset": 205,
        "classes": {
          "initial": "animated",
          "pinned": "slideDown",
          "unpinned": "slideUp",
          "top": "headroom--top",
          "notTop": "headroom--not-top"
        }
      });      
    
    }
  }

  function initParallax() {
    if(!isMobile.any()) {
      $('.parallax').parallax("50%", 0.2, "true");
    }
  }

  /**
  ** Initialize all scripts here
  */
  $.fn.sbwpScripts = function() {

    preload();
    initStickyHeader();
    initMobileMenu();
    fullHeight();
    fiftyHeight();
    sixtyHeight();
    initProjects();
    initParallax()

    $(".fit-text").fitText(1.0, { minFontSize: '36px', maxFontSize: '144px' });

    $(".carousel-owl-single").owlCarousel({
      slideSpeed : 300,
      autoPlay: 5000,
      singleItem: true,
      autoHeight : true
    });

    $(".carousel-owl-images").owlCarousel({
      slideSpeed : 300,
      autoPlay: 5000,
      items : 5,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3],
      autoHeight : true,
      lazyLoad : true
    });

    /* Dropdown Navigation ****************************/
    $('nav.primary li').hoverIntent(function(){
          $(this).find("a:first").addClass("active");
          $(this).find("ul.sub-menu").stoggle(300,"easeInOutExpo");
    },

    function(){
      $(this).find("a:first").removeClass("active");
      $(this).find("ul.sub-menu").stoggle(300,"easeInOutExpo");
    });

    /* Search ****************************/
    $(function(){
        $('a[href="#search"]').on('click', function(event) {
            event.preventDefault();
            $('#full-search').addClass('open');
            $('#full-search > form > input[type="search"]').focus();
        });
        
        $('#full-search').on('click keyup', function(event) {
            if (event.target == this || event.keyCode == 27) {
                $(this).removeClass('open');
            }
        });
        
    });
    
    /* Masonry ****************************/
    if($('.masonry').length>0){

      var $container = $('.masonry');
      // initialize
      $container.masonry({
        gutter: 12,
        itemSelector: '.hentry'
      });

    }

    /* Syntax Highlighter ****************************/
    SyntaxHighlighter.defaults[' gutter '] = true;
    SyntaxHighlighter.defaults[' toolbar '] = false;
    SyntaxHighlighter.all();

  };

  /* Init App ****************************/
  $(document).ready(function() {

    $('body').sbwpScripts();

  });

  /* Resize Binding ****************************/
  $(window).resize(function() {

    initProjects();
    fullHeight();
    fiftyHeight();
    sixtyHeight();

  });

})( jQuery );

function twwindows(object) {
  window.open( object, "twshare", "height=400,width=550,resizable=1,toolbar=0,menubar=0,status=0,location=0" );
}
function gpwindows(object) {
  window.open( object, "gpshare", "height=600,width=500,resizable=1,toolbar=0,menubar=0,status=0,location=0" );
}
function fbwindows(object) {
  window.open( object, "fbshare", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
}
