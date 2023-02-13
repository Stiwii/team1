const multer = require('multer')

const multerPublicationsPhotos = multer({
  dest: 'uploads/publications/photos/',
  limits: {
    fileSize: 3145728, // 3 Mb
  },
  fileFilter: (request, file, cb) => {
    //In case of multer not implement the escenario, put this
    request.on('aborted', () => {
      file.stream.on('end', () => {
        callback(new Error('Cancel Photo Upload'), false);
      });
      file.stream.emit('end');
    })
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
})

module.exports = {
  multerPublicationsPhotos
}