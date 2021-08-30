import React, { useRef, useState } from 'react'
import { Alert, Card, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
	Center,
	Flex,
	Heading,
	Input,
	Button,
	InputGroup,
	Stack,
	InputLeftElement,
	chakra,
	Box,
	Avatar,
	FormControl,
	FormHelperText,
	InputRightElement,
} from '@chakra-ui/react'

export default function Login(props) {
	const emailRef = useRef()
	const passwordRef = useRef()
	const { login } = useAuth()
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const history = useHistory()

	const CFaUserAlt = ''
	const CFaLock = ''
	const showPassword = ''
	const handleShowClick = ''

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			setError('')
			setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
			props.setLogin(true)
			history.push('/morningpage')
		} catch {
			setError('Failed to log in')
		}
		setLoading(false)
	}

	return (
		<Center>
			<Flex style={{ width: '100%' }}>
				<Card.Body style={{ width: '100%' }}>
					<h2 className='text-center mb-4'>Log In</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required
							/>
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								ref={passwordRef}
								required
							/>
						</Form.Group>
						<Button
							disabled={loading}
							className='w-100'
							type='submit'
						>
							Log In
						</Button>
					</Form>
					<div className='w-100 text-center mt-3'>
						<Link to='/morningpage/forgot-password'>
							Forgot Password?
						</Link>
					</div>
				</Card.Body>
			</Flex>
			<div className='w-100 text-center mt-2'>
				Need an account? <Link to='/morningpage/signup'>Sign Up</Link>
			</div>
		</Center>
	)
}
