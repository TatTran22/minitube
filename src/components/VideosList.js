import React from 'react';
import VideoItem from './VideoItem';

const VideosList = ({ videos, selectedVideo }) => {
  // const handleSelectVideo = (e) => {
  //   selectedVideo = e;
  // };
  const renderList = videos.map((video) => {
    return (
      <VideoItem
        key={video.id.videoId}
        video={video}
        selectedVideo={selectedVideo}
      />
    );
  });
  return <div>{renderList}</div>;
};
export default VideosList;
