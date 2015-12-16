
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
        $navcontrols = $('*[data-target-prev]'),

        ropes_is_valid = false,
        has_application = false,
        error_counter = 0,
        max_tries = 3,
        end_of_max_tries = max_tries + 1;

    // Set state for initial screen
    function set_init() {
        $global_ui.hide(); // Hide header and footer
        $navcontrols.hide() // Initially hide the controls
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
        if( _history.length == 3 && $('*[data-target-prev]').is(':visible') == false && MAP.is_gmap == false) show_nav();
        if(_history.length == 2) hide_nav();

        // Animate site offerings
        if (_cur == 'site_offerings' && _prev == 'map') OFFERINGS.start_carousel();
        if (_prev == 'site_offerings' && _cur == 'map' || _prev == 'site_offerings' && _cur == 'initial_options') OFFERINGS.stop_carousel();

        // Disable general map if on Map screen
        if (_cur == 'map') { MAP.disable_map(); } else { MAP.enable_map(); }

        switch(_cur){

            case 'initial_options':
                $uno.html('Nice to meet you! My name is <strong>UNO</strong>.');
                UNO.welcome();
                break;

            case 'im_here_to_apply':
                $uno.html('Guess what? You can learn more about [24]7 offerings by going to http://www.ropeswebsite.com');
                UNO.making_statement();
                break;

            case 'ropes_question':
                $uno.html('ROPES is our Recruitment Online Profiling Evaluation System');
                UNO.ropes_placard();
                break;

            case 'ropes_details':
                $uno.html('Your ROPES credentials are your ROPES ID, Username and the email you used when you registered.');
                UNO.ropes_placard();
                break;

            case 'ropes_id':
                $uno.html('Some tips for ROPES ID');
                UNO.ropes_placard();
                break;

            case 'ropes_username':
                $uno.html('Some tips for ROPES ID');
                UNO.ropes_placard();
                break;

            case 'ropes_email':
                $uno.html('Some tips for ROPES ID');
                UNO.ropes_placard();
                break;

            case 'ropes_lastname':
                $uno.html('Some tips for ROPES ID');
                UNO.ropes_placard();
                break;

            case 'ropes_try_again':
                $uno.html('Some tips for ROPES ID');
                UNO.ropes_placard();
                break;

            case 'non_applicant':
                $uno.html('Some tips for ROPES ID');
                UNO.making_statement();
                break;

            case 'site_offerings':
                $uno.html('Some tips for site offerings');
                UNO.relaxed();
                break;

            case 'generic_info':
                switch(generic_info){
                    case 'ropes_not_registered':
                        $msg.html('Alright then. Head on over to our registration kiosk so you can start filling out the application form.');
                        UNO.ropes_placard();
                        MAP.set_pins('kiosk','ground');
                        break;
                    case 'no_application':
                        $msg.html('It seeems that you haven&apos;t made any application yet?  Please go to the registration kiosk, login to ROPES and submit your application.');
                        UNO.ropes_placard();
                        MAP.set_pins('kiosk','ground');
                        break;
                    case 'has_application':
                        $msg.html('Fantastic! Why don&apos;t you head on up to the 6th floor.  One of our friendly recruiters will call on you shortly.');
                        UNO.making_statement();
                        MAP.set_pins('kiosk','ground');
                        break;
                    case 'might_apply':
                        $msg.html('Come on up to the 6th floor!');
                        UNO.making_statement();
                        MAP.set_pins('waiting_area','sixth');
                        break;
                    default:
                        $msg.html(' --- ');
                        console.log('No information available');
                        break;
                }

                break;

            case 'company_overview':
                $uno.html('Here at [24]7, ASL stands for Anticipate, Simplify, and Learn.');
                UNO.making_statement();
                break;

            case 'more_information':
                $uno.html('Some tips for ROPES ID');
                UNO.thumbsup();
                break;

            case 'map':
                $uno.html('Tap on the map to view more details.');
                UNO.looking_up();
                break;

            case 'ropes_is_scheduled':
                $uno.html('Some tips for ROPES ID');
                UNO.relaxed();
                break;

            case 'employee_options':
                $uno.html('Some tips for ROPES ID');
                UNO.making_statement();
                break;

            case 'goodbye_user':
                $uno.html('Thank you for letting me help you out!');
                UNO.thumbsup();

                IDLE.countdown_goodbye();
                hide_nav();
                MAP.disable_map();
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
        var that = $(this);

        // Apply no spam
        prevent_spam();

        _cur = $(this).data('target-screen'); // Set target to current screen
        _history.push(_cur); // Update history
        _prev =  _history[_history.length - 2]; // Get target for previous screen

        // Display map right away if General Map is clicked
        if (_cur == 'map' && that.hasClass('btn-map')) {
            MAP.img.click();
            MAP.is_gmap = true;
            MAP.set_pins('all','ground');
        }

        // Show target screen
        $('*[data-section="'+ _cur +'"]').show();
        $('*[data-section="'+ _cur +'"] .animate')
            .velocity('transition.slideRightIn', { 
                stagger: 250, delay: 250, duration: 500, display: 'block'
            });
        
        // Hide splash screen and display the header/footer
        if(_cur === 'initial_options') {
            display_global_ui();
            _history.splice(2, _history.length - 2);
            hide_nav();
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

        // console.log(_history);
        // console.log('Cur screen is ' + _cur + ' | Prev screen is ' + _prev);
    });

    // Set previous screen
    $prev.on('click', function() {

        // Apply no spam
        prevent_spam();

        // Get target for previous screen - Override if home is clicked
        _cur = $(this).hasClass('js_go-home') == true ? _history[1] : _history[_history.length - 2];

        // Get last screen shown
        _prev = _history[_history.length - 1];
        
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
                // Hide general map right if it's open
                if (_prev == 'map' && MAP.is_gmap == true) {
                    MAP.hide_map();
                    MAP.is_gmap = false;
                }
            });

            // Reset only if user reached the end
            if (_prev == 'goodbye_user') IDLE.goodbye_reset();

            // Update history by removing last item but override if home button is clicked instead
            if ($(this).hasClass('js_go-home') == true) {
                _history.splice(2, _history.length - 1);
                hide_nav();
            }

            else {
                _history.pop();
            }
            
            set_screen_elements(); // Update elements

            // console.log(_history);
            // console.log('Cur screen is ' + _cur + ' | Prev screen is ' + _prev);
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
            KEYBOARD.hide();
        }

        else {

            error_counter++;

            if (error_counter == 1) {
                show_errors();
                $uno.html('Don&apos;t panic. Just check your spacing or spelling to make sure that you&apos;re entering the right information.');
                UNO.puzzled();
            }

            else if (error_counter == (max_tries - 1)) {
                show_errors();
                $('section:visible').find('.error-message').html('We still can&apos;t find your information.');
                UNO.disappointed();
                console.log('One last try');
            }

            else if (error_counter == max_tries) {
                show_errors();
                $('section:visible').find('.error-message').html('I&apos;m sorry but your information is still not found');
                UNO.puzzled();
                console.log('Change error message');
            }

            else if (error_counter == end_of_max_tries) {
                hide_nav();
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
    
    set_init(); //Initialize
}

var MAP = {
    container: $('#mapContainer'),
    img: $('#enlargeMapHotSpot'),
    img_location_target: $('*[data-target-img]'),
    target_img: '',
    gmap_trigger: $('.btn-map'),
    is_gmap: false,
    is_open: false,
    floor: 'ground',
    bd: '<div class="backdrop"></div>',
    m: $('*[data-section="map"] .check-us-out'),
    active_pin: '',

    init: function() {
        // $('#megamall6thFloor').hide();
    },

    enable_map: function() { $('.btn-map').removeProp('disabled'); },
    disable_map: function() { $('.btn-map').prop('disabled', 'true'); },

    show_map: function() {
        $('#header').addClass('state-below-modal');
        $('body').append(MAP.bd);
        $('#tap').hide();
        $('.backdrop').velocity('transition.fadeIn')
        $('.check-us-out').velocity('transition.fadeOut',300,function(){
            $('#mapContainer').velocity({
                scaleX: [1,0.4],
                scaleY: [1,0.4],
                translateY: '-10vh'
            },
            {
                display: 'block',
                easing: 'spring',
                duration: 700
            });
            MAP.m.parent().hide();
        });
    },

    hide_map: function() {
        $('.backdrop').velocity('transition.fadeOut',function(){ 
            $('#mapContainer').velocity('reverse', 400, function(){
                $('#header').removeClass('state-below-modal');
            });
            $('.check-us-out').velocity('transition.fadeIn');
            MAP.m.parent().show();
            $('#tap').show();
            $('.backdrop').remove();
        });   
    },

    reset_map_view: function() {
        $('*[data-target-img]').removeAttr('style');
        $('*[data-target-img] .pin-location').removeClass('animated bouncing infinite');
        this.container.attr('data-floor', 'ground');
    },

    close_image: function() {
        $('img[data-function-id="' + MAP.target_img +'"]').velocity('transition.fadeOut',{ duration: 400 });
    },

    bind: function() {
        this.img.on('click', MAP.toggle_map);
        this.img_location_target.on('click', function() {
            MAP.target_img = $(this).data('target-img');
            $('img[data-function-id="' + MAP.target_img +'"]').velocity('transition.fadeIn',{ duration: 400 });
        });

        $('img[data-function-id]').on('click', MAP.close_image);
        $('.js_is-upper-floor').on('click', MAP.toggle_floor);
    },

    toggle_map: function() {
        MAP.container.toggleClass('expand');
        MAP.m.toggleClass('hidden');

        if ($('.backdrop').length != 0 && MAP.is_gmap == false) {  MAP.hide_map(); }
        else if(MAP.is_gmap == true) { $('.btn-back').click(); }
        else { MAP.show_map(); }

        prevent_spam();
    },

    toggle_floor: function() {
        var icon = $('.js_is-upper-floor').find('i');
        if (MAP.floor == 'ground') {
            MAP.floor = 'sixth';
            MAP.container.attr('data-floor', 'sixth');
            icon.removeClass('fa fa-arrow-up').addClass('fa fa-arrow-down');
        }
        else if (MAP.floor == 'sixth') {
            MAP.floor = 'ground';
            MAP.container.attr('data-floor', 'ground');
            icon.removeClass('fa fa-arrow-down').addClass('fa fa-arrow-up');
        }
    },

    set_pins: function(pin,floor) {
        var icon = $('.js_is-upper-floor').find('i');

        if (pin == 'all') {
            this.reset_map_view();
        }
        else {
            this.reset_map_view();
            this.toggle_floor();
            this.container.attr('data-floor', floor);
            MAP.floor = floor;
            $('*[data-location="'+ pin +'"] .pin-location').addClass('animated bouncing');
            $('*[data-location="'+ pin +'"]').siblings('*[data-target-img]').hide();
        }
    },

    map: function() {
        this.init();
        this.bind();
    }
}

var OFFERINGS = {
    // tmr: {},
    counter: 1,
    max: null,
    offerings: $('.site-offerings'),
    curtxt: '',
    prevtxt: '',
    init: function() {
        this.bind();

        $('.so-msg').hide();

        var o = null, f = null;
        this.offerings.each(function() {
            $(this).prop('id', 'sel' + o++); // ID each selector
        });
        $('.so-msg').each(function() {
            $(this).addClass('sel' + f++); // ID each selector
        });

        max = this.offerings.length;
    },
    bind: function(){
        this.offerings.on('click', function() {
            var that = $(this);

            OFFERINGS.curtxt = '.' + that.prop('id'),
            OFFERINGS.prevtxt = '.' + $('.site-offerings.in').prop('id');

            $('.site-offerings.in').velocity({ scaleX: 1, scaleY: 1 }, 
                {
                    easing: 'spring',
                    begin: function() {
                        $(OFFERINGS.prevtxt).velocity({opacity: 0},{ display: 'none', duration: 300 });
                    },
                    complete: function(){ 
                        $(this).removeClass('in');
                        $(OFFERINGS.curtxt).velocity('fadeIn'); 
                        that.velocity({ scaleX: 1.2, scaleY: 1.2 }, { delay: 200, easing: 'spring', duration: 500 }).addClass('in');
                    } 
                }
            );
        });
    },
    start_carousel: function() {
        // Select first message and selector

        $('.so-msg.sel0').show();
        $('.site-offerings#sel0').velocity({ scaleX: 1.2, scaleY: 1.2 }, { delay: 200, easing: 'spring', duration: 500 }).addClass('in');
    },
    stop_carousel: function() {
        $('.site-offerings').css({ display: '', transform: '' }).removeClass('in');
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
    idle_duration: 120000, // 2 mins
    restart_duration: 15000, //15 secs
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
                console.log('no, dont reset me yet');
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

            if (kbd.open == true) KEYBOARD.hide();
            IDLE.hide_idle();
            IDLE.restartVR();
        });
    },

    play: function() {
        idle = setTimeout(IDLE.countdown_idle, IDLE.idle_duration + 1);
        if ($('body').hasClass('pristine')) this.bind();
        $('body').removeClass('pristine')

        // console.log('idle timer started for ' + IDLE.idle_duration + ' ms');
        // IDLE.tick(); // Just for testing the countdown
    },

    countdown_reset: function() {
        window.clearTimeout(idle);

        this.countdown_start();
        // console.log('idle countdown reset');
    },

    restart_reset: function() {
        window.clearTimeout(idle);
        window.clearInterval(restart);
        // IDLE.goodbye_reset();
    
        this.countdown_start();
    },

    countdown_start: function() {
        idle = setTimeout(IDLE.countdown_idle, IDLE.idle_duration);
        // console.log('starting again');

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

        // console.log('You are now idle');
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
        $('.backdrop').remove();
        CAROUSEL.play();

        this.idle = clearInterval(idle);
        this.restart = clearInterval(restart);
        MAP.reset_map_view();
        // console.log('VR restarted');
    },

    hide_idle: function() {
        var thistime;

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
            // console.log('idle counting down in ' + r);
            if (r<=0) { clearInterval(ticker); }
        }, 1000)        
    }
    // =================  Just for testing the countdown ===============
}

// Animating UNO
var UNO =  {
    unoBody: $('#unoImage'),
    eyes: $('.eye'),
    pupil: $('.pupil'),
    leftLeg: $('.leg-left'),
    rightLeg: $('.leg-right'),
    rightArm: $('.arm-right'),
    rightShoulder: $('.shoulder-right'),
    leftArm: $('.arm-left'),
    placard: $('.ropes-placard'),
    u: null, 
    n: null, 
    o: null,
    randomize: function() { UNO.u = Math.floor((Math.random() * 50) + 1); return UNO.u; },
    is_odd: function(n) { return n % 2; },
    blinking: function() {
        var tmr;

        tmr = setInterval(function() {
            this.o = UNO.is_odd(UNO.randomize());
            UNO.eyes.removeClass('blinking');
            if ( this.o === 0) UNO.eyes.addClass('blinking');
        }, 3000);
    },
    tapping: function() {
        var tmr;

        tmr = setInterval(function() {
            var x;
            x = UNO.is_odd(UNO.randomize());;

            if ( x == 1) {
                UNO.rightLeg.velocity({ rotateZ: '-0.5deg', translateY: '-3.5%' },{ duration: 200, easing: [.26,.69,.54,.96] }).velocity('reverse');
                UNO.leftLeg.velocity({ rotateZ: '-0.5deg', translateY: '-1.5%' },{ duration: 200, easing: [.26,.69,.54,.96], delay: 400 }).velocity('reverse');
            }
            else if (x == 0) {
                UNO.rightLeg.velocity({ rotateZ: '-0.5deg', translateY: '-3.5%' },{ duration: 200, easing: [.26,.69,.54,.96] }).velocity('reverse', 
                { 
                    complete: function(){
                        UNO.rightLeg.velocity({ rotateZ: '-0.5deg', translateY: '-2%' },{ duration: 200, easing: [.26,.69,.54,.96], delay: 100 }).velocity('reverse');
                    }
                });
            }
        }, 12000);
    },
    welcome: function() {
        this.unoBody.attr('data-uno-image', 'welcome');
        this.reset_eyes();
        this.reset_shoulders();
        this.reset_placard();

        UNO.rightArm
        .velocity('stop',true)
        .velocity({translateX: '0%', translateY: '0%',rotateZ: '169deg'},{ duration: 300, easing: 'linear'})
        .velocity({translateX: '0%', translateY: '0%',rotateZ: '149deg'},{ duration: 200, easing: [1,.06,.26,.93],loop: 6});

        UNO.leftArm
        .velocity('stop',true)
        .velocity({translateY: '0%',rotateZ: '27deg'},{ duration: 200, easing: 'linear' })
        .velocity({translateY: '-1.2%',rotateZ: '33deg'},{ duration: 2100, easing: 'linear',loop: true });
    },
    reset_eyes: function() { this.pupil.velocity({translateY: '0%', translateX: '0%'}, { duration: 400, easing: [1,.06,.26,.93] }); },
    reset_shoulders: function() { 
        this.rightShoulder.velocity({ rotateZ: '-41deg' },{ duration: 200, easing: 'linear' });
    },
    reset_left: function() {
        UNO.leftArm
        .velocity('stop',true)
        .velocity({translateY: '0%',rotateZ: '27deg'},{ duration: 200, easing: 'linear' })
        .velocity({translateY: '-1.2%',rotateZ: '33deg'},{ duration: 2100, easing: 'linear',loop: true });
    },
    reset_placard: function() {
        UNO.placard
        .velocity('stop',true)
        .velocity({ opacity: 0 },{ display: 'none', duration: 200, complete: function() { UNO.placard.attr('style', ''); } })
    },
    ropes_placard: function() {
        this.unoBody.attr('data-uno-image', 'ropes-placard');
        this.reset_eyes();
        this.reset_left();
        this.reset_placard();

        this.rightArm
        .velocity('stop',true)
        .velocity({
            translateY: '2%', translateX: '-27%', rotateZ: '-167deg'
        },{
            duration: 400, easing: [1,.06,.26,.93], complete: function() {
                UNO.placard.velocity(
                    { 
                        rotateZ: ['-17deg','-17deg'], 
                        scaleX: [1,0], 
                        scaleY: [1,0],
                        opacity: [1,0]
                    },
                    { 
                        easing: [.99,.01,.33,1],
                        duration: 600,
                        display: 'block',
                        complete: function() {
                            UNO.placard.velocity({ scaleX: 1.02, scaleY: 1.02, opacity: 0.8}, { easing: 'linear', loop: true, duration: 1500 });
                        }
                    }
                );
            }
        });
        this.rightShoulder.velocity({ translateY: '0%', rotateZ: '-51deg' },{ duration: 400, easing: [1,.06,.26,.93] });
        this.pupil.velocity({translateY: '-23%', translateX: '0%'}, { duration: 400, easing: [1,.06,.26,.93] });

    },
    disappointed: function() {
        this.unoBody.attr('data-uno-image', 'looking-disappointed');
        this.reset_eyes();
        this.reset_shoulders();
        this.reset_placard();

        UNO.rightArm
        .velocity('stop',true)
        .velocity({translateX: '0%', translateY: '0%',rotateZ: '-27deg'},{ duration: 200, easing: 'linear' })
        .velocity({translateX: '0', translateY: '-1.2%',rotateZ: '-33deg'},{ duration: 2100, easing: 'linear',loop: true });

        UNO.leftArm
        .velocity('stop',true)
        .velocity({translateY: '0%',rotateZ: '27deg'},{ duration: 200, easing: 'linear' })
        .velocity({translateY: '-1.2%',rotateZ: '33deg'},{ duration: 2100, easing: 'linear',loop: true });
    },
    looking_up: function() {
        this.unoBody.attr('data-uno-image', 'looking-up');
        this.reset_left();
        this.reset_placard();

        this.rightArm
        .velocity('stop',true)
        .velocity({
            translateY: '73%', translateX: '-29%', rotateZ: '-167deg'
        },{
            duration: 300, easing: [1,.06,.26,.93]
        });
        this.rightShoulder.velocity({ translateY: '0%', rotateZ: '-111deg' },{ duration: 300, easing: [1,.06,.26,.93] });
        this.pupil.velocity({translateY: '-23%', translateX: '7%'}, { duration: 400, easing: [1,.06,.26,.93] });
    },
    holding_mobile: function() {
        this.unoBody.attr('data-uno-image', 'holding-mobile');
        this.reset_eyes();
        this.reset_shoulders();
        this.reset_left();
        this.reset_placard();

        this.rightArm.velocity('stop',true);
    },
    making_statement: function() {
        this.unoBody.attr('data-uno-image', 'making-statement');
        this.reset_eyes();
        this.reset_shoulders();
        this.reset_placard();

        this.rightArm
        .velocity('stop',true)
        .velocity(
            { translateX: '0%', translateY: '0%', rotateZ: '2deg', },
            { duration: 200, easing: 'linear', complete: function() {
                UNO.rightArm.velocity({ translateY: '-10%'},{ duration: 1500, easing: [1400,20], queue: false });
            } }
        );

        this.leftArm
        .velocity('stop',true)
        .velocity(
            { translateX: '0%', translateY: '0%', rotateZ: '-2deg', },
            { duration: 200, easing: 'linear', complete: function() {
                UNO.leftArm.velocity({ translateY: '-10%'},{ duration: 1500, easing: [1400,20], queue: false });
            } }
        );
    },
    thumbsup: function() {
        this.unoBody.attr('data-uno-image', 'thumbs-up');
        this.reset_eyes();
        this.reset_shoulders();
        this.reset_left();
        this.reset_placard();

        this.rightArm
        .velocity('stop',true)
        .velocity(
            { translateX: '0%', translateY: '0%', rotateZ: '2deg', },
            { duration: 200, easing: 'linear', complete: function() {
                UNO.rightArm.velocity({ translateY: '-10%'},{ duration: 1500, easing: [1400,20], queue: false });
            } }
        );
    },
    relaxed: function() {
        this.unoBody.attr('data-uno-image', 'relaxed');
        this.reset_eyes();
        this.reset_shoulders();
        this.reset_placard();

        UNO.rightArm
        .velocity('stop',true)
        .velocity({translateX: '0%', translateY: '0%',rotateZ: '-27deg'},{ duration: 200, easing: 'linear' })
        .velocity({translateX: '0', translateY: '-1.2%',rotateZ: '-33deg'},{ duration: 2100, easing: 'linear',loop: true });

        UNO.leftArm
        .velocity('stop',true)
        .velocity({translateY: '0%',rotateZ: '27deg'},{ duration: 200, easing: 'linear' })
        .velocity({translateY: '-1.2%',rotateZ: '33deg'},{ duration: 2100, easing: 'linear',loop: true });
    },
    puzzled: function() {
        this.unoBody.attr('data-uno-image', 'looking-puzzled');
        this.reset_eyes();
        this.reset_shoulders();
        this.reset_left();
        this.reset_placard();

        this.rightShoulder.velocity({ translateY: '0%', rotateZ: '-60deg' },{ duration: 500, easing: [1,.06,.26,.93] });
        this.rightArm
        .velocity('stop',true)
        .velocity({ rotateZ: '-199deg', translateX: '-15%' },{ duration: 500, easing: [1,.06,.26,.93], delay: 100 });
        this.pupil.velocity({translateY: '-23%', translateX: '7%'}, { duration: 400, easing: [1,.06,.26,.93] });
    },
    uno: function() {
        this.blinking();
        this.tapping();

        var tmr;
        tmr = setTimeout(function(){
            UNO.relaxed();
            clearTimeout(tmr);
        }, 200)
    }
}

function is_plural(number) {  return (number > 1) ? 's' : ''; }

function show_nav() { $('.btn-back, .btn-home').velocity( {opacity: 1 }, { delay: 150, duration: 200, display: 'block'})
}
function hide_nav() { $('.btn-back, .btn-home')
    .velocity( {opacity: 0 }, { delay: 150, duration: 200, display: 'none'})
}

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
    OFFERINGS.init();
    UNO.uno();
    build_navigation();
});
