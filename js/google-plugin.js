// Jquery Plug-In - Google Button
(function($){
    var AlertAction = function (){};
    var isCalled = false;

    $.fn.alert = function(title, message, f){
        AlertAction = f;
        $(this).on('click', function() {
            if(!isCalled) {
                var wrapper = $('<div class="alert">').css({"display": "flex", "position": "fixed", "top": "0px", "left": "0px", "background": "rgba(0,0,0,0.7)", "width": "100%", "height": "100%"});
                var alertWindow = $('<div class="alert-window">').css({"position": "relative", "margin": "auto", "display": "inline-block", "border-radius": "5px", "background": "#fff", "padding": "40px 40px 50px", "max-width": "500px"});
                alertWindow.html('<h4>' + title + '</h4><p>' + message + '</p>');
                var button = $('<button type="button" class="btn btn-info" id="btn-alert">OK</button>').css({"position": "absolute", "right": "15px", "bottom": "15px"});

                alertWindow.append(button);
                wrapper.append(alertWindow);
                $('body').append(wrapper);
                isCalled = true;
            } else {
                $('.alert').css({display: 'flex'});
            }
        });
        $(document).on('click', '#btn-alert', function() {
            $('.alert').css({display: 'none'});
            AlertAction();
        });
    };
})(jQuery);