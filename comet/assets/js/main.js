// Specific Functions for COMET

// Initialize what needs to be hidden
$('.js_comment-edit-mode').hide();
var $post = $('.panel-body'); // The post's body

// Initialize UI components
$(function () {

    // BS3 Components
 	$('[data-toggle="tooltip"]').tooltip();
 	$('.help[data-toggle="popover"]').popover({trigger: 'hover','placement': 'right'});

    // Ala-Facebook Scrolling
    $(".js_custom-scroll").mCustomScrollbar({
        autoHideScrollbar:  true,
        scrollbarPosition:  "outside",
        scrollInertia:      200,
        scrollButtons:      {enable: true}
    });
  
    // Filter list
    $(".js_dropdown-select li a").click(function(event) {
        event.preventDefault();
        var item = $(this).closest('.js_dropdown-select').prev('button').find('.js_dropdown-select-value');
        $(item).text($(this).text());
        $(item).val($(this).text());
    });

})

// Navigation Controls Sticky
$(window).scroll(function() {
    var scrollTop = $(document).scrollTop();
    var docWidth = $(document).width();
    var offsettrigger = $('.profile-info').outerHeight();
    var offset = $('.navbar-fixed-top').height();

    if ( docWidth > 991 && scrollTop > offsettrigger ) {
        $('.navbar-controls').addClass('navbar-sticky').css('top', offset + 1);
    }
    else if (docWidth > 991 && scrollTop < offsettrigger) {
        $('.navbar-controls').removeClass('navbar-sticky').css('top', 'auto');
    }
    else {
        return false;
    }
});



// Strict Numbers Only on Input Field
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    var $num = $('#commitedValue');

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }

    return true;
}

// Commitment
// =========================================
// 

// Save Commitment
function save_commit() {

}

// Edit Commitment
function edit_commit() {
	$('#editCommit').removeClass('locked').addClass('unlocked');
}

// Cancel Commitment
function cancel_commit() {
	$('#editCommit').removeClass('unlocked').addClass('locked');
}

// Feedback Controls
// =========================================
//

function view_comment_all(elem) {
    $(elem).closest($post).find('.js_comment').show();
    $(elem).hide();
}

function write_comment(elem) {
    $(elem).closest($post).find('.js_reply').show();
    $(elem).closest($post).find('.js_comment-input').focus();
    $(elem).hide();
}

function edit_comment(elem) {
    $(elem).closest($post).find('.js_comment-controls.display-comment').addClass('ishidden');
    $(elem).closest($post).find('.js_comment-controls.btn-float').hide();
    $(elem).closest($post).find('.js_comment-edit-mode').show();
    $(elem).closest($post).find('.js_comment-edit-mode').focus();
}

function discard_comment(elem) {
    $(elem).closest($post).find('.js_comment-controls.display-comment').removeClass('ishidden');
    $(elem).closest($post).find('.js_comment-controls.btn-float').show();
    $(elem).closest($post).find('.js_comment-edit-mode').hide();
    $(elem).closest($post).find('.js_comment-edit-mode').val('');
}

function delete_comment(elem) {
    $(elem).closest('.js_comment').remove();
}

function confirm_comment(elem) {
    $(elem).closest($post).find('.js_comment-controls').show();
    $(elem).closest($post).find('.js_comment-edit-mode').hide();
}

// Team Search
// =========================================
// 

// Toggle View of Panel
function toggle_team() {
    var $search = $('#searchParent');
 
    if ( $search.hasClass('in') ) {
        $('#searchParent').removeClass('in');
        $('#searchParent').velocity("fadeOut", { duration: 100, easing: [ .99,.01,.33,1] })
    }
    else {
        // $('#searchParent').addClass('in');
        $('#searchParent').velocity("fadeIn", { delay: 200, duration: 100, easing: [ .99,.01,.33,1 ] })
        $('.js_search-input').focus();
    }

   resize_container_search();
}

function expand_directs(elem) {
    var spinner = '<i class="md md-settings md-spin md-2x"></i>';
    var caret = '<i class="md md-expand-more md-2x"></i>';

    $(elem).prop('disabled', true).css('opacity', '1');
    $(elem).find('i').detach();
    $(elem).append(spinner);

    // If AJAX Successs
    $(elem).closest('.js_team-list-item').find('.js_team-sublist').toggleClass('js_init_hidden');
    // if done revert to 'caret' and enable button
}

// Library Controls
function open_library_controls(elem) {
    $(elem).next('.js_library-controls').velocity("fadeIn", { duration: 150, easing: [ .99,.01,.33,1 ] });
}

function close_library_controls(elem) {
    $(elem).closest('.js_library-controls').velocity("fadeOut", { duration: 150, easing: [ .99,.01,.33,1 ] });
}

function apply_library() {

}

// Trends and Forecast
function expand_panel(elem) {
    $(elem).find('.js_panel-body').removeClass('js_init_hidden').addClass('flash');

    if ($(elem).hasClass('closed')) {
        $(elem).removeClass('closed');
    }
}

// Stretch container down to bottom
function resize_container_search() {
    var child = $('#teamListGroup');

	// Watch for parent's computed height. Relies on CSS' position fixed property
    var parent = $('#searchParent').outerHeight();
    var exclude = child.prev().outerHeight();

    child.css({ height: (parent - exclude) });
}

function resize_container_modal() {
    var child = $('.js_modal-container');
    var body = $(window).height();
    var totalHeight = body - 280;

    child.css({ height: totalHeight + 'px' });
    resize_container_modal_xs()
}

function resize_container_modal_xs() {
    var child = $('.js_modal-container-xs');
    var totalHeight = $('.js_modal-container').height() - 178;

    child.css({ height: totalHeight + 'px' }); 
}

resize_container_modal()

var resizeTimer;
$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize_container_search, 150);
    resizeTimer = setTimeout(resize_container_modal, 150);
})

resize_container_search();

// BLAST! Carousel
// =========================================
//

// Initialize Variables
var carousel_id = "#" + $('.carousel').attr('id');
var li = carousel_id + ' .js_scroll-numbers li';
var li_active = carousel_id + ' .js_scroll-numbers li.active';

var $carousel_scroll = $(carousel_id).find('.js_carousel-scroll');
var $carousel_list = $(carousel_id).find('.js_carousel-list');
var $carousel_numbers = $(carousel_id).find('.js_scroll-numbers');

var step = $carousel_scroll.outerHeight() - 2;
var steplimit = $(carousel_id).find('.js_carousel-list').outerHeight() - step - 2; // 2 accommodates the 2px margin-bottom
var init_step = 0;
var tick = init_step; // Watch variable for offset updates

// Carousel Autoplay
var autoplay = true;
var carouseltimer;

function start_autoplay() {
    clearInterval(carouseltimer);
    carouseltimer = window.setInterval(function() {
       carousel_next_slide();
       console.log(tick);
    }, 6000);
}

// Prev Slide
function carousel_prev_slide(elem) {
    if (tick < step ) {
        // Go to last
        $(li).last().addClass('active');
        $(li).first().removeClass('active');

        tick = steplimit;
        $carousel_list.velocity( "scroll",
        {
            translateZ: 0, // Force Hardware Acceleration
            container: $carousel_scroll,
            duration: 450,
            easing: [ .99,.01,.33,1],
            offset: steplimit
        });

        start_autoplay();;
    }
    else {
        // Move previous
        $(li_active).prev().addClass('active');
        $(li_active).last().removeClass('active');

        tick = tick - step; // Update ticker
        $carousel_list.velocity( "scroll",  
        {
            translateZ: 0, // Force Hardware Acceleration
            container: $carousel_scroll,
            duration: 450,
            easing: [ .99,.01,.33,1],
            offset: tick
        });

        start_autoplay();
    }
}

// Next Slide
function carousel_next_slide(elem) {
    if (tick >= steplimit ) {

        // Go to first
        $(li).first().addClass('active');
        $(li).last().removeClass('active');

        tick = init_step;
        $carousel_list.velocity( "scroll",
        {
            translateZ: 0, // Force Hardware Acceleration
            container: $carousel_scroll,
            duration: 450,
            easing: [ .99,.01,.33,1],
            offset: init_step
        });

        start_autoplay();
    }
    else {
        // Move next
        $(li_active).next().addClass('active');
        $(li_active).first().removeClass('active');

        tick = tick + step; // Update ticker
        $carousel_list.velocity( "scroll",
        {
            translateZ: 0, // Force Hardware Acceleration
            container: $carousel_scroll,
            duration: 450,
            easing: [ .99,.01,.33,1],
            offset: tick
        });
    }
    start_autoplay();
}

// Count how many slides are to be rendered
function render_slidenum() {
    var list_len = Math.ceil( $carousel_list.children().length / 5 );

    for (var i = list_len - 1; i >= 0; i--) {
        $carousel_numbers.append('<li></li>');
    }
    
    $carousel_numbers.children().first().addClass('active');

    // Go to respective slide when slide number is clicked
    $(document).on('click', li, function() {
        var index = $(li).index(this) + 1;
        tick = (step * index) - step; // Update ticker

        $carousel_list.velocity("scroll",
        {
            translateZ: 0, // Force Hardware Acceleration
            container: $carousel_scroll,
            duration: 450,
            easing: [ .99,.01,.18,.98],
            offset: tick
        });

        // Tag who's active
        $(this).addClass('active');
        $(this).siblings('li').removeClass('active');
        start_autoplay();
    });
}

// Construct Carousel
function build_carousel() {
    render_slidenum();
}

// Check if BLAST Button is clicked and Carousel is present
var partialtimer;
var carouselbuilt = false;
$('#btnBlast').click(function() {
    window.clearTimeout(partialtimer);         
    partialtimer = window.setTimeout(function(){    
        if ($('.carousel').length > 0 && carouselbuilt == false ) {
            carouselbuilt = true; // Tell app carousel is already built
            build_carousel();
            start_autoplay(); // Start autoplaying
        }
        else {
            return false;
        }
    }
    ,400);
});

// Keyboard Shortcuts
// =========================================
// 

// Keyboard Shortcut Toggle Team
Mousetrap.bind(['alt+f'], function(e) {
    e.preventDefault();
    toggle_team();
});

// Keyboard Shortcut Discard Comment
Mousetrap.bind(['ctrl+enter'], function(e) {
    if ( $('.js_comment-edit-mode').is(':focus') ) {
        $('.js_comment-edit-mode:focus').closest($post).find('.js_confirm').click();
    }
    else {
        return false;
    }
});

// Keyboard Shortcut Discard Comment
Mousetrap.bind(['esc'], function(e) {
    if ( $('.js_comment-edit-mode').is(':focus') ) {
        $('.js_comment-edit-mode:focus').closest($post).find('.js_escape').click();
    }
    else {
        return false;
    }
});