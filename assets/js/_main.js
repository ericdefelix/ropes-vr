
var CAROUSEL = {
    count: 1,
    counter: {} ,
    $elem: $('.js_bg'),
    max: 4, // Change this value according to number of images
    counterIncrement: 1,

    change_image: function() {
        var bg = 'bg-';

        if ( CAROUSEL.count < CAROUSEL.max ) {
            CAROUSEL.count = CAROUSEL.count + CAROUSEL.counterIncrement;
            CAROUSEL.$elem.addClass(bg + CAROUSEL.count);
            CAROUSEL.$elem.removeClass(bg + (CAROUSEL.count - 1) );
        }
        else {
            CAROUSEL.count = 1;
            CAROUSEL.$elem.addClass(bg + 1);
            CAROUSEL.$elem.removeClass(bg + CAROUSEL.max);
        }
    },

    play: function(){
        counter = setInterval(this.change_image, 6000);
    },

    pause: function(){
        clearInterval(counter);

        for (var i = CAROUSEL.max ; i >= 0; i--) {
            CAROUSEL.$elem.removeClass('bg-'+i);
        };

        CAROUSEL.$elem.addClass('bg-1');
    }
}

var build_navigation = function() {
    var _init = 'welcome_screen',
        _cur = '',
        _prev = _cur,
        _history = [_init],
        generic_info = '',

        $trigger = $('*[data-target-screen]'),
        $prev = $('*[data-target-prev]'),
        $uno = $('#messageUno'),
        $global_ui = $('#header, #footer'),
        $validate = $('*[data-validate-form]'),
        $lastname = $('#validateLastName'),
        $back = $('*[data-back-to-form]'),
        // $home = $('*[data-home]'),
        $img_uno = $('#unoImage'),
        $startagain = $('#backToStart'),

        ropes_is_valid = false,
        has_application = false,
        error_counter = 0,
        max_tries = 3,
        end_of_max_tries = max_tries + 1;

    // Set state for initial screen
    function set_init() {
        $global_ui.hide(); // Hide header and footer
        $('.btn-back,.btn-home').hide() // Initially hide the controls
        $('*[data-section="'+ _init +'"]').siblings('*[data-section]').hide(); // Hide other sections
        $('*[data-section="welcome_screen"]').velocity(
        {
            translateX: 0, 
            opacity: 1 
        }, 
        'easeInOutQuint', 
        1000,
        function(){
            $('body').removeClass('restarting');
        });
        $('.error').hide();
    }

    function display_global_ui() {
        $global_ui.show(); // Show header and footer

        $('*[data-section="welcome_screen"]')
        .velocity( {  translateX: ['-110%', 0], opacity: [ 0, 1] }, [1,.06,.51,.66], 700, function(){ 
            $('#sectionContainer').removeClass('m_zindex');
            CAROUSEL.pause();
        })
        .velocity( { opacity: 0 },{ display: 'none',duration: 0 });
        set_screen_elements();

        IDLE.play(); // start the idle timer
    }

    function set_screen_elements(){
        var $msg = $('*[data-section="' + _cur + '"] .message');
        // Hide the back and home button if not needed
        // if(_history.length == 3 && _prev == 'initial_options') 
        if(_history.length == 3) show_nav();
        if(_history.length == 2) hide_nav();

        switch(_cur){

            case 'initial_options':
                $uno.html('Nice to meet you! My name is <strong>UNO</strong>.');
                $img_uno.attr('data-uno-image', 'welcoming-pose');

                $('*[data-section="'+ _prev +'"]').velocity('reverse', function(){
                    $('*[data-section="'+ _prev +'"]').hide();
                });

                _history.splice(2, _history.length - 2);
                hide_nav();

                break;

            case 'im_here_to_apply':
                $uno.html('Guess what? You can learn more about [24]7 offerings by going to http://www.ropeswebsite.com');
                $img_uno.attr('data-uno-image', 'making-statement');
                break;

            case 'ropes_question':
                $uno.html('ROPES is our Recruitment Online Profiling Evaluation System');
                $img_uno.attr('data-uno-image', 'ropes-placard');
                break;

            case 'ropes_details':
                $uno.html('Your ROPES credentials are your ROPES ID, Username and the email you used when you registered.');
                $img_uno.attr('data-uno-image', 'ropes-placard');
                break;

            case 'ropes_id':
                $uno.html('Some tips for ROPES ID');
                $img_uno.attr('data-uno-image', 'ropes-placard');
                break;

            case 'ropes_username':
                $uno.html('Some tips for ROPES ID');
                $img_uno.attr('data-uno-image', 'ropes-placard');
                break;

            case 'ropes_email':
                $uno.html('Some tips for ROPES ID');
                $img_uno.attr('data-uno-image', 'ropes-placard');
                break;

            case 'ropes_lastname':
                $uno.html('Some tips for ROPES ID');
                $img_uno.attr('data-uno-image', 'ropes-placard');
                break;

            case 'ropes_try_again':
                $uno.html('Some tips for ROPES ID');
                $img_uno.attr('data-uno-image', 'ropes-placard');
                break;

            case 'non_applicant':
                $uno.html('Some tips for ROPES ID');
                $img_uno.attr('data-uno-image', 'making-statement');
                break;

            case 'generic_info':
                switch(generic_info){
                    case 'ropes_not_registered':
                        $msg.html('Alright then. Head on over to our registration kiosk so you can start filling out the application form.');
                        $img_uno.attr('data-uno-image', 'ropes-placard');
                        break;
                    case 'no_application':
                        $msg.html('It seeems that you haven&apos;t made any application yet?  Please go to the registration kiosk, login to ROPES and submit your application.');
                        $img_uno.attr('data-uno-image', 'ropes-placard');
                        break;
                    case 'has_application':
                        $msg.html('Fantastic! Why don&apos;t you head on up to the 6th floor.  One of our friendly recruiters will call on you shortly.');
                        $img_uno.attr('data-uno-image', 'making-statement');
                        break;
                    case 'might_apply':
                        $msg.html('Come on up to the 6th floor!');
                        $img_uno.attr('data-uno-image', 'making-statement');
                        break;
                    default:
                        $msg.html(' --- ');
                        console.log('No information available');
                        break;
                }

                break;

            case 'company_overview':
                $uno.html('Here at [24]7, ASL stands for Anticipate, Simplify, and Learn.');
                $img_uno.attr('data-uno-image', 'making-statement');
                break;

            case 'more_information':
                $uno.html('Some tips for ROPES ID');
                $img_uno.attr('data-uno-image', 'holding-mobile');
                break;

            case 'map':
                $uno.html('Tap on the map to view more details.');
                $img_uno.attr('data-uno-image', 'looking-up');
                break;

            case 'ropes_is_scheduled':
                $uno.html('Some tips for ROPES ID');
                $img_uno.attr('data-uno-image', 'welcoming-pose');
                break;

            case 'employee_options':
                $uno.html('Some tips for ROPES ID');
                $img_uno.attr('data-uno-image', 'making-statement');
                break;

            case 'goodbye_user':
                $uno.html('Thank you for letting me help you out!');
                $img_uno.attr('data-uno-image', 'thumbs-up');

                IDLE.countdown_goodbye();
                hide_nav();
                exit_greeting();

                break;

            default:
                // console.log('No information available');
                break;
        }
    }

    function reset_errors() {
        $('*[data-section="'+ _cur +'"] .error').hide();
        $('*[data-section="'+ _prev +'"] .error').hide();
        $('*[data-section="'+ _prev +'"] .error .error-message').html('Hmm... Your last name didn&apos;t match your current record');
    }

    function show_errors() {
        // $('*[data-section="'+ _cur +'"] .error').show();
        $('*[data-section="'+ _cur +'"] .error').velocity({
            translateY: ['-50%','-50%'],
            scaleX: [1,0.9],
            scaleY: [1,0.9],
        },
        {
            display: 'block',
            easing: 'spring',
            duration: 1000
        });
        KEYBOARD.hide();
    }
    
    // Set current screen
    $trigger.on('click', function() {

        // Apply no spam
        prevent_spam();

        _cur = $(this).data('target-screen'); // Set target to current screen
        _history.push(_cur); // Update history
        _prev = _history[_history.length - 2]; // Get target for previous screen

        // Show target screen
        $('*[data-section="'+ _history[_history.length - 1] +'"]').show();
        $('*[data-section="'+ _history[_history.length - 1] +'"] .animate')
            .velocity('transition.slideRightIn', { 
                stagger: 250, delay: 250, duration: 500, display: 'block'
            });
        
        // Hide splash screen and display the header/footer
        if(_cur === 'initial_options') {
            display_global_ui();

            // if (_prev == 'goodbye_user') { clearInterval(bye); console.log('hey'); };
        }
        else if (_cur === 'welcome_screen') {
            set_init();
            _history.splice(0, _history.length);
            _history.push(_cur);
        }
        else {
            $('*[data-section="'+ _prev +'"] .animate').velocity('reverse', 500, function(){ 
                set_screen_elements(); // Update elements
                $('*[data-section="'+ _prev +'"]').hide();
            });            
        }


        // If target is generic information, identify its specific target then update
        if (_cur === 'generic_info') generic_info = $(this).data('for');

        // Resets the view of the forms
        if ($(this).data('target-screen') == 'ropes_details') reset_errors();
        if ($(this).data('target-screen') == 'ropes_try_again') { 
            reset_errors();
            error_counter = 0;
        }

        console.log(_history);
        console.log('Cur screen is ' + _cur + ' | Prev screen is ' + _prev);
    });

    // Set previous screen
    $prev.on('click', function() {

        // Apply no spam
        prevent_spam();

        _cur = _history[_history.length - 2]; // Get target for previous screen
        _prev = _history[_history.length - 1]; // Get last screen shown
        
        if (_history.length > 2) {

            // Hide current screen
            $('*[data-section="'+ _prev +'"] .animate').velocity('reverse', function(){ 
                $('*[data-section="'+ _prev +'"]').hide();

                // Show previous screen
                $('*[data-section="'+ _cur +'"]').show();
                $('*[data-section="'+ _cur +'"] .animate')
                    .velocity('transition.slideRightIn', { 
                        stagger: 250, delay: 250, duration: 500
                    });
            });

            _history.pop(); // Update history by removing last item
            set_screen_elements(); // Update elements

            console.log(_history);
            console.log('Cur screen is ' + _cur + ' | Prev screen is ' + _prev);
        }
        else {
            return false;
        }
    });

    $validate.on('click', function() {
        var ropes_is_valid = confirm("Is ROPES Valid"); // Simulate form validation

        var form_screen = '*[data-section="'+_cur+'"] ';

        prevent_spam(); // Apply no spam
        
        if (ropes_is_valid) {
            console.log('ROPES Credential is Valid');
            $(form_screen).find('*[data-target-screen="ropes_lastname"]').click();
        }

        else {

            error_counter++;

            if (error_counter == 1) {
                show_errors();
                $uno.html('Don&apos;t panic. Just check your spacing or spelling to make sure that you&apos;re entering the right information.');
                $img_uno.attr('data-uno-image', 'looking-puzzled');
            }

            else if (error_counter == (max_tries - 1)) {
                show_errors();
                $('section:visible').find('.error-message').html('We still can&apos;t find your information.');
                $img_uno.attr('data-uno-image', 'looking-disappointed');
                console.log('One last try');
            }

            else if (error_counter == max_tries) {
                show_errors();
                $('section:visible').find('.error-message').html('I&apos;m sorry but your information is still not found');
                $img_uno.attr('data-uno-image', 'looking-puzzled');
                console.log('Change error message');
            }

            else if (error_counter == end_of_max_tries) {
                $(form_screen).find('*[data-target-screen="ropes_try_again"]').click();
            }
        }
    });

    $lastname.on('click', function() {
        var has_application = confirm("User has application?"); // Simulate form validation

        var form_screen = '*[data-section="'+_cur+'"] ';

        prevent_spam(); // Apply no spam

        if (has_application) {
            console.log('User has application');
            $(form_screen).find('*[data-for="has_application"]').click();
        }
        else {
            $(form_screen).find('*[data-for="no_application"]').click();
        }
    });

    // If error is present, goes back to the form
    $back.on('click', function(){
        reset_errors();
        prevent_spam(); // Apply no spam
    });

    // Go back to first screen, not the welcome screen
    $startagain.on('click', function() {
        hide_nav();
        IDLE.goodbye_reset();
    });
    
    set_init(); //Initialize
}

var MAP = {
    container: $('#mapContainer'),

    bind: function() {
        this.container.on('click', function(e) {

            var bd = '<div class="backdrop"></div>';

            // if (container) {};

            $(this).toggleClass('expand');
            $('*[data-section="map"] .check-us-out').toggleClass('hidden');

            if ($('.backdrop').length != 0) {
                $('.backdrop').velocity('transition.fadeOut',function(){ 
                    $('.backdrop').remove();
                    $('#mapContainer').velocity('reverse', 500);
                    $('.check-us-out').velocity('transition.fadeIn');
                    show_nav();
                });
            }
            else { 
                $('body').append(bd);
                $('.backdrop').velocity('transition.fadeIn')
                $('.check-us-out').velocity('transition.fadeOut',300,function(){
                    $('#mapContainer').velocity({
                        scaleX: [1,0.4],
                        scaleY: [1,0.4],
                    },
                    {
                        display: 'block',
                        easing: 'spring',
                        duration: 1000
                    });
                });
                hide_nav();
            }

            prevent_spam();

        });
    },

    map: function() {
        this.bind();
    }
}

// Prevent tap/click spamming
function prevent_spam() {
    $('body').addClass('no-tap');

    var tap_timer = setTimeout(function() {
        $('body').removeClass('no-tap');
        window.clearTimeout(tap_timer);
    }, 1000);
}

// If user is idle, go back to first screen
var IDLE = {
    idle_duration: 1200000, // 2 mins
    restart_duration: 20000, //20 secs
    bye_duration: 10000, // 10 secs
    idle: null,
    restart: null,
    bye: null,
    ticker: null,
    restart_counter: 0,

    bind: function() {
        $('body').on('click', function(e) {
            // if ($(e.target).data('target-screen') == 'welcome_screen') {
            //     return false;
            // }
            if ($(e.target).hasClass('js_bg')) {
                return false;
            }
            else if ($('#idleContainer').hasClass('in') || $(e.target).attr('id') == 'restartVR') {
                console.log('no, dont reset me');
                return false;
            }
            else if ($('body').hasClass('restarting')) {
                console.log('im going back dont do anything');
                return false;
            }
            else if($(e.target).attr('id') == 'remainActive'){
                IDLE.countdown_reset(); // Reset the Idle Timer
            }
            else {
                IDLE.countdown_reset(); // Reset the Idle Timer
            }
        });

        $('#remainActive').on('click', function(){
            IDLE.restart_reset();
            IDLE.hide_idle();
            console.log('remain active');
        });

        $('#restartVR').on('click', function(){
            IDLE.hide_idle();
            IDLE.restartVR();
        });
    },

    play: function() {
        idle = setTimeout(IDLE.countdown_idle, IDLE.idle_duration + 1);
        if ($('body').hasClass('pristine')) this.bind();
        $('body').removeClass('pristine')

        console.log('idle timer started for ' + IDLE.idle_duration + ' ms');
        // IDLE.tick(); // Just for testing the countdown
    },

    countdown_reset: function() {
        window.clearTimeout(idle);

        this.countdown_start();
        console.log('idle countdown reset');
    },

    restart_reset: function() {
        window.clearTimeout(idle);
        window.clearInterval(restart);
        // IDLE.goodbye_reset();
    
        this.countdown_start();
    },

    countdown_start: function() {
        idle = setTimeout(IDLE.countdown_idle, IDLE.idle_duration);
        console.log('starting again');

        // clearInterval(ticker);
        // IDLE.tick(); // Just for testing the countdown
    },

    countdown_idle: function() {
        window.clearTimeout(idle);
        
        IDLE.show_idle();

        var i = IDLE.restart_duration/1000 + 1,
            t = Math.floor(IDLE.idle_duration / 1000),
            u = Math.floor((t %= 3600) / 60),
            $num = $('#restartDuration');

        $('#idleDuration').html(u + ' minute' + is_plural(u));
        $num.html( (IDLE.restart_duration/1000) + ' second' + is_plural(IDLE.restart_duration/1000) );

        restart = setInterval(tick, 1000);
        function tick() {
            i--;
            if (i >= 0) {
                $num.html(i + ' second' + is_plural(i));
            }
            else {
                IDLE.hide_idle();
                IDLE.restartVR();
            }
        }

        console.log('You are now idle');
    },

    countdown_goodbye: function() {

        window.clearTimeout(idle);

        var i = IDLE.bye_duration/1000,
            $num = $('#byeDuration');

        bye = setInterval(tick, 1000);
        $num.html(i + ' second' + is_plural(i));

        function tick() {
            i--;
            if (i >= 0) {
                $num.html(i + ' second' + is_plural(i));
                console.log(i + ' second' + is_plural(i));
            }
            else {
                window.clearInterval(bye);
                IDLE.restartVR();
            }
        }

    },

    goodbye_reset: function() {
        clearInterval(bye);
    },

    restartVR: function() {
        $('*[data-target-screen="welcome_screen"]').click();
        $('body').addClass('restarting');
        CAROUSEL.play();

        this.idle = clearInterval(idle);
        this.restart = clearInterval(restart);
        console.log('VR restarted');
    },

    hide_idle: function() {
        $('#idleMessage').velocity({
            translateY: ['-50%','-50%'],
            scaleX: [0.8,1],
            scaleY: [0.8,1],
            opacity: [0,1],
        },
        {
            display: 'none',
            easing: 'easeInOutCirc',
            duration: 200,
            complete: function() {
                // IDLE.restartVR();
                $('#idleContainer').removeClass('in');

                var thistime;

                thistime = setTimeout(function(){
                    clearTimeout(thistime);
                    $('#idleContainer').hide();
                }, 300)

            }
        });
        // $('#idleContainer, #idleMessage').hide();
    },

    show_idle: function() {
        $('#idleContainer').show(0,function(){
            $('#idleContainer').addClass('in');
        });
        
        $('#idleMessage').velocity({
            translateY: ['-50%','-50%'],
            scaleX: [1,0.8],
            scaleY: [1,0.8],
            opacity: [1,0],
        },
        {
            display: 'block',
            easing: 'spring',
            delay: 100,
            duration: 1000
        });
        // $('#idleContainer, #idleMessage').show();
    },

    // =================  Just for testing the countdown ===============
    tick: function(){
        var r = IDLE.idle_duration/1000;

        ticker = setInterval(function(){
            r--;
            console.log('idle counting down in ' + r);
            if (r<=0) { clearInterval(ticker); }
        }, 1000)        
    }
    // =================  Just for testing the countdown ===============
}

function is_plural(number) { 
    return (number > 1) ? 's' : '';
}

function show_nav() { $('.btn-back, .btn-home').velocity('transition.expandIn', { stagger: 250, delay: 250, duration: 150 }); }
function hide_nav() { $('.btn-back, .btn-home').velocity('transition.shrinkOut', { stagger: 250, delay: 250, duration: 150 }); }

function exit_greeting() {
    var today = new Date(),
        curHr = today.getHours(),
        $partOfDay = $('#partOfDay'),
        greeting = ['pleasant','wonderful','fine','lovely','good','lovely','nice'];

    if(curHr < 12) {
        $partOfDay.html('morning');
    }
    else if (curHr < 18) {
        $partOfDay.html('afternoon');
    }
    else {
        $partOfDay.html('evening');
    }

    var adjective = greeting[Math.floor((Math.random() * greeting.length) + 1)];
    $('#describeDay').html(adjective);    
}


$(document).ready(function() {
    CAROUSEL.play();
    MAP.map();
    build_navigation();
});
