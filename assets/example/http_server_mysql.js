const http = require('http');
const mysql = require('mysql');

var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'poapper_backend'
});

const server = http.createServer((req, res) => {
  const method = req.method;

  if(method == 'GET'){
    const query_id = req.url.split('/')[1];
    if(query_id == ''){
      db.query(`SELECT * FROM books`, (err, results) => {
        if(err) throw err;
        res.write(JSON.stringify(results));
        res.end();
      });
    }else {
      db.query(`SELECT * FROM books WHERE id=${query_id}`, (err, results) => {
        if(err) throw err;
        res.write(JSON.stringify(results));
        res.end();
      });
    }
  }else if(method == 'DELETE'){
    const query_id = req.url.split('/')[1];
    db.query(`DELETE FROM books WHERE id=${query_id}`, (err, results) => {
      res.end();
    })
  }

  req.on('data', data => {
    const body = JSON.parse(data);
    console.log(body)

    if(method == 'POST'){
      db.query(`INSERT INTO books (title, author, created) VALUES ('${body.title}', '${body.author}', NOW())`, (err, results) => {
        if(err) throw err;
        res.end();
      });
    }else if(method == 'PUT'){
      const query_id = req.url.split('/')[1];
      db.query(`UPDATE books SET title='${body.title}', author='${body.author}', created=NOW() WHERE id=${query_id}`, (err, results) => {
        if(err) throw err;
        res.end();
      });
    }
  })
})

server.listen(8080)

server.on('listening', () => {
  console.log("server is running on 8080 port.")
})