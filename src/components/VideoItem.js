import React from 'react';
import he from 'he';
import './VideoItem.css';
class VideoItem extends React.Component {
  timeAgoCal = (time) => {
    const publishedAt = Date.parse(time);
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
      return `${year} year${year === 1 ? '' : 's'} ago`;
    } else if (month) {
      return `${month} month${month === 1 ? '' : 's'} ago`;
    } else if (date) {
      return `${date} day${date === 1 ? '' : 's'} ago`;
    } else if (hour) {
      return `${hour} hour${hour === 1 ? '' : 's'} ago`;
    } else if (min) {
      return `${min} minute${min === 1 ? '' : 's'} ago`;
    } else if (sec) {
      return `${sec} second${sec === 1 ? '' : 's'} ago`;
    } else {
      return "I don't know when it release 😥😥😥";
    }
  };

  viewsCount = (num, fixed) => {
    if (num === null) {
      return null;
    } // terminate early
    if (num === 0) {
      return '0';
    } // terminate early
    fixed = !fixed || fixed < 0 ? 0 : fixed; // number of decimal places to show

    let b = parseInt(num).toPrecision(2).split('e'), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c =
        k < 1
          ? num.toFixed(0 + fixed)
          : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
      e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
    return e;
  };

  render() {
    const { video, selectedVideo } = this.props;
    // const { viewCount, timeAgo } = this.state;
    const timeAgo = this.timeAgoCal(video.snippet.publishedAt);
    const viewCount = this.viewsCount(video.statistics.viewCount, 0);
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
              <span className='video-item-content-views'>
                {`${viewCount} views`}
              </span>
              <span className='video-item-content-publishedAt'>{` • ${timeAgo}`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoItem;
