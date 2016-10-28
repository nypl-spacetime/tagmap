import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import L from 'leaflet';

import { createSelector } from 'reselect';

import {
  selectGeocodeResults,
  selectReverseGeocodeResults,
  selectInitialSearchString,
  selectSelectedFeatureIndex,
} from 'containers/App/selectors';

import {
  geocode,
  reverseGeocode
} from '../App/actions';

import Map from 'containers/Map';

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
    return (
      <div className={styles['map-container']}>
        <Map mapCreated={this.mapCreated.bind(this)} />
      </div>
    )
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
  selectSelectedFeatureIndex(),
  (geocodeResults, reverseGeocodeResults, initialSearchString, selectedFeatureIndex) => ({
    geocodeResults, reverseGeocodeResults, initialSearchString, selectedFeatureIndex
  })
), mapDispatchToProps, null, { withRef: true })(GeocodingMap);
