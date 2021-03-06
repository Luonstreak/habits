import {
  CREATE_HABIT,
  DELETE_HABIT,
  UPDATE_RECORD,
  LOGIN_USER,
  LOGOUT_USER
} from "./actionTypes";

const intialState = {};

const reducer = (state = intialState, action) => {
  const month = new Date(Date.now()).getMonth() + 1;
  switch (action.type) {
    case CREATE_HABIT:
      return {
        ...state,
        [action.payload]: {}
      };
    case DELETE_HABIT:
      return Object.keys(state)
        .filter(key => key !== action.payload)
        .reduce((obj, key) => {
          obj[key] = state[key];
          return obj;
        }, {});
    case UPDATE_RECORD:
      const { habitName, day } = action.payload;
      if (state[habitName][month] && state[habitName][month][day]) {
        return {
          ...state,
          [habitName]: {
            ...state[habitName],
            [month]: Object.keys(state[habitName][month])
              .filter(key => parseInt(key) !== day)
              .reduce((obj, key) => {
                obj[key] = true;
                return obj;
              }, {})
          }
        };
      } else {
        if (state[habitName][month]) {
          return {
            ...state,
            [habitName]: {
              ...state[habitName],
              [month]: {
                ...state[habitName][month],
                [day]: true
              }
            }
          };
        } else {
          return {
            ...state,
            [habitName]: {
              ...state[habitName],
              [month]: { [day]: true }
            }
          };
        }
      }
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload.user,
        facebook_token: action.payload.token
      };
    case LOGOUT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};
export default reducer;
