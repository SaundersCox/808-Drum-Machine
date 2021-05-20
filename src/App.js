import React, { Component } from "react";
import "./App.scss";

// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place.

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments.

// Q: closed hat, W: open hat, E: crash, R: clap
// A: snare, S: cow bell, D: clave, F: rim shot
// Z: kick, X: low tom, C: high tom, V: maracas

const inactiveStyle = {
  backgroundColor: "#ecd",
};

const activeStyle = {
  backgroundColor: "#ffd",
};

const sampleBank = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Closed Hat",
    url: "https://drive.google.com/uc?export=download&id=1fBlP6xPEtKxrab3s9TI11Zj7a4xAFNTh",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Open Hat",
    url: "https://drive.google.com/uc?export=download&id=1cMuyUYxhwNiO8Ufna1kqboZLH9ftSWbj",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Crash",
    url: "https://drive.google.com/uc?export=download&id=16AWI-C0M7N8dWaCjCqzelV6-5rngBYsX",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Snare",
    url: "https://drive.google.com/uc?export=download&id=11KBIuyxA9FJU2UavqJDfd30w45KTQXdz",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Cow Bell",
    url: "https://drive.google.com/uc?export=download&id=1VQf1JsVn9mkH-tOnH0YQwwMypqL5PAmy",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Clave",
    url: "https://drive.google.com/uc?export=download&id=1lI1zqM18foo1c755RD562jXQTlj0Z4bQ",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick",
    url: "https://drive.google.com/uc?export=download&id=10FAYnIwSc1Ah5w68k9IkE-GbSt6y2fOO",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Low Tom",
    url: "https://drive.google.com/uc?export=download&id=107FxBppv_JXXZhnrljRdVf8V0ImXH1Wz",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "High Tom",
    url: "https://drive.google.com/uc?export=download&id=1MEBURZ5dXlz47nsHDTutNmKOmJ579sAd",
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples: sampleBank,
      displayText: " ",
    };
    this.displayClipName = this.displayClipName.bind(this);
  }
  displayClipName(name) {
    this.setState({
      display: name,
    });
  }
  componentDidMount() {
    this.displayClipName("808 Drum Machine");
  }
  render() {
    return (
      <div id="drum-machine">
        <Display display={this.state.display} />
        <PadBank
          samples={this.state.samples}
          updateDisplay={this.displayClipName}
        />
      </div>
    );
  }
}

const Display = (props) => {
  return <div id="display">{props.display}</div>;
};

const PadBank = (props) => {
  return (
    <div className="pad-bank">
      {props.samples.map((sample) => {
        return <DrumPad sample={sample} updateDisplay={props.updateDisplay} />;
      })}
    </div>
  );
};

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle,
    };
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.sample.keyCode) {
      this.playSound();
    }
  }
  activatePad() {
    if (this.state.padStyle.backgroundColor === "#ff4") {
      this.setState({ padStyle: activeStyle });
    } else {
      this.setState({ padStyle: inactiveStyle });
    }
  }
  playSound() {
    this.props.updateDisplay(this.props.sample.id);
    const sound = document.getElementById(this.props.sample.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
  }
  render() {
    return (
      <div
        className="drum-pad"
        id={this.props.sample.id}
        onClick={this.playSound}
        style={this.state.padStyle}
      >
        {this.props.sample.keyTrigger}
        <audio
          className="clip"
          id={this.props.sample.keyTrigger}
          src={this.props.sample.url}
        />
      </div>
    );
  }
}

export default App;
