import React, { useState, useEffect } from 'react';
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

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [queryVideoTitle, setQueryVideoTitle] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(true);

  const handleResponse = async (res) => {
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

  const handleSearchSubmit = async (e) => {
    setSearchValue(e);
    setQueryVideoTitle('Search results:');

    const res = await youtube.get('/search', {
      params: {
        q: e,
        part: 'snippet',
        maxResults: 10,
        type: 'video',
      },
    });
    const res2 = await this.handleResponse(res);

    setVideos(res2.data.items);
    setQueryVideoTitle(`Results for : '${e}'`);
  };

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await youtube.get('/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          chart: 'mostPopular',
          regionCode: 'VN',
          type: 'video',
          maxResults: 10,
        },
      });

      const res2 = await handleResponse(res);

      setVideos(res2.data.items);
      setSearchSubmitted(1);
      setQueryVideoTitle('Top trending Vietnam');
      setSelectedVideo(res2.data.items[0]);

      console.log(res2.data.items);
    }

    fetchData();

    return () => {};
  }, []);

  return (
    <div className='App bp3-dark'>
      <div className='docs-frame'>
        <div className='docs'>
          <Header onSearchSubmit={handleSearchSubmit} />
          <div className='content-body'>
            <div className='playing-video'>
              <VideoDetail video={selectedVideo} />
            </div>
            <div className='query-videos'>
              <div className='query-videos-title'>{queryVideoTitle}</div>
              <VideosList
                videos={videos}
                selectedVideo={handleSelectVideo}
                searchSubmitted={searchSubmitted || searchValue}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
