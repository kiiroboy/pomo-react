import { CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayPauseButton from './Buttons/PlayPauseButton';
import './custom-timer.css';
import ResetButton from './Buttons/ResetButton';


const percent = 70;
var time = 90;
function Timer() {
    return (
        <div class="core">
            <CircularProgressbar value={percent} text={`${Math.floor(time/60)}:${(time%60).toString().padStart(2,'0')}`} strokeWidth={3}/>
            <div>
               <PlayPauseButton/>
               <ResetButton/>
            </div>
            
        </div>
    )
}
export default Timer;
