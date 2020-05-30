const app = require('../api/v1/controllers/mainController');
const chai = require('chai');
const chaiHttp = require('chai-Http');

const { expect } = chai;
chai.use(chaiHttp);
describe('Server', () => {
	it('Welcome', (done) => {
		chai.request('localhost:62020')
			.get('/api/v1/')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.text).to.equals('Hello Team 2020!');
			});
		done();
		return;
	});

	it('Stores User history to csv', (done) => {
		chai.request('localhost:62020')
			.post('/api/v1/storeHistory')
			.send('{"username":"user2", "isbn":122233}')
			.end((err, res) => {
				expect(res).to.have.status(200);
			});
		done();
		return;
	});

	it('Validate Username', (done) => {
		chai.request('localhost:62020')
			.post('/api/v1/validUserName')
			.send('{"username":"ssdfefgbrgbrgfrfbs"}')
			.end((err, res) => {
				expect(res).to.have.status(500);
			});
		done();
		return;
	});

	it('Runs Recommendation Algorithm', (done) => {
		chai.request('localhost:62020')
			.get('/api/v1/recommend')
			.send({ user: 'user2' })
			.end((err, res) => {
				expect(res).to.have.status(200);
			});
		done();
		return;
	});

	it('Create User', (done) => {
		chai.request('localhost:62020')
			.put('/api/v1/user')
			.send({
				username: 'Hrishi',
				password: '1234',
				name: 'Hrishikesh',
				email: 'abc@123.com',
				interests: 'fiction',
			})
			.then((err, res) => {
				expect(res).to.have.status(200);
			})
			.catch((err) => {
				console.log();
			});
		done();
		return;
	});
	it('Fetches User (Valid)', (done) => {
		chai.request('localhost:62020')
			.post('/api/v1/fetchUser')
			.send({ username: 'Hrishi', password: '1234' })
			.then((err, res) => {
				expect(res).to.have.status(200);
			})
			.catch((err) => {
				console.log();
			});
		done();
		return;
	});
	it('Fetches User (Wrong Password)', (done) => {
		chai.request('localhost:62020')
			.post('/api/v1/fetchUser')
			.send({ username: 'Hrishi', password: '5678' })
			.then((err, res) => {
				expect(res).to.have.status(403);
				expect(res.text).to.equals('Wrong Password...');
			})
			.catch((err) => {
				console.log();
			});
		done();
		return;
	});
	it('Fetches User (Invalid Username)', (done) => {
		chai.request('localhost:62020')
			.post('/api/v1/fetchUser')
			.send({ username: '', password: '5678' })
			.then((err, res) => {
				expect(res).to.have.status(404);
				expect(res.text).to.equals('Invalid Username');
			})
			.catch((err) => {
				console.log();
			});
		done();
		return;
	});
	it('Deletes a User (Valid)', (done) => {
		chai.request('localhost:62020')
			.post('/api/v1/user/:Hrishi')
			.send({})
			.then((err, res) => {
				expect(res).to.have.status(200);
			})
			.catch((err) => {
				console.log();
			});
		done();
		return;
	});
	it('Deletes a User (inValid)', (done) => {
		chai.request('localhost:62020')
			.post('/api/v1/user/:')
			.send({})
			.then((err, res) => {
				expect(res).to.have.status(404);
				expect(res.text).to.equals('Invalid Username');
			})
			.catch((err) => {
				console.log();
			});
		done();
		return;
	});
	it('Stores a Book', (done) => {
		chai.request('localhost:62020')
			.post('/api/v1/book')
			.send({
				name: 'Watchmen',
				isbn: '5678',
				authors: 'Alan Moore',
				publication: 'DC',
				genres: 'Comics',
				sellers: 'none',
				description: 'Neo Noir Crime story',
				language: 'English',
			})
			.then((err, res) => {
				expect(res).to.have.status(200);
			})
			.catch((err) => {
				console.log();
			});
		done();
		return;
	});

	it('Fetch a book (Invalid)', (done) => {
		chai.request('localhost:62020')
			.get('/api/v1/book')
			.send({})
			.then((err, res) => {
				expect(res).to.have.status(404);
				expect(res.text).to.equals('No Content...');
			})
			.catch((err) => {
				console.log();
			});
		done();
		return;
	});
	return;
});
