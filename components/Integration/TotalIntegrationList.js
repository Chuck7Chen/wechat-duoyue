import React from 'react';
import ReturnButton from '../HeaderComponents/ReturnButton';
import CommonHeader from '../HeaderComponents/CommonHeader';
import IntegrationTitle from './IntegrationTitle';

class TotalIntegrationList extends React.Component{
	render(){
		return (
			<div className="TotalIntegrationList">
				<CommonHeader>
					<ReturnButton />
				</CommonHeader>
				<IntegrationTitle>积分记录</IntegrationTitle>
				<div className="total-integration-container">
					<div className="total-integration-item">
						<div className="item-top-info clearfix"><span>200</span><span>2016-3-16</span></div>
						<div className="item-bottom-info">抽奖</div>
					</div>
					<div className="total-integration-item">
						<div className="item-top-info clearfix"><span>200</span><span>2016-3-16</span></div>
						<div className="item-bottom-info">抽奖</div>
					</div>
					<div className="total-integration-item">
						<div className="item-top-info clearfix"><span>200</span><span>2016-3-16</span></div>
						<div className="item-bottom-info">抽奖</div>
					</div>
					<div className="total-integration-item">
						<div className="item-top-info clearfix"><span>200</span><span>2016-3-16</span></div>
						<div className="item-bottom-info">抽奖</div>
					</div>
					<div className="total-integration-item">
						<div className="item-top-info clearfix"><span>200</span><span>2016-3-16</span></div>
						<div className="item-bottom-info">抽奖</div>
					</div>
					<div className="total-integration-item">
						<div className="item-top-info clearfix"><span>200</span><span>2016-3-16</span></div>
						<div className="item-bottom-info">抽奖</div>
					</div>
					<div className="total-integration-item">
						<div className="item-top-info clearfix"><span>200</span><span>2016-3-16</span></div>
						<div className="item-bottom-info">抽奖</div>
					</div>
					<div className="total-integration-item">
						<div className="item-top-info clearfix"><span>200</span><span>2016-3-16</span></div>
						<div className="item-bottom-info">抽奖</div>
					</div>
				</div>
			</div>
		);
	}
};
export default TotalIntegrationList;