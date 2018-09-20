import React, { Component } from 'react';
import "./Button.css"

export default class Button extends Component {
	handleClick = () => {
		if (!this.props.disabled&&this.props.onClick) this.props.onClick();
	}
	render() {
		const {className, disabled} = this.props;
		return (
			<div 
				className={`button ${className} ${disabled ? 'button-disabled': ''}`} 
				onClick={this.handleClick}
			>
				{this.props.children}
			</div>
		);
	}
}
