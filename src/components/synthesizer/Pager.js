import React, { Component } from "react";
import "./Pager.css";
import { Button, Icon } from "semantic-ui-react";
import styled from "@emotion/styled";

// import MainMenu from './menu';
import ControlBar from "../ControlBar";
import SignalGenerator from "./SignalGenerator";

let audioContext = null;

class Pager extends Component {
  constructor() {
    super();
    this.signalGenerator = React.createRef();
    this.controlbar = React.createRef();

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      started: false,
      timbre: false,
      sustain: false,
      lockFreq: false,
      lockAmp: false,
      showCombinedWaveInfo: false,
      frequency: 0,
      combinedFrequency: 0,
      timbreSelection: "sine",
      fullscreen: false,
      rotateIcon: false,
      rotateIcon2: false,
    };
  }

  handleResize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  componentDidMount() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.setState({ started: true });
  }

  onAudioEvent = (signals) => {
    this.signalGenerator.current.renderCanvas(signals);
  };

  // handleTimbrePure = () =>{
  //   this.setState({timbre: false, timbreType: 'pure', timbreSelection: ""});
  //   if(this.state.sustain){
  //     this.controlbar.current.sustainChangeTimbre(false, "sine");
  //   } else {
  //     this.controlbar.current.generateComplexWeights("sine");
  //   }
  // }
  // handleTimbreComplex = () =>{
  //     this.setState({timbre: true, timbreType: 'complex', timbreSelection: ""});
  //     if(this.state.sustain){
  //       this.controlbar.current.sustainChangeTimbre(true, "complex");
  //   } else {
  //     this.controlbar.current.generateComplexWeights("complex");
  //   }
  //
  // }

  handleSustainToggle = () => {
    if (this.state.sustain) {
      this.controlbar.current.releaseAll(false);
    }
    this.setState({ sustain: !this.state.sustain });
  };

  handlelockFreqToggle = () => {
    //this.controlbar.current.lockFrequencies();
    this.setState({ lockFreq: !this.state.lockFreq });
  };
  handlelockAmpToggle = () => {
    // this.controlbar.current.lockGains();
    this.setState({ lockAmp: !this.state.lockAmp });
  };

  drawCombinedInfo = (frequency) => {
    if (!isNaN(frequency) && isFinite(frequency) && frequency > 0) {
      this.setState({
        showCombinedWaveInfo: true,
        combinedFrequency: frequency,
      });
    } else {
      this.setState({ showCombinedWaveInfo: false });
    }
  };

  handleTimbreChange = (timbre) => {
    this.setState({
      timbre: timbre !== "sine",
      timbreSelection: timbre,
      rotateIcon: false,
      rotateIcon2: false,
    });
    if (this.state.sustain) {
      this.controlbar.current.sustainChangeTimbre(timbre);
    } else {
      this.controlbar.current.generateTimbre(timbre);
    }
    if (this.state.timbreSelection !== "sine" && timbre === "complex") {
      this.setState({ rotateIcon: true, rotateIcon2: false });
      if (this.state.timbreSelection === "complex" && this.state.rotateIcon) {
        this.setState({ rotateIcon: false, rotateIcon2: true });
      }
    }
  };

  // Maximizes screen
  toggleFullScreen = () => {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
      this.setState({ fullScreen: true });
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      this.setState({ fullScreen: false });
    }
  };

  restart = () => {
    this.setState({ started: false });
    this.handleResize();
  };

  render() {
    // let backgroundColor = "yellow";
    let freqIcon, ampIcon;

    if (this.state.lockFreq) {
      freqIcon = "lock";
    } else {
      freqIcon = "unlock";
    }
    if (this.state.lockAmp) {
      ampIcon = "lock";
    } else {
      ampIcon = "unlock";
    }

    return (
      <div className="App" onMouseOver={this.start}>
        {/* <MainMenu /> */}
        {this.state.started ? (
          <React.Fragment>
            <ScopeContainer>
              <ControlBar
                width={this.state.width / 8}
                height={this.state.height * 0.6}
                handleResize={this.handleResize}
                context={audioContext}
                onAudioEvent={this.onAudioEvent}
                sustain={this.state.sustain}
                timbre={this.state.timbre}
                timbreSelection={this.state.timbreSelection}
                lockFreq={this.state.lockFreq}
                lockAmp={this.state.lockAmp}
                ref={this.controlbar}
              />
              <SignalGenerator
                width={this.state.width }
                height={this.state.height * 0.6}
                handleResize={this.handleResize}
                renderSignals={this.state.renderSignals}
                drawCombinedInfo={this.drawCombinedInfo}
                restart={this.restart}
                ref={this.signalGenerator}
              />
            </ScopeContainer>

            {/*<Button.Group className="button-group-container">*/}
            <div className="lock-freq-container">
              <Button
                icon
                className="lock-freq-button"
                toggle
                active={this.state.lockFreq}
                onClick={this.handlelockFreqToggle}
              >
                <Icon name={freqIcon} />
              </Button>
              <ControlTitle>Frequency</ControlTitle>
            </div>
            <div className="lock-amp-container">
              <ControlTitle>Amplitude</ControlTitle>
              <Button
                icon
                className="lock-amp-button"
                toggle
                active={this.state.lockAmp}
                onClick={this.handlelockAmpToggle}
              >
                <Icon name={ampIcon} />
              </Button>
            </div>
            <LeftBorder></LeftBorder>
            <BottomBorder></BottomBorder>
            {/* <Headline href="https://github.com/Mcas4150">DEVELOPER.</Headline> */}
          </React.Fragment>
        ) : (
          <p className="flashing">Click</p>
        )}
      </div>
    );
  }
}

const ScopeContainer = styled.div`
  display: flex;
  flexdirection: column;
`;

const LeftBorder = styled.div`
  z-index: 10;
  position: absolute;
  left: 4%;
  bottom: 10%;
  opacity: 0.5;
  // height: 15vh;
  height: 75%;
  border-left: 3px solid grey;
`;

const ControlTitle = styled.div`
  font-size: 1.25vw;
`;

const BottomBorder = styled.div`
  z-index: 10;
  position: absolute;
  left: 4%;
  bottom: 10%;
  opacity: 0.5;
  // width: 21vw;
  width: 25%;
  border-bottom: 3px solid grey;
`;

// const Headline = styled.a`
//   text-decoration: none;
//   z-index: 10;
//   position: absolute;
//   right: 15%;
//   bottom: 3%;
//   font-size: 1.75vw;
//   color: white;
//   height: 5vh;
//   width: 6vw;
//   :hover {
//     color: black;
//   }
// `;

export default Pager;