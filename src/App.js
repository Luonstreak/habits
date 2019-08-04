import React from "react";
import { connect } from "react-redux";
import * as firebase from "firebase/app";
import {
  loginUser,
  logoutUser,
  addHabit,
  removeHabit,
  addRecord,
  removeRecord
} from "./actions";
import "./index.css";

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

const Habit = data => {
  // var test = Date.now();
  //  function formatDate(date) {
  //   var newDate = new Date(date);
  //   return newDate.getMonth();
  // }
  // console.log(formatDate(test));

  return (
    <tr>
      <td className="title">{data.data.title}</td>
      {[...Array(32).keys()].map(day => (
        <td
          key={day}
          className={false ? "box active" : "box"}
          onClick={() => {}}
        />
      ))}
    </tr>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: ""
    };
  }

  renderHabits = () => {
    const { habits } = this.props;
    if (!habits) {
      return null;
    } else {
      return Object.keys(habits).map(key => (
        <Habit key={key} data={habits[key]} />
      ));
    }
  };

  handleTextChange = e => {
    this.setState({ ...this.state, textInput: e.target.value });
  };

  createHabit = () => {
    const { textInput } = this.state;
    if (textInput) {
      this.props.addHabit(textInput);
    }
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
        <button
          onClick={() => {
            this.createHabit();
            this.setState({ ...this.state, textInput: "" });
          }}
        >
          ADD
        </button>
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
              {[...Array(32).keys()].map(el => (
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
  user: state.user,
  habits: state.habits
});

const mapDispatchtoProps = dispatch => ({
  loginUser: data => dispatch(loginUser(data)),
  logoutUser: user => dispatch(logoutUser(user)),
  addHabit: data => dispatch(addHabit(data)),
  removeHabit: data => dispatch(removeHabit(data)),
  addRecord: data => dispatch(addRecord(data)),
  removeRecord: data => dispatch(removeRecord(data))
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(App);
