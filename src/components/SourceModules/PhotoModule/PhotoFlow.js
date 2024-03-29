import React from 'react';
import { Link } from 'react-router';
import PhotoItem from './PhotoItem';
import PhotoListBottom from './PhotoListBottom';
import Utils from '../../../utils/utils.js';

class PhotoFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list:this.props.list,
      left: [],
      right: [],
      visibility: "hidden",
    }
    this.finishLoading = true;
    Utils.bindMethods(this,"distribution","ifNeedLazyLoad","lazyLoad")
  }

  componentDidMount() {
    window.addEventListener("scroll", this.ifNeedLazyLoad, false)
    this.distribution();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.ifNeedLazyLoad, false)
  }

  ifNeedLazyLoad() {
    if(this.checkScrollSide() && this.finishLoading) {
      this.lazyLoad();
      this.finishLoading = false;
      this.setState({
        visibility:"visible",
      })  
    }
  }
   
  checkScrollSide() {
    let oParent = this.refs.photoContent;
    let mostHeight = oParent.offsetHeight;
    let scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
    let documentH = document.documentElement.clientHeight;
    return (mostHeight*(4/5) < scrollTop + documentH) ? true : false;
  }
  
  lazyLoad() {
   let listTwo = this.props.listTwo;
   let list = this.state.list;
   this.setState({
     list: list.concat(listTwo),
    });
   this.setState({
      left: [],
      right: []
    });
    this.distribution();
  }

  distribution() {
    let list  = this.state.list , parentBox, _self = this;
    list.map( (item) =>  {
      var img = new Image();
      img.src = item.src;
      img.onload = function() {
        loadImg(item);
      }
    });

    function loadImg(item) {
      parentBox = _self.getBox();
      if(!parentBox) return;
      if(parentBox.indexOf("left") > -1) {
        _self.setState({
          left: [..._self.state.left, item]
        })
      } else {
        _self.setState({
          right: [..._self.state.right, item]
        })
      }
    }
  }

  getBox() {
    if(!this.refs.left) return null;
    let leftHeight  = this.refs.left.offsetHeight,
        rightHeight = this.refs.right.offsetHeight;
    return (leftHeight <= rightHeight) ? "left" : "right";
  }

	render() {
		let left = this.state.left, right = this.state.right;
		return(
			<div className="PhotoFlow">
				<div className="photo-content clearfix" ref="photoContent">
					<div className="left-box photo-box" id="left_box" ref="left">
            {
              left.map( (list, index) =>
                <PhotoItem data={list}  key={`source_${list.index}${index}`} />
              )
            }
          </div>
          <div className="right-box photo-box" id="right_box" ref="right">
            {
              right.map( (list, index) =>
                <PhotoItem data={list}  key={`source_${list.index}${index}`}/>
              )
            }
          </div>		
				</div>
        <div className="bottomBox" style={{"visibility":this.state.visibility}}>
          <Link to="/source">
            <PhotoListBottom/>
          </Link>
        </div>
			</div>
		);
	}
}

export default PhotoFlow;