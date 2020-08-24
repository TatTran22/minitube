import React from 'react';
// import { Example } from '@blueprintjs/docs-theme';
import { FocusStyleManager } from '@blueprintjs/core';

import youtube from '../api/Youtube';
import VideoDetail from './VideoDetail';
import './App.css';
import Header from './Header';
// import SearchBar from './SearchBar';
import VideosList from './VideosList';
// import { TAG_REMOVE } from '@blueprintjs/core/lib/esm/common/classes';

FocusStyleManager.onlyShowFocusOnTabs();

const KEY = 'AIzaSyBwFQ-sefzkTNyzeaRFmjiAg8pfGDIod3g';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      videos: [],
      selectedVideo: null,
      queryVideoTitle: '',
    };
  }

  handleSearchSubmit = async (e) => {
    this.setState({ searchValue: e, queryVideoTitle: 'Search results:' });
    const res = await youtube.get('/search', {
      params: {
        q: e,
        part: 'snippet',
        maxResults: 10,
        type: 'video',
        key: `${KEY}`,
      },
    });
    this.setState({ videos: res.data.items });
  };

  handleSelectVideo = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div className='App bp3-dark'>
        <div className='docs-frame'>
          <div className='docs'>
            <Header onSearchSubmit={this.handleSearchSubmit} />
            <div className='content-body'>
              <div className='playing-video'>
                <VideoDetail video={this.state.selectedVideo} />
              </div>
              <div className='query-videos'>
                <div className='query-videos-title'>
                  {this.state.queryVideoTitle}
                </div>
                <VideosList
                  videos={this.state.videos}
                  selectedVideo={this.handleSelectVideo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
