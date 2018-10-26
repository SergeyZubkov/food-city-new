import EventEmitter from 'event-emitter-es6';
import menu from './menu.json';
import submenu from './submenu.json';
import m from 'moment';
import {
	isEmpty,
	pick,
	every
} from 'lodash-es';

const isMatchDate = (date1, date2) => date1.month === date2.month&&date1.day === date2.day;
const FirstDateGreaterSecond = (date1, date2) => date1.month > date2.month||date1.day > date2.day;

const isNoNeedSide = (category, needSide) => category === 'hotter' && !needSide;

const NO_NEED = 'NO_NEED';

class DataService extends EventEmitter {
	constructor() {
		super();

		this.CLOSED_TIME =  m().hour(14).minute(0);
		this.LUNCH_PRICE = 249;

		this.menu = menu;
		this.submenu = submenu.map(item => ({...item, amount: 0}));

		this.startDate = this.getStartedDate();

		this.selectedDate = Object.assign({}, this.startDate);

		this.order = [];

		this.orderDefault = () => {

			if (this.selectedDayIsToday()) {
				const todayMenu = this.getMenuForSelectedDay();

				return {
					salad: todayMenu.items.filter(i => i.category === 'salad')[0].title,
					soup:  todayMenu.items.filter(i => i.category === 'soup')[0].title,
					hotter:  todayMenu.items.filter(i => i.category === 'hotter')[0].title,
					side:  todayMenu.items.filter(i => i.category === 'hotter')[0].needSide
					? todayMenu.items.filter(i => i.category === 'side')[0].title
					: NO_NEED,
					submenu: []
				}
			} else {
				return {
					salad: "",
					soup: "",
					hotter: "",
					side: "",
					amount: 1,
					submenu: []
				}
			}
		}

		this.addOrderItem();
	}

	getStartedDate() {
		let currentMonth = m().month();
		let currentDay = m().date();

		let startDate = this.CLOSED_TIME.diff(m()) > 0
		? {month: currentMonth, day: currentDay}
		: {month: m().month(currentMonth).add(1, 'd').month(), day: m().month(currentMonth).date(currentDay).add(1, 'd').date()}
	
		let endDate = this.menu[this.menu.length-1].date||startDate;

		while (
			!this.isWorkingDate(startDate)
			&&!FirstDateGreaterSecond(startDate, endDate)
		) {
			let newDate = m().month(startDate.month).date(startDate.day).add(1, 'd');

			startDate.month = newDate.month();
			startDate.day = newDate.date();


		}

		return startDate;
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

	addToOrderDish(name, category, needSide) {	
		let currentOrder = this.getCurrentOrder();

		if (isNoNeedSide(category, needSide)) {
			currentOrder['side'] = NO_NEED;
			console.log('no_need')
		}

		currentOrder[category] = name;
		this.emit('changeOrder');
	}

	removeToOrderDish(category, needSide) {
		let currentOrder = this.getCurrentOrder();

		if (isNoNeedSide(category, needSide)) {
			currentOrder['side'] = null;
		}

		currentOrder[category] = null;
		console.log("orderHaveMoreOneItem")
		console.log(this.orderHaveMoreOneItem())
		console.log("isEmptyOrderItem")
		console.log(this.isEmptyOrderItem(currentOrder))
		if (
			this.orderHaveMoreOneItem()
			&&this.isEmptyOrderItem(currentOrder)
		) {
			this.removeOrderItem()
		}

		this.emit('changeOrder');
	}

	addToOrderSubmenu(newItem) {
		let currentOrder = this.getCurrentOrder();

		let submenu = currentOrder.submenu;

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
		let currentOrder = this.getCurrentOrder();

		let submenu = currentOrder.submenu;

		let item = submenu.find(item => item.name === name)

		--item.amount;

		if (item.amount === 0) currentOrder.submenu = submenu.filter(item => item.name !== name)

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

		let currentOrder = this.getCurrentOrder();

		if (!currentOrder.salad) values.push('салат');
		if (!currentOrder.soup) values.push('суп');
		if (!currentOrder.hotter) values.push('горячее');
		if (!currentOrder.side) values.push('гарнир');

		return values
	}

	getLunchPrice() {
		return this.LUNCH_PRICE;
	}

	getCurrentOrder() {
		return this.order[this.order.length-1];
	}

	getOrder() {
		return this.order
	}

	clearOrder() {
		this.order = [];
		this.order.push(this.orderDefault());

		this.emit('changeOrder');
		console.log(this.order)
	}

	addOrderItem() {
		this.order.push(this.orderDefault());

		this.emit('changeOrder');
	}

	removeOrderItem() {
		this.order.pop();

		this.emit('changeOrder');
	}

	orderHaveMoreOneItem() {
		return this.order.length > 1
	}

	isEmptyOrderItem(item) {
		return every(
				pick(item, ['salad', 'soup', 'hotter', 'side']),
				isEmpty
		)
	}
}

const dataService = new DataService();

export default dataService;
