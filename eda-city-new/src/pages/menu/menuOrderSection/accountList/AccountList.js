import React, { Component, Fragment } from 'react';
import './AccountList.css';

import dataService from '../../../../data/dataService';

const LUNCH_PRICE = dataService.getLunchPrice();

export default class AccountList extends Component {
	state = {
		order: null

	}
	render() {
		let {
			order
		} = this.state;

		if (!order) return null


		const getTotalSumSubmenu = (submenu) => {
			return submenu.reduce(
				(submenuSum, item) => submenuSum += +item.amount * +item.price, 0
			)
		}
		const {
			isEmptyOrderItem
		} = dataService;

		const filteredOrder = order

		if (filteredOrder.length === 0) return null;

		const totalPrice = filteredOrder.reduce(
			(totalSum, item) => totalSum += LUNCH_PRICE + getTotalSumSubmenu(item.submenu), 0
		)

		return (
			<div className='account-list'>	
				{this.renderOrder(filteredOrder)}

				<div className="account-list-item account-list-total">
					<div className="account-list-total-text">Итого</div>
					<div className="account-list-total-price">{totalPrice} руб.</div>
				</div>
			</div>
		);
	}
	renderOrder(order) {
		return order.map(
			(item, i) => (
				<Fragment key={i}>
				<div className="account-list-item">
					<div className="account-list-item-title">Комплексный обед</div>
					<div className="account-list-list-item-price">{LUNCH_PRICE} руб.</div>
				</div>
				<div className="account-list-item account-list-item-sub">
					<div className="account-list-item-title">{item.salad||<span style={{color: "red"}}>вы не выбрали салат</span>}</div>
					<div className="account-list-list-item-price"></div>
				</div>
				<div className="account-list-item account-list-item-sub">
					<div className="account-list-item-title">{item.soup||<span style={{color: "red"}}>вы не выбрали суп</span>}</div>
					<div className="account-list-list-item-price"></div>
				</div>
				<div className="account-list-item account-list-item-sub">
					<div className="account-list-item-title">{item.hotter||<span style={{color: "red"}}>вы не выбрали горячее</span>}</div>
					<div className="account-list-list-item-price"></div>
				</div>
				<div className="account-list-item account-list-item-sub">
					<div className="account-list-item-title">{item.side === 'NO_NEED' ? null : item.side||<span style={{color: "red"}}>вы не выбрали гарнир</span>}</div>
					<div className="account-list-list-item-price"></div>
				</div>

				{item.submenu.map(
					subItem => (
						<div className="account-list-item" key={subItem.name}>
							<div className="account-list-item-title">{subItem.name}</div>
							<div className="account-list-item-price">{subItem.amount} &#10005; {subItem.price} руб. = {subItem.amount * subItem.price} руб.</div>
						</div>
					)
				)}
				</Fragment>
			)
		)
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
