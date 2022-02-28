import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayPauseButton from './Buttons/PlayPauseButton';
import './custom-timer.css';
import ResetButton from './Buttons/ResetButton';
import React from 'react';
import {Animate} from 'react-move';
import SettingButton from './Buttons/SettingButton';

const initialT = 0
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            playing:false,
            initial: initialT,
            seconds:'',
            minutes:'',
            hours:'',
        }
        this.currVal=0;
        this.currDur=initialT;
        this.timeout = undefined;
    }
    componentDidMount() {
        this.resetDisplay(initialT);
    }
    updateDisplay(type, value) {
        if(isNaN(value)) {
            value = '0';
        }
        let str = value.toString();
        if(value.toString().length < 2) {
            str = str.padStart(2,'0');
        }else {
            str = str.slice(-2);
        }
        let res = isNaN(parseInt(str)) ? 0: parseInt(str);
        if (res > 60) {
            res = 59;
        } else if (res === 60 || res < 0) {
            res = 0;
        }
        console.log(str);
        if (type==="s") {
            this.setState({seconds:str})
            this.updateInput("s", res);
        } else if (type === "m") {
            this.setState({minutes:str})
            this.updateInput("m", res);
        } else {
            this.setState({hours:str})
            this.updateInput("h", res);
        }
        this.currVal = 0;
        this.currDur = this.state.initial;
        window.clearTimeout(this.timeout);
        this.setState({
            playing: false,
        });

        
    }
    resetDisplay(value) {
        console.log("when pause", value);
        let sec = this.secondsToTime(value);
        console.log(sec.h, sec.m, sec.s);
        this.setState({hours:sec.h});
        this.setState({minutes:sec.m});
        this.setState({seconds:sec.s});
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
            },this.currDur*1000)
        } else {
            window.clearTimeout(this.timeout);
            this.setState({
                playing: !this.state.playing,
            });
            this.resetDisplay(Math.round(this.currDur));
        }
    }

    handleReset = () => {
        console.log("state when press reset", this.state.initial, this.currVal);
        this.currVal = 0;
        this.currDur = this.state.initial
        console.log("state when press reset", this.state.initial, this.currVal);
        window.clearTimeout(this.timeout);
        this.resetDisplay(Math.round(this.state.initial));
        this.setState({
            playing: false,
        });
    }

    updateInput(type,value) {
        console.log("value", value)
        let s = (this.currDur%60);
        let m = Math.floor(this.currDur/60)%60;
        let h = Math.floor(this.currDur/3600)%60;
        if (type==="s") {
            this.currDur = value + 60*m + 3600*h;
        } else if (type === "m") {
            this.currDur=s+value*60+3600*h;
        } else {
            this.currDur = s + 60*m + 3600*value;
        }
        this.setState({initial: this.currDur});
        this.currDur = this.state.initial;
        console.log("this is dur",this.currDur);
        console.log("this is initial",this.state.initial);
        
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

        this.updateInput("s", res);
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

        this.updateInput("m", res);
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

        this.updateInput("h", res);
    }
    render() {
        return (
            <div class>
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
                    if(!this.state.playing) {
                        return (
                            <div class="timer">
                            <div class="parent">
                                <CircularProgressbar value={value} strokeWidth={3} styles={buildStyles({pathTransition:"none"})}/>
                                <div class="child">
                                <label class="text">
                                    <input class="activeInput" placeholder={this.state.hours} value={this.state.hours}  onKeyDown={e=>{this.updateDisplay("h",e.target.value)}} onBlur={e=>{this.updateDisplay("h",e.target.value)}} onChange={e=>{this.updateDisplay("h",e.target.value)}}/>

                                    :
                                    <input class="activeInput" placeholder={this.state.minutes} value={this.state.minutes} onKeyDown={e=>{this.updateDisplay("m",e.target.value)}} onBlur={e=>this.updateDisplay("m",e.target.value)} onChange={e=>{this.updateDisplay("m",e.target.value)}}/>
                                    :
                                    <input class="activeInput" placeholder={this.state.seconds} value={this.state.seconds} onKeyDown={e=>{this.updateDisplay("s",e.target.value)}} onBlur={e=>{this.updateDisplay("s",e.target.value)}} onChange={e=>{this.updateDisplay("s",e.target.value)}}/>
                                </label>
                                </div>
                            </div> 
                            </div>
                        );
                    } else {
                        this.currVal = value;
                        this.currDur = seconds;
                        return (
                            <div class="timer">
                            <div class="parent">
                                <CircularProgressbar value={value}  strokeWidth={3} styles={buildStyles({pathTransition:"none"})}/>
                                <div class="child">
                                <label class="text">
                                    <input class="disabledInput" value={`${sec.h.toString().padStart(2,'0')}`} onKeyDown={this.handleKeyDownH} onBlur={this.handleOnBlurH} disabled/>
                                    :
                                    <input class="disabledInput" value={`${sec.m.toString().padStart(2,'0')}`} onKeyDown={this.handleKeyDownM} onBlur={this.handleOnBlurM} disabled/>
                                    :
                                    <input class="disabledInput" value={`${sec.s.toString().padStart(2,'0')}`} onKeyDown={this.handleKeyDownS} onBlur={this.handleOnBlurS}disabled/>
                                </label>
                                </div>
                            </div> 
                            </div>
                        );

                    }

                }}
                </Animate>
                <div class="timer_button">
                <PlayPauseButton status={this.state.playing} onClick={this.handlePlayPause}/>
                <ResetButton onClick={this.handleReset}/>
                <SettingButton></SettingButton>
                </div>
                <div class="timer_button">
                <PlayPauseButton status={this.state.playing} onClick={this.handlePlayPause}/>
                <ResetButton onClick={this.handleReset}/>
                <SettingButton></SettingButton>
                </div>
            </div>
        );
    }
}
export default Timer;
