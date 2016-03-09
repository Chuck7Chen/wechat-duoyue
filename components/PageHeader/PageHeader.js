'use strict';
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

const headerData = [
	{'headerId': 1,'headerText':'每天', 'headerClassName': 'juhe_menu_meitian', 'headerHref': '/everyday'},
	{'headerId': 2,'headerText':'资源', 'headerClassName': 'juhe_menu_source', 'headerHref': '/source'},
	{'headerId': 3,'headerText':'商城', 'headerClassName': 'juhe_menu_shangcheng', 'headerHref': '/shop'},
	{'headerId': 4,'headerText':'书城', 'headerClassName': 'juhe_menu_shucheng', 'headerHref': '/danpin'},
];

class PageHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			juheIndex: 4,
			headerText: headerData[3].headerText
		}
		this.activeNavigationLink = this.activeNavigationLink.bind(this);
	}

	activeNavigationLink(id) {
		this.setState({
			juheIndex: id,
			headerText: headerData[id-1].headerText
		});
	}
	render() {
		let linkClassName, spanClassName;
		return (
			<div className="PageHeader bg-white clearfix">
				<Link to='usermenu' className="left header-btn user-menu"></Link>
				<span className="header-title">{this.state.headerText}</span>
				<div className={classnames(this.props.className, 'Navigation')} role="navigation">
					{
						headerData.map((item) => {
							linkClassName = this.state.juheIndex === item.headerId ? 'Navigation-link_over': 'Navigation-link';
							spanClassName = classnames("juhe_menu_txt", item.headerClassName);
							return (
									<Link to={item.headerHref} className={linkClassName} key={'navigation'+item.headerId} onClick={() => {this.activeNavigationLink(item.headerId);}} >
										<span className={spanClassName}>{item.headerText}</span>
									</Link>
							);
						})
					}
					</div>
			</div>
		);
	}
}

export default PageHeader;