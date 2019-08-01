import {
  ADD_HABIT,
  REMOVE_HABIT,
  ADD_RECORD,
  REMOVE_RECORD,
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

export const addHabit = newHabit => ({
  type: ADD_HABIT,
  payload: newHabit
});

export const removeHabit = HabitID => ({
  type: REMOVE_HABIT,
  payload: HabitID
});

export const addRecord = newRecord => ({
  type: ADD_RECORD,
  payload: newRecord
});

export const removeRecord = recordID => ({
  type: REMOVE_RECORD,
  payload: recordID
});
