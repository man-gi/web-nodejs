module.exports = {
    screen: function(){
        return`<!DOCTYPE html>
            <html lang="en">
            <head>
            <title>EROOR</title>
            <meta charset="utf-8">
            <link rel="stylesheet" href="style.css">
            </head>
            <body>
            <nav class = "nav">
                <div class= "menu">
                <h1>포렌식 시나리오 <img src="icon1.png" id = mainlmage width="40">
                <script>
                var index = 0;
                var mylmage = document.getElementById("mainlmage");
                var imageArray = ["icon1.png", "icon2.png", "icon3.png"];
                function slideShow(){
                    mylmage.setAttribute("src", imageArray[index]);
                    index++;
                    if(index >= imageArray.length){
                        index = 0;
                    }
                }
                setInterval(slideShow, 1000);
                </script></h1>
                        <ul>
                            <li>
                            <a href = "/intro">HOME</a>
                            </li>
                            <li>
                            <a href ="/tensorflow">AI</a>
                            </li>
                            <li>
                            <a href ="/blist">POST</a>
                            </li> 
                            <li>
                            <a href ="/profile">AUBOUTME</a>
                            </li>
                            <li>
                            <li>
                            <form class="navbar-form navbar-left"action="/?id=search">
                            <div class="form-group">
                            <input type="text" class="form-control"placeholder="Search" name="search">
                            <button type="submit" class="btn-default">검색</button>
                            </div>
                            </form>
                            </li>
                            <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
                            <li><a href="/login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
                        </ul>
                </div>
            </nav>
            `;
    },
    HTML: function(title, list, body, control){
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
        <h1>게시판</h1>
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
        list = list + `<li><a href="/page/${filelist[i]}">${[i+1]}. ${filelist[i]}</a></li>`;
        i = i+1;
    }
    list = list + '</ul>';
    return list;
    },

    footer: function(){
        return`
        <dir class = footer_v>
            <p> @mangi <a href = "https://github.com/man-gi/web" > code  </a></p>
        </dir>
        `
    }
}