import React, { Component } from 'react';
import './SubmenuItem.css';

import dataService from '../../../../data/dataService';
import Button from '../../../../commons/button/Button';

export default class SubmenuItem extends Component {

	addOne = () => {
		let {
			name,
			price,
			amount
		} = this.props;

		dataService.addToOrderSubmenu({name, price, amount})



	}
	removeOne = () => {

		if (this.props.amount === 0) return

		dataService.removeToOrderSubmenu(this.props.name)

	}

	render() {
		let {
			name, 
			price,
			amount
		} = this.props;


		return (
			<div className="submenu-item">
				<div className="submenu-item-title">{name}</div>
				<div className="submenu-item-order">
					<div className="submenu-item-price">{price} руб.</div>
					<Button className='button-default' onClick={this.removeOne}> - </Button>
					<div className="submenu-item-amount">{amount}</div>
					<Button className='button-default' onClick={this.addOne}> + </Button>
				</div>
			</div>
		);
	}
}
