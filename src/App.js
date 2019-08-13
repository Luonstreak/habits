import React from "react";
import { connect } from "react-redux";
import * as firebase from "firebase/app";
import "firebase/auth";
import { range } from "lodash";
import {
  loginUser,
  logoutUser,
  createHabit,
  deleteHabit,
  createRecord,
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
      textInput: "",
    };
  }

  handleTextChange = e => {
    this.setState({ ...this.state, textInput: e.target.value });
  };

  renderHabits = () => {
    const { records } = this.props;
    if (!records) {
      return <h1>Start by adding a habit below</h1>;
    } else {
      return Object.keys(records).map(key => (
        <Habit
          key={key}
          title={key}
          data={records[key]}
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
    if (!this.props.user) {
      const provider = new firebase.auth.FacebookAuthProvider();

      return (
        <div className="container">
          <div className="header">
            <h1>PLEASE LOGIN</h1>
            <button
              id="facebook-btn"
              onClick={() => {
                firebase
                  .auth()
                  .signInWithRedirect(provider)
                  .then(({ user, credential: { accessToken } }) => {
                    this.props.loginUser(user, accessToken);
                    console.log("*** LOGGED IN ***", user);
                  })
                  .catch(function(error) {
                    console.log("*** LOGGIN ERROR ***", error);
                  });
              }}
            >
              FACEBOOK LOGIN
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="header">
          <h2>HABIT TRACKER</h2>
          {this.props.user && (
            <button
              onClick={() => {
                firebase
                  .auth()
                  .signOut()
                  .then(function() {
                    this.props.logoutUser();
                    console.log("*** LOGGED OUT ***");
                  })
                  .catch(function(error) {
                    console.log("*** LOGGOUT ERROR ***", error);
                  });
              }}
            >
              LOGOUT
            </button>
          )}
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

const mapStateToProps = ({ records, user }) => ({
  records,
  user
});

const mapDispatchtoProps = dispatch => ({
  loginUser: (user, token) => dispatch(loginUser({ user, token })),
  logoutUser: user => dispatch(logoutUser(user)),
  createHabit: data => dispatch(createHabit(data)),
  deleteHabit: data => dispatch(deleteHabit(data)),
  createRecord: data => dispatch(createRecord(data))
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(App);

// 5 api call create habit.
// 6 api call add entry to habit.
// 7 api call delete habit.
// 8 see reports
// 9 authentication
