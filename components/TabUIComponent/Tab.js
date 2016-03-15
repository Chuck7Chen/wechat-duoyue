import React from 'react';

class Tab extends React.Component {
  constructor(props) {
    super(props);
    let typeIndex = 0;
    if(this.props.params) {
      typeIndex = this.props.params.typeIndex ? this.props.params.typeIndex : 0;
    }
    this.state = {
      index: typeIndex
    }
  }

  handleClick(index) {
    this.setState({
      index: index
    })
    this.props.onTypeChange && this.props.onTypeChange(index);
  }

  componentWillMount() {
    this.props.onTypeChange && this.props.onTypeChange(this.state.index);
  }

  render() {
    const { content, tabClass } = this.props.TabItemsData;
    let picCode , picUrl, title, itemClassName;
    return (
      <ul className={tabClass.tabBox}>
        {
          content.map( (item, index) => {
            itemClassName = this.state.index === index ? tabClass.tabItemOn : tabClass.tabItemDefault;
            if(item.pic) {
              picUrl = this.state.index === index ? item.pic.on : item.pic.default;
              picCode = <span className='tab-item-pic' style={{ 'backgroundImage' : picUrl }}></span>;
            }else {
              picCode = null;
            }
            title = item.title ? item.title : item;
            return (
              <li className={itemClassName} onClick={ () => this.handleClick(index) } key={index}>
                {picCode}
                <span className="tab-title">{title}</span>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default Tab;