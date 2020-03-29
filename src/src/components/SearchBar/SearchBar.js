import React from 'react';
import './SearchBar.css';
import AddressForm from '../Autocomplete/Autocomplete';

const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
};

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        //create state object with the keys:
        //terms, location, sortBy for the search option inputs
        this.state= {
        term: '' ,
        location: '',
        sortBy: 'best_match',
        };
        //since they use .this the these two methods need to be bind(ed)
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        //this uses props so it must also be bound
        this.handleSearch = this.handleSearch.bind(this);
    }

        //methods to deal with input elements Terms and Location
     handleTermChange(event){
        this.setState({
            term: event.target.value
         });
     }
    handleLocationChange(event){
         this.setState({
            location:  event.target.value
         });
      }
      //give the let's go button functionality
    handleSearch(event){
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();
    }
        
    getSortByClass(sortByOption){
        if(sortByOption === this.state.sortBy){
            return 'active'
        } else {
            return ''
        }
    };

    handleSortByChange(sortByOption){
        this.setState({
            sortBy: sortByOption
        });
    }

    //grab the keys in sortbyOptions and loop through them, returning as a <li> with event handlers.
    renderSortByOptions() {
        return Object.keys(sortByOptions).map(sortByOption => {
            let sortByOptionValue = sortByOptions[sortByOption];
        return <div onClick={this.handleSearch}><li key={sortByOptionValue} onClick={this.handleSortByChange.bind(this, sortByOptionValue)} className={this.getSortByClass(sortByOptionValue)}>{sortByOption}</li></div>
        });
    }
    //Event handler so they can submit searches by pressing enter as well as clicking button
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          this.handleSearch(event);
        }
      }



    render() {
        return (
    <div className="SearchBar">
        <div className="SearchBar-sort-options">
            <ul>
              {this.renderSortByOptions()}
             </ul>
        </div>
        <AddressForm />
    <div className="SearchBar-fields" onKeyPress={this.handleKeyPress}>
      <input term="Search Businesses" onChange={this.handleTermChange}/>
      <input placeholder="Where?" onChange={this.handleLocationChange}/>
    </div>
    <div className="SearchBar-submit">
      <a href='http://wwww.#.com' onClick={this.handleSearch} onKeyPress={this.handleKeyPress}>Let's Go</a>
    </div>
    </div>
        )
    }
}

export default SearchBar;