import React, { Component } from 'react';
import './AccountList.css';

import dataService from '../../../../data/dataService';

export default class AccountList extends Component {
	state = {
		order: null
	}
	render() {
		if (this.state.order === null) return null;

		let {
			salad,
			soup,
			hotter,
			side,
			submenu
		} = this.state.order;

		const submenuPrice = submenu.reduce((totalPrice, item) => +totalPrice + (+item.amount * +item.price), 0);
		const lunchPrice = 199
		return (
			<div className='account-list'>	
				<div className="account-list-item">
					<div className="account-list-item-title">Комплексный обед</div>
					<div className="account-list-list-item-price">199 руб.</div>
				</div>
				<div className="account-list-item account-list-item-sub">
					<div className="account-list-item-title">{salad}</div>
					<div className="account-list-list-item-price"></div>
				</div>
				<div className="account-list-item account-list-item-sub">
					<div className="account-list-item-title">{soup}</div>
					<div className="account-list-list-item-price"></div>
				</div>
				<div className="account-list-item account-list-item-sub">
					<div className="account-list-item-title">{hotter}</div>
					<div className="account-list-list-item-price"></div>
				</div>
				<div className="account-list-item account-list-item-sub">
					<div className="account-list-item-title">{side === 'NO_NEED' ? null : side}</div>
					<div className="account-list-list-item-price"></div>
				</div>

				{submenu.map(
					item => (
						<div className="account-list-item" key={item.name}>
							<div className="account-list-item-title">{item.name}</div>
							<div className="account-list-item-price">{item.amount} &#10005; {item.price} руб. = {item.amount * item.price} руб.</div>
						</div>
					)
				)}

				<div className="account-list-item account-list-total">
					<div className="account-list-total-text">Итого</div>
					<div className="account-list-total-price">{submenuPrice + lunchPrice} руб.</div>
				</div>
			</div>
		);
	}
	componentDidMount() {
		this.getData();

		dataService.on('changeOrder', this.getData);
	}
	componentWillUnmount() {
		dataService.off('changeOrder', this.getData);
	}
	getData = () => {
		this.setState({
			order: dataService.getOrder()
		})
	}
}
