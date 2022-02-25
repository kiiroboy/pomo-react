import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayPauseButton from './Buttons/PlayPauseButton';
import './custom-timer.css';
import ResetButton from './Buttons/ResetButton';
import React from 'react';
import AnimatedCPB from './AnimatedCPB';
const initial = 5;
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            playing:false,
        }
        this.reset=false;
        this.currVal=0;
        this.currDur=initial;
        this.interval = undefined;
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
        console.log(this.state.playing?"pause":"play");
        if (!this.state.playing) {
            this.setState({
                playing: !this.state.playing,
            });
            this.interval = setTimeout(() => {
                this.handleReset();
                window.clearInterval(this.interval);
            }, this.currDur*1000);
        } else {
            this.setState({
                playing: !this.state.playing,
            });
        }
    }
    handleReset = () => {
        this.currDur = initial;
        this.currVal = 0;
        this.reset = true;
        console.log("1");
        this.setState({
            playing: false,
        })
    }
    render() {
        if (this.state.playing) {
            return (
                <div class="core">
                    <AnimatedCPB
                        valueStart={this.currVal}
                        valueEnd={100}
                        duration={this.currDur}
                        playing={this.state.playing}
                        reset={this.reset}
                        >
                        {(value, seconds) => {
                            const sec = this.secondsToTime(Math.round(seconds));
                            this.currVal = value;
                            this.currDur = Math.round(seconds);
                            this.playing=false;
                            this.reset = false;
                            return (
                                <CircularProgressbar value={value} text={`${sec.m.toString()}:${sec.s.toString().padStart(2,'0')}`} strokeWidth={3} styles={buildStyles({pathTransition:value===0? "none":"none"})}/>
                            );
                        }}
                    </AnimatedCPB>
                    <div>
                    <PlayPauseButton status={this.state.playing} onClick={this.handlePlayPause}/>
                    <ResetButton onClick={this.handleReset}/>
                    </div>
                </div>
            );
        } else {
            let sec = this.secondsToTime(Math.round(this.currDur));
            console.log(sec);
            return (
                <div class="core">
                    <CircularProgressbar value={this.currVal} text={`${sec.m.toString()}:${sec.s.toString().padStart(2,'0')}`} strokeWidth={3} styles={buildStyles({pathTransition:this.currDur===0? "none":"none"})}/>
                    <div>
                    <PlayPauseButton status={this.state.playing} onClick={this.handlePlayPause}/>
                    <ResetButton onClick={this.handleReset}/>
                    </div>
                </div>
            );
            
        }
    }
}
export default Timer;
