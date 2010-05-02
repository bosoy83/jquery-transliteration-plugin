/**
 *
 * @description jQuery transliterate plugin
 * @license MIT <http://opensource.org/licenses/mit-license.php>
 * @author Dino Ivankov <dinoivankov@gmail.com>
 * @version 1.0
 * http://code.google.com/p/jquery-transliteration-plugin/
 */
;
(function($) {
    $.fn.transliterate = function(opts) {
        var options = $.extend({}, $.fn.transliterate.defaults, opts);
        return this.each(function() {
            var count = this.childNodes.length;
            if (isEligible(this)){
                if (count && $(this).attr('tagName').toLowerCase() != 'textarea'){
                    while (count--) {
                        var node = this.childNodes[count];
                        if (node.nodeType === 1) {
                            $(node).transliterate(options);
                        } else if (node.data){
                            node.data = transliterateText(node.data);
                        };
                    };
                } else {
                    if (options.transliterateFormValues && $(this).val() && ($(this).attr('tagName').toLowerCase() == 'input' || $(this).attr('tagName').toLowerCase() == 'textarea')){
                        $(this).val(transliterateText($(this).val()));
                    } else if ($(this).html() != "") {
                        $(this).html(transliterateText($(this).html()));
                    };
                };
            };
        });
        /**
         * Takes element or tagName string as the param, checks against the exclude lists and returns false if element is not to be transliterated.
         * @param mixed el
         * @return boolean
         */
        function isEligible(el){
            var result = true;
            var tag;
            if (typeof el != "string"){
                tag = $(el).attr('tagName').toLowerCase();
            } else {
                tag = el.toLowerCase();
            }
            for(var i=0;i<options.excludes.length;i++){
                if (options.excludes[i] == tag){
                    result = false;
                }
            }
            return result;
        };
        /**
         * Takes text string as parameter and transliterates it based on set options
         * @param String text
         * @return String transliterated text
         */
        function transliterateText(text){
            text = new String(text);
            if (text){
                /*
                 * preprocessing - performing all multi-char replacements before 1:1 transliteration based on options
                 */
                var regexes = options.maps[options.direction].multiPre;
                if (regexes[0]){
                    for(i=0;i<regexes[0].length;i++){
                        var regex = new RegExp(regexes[0][i]);
                        while(regex.test(text)){
                            text = text.replace(regex, regexes[1][i]);
                        };
                    };
                };
                /*
                 * 1:! transliteration - transliterating the text using character maps supplied in options
                 */
                var fromChars = options.maps[options.direction].charMap[0].split('');
                var toChars = options.maps[options.direction].charMap[1].split('');
                var charMap = {};
                for(var i = 0; i < fromChars.length; i++) {
                    var c = i < toChars.length ? toChars[i] : fromChars[i];
                    charMap[fromChars[i]] = c;
                };
                var re = new RegExp(fromChars.join("|"), "g");
                text = text.replace(re, function(c) {
                    if (charMap[c]){
                        return charMap[c];
                    } else {
                        return c;
                    };
                });

                /*
                 * postrocessing - performing all multi-char replacements after 1:1 transliteration based on options
                 */
                regexes = options.maps[options.direction].multiPost;
                if (regexes[0]){
                    for(i=0;i<regexes[0].length;i++){
                        regex = new RegExp(regexes[0][i]);
                        while(regex.test(text)){
                            text = text.replace(regex, regexes[1][i]);
                        };
                    };
                };
            };
            return text;
        };
    };
    /**
     * default option set for transliterate plugin
     */
    $.fn.transliterate.defaults = {
        direction : 'c2l', 
        transliterateFormValues : true,
        excludes : ['html','head','style','title','link','meta','script','object','iframe','canvas'],
        maps : {
            l2c : {
                charMap : ['abcdefghijklmnoprstuvzšđžčćABCDEFGHIJKLMNOPRSTUVZŠĐŽČĆ', 'абцдефгхијклмнопрстувзшђжчћАБЦДЕФГХИЈКЛМНОПРСТУВЗШЂЖЧЋ'],
                multiPre : [[], []],
                multiPost : [['&\u043d\u0431\u0441\u043f;', '&\u0430\u043c\u043f;',  '\u043bј', '\u043dј', '\u041bј', '\u041d\u0458', '\u041bЈ', '\u041d\u0408', '\u0434ж', '\u0414\u0436', '\u0414\u0416'], ['&nbsp;', '&amp;', '\u0459', '\u045a', '\u0409', '\u040a', '\u0409', '\u040a', '\u045f', '\u040f', '\u040f']]
            },
            c2l : {
                charMap : ['абцдефгхијклмнопрстувзшђжчћАБЦДЕФГХИЈКЛМНОПРСТУВЗШЂЖЧЋ', 'abcdefghijklmnoprstuvzšđžčćABCDEFGHIJKLMNOPRSTUVZŠĐŽČĆ'],
                multiPre : [[], []],
                multiPost : [['\u0459', '\u045a', '\u0409', '\u040a', '\u045f', '\u040f'], ['lj', 'nj', 'Lj', 'Nj', 'Dž', 'Dž']]
            },
            yu2ascii : {
                charMap : ['абцдефгхијклмнопрстувзшђжчћАБЦДЕФГХИЈКЛМНОПРСТУВЗШЂЖЧЋabcdefghijklmnoprstuvzšđžčćABCDEFGHIJKLMNOPRSTUVZŠĐŽČĆ','abcdefghijklmnoprstuvzsđzccABCDEFGHIJKLMNOPRSTUVZSĐZCCabcdefghijklmnoprstuvzsđzccABCDEFGHIJKLMNOPRSTUVZSĐZCC'],
                multiPre : [[], []],
                multiPost : [['\u0459', '\u045a', '\u0409', '\u040a', '\u045f', '\u040f', 'đ', 'Đ'], ['lj', 'nj', 'Lj', 'Nj', 'Dž', 'Dž', 'dj', 'Dj']]
            }
        }
    };
})(jQuery);