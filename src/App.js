import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: {},
      days: [...Array(32).keys()]
    };
  }

  componentDidMount() {
    console.log(this.state.habits);
  }

  turnActive = el => {
    this.setState(prevState => ({
      ...prevState,
      code: { ...prevState.code, [el]: true }
    }));
  };

  renderHeaders = () => {
    return this.state.days.map(el => (
      <td key={el} className="header-box">
        <h1>{el}</h1>
      </td>
    ));
  };

  renderBoxes = () => {
    const { code } = this.state;
    return this.state.days.map(el => (
      <td
        key={el}
        className={code[el] ? "box active" : "box"}
        onClick={() => this.turnActive(el)}
      />
    ));
  };

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
              {this.renderHeaders()}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="title">CODE</td>
              {this.renderBoxes()}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
