import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from './SeasonDisplay.js';
import Loader from './Loader.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      errMessage: '',
    }
  }

  //Called when the component is rendered for the first time
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
        });
      },
      err => {
        this.setState({
          errMessage: err.message
        });
      }
    );
  }

  renderContent() {
    //If there is an error message
    if (this.state.errMessage && !this.state.lat) {
      return (
        <div>Error: {this.state.errMessage}</div>
      );
    }

    //If we get the latitude and no error message
    if (!this.state.errMessage && this.state.lat) {
      return (
        <SeasonDisplay lat={this.state.lat} />
      );
    }

    return <Loader />;
  }

  render() {
    return this.renderContent();
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
