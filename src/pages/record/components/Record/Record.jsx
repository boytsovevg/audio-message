import React, { Component } from 'react';
import { Buttons } from '..';

export class Record extends Component {

  state = {
    isRecording: false
  };

  componentDidMount() {
    this.recorder = null;
  }


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
    this.recorder = await this.prepareRecorder();
    this.setState(() => ({ isRecording: true }));
    this.recorder.start();
  }

  async stopRecord() {
    const audio = await this.recorder.stop();
    this.setState(() => ({ isRecording: false }));
    audio.play();
  }

  render() {
    return <Buttons
      isRecording={this.state.isRecording}
      startRecord={() => this.recordAudio()}
      stopRecord={() => this.stopRecord()}
    />
  }

}