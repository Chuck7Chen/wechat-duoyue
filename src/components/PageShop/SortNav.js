'use strict';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class SortNav extends React.Component {

	static propTypes = {
		sortData: PropTypes.object
	};

	render() {
		const { sortData } = this.props;
		return (
			<div className="hot-sort-box bdr-mg bg-white">
				<h2 className="f-level-title">{sortData.title}</h2>
				<ul className="hot-sort-content dis-flex">
				{
					sortData.data.map(function(item,i){
						return (
							<li className="cell" key={i}>
								<Link to={item.href}>
									<img className="sort-icon" src={item.src} alt={item.title}/>
									<h4 className="sort-title">{item.title}</h4>
								</Link>
							</li>
						)
					})
				}
				</ul>
			</div>
		);
	}
}

export default SortNav;