// const multer = require('multer')
// const path = require('path')
// const uploadDir = path.join(__dirname, '../../public/img')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir)
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname)
//     const name = path.basename(file.originalname, ext)
//     const safeName = name.replace(/\s+/g, '-').toLowerCase()

//     cb(null, `${safeName}-${Date.now()}${ext}`)
//   }
// })

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true)
//     } else {
//       cb(new Error('Chỉ được upload ảnh!'), false)
//     }
//   }
// })

// module.exports = upload

const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const cloudinary = require('../../config/db/cloudinary')

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',
    public_id: (req, file) =>
      `${Date.now()}-${file.originalname.split('.')[0]}`,
  },
})

module.exports = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files allowed'))
    }
    cb(null, true)
  },
})