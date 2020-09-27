import React from 'react';
import VideoItem from './VideoItem';
// import youtube from '../api/Youtube';
// import SearchBar from './SearchBar';

const VideosList = ({ videos, selectedVideo, searchSubmitted }) => {
  const renderList = videos.map((video) => {
    return (
      <VideoItem
        key={video.id.videoId}
        video={video}
        selectedVideo={selectedVideo}
      />
    );
  });

  return (
    <div className={`${searchSubmitted ? 'query-videos-list' : ''}`}>
      {renderList}
    </div>
  );
};

export default VideosList;
