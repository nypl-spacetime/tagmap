/**
 * Gets the repositories of the user from Github
 */

/* eslint-disable no-constant-condition */

import { take, call, put, select } from 'redux-saga/effects';
import { push, replace } from 'react-router-redux';

import {
  LOAD_OAUTH,
  LOAD_OAUTH_SUCCESS,
  LOAD_ITEM,
  LOAD_ITEM_SUCCESS,
  LOAD_SUBMISSIONS,

  LOG_OUT,
  LOG_OUT_SUCCESS,

  SUBMIT_STEP,
  SUBMIT_STEP_SUCCESS,
  SKIP_STEP,
  SKIP_STEP_SUCCESS,

  GEOCODE,
  REVERSE_GEOCODE
} from 'containers/App/constants';

import {
  loadItem,
  itemLoaded, itemLoadingError,
  stepSubmitted, stepSubmitError,
  stepSkipped, stepSkipError,
  loadOAuth, oauthLoaded, oauthLoadingError,
  submissionsLoaded, submissionsLoadingError,
  logOutSuccess, logOutError,

  geocodeSuccess, geocodeError,
  reverseGeocodeSuccess, reverseGeocodeError
} from 'containers/App/actions';

import request from 'utils/request';

import {
  selectItem
} from 'containers/App/selectors';

// Bootstrap sagas
export default [
  resetItem,
  setRoute,
  getSubmissions,
  getItem,
  getOAuth,
  submitStep,
  skipStep,
  getLogOut,
  getLogOutSuccess, // TODO: this is not the right way!?
  geocode,
  reverseGeocode
];

const API_URL = __CONFIG__.api.url

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function* requestData(constant, getUrl, options) {
  while (true) {
    const action = yield take(constant);

    var url
    if (isFunction(getUrl)) {
      url = getUrl(action);
    } else {
      url = getUrl
    }

    if (url) {
      const defaultFetchOptions = {
        credentials: 'include'
      }

      var fetchOptions = options.fetchOptions

      // If options.fetchOptions is a function, call this function
      if (fetchOptions && isFunction(fetchOptions)) {
        fetchOptions = fetchOptions(action);
      } else if (!fetchOptions) {
        fetchOptions = {}
      }

      // Merge default fetchOptions
      fetchOptions = Object.assign(
        {},
        defaultFetchOptions,
        fetchOptions
      )

      // Use call from redux-saga for easier testing
      const result = yield call(request, url, fetchOptions);

      // We return an object in a specific format, see utils/request.js for more information
      if (result.err === undefined || result.err === null) {

        // If actionSuccess is present in options, call this function when
        //   request call is successful
        if (options.actionSuccess) {
          var actionSuccessParams = (action, resultData) => [resultData];

          if (options.actionSuccessParams) {
            actionSuccessParams = options.actionSuccessParams
          }

          yield put(options.actionSuccess.apply(null, actionSuccessParams(action, result.data)));
        }
      } else {
        // TODO: add actionErrorParams?
        if (options.actionError) {
          yield put(options.actionError({
            message: result.err.message,
            status: result.err.response ? result.err.response.status : -1,
            url: url
          }));
        }
      }
    }
  }
}

export function* setRoute() {
  while (true) {
    yield take(LOAD_ITEM_SUCCESS);

    const item = yield select(selectItem());

    if (item) {
      var path = `/${item.id}`
      yield(put(replace(path)))
    }
  }
}

export function* resetItem() {
  while (true) {
    yield take([SUBMIT_STEP_SUCCESS, SKIP_STEP_SUCCESS]);

    // const stepIndex = yield select(selectCurrentStepIndex());
    //
    // if (stepIndex === 0) {
    //   // last step is reached after this event, state.steps.length === 0
      yield(put(loadItem()))
    // }
  }
}

const MAPZEN_URL = 'https://search.mapzen.com/v1/'
const MAPZEN_API_KEY = 'search-nW0Pk78'

export function* geocode() {
  const getUrl = (action) => {
    return `${MAPZEN_URL}search?text=${action.text}&api_key=${MAPZEN_API_KEY}`;
  }

  yield* requestData(GEOCODE, getUrl, {
    actionSuccess: geocodeSuccess,
    actionError: geocodeError,
    fetchOptions: {
      credentials: null
    }
  });
}

export function* reverseGeocode(lat, lon) {
  const getUrl = (action) => {
    return `${MAPZEN_URL}reverse?point.lat=${action.lat}&point.lon=${action.lon}&api_key=${MAPZEN_API_KEY}`
  }

  yield* requestData(REVERSE_GEOCODE, getUrl, {
    actionSuccess: reverseGeocodeSuccess,
    actionError: reverseGeocodeError,
    fetchOptions: {
      credentials: null
    }
  });
}

export function* getItem() {
  const getUrl = (action) => {
    var id = action.id;

    if (!id) {
      return `${API_URL}tasks/geotag-text/items/random`;
    }

    return `${API_URL}items/${action.provider}/${id}`;
  }

  yield* requestData(LOAD_ITEM, getUrl, {
    actionSuccess: itemLoaded,
    actionError: itemLoadingError
  })
}

export function* submitStep() {
  const getUrl = (action) => `${API_URL}items/${action.provider}/${action.id}`;

  const fetchOptions = (action) => ({
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'Feature',
      properties: {
        step: action.step,
        stepIndex: action.stepIndex,
        data: action.data
      },
      geometry: action.geometry
    })
  })

  yield* requestData(SUBMIT_STEP, getUrl, {
    fetchOptions,
    actionSuccess: stepSubmitted,
    actionSuccessParams: (action, resultData) => [
      action.provider,
      action.id,
      action.step,
      action.stepIndex,
      action.data,
      action.geometry
    ],
    actionError: stepSubmitError
  });
}

export function* skipStep() {
  const getUrl = (action) => `${API_URL}items/${action.provider}/${action.id}`;

  const fetchOptions = (action) => ({
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'Feature',
      properties: {
        step: action.step,
        stepIndex: action.stepIndex,
        skipped: true
      }
    })
  });

  yield* requestData(SKIP_STEP, getUrl, {
    fetchOptions,
    actionSuccess: stepSkipped,
    actionSuccessParams: (action, resultData) => [
      action.provider,
      action.id,
      action.step,
      action.stepIndex
    ],
    actionError: stepSkipError
  });
}

export function* getLogOut() {
  yield* requestData(LOG_OUT, `${API_URL}oauth/disconnect`, {
    actionSuccess: logOutSuccess,
    actionError: logOutError
  });
}

export function* getSubmissions() {
  yield* requestData(LOAD_OAUTH_SUCCESS, `${API_URL}/tasks/geotag-text/submissions/count`, {
    actionSuccess: submissionsLoaded,
    actionError: submissionsLoadingError
  });
}

export function* getLogOutSuccess() {
  while (true) {
    yield take(LOG_OUT_SUCCESS);
    yield put(loadOAuth());
  }
}

export function* getOAuth() {
  yield* requestData(LOAD_OAUTH, `${API_URL}oauth`, {
    actionSuccess: oauthLoaded,
    actionError: oauthLoadingError
  })
}
