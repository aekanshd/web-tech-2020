const multer = require('multer');
const upload = multer({
	dest: 'multer_temp/',
});
module.exports = (router) => {
	var mainController = require('../controllers/mainController');
	// const utils = require('../controllers/utils')
	// var main = "/main"

	// router.get(main+'/path/:param', utils.middleWare, main.finalController)

	router.get('/', mainController.home);
	router.post('/user', mainController.fetchUser);
	router.options('/user', (req, res, next) => res.status(200).send({}));
	router.put('/user', mainController.createUser);
	router.delete('/user/:username', mainController.deleteUser);
	router.get('/user/books/:username', mainController.fetchUserBooks);
	router.post('/validUserName', mainController.validateUsername);

	// router.get('/book', mainController.fetchBook)
	// router.post('/book', mainController.storeBook)
	router.get('/book/search', mainController.searchBooks); // for results using q
	router.get('/book/', mainController.fetchBook); // for individual using _id

	router.get('/storeHistory', mainController.storeHistory);
	router.get('/recommend', mainController.recommendBooks);

	router.post('/image', upload.single('image'), mainController.storeImage);
	router.get('/image', mainController.fetchImage);
	router.delete('/image', mainController.deleteImage);
};
