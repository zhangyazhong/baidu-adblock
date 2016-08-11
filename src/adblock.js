var adAttr = '#content_left';
var hintAttr = '.hint_common_restop';
var adDom = $(adAttr);
var hintDom = $(hintAttr);
var resultDom = $('#wrapper_wrapper');

function block(dom) {
    $.each(dom.children(), function(i, item) {
        if ($(item).attr('id') === undefined || $(item).attr('id').length > 3) {
            $(item).remove();
        }
    });
    dom.find(hintAttr).remove();
}

resultDom.bind('DOMNodeInserted',function(e) {
    if ($(e.target).find(adAttr).length > 0) {
        block($(e.target).find(adAttr));
    }
});

$(function() {
    block(adDom);
});
