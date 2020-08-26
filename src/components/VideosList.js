import React from 'react';
import VideoItem from './VideoItem';
import youtube from '../api/Youtube';
// import SearchBar from './SearchBar';

class VideosList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { videos, selectedVideo, searchSubmited } = this.props;
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
      <div className={`${searchSubmited ? 'query-videos-list' : ''}`}>
        {renderList}
      </div>
    );
  }
}
export default VideosList;
