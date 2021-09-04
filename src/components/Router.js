import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NotFound from './NotFound'
import Signup from './Signup'
import Dashboard from './Dashboard'
import UpdateProfile from './UpdateProfile'
import { AuthProvider } from '../contexts/AuthContext'

import ForgotPassword from './ForgotPassword'
import PrivateRoute from './PrivateRoute'
import Login from './Login'
import App from './App'

const Router = () => (
	<BrowserRouter>
		<Switch>
			<PrivateRoute exact path='/' component={App} />
			<PrivateRoute path='/dashboard' component={Dashboard} />
			<PrivateRoute path='/update-profile' component={UpdateProfile} />
			<Route path='/signup' component={Signup} />
			<Route path='/login' component={Login} />
			<Route path='/forgot-password' component={ForgotPassword} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
)

export default Router
