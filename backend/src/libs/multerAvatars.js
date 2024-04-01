const multer = require('multer');
const uuid = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
	destination: 'src/avatars',
	filename: (req, file, cb) => {
		cb(null, uuid.v4() + path.extname(file.originalname))
	}
})

module.exports = multer({storage});