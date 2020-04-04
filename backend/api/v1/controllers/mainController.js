const path = require('path')
const fs = require('fs')
const model = require('../models/db.js')
const request = require('request-promise')
let query = ''

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
			return res.status(500).send({error:"Interal Error..."})
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
			return res.status(500).send({error:"Interal Error, Failed to create record..."})	
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
		return res.status(200).send(userData)
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

exports.fetchImage = (req,res,next) => {

}