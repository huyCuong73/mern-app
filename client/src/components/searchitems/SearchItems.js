import React from 'react';
import { useSelector } from 'react-redux';

import DisplayItems from '../displayitems/DisplayItems';
import "./searchitems.scss"

const SearchItems = () => {
    const movies = useSelector(state => state.search)

    return (
        <div className='itemsContainer'>
            {movies.isFetching ?
                <div className='loading'>Loading...</div>
                :
                <DisplayItems movies={movies.items}/>
            }
            
        </div>
    );
}

export default SearchItems;
