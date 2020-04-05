const multer =  require("multer")
const upload = multer({
	dest: "/temp"
  });
module.exports = (router) => {

	var mainController = require('../controllers/mainController')
	// const utils = require('../controllers/utils')
	// var main = "/main"

	// router.get(main+'/path/:param', utils.middleWare, main.finalController)

	router.get('/', mainController.home)
	router.put('/user',mainController.createUser)
	router.post('/validUserName',mainController.validateUsername)
	router.post('/user',mainController.fetchUser)
	router.delete('/user/:username',mainController.deleteUser)
	router.post('/book',mainController.storeBook)
	router.get('/book',mainController.fetchBook)
	router.post('/image',upload.single("image"),mainController.storeImage)
	router.get('/image',mainController.fetchImage)
}