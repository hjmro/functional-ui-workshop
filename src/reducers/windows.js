import { AppActions, ApiActions } from '../actions';

const defaultState = [
];

export default function(state = defaultState, action = {}) {
  switch (action.type) {
  case AppActions.WINDOW_CREATE:
    return [
      ...state,
      action.window
    ];
  case AppActions.WINDOW_OPEN_ALL:
 	return state.map(state => Object.assign({}, state, { opened: true }));  
  case AppActions.WINDOW_CLOSE_ALL:
 	return state.map(state => Object.assign({}, state, { opened: false }));  
  case ApiActions.WINDOWS_FETCH:
  	if(!action.data) return state;
  	return action.data;
  case AppActions.WINDOW_OPEN_ONE:
    return state.map(window => {
		if(window.day == action.day) return Object.assign({}, window, {opened:true})
		return window;
	})
  default:
    return state;
  }
}
