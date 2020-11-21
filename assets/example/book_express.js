const express = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'poapper_backend'
});

const app = express();
app.use(express.json())
app.get("", (req, res) => {
  res.send("Hello Express!");
})

// GET whole table
app.get("/book", (req, res) => {
  db.query(`SELECT * FROM books`, (err, data) => {
    if(err) throw err;
    res.write(JSON.stringify(data));
    res.end();
  });
});

// GET by id
app.get("/book/:id", (req, res) => {
  const query_id = req.params.id;
  db.query(`SELECT * FROM books WHERE id=${query_id}`, (err, data) => {
    if(err) throw err;
    res.write(JSON.stringify(data));
    res.end();
  });
})

// POST
app.post("/book", (req, res) => {
  const body = req.body;
  db.query(`INSERT INTO books (title, author, created) VALUES ('${body.title}', '${body.author}', NOW())`, (err, data) => {
        if(err) throw err;
        res.end();
      });
});

// PUT
app.put("/book/:id", (req, res) => {
  const body = req.body;
  const query_id = req.params.id;
  db.query(`UPDATE books SET title='${body.title}', author='${body.author}', created=NOW() WHERE id=${query_id}`, (err, data) => {
    if(err) throw err;
    res.end();
  });
})

// DELETE
app.delete("/book/:id", (req, res) => {
  const query_id = req.params.id;
  db.query(`DELETE FROM books WHERE id=${query_id}`, (err, data) => {
    if(err) throw err;
    res.end();
  })
})

app.listen(8080, () => console.log("Server is listening on 8080 port..."));
