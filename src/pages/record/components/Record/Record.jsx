import React, { Component } from 'react';
import { Buttons } from '../Buttons/Buttons';
import { RecordList } from '../RecordList/RecordList';

export class Record extends Component {

  state = {
    recorder: null,
    audio: null,
    isRecording: false,
    messages: []
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

    this.setState(() => ({
      messages: [...this.state.messages, {
        id: ++this.state.messages.length,
        audio
      }],
      isRecording: false,
    }));
  }

  render() {
    return <div>
      <Buttons
        isRecording={this.state.isRecording}
        startRecord={() => this.recordAudio()}
        stopRecord={() => this.stopRecord()}
      />
      <RecordList
        messages={this.state.messages}
      />
    </div>
  }
}