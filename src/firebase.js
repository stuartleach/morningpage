import { initializeApp } from 'firebase/app'
/* import {
	getAuth,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from 'firebase/auth'
import firebase from 'firebase/app'
import 'firebase/auth'

import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { getPerformance } from 'firebase/performance'
 */

import { getFirebaseConfig } from './firebase-config.js'
import firebase from 'firebase/app'
import {
	getFirestore,
	collection,
	addDoc,
	query,
	orderBy,
	limit,
	onSnapshot,
	setDoc,
	updateDoc,
	doc,
	serverTimestamp,
} from 'firebase/firestore'
import {
	getAuth,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	setPersistence,
	signInWithEmailAndPassword,
	browserSessionPersistence,
	browserLocalPersistence,
} from 'firebase/auth'

import image from './images/profile_placeholder.png'
// const GoogleAuthProvider = firebase.GoogleAuthProvider()

export const auth = getAuth()

export async function signIn() {
	var provider = new GoogleAuthProvider()
	signInWithPopup(getAuth(), provider)
}

// Signs-out of Friendly Chat.
export function signOutUser() {
	signOut(getAuth())
	// TODO 2: Sign out of Firebase.
}

// Initiate firebase auth
export function initFirebaseAuth() {
	onAuthStateChanged(getAuth(), authStateObserver)
	// TODO 3: Subscribe to the user's signed-in status
}

// Returns the signed-in user's profile Pic URL.
export function getProfilePicUrl() {
	return getAuth().currentUser.photoURL || './images/profile_placeholder.png'
	// TODO 4: Return the user's profile pic URL.
}

// Returns the signed-in user's display name.
export function getUserName() {
	return getAuth().currentUser.displayName
	// TODO 5: Return the user's display name.
}

// Returns true if a user is signed-in.
export function isUserSignedIn() {
	return !!getAuth().currentUser
	// TODO 6: Return true if a user is signed-in.
}

// Saves a new message on the Cloud Firestore.
export async function saveMessage(messageText) {
	try {
		await addDoc(collection(getFirestore(), 'messages'), {
			name: getUserName(),
			text: messageText,
			profilePicUrl: getProfilePicUrl(),
			timestamp: serverTimestamp(),
		})
	} catch (error) {
		console.error('Error writing new message to Firebase Database')
	}

	// TODO 7: Push a new message to Cloud Firestore.
}

// Loads chat messages history and listens for upcoming ones.
export function loadMessages() {
	const recentMessagesQuery = query(
		collection(getFirestore(), 'messages'),
		orderBy('timestamp', 'desc'),
		limit(12)
	)

	// start listening to the query

	// TODO 8: Load and listen for new messages.
}

// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.

// Returns true if user is signed-in. Otherwise false and displays a message.
export function checkSignedInWithMessage() {
	// Return true if the user is signed in Firebase
	if (isUserSignedIn()) {
		return true
	}

	// Display a message to the user using a Toast.
	var data = {
		message: 'You must sign-in first',
		timeout: 2000,
	}
	// signInSnackbarElement.MaterialSnackbar.showSnackbar(data)
	return false
}

// A loading image URL.
var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a'

export function createAndInsertMessage(id, timestamp) {
	/* const container = document.createElement('div')
	container.innerHTML = MESSAGE_TEMPLATE
	const div = container.firstChild
	div.setAttribute('id', id)

	// If timestamp is null, assume we've gotten a brand new message.
	// https://stackoverflow.com/a/47781432/4816918
	timestamp = timestamp ? timestamp.toMillis() : Date.now()
	div.setAttribute('timestamp', timestamp)

	// figure out where to insert new message
	const existingMessages = messageListElement.children
	if (existingMessages.length === 0) {
		messageListElement.appendChild(div)
	} else {
		let messageListNode = existingMessages[0]

		while (messageListNode) {
			const messageListNodeTime =
				messageListNode.getAttribute('timestamp')

			if (!messageListNodeTime) {
				throw new Error(
					`Child ${messageListNode.id} has no 'timestamp' attribute`
				)
			}

			if (messageListNodeTime > timestamp) {
				break
			}

			messageListNode = messageListNode.nextSibling
		}

		messageListElement.insertBefore(div, messageListNode)
	}

	return div */
}

// Triggered when the send new message form is submitted.
function onMessageFormSubmit(e) {
	/* e.preventDefault()
	// Check that the user entered a message and is signed in.
	if (messageInputElement.value && checkSignedInWithMessage()) {
		saveMessage(messageInputElement.value).then(function () {
			// Clear message text field and re-enable the SEND button.
			resetMaterialTextfield(messageInputElement)
			toggleButton()
		})
	} */
}

function authStateObserver(user) {
	/* if (user) {
		// User is signed in!
		// Get the signed-in user's profile pic and name.
		var profilePicUrl = getProfilePicUrl()
		var userName = getUserName()

		// Set the user's profile pic and name.
		userPicElement.style.backgroundImage =
			'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')'
		userNameElement.textContent = userName

		// Show user's profile and sign-out button.
		userNameElement.removeAttribute('hidden')
		userPicElement.removeAttribute('hidden')
		signOutButtonElement.removeAttribute('hidden')

		// Hide sign-in button.
		signInButtonElement.setAttribute('hidden', 'true')

		// We save the Firebase Messaging Device token and enable notifications.
		saveMessagingDeviceToken()
	} else {
		// User is signed out!
		// Hide user's profile and sign-out button.
		userNameElement.setAttribute('hidden', 'true')
		userPicElement.setAttribute('hidden', 'true')
		signOutButtonElement.setAttribute('hidden', 'true')

		// Show sign-in button.
		signInButtonElement.removeAttribute('hidden')
	} */
}
