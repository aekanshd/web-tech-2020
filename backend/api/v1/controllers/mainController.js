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
			purchases: userData.purchases
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

exports.fetchBook = (req, res, next) => {
	book.find(req.query, (err, books) => {
		if (err) {
			console.log("Error :,\n", err);
			return res.status(500).send({ error: "Interal Error..." })
		}
		if (books.length == 0) {
			console.log("No Content");
			return res.status(404).send({ message: "No Content..." })
		}
		return res.status(200).send(books)
	})
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

/*
exports.fetchDetails = (req,res,next) => {
	let search_type = (req.query.type === undefined)?"q":req.query.type;
	let search_query = req.query.q;

	let api_url = new URL("http://openlibrary.org/search.json")
	api_url.searchParams.append(search_type,search_query)
	api_url.searchParams.append("lang","eng")
	console.log("api_url:", api_url.toString())
	
	const options = {
		method: "GET",
		uri: api_url.toString(),
		headers: {},
		body: {},
		json: true
	}

	request(options).then(response => {
		if (response.length === 0) return res.status(400).send("400: Invalid")
		else {
			return res.status(200).send(response);
		}
	}).catch(err => {
		console.error("API Call error:", err);
		return res.status(500).send(err)
	});
	return;
} */

exports.fetchDetails = (req, res, next) => {
	let search_query = req.query.q;
	let api_url = new URL("/search/books/" + search_query, "https://isbndb.com/")

	console.log("API URL:", api_url.toString());

	const options = {
		method: "GET",
		uri: api_url.toString(),
		headers: {},
		body: {},
		json: true
	}

	request(options)
		.then(function (page) {
			let books = [];
			// let div = $('#block-multipurpose-business-theme-content', html).html();
			// console.log(div);
			$ = $.load(page);
			$('#block-multipurpose-business-theme-content').children("div").first().children("div .book-content").each(function () {
				// console.log($(this).html());
				let book = {};
				// book.image_url = new URL ($(this).find("object.img-responsive").prop("src"), "https://isbndb.com/").toString();
				book.image_url = $(this).find("object.img-responsive").prop("data");
				// console.log("IMAGE:", $(this).find("object.img-responsive").first().prop("src"));
				// book.title = $(this).find("h2.search-result-title > a").html();
				let data = $(this).find("dl > dt").each(function (index) {
					switch (index) {
						case 0:
							book.authors = $(this).children("strong").remove().end().text().trim();
							// console.log($(this).children("strong").remove().end().text().trim());
							break;
						case 1:
							book.title = $(this).children("strong").remove().end().text().trim();
							// console.log($(this).children("strong").remove().end().text().trim());
							break;

						case 2:
							book.isbn = $(this).children("strong").remove().end().text().trim();
							// console.log($(this).children("strong").remove().end().text().trim());
							break;

						case 3:
							book.publisher = $(this).children("strong").remove().end().text().trim();
							// console.log($(this).children("strong").remove().end().text().trim());
							break;

						case 4:
							book.publish_date = $(this).children("strong").remove().end().text().trim();
							// console.log($(this).children("strong").remove().end().text().trim());
							break;

						case 5:
							book.bind = $(this).children("strong").remove().end().text().trim();
							// console.log($(this).children("strong").remove().end().text().trim());
							break;

						default:
							break;
					}
					// console.log("===========");
				});
				// console.log("TITLE:", $(this).find("h2.search-result-title > a").html());
				books.push(book);
				// console.log("======");
			});
			return res.status(200).send(books);
		})
		.catch(function (err) {
			return res.status(500).send({ error: err });
		});

	// puppeteer
	// 	.launch()
	// 	.then(function (browser) {
	// 		return browser.newPage();
	// 	})
	// 	.then(function (page) {
	// 		return page.goto(api_url.toString()).then(function () {
	// 			return page.content();
	// 		});
	// 	})
	// 	.then(function (html) {
	// 		let books = [];
	// 		$('#block-multipurpose-business-theme-content').children("div").first().children("div .book-content").each(function () {
	// 			console.log($(this));
	// 			let book = {};
	// 			book["image_url"] = $(this).find("img .img-responsive").attr("src");
	// 			books.push(book);
	// 		});
	// 		return res.status(200).send(books);
	// 	})
	// 	.catch(function (err) {
	// 		return res.status(500).send({ error: err });
	// 	});

	return;
}

exports.fetchMoreDetails = (req, res, next) => {
	let search_query = req.query.q;
	let api_url = new URL("/book/" + search_query, "https://isbndb.com/")

	console.log("API URL:", api_url.toString());

	const options = {
		method: "GET",
		uri: api_url.toString(),
		headers: {},
		body: {},
		json: true
	}

	request(options)
		.then(function (page) {
			let tbody = "";
			$ = $.load(page);
			tbody = $('#block-multipurpose-business-theme-content').children("div").first().children("div:nth-child(2)").html()
			// console.log($(this).html());
			// tbody = $(this).html();
			console.log(tbody)
			return res.status(200).send(tbody);
		})
		.catch(function (err) {
			return res.status(500).send({ error: err });
		});
	return;
}