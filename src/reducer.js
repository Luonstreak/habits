import {
  CREATE_HABIT,
  DELETE_HABIT,
  CREATE_RECORD,
  DELETE_RECORD,
  LOGIN_USER,
  LOGOUT_USER
} from "./actionTypes";

const intialState = {
  user: {},
  habits: {}
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case CREATE_HABIT:
      return {
        ...state,
        habits: {
          ...state.habits,
          [action.payload]: {
            title: action.payload,
            records: {}
          }
        }
      };
    case DELETE_HABIT:
      return {
        ...state,
        habits: Object.keys(state.habits)
          .filter(elem => {
            return elem !== action.payload;
          })
          .reduce((acc, curr) => {
            acc[curr] = state.habits[curr];
            return acc;
          }, {})
      };
    case CREATE_RECORD:
      const { habitName, day } = action.payload;
      const month = new Date(Date.now()).getMonth() + 1;
      return {
        ...state,
        habits: {
          ...state.habits,
          [habitName]: {
            title: state.habits[habitName].title,
            records: {}
          }
        }
      };
    case DELETE_RECORD:
      return state;
    case LOGIN_USER:
      return state;
    case LOGOUT_USER:
      return state;
    default:
      return state;
  }
};
export default reducer;
