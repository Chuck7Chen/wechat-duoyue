import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PageHeader from '../PageHeader/PageHeader';

import withStyles from '../../decorators/withStyles';
import styles from './App.scss';

@withStyles(styles)
class App extends React.Component {

  constructor(props, context){
    super(props, context);
  }
   render() {
      const {children} = this.props;
      return (
        <div className="app">
          <PageHeader className="Header-nav" defaultNav={location.pathname}/>
          <div className="wrapper">
           {children}
          </div>
        </div>
      )
  }
}



function mapStateToProps(state) {
  //console.log(state)
  return {

  }
}
export default connect(mapStateToProps)(App);