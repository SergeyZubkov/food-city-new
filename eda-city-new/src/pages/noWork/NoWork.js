import React, { Component } from 'react';
import './NoWork.css';

import closed from '../../imgs/closed.svg';

export default class NoWork extends Component {
	render() {
		return (
			<div className='no-work'>
				<img src={closed} alt="" className="no-work"/>
				<p className="no-work-text">
					Приносим вам свои извинения, но сегодня мы не работаем, ведутся работы по улучшению сервиса. Мы скоро откроемся.
				</p>
			</div>
		);
	}
}
