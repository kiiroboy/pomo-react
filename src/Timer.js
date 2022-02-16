import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import * as c from './color';


function Timer() {
    return (
        <div>
            <CircularProgressbar value={c.percent} text={`${c.percent}%`} strokeWidth={2} styles={buildStyles({
                textColor: '#bf616a',
                pathColor:c.robin_egg_blue,
                trailColor: c.metallic_seaweed,
            })}/>
        </div>
    )
}
export default Timer;
