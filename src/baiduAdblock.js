var adAttr = '#content_left';
var hintAttr = '.hint_common_restop';
var blockRecord = 0;
var resultSummaryAttr = '.head_nums_cont_inner .nums'
var blockSummaryAttr = '.head_nums_cont_inner .nums #blockNum'
var blockSummaryHtml = '，<a href="https://github.com/zhangyazhong/baidu-adblock" style="text-decoration:none;">屏蔽商业推广</a>已为您屏蔽<span id="blockNum">' + blockRecord + '</span>个推广广告</div>';
var date = new Date();
var today = 'day' + date.getFullYear() + date.getMonth() + date.getDate();
var total = 'totalBlock';
var showBlockSummary = 'showBlockSummary';

function isEmpty(obj) {
    for (var property in obj){
        return false;
    }
    return true;
}

function showBlockSummary() {
    if ($(blockSummaryAttr) === null || $(blockSummaryAttr).length < 1) {
        $(resultSummaryAttr).append(blockSummaryHtml);
    }
}

function saveToHistory(blockCount) {
    if (blockCount > 0) {
        chrome.storage.local.get(total, function (result) {
            if (result[total] === undefined) {
                result[total] = 0;
            }
            result[total] += blockCount;
            chrome.storage.local.set(result);
        });
        chrome.storage.local.get(today, function (result) {
            if (result[today] === undefined) {
                result[today] = 0;
            }
            result[today] += blockCount;
            chrome.storage.local.set(result);
        });
    }
}

function block(dom) {
    var tmpBlock = 0;
    $.each(dom.children(), function(i, item) {
        if ($(item).attr('id') === undefined || $(item).attr('id').length > 3) {
            $(item).remove();
            blockRecord++;
            tmpBlock++;
        } else if ($(item).find("span[class='m']").text().indexOf('广告') != -1) {
            $(item).remove();
            blockRecord++;
            tmpBlock++;
        }
    });
    if ($(blockSummaryAttr) !== null && $(blockSummaryAttr).length > 0) {
        $(blockSummaryAttr).html(blockRecord);
    }
    window.setTimeout(function() {
        saveToHistory(tmpBlock);
    }, Math.floor(Math.random() * 1000));
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
    // chrome.storage.local.get(showBlockSummary, function (result) {
    //     if (result[showBlockSummary] === undefined || result[showBlockSummary] > 0) {
    //         var showBlockSummaryTimer = window.setInterval(function() {
    //             if ($(blockSummaryAttr) === null || $(blockSummaryAttr).length < 1) {
    //                 $(resultSummaryAttr).append(blockSummaryHtml);
    //             }
    //         }, 1000);
    //     }
    // });

    // if (window.localStorage.getItem('showBlockSummary') === 'true') {
    //     var showBlockSummaryTimer = window.setInterval("showBlockSummary()", 1000);
    // }
    block($(adAttr));
});
