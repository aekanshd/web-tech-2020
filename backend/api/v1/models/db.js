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
    purchases: [{bookid: String,purchaseDate: Date}]
})
exports.user = mongoose.model("users",userSchema)

var bookSchema = new mongoose.Schema({
    bookname: String,
    authors: [String],
    isbn: string,
    publication: String,
    language: String,
    genres: [String],
    description: String,
    sellers:[]
})
exports.book = mongoose.model("books",bookSchema)

var imageSchema = new mongoose.Schema(
{ 	
    img: {
        data: Buffer,
        contentType: String 
    },
    imgMeta:{
        type: String,
        value: String
    }
}
);
exports.image = mongoose.model('images',imageSchema);
/* 
storing image:
var newImage = new image;
a.img.data = fs.readFileSync(imagePath);
a.img.contentType = 'image/png';
a.imgMeta={ type: String, value: String};
a.save (error => {
    console.log("Failed to store image to collection");
}
*/