module.exports = {
    HTML:function(title, list, body, control){
    return`
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <link rel="stylesheet" href="style.css">
        <meta charset="utf-8">
        </head>
        <body>
        </body>
        <h1><a href="/">BOARD</a></h1>
        <div class="container">
        ${list}
        ${body}
        ${control}
        </div>
        
        `;
    },
    list: function(filelist){
    var list = '<ul>';
    var i = 0;
    while(i<filelist.length){
        list = list + `<li><a href="/page/${filelist[i]}"> ${filelist[i]}</a></li>`;
        i = i+1;
    }
    list = list + '</ul>';
    return list;
    }
}