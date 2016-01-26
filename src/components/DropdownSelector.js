import React from 'react';

function DropdownSelector({options, selectedOption, handleSelect}){
		return (
			<div>
          		<label htmlFor="daySelect">Day</label>
				<select
					name="day"
					id="daySelect"
					valueLink={{
						value: selectedOption,
						requestChange: handleSelect
					}}
					defaultValue="none">
					<option label="Choose day" value="none" disabled />
						{ options }
          			</select>
        	</div>
		);
}

export default DropdownSelector;
