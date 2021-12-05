var express = require('express')
var app = express()
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var main_form = require('./lib/main_form.js');
var template = require('./lib/template.js');
var sanitizeHtml = require('sanitize-html');
 
//route, routing
//app.get('/', (req, res) => res.send('Hello World!'))

app.use(express.static(__dirname + "/static"));

app.get('/', function(request, response) { 
  response.redirect('/intro');
});

app.get('/intro', function(request, response) { 
    var mainform = main_form.screen();
    var intro = mainform  + `
    <div class="container">
      <h3>포렌식 시나리오를 작성하는 곳입니다.</h3>
      <p>
      </p>
    </div>
    `;
    response.send(intro);
});

app.get('/blist', function(request, response) { 
  fs.readdir('./data', function(error, filelist){
    var mainform = main_form.screen();
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(filelist);
    var html = template.HTML(title, list,
      '',
      `<a href="/create">create</a>`
    ); 
    var blist = mainform + html;
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
      var list = template.list(filelist);
      var html = template.HTML(sanitizedTitle,'',
        `<h3>${sanitizedTitle}</h3>${sanitizedDescription}<br>`,
        `<a href="/create">create</a>
          <a href="/update/${sanitizedTitle}">update</a>
          <form action="/delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
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
    var mainform = main_form.screen();
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
    var blist = mainform + html;
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
        `<a href="/create">create</a> <a href="/update/${title}">update</a>`
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
    var mainform = main_form.screen();
    var profile = mainform  + 
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
      `;
    response.send(profile);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});