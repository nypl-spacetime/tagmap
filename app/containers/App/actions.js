/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_ITEM,
  LOAD_ITEM_SUCCESS,
  LOAD_ITEM_ERROR,

  LOAD_OAUTH,
  LOAD_OAUTH_SUCCESS,
  LOAD_OAUTH_ERROR,

  LOAD_SUBMISSIONS,
  LOAD_SUBMISSIONS_SUCCESS,
  LOAD_SUBMISSIONS_ERROR,

  SUBMIT_STEP,
  SUBMIT_STEP_SUCCESS,
  SUBMIT_STEP_ERROR,
  SKIP_STEP,
  SKIP_STEP_SUCCESS,
  SKIP_STEP_ERROR,

  TOGGLE_MENU,

  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_ERROR,

  GEOCODE,
  GEOCODE_SUCCESS,
  GEOCODE_ERROR,

  REVERSE_GEOCODE,
  REVERSE_GEOCODE_SUCCESS,
  REVERSE_GEOCODE_ERROR
} from './constants';

export function setIntroductionWatched() {
  return {
    type: WATCHED_INTRODUCTION
  };
}

export function nextStep() {
  return {
    type: NEXT_STEP
  };
}

export function submitStep(provider, id, step, stepIndex, data, geometry) {
  return {
    type: SUBMIT_STEP,
    provider,
    id,
    step,
    stepIndex,
    data,
    geometry
  };
}

export function stepSubmitted(provider, id, step, stepIndex, data, geometry) {
  return {
    type: SUBMIT_STEP_SUCCESS,
    provider,
    id,
    step,
    stepIndex,
    data,
    geometry
  };
}

export function stepSubmitError(error) {
  return {
    type: SUBMIT_STEP_ERROR,
    error
  };
}

export function skipStep(provider, id, step, stepIndex) {
  return {
    type: SKIP_STEP,
    provider,
    id,
    step,
    stepIndex
  };
}

export function stepSkipped(provider, id, step, stepIndex) {
  return {
    type: SKIP_STEP_SUCCESS,
    provider,
    id,
    step,
    stepIndex
  };
}

export function stepSkipError(error) {
  return {
    type: SKIP_STEP_ERROR,
    error
  };
}

export function loadItem(provider, id) {
  return {
    type: LOAD_ITEM,
    provider,
    id
  };
}

export function itemLoaded(item) {
  return {
    type: LOAD_ITEM_SUCCESS,
    item
  };
}

export function itemLoadingError(error) {
  return {
    type: LOAD_ITEM_ERROR,
    error,
  };
}

export function submissionsLoaded(submissions) {
  return {
    type: LOAD_SUBMISSIONS_SUCCESS,
    submissions
  };
}

export function submissionsLoadingError(error) {
  return {
    type: LOAD_SUBMISSIONS_ERROR,
    error,
  };
}

export function loadOAuth() {
  return {
    type: LOAD_OAUTH,
  };
}

export function oauthLoaded(oauth) {
  return {
    type: LOAD_OAUTH_SUCCESS,
    oauth
  };
}

export function oauthLoadingError(error) {
  return {
    type: LOAD_OAUTH_ERROR,
    error
  };
}

export function loadItem(provider, id) {
  return {
    type: LOAD_ITEM,
    provider,
    id
  };
}

export function toggleMenu(show, clientX, shiftKey) {
  return {
    type: TOGGLE_MENU,
    show,
    clientX,
    shiftKey
  };
}

export function logOut() {
  return {
    type: LOG_OUT
  };
}

export function logOutSuccess() {
  return {
    type: LOG_OUT_SUCCESS
  };
}

export function logOutError() {
  return {
    type: LOG_OUT_ERROR
  };
}


export function geocode(text) {
  return {
    type: GEOCODE,
    text
  };
}

export function geocodeSuccess(results) {
  return {
    type: GEOCODE_SUCCESS,
    results
  };
}

export function geocodeError(error) {
  return {
    type: GEOCODE_ERROR,
    error
  };
}

export function reverseGeocode(lat, lon) {
  return {
    type: REVERSE_GEOCODE,
    lat,
    lon
  };
}

export function reverseGeocodeSuccess(results) {
  return {
    type: REVERSE_GEOCODE_SUCCESS,
    results
  };
}

export function reverseGeocodeError(error) {
  return {
    type: REVERSE_GEOCODE_ERROR,
    error
  };
}
