# Usage #

### Required files ###

To use the plugin, you should first include it on your page, in the **head** section:

```
<script type="text/javascript" src="http://mydomain.com/js/jquery-1.4.2-min.js"> </script>
<script type="text/javascript" src="http://mydomain.com/js/jquery.transliteration-min.js"> </script>
```

### Options ###

Default set of options for the plugin is:
```
  direction : 'c2l',
  transliterateFormValues : true,
  excludes : ['html','head','style','title','link','meta','script','object','iframe','canvas'],
    maps : {
      l2c : {
        charMap : ['abcdefghijklmnoprstuvzšđžčćABCDEFGHIJKLMNOPRSTUVZŠĐŽČĆ', 'абцдефгхијклмнопрстувзшђжчћАБЦДЕФГХИЈКЛМНОПРСТУВЗШЂЖЧЋ'],
        multiPre : [[], []],
        multiPost : [
['&\u043d\u0431\u0441\u043f;','&\u0430\u043c\u043f;', '\u043bј','\u043dј', '\u041bј', '\u041d\u0458', '\u041bЈ','\u041d\u0408','\u0434ж','\u0414\u0436','\u0414\u0416'], 
['&nbsp;', '&amp;', '\u0459', '\u045a', '\u0409', '\u040a', '\u0409', '\u040a', '\u045f', '\u040f', '\u040f']
]
      },
      c2l : {
        charMap : ['абцдефгхијклмнопрстувзшђжчћАБЦДЕФГХИЈКЛМНОПРСТУВЗШЂЖЧЋ', 'abcdefghijklmnoprstuvzšđžčćABCDEFGHIJKLMNOPRSTUVZŠĐŽČĆ'],
        multiPre : [[], []],
        multiPost : [['\u0459', '\u045a', '\u0409', '\u040a', '\u045f', '\u040f'], ['lj', 'nj', 'Lj', 'Nj', 'Dž', 'Dž']]
      },
      yu2ascii : {
        charMap : ['абцдефгхијклмнопрстувзшђжчћАБЦДЕФГХИЈКЛМНОПРСТУВЗШЂЖЧЋabcdefghijklmnoprstuvzšđžčćABCDEFGHIJKLMNOPRSTUVZŠĐŽČĆ',
'abcdefghijklmnoprstuvzsđzccABCDEFGHIJKLMNOPRSTUVZSĐZCCabcdefghijklmnoprstuvzsđzccABCDEFGHIJKLMNOPRSTUVZSĐZCC'],
        multiPre : [[], []],
        multiPost : [['\u0459', '\u045a', '\u0409', '\u040a', '\u045f', '\u040f', 'đ', 'Đ'], ['lj', 'nj', 'Lj', 'Nj', 'Dž', 'Dž', 'dj', 'Dj']]
        }
      }
```

Main option for controlling the type of transliteration is **direction**
The plugin comes with three possible transliteration directions:
  * c2l (Serbian cyrillic to latin transliteration)
  * l2c (Serbian latin to cyrillic transliteration)
  * yu2ascii (Serbian cyrillic and latin to ascii character set, removing all language-specific characters and replacing them with corresponding ascii letters)

**transliterateFormValues** serves to control whether the values in the form fields are transliterated as well or left intact

**excludes** is an array of tagNames to avoid while transliterating the DOM tree

**maps** is the core of the transliteration system. It is an object with following values:
  * **charMap** is an array with two string members. Those two members should be of the same length in order for transliteration to function properly. Each character from the first member will be transliterated to corresponding character (the one with the same index) from second member. If no corresponding replacement character is present, original character is preserved.
  * **multiPre** is two-dimensional array used for pre-processing of entities that are not 1:1. For instance, in Serbian lanugage, cyrillic letter љ is in latin presented as lj, Situations like these made 1:1 transliterations impossible, so we have pre-processing and post processing for those entities. Again, all members from first member of the multiPre array will be replaced with correspodning member from the second member of the multiPre array.
  * **multiPost** is the same thing as multiPre. Only difference is that these apply **after** 1:1 transliteration has taken place.

You might have noticed that **direction** option can have same named values as members of **map** hash. Therefore, adding new types of transliteration is easy. You should copy one of the **map** hash members and edit it to suit your needs. You can pass **map** along with **direction** option to use your custom transliteration logic. For more information about the transliteration internals, check Transliteration mechanism page.

### Example ###

Following code will result in three links that will allow whole page to be transliterated 3-way:

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
        <script src="jquery.transliterate.js"> </script>
    </head>
    <body>
        <textarea id="text_1" cols="30" rows="5">Lorem ipsum dolor sit amet persectetum indivuscim delleo oretum.</textarea>
        <input type="text" value="Лорем ипсум долор сит амет" />
        <a href="#" id="l1" onclick="$('body').transliterate({direction:'l2c'});">l2c (latin -> cyrillic)</a>
        <a href="#" id="l2" onclick="$('body').transliterate({direction:'c2l'});">c2l (cyrillic -> latin)</a>
        <a href="#" id="l3" onclick="$('body').transliterate({direction:'yu2ascii'});">yu2ascii</a>
        <br clear="all" />
        <div class="box">
            <h3>The standard Lorem Ipsum passage, used since the 1500s</h3>
            <p>"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            <h3>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h3>
            <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem ccusantium doloremque laudantium, totam 
rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni 
dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 
Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? 
Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui 
dolorem eum fugiat quo voluptas nulla pariatur?"</p>
            <h3>1914 translation by H. Rackham</h3>
            <p>"But I must explain to you how all this mistaken idea of denouncing 
pleasure and praising pain was born and 
I will give you a complete account of the system,  and expound the actual teachings of the great explorer of the truth, 
the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is 
pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. 
Nor again is there anyone who 
loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which
 toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical 
exercise, except to obtain some advantage from it? But who has any right to find fault with a man
who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that 
produces no resultant pleasure?"</p>
            <h3>Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h3>
            <p>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque 
corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
 officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
 Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere 
possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis 
aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
 tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores
 repellat."</p>
            <h3>1914 translation by H. Rackham</h3>
            <p>"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized
 by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound 
to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying 
through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when 
our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to
 be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of
 business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore
 always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures,
 or else he endures pains to avoid worse pains."</p>
        </div>
    </body>
</html>

```
