import React, { useState } from 'react';
import he from 'he';
import {
  Button,
  Icon,
  Popover,
  PopoverInteractionKind,
  Position,
  H4,
} from '@blueprintjs/core';

import './VideoDetail.css';

const VideoDetail = ({ video }) => {
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
          <div className='video-detail-counts'>
            <span>
              <Icon icon='eye-open' />
              {` ${parseInt(video.statistics.viewCount).toLocaleString()} `}
            </span>
            {/* <span> • </span> */}
            <span>
              <Icon icon='comment' />
              {` ${parseInt(video.statistics.commentCount).toLocaleString()} `}
            </span>
            {/* <span> • </span> */}
            <span>
              <Icon icon='thumbs-up' />
              {` ${parseInt(video.statistics.likeCount).toLocaleString()} `}
            </span>
            {/* <span> • </span> */}
            <span>
              <Icon icon='thumbs-down' />
              {` ${parseInt(video.statistics.dislikeCount).toLocaleString()} `}
            </span>
          </div>
          <div className='video-detail-description'>
            <Popover
              content={popoverContent}
              interactionKind={PopoverInteractionKind.CLICK}
              enforceFocus={false}
              position={Position.RIGHT_TOP}
            >
              <Button text='Description' />
            </Popover>
          </div>
        </div>
      </div>
    );
  };
  return <div>{!video ? 'Loading' : playingVideo(video)}</div>;
};

export default VideoDetail;
