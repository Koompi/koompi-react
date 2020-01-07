import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './components/Index';
import KoompiPro from './components/KoompiPro';
import KoompiE11 from './components/KoompiE11';
import KoompiProBuy from './components/buypage/KoompiProBuy';

function App() {
	return (
		// <div>
		// 	<Index />
		// 	<KoompiE11 />
		// </div>
		<React.Fragment>
			<Router>
				<Route path='/' exact component={Index}></Route>
				<Route path='/koompi-pro' component={KoompiPro}></Route>
				<Route path='/Koompi-e' component={KoompiE11}></Route>
				<Route path='/buykoompi-pro' component={KoompiProBuy}></Route>
			</Router>
		</React.Fragment>
	);
}

export default App;
