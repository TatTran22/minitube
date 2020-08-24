import React from 'react';
import he from 'he';

import './VideoDetail.css';

const VideoDetail = ({ video }) => {
  const playingVideo = (video) => {
    if (!video) return 'Loading...';
    else {
      return (
        <div className='video-detail'>
          <div className='video-embed'>
            <iframe
              title={he.decode(video.snippet.title)}
              src={`https://www.youtube.com/embed/${video.id.videoId}?rel=0&autoplay=1`}
              frameborder='0'
              allowfullscreen='1'
            ></iframe>
          </div>
          <h3 className='video-detail-title'>
            {he.decode(video.snippet.title)}
          </h3>
          <div className='video-detail-description'>
            {he.decode(video.snippet.description)}
          </div>
        </div>
      );
    }
  };
  return <div>{playingVideo(video)}</div>;
};

export default VideoDetail;
