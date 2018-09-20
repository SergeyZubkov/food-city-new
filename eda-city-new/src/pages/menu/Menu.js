import React, { Component } from 'react';
import './Menu.css';

import Dish from './dish/Dish';
import Calendar from './calendar/Calendar';
import Submenu from './submenu/Submenu';
import MenuOrderSection from './menuOrderSection/MenuOrderSection';

import closed from '../../imgs/closed.svg';

import dataService from '../../data/dataService';

export default class Menu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menuDay: dataService.getMenuForSelectedDay(),
			order: dataService.getOrder()
		}

		// this.selectedDayIsToday = dataService.selectedDayIsToday();
		this.selectedDayIsToday = true;
	}
	componentDidMount() {
		dataService.on('changeOrder', this.refreshOrder);
		dataService.on('changeDate', this.refreshMenuDay);
	}
	componentWillUnmount() {
		dataService.off('changeOrder', this.refreshOrder);
		dataService.off('changeDate', this.refreshMenuDay);
		console.log('menu destory')
	}
	refreshOrder = () => {
		this.setState({order: dataService.getOrder()})
	}
	refreshMenuDay = () => {
		this.selectedDayIsToday = dataService.selectedDayIsToday()

		this.setState(
			{
				menuDay: dataService.getMenuForSelectedDay()
			}
		)
	}
	handleSelect = (name, category) => {
		dataService.addToOrderDish(name, category);
	}
	handleDiselect = (category) => {
		dataService.removeToOrderDish(category);
	}
	renderCategory(category, items, categoryTitle) {
		let {order} = this.state;
		console.log(order[category]);
		return (
			<div className="menu-category" key={categoryTitle} >
				<div className="menu-category-title">{categoryTitle}</div>
				<div className="menu-category-variants">
					{
						items
						.filter(item => item.category === category)
						.map(
							item => (
								<Dish 
									key={item.title} 
									onSelected={this.handleSelect} 
									onDiselected={this.handleDiselect}
									isSelected={order[category] == item.title}
									disabled={order[category]&&order[category] !== item.title}
									selectable={!this.selectedDayIsToday}
									{...item}
								/>
							)
						)
					}
				</div>
			</div>
		)
	}
	renderMenu() {
		
		let menuItems = this.state.menuDay.items.filter(item => {
			if (this.selectedDayIsToday) {
				return +item.alternative === 0
			}
			return item
		})

		console.log(this.selectedDayIsToday)

		let categoryTitles = {
			salad: "салаты",
			soup: "супы",
			hotter: "горячее",
			side: "гарниры"
		}
		let categories = Object.keys(categoryTitles);
		let jsx = [];

		return categories.map(category => {
				return this.renderCategory(
					category,
					menuItems, 
					categoryTitles[category]
				)
		})
	}

	render() {
		let {
			menuDay:menu, order
		} = this.state;

		if (!menu)  {
			return (
				<div className="menu">
					<div className="menu-calendar">
						<Calendar />
					</div>
					<div className="menu-notwork">
						<div className="menu-notwork-icon">
							<img src={closed} alt=""/>
						</div>
						<div className="menu-notwork-text">
							Приносим вам свои извенения, но сегодня мы не работаем. Вы можете посмотреть меню на другой день, нажав на нужную дату вверху.
						</div>
					</div>
				</div>
			)
		}

		return (
			<React.Fragment>
			<div className="menu-calendar">
					<Calendar />
			</div>
			<div className='menu container'>
				<div className="menu-intro">
					В состав обеда входит: суп, салат, горячее, гарнир и хлеб. Обед комплектуется одноразовыми приборами, солью и перцем
				</div>
				<div className="menu-stock">
					Только до 31 октября: комплексный обед за <span className='line-through'>249</span> 199 рублей
				</div>

				{this.renderMenu()}

				<Submenu />
				
				<MenuOrderSection isValidate={!this.selectedDayIsToday} />
				
			</div>
			</React.Fragment>
		);
	}
}
