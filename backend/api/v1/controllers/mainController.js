const path = require('path')
const fs = require('fs')
const model = require('../models/db.js')
const request = require('request-promise')
const url = require('url');
const $ = require('cheerio');
const puppeteer = require('puppeteer-firefox');
let query = ''

const profiles_dir = __dirname + "images/profiles/"
const books_dir = __dirname + "images/books/"
user = model.user
book = model.book
image = model.image
exports.home = (req, res, next) => {
	res.send("Hello Team 2020!")
}

exports.validateUsername = (req, res, next) => {
	user.find({username: req.body.username}, (err,users) =>{
		if (err) {
			console.log("Error :,\n",err);
			return res.status(500).send({error:"Internal Error..."})
		}
		if (users.length > 0) {
			console.log("Error : Username Already Used");
			return res.status(400).send({error:"Username Already Used.."})
		}
	})
	return res.status(200).send({})
}

exports.createUser = (req, res, next) => {
	
	newUser = new user({
		username : req.body.username,
		password : req.body.password,
		name : req.body.name,
		email : req.body.email,
		registerDate : req.body.registerDate,
		interests : req.body.interests,
		purchases : []
	})
	newUser.save(err => {
		if (err) {
			console.log("Error : Failed to create record,\n",err);
			return res.status(500).send({error:"Internal Error, Failed to create record..."})	
		}
	});
	return res.status(200).send({})
}

exports.fetchUser = (req,res,next) =>{
	user.find({username: req.body.username}, (err,users) =>{
		if (err) {
			console.log("Error :,\n",err);
			return res.status(500).send({error:"Interal Error..."})
		}
		if (users.length == 0) {
			console.log("Error : Invalid Username");
			return res.status(404).send({error:"Invalid Username"})
		}
		userData = users[0]
		if (userData.password!=req.body.password) {
			console.log("Wrong Password...")
			return res.status(403).send({error:"Wrong Password..."})
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

exports.deleteUser = (req,res,response) => {
	user.find ({username: req.params.username}, (err,users) =>{
		if (err) {
			console.log("Error :,\n",err);
			return res.status(500).send({error:"Interal Error..."})
		}
		if (users.length == 0) {
			console.log("Error : Invalid Username");
			return res.status(404).send({error:"Invalid Username"})
		}
		user.deleteOne({_id:users[0]._id},(err,users) =>{
			if (err) {
				console.log("Error :,\n",err);
				return res.status(500).send({error:"Interal Error..."})
			}
			return res.status(200).send({})
		})
	})
}

exports.storeBook = (req,res,next) => {
	newBook = new book({
		bookname : req.body.name,
		isbn : req.body.isbn,
		authors : req.body.authors,
		publication : req.body.publication,
		genres : req.body.genres,
		sellers : req.body.sellers,
		description : req.body.description,
		language : req.body.language
	})
	newBook.save(err => {
		if (err) {
			console.log("Error : Failed to create record\n",err);
			return res.status(500).send({error:"Interal Error, Failed to create record..."})	
		}		
	})
	return res.status(200).send({})
}

exports.fetchBook = (req,res,next) => {
	book.find(req.query, (err,books) => {
		if (err) {
			console.log("Error :,\n",err);
			return res.status(500).send({error:"Interal Error..."})
		}
		if (books.length == 0) {
			console.log("No Content");
			return res.status(404).send({message:"No Content..."})
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
exports.storeImage = (req,res,next) => {
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
		targetPath = targetPath + req.body.value +"."+ "png"		
		fs.rename(tempPath, targetPath, err => {
		if (err) {
			console.log("Error :,\n",err);
			return res.status(500).send({error:"Interal Error..."})
		} 
		newImage.save(err => {
			if (err) {
				console.log("Error : Failed to create record\n",err);
				return res.status(500).send({error:"Interal Error, Failed to create record..."})	
			}		
		})
		return res.status(200).send({});
		});
	}
	else if (path.extname(req.file.originalname).toLowerCase() === ".jpeg") {
		newImage.imageformat = "jpeg"
		targetPath = targetPath + req.body.value +"."+ "jpeg"
		fs.rename(tempPath, targetPath, err => {
		if (err) {
			console.log("Error :,\n",err);
			return res.status(500).send({error:"Interal Error..."})
		}
		newImage.save(err => {
			if (err) {
				console.log("Error : Failed to create record\n",err);
				return res.status(500).send({error:"Interal Error, Failed to create record..."})	
			}		
		})
		return res.status(200).send({});
		});
	}
	else if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
		newImage.imageformat = "jpg"
		targetPath = targetPath + req.body.value +"."+ "jpg"
		fs.rename(tempPath, targetPath, err => {
		if (err) {
			console.log("Error :,\n",err);
			return res.status(500).send({error:"Interal Error..."})
		} 
		newImage.save(err => {
			if (err) {
				console.log("Error : Failed to create record\n",err);
				return res.status(500).send({error:"Interal Error, Failed to create record..."})	
			}		
		})
		return res.status(200).send({});
		});
	}
	else {
		return res.status(415).send({"message":"Invalid file format..."})
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
exports.deleteImage = (req,res,next) => {
	var targetPath = ""
	console.log("imageType:", req.body.imageType);
	console.log("value:", req.body.value);
	image.findOne({imagetype:req.body.imageType,value:req.body.value},(err,imageData) =>{
		if (err) {
			console.log("Error :,\n",err);
			return res.status(500).send({error:"Internal Error..."})
		}
		if (req.body.imageType == 'user') {
			console.log("It's a user!");
			targetPath = profiles_dir + imageData.value +"."+ imageData.imageformat
		}
		else if (req.body.imageType == 'book') {
			console.log("It's a book!");
			targetPath = books_dir + imageData.value +"."+ imageData.imageformat
		}
		
		console.log("Final unlink path:", targetPath);		

		try {
			fs.unlinkSync(targetPath);
			console.log('successfully deleted', targetPath);

			image.deleteOne({imagetype:req.body.imageType,value:req.body.value},(err,users) =>{
				if (err) {
					console.log("Error in deleting image record:,\n",err);
					return res.status(500).send({error:"Internal Error..."})
				}
				res.status(200).send({})
			})
			return;

		} catch (err) {
			console.log('fs unlink error:', err)
			return res.status(500).send({error:"Internal Error..."})
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
exports.fetchImage = (req,res,next) => {
	var targetPath = ""
	image.findOne({imageType:req.body.imageType,value:req.body.value},(err,imageData) =>{
		if (err) {
			console.log("Error :,\n",err);
			return res.status(500).send({error:"Interal Error..."})
		}
		if (req.body.imageType == 'user') {
			targetPath = profiles_dir + imageData.value +"."+ imageData.imageFormat
		}
		else if (req.body.imageType == 'book') {
			targetPath = books_dir + imageData.value +"."+ imageData.imageFormat
		}
		fs.readFile(targetPath, (err, data) => {
			if (err) {
				console.log("Error Failed To Read Image.\n",err);
				return res.status(500).send({error:"Interal Error..."})
			}
			return res.status(200).send({
				"Content-Type": "image/"+imageData.imageFormat,
				"data": data
			})	
		})
	})
}

exports.recommendBooks = (req,res,next) => {
	let {PythonShell} = require('python-shell')

	let options = {
	mode: 'text',
	pythonPath: process.env.PYTHON_EXE_LOCATION,
	pythonOptions: ['-u'], // get print results in real-time
	scriptPath: process.env.PYTHON_FILE_LOCATION,
	// args: ['value1', 'value2', 'value3']
	};

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

/*
	Okay, so I'll explain the issue here.
	Amazon API - Associate API doesn't help. (it's just one store)
	GoodRead API - Has throttle limit ((per second limit) so can't use AJAX.
	Each webpage will need to be opened in a separate
	"headless" browser. And we need to look at each of the
	HTML of each of these separate pages. This takes a lot of time.
	A lot of these websites like Flipkart has "randomised" class names,
	and no IDs so it's really hard to scrape through.
	So Varun and I decided to instead directly scrape through
	IndiaBookStore.Net because it does all the work for us.
	It fetches results from all major book stores for us.
	So if we can somehow scrape through the details as well as
	different book prices, our problem is solved with just one API.
	See, it was easy to scrape, but now literally every webpage
	has dynamic JS loads. It's hard without a headless browser.
	And the code below is just for ONE. Imagine if we do for 5 book stores. Lol.
	Bro, Varun and I have already seen apis, Rediff API, Google Books,
	GoodReads, OpenLibrary, ISBNDB, etc etc. It's of no use.
	Throttling/paid/vague. All of them.
*/
// So what's the plan now? So what's the issue with that? - Need a little help
// because my brain is kinda fried right now -.- Wasted too much time for right APIs
// If you can scrape out for me...
// Instead of opening a new window can't we fetch details of a book and send to front end?
/* 
	> So Varun and I decided to instead directly scrape through
	IndiaBookStore.Net because it does all the work for us. (Does it have fixed classes and ids in the html page? yes)

	> See the commented out code above. Run that. It does that only.
	Fetches book meta data from openLibrary. What went wrong there?
	1. It still doesn't solve the manpower needed to write code for all stores.
	2. Each PROPER book title gives 40+ ISBNS. (different language, types, formats, places)
	3. So you're kinda in this loop of just fetching the right data. 
	ohk. gimme some time to catch up with you > yes please, I'll go eat haven't eaten ugh
	*/
exports.fetchDetails = (req,res,next) => {
	let search_query = req.query.q.split(' ').join('+');
	let api_url = new URL("https://www.indiabookstore.net/search")
	api_url.searchParams.append("q", search_query)
	
	console.log("API URL:", api_url.toString());
	puppeteer
	.launch()
	.then(function(browser) {
		return browser.newPage();
	})
	.then(function(page) {
		return page.goto(api_url.toString()).then(function() {
			return page.content();
		});
	})
	.then(function(html) {
		let books = [];
		// India Book Store is GOD
		// console.log($("#results"));
		
		$('#results > li', html).each(function() {
			// This functions iterates through each <li>
			var book = {};
			book['isbn'] = $(this).attr("id");
			book['imgsrc'] = $(this).find('#' + book['isbn'] + ' img').attr("src");
			//T
			console.log(book['imgsrc']);
			//Awesome Now title, author, prices. @ravi plz
			books.push(book)
		});
		return res.status(200).send(books);
		// It's 8 PM guys :(
	})
	.catch(function(err) {
		return res.status(500).send({error:err});
	});

	return;
}