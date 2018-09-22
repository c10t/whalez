var Promise = require('bluebird');
var crypto = require('crypto');

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

function getAll() {
  return 0
}

function editTodo(editId, title) {
  const id = parseInt(editId, 10);
  if (!Number.isInteger(id) || id <= 0) {
    return 400
  }

  Promise.resolve()
    .then(() => pool.getConnectionAsync())
    .then(connection => {
      var connectAsync = Promise.promisifyAll(connection);
      connectAsync.beginTransactionAsync()
        .then(() => handleUploadImage())
        .then(data => {
          console.log("result of S3: " + JSON.stringify(data));
          var updateData = { title: title };
          if (data && data.Location) {
            const imageURL = url.parse(data.Location);
            updateData['image_url'] = imageURL.pathname;
          }
          return connectAsync
            .queryAsync("UPDATE todos SET ? WHERE id = ?", [updateData, id])
        })
        .then(results => {
          if (results.affectedRows != 1) {
            console.log("nothing updated");
            connection.rollback();
            return res.sendStatus(400);
          }

          connection.commit();
          res.redirect('/todos/' + id);
        })
        .catch(err => {
          console.log("edit: " + err);
          connection.rollback();
        })
    })
    .catch(err => {});
}

function handleUploadImage(req) {
  if (!req.file) {
    return null;
  }
  
  const buffer = readChunk.sync(req.file.path, 0, req.file.size);
  const uploadFileType = fileType(buffer);
  console.log("type: " + JSON.stringify(uploadFileType));

  if (!uploadFileType || !uploadFileType.ext) {
    return null;
  }
  
  const datetime = (new Date()).getTime();
  const randomStr = crypto.randomBytes(8).toString('hex');
  const ext = uploadFileType.ext;
  const fileName = datetime + '-' + randomStr + '.' + ext;
  console.log("fileName: " + fileName);
  return s3.upload({
    Bucket: s3bucket,
    Key: fileName,
    Body: buffer,
    ACL: 'public-read'
  });
}


module.exportss = {
  editTodo: editTodo
};
