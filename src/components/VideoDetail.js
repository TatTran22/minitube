import React from 'react';
import he from 'he';
import {
  AnchorButton,
  Button,
  Classes,
  Code,
  FormGroup,
  H5,
  HTMLSelect,
  Intent,
  Label,
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
  PopoverInteractionKind,
  PopoverPosition,
  PopperBoundary,
  PopperModifiers,
  RadioGroup,
  Slider,
  Switch,
  Position,
  H4,
} from '@blueprintjs/core';
import './VideoDetail.css';

class VideoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  render() {
    const playingVideo = (video) => {
      let popoverContent = (
        <div className='popover'>
          <H4>Description</H4>
          <div className=''>{video.snippet.description}</div>
        </div>
      );
      return (
        <div className='video-detail'>
          <div className='video-embed'>
            <iframe
              title={he.decode(video.snippet.title)}
              src={`https://www.youtube.com/embed/${
                video.id.videoId ? video.id.videoId : video.id
              }?rel=0&autoplay=0`}
              frameborder='0'
              allowfullscreen='1'
            ></iframe>
          </div>
          <div className='video-detail-title'>
            {he.decode(video.snippet.title)}
          </div>
          <div className='video-detail-extra'>
            <div className='video-detail-viewCount'>
              <span>
                {`${parseInt(
                  video.statistics.viewCount
                ).toLocaleString()} views`}
              </span>
              <span> • </span>
              <span>{`${parseInt(
                video.statistics.commentCount
              ).toLocaleString()} comments`}</span>
              <span> • </span>
              <span>{`${parseInt(
                video.statistics.likeCount
              ).toLocaleString()} likes`}</span>
              <span> • </span>
              <span>{`${parseInt(
                video.statistics.dislikeCount
              ).toLocaleString()} dislikes`}</span>
            </div>
            <div className='video-detail-description'>
              <Popover
                content={popoverContent}
                interactionKind={PopoverInteractionKind.CLICK}
                enforceFocus={false}
                position={Position.TOP_RIGHT}
              >
                <Button text='Description' />
              </Popover>
              {/* {he.decode(video.snippet.description)} */}
            </div>
          </div>
        </div>
      );
    };
    return (
      <div>
        {!this.props.video ? 'Loading' : playingVideo(this.props.video)}
      </div>
    );
  }
  handleDescriptionPopover(nextOpenState) {
    this.setState({ isOpen: nextOpenState });
  }
}

export default VideoDetail;
