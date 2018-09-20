import EventEmitter from 'event-emitter-es6';
import menu from './menu.json';
import submenu from './submenu.json';
import m from 'moment';

const isMatchDate = (date1, date2) => date1.month === date2.month&&date1.day === date2.day;
const FirstDateGreaterSecond = (date1, date2) => date1.month > date2.month&&date1.day > date2.day;

class DataService extends EventEmitter {
	constructor() {
		super();
		this.CLOSED_TIME =  m().hour(14).minute(0);

		this.menu = menu;
		this.submenu = submenu.map(item => ({...item, amount: 0}));

		this.startDate = this.getStartedDate();

		this.selectedDate = Object.assign({}, this.startDate);

		this.orderDefault = () => {
			console.log(this.menu[0].items.filter(i => i.category == 'soup')[0])
			if (true) {
				return {
					salad: this.menu[0].items.filter(i => i.category == 'salad')[0].title,
					soup:  this.menu[0].items.filter(i => i.category == 'soup')[0].title,
					hotter:  this.menu[0].items.filter(i => i.category == 'hotter')[0].title,
					side:  this.menu[0].items.filter(i => i.category == 'side')[0].title,
					submenu: []
				}
			}

		}
		// ({
		// 	salad: null,
		// 	soup: null,
		// 	hotter: null,
		// 	side: null,
		// 	submenu: []
		// })

		this.order = this.orderDefault();
	}

	getStartedDate() {
		let month = m().month();
		let day = m().date();

		let currentDate = this.CLOSED_TIME.diff(m()) > 0
		? {month, day}
		: {month, day: m().month(month).date(day).add(1, 'd').date()}
	
		let endDate = this.menu[this.menu.length-1].date||currentDate;

		console.log(endDate)
		while (
			!this.isWorkingDate(currentDate)
			&&!FirstDateGreaterSecond(currentDate, endDate)
		) {
			let newDate = m().month(currentDate.month).date(currentDate.day).add(1, 'd');

			currentDate.month = newDate.month();
			currentDate.day = newDate.date();

			console.log(currentDate)
		}

		return currentDate;
	}

	changeDate(date) {
		this.selectedDate = date;
		this.clearOrder();
		this.emit('changeDate');
	}

	selectedDayIsToday() {
		let today = {
			month: m().month(),
			day: m().date()
		}

		return isMatchDate(this.selectedDate, today); 
	}

	addToOrderDish(name, category) {
		this.order[category] = name;
		this.emit('changeOrder');
	}

	removeToOrderDish(category) {
		this.order[category] = null;
		this.emit('changeOrder');
	}

	addToOrderSubmenu(newItem) {
		let submenu = this.order.submenu;

		let item = submenu.find(item => item.name === newItem.name)

		if (item) {
			item.amount++
		} else {
			newItem.amount++;

			submenu.push(newItem)
		}

		this.emit('changeOrder');
	}

	removeToOrderSubmenu(name) {
		let submenu = this.order.submenu;

		let item = submenu.find(item => item.name === name)

		--item.amount;

		if (item.amount === 0) this.order.submenu = submenu.filter(item => item.name !== name)

		this.emit('changeOrder');

		console.log(this)
	}

	getMenuForSelectedDay() {
		return this.menu.find(
			item => isMatchDate(item.date, this.selectedDate)
			)
	}

	isWorkingDate(date) {
		return this.menu.some(item => isMatchDate(item.date, date))
	}

	getNoSelectedValues() {
		let values = [];

		if (!this.order.salad) values.push('салат');
		if (!this.order.soup) values.push('суп');
		if (!this.order.hotter) values.push('горячее');
		if (!this.order.side) values.push('гарнир');

		return values
	}

	getOrder() {
		return Object.assign({}, this.order);
	}

	clearOrder() {
		this.order = this.orderDefault();
		this.emit('changeOrder');
		console.log(this.order)
	}
}

const dataService = new DataService();

export default dataService;
