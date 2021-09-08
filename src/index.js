import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Router from './components/Router'

ReactDOM.render(
	// <AuthProvider>
	<Router />,
	// </AuthProvider>,
	document.querySelector('#main')
)
