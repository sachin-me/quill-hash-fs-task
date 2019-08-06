import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Header from './Header';

const Protected = () => {
	return (
		<div>
			<Router>
				<Header />
				<Route exact path="/" component={Dashboard} />
			</Router>
		</div>
	)
}

export default Protected;