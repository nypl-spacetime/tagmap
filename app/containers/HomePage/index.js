/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { createSelector } from 'reselect';

import {
  selectItem,
  selectLoading,
  selectError,
  selectSubmissions,
  selectLoggedIn
} from 'containers/App/selectors';

import {
  loadItem
} from '../App/actions';

import Error from 'containers/Error';
import Loading from 'containers/Loading';
import Geotagger from 'containers/Geotagger';

import styles from './styles.css';

export class HomePage extends React.Component {

  componentWillMount () {
    if (!this.props.item.id) {
      this.props.loadItem('nypl', this.props.params.id);
    }
  }

  componentWillReceiveProps(props) {
    // user types in new route
    var newRouteId = this.props.item.id === this.props.params.id &&
      props.item.id === this.props.item.id && props.item.id &&
      props.params.id !== this.props.params.id;

    // path is /:incorrect-id, user/app wants to go to /
    var fromIncorrectIdToRandomId = this.props.error && !props.params.id && this.props.params.id;

    // path is /:incorrect-id, user types in new id
    var fromIncorrectIdToNewId = this.props.error && props.params.id && props.params.id !== this.props.params.id;

    if (newRouteId || fromIncorrectIdToRandomId || fromIncorrectIdToNewId) {
      // Call loadItem with id from route (or undefined)
      this.props.loadItem('nypl', props.params.id);
    }
  }

  render() {
    let mainContent = null;

    if (this.props.error) {
      mainContent = (
        <Error />
      );
    } else if (this.props.loading) {
      mainContent = (
        <Loading />
      );
    } else {
      mainContent = (
        <Geotagger />
      );
    }

    return mainContent;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadItem: (organizationId, id) => {
      dispatch(loadItem(organizationId, id));
    },
    dispatch
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectItem(),
  selectLoading(),
  selectError(),
  selectSubmissions(),
  selectLoggedIn(),
  (item, loading, error, submissions, loggedIn) => ({
    item, loading, error, submissions, loggedIn
  })
), mapDispatchToProps)(HomePage);
