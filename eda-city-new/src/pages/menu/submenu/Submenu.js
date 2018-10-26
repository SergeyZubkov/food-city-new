import React, { Component } from 'react';
import './Submenu.css';

import SubmenuItem from './submenu-item/SubmenuItem';
import dataService from '../../../data/dataService';

export default class Submenu extends Component {
	state = {
		submenu: null
	}
	render() {
		if (this.state.submenu === null) return null;
		const submenu = this.state.submenu;

		return (
			<div className='submenu'>
				<div className="submenu-title">Дополнительное меню</div>
				
				<div className="submenu-category">
					<div className="submenu-category-title">Хлеб</div>
					{submenu.filter(i => i.category === 'хлеб').map((item, i) => <SubmenuItem key={i} {...item} />)}
				</div>

				<div className="submenu-category">
					<div className="submenu-category-title">Напитки (250мл)</div>
					{submenu.filter(i => i.category === 'напитки').map((item, i) => <SubmenuItem key={i} {...item} />)}
				</div>

				<div className="submenu-category">
					<div className="submenu-category-title">Соусы</div>
					{submenu.filter(i => i.category === 'соусы').map((item, i) => <SubmenuItem key={i} {...item} />)}

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
		let orderSubmenu = dataService.getCurrentOrder()["submenu"];

		this.setState({
			submenu: dataService.submenu.map(item => {
				
				let match = orderSubmenu.find(i => i.name === item.name);
				if (match) {
					item.amount = match.amount
				} else {
					item.amount = 0;
				}

				return item;
			})
		})
	}
}
