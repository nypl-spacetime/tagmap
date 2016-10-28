import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import L from 'leaflet';

import { createSelector } from 'reselect';

import {
  selectGeocodeResults,
  selectReverseGeocodeResults,
  selectInitialSearchString,
  selectSearchString,
  selectSelectedFeatureIndex,
} from 'containers/App/selectors';

import {
  geocode,
  reverseGeocode,
  setSelectedFeatureIndex,
  setSearchString
} from '../App/actions';

import Map from 'containers/Map';

import GeocodeResult from 'components/GeocodeResult';

import styles from './styles.css';

export class GeocodingMap extends React.Component {

  enableMoveEndEvent = true;

  componentWillReceiveProps (nextProps) {
    if (nextProps.geocodeResults && nextProps.geocodeResults.features && nextProps.geocodeResults.features[nextProps.selectedFeatureIndex]) {
      const feature = nextProps.geocodeResults.features[nextProps.selectedFeatureIndex];
      this.zoomToFeature(feature);
    }
  }

  render() {
    var features;
    if (this.props.geocodeResults && this.props.geocodeResults.features) {
      features = this.props.geocodeResults.features
    }

    // else if (this.props.reverseGeocodeResults && this.props.reverseGeocodeResults.features) {
    //   features = this.props.reverseGeocodeResults.features
    // }

    var geocodeResults;

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

    return (
      <div>
        <div className={styles['map-container']}>
          <Map mapCreated={this.mapCreated.bind(this)} />
        </div>
        <form className={styles['geocode-form']} onSubmit={this.onGeocodeSubmit.bind(this)}>
          <input ref='geocodeInput' type='text'
            value={this.props.searchString} onChange={this.searchStringChange.bind(this)}
            className={styles['geocode-input']} />
          <button type="submit">Search</button>
        </form>
        { geocodeResults }
      </div>
    )
  }

  searchStringChange(event) {
    this.props.setSearchString(event.target.value);
  }

  selectFeature(index) {
    this.props.setSelectedFeatureIndex(index);
  }

  onGeocodeSubmit(event) {
    const search = findDOMNode(this.refs.geocodeInput).value;

    // TODO: only if different
    // TODO: do dispatch

    this.props.geocode(search);
    event.preventDefault();
  }

  zoomToFeature(feature) {
    this.enableMoveEndEvent = false;

    if (this.geocodeLayer && this.map) {
      this.geocodeLayer.clearLayers();
      this.geocodeLayer.addData(feature);

      if (feature.bbox) {
        this.map.fitBounds([[feature.bbox[1], feature.bbox[0]], [feature.bbox[3], feature.bbox[2]]]);
      } else {
        this.map.fitBounds(this.geocodeLayer.getBounds());
      }
    }
  }

  mapMoveEnd() {
    // if (this.map && this.enableMoveEndEvent) {
    //   const center = this.map.getCenter();
    //   this.props.reverseGeocode(center.lat, center.lng);
    // }

    this.enableMoveEndEvent = true;
  }

  mapCreated (map) {
    var geojsonMarkerOptions = {
      radius: 8,
      fillColor: '#ffdc03',
      color: '#7f6e02',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    };

    this.geocodeLayer = L.geoJSON(null, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }
    }).addTo(map);

    map.on('moveend', this.mapMoveEnd.bind(this));

    this.map = map;

    if (this.props.geocodeResults && this.props.geocodeResults.features) {
      const feature = this.props.geocodeResults.features[0];
      this.zoomToFeature(feature);
    }
  }

  componentDidMount = () => {
    if (this.props.initialSearchString) {
      this.props.geocode(this.props.initialSearchString)
    }
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
), mapDispatchToProps, null, { withRef: true })(GeocodingMap);
