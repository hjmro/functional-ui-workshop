import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { AppActions, ApiActions } from '../actions';
import { range } from '../utils';
import {
  isValidText,
  isValidImageUrl,
  isValidSpotifyUrl,
  isValidYouTubeUrl
} from '../utils/validation';
import { windowTypes } from '../constants';
import RadioSelector from '../components/RadioSelector';
import DropdownSelector from '../components/DropdownSelector';
import TextInput from '../components/TextInput';




function validate({ text, type }) {
  switch (type) {
  case windowTypes.TEXT:
    return isValidText(text) ? null : 'Invalid text';
  case windowTypes.IMAGE:
    return isValidImageUrl(text) ? null : 'Invalid image url';
  case windowTypes.SPOTIFY:
    return isValidSpotifyUrl(text) ? null : 'Invalid Spotify url';
  case windowTypes.YOUTUBE:
    return isValidYouTubeUrl(text) ? null : 'Invalid YouTube url';
  default:
    return 'Invalid type';
  }
}

const initialState = { text: '', type: 'text' };

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  render() {
    const { validDays, dispatch } = this.props;

    const handleTypeChange = type => {
      const { text } = this.state;
      this.setState({ type, validationError: validate({ text, type }) });
    };
    const handleTextChange = text => {
      const { type } = this.state;
      this.setState({ text, validationError: validate({ text, type }) });
    };
	
    const handleDayChange = day => this.setState({ day: parseInt(day) });

    const handleSubmit = e => {
      e.preventDefault();
      const window = {
        day: parseInt(this.state.day),
        content: this.state.text,
        type: this.state.type,
        opened: false,
      };
      dispatch(ApiActions.createWindow(window));
      this.setState(initialState);
    };

    const canSubmit = this.state.validationError === null && this.state.day;
    const types = [
      windowTypes.TEXT,
      windowTypes.IMAGE,
      windowTypes.SPOTIFY,
      windowTypes.YOUTUBE,
    ];


    const dayOptions = validDays
      .map(day => <option key={ `dayOption${day}` } label={ day } value={ day } />);

    return (
      <form>
        <h3>New Window</h3>
		<RadioSelector 
			options={types} 
			selectedOption={this.state.type} 
			handleSelect={handleTypeChange} />
		<DropdownSelector 
			options={dayOptions} 
			selectedOption={this.state.day} 
			handleSelect={handleDayChange} />
		<TextInput 
			currentValue={this.state.text} 
			onValueChange={handleTextChange} 
			validationError={this.state.validationError} />
        <button type="submit" onClick={ handleSubmit } disabled={ !canSubmit }> Save</button>
      </form>
    );
  }
}

Form.propTypes = {
  validDays: PropTypes.arrayOf(PropTypes.number).isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps({ windows }) {
  const windowDoesNotExists = day => windows.findIndex(w => w.day === day) === -1;
  const validDays = range(24).filter(windowDoesNotExists);
  return {
    validDays
  };
}

export default connect(mapStateToProps)(Form);
