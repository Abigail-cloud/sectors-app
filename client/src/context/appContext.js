import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'
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

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  showSidebar: false,
  isEditing: false,
  editSectorId: '',
  industry: '',
  position: '',
  company: '',
  jobLocation: userLocation || '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: [
    { 'Healthcare': ['Health information manager', 'Doctor', 'Nurse', 'Medical laboratory scientist', 'Medical physicist', 'Nuclear medicine technologist', 'others'] },
    { 'Technology': ['Software engineer', 'Web Analytics Developer', 'SEO Consultant', 'Content Manager', 'Digital marketing manager', 'Information Architect', 'Data Scientist', 'others'] },
    { 'Construction': ['Building services engineers', 'Building surveyors', 'Civil and geotechnical engineers', 'Site managers', 'Landscape architects ', 'Architects and architectural technologists', 'others'] },
    {'Agriculture': ['Agricultural Economist', 'Vet. Doctor', 'Animal Scientist', 'Plant Scientist', 'Precision Agriculture Specialist', 'Bioprocessing Engineer', 'others']},
    { 'Entertainment': ['Actor', 'Film Crew', 'Choreographer', 'Publicist', 'Photographer', 'Video Editor', 'Producers', 'others'] },
    {'Retail': ['Sales Associate', 'Cahiers', 'Customer Service Representatives', 'Visual mechandisers', 'Buyers', 'Store managers', 'others']},
  ],
  status: 'others',
  sectors: [],
  totalSectors: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios url
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('location')
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

      const { user, token, location } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      })
      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)

      const { user, location, token } = data

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      })
      addUserToLocalStorage({ user, location, token })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }
    clearAlert()
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }
  
  
  const createSector = async () => {
    dispatch({ type: CREATE_SECTOR_BEGIN })
    try {
      const { industry, position, company, jobLocation, jobType, status } = state
      await authFetch.post('/sector', {
        industry,
        position,
        company,
        jobLocation,
        jobType,
        status,
      })
      dispatch({ type: CREATE_SECTOR_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_SECTOR_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const getSectors = async () => {
    const { page, search, searchStatus, searchType, sort } = state

    let url = `/sector?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
    if (search) {
      url = url + `&search=${search}`
    }
    dispatch({ type: GET_SECTORS_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { sectors, totalSectors, numOfPages } = data
      dispatch({
        type: GET_SECTORS_SUCCESS,
        payload: {
          sectors,
          totalSectors,
          numOfPages,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  const setEditSector= (id) => {
    dispatch({ type: SET_EDIT_SECTOR, payload: { id } })
  }
  const editSector = async () => {
    dispatch({ type: EDIT_SECTOR_BEGIN })

    try {
      const { industry, position, company, jobLocation, jobType, status } = state
      await authFetch.patch(`/sector/${state.editSectorId}`, {
        industry,
        company,
        position,
        jobLocation,
        jobType,
        status,
      })
      dispatch({ type: EDIT_SECTOR_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_SECTOR_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const deleteSector= async (sectorId) => {
    dispatch({ type: DELETE_SECTOR_BEGIN })
    try {
      await authFetch.delete(`/sector/${sectorId}`)
      getSectors()
    } catch (error) {
      logoutUser()
    }
  }
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })
    try {
      const { data } = await authFetch('/sector/stats')
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createSector,
        getSectors,
        setEditSector,
        deleteSector,
        editSector,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
