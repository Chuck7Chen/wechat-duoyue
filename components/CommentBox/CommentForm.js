'use strict'
import React from 'react';
import classNames from 'classnames';

class CommentForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			myAvatar: this.props.myData.myAvatar,
			myName: this.props.myData.myName,
			commentTime: '',
			likeNum: '',
			likeIconState: '',
			commentText: '',
		};
    console.log(this.props.myData.myAvatar)
	}
	handleTextChange(e) {
    this.setState({commentText: e.target.value});
  }
  resetComment() {
  	this.setState({
			commentTime: '',
			likeNum: '',
			likeIconState: '',
			commentText: '',
    });
    this.refs.commentText.value = '';
  }
  handleSubmit(e) {
    e.preventDefault();
    const arr = ['甲','乙','丙','丁','某'];
    let tourist = arr[parseInt(Math.random()*arr.length)];
    let 
    	commentText = this.state.commentText.trim(),
    	myDate = new Date(),
  		commentTime = myDate.toLocaleString(),
      myAvatar = this.state.myAvatar,
			myName = this.state.myName || '路人' + tourist;
    if (!commentText) {
    	alert('不能为空额！');
      return;
    }
    // this.setState({
    // 	userAvatar: myAvatar,
  		// userName: myName,
    // 	commentTime: commentTime,
  		// likeNum: 0,
  		// likeIconState: false,
    // 	commentText: commentText,
    // });
    //console.log(this.state)
    this.props.funcs.onCommentSubmit({
    	userAvatar: myAvatar,
  		userName: myName,
    	commentTime: commentTime,
  		likeNum: 0,
  		likeIconState: false,
    	commentText: commentText,
    });
    this.resetComment();
    this.props.funcs.toggleCommentForm();
  }
  handleCancel() {
  	this.props.funcs.toggleCommentForm();
  	this.resetComment();
  }
  componentDidmount() {

  }
	render() {
		let formStyle = {display: 'block'};
		return (
			<form className="CommentForm" id="js-comment-form" style={formStyle} onSubmit={this.handleSubmit.bind(this)}>
				<div className="comment-form-content">
					<section className="btn-wrap clearfix">
						<input className="cancel-btn left" type="button" value="取消" onClick={this.handleCancel.bind(this)}/>
						<input className="submit-btn right" type="submit" value="发送"/>
					</section>
					<textarea className="input-box" value={this.state.commentText} onChange={this.handleTextChange.bind(this)} autofocus placeholder="说点什么吧" ref="commentText"></textarea>
				</div>
			</form>
		);
	}
}
export default CommentForm;