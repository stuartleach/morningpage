// import Rebase from 're-base'

import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

// console.log(app)

export const auth = app.auth()
export default app

/* 
const firebaseNewAccount = firebase
	.auth()
	.createUserWithEmailAndPassword(email, password)
	.then((userCredential) => {
		// Signed in
		let user = userCredential.user
		console.log(userCredential)
		// ...
	})
	.catch((error) => {
		let errorCode = error.code
		let errorMessage = error.message
		// ..
	})

const base = Rebase.createClass(firebaseApp.database())

// this is a named export
export { firebaseApp, firebaseNewAccount }

// this is a default export
export default base
 */
