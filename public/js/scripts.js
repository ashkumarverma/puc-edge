"use strict"; 


// Megafolio Sortable Grid
jQuery(document).ready(function() {
					var api=jQuery('.megafolio-container-index').megafoliopro(
						{
							filterChangeAnimation:"rotatescale",			// fade, rotate, scale, rotatescale, pagetop, pagebottom,pagemiddle
							filterChangeSpeed:600,					// Speed of Transition
							filterChangeRotate:10,					// If you ue scalerotate or rotate you can set the rotation (99 = random !!)
							filterChangeScale:0.6,					// Scale Animation Endparameter
							delay:20,
							defaultWidth:980,
							paddingHorizontal:0,
							paddingVertical:0,
                            startFilter:"cp-all",					// Start with a predefined Filter
							layoutarray:[5]		// Defines the Layout Types which can be used in the Gallery. 2-9 or "random". You can define more than one, like {5,2,6,4} where the first items will be orderd in layout 5, the next comming items in layout 2, the next comming items in layout 6 etc... You can use also simple {9} then all item ordered in Layout 9 type.
						});
					// FANCY BOX (LIVE BOX) WITH MEDIA SUPPORT
					jQuery(".fancybox").fancybox({
						openEffect  : 'none',
						closeEffect : 'none',
						helpers : {
							media : {}
						}
					});
					// THE FILTER FUNCTION
					jQuery('.filter').click(function() {
						jQuery('.filter').each(function() { jQuery(this).removeClass("selected")});
						//api.megafilter(jQuery(this).data('category'));
                        jQuery(this).addClass("selected");

                        if (jQuery(this).data('category') == "cp-deal") {
                            jQuery('.payu-offertype').each(function () {
                                if (jQuery(this).data('category') == "0" && jQuery(this).data('category') != null) {
                                    jQuery(this).show();
                                } else {
                                    jQuery(this).hide();
                                }
                            });
                        };
                        if (jQuery(this).data('category') == "cp-coupons") {
                            jQuery('.payu-offertype').each(function () {
                                if (jQuery(this).data('category') == "1" && jQuery(this).data('category') != null) {
                                    jQuery(this).show();
                                } else {
                                    jQuery(this).hide();
                                }
                            });
                        };                        
                        if (jQuery(this).data('category') == "cp-all") {
                            jQuery('.payu-offertype').each(function () {
                                jQuery(this).show();
                            });
                        };
					});
				}); 


// PROFILE COMPLETION CHART
	$( document ).ready(function() {
        $('#profilechart').circliful();
    });

	
// Tooltip
$('.panel-tooltip').tooltip();

				

  
  // Newsticker
 	$('.newsticker').easyTicker({
	direction: 'down',
	easing: 'swing',
	speed: 'slow',
	interval: 4000,
	height: '380px',
	visible: 4,
	mousePause: 1,
	controls: {
		up: '.up',
		down: '.down',
		toggle: '.toggle',
		playText: 'Play',
		stopText: 'Stop'
	}
}); 

	
// Carousel 
$('.flexslider').flexslider({
      animation: 'slide',
	  controlNav: false,
	  smoothHeight: true,
	  prevText: "", 
	  nextText: "",
	  pauseOnHover: true
  });
 

 
 
// Overview - Counter
$('.overview').waypoint(function(direction) {
  $('.timer').countTo({
        speed: 8000,
    });
}, { offset: 250 });


// Index progress-bar
$('.team').waypoint(function() {
  $('.team .progress .progress-bar').progressbar({display_text: 'none'});
}, { offset: 0 });




// ANIMATE 
var wow = new WOW(
  {
    boxClass:     'wow',      
    animateClass: 'animated', 
    offset:       300       
  }
);
wow.init();


		
// COUNTDOWN

$('#expirydate').timeTo({
    timeTo: new Date(new Date('Tue Mar 11 2015 09:00:00 GMT+0100')),
    theme: "timeTo-custom",
    displayCaptions: true,
    fontSize: 18,
    captionSize: 8
});

$('#expirydate2').timeTo({
    timeTo: new Date(new Date('Tue April 25 2015 12:54:20 GMT+0100')),
    theme: "timeTo-custom",
    displayCaptions: true,
    fontSize: 18,
    captionSize: 8
});

$('#featuredcoupontimeto').timeTo({
    timeTo: new Date(new Date('Thu September 25 2015 09:00:00 GMT+0100')),
    theme: "custom",
    displayCaptions: true,
    fontSize: 18,
    captionSize: 8
});

$('#featuredcoupontimeto2').timeTo({
    timeTo: new Date(new Date('Thu December 24 2015 20:43:12 GMT+0100')),
    theme: "custom",
    displayCaptions: true,
    fontSize: 18,
    captionSize: 8
});

$('#featuredcoupontimeto3').timeTo({
    timeTo: new Date(new Date('Thu Jun 19 2015 12:20:50 GMT+0100')),
    theme: "custom",
    displayCaptions: true,
    fontSize: 18,
    captionSize: 8
});

$('#featuredcoupontimeto4').timeTo({
    timeTo: new Date(new Date('Tue Jun 24 2015 04:11:23 GMT+0100')),
    theme: "custom",
    displayCaptions: true,
    fontSize: 18,
    captionSize: 8
});

$('#featuredcoupontimeto5').timeTo({
    timeTo: new Date(new Date('Tue Jun 24 2015 04:11:23 GMT+0100')),
    theme: "custom",
    displayCaptions: true,
    fontSize: 18,
    captionSize: 8
});

$('#featuredcoupontimeto6').timeTo({
    timeTo: new Date(new Date('Tue Apr 12 2015 14:21:54 GMT+0100')),
    theme: "custom",
    displayCaptions: true,
    fontSize: 18,
    captionSize: 8
});

$('#featuredcoupontimeto7').timeTo({
    timeTo: new Date(new Date('Tue Sep 03 2015 21:44:31 GMT+0100')),
    theme: "custom",
    displayCaptions: true,
    fontSize: 18,
    captionSize: 8
});

$('#exclusivecoupontimeto1').timeTo({
    timeTo: new Date(new Date('Tue Sep 12 2015 21:44:31 GMT+0100')),
    theme: "custom",
    displayCaptions: true,
    fontSize: 18,
    captionSize: 8
});

$('#exclusivecoupontimeto2').timeTo({
    timeTo: new Date(new Date('Tue Nov 5 2015 14:12:55 GMT+0100')),
    theme: "custom",
    displayCaptions: true,
    fontSize: 18,
    captionSize: 8
});

$('#couponpagetimeto1').timeTo({
    timeTo: new Date(new Date('Tue Nov 5 2015 23:41:12 GMT+0100')),
    theme: "custom",
    displayCaptions: true,
    fontSize: 26,
    captionSize: 12
});

	
// Footer - ScrollTop	
$(function () {
	$(window).scroll(function() {
		if($(this).scrollTop() != 0) {
			$('#backtotop').fadeIn();	
		} else {
			$('#backtotop').fadeOut();
		}
	});
 
	$('#backtotop').click(function() {
		$('body,html').animate({scrollTop:0},800);
	});	
});	




