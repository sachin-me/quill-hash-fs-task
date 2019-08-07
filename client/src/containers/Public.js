import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Main from './Main';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Header from './Header';

const Public = () => {
	return (
		<div>
			<Router>
				<div className='route-wrapper'>
					<Header />
				</div>
	      <Route exact path="/register" component={Signup} />
	      <Route exact path="/login" component={Login} />
			</Router>
		</div>
	)
}

export default Public;