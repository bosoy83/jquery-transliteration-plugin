Transliteration is the process where all letters get replaced by their adequate representatives, ie. all latin letters become cyrillic and vice versa. Not a big deal as long as you do have one-to-one letter transliteration.
However there are some specifics about the Serbian language (the one this plugin was originally developed for). For instance, cyrillic letter 'љ' in latin is written with two letters: 'lj', letter 'џ' is written as 'dž' and so on. Therefore, to perform adequate transliteration from latin to cyrillic and vice versa in Serbian language we need a little more than a simple letter-to-letter conversion.

The transliteration process is done in three steps. First step is preprocessing. Last step is postprocessing. Those two are the same, except for one takes place before letter-to-letter transliteration is performed and another one takes place after. Those methods are used to replace entities that are not 1:1 eg. with that you can replace whole words before main processing takes place or after it finishes. This process can be controlled with options.maps.char\_map\_name.multiPre (multiPost for postprocessing) arrays. These arrays should consist of two inner arrays of the same length. Each element of the first array will be replaced with an element from the second array. Note that this is done using regular expressions, so it is possible to use escape sequences in patterns and backreferences in replacements. Also, try to avoid too complex and too long arrays for pre and post processing since they have large impact on plugin performance.

Second step is the transliteration of single characters, and a workhorse for the transliteration itself. It will copy all the characters from the replacement string over corresponding characters from source string. It is pretty straightforward, ie. if you supply:
```
'abcde'
```
to be replaced by
```
'ABCDE'
```

you will get your text back with all capital letters a,b,c,d,e. Again, for best (fastest) results make sure that every letter of the first array in options.maps.char\_map\_name.charMap setting has its pair in second element of the same setting. Those characters are split one by one, so you can't use regex internals here.

Last step is postprocessing. The process is completely identical to preprocessing. Once we have done the majority of the transliteration, there might still be some characters left to change. That can be done with postprocessing.  For instance, when converting from latin to cyrillic, we have to make sure that all html entities (&nbsp; for instance) are left intact. That can be achieved by putting **&нбсп;** pattern and **&nbsp;** replacement in postprocessing option (options.maps.map\_name.multiPost).

Plugin will start from the element it is called upon. From there it will iteratively scan all child nodes for eventual text content and replace that content with transliterated one. Html attributes and tags themselves are left unchanged. You can transliterate a single element or whole page by invoking the plugin on body element. Performance is pretty satisfactory, since whole process takes less than another request to server to get transliterated page, and it does not consume server resources at all.