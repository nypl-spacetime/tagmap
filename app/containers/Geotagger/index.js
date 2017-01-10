import React from 'react';
import { connect } from 'react-redux';

import { createSelector } from 'reselect';

import GeocodingMap from 'containers/GeocodingMap';
import GeocodeSearch from 'containers/GeocodeSearch';
import GeocodeResults from 'containers/GeocodeResults';

import Button from 'components/Button';
import Buttons from 'components/Buttons';

import {
  selectItem,
  selectSearchString,
  selectInitialSearchString,
  selectGeocodeFeature
} from 'containers/App/selectors';

import styles from './styles.css';

import {
  geocode,
  submitStep,
  skipStep,
  setSearchString
} from '../App/actions';

export class Geotagger extends React.Component {

  render() {
    if (!this.props.item || !this.props.item.organization || !this.props.item) {
      return (
        <div>
        </div>
      )
    }

    const url = this.props.item.data.url
    const embedUrl = url.replace('#', '/embed#')

    return (
      <div className={styles.container} key={`${this.props.item.organization.id}-${this.props.item.id}`}>
        <div>
          <h2 className={styles.title}>
            {this.props.initialSearchString}
          </h2>
          <div className={styles['iframe-container']} >
            <iframe src={embedUrl} />
          </div>
          <GeocodingMap />
        </div>
        <div>
          <GeocodeSearch />
          <GeocodeResults />
          <Buttons>
            <Button onClick={this.yes.bind(this)} className={styles['button-yes']}>Yes</Button>
            <Button onClick={this.no.bind(this)} className={styles['button-no']}>No</Button>
            <Button onClick={this.skip.bind(this)} className={styles['button-skip']}>Skip</Button>
            <Button onClick={this.reset.bind(this)} className={styles['button-reset']}>Reset</Button>
          </Buttons>
        </div>
      </div>
    )
  }

  keyDown(event) {
    if (event.shiftKey) {
      if (event.keyCode === 49) {
        // 1
        this.yes();
      } else if (event.keyCode === 50) {
        // 2
        this.no();
      } else if (event.keyCode === 51) {
        // 3
        this.skip();
      } else if (event.keyCode === 52) {
        // 4
        this.reset();
      }
    }
  }

  yes() {
    if (!this.canSendData()) {
      return;
    }

    const feature = this.props.geocodeFeature;

    const data = {
      toponym: true,
      geocoder: 'mapzen',
      id: feature.properties.gid,
      geometry: feature.geometry
    };

    if (this.props.searchString !== this.props.initialSearchString) {
      data.searchString = this.props.searchString;
    }

    this.props.submitStep(
      this.props.item.organization.id,
      this.props.item.id,
      data
    )
  }

  no() {
    if (!(this.props.item && this.props.item.id)) {
      return;
    }

    const data = {
      toponym: false
    };

    this.props.submitStep(
      this.props.item.organization.id,
      this.props.item.id,
      data
    )
  }

  skip() {
    if (!(this.props.item && this.props.item.id)) {
      return;
    }

    this.props.skipStep(
      this.props.item.organization.id,
      this.props.item.id
    )
  }

  reset() {
    if (this.props.initialSearchString) {
      this.props.setSearchString(this.props.initialSearchString)
      this.props.geocode(this.props.initialSearchString)
    }
  }

  canSendData() {
    return this.props.item && this.props.item.id && this.props.geocodeFeature && this.props.geocodeFeature.properties;
  }

  componentDidMount = () => {
    document.addEventListener('keydown', this.keyDown.bind(this));
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
    submitStep: (organizationId, id, data) => {
      dispatch(submitStep(organizationId, id, data));
    },
    skipStep: (organizationId, id) => {
      dispatch(skipStep(organizationId, id));
    },
    dispatch
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectItem(),
  selectInitialSearchString(),
  selectSearchString(),
  selectGeocodeFeature(),
  (item, initialSearchString, searchString, geocodeFeature) => ({
    item, initialSearchString, searchString, geocodeFeature
  })
), mapDispatchToProps)(Geotagger);
