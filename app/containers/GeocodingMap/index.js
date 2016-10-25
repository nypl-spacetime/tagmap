import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import { createSelector } from 'reselect';

import {
  geocode,
  reverseGeocode
} from '../App/actions';

import Map from 'containers/Map';

import styles from './styles.css';

export class GeocodingMap extends React.Component {

  render() {
    return (
      <div>
        <input type='text' defaultValue={this.props.initialSearch} />
        <div className={styles['map-container']}>
          <Map />
        </div>

        <div>Als kaart verplaatst, dan crosshair, en in lijst alle plekken in de buurt</div>
        <ol>
          <li>Brooklyn</li>
          <li>Brooklyn</li>
          <li>Brooklyn</li>
        </ol>
      </div>
    )
  }

  componentDidMount = () => {
    // console.log(this.props.initialSearch)
    // console.log(this.props.initialSearch)
    this.props.geocode(this.props.initialSearch)
  }


}

function mapDispatchToProps(dispatch) {
  return {
    geocode: (text) => {
      dispatch(geocode(text));
    },
    dispatch
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(null, mapDispatchToProps, null, { withRef: true })(GeocodingMap);
