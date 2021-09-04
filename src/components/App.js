import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Center,
	ChakraProvider,
} from '@chakra-ui/react'
import firebase from 'firebase'
import 'firebase/database'
import React, { useEffect, useState } from 'react'
import { AuthContext, useAuth } from '../contexts/AuthContext'
import { auth } from '../firebase'
import theme from '../theme'
import Footer from './Footer'
import ProgressBar from './ProgressBar'
import Stats from './Stats'
import Typewriter from './Typewriter'

const App = (props) => {
	const [loggedIn, setLogin] = useState(false)
	const [entry, setEntry] = useState('entry')
	const [wordCount, setWordCount] = useState(0)
	const [finishedEarly, finishEarly] = useState(false)
	const [wordLimit, setWordLimit] = useState(1000)
	const [wordsCounted, setWordsCounted] = useState('wordsCounted')
	const [wordsLeft, setWordsLeft] = useState('wordsLeft')
	const [charCount, setCharCount] = useState(0)
	const [contact, setContact] = useState({
		github: 'https://github.com/stuartleach',
		email: 'mailto:jstuartleach@gmail.com',
		linkedin: 'https://www.linkedin.com/in/stuart-leach-69182761/',
		spotify: 'http://bit.ly/leachmusic',
	})

	// const [user, setUser] = useState('stuartLeach')
	const [userRef, setUser] = useState('user')
	const [entryRef, setEntryRef] = useState('empty journal entry')

	const [users, setUsers] = useState([])
	const [dummyText, setDummyText] = useState('old')
	const [entries, setEntries] = useState([])

	const [uid, setUid] = useState('')

	const [email, setEmail] = useState('email')
	const [password, setPassword] = useState('password')
	const currentUser = useAuth()

	useEffect(() => {
		console.log(AuthContext)
	})

	useEffect(() => {
		const fetchData = async () => {
			const uid = await auth
				.signInWithEmailAndPassword(
					currentUser.email,
					currentUser.password
				)
				.then((x) => x.user.uid)
			const db = firebase.firestore()
			const id = await db.collection('users').doc(uid).id

			const entriesRef = await db.collection('users').doc(uid).entries
			setEntries(entriesRef)
			/* setDummyText(
				doc.data().entries.entry1 + ' and my name is ' + doc.data().name
			) */
			// setEntries(doc.data().entries)
			setUid(id)
			setDummyText((x) => x + entries)
			// const data = doc.data()
			// setUsers(data.email)
		}
		fetchData()
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			const db = firebase.firestore()
			let data = new Object()
			data.ID = uid
			data.ENTRY = entry
			data.TIME = new Date()

			await db.collection('users').doc(uid).update(data)

			// const doc = await db.collection('users').doc(uid)
			// console.log(doc)
			/* 			await doc.set(
				{
					name: 'username',
					entry: entry,
				},
				{ merge: true }
			) */

			console.log('entry is ' + entry)
		}
		fetchData()
	}, [entry, uid])

	// setEntry(dummyText)

	const handleChange = () => {
		console.log('things have changed')

		/* 		db.collection('entries').add({
			entry: entry,
			users: 'stuart leach',
		}) */
		setWordCount(() => entry.split(' ').length)
		document.title = wordsLeft ? wordsLeft + ' words remain' : ''
	}

	return (
		<ChakraProvider theme={theme}>
			<div className='OneThousandWords'>
				<ProgressBar wordCount={wordCount} wordLimit={wordLimit} />
				<div className='vertical-center'>
					{/* <h1>{dummyText}</h1> */}

					{wordCount >= 1000 || finishedEarly ? (
						<Center position='fixed' zIndex='500'>
							<Center w='100vw' h='80vh'>
								<Alert
									status='success'
									variant='subtle'
									flexDirection='column'
									justifyContent='center'
									textAlign='center'
									height='400px'
									w='500px'
									color='whiteAlpha.800'
									borderRadius='2xl'
									bg='linear-gradient(0deg,  rgb(135, 169, 236),rgb(218, 193, 119))'
								>
									<AlertIcon size='40px' mr={0} />
									<AlertTitle mt={4} mb={1} fontSize='lg'>
										<h2 style={{ fontSize: '1.5rem' }}>
											Morning Pages completed!
										</h2>
										<Center>
											<Box
												textAlign='left'
												paddingTop='20px'
												paddingBottom='20px'
											>
												<p>Total words: {wordCount}</p>
												<p>
													Total characters:{' '}
													{charCount}
												</p>
												<Center marginTop='20px'>
													<Button
														color='blackAlpha.500'
														onClick={() =>
															window.location.reload()
														}
													>
														Restart?
													</Button>
												</Center>
											</Box>
										</Center>
									</AlertTitle>
									<AlertDescription maxWidth='sm'></AlertDescription>
								</Alert>
							</Center>
						</Center>
					) : (
						<></>
					)}
					<div className='input-wrapper container'>
						<Center>
							<Typewriter
								entry={entry}
								wordLimit={wordLimit}
								wordCount={wordCount}
								wordsLeft={wordsLeft}
								setEntry={setEntry}
								setWordCount={setWordCount}
								setWordsLeft={setWordsLeft}
								charCount={charCount}
								setCharCount={setCharCount}
								// entryRef={entryRef}
								handleChange={handleChange}
							/>
						</Center>

						<Stats
							finishEarly={finishEarly}
							finishedEarly={finishedEarly}
							entry={entry}
							wordLimit={wordLimit}
							wordCount={wordCount}
							wordsLeft={wordsLeft}
							setEntry={setEntry}
							setWordCount={setWordCount}
							setWordsLeft={setWordsLeft}
							wordsCounted={wordsCounted}
							charCount={charCount}
						/>
					</div>
					<Center>
						<Box position='absolute' bottom='20px'>
							<Footer
								github={contact.github}
								emailContact={contact.emailContact}
								linkedin={contact.linkedin}
								spotify={contact.spotify}
							/>
						</Box>
					</Center>
				</div>
			</div>
			)
		</ChakraProvider>
	)
}
export default App
