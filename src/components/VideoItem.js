import React from 'react';
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
    console.log(`${year} ${month} - ${hour}:${min}:${sec}`);

    if (year) {
      this.setState({ time: `${year} ${year === 1 ? 'year' : 'years'} ago` });
      return;
    } else if (month) {
      this.setState({
        time: `${month} ${month === 1 ? 'month' : 'months'} ago`,
      });
      return;
    } else if (date) {
      this.setState({ time: `${date} ${date === 1 ? 'day' : 'days'} ago` });
      return;
    } else if (hour) {
      this.setState({
        time: `${hour} ${hour === 1 ? 'hour' : 'hours'} ago`,
      });
      return;
    } else if (min) {
      this.setState({
        time: `${min} ${min === 1 ? 'minute' : 'minutes'} ago`,
      });
      return;
    } else if (sec) {
      this.setState({
        time: `${sec} ${sec === 1 ? 'second' : 'seconds'} ago`,
      });
      return;
    } else {
      this.setState({ time: "I don't know when it release" });
      return;
    }
  }

  render() {
    const { video } = this.props;
    const { time } = this.state;

    return (
      <div className='video-item'>
        <img
          alt={video.snippet.title}
          src={video.snippet.thumbnails.medium.url}
        />
        <div className='video-item-content'>
          <h3 className='video-item-content-title'>{`${video.snippet.title}`}</h3>
          <div className='video-item-content-channel'>
            {video.snippet.channelTitle}
          </div>
          <div className='video-item-content-extra'>
            {/* <span className='video-item-content-views'>{video.snippet.}</span> */}
            <span className='video-item-content-publishedAt'>{time}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoItem;
