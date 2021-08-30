import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NotFound from './NotFound'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import UpdateProfile from './components/UpdateProfile'
import App from './components/App'

import ForgotPassword from './components/ForgotPassword'
import PrivateRoute from './components/PrivateRoute'

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route path='/' component={App} />
			<Route exact path='/morningpage' component={App} />
			<Route
				exact
				path='/morningpage/updateprofile'
				component={UpdateProfile}
			/>
			<Route exact path='/morningpage/dashboard' component={Dashboard} />
			<Route
				exact
				path='/morningpage/forgot-password'
				component={ForgotPassword}
			/>
			<Route exact path='/morningpage/signup' component={Signup} />
			<Route
				exact
				path='/morningpage/private-route'
				component={PrivateRoute}
			/>

			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
)

export default Router
