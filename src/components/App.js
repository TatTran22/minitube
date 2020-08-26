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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      videos: [],
      selectedVideo: null,
      queryVideoTitle: '',
      searchSubmited: true,
    };
  }
  handleResponse = async (res) => {
    let IDs = res.data.items.map((video) => {
      return video.id.videoId ? video.id.videoId : video.id;
    });
    let id = IDs.toString();
    const res2 = await youtube.get('/videos', {
      params: {
        id: id,
        part: 'snippet,contentDetails,statistics',
        maxResults: 10,
        type: 'video',
      },
    });
    return res2;
  };

  handleSearchSubmit = async (e) => {
    this.setState({ searchValue: e, queryVideoTitle: 'Search results:' });

    const res = await youtube.get('/search', {
      params: {
        q: e,
        part: 'snippet',
        maxResults: 10,
        type: 'video',
      },
    });
    const res2 = await this.handleResponse(res);
    this.setState({
      videos: res2.data.items,
      queryVideoTitle: `Results for : '${e}'`,
    });
  };

  handleSelectVideo = (video) => {
    this.setState({ selectedVideo: video });
  };

  componentDidMount = async () => {
    const res = await youtube.get('/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'VN',
        type: 'video',
        maxResults: 10,
      },
    });

    const res2 = await this.handleResponse(res);

    this.setState({
      videos: res2.data.items,
      searchSubmited: 1,
      queryVideoTitle: 'Top trending Vietnam',
      selectedVideo: res2.data.items[0],
    });
    console.log(res2.data.items);
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
                  searchSubmited={
                    this.state.searchSubmited || this.state.searchValue
                  }
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
