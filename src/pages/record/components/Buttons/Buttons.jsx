import React from 'react'
import './Buttons.scss';
import { ReactComponent as Microphone } from './icons/microphone.svg';

export const Buttons = ({ isRecording, startRecord, stopRecord }) => {

  return <div className='record-buttons'>
    {
      isRecording ?
        <Microphone
          onClick={stopRecord}
          className='button button_recording'
          height='50'
          width='50'
        /> :
        <Microphone
          onClick={startRecord}
          className='button'
          height='50'
          width='50'
        />
    }
  </div>;
};
