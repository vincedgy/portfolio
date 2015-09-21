jQuery(document).ready(function ($) {

    /* Parallax
     Inspired from Parallax Scrolling Tutorial - Smashing Magazine
     * Author: Richard Shepherd
     * 		   www.richardshepherd.com
     * 		   @richardshepherd
     */

    /* ---- */
    /* fader links */
    $('img.fader, .fader img')
        .css('opacity', .6)
        .on('mouseenter', function () {
            $(this).stop(true, true).fadeTo(800, 1);
        })
        .on('mouseleave', function () {
            $(this).stop(true, true).fadeTo(400, .6);
        });



    // Cache the Window object
    $window = $(window);

    // Cache the Y offset and the speed of each sprite
    $('.parallax').each(function () {

        $(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
        $(this).data('Xposition', $(this).attr('data-Xposition'));
        $(this).data('speed', $(this).attr('data-speed'));


        // Store some variables based on where we are
        var $self = $(this),
            offsetCoords = $self.offset(),
            topOffset = offsetCoords.top;


        // If this section is in view
        if (($window.scrollTop() + $window.height()) > (topOffset) &&
            ( (topOffset + $self.height()) > $window.scrollTop() )) {

            // Scroll the background at var speed
            // the yPos is a negative value because we're scrolling it UP!
            var yPos = -($window.scrollTop() / $self.data('speed'));

            // If this element has a Y offset then add it on
            if ($self.data('offsetY')) {
                yPos += $self.data('offsetY');
            }

            // Put together our final background position
            var coords = '50% ' + yPos + 'px';

            // Move the background
            $self.css({ backgroundPosition: coords });

        }
        ; // in view


        // When the window is scrolled...
        $(window).scroll(function () {
            // If this section is in view
            if (($window.scrollTop() + $window.height()) > (topOffset) &&
                ( (topOffset + $self.height()) > $window.scrollTop() )) {

                // Scroll the background at var speed
                // the yPos is a negative value because we're scrolling it UP!
                var yPos = ($window.scrollTop() / $self.data('speed')) + $self.data('offsetY');

                // If this element has a Y offset then add it on
                if ($self.data('offsetY')) {
                    yPos += $self.data('offsetY');
                }

                // Put together our final background position
                var coords = '50% ' + yPos + 'px';

                // Move the background
                $self.css({ backgroundPosition: coords });

            }
            ; // in view

        }); // window scroll

    });	// each .parallax item


    //delaying events on window resize
    var waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) {
                uniqueId = "Don't call this twice without a uniqueId";
            }
            if (timers[uniqueId]) {
                clearTimeout(timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
        };
    })();


    $(window).resize(function () {
        waitForFinalEvent(function () {
            o_conditional_scripts();
        }, 100, "conditionalscripts");
    });
    o_conditional_scripts();


    //sticky nav
    var stickyHeader = $('#home').height();
    if ($(window).scrollTop() > stickyHeader) {
        $('#header').addClass('scrolled');
    } else {
        $('#header').removeClass('scrolled');
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() > stickyHeader) {
            $('#header').addClass('scrolled');
        } else {
            $('#header').removeClass('scrolled');
        }
    });

    $('#navhighlight').delay(3000).fadeOut(800);

    //mobile nav
    $('#menutrigger')
        .sidr({side: 'left', speed: 500})
        .removeClass('hidden');
    $('#sidr a.navclose').click(function (e) {
        e.preventDefault();
        $.sidr('close');
    });
    $('#sidr ul a').click(function (e) {
        e.preventDefault();

        var targetScroll = $(this).attr('href');
        var offset = parseInt($(this).attr('data-offset')) || -85;
        var documentBody = document.body ? document.body : document.documentElement;
        $(documentBody).stop().animate({scrollTop: $(targetScroll).offset().top + offset}, 1000, 'easeInOutCubic');
        $.sidr('close');

    });

    //delaying events on window resize
    var waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) {
                uniqueId = "Don't call this twice without a uniqueId";
            }
            if (timers[uniqueId]) {
                clearTimeout(timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
        };
    })();

    // top of page (action)
    $('#scrolltop').click(function (e) {
        e.preventDefault();
        var documentBody = document.body ? document.body : document.documentElement;
        $(documentBody).animate({scrollTop: $('#top').offset().top}, 1000, 'easeInOutCubic');
    });

    // top of page (show link)
    $(window).scroll(function () {
        var scrollPosition = $(window).scrollTop();
        var position = 300;

        if (scrollPosition >= position) {
            $('#scrolltop').fadeIn();
        } else {
            $('#scrolltop').fadeOut();
        }
    });


    //responsive slider
    /* more info on this slider here : http://responsiveslides.com/ */

    if ($('.rslides').length !== 0) {
        $(".rslides").responsiveSlides({
                auto: false, // Boolean: Animate automatically, true or false
                speed: 800, // Integer: Speed of the transition, in milliseconds
                nav: false, // Boolean: Show navigation, true or false
                pager: true // Boolean: Show pager, true or false
            }
        );
    }


    // Isotope
    if ($('.o-items-container').length !== 0) {

        $.Isotope.prototype._getMasonryGutterColumns = function () {
            var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
            containerWidth = this.element.width();

            this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth ||
                    // or use the size of the first item
                this.$filteredAtoms.outerWidth(true) ||
                    // if there's no items, use size of container
                containerWidth;

            this.masonry.columnWidth += gutter;

            this.masonry.cols = Math.floor((containerWidth + gutter) / this.masonry.columnWidth);
            this.masonry.cols = Math.max(this.masonry.cols, 1);
        };

        $.Isotope.prototype._masonryReset = function () {
            // layout-specific props
            this.masonry = {};
            // FIXME shouldn't have to call this again
            this._getMasonryGutterColumns();
            var i = this.masonry.cols;
            this.masonry.colYs = [];
            while (i--) {
                this.masonry.colYs.push(0);
            }
        };

        $.Isotope.prototype._masonryResizeChanged = function () {
            var prevSegments = this.masonry.cols;
            // update cols/rows
            this._getMasonryGutterColumns();
            // return if updated cols/rows is not equal to previous
            return (this.masonry.cols !== prevSegments);
        };


        $(window).smartresize(function () {

            if ($('.isotope').length > 0) {
                var waitingTime = 1;
            } else {
                var waitingTime = 500;
            }

            waitForFinalEvent(function () {

                $('.o-items-container').each(function () {

                    var $container = $(this);
                    var $items = $container.find('.o-item');

                    $container.imagesLoaded(function () {

                        var nbCols = parseInt($container.attr('data-cols'));
                        var maxCols = parseInt($('body').attr('data-maxcols'));

                        if (nbCols > maxCols) {
                            nbCols = maxCols;
                        }

                        var gutterWidth = parseInt($container.attr('data-gutters')) || 0;

                        var columnWidth = ($container.width() - ((nbCols - 1) * gutterWidth)) / nbCols;

                        $items.each(function () {
                            var $this = $(this);
                            var cols = $this.data('cols') || 1;

                            if (cols > maxCols) {
                                cols = maxCols
                            }


                            boxWidth = (columnWidth * cols) - 1;

                            $this[ 'css' ]({ width: boxWidth, 'height': 'auto' }, { queue: false });
                            if ($container.hasClass('o-gallery')) {
                                $this[ 'css' ]({ 'margin-bottom': gutterWidth }, { queue: false });
                            }

                        });

                        $items.fadeIn();

                        if ($container.hasClass('format-grid')) {
                            $container.isotope({
                                itemSelector: '.o-item',
                                resizable: false,
                                layoutMode: 'fitRows',
                                masonry: {
                                    columnWidth: columnWidth
                                }
                            });
                        } else {
                            $container.isotope({
                                itemSelector: '.o-item',
                                resizable: false,
                                masonry: {
                                    columnWidth: columnWidth,
                                    gutterWidth: gutterWidth
                                }
                            });
                        }
                    });

                    var id = $(this).attr('id');
                    if ($('[data-target="' + id + '"]').length != 0) {

                        var startfilter = $('[data-target="' + id + '"]').find('.active a').attr('data-filter');
                        $('#' + id).isotope({ filter: startfilter });


                    }

                });

            }, waitingTime, "isotope");

        }).smartresize();

    }

    // filter items when filter link is clicked
    $('.o-filters a').click(function () {
        var targetcontainerID = $(this).parent().parent().attr('data-target');
        var $container = $(this).parent().parent();
        $container.find('li').removeClass('active');
        var selector = $(this).attr('data-filter');
        $('#' + targetcontainerID).isotope({ filter: selector });
        $(this).parent('li').addClass('active');
        return false;
    });

    //elastislides
    if ($('.o-carousel').length !== 0) {
        $('.o-carousel').each(function () {

            var displaycount = $('ul', this).data('count');
            var maxCols = parseInt($('body').attr('data-maxcols'));
            if (displaycount >= maxCols) {
                minItems = maxCols;
            } else {
                minItems = displaycount;
            }
            var margin = $('li', this).css('marginRight');
            margin = parseInt(margin.replace('px', ''));
            var carousel = $(this).find('.es-carousel');
            carousel.elastislide({
                minItems: minItems,
                margin: margin
            });

        });

    }


    //Last tweet
    if ($('#twitterbox').length != 0) {
        var $box = $('#twitterbox');
        var count = $box.attr('data-count');
        var username = $box.attr('data-user');
        $box.jtwt({
            count: count,
            username: username
        });
    }


    $('#contact-form').on('submit', function (event) {

        event.preventDefault();
        var sendemail = 1;

        $(this).find('input.mandatory,textarea.mandatory').each(function () {
            var fieldvalue = trim($(this).val());
            var errorfield = $(this).next('.error-message');

            if (fieldvalue == '') {
                $(this).addClass('error');
                errorfield.show();
                sendemail = 0;
            } else {
                if ($(this).attr('name') == 'form-email') {
                    var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                    if (!email_regex.test(fieldvalue)) {
                        $(this).addClass('error');
                        errorfield.show();
                        sendemail = 0;
                    } else {
                        $(this).removeClass('error');
                        errorfield.hide();
                    }
                } else {
                    $(this).removeClass('error');
                    errorfield.hide();
                }
            }

        });

        if (sendemail != 0) {
            var form = $(this);
            var name = $(this).find('[name=form-name]').val();
            var email = $(this).find('[name=form-email]').val();
            var message = $(this).find('[name=form-message]').val();
            var emailurl = $(this).attr('data-form-action');
            var confirmbox = $(this).find('.email-confirmation');
            var errorbox = $(this).find('.email-error');

            $.ajax({
                url: emailurl,
                data: $(form).serialize(),
                type: 'POST'
            })
                .done(function () {
                    confirmbox.fadeIn(500).delay(2500).fadeOut(500);
                    $('#contact-form input, #contact-form textarea').each(function () {
                        $(this).val('');
                    });
                })
                .fail(function () {
                    errorbox.fadeIn(500).delay(5000).fadeOut(500);
                });
        }

    });


    /******** FUNCTIONS ********/

    // trim function for fields parsing
    function trim(myString) {
        return myString.replace(/^\s+/g, '').replace(/\s+$/g, '')
    }


    // Conditional Scripts loading
    function o_conditional_scripts() {

        var device = $('body').attr('data-device');
        var newWidth = $(window).width();
        var screenSize = '';

        if (newWidth <= 480) {
            var newDevice = "phone";
            var maxCols = 2;
        }
        else if (newWidth > 480 && newWidth < 768) {
            var newDevice = "tablet";
            var maxCols = 2;
        }
        else if (newWidth >= 768 && newWidth < 980) {
            var newDevice = "computer";
            var maxCols = 4;
            var screenSize = 'smallscreen';
        }
        else if (newWidth >= 980 && newWidth < 1200) {
            var newDevice = "computer";
            var maxCols = 6;
        }
        else if (newWidth >= 1200) {
            var newDevice = "computer";
            var maxCols = 6;
            var screenSize = 'widescreen';
        }

        $('body').removeClass('computer tablet phone smallscreen widescreen').addClass(newDevice).addClass(screenSize);
        $('body').attr('data-device', newDevice);
        $('body').attr('data-maxcols', maxCols);

        if ($('.hoveractions').length > 0) {
            $('.hoveractions').o_hoveractions();
        }
        if ($('.rslides').length !== 0) {
            $(".rslides").each(function () {
                $(this).find("li").o_equal_height();
            });
        }

        // adding dropdown to main navigation
        //$('.nav').o_dd_nav();


        //change from device

        if (device != newDevice) {

            //scripts for computer only
            if (newDevice == 'computer') {

                if ($('.lightbox').length > 0) {

                    $('.lightbox').unbind("click").prettyPhoto(
                        {
                            animation_speed: 'fast', /* fast/slow/normal */
                            slideshow: 5000, /* false OR interval time in ms */
                            autoplay_slideshow: false, /* true/false */
                            opacity: 0.80, /* Value between 0 and 1 */
                            show_title: true, /* true/false */
                            theme: 'facebook', /* pp_default / light_rounded / dark_rounded / light_square / dark_square / facebook */
                            overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
                            social_tools: '<div class="pp_social"><div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="http://www.facebook.com/plugins/like.php?locale=en_US&href=' + location.href + '&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div></div>' /* html code or false to disable */
                        }
                    );
                    //see http://www.no-margin-for-errors.com/projects/prettyphoto-jquery-lightbox-clone/documentation/ for more possible configs

                }

                //scripts for mobile only
            } else {

                if ($('.lightbox').length > 0) {

                    $('.lightbox').unbind("click").photoSwipe();

                }

            }

        }


    }


});


/******* OCHOLABS PLUGINS ********/

    // Give same height to a group of elements
(function ($) {

    $.fn.o_equal_height = function (options) {

        options = $.extend({
            add: 0,
            remove: 0
        }, options);

        var maxHeight = 0;

        this.each(function () {

            $(this).height('auto');
            var elementHeight = $(this).height();
            if (elementHeight > maxHeight) {
                maxHeight = elementHeight;
            }

        });

        $(this).height(maxHeight);
    }

})(jQuery);


// Hover Effect
(function ($) {

    $.fn.o_hoveractions = function () {

        return this.each(function () {


            //adding the overlay + action links
            if (!$(this).hasClass('overlay-done')) {

                var group = $(this).data('group');
                var zoomimg = $(this).data('zoomimg');
                var zoomvideo = $(this).data('zoomvideo')
                var zoomtitle = $(this).data('zoomtitle');
                var zoomi18n = $(this).data('zoomi18n');
                var readmorelink = $(this).data('readmorelink');
                var readmorei18n = $(this).data('readmorei18n');

                if (zoomimg || readmorelink) {

                    var overlay = '<div class="overlay" style=""><div class="actions">';

                    if (zoomimg) {
                        overlay += '<a href="' + zoomimg + '" class="lightbox" data-fancybox-title="' + zoomtitle + '" rel="prettyPhoto[' + group + ']"><span class="glyphicons zoom_in" title="' + zoomi18n + '"><i></i></span></a>';
                    }

                    if (zoomvideo) {
                        overlay += '<a href="' + zoomvideo + '" class="lightbox iframe" data-fancybox-title="' + zoomtitle + '" rel="prettyPhoto[' + group + ']"><span class="glyphicons play" title="' + zoomi18n + '"><i></i></span></a>';
                    }

                    if (readmorelink) {
                        overlay += '<a href="' + readmorelink + '" title="' + readmorei18n + '"><span class="glyphicons link"><i></i></span></a>';
                    }

                    overlay += '</div></div>';

                    $(this).append(overlay).find('.overlay').css('opacity', 0);
                    $(this).find('.actions').hide();
                    $(this).addClass('overlay-done');

                }

            }

            if (zoomimg || readmorelink || zoomvideo) {

                $(this).hover(
                    function () {
                        $('.actions', this).show();
                        $('.overlay, .actions', this).height($('img', this).height()).width($('img', this).width());
                        $('.overlay', this).css('opacity', 0).stop().animate({'opacity': 1}, 400, 'easeInOutCubic');
                    },
                    function () {
                        $('.overlay', this).stop().animate({'opacity': 0}, 200, 'easeInOutCubic');
                        $('.actions', this).hide();
                    }
                );

            }


        });

    }

})(jQuery);