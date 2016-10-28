import React from 'react';
import { connect } from 'react-redux';

import { createSelector } from 'reselect';

import GeocodingMap from 'containers/GeocodingMap';

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
    return (
      <div className={styles.container} key={`${this.props.item.provider}-${this.props.item.id}`}>
        <div className={styles.contents}>
          <h2 className={styles.title}>
            {this.props.initialSearchString}
          </h2>
          <div className={styles.iframe}>
            <span>📻 iFrame with metadata and audio segment player 🎤</span>
          </div>
          <GeocodingMap />
        </div>
        <Buttons>
          <Button onClick={this.yes.bind(this)}>Yes</Button>
          <Button onClick={this.no.bind(this)}>No</Button>
          <Button onClick={this.skip.bind(this)} disabled={false}>Skip</Button>
          <Button onClick={this.reset.bind(this)} disabled={false}>Reset</Button>
        </Buttons>
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
      id: feature.properties.gid,
      geometry: feature.geometry
    };

    if (this.props.searchString !== this.props.initialSearchString) {
      data.searchString = this.props.searchString;
    }

    this.props.submitStep(
      this.props.item.provider,
      this.props.item.id,
      data
    )
  }

  no() {
    if (!this.canSendData()) {
      return;
    }

    const data = {
      toponym: false
    };

    this.props.submitStep(
      this.props.item.provider,
      this.props.item.id,
      data
    )
  }

  skip() {
    if (!this.canSendData()) {
      return;
    }

    this.props.skipStep(
      this.props.item.provider,
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
    submitStep: (provider, id, data) => {
      dispatch(submitStep(provider, id, data));
    },
    skipStep: (provider, id) => {
      dispatch(skipStep(provider, id));
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
