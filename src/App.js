import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import BusinessList from "./components/BusinessList/BusinessList";
import Yelp from "./util/Yelp";

class App extends React.Component {
  constructor(props) {
    super(props);
    //set the initial state
    this.state = {
      businesses: [],
    };
    //bind because searchYelp uses this.setState
    this.searchYelp = this.searchYelp.bind(this);
  }
  searchYelp(term, location, sortBy) {
    Yelp.searchYelp(term, location, sortBy).then((businesses) => {
      this.setState({
        businesses: businesses,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="background">
          <SearchBar searchYelp={this.searchYelp} />
        </div>
        <div id="businessDiv">
          <img src={require("./searchy.gif")} alt="search gif"></img>
        </div>
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
