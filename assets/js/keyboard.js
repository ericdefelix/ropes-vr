var kbd = {
    keyboard   :    $('#keyboard'),
    trigger    :    $('*[data-keyboard]'),
    key        :    $('*[data-key]'),
    uppercase  :    false,
    numeric    :    false,
    str        :    '',
    numlimit   :    10,
    open       :    false,
}

var KEYBOARD = {

    bind: function() {

        var that;

        kbd.trigger.on('click', function() {
            kbd.keyboard.modal({
                show: true,
                keyboard: false,
                backdrop: true
            })

            kbd.open = true;            
            that = $(this);

            that.data('keyboard-type') == 'numeric' ? kbd.keyboard.addClass('number-only') : kbd.keyboard.removeClass('number-only');

            KEYBOARD.hide_textbox(that);
        });

        kbd.keyboard.on('hidden.bs.modal', function(){
            KEYBOARD.show_textbox(that);
        });
    },

    show_textbox: function(elem) {
        elem.velocity('reverse').removeClass('js_active-input');
        $('*[data-validate-form], #validateLastName').velocity('reverse');
    },

    hide_textbox: function(elem) {
        elem.addClass('js_active-input');
        elem.velocity({
            translateY: '5vh',
            scaleX: 1.7,
            scaleY: 1.7
        },{
            easing: [.01,.94,.3,.97],
            duration: 200
        });
        $('*[data-validate-form], #validateLastName').velocity({
            translateY: '8vh',
            opacity: 0
        },
        {
            duration: 200
        });
    },

    update_input: function() {
        kbd.key.on('click', function() {
            var chr = $(this).data('key');

            if (chr==='shift'||chr==='backspace'||chr==='kbd-hide'||chr==='submit'||chr==='clear'||chr==='spacebar'||chr==='numbers'||chr==='alpha') {
                switch(chr){
                    case 'shift':
                        kbd.uppercase ? kbd.uppercase = false : kbd.uppercase = true;
                        $(this).toggleClass('uppercase');
                        $('.keyboard-alphanumeric').toggleClass('uppercase');
                        break;
                    case 'backspace':
                        KEYBOARD.backspace();
                        break;
                    case 'kbd-hide':
                        KEYBOARD.hide();
                        break;
                    case 'submit':
                        KEYBOARD.enter();
                        break;
                    case 'clear':
                        KEYBOARD.clear_all();
                        break;
                    case 'numbers':
                        kbd.keyboard.toggleClass('number-mode');
                        break;
                    case 'alpha':
                        kbd.keyboard.toggleClass('number-mode');
                        break;
                    case 'spacebar':
                        kbd.str = kbd.trigger.val().concat(' ');
                        kbd.trigger.val(kbd.str);
                        break;
                    default:
                        console.log('no keys assigned');
                        break;
                }
            }
            else {
                chr = kbd.uppercase ? chr.toString().toUpperCase() : chr ;

                kbd.str = kbd.trigger.val().concat(chr);
                kbd.trigger.val(kbd.str);
            }

        });
    },

    num_only: function() {
        kbd.keyboard.addClass('number-only');
    },

    backspace: function() {
        kbd.str = kbd.str.substring(0, kbd.str.length - 1);
        kbd.trigger.val(kbd.str);   
    },

    clear_all: function() {
        kbd.trigger.val('');
    },

    hide: function() {
        kbd.keyboard.modal('hide');
        kbd.trigger.removeClass('active');
        kbd.open = false;
    },

    enter: function() {
        $('.section-main:visible').find('*[data-validate-form]').click();
        console.log('validate');
    },

    build: function(){
        this.bind();
        this.update_input();
    }
}

$(document).ready(function() {
    KEYBOARD.build();
});
