import React from 'react';
import { connect } from 'react-redux';

import { createSelector } from 'reselect';

import {
  selectSearchString
} from 'containers/App/selectors';

import {
  geocode,
  setSearchString
} from '../App/actions';

import styles from './styles.css';

export class GeocodeSearch extends React.Component {

  render() {
    return (
      <form className={styles['geocode-form']} onSubmit={this.onGeocodeSubmit.bind(this)}>
        <input ref='geocodeInput' type='text'
          value={this.props.searchString} onChange={this.searchStringChange.bind(this)}
          className={styles['geocode-input']} />
        <button type="submit">Search</button>
      </form>
    )
  }

  searchStringChange(event) {
    this.props.setSearchString(event.target.value);
  }

  onGeocodeSubmit(event) {
    // TODO: only if different
    this.props.geocode(this.props.searchString);
    event.preventDefault();
  }

}

function mapDispatchToProps(dispatch) {
  return {
    setSearchString: (string) => {
      dispatch(setSearchString(string));
    },
    geocode: (text) => {
      dispatch(geocode(text));
    },
    dispatch
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectSearchString(),
  (searchString) => ({
    searchString
  })
), mapDispatchToProps)(GeocodeSearch);
