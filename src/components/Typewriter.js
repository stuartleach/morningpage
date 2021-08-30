import { Input } from '@chakra-ui/react'
import React from 'react'

const Typewriter = (props) => {
	return (
		<form action=''>
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
					fontSize: '10vh',
					color: 'white',
					// lineHeight: '3em',
					backgroundColor: 'transparent',
					boxShadow: 'none',
					textAlign: 'center',
					caretColor: 'transparent',
				}}
				type='text'
				required
				entry={props.entryRef}
				placeholder={`${props.wordLimit} words`}
				onChange={(e) => {
					props.setEntry(() => e.target.value)
					props.setWordCount(() => props.entry.split(' ').length)
					props.setWordsLeft(() => props.wordLimit - props.wordCount)
					props.setCharCount(() => props.entry.split('').length)
				}}
			/>
		</form>
	)
}

export default Typewriter
