var express = require('express');
var Promise = require('bluebird');
var mysql = require('mysql');
var router = express.Router();


const mockrows = [
  {
    id: 1,
    title: 'hello world'
  },
  {
    id: 2,
    title: 'fix a bit'
  },
  {
    id: 3,
    title: 'integration'
  }
]

router.get('/', (req, res, next) => {
  res.render('todos/index', { rows: mockrows });
});

/*
var pool = Promise.promisifyAll(mysql.createPool({
  connectionLimit : 3,
  host            : process.env.MYSQL_HOST,
  port            : process.env.MYSQL_PORT,
  user            : process.env.MYSQL_USER,
  password        : process.env.MYSQL_PASS,
  database        : process.env.MYSQL_DB,
}));

router.get('/', (req, res, next) => {
  pool.queryAsync('SELECT * FROM todos')
  .then(rows => res.render('todos/index', { rows: rows }))
  .catch(error => {
    console.log('show all:' + error);
    return next(error);
  })
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  pool.queryAsync('SELECT * FROM todos WHERE id = ?', [id])
  .then(rows => {
    const row = rows[0];
    if (!row) return res.sendStatus(404);

    res.render('todos/show', { row: row });
  })
  .catch(error => next(error));
});
*/
module.exports = router;
