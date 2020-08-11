import React from "react";
import "./SearchBar.css";

const sortByOptions = {
  "Best Match": "best_match",
  "Highest Rated": "rating",
  "Most Reviewed": "review_count",
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    //create state object with the keys:
    //terms, location, sortBy for the search option inputs
    this.state = {
      term: "",
      location: "",
      sortBy: "best_match",
      userLocation: "",
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  //methods to deal with input elements Terms and Location
  handleTermChange(event) {
    this.setState({
      term: event.target.value,
    });
  }
  handleLocationChange(event) {
    this.setState({
      location: event.target.value,
    });
  }
  //give the let's go button functionality
  handleSearch(event) {
    this.props.searchYelp(
      this.state.term,
      this.state.location,
      this.state.sortBy
    );
    event.preventDefault();
    const background = document.querySelector("html");
    background.style = "height: 300px;";
    const searchy = document.querySelector("#businessDiv");
    const BusinessList = document.querySelector(".BusinessList");
    searchy.style = "display:none";
    BusinessList.style = "display:inherit";
  }

  getSortByClass(sortByOption) {
    if (sortByOption === this.state.sortBy) {
      return "active";
    } else {
      return "";
    }
  }

  handleSortByChange(sortByOption) {
    this.setState({
      sortBy: sortByOption,
    });
  }

  //grab the keys in sortbyOptions and loop through them, returning as a <li> with event handlers.
  renderSortByOptions() {
    return Object.keys(sortByOptions).map((sortByOption, i) => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return (
        <div key={i} onClick={this.handleSearch}>
          <p
            key={sortByOptionValue}
            onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
            className={this.getSortByClass(sortByOptionValue)}
          >
            {sortByOption}
          </p>
        </div>
      );
    });
  }
  //Event handler so they can submit searches by pressing enter as well as clicking button
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.handleSearch(event);
    }
  };

  async getLocation() {
    const response = await fetch("https://ipapi.co/json");
    const jsonResponse = await response.json();
    this.setState({ userLocation: "Search Location: " + jsonResponse.city });
    this.setState({ location: jsonResponse.city });
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    return (
      <div className="SearchBar">
        <nav id="nav">
          <div id="logo">
            <img src={require("./favicon.ico")} alt="logo" />

            <h2>Mighty-Tasty!</h2>
          </div>
          <div className="SearchBar-sort-options">
            {this.renderSortByOptions()}
          </div>
        </nav>
        <div className="SearchBar-fields" onKeyPress={this.handleKeyPress}>
          <input
            placeholder="&#128270; Search Businesses"
            term="Search Businesses"
            onChange={this.handleTermChange}
          />
          <input
            placeholder={this.state.userLocation}
            onChange={this.handleLocationChange}
          />
        </div>
        <button
          className="SearchBar-submit"
          onClick={this.handleSearch}
          onKeyPress={this.handleKeyPress}
        >
          Let's Go
        </button>
      </div>
    );
  }
}

export default SearchBar;
