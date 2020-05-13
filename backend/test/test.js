const app = require("E:\\Documents\\PESU\\6th Semester\\Web Technologies 2 Lab\\Project\\web-tech-2020-master\\backend\\api\\v1\\controllers\\mainController");
const chai = require("chai");
const chaiHttp = require("chai-Http");

const {expect} = chai;
chai.use(chaiHttp);
describe("Server", ()=>{
	it("Welcome", done=>{
		chai
			.request("localhost:62020/api/v1")
			.get("/")
			.end((err, res)=>{
				expect(res).to.have.status(200);
				expect(res.text).to.equals("Hello Team 2020!");
				done();
			});
	});
	it("Stores User history to csv", done=>{
		chai
			.request("localhost:62020/api/v1")
			.post("/storeHistory")
			.send("{\"username\":\"user2\", \"isbn\":123}")
			.end((err, res)=>{
				expect(res).to.have.status(200);
				done();
			});
	});
	it("Runs Recommendation Algorithm", done=>{
		chai
			.request("localhost:62020/api/v1")
			.post("/recommend")
			.send({"user":"user2"})
			.end((err, res)=>{
				expect(res).to.have.status(200);
				done();
			});
	});
	it("Validates User", done=>{
		chai
			.request("localhost:62020/api/v1")
			.post("/validUserName")
			.send({"username":"user2"})
			.end((err, res)=>{
				expect(res).to.have.status(500);
				done();
			});
	});
	it("Create User", done=>{
		chai
			.request("localhost:62020/api/v1")
			.put("/user")
			.send({"username":"Hrishi", "password":"1234", "name":"Hrishikesh", "email":"abc@123.com", "interests":"fiction"})
			.end((err, res)=>{
				expect(res).to.have.status(200);
				done();
			});
	});
});
