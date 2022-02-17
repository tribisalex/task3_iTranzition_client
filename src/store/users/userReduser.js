import users from "../Components/Users/Users";
import {userApi} from "../api/api";
import {SET_STATUS} from "../types";

const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
  users: []
}

const usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.id) {
            return {...u, status: 'block'}
          }
          return u;
        })
      }

    default:
      return state;
  }
}

export const setStatusSuccess = (id) => ({type: SET_STATUS, id})
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleIsFollowingProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId
})


export const getUsers = (currentPage, pageSize) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    userApi.getUsers(currentPage, pageSize).then(data => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
    });
  }
}

export const changeStatus = (id) => {
  return (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userId));
    userApi.follow(userId)
    .then(response => {
      if (response.data.resultCode == 0) {
        dispatch(followSuccess(userId));
      }
      dispatch(toggleIsFollowingProgress(false, userId));
    });
  }
}

export const unfollow = (userId) => {
  return (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userId));
    userApi.unfollow(userId)
    .then(response => {
      if (response.data.resultCode == 0) {
        dispatch(unfollowSuccess(userId));
      }
      dispatch(toggleIsFollowingProgress(false, userId));
    });
  }
}

export default usersReducer;