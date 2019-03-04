$(document).ready(function() {
    function checkWidth() {
        if (windowsizecheck !== $window.width()) {
            var windowsize = $window.width();
            var windowheight = $window.height();

            $('#listwrap').children('.list_item_wrapper').children('.list_item_wrapper_content').children('.list_item').unwrap('.list_item_wrapper_content');
            $('#listwrap').children('.list_item_wrapper').children('.list_item').unwrap('.list_item_wrapper');

            if (window.matchMedia('(min-width: 901px)').matches) {
                $('body > ul:eq(0) > .scroller > li').appendTo($('body > ul:eq(0)'));
                $('body > ul:eq(0)').insertAfter('#logo');

                $('footer > .container > .content .contact').appendTo($('footer > .container > .content'));
            } else if (window.matchMedia('(max-width: 900px)').matches) {
                $('nav > ul').prependTo('body');

                $('body > ul:eq(0) > li').appendTo($('body > ul:eq(0) > .scroller'));

                $('footer > .container > .content .contact').prependTo($('footer > .container > .content'));
            }

            if (window.matchMedia('(min-width: 769px)').matches) {
                $('footer .launchx_logo').parents('.third').appendTo($('footer > .content > .container'));
                $('footer > .content > .container > .footer_nav_list').prependTo($('footer > .content > .container'));
            } else if (window.matchMedia('(max-width: 768px)').matches) {
                $('footer .launchx_logo').parents('.third').prependTo($('footer > .content > .container'));
                $('footer > .content > .container > .footer_nav_list').appendTo($('footer > .content > .container'));
            }


            if (window.matchMedia('(min-width: 600px)').matches) {
                var $set1 = $('.list_item');

                for(var i=0, len = $set1.length; i < len; i+=2){
                    $set1.slice(i, i+2).wrapAll('<div class="list_item_wrapper container"/>');
                    $set1.slice(i, i+2).wrapAll('<div class="list_item_wrapper_content content"/>');
                }
            } else if (window.matchMedia('(max-width: 600px)').matches) {
                var $set1 = $('.list_item');

                for(var i=0, len = $set1.length; i < len; i+=1){
                    $set1.slice(i, i+1).wrapAll('<div class="list_item_wrapper container"/>');
                    $set1.slice(i, i+1).wrapAll('<div class="list_item_wrapper_content content"/>');
                }
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

    'use strict';

    var Trail = function(options) {
      this.size        = options.size || 10;
      this.trailLength = options.trailLength || 20;
      this.interval    = options.interval || 15;

      this.boxes = [];
      this.mouse = {
        x : window.innerWidth/2,
        y : window.innerHeight/2
      };

      size = 2;

      this.init = function() {
        for (var i = 0; i < this.trailLength; i++) {
          this.boxes[i]              = document.createElement('div');
          this.boxes[i].className    = 'box box'+i;
          this.boxes[i].style.width  = size + 'px';
          this.boxes[i].style.height = size + 'px';
          size = size + 2;
          document.body.appendChild(this.boxes[i]);
        }

        var self = this;

        document.onmousemove = function() {
          event = event || window.event;
          self.mouse.x = event.pageX;
          self.mouse.y = event.pageY;
        };

        //Periodically update mouse tracing and boxes
        setInterval(function(){
          self.updateBoxes();
        }, this.interval);
      }

      //Update box positions and stylings
      this.updateBoxes = function() {
        for (var i = 0; i < this.boxes.length; i++) {
          x=i+1;
          if (i+1 === this.boxes.length) {
            $('.box'+i).css({'top': this.mouse.y - this.size/2 + 'px', 'left': this.mouse.x - this.size/2 + 'px'});

            //this.boxes[i].style.top             = this.mouse.y - this.size/2 + 'px';
            //this.boxes[i].style.left            = this.mouse.x - this.size/2 + 'px';
          } else {
            $('.box'+i).css({'top': $('.box'+x).css('top'), 'left': $('.box'+x).css('left')});
           
            //this.boxes[i].style.top             = this.boxes[i+1].style.top;
            //this.boxes[i].style.left            = this.boxes[i+1].style.left;
            //this.boxes[i].style.backgroundColor = this.boxes[i+1].style.backgroundColor;
          }
        }
      }
    }

    var options = {
      trailLength: 10,
      size: 20,
      interval: 50
    };
    var trail = new Trail(options);
    trail.init();

    $('.box').appendTo($('.heading'));//.css({'opacity':0.4});

    var timeout = null;

    $(document).on('mousemove', function() {
        $('.box').fadeIn(300);//css({'opacity':0.4});
        clearTimeout(timeout);

        timeout = setTimeout(function() {
            $('.box').fadeOut(300);//.css({'opacity':0});
        }, 300);
    });    

    $('#menu').click(function(){
        $(this).toggleClass('click');

        $('body > ul').fadeToggle(600);
    });

    $('#stories .stories_holder .item').hover(function(){
        $(this).siblings('.item').removeClass('selected');
        $(this).addClass('selected');
    }, function() {
        $(this).removeClass('selected');
        $(this).parents('.stories_holder').children('.item:eq(1)').addClass('selected');
    });

    if ($(document).scrollTop() > 100) {
        $('#nav_holder').addClass('scroll');
    } else if ($(document).scrollTop() < 101) {
        $('#nav_holder').removeClass('scroll');
    }

    $(window).scroll(function() {
        if ($(document).scrollTop() > 100) {
            $('#nav_holder').addClass('scroll');
        } else if ($(document).scrollTop() < 101) {
            $('#nav_holder').removeClass('scroll');
        }
    });

    $('.video .button').on('click', function(ev) {
        $('.video iframe')[0].src += '&autoplay=1';

        setTimeout(function(){
            $('.video iframe').addClass('show');
            $('.video .content').addClass('hide');
        },600);

        ev.preventDefault();
    });

    $.fn.exists = function(callback) {
      var args = [].slice.call(arguments, 1);

      if (this.length) {
        callback.call(this, args);
      }

      return this;
    };

    $('.star').exists(function() {
        rating_val = $(this).siblings('.rating').text();
        rating_val = rating_val.split('.');

        class_color = $(this).children('.overlay').attr('class');
        class_color = class_color.split('overlay ');

        if (rating_val[1].length) {
            $('<div class="star"><div class="overlay '+class_color[1]+'"></div><div class="overlay '+class_color[1]+'"></div></div>').insertAfter($(this));
            $('.star:last > .overlay').css({'left':rating_val[1]+'0%'});
        }

        for (var i = 1; i < rating_val[0]; i++) {
            $('<div class="star"><div class="overlay '+class_color[1]+'"></div></div>').insertAfter($(this));
        }
    });

    $('.success').exists(function() {
        var form_top = $(this).offset().top;
            form_top = form_top - 200;

        $('html, body').animate({
            scrollTop: form_top
        }, 1000);
    });

    $('body').css({'opacity':1});
    $('#nav_holder').css({'top':0});
    $('#container > .container:eq(0)').addClass('container_one');
    $('.navigation > li:last > a').addClass('button orange orange_glow_animate last');
    $('.navigation > .scroller > li:last > a').addClass('button orange orange_glow_animate last');

    $('.content img').each(function(){
        $(this).parent('p').parent('.inner_holder').parent('.content').parent('.container').removeClass('no_image');
    });

    if ($('.fade:eq(0)').hasClass('container_one')) {
        $('.fade:eq(0)').css({'visibility':'visible', 'opacity':'1'});
    }

    url = window.location.pathname;

    if (url != '/' && url != '/index.php') {
        $('#nav_holder').addClass('on');

        $('#stat1').addClass('small');
        $('#stat2').addClass('small');
    }

    $('p > img').each(function(){
        $(this).parent('p').addClass('p_img');
        $(this).parent('p').append('<b></b>');
        $('<div class="line_break"></div>').insertBefore($(this).parent('p'));
        
        var image_src = $(this).attr('src');
        $(this).siblings('b').css({'background-image':'url(' + image_src + ')', 'background-repeat':'no-repeat', 'background-position':'50% 50%', '-webkit-background-size':'cover', '-moz-background-size':'cover', '-o-background-size':'cover', 'background-size':'cover'});
        $(this).hide();
    });

    $('p > em > img').each(function(){
        $(this).parent('em').parent('p').addClass('p_img');
        $(this).parent('em').parent('p').append('<b></b>');
        $('<div class="line_break"></div>').insertBefore($(this).parent('em').parent('p'));
        
        var image_src = $(this).attr('src');
        $(this).parent('em').siblings('b').css({'background-image':'url(' + image_src + ')', 'background-repeat':'no-repeat', 'background-position':'50% 50%', '-webkit-background-size':'cover', '-moz-background-size':'cover', '-o-background-size':'cover', 'background-size':'cover'});
        $(this).hide();
    });

    if ($(document).scrollTop() > 50) {
        $('.fade').delay(1000).css({'visibility':'visible', 'opacity':'1', 'transition':'opacity 1s ease-in', '-moz-transition':'opacity 1s ease-in', '-webkit-transition': 'opacity 1s ease-in'});
        $('.fade .p_img > b').addClass('open');
        $('.fade .youtube-embed-wrapper > iframe').addClass('open');
    }

    $('.video').prev('.divider').remove();
    $('#testimonials').prev('.divider').remove();
    $('.faqs').prev('.divider').remove();
    $('.gallery').prev('.divider').remove();
    $('.gallery').next('.divider').remove();
    
    if( $('.divider:last').is( ':last-child' ) ) {
        $('.divider:last').remove();
    }

    var window_height = $(window).height() / 4; //gets height 
    var window_height = window_height * 3; 

    scroll_count=0;

    var stats_i = 0;
    var pitch_competition_i = 0;

    $('#stats').exists(function() {
        var stats = $("#stats").offset().top; //gets offset
    });

    var stats = stats - window_height; //gets height 

    $('#pitch_competition').exists(function() {
        var pitch_competition = $("#pitch_competition").offset().top; //gets offset
    });
    
    var pitch_competition = pitch_competition - window_height; //gets height 

    $(window).scroll(function(){
        window_bottom = $(window).scrollTop();
        window_bottom = window_bottom + window_height;

        x = $('.fade').length;

        if ($('.fade:eq(' + scroll_count + ')').length > 0) {
            this_position = $('.fade:eq(' + scroll_count + ')').position();
            this_position = this_position.top;

            if (this_position <= window_bottom) {
                $('.fade:eq(' + scroll_count + ')').delay(1000).css({'visibility':'visible', 'opacity':'1', 'transition':'opacity 1s ease-in', '-moz-transition':'opacity 1s ease-in', '-webkit-transition': 'opacity 1s ease-in'});

                if($('.fade:eq(' + scroll_count + ')').attr('id') == 'stats'){
                    $('.stat').addClass('stat_start');

                    $('.stat:eq(0) span b i').prop('Counter',$('.stat:eq(0) span b u').text()).animate({
                        Counter: $('.stat:eq(0) span b i').text()
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $('.stat:eq(0) span b i').text(Math.ceil(now));
                        }
                    });

                    $('.stat:eq(1) span b i').prop('Counter',$('.stat:eq(0) span b u').text()).animate({
                        Counter: $('.stat:eq(1) span b i').text()
                    }, {
                        duration: 3000,
                        easing: 'swing',
                        step: function (now) {
                            $('.stat:eq(1) span b i').text(Math.ceil(now));
                        }
                    });
                }

                if($('.fade:eq(' + scroll_count + ')').attr('id') == 'pitch_competition'){
                    $('.stat_three').addClass('stat_three_start');

                    $('.stat_three:eq(0) span i').prop('Counter',$('.stat_three:eq(0) span u').text()).animate({
                        Counter: $('.stat_three:eq(0) span i').text()
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $('.stat_three:eq(0) span i').text(Math.ceil(now));
                        }
                    });
                    
                    $('.stat_three:eq(1) span i').prop('Counter',$('.stat_three:eq(1) span u').text()).animate({
                        Counter: $('.stat_three:eq(1) span i').text()
                    }, {
                        duration: 3000,
                        easing: 'swing',
                        step: function (now) {
                            $('.stat_three:eq(1) span i').text(Math.ceil(now));
                        }
                    });
                    
                    $('.stat_three:eq(2) span i').prop('Counter',$('.stat_three:eq(2) span u').text()).animate({
                        Counter: $('.stat_three:eq(2) span i').text()
                    }, {
                        duration: 4500,
                        easing: 'swing',
                        step: function (now) {
                            $('.stat_three:eq(2) span i').text(Math.ceil(now));
                        }
                    });

                    /*$('.stat_three').addClass('stat_three_start');

                    $('.stat_three:eq(0) span i').prop('Counter',$('.stat_three:eq(0) span u').text()).animate({
                        Counter: $('.stat_three:eq(0) span i').text()
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $('.stat_three:eq(0) span i').text(Math.ceil(now));
                        }
                    });
                    
                    $('.stat_three:eq(1) span i').prop('Counter',$('.stat_three:eq(1) span u').text()).animate({
                        Counter: $('.stat_three:eq(1) span i').text()
                    }, {
                        duration: 3000,
                        easing: 'swing',
                        step: function (now) {
                            $('.stat_three:eq(1) span i').text(Math.ceil(now));
                        }
                    });
                    
                    $('.stat_three:eq(2) span i').prop('Counter',$('.stat_three:eq(2) span u').text()).animate({
                        Counter: $('.stat_three:eq(2) span i').text()
                    }, {
                        duration: 4500,
                        easing: 'swing',
                        step: function (now) {
                            $('.stat_three:eq(2) span i').text(Math.ceil(now));
                        }
                    });*/
                }

                if($('.fade:eq(' + scroll_count + ')').find('.p_img').length > 0){
                    $('.fade:eq(' + scroll_count + ') .p_img > b').addClass('open');
                }

                if($('.fade:eq(' + scroll_count + ')').find('.youtube-embed-wrapper').length > 0){
                    $('.fade:eq(' + scroll_count + ') .youtube-embed-wrapper > iframe').addClass('open');
                }

                scroll_count++;
            }
        }
    });

    $('.stories_buttons a').click(function(){
        id = $(this).attr('id');

        $('.stories_buttons a').removeClass('selected');
        $(this).addClass('selected');

        $('.'+id).addClass('selected_holder').removeClass('stories_holder_after');
        $('.'+id).prevAll().removeClass('selected_holder').addClass('stories_holder_after');
        $('.'+id).nextAll().removeClass('selected_holder').removeClass('stories_holder_after');
    });
    
    $('.number_button').siblings('.holder').children('#image_1').addClass('show');

    $('.number_button > li').click(function(){
        image_id = $(this).attr('id');
        image_id = image_id.split('imageid');
        image_id = image_id[1];

        $('.number_button > li').removeClass('selected');
        $(this).addClass('selected');

        $('.number_button').siblings('.holder').children('.image').removeClass('show');
        $('.number_button').siblings('.holder').children('#image_'+image_id).addClass('show');
    });

    testimonials_height = $('.first').height();
    
    setTimeout(function(){
        $('#testimonials > .container').css({'height': testimonials_height+'px'});
    },600);

    if ($('#testimonials > .container > .testimonial').length > 1) {
        function testimonial() {
            $('#testimonials > .container > .first').addClass('left').removeClass('first').next().addClass('first').removeClass('right');

            testimonials_height = $('.first').height();
            $('#testimonials > .container').css({'height': testimonials_height+'px'});
            
            setTimeout(function(){
                $('#testimonials > .container > .left').appendTo($('#testimonials > .container')).addClass('right').removeClass('left');
            },600);
        }

        var testimonihkhkhkjhals = setInterval(testimonial,6000);
    }

    $('.answer').hide();

    $('.question').click(function(){
        $(this).toggleClass('selected');
        $(this).siblings('.answer').toggleClass('open').slideToggle(600);
        $('.answer').not($(this).siblings('.answer')).removeClass('open');
        $('.answer').not($(this).siblings('.answer')).delay(600).slideUp(600);
        $('.question').not($(this)).removeClass('selected');

    });

    $('.list_item').click(function(){
        $('.list_item > .overlay').removeClass('selected');
        $(this).children('.overlay').addClass('selected');
        list_info = $(this).attr('id');
        list_info = list_info.replace('list_item','');

        i_offset = $(this).width() / 2;
        i_offset = i_offset + $(this).offset().left;

        $('#list_info'+list_info+' > .fa-caret-up').css({'left':i_offset+'px'});
        $('#list_info'+list_info).appendTo($(this).parents('.list_item_wrapper_content').parents('.list_item_wrapper'));
        $('#list_info'+list_info).slideDown();
        $('.list_info').not($('#list_info'+list_info)).slideUp();
    });
});







