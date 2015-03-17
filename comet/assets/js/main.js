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
    $(elem).closest($post).find('.js_comment-controls').hide();
    $(elem).closest($post).find('.js_comment-edit-mode').show();
    $(elem).closest($post).find('.js_comment-edit-mode').focus();
}

function discard_comment(elem) {
    $(elem).closest($post).find('.js_comment-controls').show();
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
        $('#searchParent').velocity("fadeOut", { duration: 150, easing: [ .99,.01,.33,1] })
    }
    else {
        $('#searchParent').addClass('in');
        $('#searchParent').velocity("fadeIn", { duration: 150, easing: [ .99,.01,.33,1 ] })
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
    var body = $(document).height();
    var totalHeight = body - 600;

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