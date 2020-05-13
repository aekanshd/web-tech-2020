const path  = require("path");
const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const {expect} = chai;
chai.use(chaiHttp);
describe("Server", ()=>{
	it("Welcome", done=>{
		chai
			.request(app)
			.get("/")
			.end((err, res)=>{
				expect(res).to.have.status(200);
				expect(res.text).to.equals("Hello Team 2020!");
				
			});
			done();
	});
	
	it("Stores User history to csv", done=>{
		chai
			.request("localhost:62020/api/v1")
			.post("/storeHistory")
			.send("{\"username\":\"user2\", \"isbn\":123}")
			.end((err, res)=>{
				expect(res).to.have.status(200);
				
			});
			done();
	});

	it("Runs Recommendation Algorithm", done=>{
		chai
			.request("localhost:62020/api/v1")
			.post("/recommend")
			.send({"user":"user2"})
			.end((err, res)=>{
				expect(res).to.have.status(200);
				
			});
			done();
	});
	it("Validates User", done=>{
		chai
			.request("localhost:62020/api/v1")
			.post("/validUserName")
			.send({"username":"user2"})
			.end((err, res)=>{
				expect(res).to.have.status(500);
				
			});
			done();
	});
	it("Create User", done=>{
		chai
			.request("localhost:62020/api/v1")
			.put("/user")
			.send({"username":"Hrishi", "password":"1234", "name":"Hrishikesh", "email":"abc@123.com", "interests":"fiction"})
			.end((err, res)=>{
				expect(res).to.have.status(200);
				
			});
			done();
	});
	it("Fetches User", done=>{
		chai
			.request("localhost:62020/api/v1")
			.post("/fetchUser")
			.send({"username":"Hrishi", "password":"1234"})
			.end((err, res)=>{
				expect(res).to.have.status(200);
				
			});
			done();
	});
	it("Fetches User", done=>{
		chai
			.request("localhost:62020/api/v1")
			.post("/fetchUser")
			.send({"username":"Hrishi", "password":"5678"})
			.end((err, res)=>{
				expect(res).to.have.status(403);
				expect(res.text).to.equals("Wrong Password...");
				
			});
			done();
	});
	it("Fetches User", done=>{
		chai
			.request("localhost:62020/api/v1")
			.post("/fetchUser")
			.send({"username":"", "password":"5678"})
			.end((err, res)=>{
				expect(res).to.have.status(404);
				expect(res.text).to.equals("Invalid Username");
				
			});
			done();
	});
	it("Store Books", done=>{
		chai
			.request("localhost:62020/api/v1")
			.post("/book")
			.send({"name":"Watchmen", 
				"isbn":"5678", 
				"authors":"Alan Moore",
				"publication":"DC", 
				"genres":"Comics", 
				"sellers":"none", 
				"description":"Neo Noir Crime story", 
				"language":"English"})

			.end((err, res)=>{
				expect(res).to.have.status(500);
				done();
				
			});
			
	});

});