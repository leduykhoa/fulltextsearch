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
    var strOrigin = str.split('');
    str = strOrigin.slice();
    // Get matrix characters
    for (var i = 0; i < str.length; i++) {
        var char = str[i];
        for (var y = 0; y < unicodeArray.length; y++) {
            var unicode = unicodeArray[y];
            if (unicode.length == 1) continue;
            if (unicode.indexOf(char) >= 0) {
                strArray.push({index: i, unicode: unicode});
                break;
            }
        }
    }

    var strReturn = [];
    var strLength = strArray.length;

    // Add entity
    function addRegularExpression(str) {
        // Special characters meaning in regular expressions
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
        str = str.replace(/\\/g, '\\\\');
        str = str.replace(/\|/g, '\\\|');
        str = str.replace(/\(/g, "\\\(");
        str = str.replace(/\)/g, "\\\)");
        str = str.replace(/\[/g, "\\\[");
        str = str.replace(/\+/g, "\\\+");
        str = str.replace(/\./g, "\\\.");
        str = str.replace(/\*/g, "\\\*");
        str = str.replace(/\?/g, "\\\?");

        if (strReturn.indexOf(str) === -1) {
            strReturn.push(str);
        }
    }

    // Set item origin(Of course)
    addRegularExpression(strOrigin.join(''));

    if (strLength == 3) {
        // Setup Matrix AxBxC
        for (var indexRowOne = 0; indexRowOne < strLength; indexRowOne++) {
            var rowOne = strArray[indexRowOne];
            for (var indexRowTwo = 0; indexRowTwo < strLength; indexRowTwo++) {
                var rowTwo = strArray[indexRowTwo];
                for (var indexRowThree = 0; indexRowThree < strLength; indexRowThree++) {
                    var rowThree = strArray[indexRowThree];
                    // Go to all items
                    for (var a = 0; a < rowOne.unicode.length; a++) {
                        for (var b = 0; b < rowTwo.unicode.length; b++) {
                            for (var c = 0; c < rowThree.unicode.length; c++) {
                                str = strOrigin.slice();
                                // Thinking
                                str[rowOne.index] = rowOne.unicode[a];
                                str[rowTwo.index] = rowTwo.unicode[b];
                                str[rowThree.index] = rowThree.unicode[c];
                                addRegularExpression(str.join(''));
                            }
                        }
                    }
                }
            }
        }
    } else if (strLength == 2) {
        // Setup Matrix AxB
        for (var indexRowOne = 0; indexRowOne < strLength; indexRowOne++) {
            var rowOne = strArray[indexRowOne];
            for (var indexRowTwo = 0; indexRowTwo < strLength; indexRowTwo++) {
                var rowTwo = strArray[indexRowTwo];
                // Go to all items
                for (var a = 0; a < rowOne.unicode.length; a++) {
                    for (var b = 0; b < rowTwo.unicode.length; b++) {
                        str = strOrigin.slice();
                        // Thinking
                        str[rowOne.index] = rowOne.unicode[a];
                        str[rowTwo.index] = rowTwo.unicode[b];
                        addRegularExpression(str.join(''));
                    }
                }
            }
        }
    } else if (strLength == 1) {
        // Loop
        for (var indexRowOne = 0; indexRowOne < strLength; indexRowOne++) {
            var rowOne = strArray[indexRowOne];
            // Go to all items
            for (var a = 0; a < rowOne.unicode.length; a++) {
                str = strOrigin.slice();
                // Thinking
                str[rowOne.index] = rowOne.unicode[a];
                addRegularExpression(str.join(''));
            }
        }
    }

    return strReturn.join('|');
}

fullTextSearchVi = function () {
    var queries = [];
    if (arguments[0] !== undefined && arguments[0] !== null && arguments[0] !== '') {
        // Get words by string
        var str = arguments[0].trim().split(' ');
        for (var i = 0; i < str.length; i++) {
            var temp = str[i];
            // Render word by characters same same
            queries.push(detectString(temp));
        }
    }

    return queries.join('|');
};

module.exports = fullTextSearchVi;
