import React, { Component } from 'react';
import './ButtonArrow.css';

export default class ButtonArrow extends Component {
	render() {
		const {
			children,
			onClick
		} = this.props;

		return (
			<div className='button-arrow' onClick={onClick}>
				{children}

				<svg width="0" height="0">
				    <defs>
				        <clipPath id="clip-triangle" clipPathUnits="objectBoundingBox">
				            <polygon points="0.1 0, 1 0, 1 1, 0.1 1, 0 0.5" />
				        </clipPath>
				    </defs>
				</svg>
			</div>
		);
	}
}
