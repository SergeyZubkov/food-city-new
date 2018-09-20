import React, { Component } from 'react';
import './Main.css'

import Button from '../../commons/button/Button';

import {NavLink} from 'react-router-dom';

import FeatureList from './featureList/FeatureList';

export default class Main extends Component {
	render() {
		return (
			<div className='main container'>
				<div className="main-lead">
					<div className="main-bg-cover"></div>
					<div className='main-text'>
						Доставка вкусных обедов  <br/>
						в офис и на дом
						<div className="main-button">
							<NavLink
								to='/menu'
							>
								<Button className='button-green'>Меню</Button>
							</NavLink>
						</div>
					</div>
				</div>

				<FeatureList className="container" />
			</div>
		);
	}
}
