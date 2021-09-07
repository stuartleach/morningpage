import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Center,
	ChakraProvider,
	Image,
	Text,
} from '@chakra-ui/react'
import { getAuth, signOut } from 'firebase/auth'
import 'firebase/database'
import { getDatabase, ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { auth, initFirebaseAuth, isUserSignedIn, signIn } from '../firebase.js'
import theme from '../theme'
import { contact } from './contactInfo'
import Footer from './Footer'
import ProgressBar from './ProgressBar'
import Stats from './Stats'
import Typewriter from './Typewriter'

const App = (props) => {
	const [entry, setEntry] = useState('entry')
	const [wordCount, setWordCount] = useState(0)
	const [wordLimit, setWordLimit] = useState(1000)
	const [finishedEarly, finishEarly] = useState(false)
	const [wordsLeft, setWordsLeft] = useState('wordsLeft')
	const [wordsCounted, setWordsCounted] = useState(0)
	const [charCount, setCharCount] = useState(0)

	const [proPicUrl, setProPicUrl] = useState('')

	const [name, setName] = useState('')
	const [clickCount, setClickCount] = useState(0)
	const [userData, setUserData] = useState('')
	const [inputRef, setInputRef] = useState('')

	let uid = ''

	initFirebaseAuth()
	// const db = getDatabase()

	const handleClick = async () => {
		const db = getDatabase()
		setClickCount((x) => x + 1)
		set(ref(db, 'users/' + auth.currentUser.uid), {
			clicks: clickCount,
		})
	}

	const signInGoogle = async () => {
		signIn()
			.then(() => console.log('signing in'))
			.catch(() => console.log("can't sign in"))
			.then(
				// isUserSignedIn() ? setProPicUrl(getProfilePicUrl()) : null
				setName(auth.currentUser.displayName)
			)
		uid = auth.currentUser.uid
	}

	useEffect(() => {
		const dateObj = new Date()
		const db = getDatabase()
		// const uid = auth.currentUser.uid
		const todaysPath =
			`users/${uid}` +
			`/` +
			`${dateObj.getUTCFullYear()}` +
			'_' +
			parseInt(dateObj.getUTCMonth() + 1) +
			'_' +
			dateObj.getUTCDate() +
			`}/`
		set(ref(db, todaysPath), {
			input: inputRef,
			email: auth.currentUser.email,
			name: auth.currentUser.displayName,
		})
			.then(() => {
				console.log('data saved!')
			})
			.catch((error) => console.log(error))
	}, [inputRef])

	const signOutGoogle = async () => {
		try {
			signOut(auth).then(
				alert(
					'signed out successfully! current user is ' +
						auth.currentUser.email
				)
			)
		} catch (error) {
			console.log(error)
		}
	}

	const handleChange = () => {
		console.log('things have changed')
		setWordCount(() => entry.split(' ').length)
		document.title = wordsLeft ? wordsLeft + ' words remain' : ''
	}

	return (
		<ChakraProvider theme={theme}>
			<div className='OneThousandWords'>
				{isUserSignedIn() ? (
					<ProgressBar wordCount={wordCount} wordLimit={wordLimit} />
				) : null}

				<div className='vertical-center'>
					<Box>
						{/* <h1>{dummyText}</h1> */}
						{!isUserSignedIn() ? (
							<Center position='relative'>
								<Button onClick={signInGoogle} mt='50vh'>
									Connect with Google
								</Button>{' '}
							</Center>
						) : null}
						{isUserSignedIn() ? (
							<Box
								position='fixed'
								right='10px'
								top='20px'
								height='auto'
								backgroundColor='red'
							>
								<Button
									onClick={signOutGoogle}
									width=''
									// float='right'
									right='10px'
									position='fixed'
									top='100px'
								>
									Sign out
								</Button>
								<Box
									// float='right'
									textAlign='right'
									backgroundColor='pink'
									position='relative'
								>
									<Text
										fontSize='14px'
										fontWeight='300'
										// textAlign='left'
										// width='100%'
									>
										<Box
											fontWeight='bold'
											// float='right'
											ml='20px'
										>
											{getAuth().currentUser.email}
										</Box>
									</Text>
									<Image
										w='25px'
										borderRadius='full'
										src={proPicUrl}
										ml='15px'
									/>
								</Box>
							</Box>
						) : null}
					</Box>
					<Button onClick={handleClick}></Button>
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

					{isUserSignedIn() ? (
						<div className='input-wrapper container'>
							<Center>
								<form action=''>
									<input
										type='text'
										name=''
										id=''
										onKeyPress={(e) => {
											setInputRef(e.target.value)
										}}
									/>
								</form>
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
