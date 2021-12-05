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
                <h1>포렌식 시나리오</h1>
                    <ul>
                        <li>
                        <a href = "/intro">HOME</a>
                        </li>
                        <li>
                        <a href ="/blist">BOARD</a>
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
                    </ul>
            </div>
        </nav>
        `;
    }
}