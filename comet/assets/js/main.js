// Specific Functions for COMET

// Declare BS3 Components
$(function () {
 	$('[data-toggle="tooltip"]').tooltip();
 	$('.help[data-toggle="popover"]').popover({trigger: 'hover','placement': 'right'});
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

// Team Search
// =========================================
// 

// Toggle View of Panel
function toggle_team() {
	$('#searchParent').toggleClass('in');
	resize_container_search();
}

// Stretch container down to bottom
function resize_container_search() {
    var child = $('#teamListGroup');

	// Watch for parent's computed height. Relies on CSS' position fixed 
    var parent = $('#searchParent').outerHeight();
    var exclude = child.prev().outerHeight();

    child.css({ height: (parent - exclude) });
}

var resizeTimer;
$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize_container_search, 150);
})

resize_container_search();
