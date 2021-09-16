import { Box, Button, Slide, useDisclosure, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

import { SimpleGrid, Text } from '@chakra-ui/layout'

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
				// onClick={onToggle}
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
							// textAlign: 'left',
							maxWidth: '40wh',
							minWidth: '100px',
						}}
					>
						<SimpleGrid
							columns={2}
							spacingX='40px'
							spacingY='20px'
							textAlign='left'
						>
							<Box minWidth='100px' padding='20px'>
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
							</Box>
							<Box minWidth='100px' padding='20px'>
								<p>
									most frequent uncommon words:
									<Text fontWeight='300'>
										<ol>
											{props.topWords
												? props.topWords.map(
														(element) => (
															<li>{element}</li>
														)
												  )
												: null}
										</ol>
									</Text>
								</p>
							</Box>
						</SimpleGrid>
					</div>
				</Box>
			</Slide>
		</div>
	)
}

export default Stats
