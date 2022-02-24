import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayPauseButton from './Buttons/PlayPauseButton';
import './custom-timer.css';
import ResetButton from './Buttons/ResetButton';
import React from 'react';
import AnimatedCPB from './AnimatedCPB';
import {easeQuadInOut} from "d3-ease"
const initial = 10;
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            time:this.secondsToTime(initial),
            playing:false,
            seconds: initial,
            percent: 100.0,
        }
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }
    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
    } 

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let sec = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(sec),
            seconds: sec,
            percent: this.state.percent - (100/initial)
        });
        
        // Check if we're at zero.
        if (sec === 0) { 
            clearInterval(this.timer);
            this.timer = 0;
        }
    }


    handlePlayPause = () => {
        if (!this.state.playing) {
            this.setState({
                playing: !this.state.playing,
            });
            this.startTimer();
        } else {
            clearInterval(this.timer);
            this.timer = 0;
            this.setState({
                playing: !this.state.playing,
            });
        }
    }
    handleReset = () => {
        this.setState({
            time:this.secondsToTime(initial),
            playing:false,
            seconds: initial,
            percent: 100.0,
        });
        clearInterval(this.timer);
        this.timer = 0;
    }
    render() {
        return (
            <div class="core">
                <AnimatedCPB
                    valueStart={45}
                    valueEnd={100}
                    duration={initial}
                    easingFunction={easeQuadInOut}
                    playing={this.state.playing}
                    >
                    {value => {
                        return (
                            <CircularProgressbar value={value} text={`${this.state.time.m}:${this.state.time.s.toString().padStart(2,'0')}`} strokeWidth={3} styles={buildStyles({pathTransition:"none"})}/>
                        );
                    }}
                </AnimatedCPB>
                <div>
                <PlayPauseButton status={this.state.playing} onClick={this.handlePlayPause}/>
                <ResetButton onClick={this.handleReset}/>
                </div>
                
            </div>
        );
    }
}
export default Timer;
