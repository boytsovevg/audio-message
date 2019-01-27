import React, { Component } from 'react';
import { Buttons } from '..';

export class Record extends Component {

  state = {
    recorder: null,
    audio: null,
    isRecording: false,
    hasAudio: false
  };


  prepareRecorder() {
    return new Promise(async resolve => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });

      const start = () => mediaRecorder.start();

      const stop = () =>
        new Promise(resolve => {
          mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            const play = () => audio.play();
            resolve({ audioBlob, audioUrl, play });
          });

          mediaRecorder.stop();
        });

      resolve({ start, stop });
    });
  }

  async recordAudio() {
    const recorder = await this.prepareRecorder();
    this.setState(() => ({ recorder, isRecording: true }));
    this.state.recorder.start();
  }

  async stopRecord() {
    const audio = await this.state.recorder.stop();
    this.setState(() => ({ audio, isRecording: false, hasAudio: true }));
  }

  async playAudio() {
    this.state.audio.play();
  }

  render() {
    return  <div>
      <Buttons
        isRecording={this.state.isRecording}
        startRecord={() => this.recordAudio()}
        stopRecord={() => this.stopRecord()}
      />
      {
        this.state.hasAudio ?
          <button
            onClick={() => this.playAudio()}
            disabled={this.state.isRecording}
          >
            PLAY
          </button> :
          null
      }
    </div>;
  }
}