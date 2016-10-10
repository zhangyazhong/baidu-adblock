var adAttr = '#content_left';
var hintAttr = '.hint_common_restop';
var blockRecord = 0;
var resultSummaryAttr = '.head_nums_cont_inner .nums'
var blockSummaryAttr = '.head_nums_cont_inner .nums #blockNum'
var blockSummaryHtml = '，<a href="https://github.com/SISSORS-FDU/baidu-adblock" style="text-decoration:none;">屏蔽百度推广</a>已为您屏蔽<span id="blockNum">' + blockRecord + '</span>个推广广告</div>';

function showBlockSummary() {
    if ($(blockSummaryAttr) === null || $(blockSummaryAttr).length < 1) {
        $(resultSummaryAttr).append(blockSummaryHtml);
    }
}

function block(dom) {
    $.each(dom.children(), function(i, item) {
        if ($(item).attr('id') === undefined || $(item).attr('id').length > 3) {
            $(item).remove();
            blockRecord++;
        } else if ($(item).find("span[class='m']").text().indexOf('广告') != -1) {
            $(item).remove();
            blockRecord++;
        }
    });
    if ($(blockSummaryAttr) !== null && $(blockSummaryAttr).length > 0) {
        $(blockSummaryAttr).html(blockRecord);
    }
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
    // if (window.localStorage.getItem('showBlockSummary') === 'true') {
        var showBlockSummaryTimer = window.setInterval("showBlockSummary()", 1000);
    // }
    block($(adAttr));
});
