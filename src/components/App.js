import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Center,
	ChakraProvider,
	Container,
	Text,
} from '@chakra-ui/react'
import { onAuthStateChanged, signInAnonymously, signOut } from 'firebase/auth'
import 'firebase/database'
import { getDatabase, ref, set, update } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { auth, initFirebaseAuth, signIn } from '../firebase.js'
import theme from '../theme'
import { contact } from './contactInfo'
import Footer from './Footer'
import ProgressBar from './ProgressBar'
import Stats from './Stats'
import Typewriter from './Typewriter'

import sortByFreq from '../helper.js'

const App = (props) => {
	const [entry, setEntry] = useState('entry')
	const [wordCount, setWordCount] = useState(0)
	const [wordLimit, setWordLimit] = useState(1000)
	const [finishedEarly, finishEarly] = useState(false)
	const [wordsLeft, setWordsLeft] = useState(wordLimit)
	const [wordsCounted, setWordsCounted] = useState(0)
	const [charCount, setCharCount] = useState(0)

	const [proPicUrl, setProPicUrl] = useState('')
	const [name, setName] = useState('')
	const [clickCount, setClickCount] = useState(0)
	const [userData, setUserData] = useState('')
	const [inputRef, setInputRef] = useState('')
	const [email, setEmail] = useState('example@example.com')
	const [topWords, setTopWords] = useState('')

	const [anon, setAnon] = useState(true)

	initFirebaseAuth()
	const db = getDatabase()
	const [user, setUser] = useState(auth.currentUser)
	const [entryPath, setEntryPath] = useState('')
	const [uid, setUid] = useState('')

	const entryIdGen = function () {
		return '_' + Math.random().toString(36).substring(2, 9)
	}

	const [entryId, setEntryId] = useState(entryIdGen())

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setUser(user)
			setEmail(user.email)
			setUid(user.uid)
			setName(user.displayName)
			setProPicUrl(user.photoURL)
		} else {
			setUser(false)
		}
	})

	const dateObj = new Date()
	const todaysDate = () => {
		return (
			dateObj.getUTCFullYear().toString() +
			parseInt(dateObj.getUTCMonth() + 1).toString() +
			dateObj.getUTCDate().toString()
		)
	}

	// const today = todaysDate()

	const mostCommonWords = (entry) => {
		return sortByFreq(entry).splice(0, 5)
	}

	// useEffect((entry) => setTopWords(mostCommonWords('' + entry)), [entry])

	const signInGoogle = async () => {
		setAnon(false)
		signIn()
			.then(() => {})
			.then(() => console.log('signing in'))
			.catch((error) => console.log("can't sign in" + error))
			.then(() => {
				const dateObj = new Date()
				console.log()
				const todaysPath =
					`users/${uid}/entries` +
					`/` +
					`${dateObj.getUTCFullYear()}` +
					parseInt(dateObj.getUTCMonth() + 1) +
					dateObj.getUTCDate() +
					`/`
				set(ref(db, `/users/${uid}/userInfo`), {
					email: email,
					name: name,
				})
				setEntryPath(todaysPath)
			})
			.then(() => {
				console.log('data saved!')
			})

			.catch((error) => console.log(error))
	}

	const signOutGoogle = () => {
		signOut(auth).catch((error) => {
			console.log(error)
		})
	}

	useEffect(() => {
		if (entry === '') {
			setWordCount(0)
			setCharCount(0)
			setWordsLeft(1000)
		} else {
			setCharCount(() => entry.split('').length)
			setWordCount(() => entry.split(' ').length - 1)
			setWordsLeft(() => wordLimit - entry.split(' ').length)
		}
	}, [entry])

	const handleChange = () => {
		// setWordCount(() => entry.split(' ').length)
		setTopWords(mostCommonWords('' + entry))
		if (!anon) {
			const updates = {
				entry: entry,
				wordCount: wordCount,
				wordsLeft: wordsLeft,
				wordsCounted: wordsCounted,
				charCount: charCount,
			}
			update(
				ref(db, `users/${uid}/entries/${todaysDate()}/${entryId}`),
				updates
			)
		}
		document.title = wordsLeft ? wordsLeft + ' words remain' : ''
	}

	return (
		<ChakraProvider theme={theme}>
			<div className='OneThousandWords'>
				{user ? (
					<ProgressBar wordCount={wordCount} wordLimit={wordLimit} />
				) : null}
				<div className='vertical-center'>
					<Box>
						{!user ? (
							<Center align='center' pt='40vh'>
								<Container align='center'>
									<Box display='block' margin='0 auto'>
										<Button
											onClick={signInGoogle}
											align='center'
											color='white'
											style={{
												background:
													'linear-gradient(0deg  ,rgb(218, 193, 119,0.5),rgb(135, 169, 236, 0.5))',
											}}
											_hover={{ opacity: 0.5 }}
										>
											Sign in with Google
										</Button>
										<Text
											fontSize='.75em'
											// textAlign='center'
											mt='10px'
											mb='30px'
										>
											??? Data will be saved.
										</Text>
									</Box>
									<Box>
										<Button
											onClick={() =>
												signInAnonymously(auth).then(
													() => setAnon(true)
												)
											}
											color='white'
											style={{
												background:
													'linear-gradient(0deg  ,rgb(218, 193, 119,0.5),rgb(135, 169, 236, 0.5))',
											}}
											_hover={{ opacity: 0.5 }}
										>
											Use Anonymously
										</Button>
										<Text
											fontSize='.75em'
											// textAlign='center'
											mt='10px'
										>
											???? Data will <em>not</em> be saved.
										</Text>
									</Box>
								</Container>
							</Center>
						) : null}
						{user ? (
							<Box
								position='fixed'
								right='10px'
								top='20px'
								height='auto'
							>
								<Box textAlign='right' position='relative'>
									<Box
										fontWeight='bold'
										color='rgba(135, 169, 236, 1)'
									>
										{email}
									</Box>
									<Button
										onClick={signOutGoogle}
										width='100%'
										minHeight='4vh'
										position='relative'
										_hover={{ opacity: 0.5 }}
										style={{
											color: 'white',
											background: `linear-gradient(180deg,  rgba(135, 169, 236, 0.5),rgba(218, 194, 119, 0.377))`,
										}}
										top='5px'
									>
										Sign out
									</Button>
									<Text
										fontSize='14px'
										fontWeight='300'
									></Text>
									{/* <Image
											w='25px'
											borderRadius='full'
											src={proPicUrl}
											ml='15px'
										/> */}
								</Box>
							</Box>
						) : null}
					</Box>
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
					{user ? (
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
								topWords={topWords}
							/>
						</div>
					) : null}
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
		</ChakraProvider>
	)
}
export default App
