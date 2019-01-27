import React from 'react';

import './RecordList.scss';

export const RecordList = ({ messages }) =>
  messages.length ?
    <ul className='messages'>
      {
        messages.map(
          message =>
            <li key={message.id} className='message'>
              <button onClick={() => message.audio.play()}>PLAY</button>
              <span>аудио дорожка</span>
            </li>
        )
      }
    </ul> :
    <div>Start recording...</div>;
