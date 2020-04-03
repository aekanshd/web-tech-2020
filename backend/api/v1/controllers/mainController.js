const path = require('path')
const fs = require('fs')
const sql = require('../models/db.js')
const request = require('request-promise')
let query = ''

exports.home = (req, res, next) => {
	res.send("Hello Team 2020!")
}