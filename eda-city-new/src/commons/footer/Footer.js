import React, { Component } from 'react';
import './Footer.css'

import {Link} from 'react-router-dom';


export default class Footer extends Component {
	render() {
		return (
			<div className='footer'>
				<div className="footer-delivery">
					<Link to="/delivery">
						<div className="footer-delivery-link">
							Условия доставки
						</div>
					</Link>
				</div>
				<div className="footer-contacts">
					<Link to="/contacts">
						<div className="footer-contacts-link">
							Контакты
						</div>
					</Link>
				</div>
			</div>
		);
	}
}
