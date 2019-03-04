$(document).ready(function() {
    function checkWidth() {
        if (windowsizecheck !== $window.width()) {
            var windowsize = $window.width();
            var windowheight = $window.height();

            if (windowsize <= 1010) {
                $('#navigation ul').hide();
            } else if (windowsize > 1010) {
                $('#navigation ul').show();
            }
        } else {
            return false;
        }

        windowsizecheck = $window.width();
        windowheightcheck = $window.height();
    }

    var $window = $(window);
    var windowsize, windowheight, windowsizecheck, windowheightcheck;

    checkWidth();
    $(window).resize(checkWidth);

    $('.background_image').each(function(){
        var image_src = $(this).attr('src');
        $(this).parent().css({'background-image':'url(' + image_src + ') ', 'background-repeat':'no-repeat', 'background-position':'50% 50%', '-webkit-background-size':'cover', '-moz-background-size':'cover', '-o-background-size':'cover', 'background-size':'cover'});
        $(this).hide();
    });

    $('#menu').click(function(){
        $('#navigation ul').slideToggle();
    });

    $('#logo').on('click touchend', function(e) {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);

        var windowsize = $window.width();
        var windowheight = $window.height();

        if (windowsize <= 1010) {
            $('nav ul').slideUp();
        }
    });

    url = window.location.href;
    url = url.split('#');
    url = url[1];

    if (url != undefined) {
        $('nav > ul > li > a').removeClass('selected');
        $('#'+url).addClass('selected');

        var link_id = url;
            link_id = link_id.replace('-nav', '');

        var link_id = $('#'+link_id).offset().top;
            link_id = link_id - 80;

        var windowsize = $window.width();
        var windowheight = $window.height();

        if (windowsize <= 1010) {
            link_id = link_id + 100;
        }

        $('html, body').animate({
            scrollTop: link_id
        }, 1000);

        if (windowsize <= 1010) {
            $('nav ul').slideUp();
        }
    }

    $('nav > ul > li > a').on('click touchend', function(e) {
        $('nav > ul > li > a').removeClass('selected');
        $(this).addClass('selected');

        var link_id = $(this).attr('id');
            link_id = link_id.replace('-nav', '');

        var link_id = $('#'+link_id).offset().top;
            link_id = link_id - 100;

        var windowsize = $window.width();
        var windowheight = $window.height();

        if (windowsize <= 1010) {
            link_id = link_id + 100;
        }

        $('html, body').animate({
            scrollTop: link_id
        }, 1000);

        if (windowsize <= 1010) {
            $('nav ul').slideUp();
        }
    });

    var $window = $(window);

    $window.scroll(function() {
                $('nav > ul > li > a').removeClass('selected');
        scroll_top = $(window).scrollTop();
        scroll_top = scroll_top + 80;

        var nav_counter = $('nav > ul > li').length;
            nav_counter = nav_counter-1;

        for (var i=0; i<=nav_counter; i++) {
            nav_check = $('nav > ul > li:eq('+i+') > a').attr('id');

            if(nav_check != undefined){
                nav_check = nav_check.replace('-nav','');

                div_top = $('#'+nav_check).offset().top;
                bottom = $('#'+nav_check).offset().top + $('#'+nav_check).height();

                if ( scroll_top >= div_top && scroll_top <= bottom ) {
                    $('nav > ul > li > a').removeClass('selected');
                    $('nav > ul > li:eq('+i+') > a').addClass('selected');
                }
            }
        }
    });

            // When the window has finished loading create our google map below
            google.maps.event.addDomListener(window, 'load', init);

            function init() {
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                var mapOptions = {
                    scrollwheel: false,
                    // How zoomed in you want the map to start at (always required)
                    zoom: 11,
                    disableDefaultUI: true,

                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng('51.52036', '-0.07319200000006276'),

                    // How you would like to style the map.
                    // This is where you would paste any style found on Snazzy Maps.
                    styles: [
                        {
                            "featureType": "administrative",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#444444"
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "color": "#f2f2f2"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": 45
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "simplified"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "color": "#2e4b9f"
                                },
                                {
                                    "visibility": "on"
                                }
                            ]
                        }
                    ]
                };

                // Get the HTML DOM element that will contain your map
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('googlemap');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);

            }
  $(".question").on("click", function(){
    console.log("clicked");
    $question = $(this);
    console.log($question);
    $answer = $question.next().find('td > p');
    $Height = $answer.height();
    if ($Height == 0){
      $(".answer").find('td > p').animate({height: '0', margin: "0px"}, 300)
      $answer.css({height: 'auto'})
      $autoHeight = $answer.height();
      $answer.height('0').animate({height: $autoHeight, margin: "20px"}, 300);
    } else {
      $(".answer").find('td > p').animate({height: '0', margin: "0px"}, 300)
    }
  })
});
