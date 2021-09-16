import { Input } from '@chakra-ui/react'
import React from 'react'

const Typewriter = (props) => {
	return (
		<form
			action=''
			onSubmit={(x) => x.preventDefault()}
			onChange={(e) => {
				props.setEntry(() => e.target.value)

				props.handleChange()
			}}
		>
			<Input
				className='main centered'
				style={{
					border: 'none',
					padding: 0,
					paddingLeft: '20%',
					paddingRight: '20%',
					borderRadius: 0,
					outline: 'none',
					width: '80vw',
					height: '30vh',
					marginTop: '20vh',
					color: 'white',
					backgroundColor: 'transparent',
					boxShadow: 'none',
					textAlign: 'right',
					caretShape: 'block',
					fontSize: '9vw',
				}}
				type='text'
				required
				autoFocus
				entry={props.entry}
				placeholder={`${props.wordLimit} words`}
				// onKeyPressCapture={}
			/>
		</form>
	)
}

export default Typewriter
