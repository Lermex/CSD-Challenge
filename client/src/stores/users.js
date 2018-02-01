import {handleActions, createActions} from 'redux-actions';
import {getUsers, search} from '../api/main-api';
import {getPhones, getAdditional} from '../api/legacy-api';
import {processPhones, processAdditional} from '../utils';

const defaultInitialState = {
  users: {},
  usersLoaded: false,
  userDetails: {
    userId: null,
    phones: [],
    phonesLoaded: false,
    additional: [],
    additionalLoaded: false
  },
  search: {
    active: false,
    loaded: false,
    results: []
  }
};

const actions = (() => {
  const simpleActions = createActions({
    startGetUsers: a => a,
    completeGetUsers: a => a,
    startGetDetails: a => a,
    completeGetPhones: a => a,
    completeGetAdditional: a => a,
    startSearch: a => a,
    completeSearch: a => a,
    stopSearch: a => a
  });

  const asyncActions = {
    getUsers: () => (dispatch) => {
      dispatch(simpleActions.startGetUsers());
      getUsers().then(users => dispatch(simpleActions.completeGetUsers(users)));
    },
    getDetails: userId => (dispatch) => {
      dispatch(simpleActions.startGetDetails(userId));
      getPhones(userId).then(phones => dispatch(simpleActions.completeGetPhones(phones)));
      getAdditional(userId).then(additional => dispatch(simpleActions.completeGetAdditional(additional)));
    },
    search: text => (dispatch) => {
      if (text === '') {
        dispatch(simpleActions.stopSearch());
        return;
      }
      dispatch(simpleActions.startSearch());
      search(text).then(users => dispatch(simpleActions.completeSearch(users)));
    }
  };

  return {...simpleActions, ...asyncActions};
})();

const reducer = handleActions({
  startGetDetails: (state, action) => {
    return {
      ...state,
      userDetails: {
        userId: action.payload,
        phones: [],
        phonesLoaded: false,
        additional: [],
        additionalLoaded: false
      }
    };
  },
  completeGetUsers: (state, action) => {
    return {
      ...state,
      users: action.payload,
      usersLoaded: true
    };
  },
  completeGetPhones: (state, action) => {
    return {
      ...state,
      userDetails: {
        ...state.userDetails,
        phones: processPhones(action.payload),
        phonesLoaded: true
      }
    };
  },
  completeGetAdditional: (state, action) => {
    return {
      ...state,
      userDetails: {
        ...state.userDetails,
        additional: processAdditional(action.payload),
        additionalLoaded: true
      }
    };
  },
  startSearch: (state, action) => {
    return {
      ...state,
      search: {active: true, loaded: false, results: []}
    };
  },
  completeSearch: (state, action) => {
    return {
      ...state,
      search: {active: true, loaded: true, results: action.payload}
    };
  },
  stopSearch: (state, action) => {
    return {
      ...state,
      search: {active: false, loaded: false, results: []}
    };
  }
}, defaultInitialState);

export default {actions, reducer};
