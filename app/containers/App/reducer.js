/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  LOAD_ITEM,
  LOAD_ITEM_SUCCESS,
  LOAD_ITEM_ERROR,

  LOAD_OAUTH,
  LOAD_OAUTH_SUCCESS,
  LOAD_OAUTH_ERROR,

  LOAD_SUBMISSIONS_SUCCESS,
  LOAD_SUBMISSIONS_ERROR,

  TOGGLE_MENU,

  SUBMIT_STEP,
  SUBMIT_STEP_SUCCESS,
  SUBMIT_STEP_ERROR,
  SKIP_STEP,
  SKIP_STEP_SUCCESS,
  SKIP_STEP_ERROR,

  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_ERROR,

  GEOCODE_SUCCESS,
  GEOCODE_ERROR,
  REVERSE_GEOCODE_SUCCESS,
  REVERSE_GEOCODE_ERROR,

  SET_SELECTED_FEATURE_INDEX,
  SET_SEARCH_STRING
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  item: initialItem(),
  oauth: fromJS({}),
  submissions: initialSubmissions(),
  config: fromJS(__CONFIG__),
  menu: fromJS({
    show: false,
    clientX: -1,
    shiftKey: false
  }),
  loading: true,
  loaded: fromJS({
    item: false,
    submissions: false,
    oauth: false
  }),
  geocodeResults: fromJS({}),
  reverseGeocodeResults: fromJS({}),
  selectedFeatureIndex: -1,

  initialSearchString: '',
  searchString: '',

  error: null
});

function initialItem() {
  return fromJS({});
}

function initialSubmissions() {
  return fromJS({
    completed: 0
  });
}

function newItem(state) {
  return state
    .set('item', initialItem())
    .set('geocodeResults', fromJS({}))
    .set('reverseGeocodeResults', fromJS({}))
}

function loadSuccesful(state, key) {
  var newState = state.setIn(['loaded', key], true);

  var allLoaded = true
  for (var loaded of newState.get('loaded').values()) {
    allLoaded = loaded && allLoaded
  }

  return newState
    .set('loading', !allLoaded);
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ITEM:
      var newState = state
        .set('error', null)

      return newItem(newState);
    case LOAD_ITEM_SUCCESS:
      var initialSearchString;
      if (action.item && action.item.data) {
        initialSearchString = action.item.data.text
      }

      var newState = state
        .set('item', fromJS(action.item))
        .set('geocodeResults', fromJS({}))
        .set('reverseGeocodeResults', fromJS({}))
        .set('searchString', initialSearchString)
        .set('initialSearchString', initialSearchString)
      return loadSuccesful(newState, 'item');
    case LOAD_OAUTH_SUCCESS:
      var newState = state
        .set('oauth', action.oauth);
      return loadSuccesful(newState, 'oauth');
    case LOAD_SUBMISSIONS_SUCCESS:
      var newState = state
        .set('submissions', fromJS(action.submissions));
      return loadSuccesful(newState, 'submissions');
    case TOGGLE_MENU:
      let clientX = action.clientX || -1;
      let shiftKey = action.shiftKey || false;
      return state
        .set('menu', fromJS({
          show: action.show,
          clientX,
          shiftKey
        }));
    case SUBMIT_STEP_SUCCESS:
    case SKIP_STEP_SUCCESS:
      return state
        .set('geocodeResults', fromJS({}))
        .set('reverseGeocodeResults', fromJS({}))
        .set('selectedFeatureIndex', -1)
        .set('initialSearchString', '')
        .set('searchString', '')
    case LOG_OUT_SUCCESS:
      return state
        .set('oauth', null)
        .set('submissions', initialSubmissions());
    case GEOCODE_SUCCESS:
      var results = action.results;
      var selectedFeatureIndex = -1;
      if (results && results.features && results.features.length) {
        selectedFeatureIndex = 0
      }

      return state
        .set('geocodeResults', fromJS(results))
        .set('selectedFeatureIndex', selectedFeatureIndex);
    case REVERSE_GEOCODE_SUCCESS:
      var results = action.results;
      var selectedFeatureIndex = -1;
      if (results && results.features && results.features.length) {
        selectedFeatureIndex = 0
      }
      return state
        .set('geocodeResults', fromJS({}))
        .set('reverseGeocodeResults', fromJS(results))
        .set('selectedFeatureIndex', selectedFeatureIndex);
    case SET_SELECTED_FEATURE_INDEX:
      return state
        .set('selectedFeatureIndex', action.index)
    case SET_SEARCH_STRING:
      return state
        .set('searchString', action.string)
    case LOAD_ITEM_ERROR:
      return state
        .set('loading', false)
        .set('error', {
          type: action.type,
          message: 'Error loading image',
          error: action.error
        });
    case GEOCODE_ERROR:
    case REVERSE_GEOCODE_ERROR:
      return state
        .set('error', {
          type: action.type,
          message: 'Geocoding error',
          error: action.error
        });
    case LOAD_OAUTH_ERROR:
    case LOAD_SUBMISSIONS_ERROR:
    return state
      .set('error', {
        type: action.type,
        message: 'Error connecting to API',
        error: action.error
      });
    case SKIP_STEP_ERROR:
    case SUBMIT_STEP_ERROR:
      return state
        .set('error', {
          type: action.type,
          message: 'Error submitting data to API',
          error: action.error
        });
    case LOG_OUT_ERROR:
      return state
        .set('error', {
          type: action.type,
          message: 'Error logging out',
          error: action.error
        });
    default:
      return state;
  }
}

export default appReducer;
