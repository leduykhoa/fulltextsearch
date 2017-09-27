/**
 * Copyright © 2009-2017 Lê Duy Khoa. All rights reserved.
 * Mail: leduykhoa060690@gmail.com
 * Skype: leduykhoa060690
 * Website: web-fast.com
 * Mobile: +84973421508
 * Date: 2017/09/27
 * Time: 08:15
 */

function getUnicode() {
    // http://vietunicode.sourceforge.net/charset/vietalphabet.html
    var unicode = [
        'aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬ',
        'bB',
        'cC',
        'dDđĐ',
        'eEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ',
        'fF',
        'gG',
        'hH',
        'iIìÌỉỈĩĨíÍịỊ',
        'jJ',
        'kK',
        'lL',
        'mM',
        'nN',
        'oOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢ',
        'pP',
        'qQ',
        'rR',
        'sS',
        'tT',
        'uUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰ',
        'vV',
        'wW',
        'xX',
        'yYỳỲỷỶỹỸýÝỵỴ',
        'zZ'
    ];
    var unicodeArray = [];
    for (var i = 0; i < unicode.length; i++) {
        var temp = [];
        // Get characters same same(Remove characters is upper case)
        unicode[i]
            .split('')
            .map(function (item) {
                if (temp.indexOf(item.toLowerCase()) == -1) {
                    temp.push(item.toLowerCase());
                    return item.toLowerCase();
                }
                return null;
            });
        unicodeArray.push(temp);
    }
    return unicodeArray;
}

function detectString() {
    var str = arguments[0];
    var unicodeArray = getUnicode();
    var strArray = [];
    var strOrigin = str.toLowerCase().split('');
    str = str.toLowerCase().split('');
    // Get matrix characters
    for (var i = 0; i < str.length; i++) {
        var char = str[i];
        for (var y = 0; y < unicodeArray.length; y++) {
            var unicode = unicodeArray[y];
            if (unicode.length == 1) continue;
            if (unicode.indexOf(char)>=0) {
                strArray.push({index: i, unicode: unicode});
                break;
            }
        }
    }
    var strReturn = [];
    // Set item origin(Of course)
    strReturn.push(strOrigin.join(''));
    if(strArray.length>0){
        for (var i = 0; i < strArray.length; i++) {
            var rowI = strArray[i];
            for (var y = 0; y < strArray.length; y++) {
                var rowY = strArray[y];
                for (var k = 0; k < rowI.unicode.length; k++) {
                    for (var j = 0; j < rowY.unicode.length; j++) {
                        str = strOrigin.slice();
                        // Thinking
                        str[rowI.index] = rowI.unicode[k];
                        str[rowY.index] = rowY.unicode[j];
                        strReturn.push(str.join(''));
                    }
                }
            }
        }
    }
    return strReturn.join('|');
}

fullTextSearchVi = function () {
    var queries = [];
    if (arguments[0] !== undefined && arguments[0] !== null && arguments[0] !== '') {
        // Get word by string
        var str = arguments[0].split(' ');
        for (var i = 0; i < str.length; i++) {
            var temp = str[i];
            // Render word by characters same same
            queries.push(detectString(temp));
        }
    }

    return queries.join('|');
};

module.exports = fullTextSearchVi;
