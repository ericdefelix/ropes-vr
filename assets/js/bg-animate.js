// Authentication Animation
var count = 1;
var prev;
var counterIncrement = 1;
var counter = setInterval(timer, 6000); 
var $body = $('body');
var cur_class = 'bg' + count;
var m_count = 1;
var $msg = $('#loaderMessage');

function timer() {
  if ( count >= 4 ) {
    count = 1;
    prev =  count - 1;
    cur_class = 'bg' + count;
    prev_class = 'bg' + prev;
    $body.addClass(cur_class);
    $body.removeClass('bg4');
  }
  else {
    count = count + counterIncrement;
    prev =  count - 1;
    cur_class = 'bg' + count;
    prev_class = 'bg' + prev;
    $body.addClass(cur_class);
    $body.removeClass(prev_class);
  }

  m_count = m_count + 1;

  if (m_count == 2 ) { $msg.html('Building User Experience'); }
  else if (m_count == 3 ) { $msg.html('Materializing IRIS Modules'); }
  else if (m_count == 4 ) { $msg.html('Hang in there... Just a little bit more'); }
}