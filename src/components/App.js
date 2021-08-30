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
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'
import Dashboard from './Dashboard'
import Footer from './Footer'
import Login from './Login'
import ProgressBar from './ProgressBar'
import Signup from './Signup'
import Stats from './Stats'
import Typewriter from './Typewriter'
import PrivateRoute from './PrivateRoute'
import UpdateProfile from './UpdateProfile'
import ForgotPassword from './ForgotPassword'
import theme from '../theme'

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

	const handleChange = () => {
		setWordCount(() => entry.split(' ').length)
		document.title = wordsLeft ? wordsLeft + ' words remain' : ''
	}

	return (
		<ChakraProvider theme={theme}>
			<Container className='d-flex align-items-center justify-content-center'>
				<Router>
					<AuthProvider>
						<Switch>
							<PrivateRoute
								exact
								path='/'
								component={Dashboard}
							/>
							<PrivateRoute
								exact
								path='/update-profile'
								component={UpdateProfile}
							/>
							<Route path='/signup' component={Signup} />
							<Route path='/login' component={Login} />
							<Route
								path='/forgot-password'
								component={ForgotPassword}
							/>
						</Switch>
					</AuthProvider>
				</Router>
			</Container>

			{!loggedIn ? (
				<Login />
			) : (
				<div className='OneThousandWords'>
					<ProgressBar wordCount={wordCount} wordLimit={wordLimit} />
					<Box
						textAlign='right'
						bg='blue.200'
						w='50vh'
						p='20px'
					></Box>
					<div className='vertical-center'>
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
													<p>
														Total words: {wordCount}
													</p>
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
			)}
		</ChakraProvider>
	)
}
export default App
