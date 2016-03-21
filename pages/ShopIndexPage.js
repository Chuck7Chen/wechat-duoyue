import React, { PropTypes} from 'react';

import Cart from '../components/CartUIComponent/Cart';

class ShopIndexPage extends React.Component {

	static propTypes = {
		children: PropTypes.any
	};

	render() {
		return (
      <div className="ShopIndexPage">
				<Cart />
				{ this.props.children}
      </div>
		);
	}
}

export default ShopIndexPage;