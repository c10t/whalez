var express = require('express');
var Promise = require('bluebird');
var mysql = require('mysql');
var redis = require('redis');
// var AWS = require('aws-sdk');

var router = express.Router();

// var getAll = require('./todo-service').getAll;

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

// var s3 = Promise.promisifyAll(new AWS.S3(s3config));

Promise.promisifyAll(redis.RedisClient.prototype);
var redisClient = redis.createClient({
  host : process.env.REDIS_HOST,
  port : process.env.REDIS_PORT
});

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

  redisClient.getAsync(id).then(response => {
    console.log("get: " + JSON.stringify(response));
    if (rersponse) {
      console.log("render from cache...");
      const row = JSON.parse(response);
      res.render('todos/show', { row: row, imageUrlEndpoint: imageUrlEndpoint });
    } else {
      pool.queryAsync('SELECT * FROM todos WHERE id = ?', [id])
      .then(rows => {
        const row = rows[0];
        if (!row) return res.sendStatus(404);

        res.render('todos/show', { row: row });
      })
      .catch(error => next(error));
    }
  })
  .catch(err => { console.log("redis error:" + err); });
});

/* Create or Edit Todo */
// router.post('/edit'. upload.single('image'), (req, res, next) => {});

/* Delete Todo */
// router.delete('/:id', (req, res, next) => {});

module.exports = router;
