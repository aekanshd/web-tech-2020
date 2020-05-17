const mongoose = require("mongoose")
const dbConfig = require("../config/db.config.js")

// Open the MongoDB connection
mongoose.connect('mongodb://' + dbConfig.HOST+':'+dbConfig.PORT+'/'+dbConfig.DB, {useNewUrlParser: true}).
    catch(error => {
        console.log("Database Connection Error...");
    });

//Create schema for users, books and images
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    registerdate: Date,
    interests: [String],
    purchases: [{bookid: String,purchaseDate: Date}],
    imageString: String
})
exports.user = mongoose.model("users",userSchema)

var bookSchema = new mongoose.Schema({
    bookname: String,
    authors: [String],
    isbn: String,
    publication: String,
    language: String,
    genres: [String],
    description: String,
    sellers:[]
})
exports.book = mongoose.model("books",bookSchema)
/*
//Not Using it for now
var imageSchema = new mongoose.Schema(
{ 	
    imagetype: String,
    value: String,
    imageformat: String,
}
);
exports.image = mongoose.model('images',imageSchema);
*/