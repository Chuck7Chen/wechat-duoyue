import React, { PropTypes} from 'react';
import Cart from '../components/UIComponent/Cart/Cart';
class ShopPage extends React.Component {
	static propTypes = {
		children: PropTypes.any
	};

	render() {
		return (
      <div className="ShopPage">
				<Cart />
				{this.props.children}
      </div>
		);
	}
}

export default ShopPage;