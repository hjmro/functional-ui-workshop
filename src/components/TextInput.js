import React from 'react';

function TextInput({currentValue, onValueChange, validationError}){
		return (
	 		<div>
				<input
					type="text"
					valueLink={{
						value: currentValue,
						requestChange: onValueChange
					}} />
				<div>{ validationError }</div>
        	</div>
		);
}

export default TextInput;