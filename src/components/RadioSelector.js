import React from 'react';

function RadioSelector({options, selectedOption, handleSelect}){
      const radios = options.map(option => {
		const id = `windowtype${option}`;
		return (
			<li key={ option }>
			<input
				type="radio"
				name="type"
				id={ id }
				label={ option }
				checkedLink={{
				value: selectedOption === option,
				requestChange: () => handleSelect(option)
				}} />
			<label htmlFor={ id }>{ option }</label>
			</li>
		);
	  });
	  return <ul>{radios}</ul>;
}

export default RadioSelector;