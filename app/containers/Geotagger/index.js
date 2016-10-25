import React from 'react';
import { connect } from 'react-redux';

import { createSelector } from 'reselect';

import GeocodingMap from 'containers/GeocodingMap';

import Button from 'components/Button';
import Buttons from 'components/Buttons';

import {
  selectItem
} from 'containers/App/selectors';

import styles from './styles.css';

import {
  submitStep,
  skipStep
} from '../App/actions';

export class Geotagger extends React.Component {

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.contents}>
          <h2 className={styles.title}>
            {this.props.item.data.text}
          </h2>
          <div className={styles.iframe}>
            <span>iFrame with metadata and audio segment player</span>
          </div>
          <GeocodingMap initialSearch={this.props.item.data.text} />
        </div>
        <Buttons>
          <Button onClick={this.yes.bind(this)}>Yes</Button>
          <Button onClick={this.yes.bind(this)}>No</Button>
          <Button onClick={this.skip.bind(this)} disabled={false}>Skip</Button>
        </Buttons>
      </div>
    )
    // var step = this.state.steps[this.props.currentStepIndex];
    //
    // return React.createElement(step.component, {
    //   next: this.nextStep.bind(this),
    //   submit: this.submitStep.bind(this),
    //   skip: this.skipStep.bind(this)
    // })
  }

  yes() {

  }

  no() {

  }

  skip() {
    if (!this.props.item.id) {
      return;
    }

    this.props.skipStep(
      this.props.item.provider,
      this.props.item.id
    )
  }

  submitStep(data, geometry) {
    if (!this.props.item.id) {
      return;
    }

    this.props.submitStep(
      this.props.item.provider,
      this.props.item.id,
      data,
      geometry
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitStep: (provider, id, step, stepIndex, data, geometry) => {
      dispatch(submitStep(provider, id, step, stepIndex, data, geometry));
    },
    skipStep: (provider, id, step, stepIndex) => {
      dispatch(skipStep(provider, id, step, stepIndex));
    },
    dispatch
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectItem(),
  (item) => ({
    item
  })
), mapDispatchToProps)(Geotagger);
