import firebase from 'firebase'
import React, { useState, useEffect } from 'react'

export const useAuth = () => {
	const [state, setState] = useState(() => {
		const user = firebase.auth().currentUser
		return {
			initializing: !user,
			user,
		}
	})

	const onChange = (user) => {
		setState({ initializing: false, user })
	}

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChange(onChange)

		return () => unsubscribe()
	}, [])

	return state
}
