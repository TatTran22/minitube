import * as React from 'react';
import './SearchBar.css';
import { InputGroup, Icon, Button, FormGroup } from '@blueprintjs/core';
import { Hotkey, Hotkeys, HotkeysTarget } from '@blueprintjs/core';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  handleSearchChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    this.props.onSearchSubmit(this.state.searchValue);
  };
  render() {
    const searchIcon = <Icon icon='search'></Icon>;
    const searchButton = (
      <Button icon='search' large={true} minimal={true} type='submit'></Button>
    );

    return (
      <div className='search-bar'>
        <form onSubmit={this.handleSearchSubmit}>
          <InputGroup
            id='search-videos-input'
            type='search'
            placeholder='Search something...'
            onChange={this.handleSearchChange}
            value={this.state.searchValue}
            rightElement={searchButton}
            autoFocus={true}
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;
