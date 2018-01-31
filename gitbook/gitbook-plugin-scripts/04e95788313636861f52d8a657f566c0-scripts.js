$(function() {
    var showArticles = function () {
        var $active = $('li.active');
        $active.parents('ul').css('display', 'block');
        $active.children('ul').css('display', 'block');
    };

    showArticles();
    gitbook.events.on('page.change', function() {
        showArticles();
    });
});