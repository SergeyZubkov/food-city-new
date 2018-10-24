import EventEmitter from 'event-emitter-es6';
import menu from './menu.json';
import submenu from './submenu.json';
import m from 'moment';

const isMatchDate = (date1, date2) => date1.month === date2.month&&date1.day === date2.day;
const FirstDateGreaterSecond = (date1, date2) => date1.month > date2.month&&date1.day > date2.day;

const isNoNeedSide = (category, needSide) => category == 'hotter' && !needSide

class DataService extends EventEmitter {
	constructor() {
		super();
		this.CLOSED_TIME =  m().hour(14).minute(0);

		this.menu = menu;
		this.submenu = submenu.map(item => ({...item, amount: 0}));

		this.startDate = this.getStartedDate();

		this.selectedDate = Object.assign({}, this.startDate);

		this.orderDefault = () => {

			if (this.selectedDayIsToday()) {
				return {
					salad: this.menu[0].items.filter(i => i.category === 'salad')[0].title,
					soup:  this.menu[0].items.filter(i => i.category === 'soup')[0].title,
					hotter:  this.menu[0].items.filter(i => i.category === 'hotter')[0].title,
					side:  this.menu[0].items.filter(i => i.category === 'side')[0].title,
					amount: 1,
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

		this.order = this.orderDefault();
	}

	getStartedDate() {
		let currentMonth = m().month();
		let currentDay = m().date();

		let startDate = this.CLOSED_TIME.diff(m()) > 0
		? {month: currentMonth, day: currentDay}
		: {month: currentMonth, day: m().month(currentMonth).date(currentDay).add(1, 'd').date()}
	
		let endDate = this.menu[this.menu.length-1].date||startDate;

		while (
			!this.isWorkingDate(startDate)
			&&!FirstDateGreaterSecond(startDate, endDate)
		) {
			let newDate = m().month(startDate.month).date(startDate.day).add(1, 'd');

			startDate.month = newDate.month();
			startDate.day = newDate.date();

			console.log(startDate)
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

		return isMatchDate(this.selectedDate, today)
					||isMatchDate(this.selectedDate, {month: m().month(), day: 24}); 
	}

	addToOrderDish(name, category, needSide) {	
		console.log(isNoNeedSide(category, needSide))
		if (isNoNeedSide(category, needSide)) {
			const NO_NEED = 'NO_NEED';

			this.order['side'] = NO_NEED;
			console.log('no_need')
		}

		this.order[category] = name;
		this.emit('changeOrder');
	}

	removeToOrderDish(category, needSide) {

		if (isNoNeedSide(category, needSide)) {
			this.order['side'] = null;
		}

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
