$(function () {
    var i;
    var tab;
    var line;
    var neededContentQuantity;
    var content = ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti excepturi iure laboriosam modi\n' +
    '        natus nisi officiis, quasi quidem quis quod temporibus ut veritatis vitae? Aperiam cupiditate in qui totam?', +
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores error est placeat? Cupiditate explicabo fugiat' +
    'libero nesciunt officia placeat reprehenderit.', 'При просмотре документа элемент с фокусом всегда является активным ' +
    'элементом документа, но активный элемент не обязательно должен иметь фокус. Например, активный элемент внутри всплывающего' +
    ' окна, которое находится не на переднем плане, не имеет фокус.', 'compatibility table still uses the old format, because we haven\'t yet converted the data it contains. Find out how you can help!', +
        'Переменная x проверяется на строгое равенство первому значению value1, затем второму value2 и так далее.\n' +
    'Если соответствие установлено – switch начинает выполняться от соответствующей директивы case и далее, до ближайшего break (или до конца switch).\n' +
    'Если ни один case не совпал – выполняется (если есть) вариант default.\n' +
    'При этом case называют вариантами switch.', 'Very basically the above is saying: Count the amount of div’s within the ID #example, and if it is less than 2, change the body’s background colour to green, otherwise change the background colour to orange.\n' +
    '\n' +
    'What do you think the outcome would be?\n' +
    '\n' +
    'If you guessed orange… Then you would be right.'];
    var container = $('.container');

    var tabCreator = function (tabQuantity) {
        var i;
        for (i = 0; i < tabQuantity; i++) {
            tab = $('<div class="tab">');
            tab.addClass('tab' + i);
            tab.html('Tab ' + i);
            container.append(tab);
        }
    }
    var lineCreator = function () {
        line = $('<div>');
        line.addClass('line');
        $('.tab0').append(line);
    }
    var contentCreator = function (tabQuantity, i) {

        for (i = i || 0; i < tabQuantity; i++) {
            var contentBlock = $('<div class="box">');
            contentBlock.addClass('box' + i);
            contentBlock.html('<h3>Content ' + i + '</h3>' + content[i]);
            container.append(contentBlock);
            contentBlock.hide();
            $('.box0').show();
        }
    };
    tabCreator(6);
    contentCreator(3);
    lineCreator();

    $('.tab').on('click', function (event) {
        var lineElement = event.currentTarget;
        var linePosition = $(lineElement);
        var lineClass = $('.line');
        $('.box').hide();

        if (linePosition.hasClass('tab0')) {
            lineClass.css('left', '2px');
            $('.box0').show('slow');
        }
        if (linePosition.hasClass('tab1')) {
            lineClass.css('left', '92px');
            $('.box1').show('slow');
        }
        if (linePosition.hasClass('tab2')) {
            lineClass.css('left', '181px');
            $('.box2').show('slow');
        }
        if (linePosition.hasClass('tab3')) {
            lineClass.css('left', '271px');
            $('.box3').show('slow');
        }
        if (linePosition.hasClass('tab4')) {
            lineClass.css('left', '361px');
            $('.box4').show('slow');
        }
        if (linePosition.hasClass('tab5')) {
            lineClass.css('left', '451px');
            $('.box5').show('slow');
        }
    });

    var autoCreator = function () {
        var tabLength = $('.tab').length;
        var contentLength = $('.box').length;
        i = contentLength;
        if (tabLength > contentLength) {
            console.log(tabLength, i);
            contentCreator(tabLength, i);
        } else {
            alert('You don\'t need to create Content.');
        }
    }
    $('.autoCreator').on('click', function() {
        autoCreator();
    });
});