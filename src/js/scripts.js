jQuery(document).ready(function ($) {

  // Cache the Window object
  $window = $(window);
  $body = $('body');



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
    $('#sidr').find('a.navclose').click(function (e) {
        e.preventDefault();
        $.sidr('close');
    });
    $('#sidr').find('ul a').click(function (e) {
        e.preventDefault();

        var targetScroll = $(this).attr('href');
        var offset = parseInt($(this).attr('data-offset')) || -85;
        var documentBody = document.body ? document.body : document.documentElement;
        $(documentBody).stop().animate({scrollTop: $(targetScroll).offset().top + offset}, 250, 'easeInOutCubic');
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
            var name = form.find('[name=form-name]').val();
            var email = form.find('[name=form-email]').val();
            var message = form.find('[name=form-message]').val();
            var emailurl = form.attr('data-form-action');
            var confirmbox = $('.email-confirmation');
            var errorbox = $('.email-error');

            var confirmboxSuccess = $('#email-confirmation-success');
            var confirmboxError = $('#email-confirmation-error');

            $.ajax({
                url: emailurl,
                data: $(form).serialize(),
                type: 'POST'
            })
                .done(function (data) {
                    confirmboxSuccess.html(data);
                    errorbox.fadeOut(500);
                    confirmbox.fadeIn(500).delay(2500).fadeOut(500);
                    $('#contact-form input, #contact-form textarea').each(function () {
                        $(this).val('');
                    });
                })
                .fail(function (error) {
                    confirmboxError.html(error.responseText);
                    confirmbox.fadeOut(500);
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

        var device = $body.attr('data-device');
        var newWidth = $(window).width();
        var screenSize = "";
        var newDevice = "";
        var maxCols = 0;

        if (newWidth <= 480) {
            newDevice = "phone";
            maxCols = 2;
        }
        else if (newWidth > 480 && newWidth < 768) {
            newDevice = "tablet";
            maxCols = 2;
        }
        else if (newWidth >= 768 && newWidth < 980) {
            newDevice = "computer";
            maxCols = 4;
            screenSize = 'smallscreen';
        }
        else if (newWidth >= 980 && newWidth < 1200) {
            newDevice = "computer";
            maxCols = 6;
        }
        else if (newWidth >= 1200) {
            newDevice = "computer";
            maxCols = 6;
            screenSize = 'widescreen';
        }

        $body.removeClass('computer tablet phone smallscreen widescreen').addClass(newDevice).addClass(screenSize);
        $body.attr('data-device', newDevice);
        $body.attr('data-maxcols', maxCols);

    }

    // init Isotope
    var $container = $('.isotope').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
    })

    // bind filter button click
    $('#filters').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({filter: filterValue});
    });

    // change is-checked class on buttons
    $('.button-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });


});

