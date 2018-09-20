import React, { Component } from 'react';
import './Header.css'

import whatsapp from '../../imgs/whatsapp.png';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';

import throttle from 'lodash.throttle';

class Header extends Component {
	constructor(props) {
		super(props);

		this.elm = React.createRef();

		this.state = {
			fixed: false
		}
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handlerScroll);
		this.elmTopOffset = this.elm.current.getBoundingClientRect().top;
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', throttle(this.handlerScroll, 300));
	}



	handlerScroll = (e) => {

    let scrollTop = this.getWindowScrollTop()
		
		if (this.elmTopOffset < scrollTop) {
			this.state.fixed||this.setState({fixed: true})
		} else if (this.elmTopOffset + 10>= scrollTop) {
			console.log(this.state.fixed)
			!this.state.fixed||this.setState({fixed: false})
		}
		console.log(this.elmTopOffset)
	}

	 getWindowScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

	render() {
		let {fixed} = this.state;

		return (
			<div 
				className={fixed ? 'header header-fixed' : 'header'}
				ref={this.elm}
			>
				<div className='header-logo-container'>
					<Link to=''>ЕдаCити</Link>
				</div>
				<div className="header-phone">
					<span className="header-phone-mode">
						( c 8:00 до 21:00 )
					</span>
					<a
							href='tel:89296729324'
							className='header-phone'
						>
							<img src={whatsapp} width='20px' alt='доставка' />
							8 929 672-93-24
						</a>
						<a
							href='tel:84955321434'
							className='phone'
						>
							8 495 532-14-34
						</a>
				</div>

			</div>
		);
	}
}


export	default withRouter(Header);