var adAttr = '#content_left';
var hintAttr = '.hint_common_restop';

function block(dom) {
    $.each(dom.children(), function(i, item) {
        if ($(item).attr('id') === undefined || $(item).attr('id').length > 3) {
            $(item).remove();
        } else if ($(item).find("span[class='m']").text().indexOf('广告') != -1) {
            $(item).remove();
        }
    });
    dom.find(hintAttr).remove();
}

$('#wrapper').bind('DOMNodeInserted', function(e) {
    if ($(e.target).find(adAttr).length > 0) {
        block($(e.target).find(adAttr));
    }
});

document.addEventListener('DOMNodeInserted', function() {
    block($(adAttr));
}, false);

$(function() {
    block($(adAttr));
});
