import React, { Component } from 'react';
import './FeatureItem.css'

export default class FeatureItem extends Component {
	render() {
		const {
			icon,
			text
		} = this.props;

		return (
			<div className='feature-item'>
				<img className="feature-item-icon" src={icon} alt="" />
				<div className="feature-item-text">{text}</div>
			</div>
		);
	}
}
