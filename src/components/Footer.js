import { Center, Image } from '@chakra-ui/react'
import React from 'react'
import gitLogo from '../images/github.png'
import linkedinLogo from '../images/linkedin.png'
import emailLogo from '../images/email.png'
import spotifyLogo from '../images/spotify.png'

const Footer = (props) => {
	const github = props.github,
		emailContact = props.emailContact,
		linkedin = props.linkedin,
		spotify = props.spotify

	return (
		<Center width='100vh'>
			<Center>
				<div className='footLinks'>
					<a href={github} rel='noreferrer' target='_blank'>
						<Image
							src={gitLogo}
							alt='git'
							width='25px'
							style={{
								display: 'inline-block',
								margin: '10px',
								transitionDuration: '.2s',
							}}
							_hover={{ opacity: '0.1' }}
						/>
					</a>
					<a href={emailContact} rel='noreferrer' target='_blank'>
						<Image
							src={emailLogo}
							alt='email'
							width='25px'
							style={{
								display: 'inline-block',
								margin: '10px',
								transitionDuration: '.2s',
							}}
							_hover={{ opacity: '0.1' }}
						/>
					</a>
					<a href={linkedin} rel='noreferrer' target='_blank'>
						<Image
							src={linkedinLogo}
							alt='linkedin'
							width='25px'
							style={{
								display: 'inline-block',
								margin: '10px',
								transitionDuration: '.2s',
							}}
							_hover={{ opacity: '0.1' }}
						/>
					</a>
					<a href={spotify} rel='noreferrer' target='_blank'>
						{
							<Image
								src={spotifyLogo}
								alt='spotify'
								width='25px'
								style={{
									display: 'inline-block',
									margin: '10px',
									transitionDuration: '.2s',
								}}
								_hover={{ opacity: '0.1' }}
							/>
						}
					</a>
				</div>
			</Center>
		</Center>
	)
}

export default Footer
