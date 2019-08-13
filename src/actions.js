import {
  CREATE_HABIT,
  DELETE_HABIT,
  UPDATE_RECORD,
  LOGIN_USER,
  LOGOUT_USER
} from "./actionTypes";

export const loginUser = credentials => ({
  type: LOGIN_USER,
  payload: credentials
});

export const logoutUser = credentials => ({
  type: LOGOUT_USER,
  payload: credentials
});

export const createHabit = habitName => ({
  type: CREATE_HABIT,
  payload: habitName
});

export const deleteHabit = HabitID => ({
  type: DELETE_HABIT,
  payload: HabitID
});

export const createRecord = data => ({
  type: UPDATE_RECORD,
  payload: data
});