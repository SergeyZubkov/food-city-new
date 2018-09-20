import React, { Component } from 'react';
import './Calendar.css';

import moment from 'moment';
import dataService from '../../../data/dataService';

moment.locale('ru');

export default class Calendar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			startDate: dataService.startDate,
			selectedDate: dataService.selectedDate,
			fixed: false
		}

		this.elm = React.createRef();
	}

	componentDidMount() {
		dataService.on('changeDate', this.refreshDate)
		window.addEventListener('scroll', this.handlerScroll);
		// 120px - это высота <Header/>, который находится выше 
		this.elmTopOffset = this.elm.current.getBoundingClientRect().top - 120
	}

	componentWillUnmount() {
		dataService.off('chagneDate', this.refreshDate);
		window.removeEventListener('scroll', this.handlerScroll);

	}

	handlerScroll = (e) => {
    let scrollTop = this.getWindowScrollTop()
		
		if (this.elmTopOffset < scrollTop) {
			this.state.fixed||this.setState({fixed: true})
		} else if (this.elmTopOffset  >= scrollTop) {
			console.log(this.state.fixed)
			!this.state.fixed||this.setState({fixed: false})
		}

	}

	 getWindowScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

	refreshDate = () => this.setState({selectedDate: dataService.selectedDate})

	changeDate = (date) => {

		dataService.changeDate(date);
	}

	getNext6DatesFromDate(date) {
		let arr = [date];
		let i = 0;

		while (i++ < 6) {
			let d = moment().month(date.month).date(date.day).add(i, 'days');

			arr.push({month: d.month(), day: d.date()})
		}

		return arr;
	}

	render() {
		let week = this.getNext6DatesFromDate(this.state.startDate);
		let {fixed} = this.state;

		week = week.map((date, i) => {
			let isWorkingDate = (date) => dataService.isWorkingDate(date);
			let additionalClass = '';

			if (isWorkingDate(date)) {
				additionalClass = date.day == this.state.selectedDate.day 
				? 'calendar-day-active'
				: ''
			} else {
				additionalClass = 'calendar-day-disabled';
			}

			return (
				<div className={`calendar-day ${additionalClass}`} key={i} onClick={() => isWorkingDate(date)&&this.changeDate(date)}>
					<div className="calendar-day-name">{new Date(new Date().getFullYear(), date.month, date.day).toLocaleString('ru', {weekday: 'short'})}</div>
					<div className="calendar-day-num">{date.day}</div>
				</div>
			)
		})
		return (
			<div ref={this.elm} className={fixed ? 'calendar calendar-fixed' : 'calendar'}>
				{week}
			</div>
		);
	}
}
