// Animating the modals in IE8

$('*[data-toggle="modal"]').click(function() {
	var obj = $(this).data('target');
	var target = $(obj);
	var dialog = target.find('modal-dialog');
	console.log(dialog);

	target.velocity("fadeIn", { duration: 150, easing: [.44,.01,.65,.98] });
	// dialog.velocity({marginTop: 30, marginBottom: 30}, { duration: 200, easing: [.44,.01,.65,.98] });
});

$('*[data-dismiss="modal"]').click(function() {
	var target = $(this).closest('.modal');
	var dialog = $(this).closest('.modal-dialog');

	target.on('hide.bs.modal', function (e) {
		e.preventDefault();
	})

	target.velocity("fadeOut", { duration: 150, easing: [.44,.01,.65,.98] });
	// dialog.velocity({marginTop: 60, marginBottom: 0}, { duration: 200, easing: [.44,.01,.65,.98] });
});