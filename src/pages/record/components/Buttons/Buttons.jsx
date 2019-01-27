import React from 'react';

export const Buttons = ({ isRecording, startRecord, stopRecord }) => {

  return <div>
    {
      isRecording ?
        <button onClick={stopRecord}>STOP</button> :
        <button onClick={startRecord}>RECORD</button>
    }
  </div>;
};
