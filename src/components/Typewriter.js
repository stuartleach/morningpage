import { Input } from '@chakra-ui/react'
import React from 'react'
// import { auth, firestore } from './firebase'
import firebase from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const Typewriter = (props) => {
	// const entryRef = props.entryRef

	// const [thisEntry] = useCollectionData(entryRef)

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
				entry={props.entry}
				placeholder={`${props.wordLimit} words`}
				onChange={(e) => {
					props.handleChange()
					props.setEntry(() => e.target.value)
					props.setWordCount(() => props.entry.split(' ').length)
					props.setWordsLeft(() => props.wordLimit - props.wordCount)
					props.setCharCount(() => props.entry.split('').length)
					/* entryRef.add({
						text: props.entryRef,
						complete: false,
						createdAt:
							firebase.firestore.FieldValue.serverTimestamp(),
					}) */
				}}
			/>
		</form>
	)
}

export default Typewriter
