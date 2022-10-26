import React,{useState} from 'react'
import './SearchBar.css'
import searchIcon from './search.svg';


function SearchBar() {
    const [searchText, setSearchText] = useState('')

    const [focused, setFocused] = React.useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)
    const itemsStyle = focused ? {display: 'none'} : {display: 'flex'}

    

    return (
        <div className="sB__searchBar">
            <input 
            onFocus={onFocus} 
            onBlur={onBlur}
            type="text" 
            className="sB__Input" 
            value={searchText}
            onChange={(e)=> setSearchText(e.target.value)}
            />
            <div style={itemsStyle} className="sB__iconItems">
                <img className="sB__searchIcon" src={searchIcon} alt='Search Icon'/>
                <span>Search</span>
            </div>
        </div>
    )
}

export default SearchBar