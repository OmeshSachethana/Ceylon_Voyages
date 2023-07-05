const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    console.log(`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000000000000
  }
})
