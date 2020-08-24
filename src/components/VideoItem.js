import React from 'react';
import he from 'he';
import './VideoItem.css';
class VideoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
    };
  }
  componentDidMount() {
    const publishedAt = Date.parse(this.props.video.snippet.publishedAt);
    const publishedTime = new Date(publishedAt);
    const publishedYear = publishedTime.getFullYear();
    const publishedMonth = publishedTime.getMonth();
    const publishedDate = publishedTime.getDate();
    const publishedHour = publishedTime.getHours();
    const publishedMinute = publishedTime.getMinutes();
    const publishedSecond = publishedTime.getSeconds();

    const currentTime = new Date(Date.now());
    const currentYear = currentTime.getFullYear();
    const currentMonth = currentTime.getMonth();
    const currentDate = currentTime.getDate();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentSecond = currentTime.getSeconds();

    const year = currentYear - publishedYear;
    const month = currentMonth - publishedMonth;
    const date = currentDate - publishedDate;
    const hour = currentHour - publishedHour;
    const min = currentMinute - publishedMinute;
    const sec = currentSecond - publishedSecond;
    // console.log(`${year} ${month} - ${hour}:${min}:${sec}`);

    if (year) {
      this.setState({ time: `${year} year${year === 1 ? '' : 's'} ago` });
      return;
    } else if (month) {
      this.setState({ time: `${month} month${month === 1 ? '' : 's'} ago` });
      return;
    } else if (date) {
      this.setState({ time: `${date} day${date === 1 ? '' : 's'} ago` });
      return;
    } else if (hour) {
      this.setState({ time: `${hour} hour${hour === 1 ? '' : 's'} ago` });
      return;
    } else if (min) {
      this.setState({ time: `${min} minute${min === 1 ? '' : 's'} ago` });
      return;
    } else if (sec) {
      this.setState({ time: `${sec} second${sec === 1 ? '' : 's'} ago` });
      return;
    } else {
      this.setState({ time: "I don't know when it release 😥😥😥" });
      return;
    }
  }

  render() {
    const { video, selectedVideo } = this.props;
    const { time } = this.state;

    return (
      <div className='video-item'>
        <div className='video-item-card'>
          <img
            onClick={() => selectedVideo(video)}
            alt={video.snippet.title}
            src={video.snippet.thumbnails.medium.url}
          />
          <div className='video-item-content'>
            <div
              className='video-item-content-title'
              onClick={() => selectedVideo(video)}
            >
              {he.decode(video.snippet.title)}
            </div>
            <div className='video-item-content-channel'>
              {video.snippet.channelTitle}
            </div>
            <div className='video-item-content-extra'>
              {/* <span className='video-item-content-views'>{video.snippet.}</span> */}
              <span className='video-item-content-publishedAt'>{time}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoItem;
