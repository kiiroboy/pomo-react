import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayPauseButton from './Buttons/PlayPauseButton';
import './custom-timer.css';
import ResetButton from './Buttons/ResetButton';
import React from 'react';
import {Animate} from 'react-move';
import SettingButton from './Buttons/SettingButton';

const initialT =25
const speed = 100
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
        console.log("did mount");
        this.updateDisplay(initialT);
    }
    updateTime(type, value) {
        let str = this.autopad(value);
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
    autopad(str){
        str =  str.toString();
        if(str.length < 2) {
            return str.padStart(2,'0');
        }
        return str.slice(-2);
    }
    updateDisplay(value) {
        let sec = this.secondsToTime(value);
        console.log(this.autopad(sec.h));
        this.setState({hours:this.autopad(sec.h)});
        this.setState({minutes:this.autopad(sec.m)});
        this.setState({seconds:this.autopad(sec.s)});
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
            },this.currDur*speed)
        } else {
            this.setState({
                playing: !this.state.playing,
            });
            this.updateDisplay(Math.round(this.currDur));
            window.clearTimeout(this.timeout);
        }
    }

    handleReset = () => {
        this.setState({
            playing: false,
        });
        this.currVal = 0;
        this.currDur = this.state.initial
        window.clearTimeout(this.timeout);
        this.updateDisplay(Math.round(this.state.initial));
    }

    updateInput(type,value) {
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
                        duration: [this.state.playing ? this.currDur*speed: 0]
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
                                    <input class="activeInput" placeholder={this.state.hours} value={this.state.hours}  onKeyDown={e=>{this.updateTime("h",e.target.value)}} onBlur={e=>{this.updateTime("h",e.target.value)}} onChange={e=>{this.updateTime("h",e.target.value)}}/>
                                    :
                                    <input class="activeInput" placeholder={this.state.minutes} value={this.state.minutes} onKeyDown={e=>{this.updateTime("m",e.target.value)}} onBlur={e=>this.updateTime("m",e.target.value)} onChange={e=>{this.updateTime("m",e.target.value)}}/>
                                    :
                                    <input class="activeInput" placeholder={this.state.seconds} value={this.state.seconds} onKeyDown={e=>{this.updateTime("s",e.target.value)}} onBlur={e=>{this.updateTime("s",e.target.value)}} onChange={e=>{this.updateTime("s",e.target.value)}}/>
                                </label>
                                </div>
                            </div> 
                            <div class="timer_button">
                            <PlayPauseButton status={this.state.playing} onClick={this.handlePlayPause}/>
                            <ResetButton onClick={this.handleReset}/>
                            <SettingButton></SettingButton>
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
                            <div class="timer_button">
                            <PlayPauseButton status={this.state.playing} onClick={this.handlePlayPause}/>
                            <ResetButton onClick={this.handleReset}/>
                            <SettingButton></SettingButton>
                            </div>
                            </div>
                        );

                    }

                }}
                </Animate>
            </div>
        );
    }
}
export default Timer;
