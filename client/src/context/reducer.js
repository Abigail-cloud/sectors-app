import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_SECTOR_BEGIN,
    CREATE_SECTOR_SUCCESS,
    CREATE_SECTOR_ERROR,
    GET_SECTORS_BEGIN,
    GET_SECTORS_SUCCESS,
    SET_EDIT_SECTOR,
    DELETE_SECTOR_BEGIN,
    EDIT_SECTOR_BEGIN,
    EDIT_SECTOR_SUCCESS,
    EDIT_SECTOR_ERROR,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTERS,
    CHANGE_PAGE,
  } from './action'
  
  import { initialState } from './appContext'
  
  const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Please provide all values!',
      }
    }
    if (action.type === CLEAR_ALERT) {
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      }
    }
  
    if (action.type === SETUP_USER_BEGIN) {
      return { ...state, isLoading: true }
    }
    if (action.type === SETUP_USER_SUCCESS) {
      return {
        ...state,
        isLoading: true,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: 'success',
        alertText: action.payload.alertText,
      }
    }
    if (action.type === SETUP_USER_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }
    if (action.type === TOGGLE_SIDEBAR) {
      return {
        ...state,
        showSidebar: !state.showSidebar,
      }
    }
    if (action.type === LOGOUT_USER) {
      return {
        ...initialState,
        user: null,
        token: null,
        jobLocation: '',
        userLocation: '',
      }
    }
    if (action.type === UPDATE_USER_BEGIN) {
      return { ...state, isLoading: true }
    }
    if (action.type === UPDATE_USER_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: 'success',
        alertText: 'User Profile Updated!',
      }
    }
    if (action.type === UPDATE_USER_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }
    if (action.type === HANDLE_CHANGE) {
      return {
        ...state,
        page: 1,
        [action.payload.name]: action.payload.value,
      }
    }
    if (action.type === CLEAR_VALUES) {
      const initialState = {
        isEditing: false,
        editSectorId: '',
        position: '',
        company: '',
        jobLocation: state.userLocation,
        jobType: 'full-time',
        status: 'others',
      }
  
      return {
        ...state,
        ...initialState,
      }
    }
    if (action.type === CREATE_SECTOR_BEGIN) {
      return { ...state, isLoading: true }
    }
  
    if (action.type === CREATE_SECTOR_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'New Sector Created!!!',
      }
    }
    if (action.type === CREATE_SECTOR_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }
    if (action.type === GET_SECTORS_BEGIN) {
      return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === GET_SECTORS_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        sectors: action.payload.sectors,
        totalSectors: action.payload.totalSectors,
        numOfPages: action.payload.numOfPages,
      }
    }
    if (action.type === SET_EDIT_SECTOR) {
      const sector= state.sectors.find((sector) => sector._id === action.payload.id)
      const { _id, industry, position, company, jobLocation, jobType, status } =sector
      return {
        ...state,
        isEditing: true,
        editSectorId: _id,
        industry,
        position,
        company,
        jobLocation,
        jobType,
        status,
      }
    }
    if (action.type === DELETE_SECTOR_BEGIN) {
      return { ...state, isLoading: true }
    }
    if (action.type === EDIT_SECTOR_BEGIN) {
      return {
        ...state,
        isLoading: true,
      }
    }
    if (action.type === EDIT_SECTOR_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Sector Updated!',
      }
    }
    if (action.type === EDIT_SECTOR_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }
    if (action.type === SHOW_STATS_BEGIN) {
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      }
    }
    if (action.type === SHOW_STATS_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        stats: action.payload.stats,
        monthlyApplications: action.payload.monthlyApplications,
      }
    }
    if (action.type === CLEAR_FILTERS) {
      return {
        ...state,
        search: '',
        searchStatus: 'all',
        searchType: 'all',
        sort: 'latest',
      }
    }
    if (action.type === CHANGE_PAGE) {
      return { ...state, page: action.payload.page }
    }
    throw new Error(`no such action : ${action.type}`)
  }
  
  export default reducer
  