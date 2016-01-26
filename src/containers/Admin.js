import React from 'react';
import Form from './Form';
import WindowList from './WindowList';
import OpenClose from '../components/OpenClose';
import { AppActions } from '../actions';
import { connect } from 'react-redux';

function Admin({dispatch}) {
  return (
	<div className="admin-wrapper">
		<div className="left-menu">
			<OpenClose openAll={ () => dispatch(AppActions.openAllWindows()) }
						closeAll={() =>  dispatch(AppActions.closeAllWindows())  }/>
			<Form/>
			</div>
		<WindowList/>
  </div>); 
}



export default connect()(Admin);
