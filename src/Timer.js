import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayPauseButton from './Buttons/PlayPauseButton';
import './custom-timer.css';
import ResetButton from './Buttons/ResetButton';
import React from 'react';
import {Animate} from 'react-move';
import SettingButton from './Buttons/SettingButton';
let initial = 25;

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            playing:false,
        }
        this.currVal=0;
        this.currDur=initial;
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
            this.timeout = setTimeout(()=> {
                this.handleReset()
            },this.currDur*1000)
            this.setState({
                playing: !this.state.playing
            })
        } else {
            window.clearTimeout(this.timeout)
            this.setState({
                playing: !this.state.playing
            })
        }
    }

    handleReset = () => {

        this.currVal = 0;
        this.currDur = initial;
        window.clearTimeout(this.timeout)
        this.setState({
            playing: false,
        })
    }

    updateInput(type,value) {
        let s = (this.currDur%60);
        let m = Math.floor(this.currDur/60)%60;
        let h = Math.floor(this.currDur/3600);
        if (type==="s") {
            this.currDur = value + 60*m + 3600*h;
        } else if (type === "m") {
            this.currDur = s+value*60+3600*h;
        } else {
            this.currDur = s + 60*m + 3600*value;
        }
        initial = this.currDur;
        this.setState({});
    }

    handleOnBlurS = (e) => {
        let res = parseInt(e.target.value);
        if (res > 60) {
            res = 59;
        } else if (res === 60) {
            res = 0;
        } else {
            res = isNaN(parseInt(e.target.value)) ? 0: parseInt(e.target.value);
        }

        this.updateInput("s", res)
    }

    handleKeyDownS = (e) => {
        if (e.key === 'Enter') {
            let res = parseInt(e.target.value);
            if (res > 60) {
                res = 59;
            } else if (res === 60) {
                res = 0;
            } else {
                res = isNaN(parseInt(e.target.value)) ? 0: parseInt(e.target.value);
            }
            this.updateInput("s", res);
        }
    }
    handleOnBlurM = (e) => {
        let res = parseInt(e.target.value);
        if (res > 60) {
            res = 59;
        } else if (res === 60) {
            res = 0;
        } else {
            res = isNaN(parseInt(e.target.value)) ? 0: parseInt(e.target.value);
        }

        this.updateInput("m", res)
    }

    handleKeyDownM = (e) => {
        if (e.key === 'Enter') {
            let res = parseInt(e.target.value);
            if (res > 60) {
                res = 59;
            } else if (res === 60) {
                res = 0;
            } else {
                res = isNaN(parseInt(e.target.value)) ? 0: parseInt(e.target.value);
            }
            this.updateInput("m", res);
        }
    }
    handleKeyDownH = (e) => {
        if (e.key === 'Enter') {
            let res = parseInt(e.target.value);
            if (res > 60) {
                res = 59;
            } else if (res === 60) {
                res = 0;
            } else {
                res = isNaN(parseInt(e.target.value)) ? 0: parseInt(e.target.value);
            }
            this.updateInput("h", res);
        }
    }
    handleOnBlurH = (e) => {
        let res = parseInt(e.target.value);
        if (res > 60) {
            res = 59;
        } else if (res === 60) {
            res = 0;
        } else {
            res = isNaN(parseInt(e.target.value)) ? 0: parseInt(e.target.value);
        }

        this.updateInput("h", res)
    }
    render() {
        return (
            <div class="core">
                <Animate
                
                start={() => ({
                    value: this.currVal,
                    seconds: this.currDur
                })}
                update={() => ({
                    value: [
                        this.state.playing ? 100 : this.currVal
                    ],
                    seconds: [
                        this.state.playing ? 0: this.currDur
                    ],
                    timing: {
                        duration: [this.state.playing ? this.currDur*1000: 0]
                    }
                })}
                >
                {({value, seconds}) => {
                    let sec = this.secondsToTime(Math.round(seconds));
                    console.log(sec.s);
                    if(!this.state.playing) {
                        return (
                            <div>
                                <CircularProgressbar value={value} text={`${sec.h.toString()}:${sec.m.toString().padStart(2,'0')}:${sec.s.toString().padStart(2,'0')}`} strokeWidth={3} styles={buildStyles({pathTransition:"none"})}/>
                                <label class="text">
                                    <input class="activeInput" placeholder={`${sec.h.toString().padStart(2,'0')}`} onKeyDown={this.handleKeyDownH} onBlur={this.handleOnBlurH}/>
                                    :
                                    <input class="activeInput" placeholder={`${sec.m.toString().padStart(2,'0')}`} onKeyDown={this.handleKeyDownM} onBlur={this.handleOnBlurM}/>
                                    :
                                    <input class="activeInput" placeholder={`${sec.s.toString().padStart(2,'0')}`} onKeyDown={this.handleKeyDownS} onBlur={this.handleOnBlurS}/>
                                </label>
                            </div> 
                        );
                    } else {
                        this.currVal = value;
                        this.currDur = seconds;
                        return (
                            <div>
                                <CircularProgressbar value={value} text={`${sec.h.toString()}:${sec.m.toString().padStart(2,'0')}:${sec.s.toString().padStart(2,'0')}`} strokeWidth={3} styles={buildStyles({pathTransition:"none"})}/>
                                <label class="text">
                                    <input class="disabledInput" value={`${sec.h.toString().padStart(2,'0')}`} onKeyDown={this.handleKeyDownH} onBlur={this.handleOnBlurH} disabled/>
                                    :
                                    <input class="disabledInput" value={`${sec.m.toString().padStart(2,'0')}`} onKeyDown={this.handleKeyDownM} onBlur={this.handleOnBlurM} disabled/>
                                    :
                                    <input class="disabledInput" value={`${sec.s.toString().padStart(2,'0')}`} onKeyDown={this.handleKeyDownS} onBlur={this.handleOnBlurS}disabled/>
                                </label>
                            </div> 
                        );

                    }

                }}
                </Animate>
                <div>
                <PlayPauseButton status={this.state.playing} onClick={this.handlePlayPause}/>
                <ResetButton onClick={this.handleReset}/>
                <SettingButton></SettingButton>
                </div>
            </div>
        );
    }
}
export default Timer;
