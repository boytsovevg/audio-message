import React from 'react';
import { ReactComponent as PlayButton } from './icons/play-button.svg';
import { ReactComponent as PauseButton } from './icons/pause-button.svg';

import './RecordList.scss';

export const RecordList = ({ messages }) => {
    return messages.length ?
      <div className='messages'>
        {
          messages.map(
            message =>
              <div key={message.id} className='message'>
                <PlayButton
                  height='20'
                  width='20'
                  onClick={() => message.play()}
                />
                <PauseButton
                  height='25'
                  width='25'
                  onClick={() => message.pause()}
                />
                <span>аудио дорожка</span>
              </div>
          )
        }
      </div> : null;
};
