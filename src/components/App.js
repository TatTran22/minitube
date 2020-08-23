import React from 'react';
import { Example } from '@blueprintjs/docs-theme';
import { FocusStyleManager } from '@blueprintjs/core';
import youtube from '../api/Youtube';

import './App.css';
import Header from './Header';
import SearchBar from './SearchBar';
import VideosList from './VideosList';
import { TAG_REMOVE } from '@blueprintjs/core/lib/esm/common/classes';

FocusStyleManager.onlyShowFocusOnTabs();

const KEY = 'AIzaSyBwFQ-sefzkTNyzeaRFmjiAg8pfGDIod3g';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      videos: [],
    };
  }

  handleSearchSubmit = async (e) => {
    this.setState({ searchValue: e });
    const res = await youtube.get('/search', {
      params: {
        q: e,
        part: 'snippet',
        maxResults: 5,
        type: 'video',
        key: `${KEY}`,
      },
    });
    this.setState({ videos: res.data.items });
  };

  render() {
    return (
      <div className='App bp3-dark'>
        <div className='docs-frame'>
          <div className='docs'>
            <Header onSearchSubmit={this.handleSearchSubmit} />
            <div className='content-body'>
              <div className='playing-video'>Playing</div>
              <div className='query-videos'>
                <VideosList videos={this.state.videos} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
