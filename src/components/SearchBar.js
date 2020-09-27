import React, { useState } from 'react';
import './SearchBar.css';
import { InputGroup, Button } from '@blueprintjs/core';

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    props.onSearchSubmit(searchValue);
  };

  const searchButton = (
    <Button icon='search' large={true} minimal={true} type='submit'></Button>
  );
  return (
    <div className='search-bar'>
      <form onSubmit={handleSearchSubmit}>
        <InputGroup
          id='search-videos-input'
          type='search'
          placeholder='Search something...'
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          rightElement={searchButton}
          autoFocus={true}
        />
      </form>
    </div>
  );
};

export default SearchBar;
