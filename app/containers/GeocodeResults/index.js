import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import { createSelector } from 'reselect';

import {
  selectGeocodeResults,
  selectReverseGeocodeResults,
  selectInitialSearchString,
  selectSearchString,
  selectSelectedFeatureIndex,
} from 'containers/App/selectors';

import {
  setSelectedFeatureIndex
} from '../App/actions';

import GeocodeResult from 'components/GeocodeResult';

import styles from './styles.css';

export class GeocodeResults extends React.Component {

  render() {
    var features;
    if (this.props.geocodeResults && this.props.geocodeResults.features) {
      features = this.props.geocodeResults.features
    }

    // else if (this.props.reverseGeocodeResults && this.props.reverseGeocodeResults.features) {
    //   features = this.props.reverseGeocodeResults.features
    // }

    var geocodeResults = null;

    if (features && features.length) {
      geocodeResults = (
        <ol className={styles['geocode-results']}>
          {features.map((feature, i) =>
            <GeocodeResult key={i} selected={ this.props.selectedFeatureIndex === i }
              feature={feature} index={i} onClick={this.selectFeature.bind(this)} />
          )}
        </ol>
      );
    } else if (features) {
      geocodeResults = (
        <div className={styles['empty-results']}>
          Nothing found
        </div>
      );
    }

    return geocodeResults;
  }

  selectFeature(index) {
    this.props.setSelectedFeatureIndex(index);
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
    reverseGeocode: (lat, lon) => {
      dispatch(reverseGeocode(lat, lon));
    },
    setSelectedFeatureIndex: (index) => {
      dispatch(setSelectedFeatureIndex(index));
    },
    dispatch
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectGeocodeResults(),
  selectReverseGeocodeResults(),
  selectInitialSearchString(),
  selectSearchString(),
  selectSelectedFeatureIndex(),
  (geocodeResults, reverseGeocodeResults, initialSearchString, searchString, selectedFeatureIndex) => ({
    geocodeResults, reverseGeocodeResults, initialSearchString, searchString, selectedFeatureIndex
  })
), mapDispatchToProps)(GeocodeResults);
