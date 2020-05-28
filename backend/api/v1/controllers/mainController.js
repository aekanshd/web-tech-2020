const path = require('path')
const fs = require('fs')
const model = require('../models/db.js')
const request = require('request-promise')
const url = require('url');
var $ = require('cheerio');
let query = ''
const {spawn} = require('child_process');
const profiles_dir = __dirname + "images/profiles/"
const books_dir = __dirname + "images/books/"
const history_csv = path.resolve(path.join("../", "history.csv"));
console.log(history_csv);
var dataArray = [];
user = model.user
book = model.book
image = model.image
exports.home = (req, res, next) => {
	res.send("Hello Team 2020!")
}

exports.storeHistory = (req, res, next) =>{
	user = req.body.username;
	book = req.body.isbn;
	let { PythonShell } = require('python-shell')
	console.log("Hello 1");

	console.log("Hello 2");

	let options = {
		mode: 'text',
		pythonPath: process.env.PYTHON_EXE_LOCATION,
		pythonOptions: ['-u'], // get print results in real-time
		scriptPath: process.env.PYTHON_FILE_LOCATION,
		args:[user, book]
		// args: ['value1', 'value2', 'value3']
	};
	console.log(options.pythonPath);
	console.log(options.scriptPath);
	PythonShell.run('storehistory.py', options, function (err, results) {
		if (err) throw err;
		// results is an array consisting of messages collected during execution
		console.log('results: %j', results);
		return res.status(200).send(results);
	});
	return;


}

exports.validateUsername = (req, res, next) => {
	user.find({ username: req.body.username }, (err, users) => {
		if (err) {
			console.log("Error :,\n", err);
			return res.status(500).send({ error: "Internal Error..." })
		}
		if (users.length > 0) {
			console.log("Error : Username Already Used");
			return res.status(400).send({ error: "Username Already Used.." })
		}
	})
	return res.status(200).send({})
}

exports.createUser = (req, res, next) => {

	newUser = new user({
		username: req.body.username,
		password: req.body.password,
		name: req.body.name,
		email: req.body.email,
		registerDate: req.body.registerDate,
		interests: req.body.interests,
		imageString: req.body.imageString,
		purchases: []
	})
	newUser.save(err => {
		if (err) {
			console.log("Error : Failed to create record,\n", err);
			return res.status(500).send({ error: "Internal Error, Failed to create record..." })
		}
	});
	return res.status(200).send({})
}

exports.fetchUser = (req, res, next) => {
	user.find({ username: req.body.username }, (err, users) => {
		if (err) {
			console.log("Error :,\n", err);
			return res.status(500).send({ error: "Interal Error..." })
		}
		if (users.length == 0) {
			console.log("Error : Invalid Username");
			return res.status(404).send({ error: "Invalid Username" })
		}
		userData = users[0]
		if (userData.password != req.body.password) {
			console.log("Wrong Password...")
			return res.status(403).send({ error: "Wrong Password..." })
		}
		return res.status(200).send({
			username: userData.username,
			name: userData.name,
			email: userData.email,
			registerdate: userData.registerDate,
			interests: userData.interests,
			purchases: userData.purchases,
			imageString: userData.imageImage
		})
	})
}

exports.deleteUser = (req, res, response) => {
	user.find({ username: req.params.username }, (err, users) => {
		if (err) {
			console.log("Error :,\n", err);
			return res.status(500).send({ error: "Interal Error..." })
		}
		if (users.length == 0) {
			console.log("Error : Invalid Username");
			return res.status(404).send({ error: "Invalid Username" })
		}
		user.deleteOne({ _id: users[0]._id }, (err, users) => {
			if (err) {
				console.log("Error :,\n", err);
				return res.status(500).send({ error: "Interal Error..." })
			}
			return res.status(200).send({})
		})
	})
}

exports.storeBook = (req, res, next) => {
	newBook = new book({
		bookname: req.body.name,
		isbn: req.body.isbn,
		authors: req.body.authors,
		publication: req.body.publication,
		genres: req.body.genres,
		sellers: req.body.sellers,
		description: req.body.description,
		language: req.body.language
	})
	newBook.save(err => {
		if (err) {
			console.log("Error : Failed to create record\n", err);
			return res.status(500).send({ error: "Interal Error, Failed to create record..." })
		}
	})
	return res.status(200).send({})
}

/*
	- use username (as it is unique for a user) for loading user profile picture
	request format : {imageType:user,value:username}
	- isbn to fetch image of a book
	request format : {imageType:book,value:isbn}
	- supported file formats: png,jpg,jpeg
*/

exports.storeImage = (req, res, next) => {
	var tempPath = req.file.path;
	var targetPath = ""
	newImage = new image()
	newImage.imagetype = req.body.imageType
	newImage.value = req.body.value
	if (req.body.imageType == 'user') {
		targetPath = profiles_dir
	}
	else if (req.body.imageType == 'book') {
		targetPath = books_dir
	}
	if (path.extname(req.file.originalname).toLowerCase() === ".png") {
		newImage.imageformat = "png"
		targetPath = targetPath + req.body.value + "." + "png"
		fs.rename(tempPath, targetPath, err => {
			if (err) {
				console.log("Error :,\n", err);
				return res.status(500).send({ error: "Interal Error..." })
			}
			newImage.save(err => {
				if (err) {
					console.log("Error : Failed to create record\n", err);
					return res.status(500).send({ error: "Interal Error, Failed to create record..." })
				}
			})
			return res.status(200).send({});
		});
	}
	else if (path.extname(req.file.originalname).toLowerCase() === ".jpeg") {
		newImage.imageformat = "jpeg"
		targetPath = targetPath + req.body.value + "." + "jpeg"
		fs.rename(tempPath, targetPath, err => {
			if (err) {
				console.log("Error :,\n", err);
				return res.status(500).send({ error: "Interal Error..." })
			}
			newImage.save(err => {
				if (err) {
					console.log("Error : Failed to create record\n", err);
					return res.status(500).send({ error: "Interal Error, Failed to create record..." })
				}
			})
			return res.status(200).send({});
		});
	}
	else if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
		newImage.imageformat = "jpg"
		targetPath = targetPath + req.body.value + "." + "jpg"
		fs.rename(tempPath, targetPath, err => {
			if (err) {
				console.log("Error :,\n", err);
				return res.status(500).send({ error: "Interal Error..." })
			}
			newImage.save(err => {
				if (err) {
					console.log("Error : Failed to create record\n", err);
					return res.status(500).send({ error: "Interal Error, Failed to create record..." })
				}
			})
			return res.status(200).send({});
		});
	}
	else {
		return res.status(415).send({ "message": "Invalid file format..." })
	}
	return;
}

/*
	- use username (as it is unique for a user) for loading user profile picture
	request format : {imageType:user,value:username}
	- isbn to fetch image of a book
	request format : {imageType:book,value:isbn}
	- supported file formats: png,jpg,jpeg
*/

exports.deleteImage = (req, res, next) => {
	var targetPath = ""
	console.log("imageType:", req.body.imageType);
	console.log("value:", req.body.value);
	image.findOne({ imagetype: req.body.imageType, value: req.body.value }, (err, imageData) => {
		if (err) {
			console.log("Error :,\n", err);
			return res.status(500).send({ error: "Internal Error..." })
		}
		if (req.body.imageType == 'user') {
			console.log("It's a user!");
			targetPath = profiles_dir + imageData.value + "." + imageData.imageformat
		}
		else if (req.body.imageType == 'book') {
			console.log("It's a book!");
			targetPath = books_dir + imageData.value + "." + imageData.imageformat
		}

		console.log("Final unlink path:", targetPath);

		try {
			fs.unlinkSync(targetPath);
			console.log('successfully deleted', targetPath);

			image.deleteOne({ imagetype: req.body.imageType, value: req.body.value }, (err, users) => {
				if (err) {
					console.log("Error in deleting image record:,\n", err);
					return res.status(500).send({ error: "Internal Error..." })
				}
				res.status(200).send({})
			})
			return;

		} catch (err) {
			console.log('fs unlink error:', err)
			return res.status(500).send({ error: "Internal Error..." })
		}
	});

	// return res.status(415).send({"message":"Invalid file format..."})
	return;
}

/*
	- use username for loading user profile picture
	request format : {imageType:user,value:username}
	- isbn to fetch image of a book
	request format : {imageType:book,value:isbn}
	- supported file formats: png,jpg,jpeg
*/

exports.fetchImage = (req, res, next) => {
	var targetPath = ""
	image.findOne({ imageType: req.body.imageType, value: req.body.value }, (err, imageData) => {
		if (err) {
			console.log("Error :,\n", err);
			return res.status(500).send({ error: "Interal Error..." })
		}
		if (req.body.imageType == 'user') {
			targetPath = profiles_dir + imageData.value + "." + imageData.imageFormat
		}
		else if (req.body.imageType == 'book') {
			targetPath = books_dir + imageData.value + "." + imageData.imageFormat
		}
		fs.readFile(targetPath, (err, data) => {
			if (err) {
				console.log("Error Failed To Read Image.\n", err);
				return res.status(500).send({ error: "Interal Error..." })
			}
			return res.status(200).send({
				"Content-Type": "image/" + imageData.imageFormat,
				"data": data
			})
		})
	})
}

exports.recommendBooks = (req, res, next) => {
	let { PythonShell } = require('python-shell')
	console.log("Hello 1");

	console.log("Hello 2");

	let username = req.body.user;
	console.log(username);
	let options = {
		mode: 'text',
		pythonPath: process.env.PYTHON_EXE_LOCATION,
		pythonOptions: ['-u'], // get print results in real-time
		scriptPath: process.env.PYTHON_FILE_LOCATION,
		args:username
		// args: ['value1', 'value2', 'value3']
	};
	console.log(options.pythonPath);
	console.log(options.scriptPath);
	PythonShell.run('Recommend_api.py', options, function (err, results) {
		if (err) throw err;
		// results is an array consisting of messages collected during execution
		console.log('results: %j', results);
		

		return res.status(200).send(results);
	});
	return;
}

exports.searchBooks = (req, res, next) => {
	let search_query = req.query.q;
	return book.find({ 'title': new RegExp(search_query, 'i') }, (err, books) => {
		if (err) {
			console.log("Error :,\n", err);
			return res.status(500).send({ error: "Interal Error..." })
		}
		else if (books.length == 0) {
			console.log("Error : Book title not found");
			return res.status(404).send({ error: "Not found." })
		}
		return res.status(200).send(books);
	});
}

exports.fetchBook = (req, res, next) => {
	let search_query = req.query.id;
	return book.findOne({ '_id': search_query }, (err, returned_book) => {
		if (err) {
			console.log("Error :,\n", err);
			return res.status(500).send({ error: "Interal Error..." })
		}
		if (returned_book.length == 0) {
			console.log("No Content");
			return res.status(404).send({ message: "No Content..." })
		}
		return res.status(200).send(returned_book);
	});
}

exports.fetchUserBooks = async (req, res, next) => {
	let username = req.params.username;
	let books = [];

	fs.readFile(history_csv, (err, data) => {
		if (err) {
			console.log("Error Failed To Read File.\n", err);
			return res.status(500).send({ error: "Interal Error..." })
		}

		let users = data.toString().split("\n");
		users.forEach(element => {
			let history = element.split(",");
			if (history[0] == username) {
				history.shift();
				let promises = [];
				history.forEach(element => {
					console.log("Searching for ISBN13:", element);
					promises.push(book.findOne({"isbn13": element}));
				});

				Promise.all(promises)
					.then(function (results) {
						results.forEach(result => {
							books.push(result);
						});
						res.status(200).send(books);
					}.bind({ books: books }))
					.catch(function (err) {
						res.status(500).send({ error: err });
					});
			}
		});
	})

	return;
}