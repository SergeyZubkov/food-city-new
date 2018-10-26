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
			currentOrder: dataService.getCurrentOrder()
		}

		this.selectedDayIsToday = dataService.selectedDayIsToday();
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
		this.setState({currentOrder: dataService.getCurrentOrder()})
	}
	refreshMenuDay = () => {
		this.selectedDayIsToday = dataService.selectedDayIsToday()

		this.setState(
			{
				menuDay: dataService.getMenuForSelectedDay()
			}
		)
	}
	handleSelect = (name, category, needSide) => {
		dataService.addToOrderDish(name, category, needSide);
	}
	handleDiselect = (category, needSide) => {
		dataService.removeToOrderDish(category, needSide);
	}
	renderCategory(category, items, categoryTitle) {
		let {currentOrder} = this.state;
		
		const isDisabled = (category, title) => {
			if (currentOrder[category] === 'NO_NEED') return true
			return currentOrder[category]&&currentOrder[category] !== title
		}


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
									isSelected={currentOrder[category] === item.title}
									disabled={isDisabled(item.category, item.title)}
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
		
		// убираем альтернативные блюда на сегодня
		let menuItems = this.state.menuDay.items.filter(item => {
			if (this.selectedDayIsToday) {
				console.log('this no run')
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
			menuDay:menu
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
					В состав обеда входит: суп, салат, горячее, гарнир, ягодный напиток и хлеб. Обед комплектуется одноразовыми приборами, солью и перцем
				</div>

				<div className="menu-categories">
					{this.renderMenu()}
				</div>

				<Submenu />
				
				<MenuOrderSection/>
				
			</div>
			</React.Fragment>
		);
	}
}
