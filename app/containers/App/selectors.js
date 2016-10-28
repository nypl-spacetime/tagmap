/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
);

const selectConfig = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('config')
);

const selectMapDefaults = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'defaults', 'map']).toJS()
);

const selectCSSVariables = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'css_variables']).toJS()
);

const selectItem = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('item')
);

const selectOAuth = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('oauth')
);

const selectLoggedIn = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const oauth = globalState.get('oauth');
    return oauth && oauth.oauth ? true : false;
  }
);

const selectSubmissions = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('submissions').toJS()
);

const selectGeocodeResults = () => createSelector(
  selectGlobal(),
  (globalState) => {
    // console.log('selector', 'selectGeocodeResults', globalState.get('geocodeResults').toJS())
    return globalState.get('geocodeResults').toJS()
  }
);

const selectReverseGeocodeResults = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('reverseGeocodeResults').toJS()
);

const selectGeocodeFeature = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const feature = globalState.getIn(['geocodeResults', 'features',  globalState.get('selectedFeatureIndex')])
    const features = globalState.getIn(['geocodeResults', 'features'])
    if (feature) {
      return feature.toJS();
    }
  }
);

const selectMenu = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('menu').toJS()
);

const selectSearchString = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('searchString')
);

const selectInitialSearchString = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('initialSearchString')
);

const selectSelectedFeatureIndex = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('selectedFeatureIndex')
);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,

  selectItem,
  selectOAuth,
  selectLoggedIn,
  selectSubmissions,

  selectMenu,

  selectConfig,
  selectCSSVariables,
  selectMapDefaults,

  selectLoading,
  selectError,

  selectGeocodeResults,
  selectReverseGeocodeResults,
  selectGeocodeFeature,

  selectSearchString,
  selectInitialSearchString,
  selectSelectedFeatureIndex,

  selectLocationState
};
