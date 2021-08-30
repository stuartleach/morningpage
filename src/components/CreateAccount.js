import React, { Component, createRef } from 'react';

export default class CreateAccount extends Component {
	render() {
	
		return (
			<div className="centered" style={{ textAlign: 'left' }}>
				<form action="" >
					<label>
						email:
						<input type="text"  />
					</label>
					<br />
					<label>
						password:
						<input type="text"  />
					</label>
					<br />
					<button type="submit" value="Submit">
						submit
					</button>
				</form>
			</div>
		);
	}
}
