import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
} from 'react-router-dom';
// import './index.css';
import './styles/main.css';
import App from './App';
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Detail from './components/Detail';
import Recommendations from './components/Recommendations';

import * as serviceWorker from './serviceWorker';

function PrivateRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={() =>
				localStorage.getItem('loggedin') === 'true' ? (
					<Component />
				) : (
					<Redirect to={{ pathname: '/login' }} />
				)
			}
		/>
	);
}

function AppRouter() {
	return (
		<div>
			<Router>
				<Navbar />
				<div>
					<Route path='/' exact component={App} />
					<Route path='/about/' component={About} />
					<Route path='/login/' component={Login} />
					<Route path='/signup/' component={Signup} />
					<Route path='/book/:isbn' component={Detail} />
					<PrivateRoute path='/profile/' component={Profile} />
					<PrivateRoute path='/recommendations/' component={Recommendations} />
				</div>
			</Router>
		</div>
	);
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
