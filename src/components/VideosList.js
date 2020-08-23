import React from 'react';
import VideoItem from './VideoItem';

const VideosList = ({ videos }) => {
  const renderList = videos.map((video) => {
    return <VideoItem key={video.id.videoId} video={video} />;
  });
  return <div>{renderList}</div>;
};
export default VideosList;
