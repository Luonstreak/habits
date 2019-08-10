import React from "react";
import { connect } from "react-redux";
import * as firebase from "firebase/app";
import { range } from "lodash";
import {
  loginUser,
  logoutUser,
  createHabit,
  deleteHabit,
  createRecord,
  deleteRecord
} from "./actions";
import "./index.css";

import Habit from "./Habit";

const firebaseConfig = {
  apiKey: "AIzaSyDZYJevoS9QkVpxGGeDFLgw2RDhn3PU59o",
  authDomain: "habits-ff9ae.firebaseapp.com",
  databaseURL: "https://habits-ff9ae.firebaseio.com",
  projectId: "habits-ff9ae",
  storageBucket: "habits-ff9ae.appspot.com",
  messagingSenderId: "741663932485",
  appId: "1:741663932485:web:f8772bebe0ba2dc1"
};
firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: ""
    };
  }

  handleTextChange = e => {
    this.setState({ ...this.state, textInput: e.target.value });
  };

  renderHabits = () => {
    const { store } = this.props
    if (!store) {
      return null;
    } else {
      return Object.keys(store).map(key => (
        <Habit
          key={key}
          title={key}
          data={store[key]}
          createNewEntry={(habitName, day) =>
            this.props.createRecord({ habitName, day })
          }
          deleteHabit={habitName => this.props.deleteHabit(habitName)}
        />
      ));
    }
  };

  createHabit = () => {
    const { textInput } = this.state;
    if (textInput) {
      this.props.createHabit(textInput);
    }
    this.setState({ ...this.state, textInput: "" });
  };

  renderAddLink = () => (
    <tr>
      <td className="title link">
        <input
          type="text"
          value={this.state.textInput}
          onChange={e => {
            this.handleTextChange(e);
          }}
        />
        <button onClick={() => this.createHabit()}>ADD</button>
      </td>
    </tr>
  );

  render() {
    return (
      <div className="container">
        <div className="header">
          <h2>HABIT TRACKER</h2>
        </div>
        <table>
          <thead>
            <tr>
              <td className="title">HABIT</td>
              {range(1, 31, 1).map(el => (
                <td key={el} className="header-box">
                  <h1>{el}</h1>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.renderHabits()}
            {this.renderAddLink()}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state
});

const mapDispatchtoProps = dispatch => ({
  loginUser: data => dispatch(loginUser(data)),
  logoutUser: user => dispatch(logoutUser(user)),
  createHabit: data => dispatch(createHabit(data)),
  deleteHabit: data => dispatch(deleteHabit(data)),
  createRecord: data => dispatch(createRecord(data)),
  deleteRecord: data => dispatch(deleteRecord(data))
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(App);

// 2 render habits per day accuratelly local.
// 5 api call create habit.
// 6 api call add entry to habit.
// 7 api call delete habit.
// 8 see reports
// 9 authentication
