// import Typewriter from './Typewriter';
import { Progress } from '@chakra-ui/react'
import React from 'react'

const ProgressBar = (props) => {
	const wordLimit = props.wordLimit
	const wordCount = props.wordCount
	return (
		<div>
			<Progress
				max={wordLimit}
				value={wordCount}
				style={{
					width: '100%',
					backgroundColor: 'rgb(255, 230, 155)',
					color: 'rgb(135, 169, 236)',
					height: '15px',
				}}
			></Progress>

			<p
				style={{
					zIndex: 100,
					fontSize: '12px',
					color: 'rgb(135, 169, 236)',
					fontWeight: '800',
					position: 'absolute',
					top: '0%',
					left: `${(wordCount / wordLimit) * 100 + 1}%`,
				}}
			>
				{Math.floor((wordCount / wordLimit) * 100)}%
			</p>
		</div>
	)
}

export default ProgressBar
