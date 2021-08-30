import { Box, Button, Slide, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'

const Stats = (props) => {
	const { isOpen, onToggle } = useDisclosure()
	const [showing, setShowing] = useState(false)
	const wordCount = props.wordCount
	const wordsLeft = props.wordsLeft
	const charCount = props.charCount
	const wordsCounted = props.wordsCounted
	const setWordsCounted = props.setWordsCounted
	return (
		<div align='center'>
			{/* <Button
					className='btn'
					style={{
						color: 'white',
						background: `linear-gradient(180deg,  rgba(135, 169, 236, 0.5),rgba(218, 194, 119, 0.377))`,
						width: '10rem',
					}}
					_hover={{
						opacity: '.2',
					}}
				>
					{!showing ? 'Show stats' : null}
					{showing ? (
						
					) : null}{' '}
				</Button> */}
			<Button
				onClick={onToggle}
				style={{
					color: 'white',
					background: `linear-gradient(180deg,  rgba(135, 169, 236, 0.5),rgba(218, 194, 119, 0.377))`,
					width: '10rem',
					fontSize: '14px',
					boxShadow: 'none',
				}}
				className='btn'
				_hover={{
					opacity: '.5',
				}}
			>
				{isOpen ? <div>Hide Stats</div> : <div>Show Stats</div>}
			</Button>
			<Button
				onClick={onToggle}
				style={{
					color: 'white',
					background: `linear-gradient(180deg,  rgba(135, 169, 236, 0.5),rgba(218, 194, 119, 0.377))`,
					width: '10rem',
					fontSize: '14px',
					boxShadow: 'none',
					marginLeft: '20px',
				}}
				className='btn'
				_hover={{
					opacity: '.5',
				}}
				onClick={() => props.finishEarly(true)}
			>
				Finish
			</Button>
			<Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
				<Box
					p='100px'
					color='white'
					mt='4'
					bg='rgb(47, 82, 114)'
					rounded='md'
					shadow='lg'
				>
					<div
						className='statLines'
						style={{
							textAlign: 'left',
							width: '40wh',
						}}
					>
						<p>
							words remaining:
							<span> {wordsLeft}</span>
						</p>
						<p>
							word count:
							<span> {wordCount}</span>
						</p>
						<p>
							character count:
							<span> {charCount}</span>
						</p>
						{/* <p>
							most popular words:
							<span></span>
						</p> */}
					</div>
				</Box>
			</Slide>
		</div>
	)
}

export default Stats
