import React, { Component } from 'react';
import './Dish.css'

import defaultImg from '../../../imgs/dish-default.svg';
import Button from '../../../commons/button/Button';

export default class Dish extends Component {
	handleSelect = () => {
		if (this.props.disabled) return

		let {
			title,
			category,
			needSide
		} = this.props;

		this.props.onSelected(title, category, needSide);
		this.setState({isSelected: true})
	}
	handleDiselect = () => {
		if (this.props.disabled) return

		let {
			category,
			needSide
		} = this.props;

		this.props.onDiselected(category, needSide);
		this.setState({isSelected: false})
	}
	render() {
		let {
			title, 
			img, 
			composition, 
			disabled, 
			isSelected,
			selectable
		} = this.props;

		let button = (
			isSelected 
			? <Button className="button-red" onClick={this.handleDiselect}> отмена </Button> 
			: <Button className="button-green" onClick={this.handleSelect}> выбрать </Button>
		)

		console.log(button)

		return (
			<div className={`dish ${disabled ? 'dish-disabled' : ''}`}>
				<div className="dish-img-container">
					<img src={img||defaultImg} alt="" className={img ? 'dish-img' : 'dish-img-default'}/>
				</div>
				<div className="dish-title">{title}</div>
				<div className="dish-composition">
						<div className="dish-composition-title">состав:</div>
						<div className="dish-composition-desc">{composition}</div>
				</div>
				{selectable&&button}
			</div>
		);
	}
}
