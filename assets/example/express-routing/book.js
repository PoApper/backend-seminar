const express = require('express')
const mysql = require('mysql')
const router = express.Router();

const db = mysql.createConnection({
  host:'localhost',
  user:'root',  
  password:'bluehorn07',
  database:'poapper_backend'
});

// GET whole table
router.get("", (req, res) => {
  db.query(`SELECT * FROM books`, (err, data) => {
    if(err) throw err;
    res.write(JSON.stringify(data));
    res.end();
  });
});

// GET by id
router.get("/:id", (req, res) => {
  const query_id = req.params.id;
  db.query(`SELECT * FROM books WHERE id=${query_id}`, (err, data) => {
    if(err) throw err;
    res.write(JSON.stringify(data));
    res.end();
  });
})

// POST
router.post("", (req, res) => {
  const body = req.body;
  db.query(`INSERT INTO books (title, author, created) VALUES ('${body.title}', '${body.author}', NOW())`, (err, data) => {
        if(err) throw err;
        res.end();
      });
});

// PUT
router.put("/:id", (req, res) => {
  const body = req.body;
  const query_id = req.params.id;
  db.query(`UPDATE books SET title='${body.title}', author='${body.author}', created=NOW() WHERE id=${query_id}`, (err, data) => {
    if(err) throw err;
    res.end();
  });
})

// DELETE
router.delete("/:id", (req, res) => {
  const query_id = req.params.id;
  db.query(`DELETE FROM books WHERE id=${query_id}`, (err, data) => {
    if(err) throw err;
    res.end();
  })
})

module.exports = router;
