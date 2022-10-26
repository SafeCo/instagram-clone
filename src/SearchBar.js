import React from 'react'
import './SearchBar.css'
import searchIcon from './search.svg';


function SearchBar() {
    return (
        <div className="sB__searchBar">
        <input type="text" className="sB__Input" />
            <div className="sB__iconItems">
                <img className="sB__searchIcon" src={searchIcon} alt='Search Icon'/>
                <span>Search</span>
            </div>
        </div>
    )
}

export default SearchBar