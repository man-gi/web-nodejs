var express = require('express')
var app = express()
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var template = require('./lib/template.js');
var sanitizeHtml = require('sanitize-html');

const port = process.env.PORT;

//route, routing
//app.get('/', (req, res) => res.send('Hello World!'))

app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/data"));

app.get('/', function(request, response) { 
  response.redirect('/intro');
});

app.get('/intro', function(request, response) { 
  var screen = template.screen();
  var footer = template.footer();
    var intro = screen  + `
    <div class="container">
      <h3>포렌식 시나리오를 작성하는 곳입니다.</h3>
      <p>
      </p>
    </div>
    `+footer;
    response.send(intro);
});

app.get('/blist', function(request, response) { 
  fs.readdir('./data', function(error, filelist){
    var screen = template.screen();
    var footer = template.footer();
    var list = template.list(filelist);
    var html = template.HTML('', list,
      '',
      `<a href="/create">글쓰기</a>`
    ); 
    var blist = screen + html + footer;
    response.send(blist);
  });
});

app.get('/page/:pageId', function(request, response) { 
  fs.readdir('./data', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description);
      var html = template.HTML(sanitizedTitle,'',
        `<h3>${sanitizedTitle}</h3>${sanitizedDescription}<br>`,
        `<a href="/create">글쓰기</a>
          <a href="/update/${sanitizedTitle}">업데이트</a>
          <a href="/blist">뒤로가기</a>
          <form action="/delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="삭제">
          </form>
          `
      );
      response.send(html);
    });
  });
});

app.get('/create', function(request, response){
  fs.readdir('./data', function(error, filelist){
    var title = 'WEB - create';
    var footer = template.footer();
    var screen = template.screen();
    var html = template.HTML(title, '', `
      <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    `, '');
    var blist = screen + html + footer;
    response.send(blist);
  });
});

app.post('/create_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location: `/blist`});
        response.end();
      })
  });
});

app.get('/update/:pageId', function(request, response){
  fs.readdir('./data', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId;
      var list = template.list(filelist);
      var html = template.HTML(title, list,
        `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `<a href="/create">글쓰기</a> <a href="/update/${title}">업데이트</a>`
      );
      response.send(html);
    });
  });
});

app.post('/update_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function(error){
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/blist`});
          response.end();
        })
      });
  });
});

app.post('/delete_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function(error){
        response.writeHead(302, {Location: `/blist`});
        response.end('success');
      })
  });
});

app.get('/profile', function(request, response) { 
  var screen = template.screen();
  var footer = template.footer();
    var profile = screen  + 
    `<div class="container">
      <h1>ABOUT ME</h1>
        <h2 id = "abouth2"> 
          안녕하세요
          <br>
          아직 포렌식관련 공부중입니다.
        </h2>
          <div class ="p">
          군산대학교 컴퓨터공학부 재학중인 전만기이라고 합니다.
          </div>
      </div>
      `+ footer;
    response.send(profile);
});


app.get('/lonin', function(request, response) { 
  var screen = template.screen();
  var footer = template.footer();
    var profile = screen  +
    ` <div class="container">
      <h3>로그인</h3>
      <form method="post" action="">
      <div class="input-box"> 
      <input id="username" type="text" name="username" placeholder="아이디"> 
      <label for="username">아이디</label> 
      </div> 
      <div class="input-box"> 
      <input id="password" type="password" name="password" placeholder="비밀번호"> 
      <label for="password">비밀번호</label> 
      </div>  
      <input type="submit" value="로그인">
      <input type="reset" value="초기화">
      </form>
      </div>
    `+ footer;
    response.send(profile);
});

app.listen(port, function() {
  console.log('Example app listening on port 3000!')
});