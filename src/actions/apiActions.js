import superagent from 'superagent';

export const WINDOWS_FETCH = 'WINDOWS_FETCH';
export const WINDOW_CREATE = 'WINDOW_CREATE';

// const apiUrl = '/api/windows';

export function fetchWindows() {
	return dispatch => {
			dispatch({type: WINDOWS_FETCH})
			superagent
				.get('/api/windows')
				.end((err, response) => dispatch({
					type: WINDOWS_FETCH,
					data: response.body
				}));
	}
}

export function createWindow(window){
	return dispatch => {
			dispatch({type: WINDOW_CREATE})
			superagent
				.post('api/windows')
				.send(window)
				.end((err, response) => dispatch({
					type: WINDOW_CREATE,
					window
			}))
	}
	
}