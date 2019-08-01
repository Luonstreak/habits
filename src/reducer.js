import { ADD_HABIT, REMOVE_HABIT, ADD_RECORD, REMOVE_RECORD, LOGIN_USER, LOGOUT_USER } from "./actionTypes";

const intialState = {
  user: {},
  habits: {}
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case ADD_HABIT:
      return state;
    case REMOVE_HABIT:
      return state;
    case ADD_RECORD:
      return state;
    case REMOVE_RECORD:
      return state;
    case LOGIN_USER:
      return state;
    case LOGOUT_USER:
      return state;
    default:
      return state;
  }
}
export default reducer;