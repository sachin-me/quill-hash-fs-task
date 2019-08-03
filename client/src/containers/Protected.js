import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

const Protected = () => {
	return (
		<div>
			<Router>
			<Route exact path="/" component={Dashboard} />
			</Router>
		</div>
	)
}

export default Protected;