import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
	styles: {
		global: {
			'html, body': {
				color: 'blue.600',
				lineHeight: '1.4',
				backgroundColor: '#d0eaff',
				display: 'block',
				height: '100%',
				background: `linear-gradient(0deg,  rgba(135, 169, 236, 0.5),rgba(218, 194, 119, 0.377))`,
			},
		},

		body: {
			/* background-color: var(--main-bg-color-dark); */
			// background-color: var(--dark-bg-color);
			fontFamily: 'Roboto, Arial, sans-serif',
			margin: 0,
			padding: 0,
			overflowX: 'hidden',
			overflowY: 'hidden',
		},

		'.vertical-center': {
			minHeight: '100vh',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'relative',
		},

		form: {
			display: 'block',
		},

		input: {
			_placeholder: {
				fontSize: '12px',
				color: 'green',
			},
		},

		'.Footer': {
			// display: 'flex',
			// marginTop: '70vh',
			a: {
				// fontSize: '30px',
				// float: 'none',
				padding: '20px',
				// display: 'block',
				opacity: '0.3',
				transition: '.5s',
				_hover: {
					opacity: 1,
					transition: '.5s',
				},
			},
		},

		h2: {
			color: 'white',
		},

		'.btn': {
			backgroundColor: 'rgb(36, 44, 114)' /* Green */,
			position: 'relative',
			border: 'none',
			color: 'white',
			padding: '15px 32px',
			textAlign: 'center',
			textDecoration: 'none',
			letterSpacing: '2px',
			textTransform: 'lowercase',
			display: 'inline-block',
			fontSize: '.9em',
			width: '40vh',
			opacity: '.4',
			transition: '.5s',
			borderRadius: '10%',
			_hover: {
				opacity: '.5',
				transition: '.5s',
			},
		},

		'.stats': {
			right: '20%',
			left: '20%',
			marginTop: '20vh',
			bottom: '25%',
			listStyleType: 'none',
			position: 'fixed',
			marginTop: '10vh',
			transition: '2s',
			display: 'flex',
			justifyContent: 'center',
			'.btn': {
				opacity: '0',
			},
		},

		'#progress': {
			border: 'none',
			width: '100vh ',
			position: 'absolute',
			height: '2%',
			zIndex: '-1',
			_value: {
				color: 'rgba(218, 194, 119, 0.377)',
			},
		},

		'.card': {
			width: '900px',
		},

		'.input-wrapper': {
			width: '100%',
			position: 'fixed',
		},

		img: {
			display: 'inline',
		},
		a: {
			textDecoration: 'none',
			color: 'white',
			transition: 'color 0.1s ease',
			_hover: {
				color: '#9b9b9b',
			},
		},
	},
})

export default theme
