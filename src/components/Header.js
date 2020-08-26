import React from 'react';
// import youtubeLogoLight from './../static/yt_logo_rgb_light.png';
import youtubeLogoDark from './../static/yt_logo_rgb_dark.png';

import SearchBar from './SearchBar';
import './Header.css';

class Header extends React.Component {
  render() {
    const handleSearchSubmit = (e) => {
      this.props.onSearchSubmit(e);
    };

    return (
      <div className='header'>
        <img alt='Youtube' src={youtubeLogoDark} />
        <SearchBar onSearchSubmit={handleSearchSubmit} />
      </div>
    );
  }
}

export default Header;
