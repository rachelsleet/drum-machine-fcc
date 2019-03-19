import React, { Component } from 'react';
import './App.css';

const soundBank = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soundToDisplay: 'Bust a beat'
    }
    this.displayKeyDown = this.displayKeyDown.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown",this.displayKeyDown);
    const script = document.createElement("script");
    script.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    script.async = true;
    script.type = 'text/javascript'
    document.body.appendChild(script);
    console.log(script);
  }

  displayKeyDown(e) {
    soundBank.forEach(sound => {
      if (sound.keyTrigger === e.key.toUpperCase()) {
        this.setState({
          soundToDisplay: sound.id
        })
      }
    })
  }
  updateDisplay(name) {
    this.setState({
      soundToDisplay: name
    })
  }
  render() {
    return (
      <div id="drum-machine" onKeyPress={this.handleKey}>
        <div id="display">{this.state.soundToDisplay}</div>
        <div id="drum-pads">
          {soundBank.map(sound => {
            console.log(sound);
            return <DrumPad update={this.updateDisplay} name={sound.id} keyId={sound.keyTrigger} source={sound.url} key={sound.keyCode}/>
          })}
        </div>
      </div>
    );
  }
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    document.getElementById(this.props.keyId).play();
    this.props.update(this.props.name);
  }
  handleKeyDown(e) {
    console.log(e);
    let keyPressed = e.key.toUpperCase();
    if (keyPressed === this.props.keyId) {
      document.getElementById(keyPressed).play();
    }
  }
  componentDidMount() {
    document.addEventListener("keydown",this.handleKeyDown);
  }
  render() {
    return (
    <button id={this.props.name} className="drum-pad" onClick={this.handleClick}>
      {this.props.keyId}
      <audio id={this.props.keyId} className="clip" src={this.props.source}/>
    </button>
  )}
}

export default App;
