import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayPauseButton from './Buttons/PlayPauseButton';
import './custom-timer.css';
import ResetButton from './Buttons/ResetButton';
import React from 'react';
import {Animate} from 'react-move';
import SettingButton from './Buttons/SettingButton';
const initial = 10;
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            playing:false,
            currVal:0,
            currDur:initial
        }
        this.timeout = undefined;
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

    handlePlayPause = () => {
        if(!this.state.playing) {
            this.setState({
                playing: !this.state.playing
            })
            this.timeout = setTimeout(()=> {
                this.handleReset()
            },this.state.currDur*1000)
        } else {
            this.setState({
                playing: !this.state.playing
            })
            window.clearTimeout(this.timeout)
        }
    }
    handleReset = () => {
        this.setState({
            playing: false,
            currVal: 0,
            currDur: initial,
        })
        window.clearTimeout(this.timeout)
    }
    handleOnBlur = (e) => {
        let res = parseInt(e.target.value);
        if (res > 60) {
            res = 59;
        } else if (res === 60) {
            res = 0;
        } else {
            res = isNaN(parseInt(e.target.value)) ? 0: parseInt(e.target.value);
        }
        this.setState({
            currDur: res
        })
    }
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            let res = parseInt(e.target.value);
            if (res > 60) {
                res = 59;
            } else if (res === 60) {
                res = 0;
            } else {
                res = isNaN(parseInt(e.target.value)) ? 0: parseInt(e.target.value);
            }
            this.setState({
                currDur: res
            })
        }
      }
    render() {
        return (
            <div class="core">
                <Animate
                
                start={() => ({
                    value: this.state.currVal,
                    seconds: this.state.currDur
                })}
                update={() => ({
                    value: [
                        this.state.playing ? 100 : this.state.currVal
                    ],
                    seconds: [
                        this.state.playing ? 0: this.state.currDur
                    ],
                    timing: {
                        duration: [this.state.playing ? this.state.currDur*1000: 0]
                    }
                })}
                leave={() => ({
                    value: this.state.currVal,
                    seconds: this.state.currDur
                })}
                >
                {({value, seconds}) => {
                    let sec = this.secondsToTime(Math.round(seconds));
                    this.state.currVal = value;
                    this.state.currDur = seconds;
                    return (
                        <CircularProgressbar value={value} text={`${sec.h.toString()}:${sec.m.toString().padStart(2,'0')}:${sec.s.toString().padStart(2,'0')}`} strokeWidth={3} styles={buildStyles({pathTransition:"none"})}/>
                    );

                }}
                </Animate>
                <div>
                <PlayPauseButton status={this.state.playing} onClick={this.handlePlayPause}/>
                <ResetButton onClick={this.handleReset}/>
                <SettingButton></SettingButton>
                </div>
                <input
                    onKeyDown={this.handleKeyDown}
                    onBlur={this.handleOnBlur}
                    placeholder="00"
                />
            </div>
        );
    }
}
export default Timer;
