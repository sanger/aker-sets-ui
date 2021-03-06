import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { setAxiosConfig, setHeaders } from 'redux-json-api';
import reducers from './reducers/index';

import { STAMPS_INITIALIZATION, setUserEmail } from './actions/index'

let initialState = {
  api: {
    sets:        { data: [] },
    materials:   { data: [] },
  },
  stampsInfo: { stamps: [], status: STAMPS_INITIALIZATION, selectedStamp: null },
  materials: {
    top: { items: [], links: {}, meta: {} },
    bottom: { items: [], links: {}, meta: {} }
  },
  selected: {
    top: null,
    bottom: null
  },
  browser: {
    userMessage: null,
    items: [],
    selected: [],
    last_selected: null,
    last_shift_selected: []
  },
  userEmail: null,
  search: {
    batchTransactionSize: 10000,
    page: 1,
    maxResults: 50,
    batchGroup: 1000,
    fields: {},
    filters: [
      { id: 1, name: '', comparator: '', value: '' }
    ],
    current: [],
    results: [],
    links: {},
    sets: [],
    setMaterials: [],
    stampMaterials: [],
    meta: {},
    sortBy: '_id',
    order: 1
  },
  loading: {
    creatingSet: false,
    addMaterialsToSet: false,
    removeMaterialsFromSet: false,
    selectedOptionForModifyMaterials: null,
    stamping: false
  }
}

let store = createStore(reducers, initialState, applyMiddleware(thunk));

store.dispatch(setAxiosConfig({
  baseURL: SET_SERVICE_API,
  headers: {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
    'Cache-Control': 'no-cache,no-store,must-revalidate,max-age=-1,private'
  }
}));

export default store;
