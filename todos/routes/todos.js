var express = require('express');
var Promise = require('bluebird');
var mysql = require('mysql');
var AWS = require('aws-sdk');
var router = express.Router();

/*
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
*/

var pool = Promise.promisifyAll(mysql.createPool({
  connectionLimit : 3,
  host            : process.env.MYSQL_HOST,
  port            : process.env.MYSQL_PORT,
  user            : process.env.MYSQL_USER,
  password        : process.env.MYSQL_PASS,
  database        : process.env.MYSQL_DB,
}));

var s3config = {
  accessKey : process.env.AWS_ACCESS_KEY,
  secretKey : process.env.AWS_SECRET_KEY
};

const s3bucket = process.env.AWS_S3_BUCKET;
const imageUrlEndpoint = process.env.IMAGE_ENDPOINT;

var s3 = Promise.promisifyAll(new AWS.S3(s3config));

// Error Definition
class InsertTodoError extends Error {
  constructor ( message, extra ) {
    super()
    Error.captureStackTrace( this, this.constructor )
    this.name = 'InsertTodoError'
    this.message = message
    if ( extra ) this.extra = extra
  }
}

class DeleteTodoNotFoundError extends Error {
  constructor ( message, extra ) {
    super()
    Error.captureStackTrace( this, this.constructor )
    this.name = 'DeleteTodoNotFoundError'
    this.message = message
    if ( extra ) this.extra = extra
  }
}

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

/* Create or Edit Todo */
router.post('/edit'. upload.single('image'), (req, res, next) => {});

/* Delete Todo */
router.delete('/:id', (req, res, next) => {});

module.exports = router;
